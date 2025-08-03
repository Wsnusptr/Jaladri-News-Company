"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  enableInteraction?: boolean;
}

export function AnimatedBackground({
  className = '',
  intensity = 'medium',
  enableInteraction = true,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const animationRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full viewport size with proper pixel ratio
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = document.documentElement.getBoundingClientRect();
      
      // Use document height to cover full page
      const fullHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        window.innerHeight
      );
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = fullHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = fullHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    // Enhanced particle system for Microsoft Edge aesthetic
    class EdgeParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
      originalSize: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.originalSize = size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = color;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.life = 0;
        this.maxLife = 1000 + Math.random() * 2000;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        this.life++;

        // Smooth edge bouncing
        if (this.x < 0 || this.x > canvas!.width / (window.devicePixelRatio || 1)) {
          this.speedX *= -0.8;
          this.x = Math.max(0, Math.min(canvas!.width / (window.devicePixelRatio || 1), this.x));
        }
        if (this.y < 0 || this.y > canvas!.height / (window.devicePixelRatio || 1)) {
          this.speedY *= -0.8;
          this.y = Math.max(0, Math.min(canvas!.height / (window.devicePixelRatio || 1), this.y));
        }

        // Lifecycle management
        if (this.life > this.maxLife) {
          this.opacity *= 0.98;
        }
      }

      draw() {
        if (!ctx) return;
        
        const pulseSize = this.size + Math.sin(this.pulse) * 0.3;
        const pulseOpacity = this.opacity * (0.8 + Math.sin(this.pulse) * 0.2);
        
        // Microsoft Edge-style gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 3
        );
        
        const isDark = resolvedTheme === 'dark';
        const primaryColor = isDark ? '79, 195, 247' : '0, 120, 212';
        
        gradient.addColorStop(0, `rgba(${primaryColor}, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(${primaryColor}, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${primaryColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }

      isDead() {
        return this.opacity < 0.01;
      }
    }

    // Particle management
    const particles: EdgeParticle[] = [];
    const maxParticles = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;

    const createParticle = () => {
      const isDark = resolvedTheme === 'dark';
      const colors = isDark 
        ? ['79, 195, 247', '41, 182, 246', '100, 181, 246']
        : ['0, 120, 212', '25, 118, 210', '33, 150, 243'];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (canvas.width / (window.devicePixelRatio || 1));
      const y = Math.random() * (canvas.height / (window.devicePixelRatio || 1));
      
      return new EdgeParticle(x, y, size, color);
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // Mouse interaction
    let mouse = { x: 0, y: 0, radius: 120 };
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableInteraction) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    // Resize handler
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    setCanvasSize();

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      
      time += 0.005;
      
      // Clear with Microsoft Edge-inspired background
      const isDark = resolvedTheme === 'dark';
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (isDark) {
        bgGradient.addColorStop(0, 'rgba(30, 30, 30, 0.02)');
        bgGradient.addColorStop(0.5, 'rgba(45, 45, 48, 0.01)');
        bgGradient.addColorStop(1, 'rgba(30, 30, 30, 0.02)');
      } else {
        bgGradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
        bgGradient.addColorStop(0.5, 'rgba(243, 242, 241, 0.01)');
        bgGradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
      }
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      const connectionColor = isDark ? 'rgba(79, 195, 247, 0.08)' : 'rgba(0, 120, 212, 0.06)';
      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.globalAlpha = opacity;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Mouse interaction effects
      if (mouseActive && enableInteraction) {
        for (const particle of particles) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius * 0.02;
            const angle = Math.atan2(dy, dx);
            particle.speedX += Math.cos(angle) * force;
            particle.speedY += Math.sin(angle) * force;
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles and create new ones
        if (particles[i].isDead()) {
          particles.splice(i, 1);
          particles.push(createParticle());
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    
  }, [mounted, resolvedTheme, intensity, enableInteraction]);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
        aria-hidden="true"
        style={{ 
          background: isDark 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d30 50%, #1e1e1e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f3f2f1 50%, #ffffff 100%)',
          minHeight: '100vh',
          height: '100%'
        }}
      />
      
      {/* Additional Microsoft Edge-style overlay */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(79, 195, 247, 0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(0, 120, 212, 0.02) 0%, transparent 70%)',
          minHeight: '100vh'
        }}
      />
    </div>
  );
}
