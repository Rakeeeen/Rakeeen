import React, { useEffect, useRef } from 'react';
import { useSettings } from '@/data/Settings';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { showCursor } = useSettings();

  useEffect(() => {
    if (!showCursor) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let animId: number;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const interactiveSelector = 'a, button, [role="button"], input, select, textarea, label[for], .polaroid, .skill-tag';
    
    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t && t.closest(interactiveSelector)) {
        isHovering = true;
        if (cursorRef.current) {
          cursorRef.current.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
          cursorRef.current.style.transform = `translate(${curX}px, ${curY}px) scale(1.4)`;
        }
      }
    };

    const onLeave = (e: MouseEvent) => {
      const t = e.relatedTarget as Element | null;
      if (!t || !t.closest(interactiveSelector)) {
        isHovering = false;
        if (cursorRef.current) {
          cursorRef.current.style.transition = 'transform 0.15s ease-out';
          cursorRef.current.style.transform = `translate(${curX}px, ${curY}px) scale(1)`;
        }
      }
    };

    const animate = () => {
      // Smooth interpolation (lerp factor: 0.18)
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      
      if (cursorRef.current) {
        if (!isHovering) {
          cursorRef.current.style.transition = 'none';
          cursorRef.current.style.transform = `translate(${curX}px, ${curY}px) scale(1)`;
        } else {
          cursorRef.current.style.transform = `translate(${curX}px, ${curY}px) scale(1.4)`;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(animId);
    };
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-wrapper hidden md:flex"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        width: '28px',
        height: '28px',
        willChange: 'transform',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Brutalist Custom SVG Pointer */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: 'rotate(-4deg) translate(-2px, -2px)',
          filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15))'
        }}
      >
        <path
          d="M4.5 3L18.5 11.2L11.8 12.8L9.2 19.5L4.5 3Z"
          fill="var(--ink)"
          stroke="var(--paper-dark)"
          strokeWidth="1"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
      </svg>
    </div>
  );
};
