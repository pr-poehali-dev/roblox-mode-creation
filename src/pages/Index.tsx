import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: 'Sparkles',
      title: 'AI-Генерация',
      description: 'Продвинутый ИИ создает уникальные режимы по вашему описанию'
    },
    {
      icon: 'Zap',
      title: 'Мгновенно',
      description: 'От идеи до готового режима за считанные минуты'
    },
    {
      icon: 'Code',
      title: 'Roblox Studio',
      description: 'Полная совместимость с Roblox Studio и Lua'
    },
    {
      icon: 'Layers',
      title: 'Готовые шаблоны',
      description: 'Библиотека проверенных элементов и механик'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-sm fixed w-full z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">RobloxAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hover:text-primary transition-colors">
              Примеры
            </Button>
            <Button variant="ghost" className="hover:text-primary transition-colors">
              Цены
            </Button>
            <Link to="/create">
              <Button className="bg-primary hover:bg-primary/90 glow-hover transition-all">
                Создать режим
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Icon name="Stars" size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-black mb-6 leading-tight">
            Создавай <span className="gradient-text">Roblox режимы</span><br />
            силой ИИ
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Превратите любую идею в готовый игровой режим для Roblox Studio. 
            Без программирования. Без сложностей. Только ваше воображение.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Link to="/create">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow hover:scale-105 transition-all duration-300"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать создание
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 animate-pulse-glow" />
            <div className="bg-card border border-border rounded-2xl p-2 shadow-2xl">
              <div className="bg-muted/30 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-float">
                    <Icon name="Sparkles" size={40} className="text-white" />
                  </div>
                  <p className="text-muted-foreground">Демо-превью генерации режима</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Возможности платформы
            </h2>
            <p className="text-xl text-muted-foreground">
              Всё что нужно для создания игр нового уровня
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`
                  group cursor-pointer transition-all duration-300
                  ${hoveredFeature === index ? 'scale-105 glow' : ''}
                  hover:border-primary/50 bg-card/50 backdrop-blur
                `}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary 
                    flex items-center justify-center transition-transform duration-300
                    ${hoveredFeature === index ? 'rotate-12' : ''}
                  `}>
                    <Icon name={feature.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Готовы создать свой<br />первый режим?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Присоединяйтесь к тысячам разработчиков, которые уже используют AI
          </p>
          <Link to="/create">
            <Button 
              size="lg"
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 glow-hover transition-all"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Начать бесплатно
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 RobloxAI. Создано с использованием передовых AI технологий</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
