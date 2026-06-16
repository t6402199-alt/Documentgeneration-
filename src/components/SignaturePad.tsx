/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, X, FilePenLine } from 'lucide-react';

interface SignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  title: string;
}

export function SignaturePad({ isOpen, onClose, onSave, title }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState('#2563eb'); // Default blue ink

  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow canvas to render in DOM before setting it up
      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = 150; // fixed height
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.strokeStyle = penColor; // Elegant blue ink
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = penColor;
      }
    }
  }, [penColor]);

  if (!isOpen) return null;

  const selectPreset = (presetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing settings for premium look
    ctx.strokeStyle = penColor; // Use selected pen color
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const w = canvas.width;
    const h = canvas.height;
    
    if (presetIndex === 1) {
      // Draw Volute Impériale
      ctx.beginPath();
      ctx.lineWidth = 1.1;
      const R = 42, r = 13, d = 19;
      const cx = w / 2 - 35;
      const cy = h / 2 - 5;
      
      for (let theta = 0; theta < Math.PI * 10; theta += 0.02) {
        const x = cx + (R - r) * Math.cos(theta) + d * Math.cos((R - r) * theta / r);
        const y = cy + (R - r) * Math.sin(theta) - d * Math.sin((R - r) * theta / r) * 0.9;
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Main signature swashes
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.moveTo(w / 2 - 120, h / 2 + 10);
      ctx.bezierCurveTo(w / 2 - 85, h / 2 - 45, w / 2 - 105, h / 2 - 45, w / 2 - 85, h / 2 + 15);
      ctx.bezierCurveTo(w / 2 - 65, h / 2 + 45, w / 2 - 45, h / 2 - 5, w / 2 - 15, h / 2 - 15);
      
      for (let x = w / 2 - 15; x < w / 2 + 80; x += 18) {
        ctx.bezierCurveTo(x + 5, h / 2 - 20, x + 10, h / 2 - 20, x + 15, h / 2 + 5);
      }
      
      ctx.moveTo(w / 2 + 70, h / 2 + 5);
      ctx.bezierCurveTo(w / 2 + 90, h / 2 - 10, w / 2 + 100, h / 2 - 3, w / 2 + 80, h / 2 + 18);
      ctx.quadraticCurveTo(w / 2 - 40, h / 2 + 35, w / 2 - 135, h / 2 + 22);
      ctx.stroke();
      
      // Little ink dot
      ctx.beginPath();
      ctx.arc(w / 2 + 100, h / 2 + 12, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = penColor;
      ctx.fill();
    } else if (presetIndex === 2) {
      // Draw Paraphe 3D
      ctx.beginPath();
      ctx.lineWidth = 1.4;
      ctx.moveTo(w / 2 - 115, h / 2 + 15);
      for (let t = 0; t < 15; t += 0.05) {
        const x = w / 2 - 115 + t * 13 + Math.sin(t * 2.2) * 16;
        const y = h / 2 + Math.cos(t * 1.5) * (24 - t * 1.1) + Math.sin(t) * 4;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.lineWidth = 0.9;
      const cx2 = w / 2 + 55;
      const cy2 = h / 2 - 8;
      for (let a = 0; a < 25; a += 0.1) {
        const radius = 2 + a * 1.05;
        const x = cx2 + radius * Math.sin(a * 1.7);
        const y = cy2 + radius * Math.cos(a * 1.7) * 0.75;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.moveTo(w / 2 - 125, h / 2 + 18);
      ctx.lineTo(w / 2 - 95, h / 2 - 32);
      ctx.lineTo(w / 2 - 70, h / 2 + 20);
      
      ctx.moveTo(w / 2 - 95, h / 2 + 28);
      ctx.quadraticCurveTo(w / 2, h / 2 + 12, w / 2 + 95, h / 2 + 22);
      ctx.stroke();
    } else {
      // Draw Clé Vectorielle
      ctx.beginPath();
      ctx.lineWidth = 1.1;
      const cx3 = w / 2 - 30;
      const cy3 = h / 2 - 5;
      for (let theta = 0; theta < Math.PI * 8; theta += 0.04) {
        const x = cx3 + 48 * Math.cos(theta) + 16 * Math.cos(4 * theta);
        const y = cy3 + 26 * Math.sin(theta) - 10 * Math.sin(4 * theta) * 0.9;
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.lineWidth = 2.1;
      ctx.moveTo(w / 2 - 125, h / 2 + 22);
      ctx.quadraticCurveTo(w / 2, h / 2 + 32, w / 2 + 110, h / 2 + 12);
      ctx.moveTo(w / 2 - 105, h / 2 + 27);
      ctx.quadraticCurveTo(w / 2, h / 2 + 36, w / 2 + 95, h / 2 + 18);
      
      ctx.moveTo(w / 2 - 115, h / 2 + 3);
      ctx.bezierCurveTo(w / 2 - 95, h / 2 - 38, w / 2 - 130, h / 2 - 38, w / 2 - 100, h / 2 + 12);
      ctx.stroke();
    }
    
    setHasDrawn(true);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };

  return (
    <div id="signature-modal-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div id="signature-modal-card" className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="bg-slate-50 px-5 py-4 border-b border-secondary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilePenLine className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-base">{title}</h3>
          </div>
          <button 
            id="close-sig-button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-xs text-slate-500 mb-3">
            Utilisez votre souris ou votre écran tactile pour dessiner votre signature dans la zone bleue ci-dessous :
          </p>
          
          <div className="border-2 border-dashed border-blue-200 rounded-lg overflow-hidden bg-blue-[2px] relative mb-4">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[150px] cursor-crosshair block touch-none bg-blue-50/20"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="text-sm text-slate-400 font-medium">Dessiner ici</span>
              </div>
            )}
          </div>

          {/* CHOIX DE LA COULEUR DE L'ENCRE */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-700 block mb-1.5 text-left">
              Couleur de l'encre :
            </span>
            <div className="flex items-center gap-3">
              {[
                { name: 'Bleu standard', value: '#2563eb', bg: 'bg-[#2563eb]' },
                { name: 'Bleu marine', value: '#1e3a8a', bg: 'bg-[#1e3a8a]' },
                { name: 'Noir', value: '#18181b', bg: 'bg-[#18181b]' },
                { name: 'Rouge', value: '#dc2626', bg: 'bg-[#dc2626]' },
                { name: 'Vert', value: '#059669', bg: 'bg-[#059669]' },
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setPenColor(color.value)}
                  className={`w-7 h-7 rounded-full ${color.bg} border-2 transition-all duration-200 cursor-pointer flex items-center justify-center relative ${
                    penColor === color.value 
                      ? 'border-amber-500 scale-110 shadow-sm' 
                      : 'border-slate-200 hover:scale-105'
                  }`}
                  title={color.name}
                >
                  {penColor === color.value && (
                    <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              ))}
              <span className="text-[10px] text-slate-400 font-medium italic select-none">
                {penColor === '#2563eb' && "Bleu standard"}
                {penColor === '#1e3a8a' && "Bleu marine"}
                {penColor === '#18181b' && "Noir classique"}
                {penColor === '#dc2626' && "Rouge légal"}
                {penColor === '#059669' && "Vert émeraude"}
              </span>
            </div>
          </div>

          {/* PRESSET MASSIVE COMPLEX SIGNATURES SECURED */}
          <div className="pt-3 border-t border-slate-100 mb-4">
            <span className="text-xs font-semibold text-slate-700 block mb-2 text-left">
              🛡️ Signatures de sécurité complexes (incopiables à la main) :
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => selectPreset(1)}
                className="py-1.5 px-2 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 rounded-lg text-[10px] font-bold text-slate-600 text-center transition-all cursor-pointer"
                title="Spirographe guilloché impérial et arabesque"
              >
                Volute Impériale
              </button>
              <button
                type="button"
                onClick={() => selectPreset(2)}
                className="py-1.5 px-2 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 rounded-lg text-[10px] font-bold text-slate-600 text-center transition-all cursor-pointer"
                title="Paraphe sinusoïdal cryptographique 3D"
              >
                Paraphe 3D
              </button>
              <button
                type="button"
                onClick={() => selectPreset(3)}
                className="py-1.5 px-2 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 rounded-lg text-[10px] font-bold text-slate-600 text-center transition-all cursor-pointer"
                title="Clé géométrique vectorielle ultra sécurisée"
              >
                Clé Vectorielle
              </button>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              id="clear-canvas-button"
              type="button"
              onClick={clearCanvas}
              disabled={!hasDrawn}
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Réinitialiser
            </button>
          </div>
        </div>
        
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex gap-3 justify-end text-sm">
          <button
            id="cancel-sig-button"
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-medium transition-colors"
          >
            Annuler
          </button>
          <button
            id="confirm-sig-button"
            type="button"
            onClick={saveSignature}
            disabled={!hasDrawn}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" />
            Valider la signature
          </button>
        </div>
      </div>
    </div>
  );
}
