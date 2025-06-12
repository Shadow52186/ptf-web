"use client";
import React, { useEffect, useRef } from "react";

const CanvasRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // ✅ Fix: Add null check for canvas
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // ✅ Fix: Add null check for context
    if (!ctx) return;
    
    // ตั้งค่าขนาด canvas
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // สร้างแสงและพื้นหลัง
    const gridDots: Array<{
      x: number;
      y: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];
    let mouseX = 0;
    let mouseY = 0;
    let mouseVisible = false;
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseVisible = true;
    };
    
    const handleMouseLeave = () => {
      mouseVisible = false;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // สร้างจุดตารางเล็กๆ
    const gridSize = 60;
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        if (Math.random() > 0.85) {
          gridDots.push({
            x: x + Math.random() * gridSize,
            y: y + Math.random() * gridSize,
            opacity: Math.random() * 0.15 + 0.05,
            pulseSpeed: Math.random() * 0.01 + 0.005,
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      
      // พื้นหลังสีดำหลัก
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // เพิ่ม gradient สีน้ำเงินมากขึ้น
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 3, 0,
        canvas.width / 2, canvas.height / 3, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)'); // น้ำเงินสดใสมากขึ้น
      bgGradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)'); // น้ำเงินม่วง
      bgGradient.addColorStop(0.8, 'rgba(79, 70, 229, 0.04)'); // น้ำเงินเข้ม
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // วาดตารางสี่เหลี่ยมธรรมดา
      const gridSize = 100;
      const lineWidth = 0.5;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'; // สีน้ำเงินชัดขึ้น
      ctx.lineWidth = lineWidth;
      
      // วาดเส้นแนวตั้ง
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // วาดเส้นแนวนอน
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.restore();
      
      // แสงตามเมาส์
      if (mouseVisible) {
        const mouseGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 150
        );
        mouseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
        mouseGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
        mouseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // วาดจุดเล็กๆ สีน้ำเงิน
      gridDots.forEach(dot => {
        dot.pulsePhase += dot.pulseSpeed;
        const currentOpacity = dot.opacity + Math.sin(dot.pulsePhase) * 0.03;
        
        ctx.save();
        ctx.fillStyle = `rgba(59, 130, 246, ${currentOpacity})`; // เปลี่ยนเป็นสีน้ำเงินชัด
        ctx.fillRect(dot.x, dot.y, 1, 1);
        ctx.restore();
      });
      
      // vignette effect เบาๆ
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)'); // เบากว่าเดิม
      
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // เพิ่ม ambient light ม่วงเบาๆ
      const ambientGradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.8
      );
      ambientGradient.addColorStop(0, 'rgba(168, 85, 247, 0.05)');
      ambientGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // เพิ่ม vignette effect (ขอบมืด)
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default CanvasRain;