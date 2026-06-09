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
            ctx.strokeStyle = '#2563eb'; // Elegant blue ink
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
          
          <div className="border-2 border-dashed border-blue-200 rounded-lg overflow-hidden bg-blue-[2px] relative">
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
          
          <div className="flex gap-3 mt-4 justify-end">
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
