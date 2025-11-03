import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GamePreviewProps {
  gameType: string;
}

const GamePreview = ({ gameType }: GamePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationFrameRef = useRef<number>();
  const gameStateRef = useRef({
    playerY: 250,
    playerVelocity: 0,
    obstacles: [] as { x: number; height: number }[],
    score: 0,
    gameOver: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gravity = 0.6;
    const jumpStrength = -12;
    const obstacleSpeed = 3;
    const obstacleGap = 200;

    const drawPlayer = () => {
      if (!ctx) return;
      const state = gameStateRef.current;
      
      ctx.fillStyle = '#8B5CF6';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#8B5CF6';
      ctx.fillRect(50, state.playerY, 30, 30);
      ctx.shadowBlur = 0;
    };

    const drawObstacle = (x: number, height: number) => {
      if (!ctx) return;
      
      ctx.fillStyle = '#0EA5E9';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#0EA5E9';
      ctx.fillRect(x, 0, 40, height);
      ctx.fillRect(x, height + 150, 40, 500 - height - 150);
      ctx.shadowBlur = 0;
    };

    const checkCollision = () => {
      const state = gameStateRef.current;
      const playerLeft = 50;
      const playerRight = 80;
      const playerTop = state.playerY;
      const playerBottom = state.playerY + 30;

      for (const obstacle of state.obstacles) {
        if (playerRight > obstacle.x && playerLeft < obstacle.x + 40) {
          if (playerTop < obstacle.height || playerBottom > obstacle.height + 150) {
            return true;
          }
        }
      }

      if (playerTop < 0 || playerBottom > 500) {
        return true;
      }

      return false;
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;
      const state = gameStateRef.current;

      if (state.gameOver) {
        setIsPlaying(false);
        return;
      }

      ctx.fillStyle = '#1a2332';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#2a3342';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      state.playerVelocity += gravity;
      state.playerY += state.playerVelocity;

      state.obstacles = state.obstacles.filter(obs => obs.x > -50);
      state.obstacles.forEach(obs => {
        obs.x -= obstacleSpeed;
        drawObstacle(obs.x, obs.height);

        if (obs.x + 40 < 50 && !obs.scored) {
          state.score += 10;
          setScore(state.score);
          (obs as any).scored = true;
        }
      });

      if (state.obstacles.length === 0 || state.obstacles[state.obstacles.length - 1].x < canvas.width - obstacleGap) {
        state.obstacles.push({
          x: canvas.width,
          height: Math.random() * 200 + 50
        });
      }

      drawPlayer();

      if (checkCollision()) {
        state.gameOver = true;
        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 48px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Inter, sans-serif';
        ctx.fillText(`Счёт: ${state.score}`, canvas.width / 2, canvas.height / 2 + 50);
      } else {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    const handleJump = () => {
      if (isPlaying && !gameStateRef.current.gameOver) {
        gameStateRef.current.playerVelocity = jumpStrength;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    canvas.addEventListener('click', handleJump);
    window.addEventListener('keydown', handleKeyPress);

    if (isPlaying) {
      gameLoop();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('click', handleJump);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  const startGame = () => {
    gameStateRef.current = {
      playerY: 250,
      playerVelocity: 0,
      obstacles: [],
      score: 0,
      gameOver: false
    };
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-primary/30 glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Gamepad2" size={24} className="text-primary" />
            Превью режима
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Счёт: <span className="text-primary font-bold">{score}</span>
            </div>
            {!isPlaying && (
              <Button
                onClick={startGame}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Play" size={16} className="mr-2" />
                {gameStateRef.current.gameOver ? 'Играть снова' : 'Начать игру'}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg overflow-hidden border-2 border-primary/20">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full bg-background cursor-pointer"
          />
          {!isPlaying && !gameStateRef.current.gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-float">
                  <Icon name="Gamepad2" size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">Демо-режим готов!</h3>
                  <p className="text-muted-foreground mb-4">Кликните "Начать игру" или нажмите пробел для прыжка</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span>Управление: Клик мыши или Пробел</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Target" size={16} className="text-secondary" />
            <span>Пролетайте между препятствиями</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamePreview;
