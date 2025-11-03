import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Create = () => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const templates = [
    { name: 'Obby', icon: 'Mountain', description: 'Паркур с препятствиями' },
    { name: 'Tycoon', icon: 'Building2', description: 'Экономическая стратегия' },
    { name: 'Simulator', icon: 'Wrench', description: 'Симулятор развития' },
    { name: 'FPS', icon: 'Target', description: 'Шутер от первого лица' },
  ];

  const handleGenerate = () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedCode(`-- AI-Generated Roblox Game Mode
-- Description: ${description}

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Game Configuration
local GameConfig = {
    RoundTime = 300,
    MinPlayers = 2,
    MaxPlayers = 12
}

-- Initialize Game
local function initializeGame()
    print("Initializing game mode...")
    -- Your game logic here
end

-- Player Management
Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " joined the game!")
    -- Setup player
end)

initializeGame()
`);
      setIsGenerating(false);
    }, 2500);
  };

  const handleTemplateClick = (template: string) => {
    setDescription(`Создай ${template} режим для Roblox`);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-sm fixed w-full z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">RobloxAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="hover:text-primary transition-colors">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">
              Создание <span className="gradient-text">игрового режима</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Опишите свою идею, и AI создаст готовый код для Roblox Studio
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wand2" size={24} className="text-primary" />
                    Описание режима
                  </CardTitle>
                  <CardDescription>
                    Расскажите подробно о вашей игровой идее
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Например: Создай режим выживания на острове, где игроки собирают ресурсы, строят убежища и защищаются от мобов. Добавь систему крафта и прогрессии персонажа..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] resize-none bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Lightbulb" size={16} />
                      <span>Чем подробнее описание, тем лучше результат</span>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!description.trim() || isGenerating}
                      className="bg-primary hover:bg-primary/90 glow-hover transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                          Генерация...
                        </>
                      ) : (
                        <>
                          <Icon name="Sparkles" size={18} className="mr-2" />
                          Сгенерировать
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {generatedCode && (
                <Card className="bg-card/50 backdrop-blur border-primary/30 glow animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Code2" size={24} className="text-primary" />
                        Сгенерированный код
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedCode);
                        }}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Icon name="Copy" size={16} className="mr-2" />
                        Копировать
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Готовый Lua-код для Roblox Studio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-background/80 p-4 rounded-lg overflow-x-auto text-sm border border-border/30">
                      <code className="text-foreground font-mono">{generatedCode}</code>
                    </pre>
                    
                    <div className="mt-4 flex gap-3">
                      <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать .lua
                      </Button>
                      <Button variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10">
                        <Icon name="Share2" size={18} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Layers" size={20} className="text-primary" />
                    Шаблоны
                  </CardTitle>
                  <CardDescription>
                    Выберите готовый шаблон
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleTemplateClick(template.name)}
                      className="w-full p-4 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/30 hover:border-primary/50 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Icon name={template.icon as any} size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-display font-semibold">{template.name}</div>
                          <div className="text-sm text-muted-foreground">{template.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Info" size={20} className="text-primary" />
                    Советы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <p>Указывайте конкретные механики и особенности</p>
                  </div>
                  <div className="flex gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <p>Опишите желаемый геймплей и цели игроков</p>
                  </div>
                  <div className="flex gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <p>Упомяните систему наград и прогрессии</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
