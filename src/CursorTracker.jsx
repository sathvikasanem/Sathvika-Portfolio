import React, { useEffect, useRef, useState } from 'react';
import './index.css';

function lerpAngle(a, b, t) {
  let delta = b - a;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  return a + delta * t;
}

const CursorTracker = () => {
  const canvasRef = useRef(null);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const framesRef = useRef([]);
  const centerFrameRef = useRef(null);
  const currentAngleRef = useRef(0);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const reqRef = useRef(null);

  // CONFIGURATION FOR TRACKING CALIBRATION
  const ANGLE_OFFSET = Math.PI / 2;
  const INVERT_ROTATION = false;

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/character.mp4';
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    const extractedFrames = [];
    let lastTime = -1;
    let expectedFrames = 64;

    video.onloadedmetadata = () => {
      const duration = video.duration;
      // Calculate a minimum time gap to only capture around 60-80 frames to save RAM
      const timeGap = duration ? duration / expectedFrames : 0.05; 

      const extractCanvas = document.createElement('canvas');
      const extCtx = extractCanvas.getContext('2d', { willReadFrequently: true });
      
      // Downscale slightly for massive performance boost during rendering if needed
      // 1920x1080 is heavy for data URLs, 1280x720 is indistinguishable for background
      extractCanvas.width = 1280; 
      extractCanvas.height = 720;

      const captureFrame = () => {
        if (video.ended || video.paused) return;
        
        // Capture frames spaced out by timeGap to prevent memory overload
        if (video.currentTime - lastTime >= timeGap || lastTime === -1) {
          extCtx.drawImage(video, 0, 0, extractCanvas.width, extractCanvas.height);
          const img = new Image();
          img.src = extractCanvas.toDataURL('image/webp', 0.6);
          extractedFrames.push(img);
          lastTime = video.currentTime;
          
          if (duration) {
            setLoadingProgress(Math.min(99, Math.round((video.currentTime / duration) * 100)));
          }
        }
        
        if (video.requestVideoFrameCallback) {
          video.requestVideoFrameCallback(captureFrame);
        } else {
          requestAnimationFrame(captureFrame);
        }
      };

      video.onplay = () => {
        if (video.requestVideoFrameCallback) {
          video.requestVideoFrameCallback(captureFrame);
        } else {
          requestAnimationFrame(captureFrame);
        }
      };

      video.onended = () => {
        framesRef.current = extractedFrames;
        centerFrameRef.current = extractedFrames[0]; 
        setFramesLoaded(true);
      };

      video.play().catch(err => {
        console.error("Autoplay failed", err);
        setFramesLoaded(true);
      });
    };

    video.onerror = () => setFramesLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!framesLoaded || framesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set alpha: false for huge GPU compositing speedup
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    
    canvas.width = 1280;
    canvas.height = 720;

    let lastRenderedState = null; // Track what was drawn to prevent redundant repaints

    const render = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const dx = mouseRef.current.x - centerX;
      const dy = mouseRef.current.y - centerY;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const deadzoneRadius = window.innerWidth * 0.12;

      let frameIndexToDraw = -1;
      let isCenter = false;

      if (distance < deadzoneRadius) {
        isCenter = true;
        currentAngleRef.current = lerpAngle(currentAngleRef.current, Math.PI / 2, 0.35); // Faster snap
      } else {
        const targetAngle = Math.atan2(dy, dx);
        currentAngleRef.current = lerpAngle(currentAngleRef.current, targetAngle, 0.35); // Snappier reaction

        let adjustedAngle = currentAngleRef.current + ANGLE_OFFSET;
        if (INVERT_ROTATION) adjustedAngle = -adjustedAngle;

        let normalizedAngle = adjustedAngle;
        while (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
        while (normalizedAngle >= 2 * Math.PI) normalizedAngle -= 2 * Math.PI;
        
        const totalFrames = framesRef.current.length;
        frameIndexToDraw = Math.round((normalizedAngle / (2 * Math.PI)) * totalFrames) % totalFrames;
      }

      // EXTREME OPTIMIZATION: Only draw if the target frame actually changed
      const currentState = isCenter ? 'center' : frameIndexToDraw;
      
      if (lastRenderedState !== currentState) {
        ctx.fillStyle = '#0d0d0d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (isCenter) {
          if (centerFrameRef.current && centerFrameRef.current.complete) {
            ctx.drawImage(centerFrameRef.current, 0, 0, canvas.width, canvas.height);
          }
        } else {
          const imgToDraw = framesRef.current[frameIndexToDraw];
          if (imgToDraw && imgToDraw.complete) {
            ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
          }
        }
        lastRenderedState = currentState;
      }

      reqRef.current = requestAnimationFrame(render);
    };

    reqRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(reqRef.current);
  }, [framesLoaded]);

  if (!framesLoaded) {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, color: 'white', fontFamily: 'Inter', fontSize: '1.2rem', backgroundColor: '#0d0d0d' }}>
        Loading high-quality assets... {loadingProgress}%
      </div>
    );
  }

  return (
    <div className="hero-canvas-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CursorTracker;
