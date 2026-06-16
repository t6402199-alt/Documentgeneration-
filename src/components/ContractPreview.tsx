/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PartyDetails, LoanDetails, StylingDetails, ContractType, DocumentViewType } from '../types';
import { Award, ShieldCheck, Scale, Landmark, Calendar, Percent, AlertOctagon, Mail, Phone, Briefcase } from 'lucide-react';
import { secondaryDocsT } from './secondaryDocTranslations';

interface ContractPreviewProps {
  lender: PartyDetails;
  borrower: PartyDetails;
  notary: PartyDetails;
  loan: LoanDetails;
  styling: StylingDetails;
  onOpenSignature: (party: 'lender' | 'borrower' | 'notary') => void;
  fontFamily: string;
  exportMode?: 'editable' | 'official';
  contractType?: ContractType;
  selectedDoc?: DocumentViewType;
}

// Helper vectors for rendering flags cleanly
export function FlagVector({ country, className = "h-6 w-9" }: { country: string; className?: string }) {
  if (country === 'IT') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" fill="#008C45" />
        <rect x="1" width="1" height="2" fill="#F4F9FF" />
        <rect x="2" width="1" height="2" fill="#CD212A" />
      </svg>
    );
  }
  if (country === 'FR') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" fill="#002157" />
        <rect x="1" width="1" height="2" fill="#F4F9FF" />
        <rect x="2" width="1" height="2" fill="#C8102E" />
      </svg>
    );
  }
  if (country === 'EU') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#003399" />
        <g fill="#FFCC00" transform="translate(1.5, 1) scale(0.12)">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = Math.sin(angle) * 4.5;
            const y = -Math.cos(angle) * 4.5;
            return (
              <polygon
                key={i}
                points="0,-1 0.22,-0.3 0.95,-0.3 0.36,0.1 0.58,0.8 0,0.4 -0.58,0.8 -0.36,0.1 -0.95,-0.3 -0.22,-0.3"
                transform={`translate(${x}, ${y}) scale(0.8)`}
              />
            );
          })}
        </g>
      </svg>
    );
  }
  if (country === 'DE') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="1" fill="#000000" />
        <rect y="1" width="5" height="1" fill="#DD0000" />
        <rect y="2" width="5" height="1" fill="#FFCC00" />
      </svg>
    );
  }
  if (country === 'ES') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#C11B17" />
        <rect y="0.5" width="3" height="1" fill="#F4D03F" />
        <circle cx="0.8" cy="1" r="0.2" fill="#C11B17" opacity="0.8" />
      </svg>
    );
  }
  if (country === 'BE') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" fill="#000000" />
        <rect x="1" width="1" height="2" fill="#FDDA0D" />
        <rect x="2" width="1" height="2" fill="#C11B17" />
      </svg>
    );
  }
  if (country === 'NL') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#AE1C28" />
        <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
        <rect y="1.33" width="3" height="0.67" fill="#21468B" />
      </svg>
    );
  }
  if (country === 'LU') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#EA1E25" />
        <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
        <rect y="1.33" width="3" height="0.67" fill="#4B9CD3" />
      </svg>
    );
  }
  if (country === 'PT') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1.2" height="2" fill="#006600" />
         <rect x="1.2" width="1.8" height="2" fill="#FF0000" />
         <circle cx="1.2" cy="1" r="0.3" fill="#FFCC00" opacity="0.9" />
       </svg>
    );
  }
  if (country === 'IE') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" fill="#169B62" />
        <rect x="1" width="1" height="2" fill="#FFFFFF" />
        <rect x="2" width="1" height="2" fill="#FF883E" />
      </svg>
    );
  }
  if (country === 'GR') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
        <rect width="9" height="6" fill="#005BA6" />
        <rect y="0.67" width="9" height="0.67" fill="#FFFFFF" />
        <rect y="2.0" width="9" height="0.67" fill="#FFFFFF" />
        <rect y="3.33" width="9" height="0.67" fill="#FFFFFF" />
        <rect y="4.67" width="9" height="0.67" fill="#FFFFFF" />
        <rect width="3.33" height="3.33" fill="#005BA6" />
        <rect x="1.33" width="0.67" height="3.33" fill="#FFFFFF" />
        <rect y="1.33" width="3.33" height="0.67" fill="#FFFFFF" />
      </svg>
    );
  }
  if (country === 'AT') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#ED2939" />
        <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
        <rect y="1.33" width="3" height="0.67" fill="#ED2939" />
      </svg>
    );
  }
  if (country === 'PL') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="1" fill="#FFFFFF" />
        <rect y="1" width="3" height="1" fill="#DC143C" />
      </svg>
    );
  }
  if (country === 'RO') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" fill="#002B7F" />
        <rect x="1" width="1" height="2" fill="#FCD116" />
        <rect x="2" width="1" height="2" fill="#CE1126" />
      </svg>
    );
  }
  if (country === 'SE') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="10" fill="#006AA7" />
        <rect x="5" width="2" height="10" fill="#FECC00" />
        <rect y="4" width="16" height="2" fill="#FECC00" />
      </svg>
    );
  }
  if (country === 'DK') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 37 28" xmlns="http://www.w3.org/2000/svg">
        <rect width="37" height="28" fill="#C8102E" />
        <rect x="12" width="4" height="28" fill="#FFFFFF" />
        <rect y="12" width="37" height="4" fill="#FFFFFF" />
      </svg>
    );
  }
  if (country === 'FI') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 18 11" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="11" fill="#FFFFFF" />
        <rect x="5" width="3" height="11" fill="#003580" />
        <rect y="4" width="18" height="3" fill="#003580" />
      </svg>
    );
  }
  if (country === 'CH') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="1" fill="#D3010C" />
        <rect x="0.4" y="0.2" width="0.2" height="0.6" fill="#FFFFFF" />
        <rect x="0.2" y="0.4" width="0.6" height="0.2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (country === 'GB') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="30" fill="#012169" />
        <path d="M0,0 L50,30 M50,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L50,30 M50,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M25,0 L25,30 M0,15 L50,15" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M25,0 L25,30 M0,15 L50,15" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  }
  if (country === 'HR') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#FF0000" />
        <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
        <rect y="1.33" width="3" height="0.67" fill="#171796" />
        <circle cx="1.5" cy="1" r="0.2" fill="#FF0000" opacity="0.8" />
      </svg>
    );
  }
  if (country === 'CZ') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="1" fill="#FFFFFF" />
        <rect y="1" width="3" height="1" fill="#D7141A" />
        <polygon points="0,0 1.5,1 0,2" fill="#11457E" />
      </svg>
    );
  }
  if (country === 'HU') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#CD2A3E" />
        <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
        <rect y="1.33" width="3" height="0.67" fill="#436F4D" />
      </svg>
    );
  }
  if (country === 'BG') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="1" fill="#FFFFFF" />
        <rect y="1" width="5" height="1" fill="#00966E" />
        <rect y="2" width="5" height="1" fill="#D62612" />
      </svg>
    );
  }
  if (country === 'EE') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#0072CE" />
        <rect y="0.67" width="3" height="0.66" fill="#000000" />
        <rect y="1.33" width="3" height="0.67" fill="#FFFFFF" />
      </svg>
    );
  }
  if (country === 'LT') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#FDB913" />
        <rect y="0.67" width="3" height="0.66" fill="#006A44" />
        <rect y="1.33" width="3" height="0.67" fill="#C1272D" />
      </svg>
    );
  }
  if (country === 'LV') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.8" fill="#9E3039" />
        <rect y="0.8" width="3" height="0.4" fill="#FFFFFF" />
        <rect y="1.2" width="3" height="0.8" fill="#9E3039" />
      </svg>
    );
  }
  if (country === 'NO') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="16" fill="#BA0C2F" />
        <rect x="6" width="4" height="16" fill="#FFFFFF" />
        <rect y="6" width="22" height="4" fill="#FFFFFF" />
        <rect x="7" width="2" height="16" fill="#00205B" />
        <rect y="7" width="22" height="2" fill="#00205B" />
      </svg>
    );
  }
  if (country === 'IS') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 25 18" xmlns="http://www.w3.org/2000/svg">
        <rect width="25" height="18" fill="#003897" />
        <rect x="7" width="4" height="18" fill="#FFFFFF" />
        <rect y="7" width="25" height="4" fill="#FFFFFF" />
        <rect x="8" width="2" height="18" fill="#D7282F" />
        <rect y="8" width="25" height="2" fill="#D7282F" />
      </svg>
    );
  }
  if (country === 'MC') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="1" fill="#E2001A" />
        <rect y="1" width="3" height="1" fill="#FFFFFF" />
      </svg>
    );
  }
  if (country === 'LI') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="1" fill="#00205B" />
        <rect y="1" width="3" height="1" fill="#C8102E" />
      </svg>
    );
  }
  if (country === 'SK') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#FFFFFF" />
        <rect y="0.67" width="3" height="0.66" fill="#0B4EA2" />
        <rect y="1.33" width="3" height="0.67" fill="#EE1C25" />
      </svg>
    );
  }
  if (country === 'SI') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#FFFFFF" />
        <rect y="0.67" width="3" height="0.66" fill="#002395" />
        <rect y="1.33" width="3" height="0.67" fill="#ED2939" />
      </svg>
    );
  }
  if (country === 'UA') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="1" fill="#0057B7" />
        <rect y="1" width="3" height="1" fill="#FFD700" />
      </svg>
    );
  }
  if (country === 'MT') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1.5" height="2" fill="#FFFFFF" />
        <rect x="1.5" width="1.5" height="2" fill="#D11218" />
      </svg>
    );
  }
  if (country === 'CY') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#FFFFFF" />
        <ellipse cx="1.5" cy="1" rx="0.5" ry="0.3" fill="#D37E2A" />
      </svg>
    );
  }
  if (country === 'AL') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#E41B13" />
        <circle cx="1.5" cy="1" r="0.35" fill="#000000" opacity="0.85" />
      </svg>
    );
  }
  if (country === 'RS') {
    return (
      <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="0.67" fill="#C11B17" />
        <rect y="0.67" width="3" height="0.66" fill="#00205B" />
        <rect y="1.33" width="3" height="0.67" fill="#FFFFFF" />
      </svg>
    );
  }
  return (
    <svg className={`${className} shadow-xs border border-slate-200`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
      <rect width="3" height="2" fill="#4B9CD3" />
      <circle cx="1.5" cy="1" r="0.5" fill="none" stroke="white" strokeWidth="0.08" />
    </svg>
  );
}

// Scalable vector for Scales of Justice
export function ScalesOfJusticeVector({ className = "w-full h-full", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Elegant concentric security rings */}
      <circle cx="80" cy="80" r="76" stroke={color} strokeWidth="0.8" strokeDasharray="3,3" />
      <circle cx="80" cy="80" r="72" stroke={color} strokeWidth="1.2" />
      <circle cx="80" cy="80" r="68" stroke={color} strokeWidth="0.5" />
      <circle cx="80" cy="80" r="44" stroke={color} strokeWidth="0.6" strokeDasharray="6,2" />
      
      {/* Micro-stars around the ring representing official jurisdiction */}
      <path d="M 80,7 L 81,10 L 84,10 L 82,12 L 83,15 L 80,13 L 77,15 L 78,12 L 76,10 L 79,10 Z" fill={color} />
      <path d="M 153,80 L 150,81 L 150,84 L 148,82 L 145,83 L 147,80 L 145,77 L 148,78 L 150,76 L 150,79 Z" fill={color} />
      <path d="M 80,153 L 81,150 L 84,150 L 82,148 L 83,145 L 80,147 L 77,145 L 78,148 L 76,150 L 79,150 Z" fill={color} />
      <path d="M 7,80 L 10,81 L 10,84 L 12,82 L 15,83 L 13,80 L 15,77 L 12,78 L 10,76 L 10,79 Z" fill={color} />

      {/* Classical Scales of Justice inside */}
      {/* Central majestic pillar */}
      <path d="M 78,125 L 82,125 L 82,45 L 78,45 Z" fill={color} />
      <path d="M 68,129 L 92,129 M 72,125 L 88,125" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pillar crown and top design */}
      <circle cx="80" cy="41" r="4.5" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="80" cy="33" r="2.5" fill={color} />
      
      {/* Horizontal balancing beam */}
      <path d="M 35,48 C 50,44 70,44 80,44 C 90,44 110,44 125,48" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Delicate scroll brackets beneath the beam */}
      <path d="M 50,47 Q 80,53 110,47" stroke={color} strokeWidth="0.8" fill="none" />
      
      {/* Left Pan cords & Pan */}
      <path d="M 35,48 L 22,86 M 35,48 L 48,86" stroke={color} strokeWidth="0.7" />
      <path d="M 18,86 Q 35,93 52,86" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 14,86 L 56,86" stroke={color} strokeWidth="0.8" />
      
      {/* Right Pan cords & Pan */}
      <path d="M 125,48 L 112,86 M 125,48 L 138,86" stroke={color} strokeWidth="0.7" />
      <path d="M 108,86 Q 125,93 142,86" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 104,86 L 146,86" stroke={color} strokeWidth="0.8" />

      {/* Center balance indicator needle */}
      <path d="M 80,44 L 80,26" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <polygon points="78,28 82,28 80,21" fill={color} />
    </svg>
  );
}

export function NotaryOfficialStamp({ notaryName, city, country, colorClass, rotateAngle, customStyle }: {
  notaryName: string;
  city: string;
  country: string;
  colorClass: string;
  rotateAngle: number;
  customStyle?: React.CSSProperties;
}) {
  const colorHex = 
    colorClass === 'text-blue-700' ? '#1d4ed8' :
    colorClass === 'text-red-700' ? '#b91c1c' :
    colorClass === 'text-emerald-700' ? '#047857' : '#1e293b';

  const defaultStyle: React.CSSProperties = { 
    transform: `rotate(${rotateAngle}deg) scale(0.88)`,
    right: '11%',
    bottom: '18%',
    zIndex: 40,
    filter: 'url(#real-stamp-ink)'
  };

  return (
    <div 
      id="notary-notarial-stamp"
      className="absolute select-none pointer-events-none transition-transform duration-300 print:opacity-95"
      style={customStyle || defaultStyle}
    >
      <svg width="125" height="125" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        {/* Outer dotted circle */}
        <circle cx="75" cy="75" r="71" fill="none" stroke={colorHex} strokeWidth="1.5" strokeDasharray="3,3" />
        {/* Outer border */}
        <circle cx="75" cy="75" r="67" fill="none" stroke={colorHex} strokeWidth="2.5" />
        {/* Inner border */}
        <circle cx="75" cy="75" r="46" fill="none" stroke={colorHex} strokeWidth="1.2" />
        
        {/* Text along upper path */}
        <path id="stamp-text-upper" d="M 18,75 A 57,57 0 1,1 132,75" fill="none" />
        <text fontFamily="monospace" fontSize="8.2" fontWeight="bold" fill={colorHex} letterSpacing="1.2">
          <textPath href="#stamp-text-upper" startOffset="50%" textAnchor="middle">
            {`* ÉTUDE NOTARIALE DE ME ${notaryName.toUpperCase()} *`}
          </textPath>
        </text>

        {/* Text along lower path */}
        <path id="stamp-text-lower" d="M 132,75 A 57,57 0 1,1 18,75" fill="none" />
        <text fontFamily="monospace" fontSize="8" fontWeight="bold" fill={colorHex} letterSpacing="1.5">
          <textPath href="#stamp-text-lower" startOffset="50%" textAnchor="middle">
            {`${city.toUpperCase()} (${country.toUpperCase()}) * SERVICES NOTARIAUX`}
          </textPath>
        </text>

        {/* Center content */}
        <g stroke={colorHex} strokeWidth="1">
          <path d="M60,95 L90,95 M67,93 L83,93 M75,93 L75,55 M70,55 L80,55" strokeWidth="1.5" />
          <path d="M53,59 Q75,54 97,59" strokeWidth="2" fill="none" />
          <path d="M53,59 L48,75 M53,59 L58,75" />
          <path d="M48,75 Q53,78 58,75" fill="none" />
          <path d="M97,59 L92,75 M97,59 L102,75" />
          <path d="M92,75 Q97,78 102,75" fill="none" />
          <circle cx="75" cy="50" r="2.5" />
        </g>
        
        <text x="75" y="44" fontFamily="serif" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill={colorHex}>
          OFFICIEL
        </text>
        <text x="75" y="105" fontFamily="serif" fontSize="6" fontStyle="italic" textAnchor="middle" fill={colorHex}>
          Sceau d'État
        </text>
      </svg>
    </div>
  );
}

export function ItalianMarcaDaBollo({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`border border-amber-600/40 bg-gradient-to-br from-[#fbf8f0] to-[#f5ebd0] p-1.5 rounded shadow-2xs w-[115px] text-slate-800 relative select-none pointer-events-none ${className}`} 
      style={{ fontFamily: 'monospace', fontSize: '7.5px', lineHeight: '1.2' }}
    >
      {/* Tiny secure background simulation */}
      <div className="absolute inset-0 bg-radial opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #b45309 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
      
      {/* Top logo */}
      <div className="flex items-center justify-between border-b border-amber-400 pb-0.5 mb-1 relative z-10">
        <span className="text-[6px] text-amber-800 font-serif font-bold">REPUBBLICA ITALIANA</span>
        <svg className="h-3 w-3 text-amber-800" viewBox="0 0 100 100">
          <polygon points="50,10 61,40 92,40 67,60 77,90 50,72 23,90 33,60 8,40 39,40" fill="currentColor" opacity="0.8" />
          <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className="font-bold text-[6px] text-amber-900 tracking-tighter text-center relative z-10 uppercase font-sans">MINISTERO DELL'ECONOMIA E DELLE FINANZE</div>
      <div className="font-extrabold text-[8px] tracking-wide text-slate-900 border-y border-stone-300 py-0.5 my-1 text-center bg-white/40 relative z-10">MARCA DA BOLLO</div>
      
      <div className="space-y-0.5 text-[7px] text-stone-700 relative z-10">
        <div className="flex justify-between font-bold text-slate-950">
          <span>VALORE:</span>
          <span className="text-blue-900 font-extrabold">€ 16,00</span>
        </div>
        <div className="text-[5.5px] text-right text-stone-500">SEDICI/00</div>
        <div className="text-[5.5px]">DATA: 09/06/2026</div>
        <div className="text-[5.5px]">ORA: 13:33:56</div>
        <div className="text-[5px] text-stone-500 tracking-tighter overflow-hidden whitespace-nowrap">ID: 011504981743015</div>
      </div>
      
      {/* Miniature Barcode simulation */}
      <div className="mt-1 pb-0.5 relative z-10 flex items-center justify-center bg-white border border-stone-200 p-0.5">
        <div className="w-full h-3 flex gap-[1px]">
          <div className="w-[1.5px] bg-black h-full"></div>
          <div className="w-[1px] bg-black h-full"></div>
          <div className="w-[3px] bg-black h-full"></div>
          <div className="w-[1px] bg-black h-full"></div>
          <div className="w-[2px] bg-black h-full"></div>
          <div className="w-[1px] bg-black h-full"></div>
          <div className="w-[1.5px] bg-black h-full"></div>
          <div className="w-[3px] bg-black h-full"></div>
          <div className="w-[1.5px] bg-black h-full"></div>
          <div className="w-[1px] bg-black h-full"></div>
          <div className="w-[2px] bg-black h-full"></div>
          <div className="w-[3px] bg-black h-full"></div>
          <div className="w-[1.5px] bg-black h-full"></div>
        </div>
      </div>
      
      {/* Decorative Stamp edges */}
      <div className="absolute -top-[1.5px] inset-x-0 flex justify-between px-1 pointer-events-none select-none">
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
      </div>
      <div className="absolute -bottom-[1.5px] inset-x-0 flex justify-between px-1 pointer-events-none select-none">
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
        <div className="w-[2.5px] h-[2.5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
}

export function CrediviteCompanyStamp({ lang }: { lang: 'FR' | 'IT' | 'EN' }) {
  const line1 = lang === 'FR' ? "COMPAGNIE DE CRÉDIT CREDIVITE S.A." : lang === 'IT' ? "SOCIETÀ CREDIVITE S.A. FINANZA" : "CREDIVITE S.A. LOAN CORPORATION";
  const line2 = lang === 'FR' ? "SERVICES DE FINANCEMENT COMPENSATEURS" : lang === 'IT' ? "SERVIZI DI CREDITO COMPENSATIVI" : "CIVIL SETTLEMENT CREDIT DEPT";
  const line3 = lang === 'FR' ? "ACCORD DE PRÊT DUMENT AGRÉÉ" : lang === 'IT' ? "CONTRATTO DI PRESTITO DEBITAMENTE OMOLOGATO" : "DEED OF TRUST OFFICIALLY SECURED";
  const badge = lang === 'FR' ? "APPROUVÉ & CERTIFIÉ" : lang === 'IT' ? "APPROVATO & CERTIFICATO" : "APPROVED & OUTSTANDING";

  return (
    <div 
      className="border-2 border-double border-blue-800 bg-blue-50/15 p-2 text-blue-800 rounded-sm w-full max-w-[195px] relative font-mono text-center select-none pointer-events-none flex flex-col items-center justify-center min-h-[92px]" 
      style={{ fontSize: '7px', lineHeight: '1.2', filter: 'url(#real-stamp-ink)' }}
    >
      <div className="font-extrabold text-[8px] tracking-wide text-blue-950 uppercase border-b border-blue-800 pb-0.5 mb-1.5 w-full text-center">
        ★ {lang === 'EN' ? 'CREDIVITE S.A.' : 'CREDIVITE S.A.'} ★
      </div>
      <div className="text-[6.5px] text-blue-700 uppercase font-bold leading-tight">{line1}</div>
      <div className="text-[5.5px] font-sans text-stone-600 font-medium my-[1px] leading-tight">{line2}</div>
      <div className="my-[2px] font-bold text-red-600 text-[6px] tracking-wider border border-red-600 px-1 rounded-sm uppercase bg-red-50/5">
        {badge}
      </div>
      <div className="text-[5px] text-stone-500 font-sans tracking-wide leading-tight">{line3}</div>

      {/* Embedded proxy signature of the lender company */}
      <div className="absolute inset-0 flex items-center justify-center opacity-80 pt-2 pointer-events-none">
        <svg className="w-full h-11 text-blue-800" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8,22 Q24,4 34,26 T62,14 Q78,4 92,18 T108,10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20,28 Q42,2 72,30 T102,23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5,18 L115,22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="3,3" />
        </svg>
      </div>
    </div>
  );
}

export function NotaryPreSignature({ notaryName, lang }: { notaryName: string; lang: 'FR' | 'IT' | 'EN' }) {
  const label = lang === 'FR' ? `Me ${notaryName}` : lang === 'IT' ? `Notaio ${notaryName}` : `Notary ${notaryName}`;
  return (
    <div className="relative w-full h-[65px] flex items-center justify-center pointer-events-none select-none">
      {/* Decorative official handwritten-like notary signature */}
      <svg className="absolute w-[120px] h-[55px] text-blue-800 opacity-90" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,35 Q25,10 40,35 T70,15 T100,32 Q110,8 120,20 M25,18 L105,22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5,40 Q55,5 110,38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <circle cx="15" cy="28" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="110" cy="20" r="4.5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <div className="absolute bottom-0 text-[10px] text-blue-800/80 font-serif font-bold italic tracking-wider">
        {label}
      </div>
    </div>
  );
}

// Translations Directory for the entire Contract Page Document
const translations = {
  FR: {
    headerUnion: "UNION EUROPÉENNE",
    headerBanking: "AUTORITÉ BANCAIRE EUROPÉENNE",
    headerBar: "ORDRES DES AVOCATS ET GREFFE CIVIL",
    headerCabinet: "OFFICE NOTARIAL ET CONTROLE DES FONDS",
    contractTitle: "CONTRAT DE PRÊT",
    introText: (dateSigned: string) => `Le présent contrat de prêt prend effet à compter du ${dateSigned}, après signatures de :`,
    lenderRole: (name: string, address: string) => `M. / Mme ${name.toUpperCase()} (PRÊTEUR), coordinateur principal de SMART PRESTITO SERVICES S.A. pour la division CREDIVITE S.A., résident à ${address}.`,
    borrowerRole: (name: string, address: string) => `Et M. / Mme ${name.toUpperCase()} (EMPRUNTEUR), résident à ${address}.`,
    preambleTitle: "PREAMBULE",
    preambleClause1: (amount: string, duration: number, rate: number) => `Considérant que l'emprunteur a sollicité auprès du prêteur un prêt de ${amount} sur une durée de remboursement de ${duration} mois et avec un taux d'intérêt fixe de ${rate}%.`,
    preambleClause2: "Considérant que le prêteur accepte de lui octroyer ce prêt pour la réalisation de son projet socio-humanitaire ou d'investissement personnel confidentiel.",
    preambleClause3: "Considérant que l'emprunteur s'engage solennellement devant la justice civile à rembourser ce prêt conformément aux conditions stipulées et de bonne foi,",
    partiesAgree: "LES PARTIES CONVIENNENT DE CE QUI SUIT :",
    art1Title: "1. OBLIGATION DE REMBOURSEMENT UNIQUE",
    art1Content: (total: string, duration: number) => `L'emprunteur s'engage à rembourser, sans préjudice, un montant total de ${total} sur l'échéance contractuelle de ${duration} mois. Les opérations de versement démarreront sous un délai de carence maximum de 90 jours (3 mois) après réception des fonds sur son compte bancaire.`,
    paramTitle: "CALCUL CONSOLIDE DU DISPOSITIF DE PRÊT",
    paramLoan: "Montant principal du prêt :",
    paramTotal: "Montant total de remboursement :",
    paramRate: "Taux d'intérêt annuel fixe :",
    paramInstallment: "Mensualité de remboursement :",
    paramInterest: "Cumul total des intérêts civils :",
    paramDuration: "Durée globale d'amortissement :",
    art2Title: "2. ÉCHÉANCIER DE VERSEMENT",
    art2Content: (duration: number, installment: string, day: string) => `L'emprunteur procédera au paiement régulier comme suit : règlement fractionné de ${duration} mensualités d'égales valeurs s'élevant chacune à ${installment}, fixées au ${day} de chaque mois consécutif.`,
    art3Title: "3. REMBOURSEMENT ANTICIPÉ",
    art3Content: "L'emprunteur dispose de la faculté d'éteindre sa dette à tout moment sans frais supplémentaires par un remboursement anticipé de l'intégralité du solde résiduel dû.",
    art4Title: "4. RESPONSABILITÉ JURIDIQUE CIVILE",
    art4Content: "Bien que le présent acte implique d'autres intervenants de contrôle, l'Emprunteur demeure seul et unique responsable légal de la bonne réalisation des obligations financières souscrites d'office.",
    art5Title: "5. ASSURANCE ET FRAIS DE GARANTIE ACTE",
    art5Content: (fee: string, amount: string) => `Le bénéficiaire doit certifier sa demande par le versement obligatoire de l'assurance crédit. Suite à la signature, l'emprunteur devra s'acquitter de la somme de ${fee} pour la garantie obligatoire de son dossier auprès de l'assureur agréé, préalablement au virement des fonds de ${amount}.`,
    art6Title: "6. DÉFAUT DE REMBOURSEMENT ET SANCTIONS",
    art6Content: "Tout manquement répété ou non-respect de l'acte sans justification légale validée par l'autorité compétente entraînera des poursuites directes ainsi que la révocation immédiate des délais de paiement consentis d'office.",
    art7Title: "7. JURIDICTION ET DROIT DE COMPENSAZIONE",
    art7Content: "Après trois échéances impayées et sans justification appropriée validée, l'acte devient dument exécutoire et le prêteur obtiendra la compensation totale ou partielle par l'assureur crédit agréé à la hauteur des montants en souffrance.",
    closingRemarks: "Dans le cas où les retards seraient dument justifiés par l'emprunteur, l'autorité financière compétente ou le tribunal civil décidera d'un commun accord.",
    labelBorrower: "L'EMPRUNTEUR (DÉBITEUR)",
    labelLender: "LE PRÊTEUR (CRÉANCIER)",
    labelNotary: "LE NOTAIRE (OFFICIER CIVIL)",
    handwriteLabel: "Écrire obligatoirement de sa main :",
    handwriteTextBorrower: '"Lu et approuvé d\'office, bon pour accord"',
    handwriteTextLender: '"Bon pour accord, crédit débloqué d\'office"',
    handwriteTextNotary: '"Homologué et enregistré sous sceau de l\'État"',
    manualSignature: "SIGNATURE MANUELLE OBLIGATOIRE",
    afterPrint: "(À signer après impression physique)",
    stampDefaultText: "Sceau d'homologation administrative",
    controlLabel: "CONTRÔLE ADMINISTRATIF",
    officerApproved: "OFFICIEL",
    approvedLabel: "AGRÉÉ",
    homologatedLabel: "HOMOLOGUÉ",
    civilSealLabel: "SCEAU CIVIL",
    proxyLenderLabel: "Proxy Prêteur",
    officerLabel: "Officier",
    debtorLabel: "Débiteur",
    freeEditionMode: "✍️ Mode Édition Libre (Touchez un texte pour le modifier en direct)",
    officialCertified: "🔒 Acte Officiel Certifié Figé (Non Modifiable)",
    stateSeal: "Sceau d'État",
    notaryOfficePrefix: "ÉTUDE NOTARIALE DE ME",
    servicesNotarial: "SERVICES NOTARIAUX"
  },
  IT: {
    headerUnion: "UNIONE EUROPEA",
    headerBanking: "AUTORITÀ BANCARIA EUROPEA",
    headerBar: "ORDINE DEGLI AVVOCATI E CANCELLERIA CIVILE",
    headerCabinet: "STUDIO NOTARILE E CONTROLLO DEI FONDI CIVILI",
    contractTitle: "CONTRATTO DI PRESTITO",
    introText: (dateSigned: string) => `Il presente contratto di prestito ha effetto a decorrere da questo giorno, ${dateSigned}, previa firma di :`,
    lenderRole: (name: string, address: string) => `M. / Mme ${name.toUpperCase()} (MUTUANTE), coordinatore principale di SMART PRESTITO SERVICES S.A. per la divisione CREDIVITE S.A., residente in ${address}.`,
    borrowerRole: (name: string, address: string) => `E M. / Mme ${name.toUpperCase()} (MUTUATARIO), residente in ${address}.`,
    preambleTitle: "PREAMBOLO CONTRATTUALE",
    preambleClause1: (amount: string, duration: number, rate: number) => `Considerando che il mutuatario ha richiesto al mutuante un prestito di ${amount} su un periodo di rimborso di ${duration} mesi e con un tasso di interesse fisso del ${rate}%.`,
    preambleClause2: "Considerando che il mutuante accetta di concedergli questo prestito per la realizzazione del suo progetto socio-humanitario o d'investimento personale confidenziale.",
    preambleClause3: "Considerando che il mutuatario si impegna solennemente dinanzi alla giustizia civile a rimborsare questo prestito in conformità alle condizioni stipulate,",
    partiesAgree: "LE PARTI CONVENGONO QUANTO SEGUE :",
    art1Title: "1. OBBLIGO ED ENGAGEMENT DI RIMBORSO",
    art1Content: (total: string, duration: number) => `Il mutuatario si impegna a rimborsare, senza pregiudizio, un importo totale di ${total} sulla durata concordata di ${duration} mesi. Le operazioni di rimborso inizieranno entro un periodo massimo di 90 giorni (3 mesi) dal ricevimento dei fondi.`,
    paramTitle: "CALCOLO PARAMETRICO DEL PRESTITO",
    paramLoan: "Importo del prestito :",
    paramTotal: "Rimborso totale consolidato :",
    paramRate: "Tasso di interesse fisso :",
    paramInstallment: "Rimborso mensile periodico :",
    paramInterest: "Interesse totale complessivo :",
    paramDuration: "Durata complessiva del prestito :",
    art2Title: "2. PIANO DI AMMORTAMENTO",
    art2Content: (duration: number, installment: string, day: string) => `Il mutuatario accetta di rimborsare il creditore come segue : pagamento frazionato di ${duration} rate mensili uguali di ciascuna ${installment}, esigibili il giorno ${day} di ogni mese consecutivo.`,
    art3Title: "3. RIMBORSO ANTICIPATO",
    art3Content: "Il mutuatario ha il diritto di decidere di pagare con anticipo l'intero saldo stimato residuo in qualsiasi momento desideri chiudere la collaborazione civile.",
    art4Title: "4. RESPONSABILITÀ GIURIDICA",
    art4Content: "Sebbene questo atto porti la firma di più controllori di garanzia, il Mutuatario rimane l'unico e solo responsabile civile e legale per l'adempimento finanziario sottoscritto.",
    art5Title: "5. REQUISITI ED ASSICURAZIONE CREDITO",
    art5Content: (fee: string, amount: string) => `Il beneficiario deve certificare la propria solvibilità mediante il versamento regolamentare della tassa di garanzia di ${fee} presso l'assicuratore autorizzato, precedentemente allo sblocco finanziario della somma totale di ${amount}.`,
    art6Title: "6. RECORD DI MOROSITÀ O INADEMPIENZA",
    art6Content: "Qualsiasi inadempienza o mancato rispetto dei termini senza previa valida giustificazione legale comporterà l'avvio immediato di azioni esecutive e la revoca di ogni dilazione.",
    art7Title: "7. ARBITRATO E DIRITTO DI COMPENSAZIONE",
    art7Content: "In seguito a tre rate non pagate, l'atto diventa esecutivo di diritto e il prestatore richiederà la compensazione totale o parziale per ottenere i crediti dovuti dall'assicuratore.",
    closingRemarks: "Nel caso in cui i ritardi siano dovuti a provate giustificazioni, l'autorità bancaria o il magistrato civile tutelerà i diritti congiunti.",
    labelBorrower: "IL MUTUATARIO (DEBITORE)",
    labelLender: "IL MUTUANTE (CREDITORE)",
    labelNotary: "IL NOTAIO (OFFICIALE CIVILE)",
    handwriteLabel: "Scrivere a mano obbligatoriamente :",
    handwriteTextBorrower: '"Letto e approvato d\'ufficio, buono per accordo"',
    handwriteTextLender: '"Buono per accordo, credito deliberato d\'ufficio"',
    handwriteTextNotary: '"Omologato e registrato sotto sigillo di Stato"',
    manualSignature: "FIRMA MANUALE OBBLIGATORIA",
    afterPrint: "(Da firmare dopo l'impressione fisica)",
    stampDefaultText: "Sigillo di omologazione d'Ufficio",
    controlLabel: "CONTROLLO AMMINISTRATIVO",
    officerApproved: "UFFICIALE",
    approvedLabel: "APPROVATO",
    homologatedLabel: "OMOLOGATO",
    civilSealLabel: "SIGILLO CIVILE",
    proxyLenderLabel: "Procura Mutuante",
    officerLabel: "Ufficiale",
    debtorLabel: "Debitore",
    freeEditionMode: "✍️ Modalità Modifica Libera (Tocca per modificare direttamente)",
    officialCertified: "🔒 Atto Ufficiale Certificato Fissato (Non Modificabile)",
    stateSeal: "Sigillo di Stato",
    notaryOfficePrefix: "STUDIO NOTARILE DI ME",
    servicesNotarial: "SERVIZI NOTARILI"
  },
  EN: {
    headerUnion: "EUROPEAN UNION",
    headerBanking: "EUROPEAN BANKING AUTHORITY",
    headerBar: "BAR ASSOCIATION & REGISTRATION CHANCELLERY",
    headerCabinet: "NOTARIAL COMMISSION & LOAN SUPERVISION OFFICE",
    contractTitle: "LOAN AGREEMENT",
    introText: (dateSigned: string) => `This loan service contract takes effect as of ${dateSigned}, upon formal signature of :`,
    lenderRole: (name: string, address: string) => `${name.toUpperCase()} (LENDER), chief legal coordinator of SMART PRESTITO SERVICES S.A. for the CREDIVITE S.A. division, residing at ${address}.`,
    borrowerRole: (name: string, address: string) => `And ${name.toUpperCase()} (BORROWER), lawfully bound and designated below, residing at ${address}.`,
    preambleTitle: "CONTRACTUAL PREAMBLE",
    preambleClause1: (amount: string, duration: number, rate: number) => `Whereas the borrower has requested from the lender a principal credit line of ${amount} over an amortization period of ${duration} months at a fixed annual interest rate of ${rate}%.`,
    preambleClause2: "Whereas the lender convents to advance these financial resources for the execution of their confidential socio-humanitarian or personal project.",
    preambleClause3: "Whereas the borrower solemnly pledges before the civil court of law to repay this loan in full agreement with all covenants and in absolute good faith,",
    partiesAgree: "THE PARTIES HERETO RESOLVE AND COVENANT AS FOLLOWS:",
    art1Title: "1. DEBT SERVICE AND DEBENTURE OBLIGATION",
    art1Content: (total: string, duration: number) => `The borrower irrevocably covenants to pay back the full consolidated sum due of ${total} over the agreed contractual period of ${duration} months. Payment procedures shall commence after a maximum initial grace period of 90 days (3 months) following bank receipt.`,
    paramTitle: "CONSOLIDATED LOAN DEVICE CALCULATION",
    paramLoan: "Principal loan amount:",
    paramTotal: "Total aggregated repayable:",
    paramRate: "Fixed nominal interest rate:",
    paramInstallment: "Periodic monthly installment:",
    paramInterest: "Total civil interest accrued:",
    paramDuration: "Global loan duration period:",
    art2Title: "2. REPAYMENT STRUCTURE",
    art2Content: (duration: number, installment: string, day: string) => `The borrower shall refund the creditor regularly as follows : structured fraction payment of ${duration} equal monthly installments of ${installment} each, due on the ${day} day of each successive month.`,
    art3Title: "3. PREPAYMENT DISCHARGE",
    art3Content: "The borrower reserves the right to prepay and settle the full remaining debt outstanding balance at any time without incurring any additional fees or prepayment premiums.",
    art4Title: "4. SOLE LEGAL CIVIL LIABILITY",
    art4Content: "Although various regulatory officers countersign this instrument, the Borrower remains solely and uniquely liable for the proper discharge of the financial covenants undertaken.",
    art5Title: "5. SECURITY POLICY AND DEED PROCESSING FEES",
    art5Content: (fee: string, amount: string) => `The beneficiary must validate their loan application with the mandatory credit collateral premium. Upon execution of this deed, the borrower is required to clear ${fee} for the official underwriting before the dispatch of the loan principal of ${amount}.`,
    art6Title: "6. COVENANTS AFTER DEFAULT OCCURRENCE",
    art6Content: "Failure to pay or any material covenant default without validated legal justification or force majeure shall initiate immediate collection proceedings and acceleration of all total remaining balances.",
    art7Title: "7. JURIDICTON AND COMPENSATORY REMEDY",
    art7Content: "Following three successive unpaid installments, this instrument becomes dument executory and the lender is entitled to seek direct compensation from the credit insurance up to outstanding limits.",
    closingRemarks: "Should delinquency delays be legally justified by the borrower, the designated judicial registrar or state commission shall determine final parameters.",
    labelBorrower: "THE BORROWER (DEBTOR)",
    labelLender: "THE LENDER (CREDITOR)",
    labelNotary: "THE NOTARY PUBLIC",
    handwriteLabel: "Must write by hand:",
    handwriteTextBorrower: '"Read and approved, good for agreement"',
    handwriteTextLender: '"Good for agreement, loan released officially"',
    handwriteTextNotary: '"Recorded and authenticated under Sworn State Seal"',
    manualSignature: "MANDATORY HANDWRITTEN SIGNATURE",
    afterPrint: "(To sign manually after paper printing)",
    stampDefaultText: "Notary certification seal of records",
    controlLabel: "ADMINISTRATIVE CONTROL",
    officerApproved: "OFFICIAL",
    approvedLabel: "APPROVED",
    homologatedLabel: "COMMISSIONED",
    civilSealLabel: "STATE SEAL",
    proxyLenderLabel: "Proxy Lender",
    officerLabel: "Officer",
    debtorLabel: "Debtor",
    freeEditionMode: "✍️ Free Edition Mode (Click text to edit directly)",
    officialCertified: "🔒 Official Certified Frozen Deed (Non-Editable)",
    stateSeal: "State Seal",
    notaryOfficePrefix: "NOTARY OFFICE OF ME",
    servicesNotarial: "NOTARIAL SERVICES"
  },
  ES: {
    headerUnion: "UNIÓN EUROPEA",
    headerBanking: "AUTORIDAD BANCARIA EUROPEA",
    headerBar: "COLEGIO DE ABOGADOS Y REGISTRO CIVIL",
    headerCabinet: "NOTARÍA PÚBLICA Y CONTROL DE FONDOS CIVILES",
    contractTitle: "CONTRATO DE PRÉSTAMO",
    introText: (dateSigned: string) => `El presente contrato de préstamo entra en vigor a partir del ${dateSigned}, tras las firmas de :`,
    lenderRole: (name: string, address: string) => `M. / Mme ${name.toUpperCase()} (PRESTAMISTA), coordinador principal de SMART PRESTITO SERVICES S.A. para la división CREDIVITE S.A., residente en ${address}.`,
    borrowerRole: (name: string, address: string) => `Y M. / Mme ${name.toUpperCase()} (PRESTATARIO), residente en ${address}.`,
    preambleTitle: "PREÁMBULO CONTRACTUAL",
    preambleClause1: (amount: string, duration: number, rate: number) => `Considerando que el prestatario ha solicitado al prestamista un préstamo de ${amount} por un período de reembolso de ${duration} meses y con una tasa de interés fija del ${rate}%.`,
    preambleClause2: "Considerando que el prestamista acepta otorgarle este préstamo para la realización de su proyecto socio-humanitario o de inversión personal confidencial.",
    preambleClause3: "Considerando que el prestatario se compromete solemnemente ante la justicia civil a reembolsar este préstamo de buena fe y de acuerdo con las condiciones estipuladas,",
    partiesAgree: "LAS PARTES ACUERDAN LO SIGUIENTE :",
    art1Title: "1. OBLIGACIÓN DE REEMBOLSO ÚNICO",
    art1Content: (total: string, duration: number) => `El prestatario se compromete a reembolsar, sin perjuicio, un importe total de ${total} en el plazo acordado de ${duration} meses. Las operaciones de pago comenzarán dentro de un período de gracia máximo de 90 días (3 meses) a partir de la recepción de los fondos en su cuenta bancaria.`,
    paramTitle: "CÁLCULO CONSOLIDADO DEL DISPOSITIVO DE PRÉSTAMO",
    paramLoan: "Monto principal del préstamo:",
    paramTotal: "Monto total de reembolso:",
    paramRate: "Tasa de interés fija anual:",
    paramInstallment: "Cuota mensual de reembolso:",
    paramInterest: "Intereses acumulados totales:",
    paramDuration: "Duración global del préstamo:",
    art2Title: "2. CALENDARIO DE PAGOS",
    art2Content: (duration: number, installment: string, day: string) => `El prestatario realizará el pago regular de la siguiente manera: pago fraccionado de ${duration} cuotas mensuales iguales, cada una de ${installment}, con vencimiento el día ${day} de cada mes consecutivo.`,
    art3Title: "3. AMORTIZACIÓN ANTICIPADA",
    art3Content: "El prestatario tiene derecho a liquidar la totalidad del saldo restante adeudado en cualquier momento, sin costes adicionales por reembolso anticipado.",
    art4Title: "4. RESPONSABILIDAD JURÍDICA CIVIL",
    art4Content: "Aunque este acto cuenta con la firma de otros intervinientes de control, el Prestatario sigue siendo el único responsable legal y civil del cumplimiento de las obligaciones financieras.",
    art5Title: "5. SEGURO Y GASTOS DE GESTIÓN",
    art5Content: (fee: string, amount: string) => `El beneficiario debe certificar su solvencia mediante el pago obligatorio del seguro de crédito contratado. Tras la firma, el prestatario deberá abonar la cantidad de ${fee} para la garantía obligatoria ante el asegurador autorizado, antes del desembolso de los fondos de ${amount}.`,
    art6Title: "6. IMPAGO Y SANCIONES",
    art6Content: "Cualquier impago reiterado o incumplimiento del contrato sin justificación legal validada por la autoridad competente dará lugar inmediatamente a acciones ejecutivas y a la revocación de los plazos concedidos.",
    art7Title: "7. JURISDICCIÓN Y DERECHO DE COMPENSACIÓN",
    art7Content: "Tras tres cuotas impagadas y sin la justificación correspondiente, el contrato es directamente ejecutable y el prestamista obtendrá la compensación total o parcial por parte del asegurador autorizado.",
    closingRemarks: "En caso de retrasos debidamente justificados por el prestatario, la autoridad competente o el tribunal civil decidirán de mutuo acuerdo.",
    labelBorrower: "EL PRESTATARIO (DEUDOR)",
    labelLender: "EL PRESTAMISTA (ACREEDOR)",
    labelNotary: "EL NOTARIO (OFICIAL CIVIL)",
    handwriteLabel: "Debe escribir a mano obligatoriamente :",
    handwriteTextBorrower: '"Leído y aprobado, conforme con el acuerdo"',
    handwriteTextLender: '"Conforme con el acuerdo, préstamo liberado"',
    handwriteTextNotary: '"Homologado y registrado bajo el sello del Estado"',
    manualSignature: "FIRMA MANUAL OBLIGATORIA",
    afterPrint: "(Para firmar después de hacer la impresión física)",
    stampDefaultText: "Sello de homologación de la Notaría",
    controlLabel: "CONTROL ADMINISTRATIVO",
    officerApproved: "OFICIAL",
    approvedLabel: "APROBADO",
    homologatedLabel: "HOMOLOGADO",
    civilSealLabel: "SELLO CIVIL",
    proxyLenderLabel: "Apoderado Prestamista",
    officerLabel: "Oficial",
    debtorLabel: "Deudor",
    freeEditionMode: "✍️ Modo Edición Libre (Haga clic en el texto para editarlo directamente)",
    officialCertified: "🔒 Escritura Oficial Certificada Cerrada (No Editable)",
    stateSeal: "Sello de Estado",
    notaryOfficePrefix: "NOTARÍA DE ME",
    servicesNotarial: "SERVICIOS NOTARIALES"
  },
  DE: {
    headerUnion: "EUROPÄISCHE UNION",
    headerBanking: "EUROPÄISCHE BANKENAUFSICHTSBEHÖRDE",
    headerBar: "RECHTSANWALTSKAMMER UND ZIVILREGISTER",
    headerCabinet: "NOTARIAT UND KONTROLLE DER ZIVILMITTEL",
    contractTitle: "DARLEHENSVERTRAG",
    introText: (dateSigned: string) => `Dieser Darlehensvertrag tritt am ${dateSigned} nach Unterzeichnung durch folgende Parteien in Kraft :`,
    lenderRole: (name: string, address: string) => `Herr/Frau ${name.toUpperCase()} (DARLEHENSGEBER), Hauptkoordinator von SMART PRESTITO SERVICES S.A. für den Bereich CREDIVITE S.A., ansässig unter der Adresse ${address}.`,
    borrowerRole: (name: string, address: string) => `Und Herr/Frau ${name.toUpperCase()} (DARLEHENSNEHMER), ansässig unter der Adresse ${address}.`,
    preambleTitle: "PRÄAMBEL",
    preambleClause1: (amount: string, duration: number, rate: number) => `In Erwägung dessen, dass der Darlehensnehmer beim Darlehensgeber ein Darlehen in Höhe von ${amount} mit einer Laufzeit von ${duration} Monaten und einem festen Zinssatz von ${rate}% beantragt hat.`,
    preambleClause2: "In Erwägung dessen, dass der Darlehensgeber bereit ist, dieses Darlehen für die Durchführung seines vertraulichen sozio-humanitären Projekts oder seiner persönlichen Investition zu gewähren.",
    preambleClause3: "In Erwägung dessen, dass der Darlehensnehmer sich vor dem Zivilgericht feierlich dazu verpflichtet, dieses Darlehen in gutem Glauben und gemäß den festgelegten Bedingungen zurückzuzahlen,",
    partiesAgree: "STIMMEN DIE PARTEIEN WIE FOLGT ÜBEREIN :",
    art1Title: "1. EINMALIGE RÜCKZAHLUNGSVERPFLICHTUNG",
    art1Content: (total: string, duration: number) => `Der Darlehensnehmer verpflichtet sich, unbeschadet einen Gesamtbetrag von ${total} innerhalb der vertraglichen Laufzeit von ${duration} Monaten zurückzuzahlen. Die Tilgungszahlungen beginnen nach einer Karenzzeit von maximal 90 Tagen (3 Monaten) nach Erhalt der Mittel auf dem Bankkonto.`,
    paramTitle: "KONSOLIDIERTE BERECHNUNG DES DARLEHENS",
    paramLoan: "Darlehenshauptbetrag:",
    paramTotal: "Rückzahlungsgesamtbetrag:",
    paramRate: "Fester jährlicher Zinssatz:",
    paramInstallment: "Monatliche Rückzahlungsrate:",
    paramInterest: "Gesamte aufgelaufene Zinsen:",
    paramDuration: "Gesamtlaufzeit des Darlehens:",
    art2Title: "2. TILGUNGSPLAN",
    art2Content: (duration: number, installment: string, day: string) => `Der Darlehensnehmer zahlt die Raten regelmäßig wie folgt zurück: Ratenzahlung in ${duration} aufeinanderfolgenden gleichen Monatsraten von jeweils ${installment}, fällig am ${day}. eines jeden Monats.`,
    art3Title: "3. VORZEITIGE TILGUNG",
    art3Content: "Der Darlehensnehmer ist berechtigt, die ausstehende Restschuld jederzeit ohne zusätzliche Gebühren vorzeitig in einer einzigen Zahlung zurückzuzahlen.",
    art4Title: "4. ZIVILRECHTLICHE HAFTUNG",
    art4Content: "Obwohl diese Urkunde die Unterschrift anderer Aufsichtsbeauftragter trägt, bleibt der Darlehensnehmer zivilrechtlich allein verantwortlich für die ordnungsgemäße Erfüllung der übernommenen finanziellen Verpflichtungen.",
    art5Title: "5. VERSICHERUNGS- UND GARANTIEGEBÜHREN",
    art5Content: (fee: string, amount: string) => `Der Empfänger muss seine Zahlungsfähigkeit durch die obligatorische Zahlung der Kreditversicherung nachweisen. Nach der Unterzeichnung muss der Darlehensnehmer die Summe von ${fee} für die gesetzliche Garantie vor Auszahlung des Darlehensbetrags von ${amount} an den zugelassenen Versicherer zahlen.`,
    art6Title: "6. RÜCKZAHLUNGSVERZUG UND SANKTIONEN",
    art6Content: "Jeder wiederholte Zahlungsverzug oder Verstoß gegen diese Urkunde ohne eine von der zuständigen Behörde anerkannte gesetzliche Rechtfertigung führt zur sofortigen Einleitung von Vollstreckungsmaßnahmen und zum Widerruf aller gewährten Zahlungsfristen.",
    art7Title: "7. GERICHTSSTAND UND AUSGLEICHSRECHT",
    art7Content: "Nach drei unbezahlten Raten ohne angemessene Rechtfertigung wird diese Urkunde vollstreckbar, und der Darlehensgeber erhält eine vollständige oder teilweise Entschädigung durch den zugelassenen Kreditversicherer.",
    closingRemarks: "Sollten Verzögerungen nachweislich begründet sein, entscheidet die zuständige Behörde oder das Zivilgericht im gegenseitigen Einvernehmen.",
    labelBorrower: "DER DARLEHENSNEHMER (SCHULDNER)",
    labelLender: "DER DARLEHENSGEBER (GLÄUBIGER)",
    labelNotary: "DER NOTAR (ZIVILBEAMTER)",
    handwriteLabel: "Handschriftlich zwingend auszufüllen :",
    handwriteTextBorrower: '"Gelesen und genehmigt, einverstanden"',
    handwriteTextLender: '"Einverstanden, Kredit hiermit freigegeben"',
    handwriteTextNotary: '"Beglaubigt und unter Staatssiegel registriert"',
    manualSignature: "HANDSCHRIFTLICHE UNTERSCHRIFT ERFORDERLICH",
    afterPrint: "(Erst nach dem physischen Ausdrucken handschriftlich zu unterzeichnen)",
    stampDefaultText: "Beglaubigungssiegel des Notariats",
    controlLabel: "VERWALTUNGSKONTROLLE",
    officerApproved: "OFFIZIELL",
    approvedLabel: "ZUGELASSEN",
    homologatedLabel: "BEGLAUBIGT",
    civilSealLabel: "ZIVILSIEGEL",
    proxyLenderLabel: "Bevollmächtigter Darlehensgeber",
    officerLabel: "Beamter",
    debtorLabel: "Schuldner",
    freeEditionMode: "✍️ Freier Bearbeitungsmodus (Klicken Sie zum Bearbeiten direkt)",
    officialCertified: "🔒 Offizielle zertifizierte feste Urkunde (Nicht editierbar)",
    stateSeal: "Staatssiegel",
    notaryOfficePrefix: "NOTARIAT VON ME",
    servicesNotarial: "NOTARIELLE DIENSTE"
  },
  PT: {
    headerUnion: "UNIÃO EUROPEIA",
    headerBanking: "AUTORIDADE BANCÁRIA EUROPEIA",
    headerBar: "ORDEM DOS ADVOGADOS E REGISTO CIVIL",
    headerCabinet: "CARTÓRIO NOTARIAL E CONTROLO DE FUNDOS CIVILES",
    contractTitle: "CONTRATO DE EMPRÉSTIMO",
    introText: (dateSigned: string) => `O presente contrato de empréstimo entra em vigor a partir de ${dateSigned}, após as assinaturas de :`,
    lenderRole: (name: string, address: string) => `M. / Mme ${name.toUpperCase()} (MUTUANTE), coordenador principal da SMART PRESTITO SERVICES S.A. para a divisão CREDIVITE S.A., residente em ${address}.`,
    borrowerRole: (name: string, address: string) => `E M. / Mme ${name.toUpperCase()} (MUTUÁRIO), residente em ${address}.`,
    preambleTitle: "PREÂMBULO",
    preambleClause1: (amount: string, duration: number, rate: number) => `Considerando que o mutuário solicitou ao mutuante um empréstimo de ${amount} por um período de reembolso de ${duration} meses e com uma taxa de juro fixa de ${rate}%.`,
    preambleClause2: "Considerando que o mutuante aceita conceder este empréstimo para a realização do seu projeto socio-humanitário ou de investimento pessoal confidencial.",
    preambleClause3: "Considerando que o mutuário se compromete solenemente perante a justiça civil a reembolsar este empréstimo de boa-fé e de acordo com as condições estipuladas,",
    partiesAgree: "AS PARTES ACORDAM O SEGUINTE :",
    art1Title: "1. OBRIGAÇÃO DE VALOR ÚNICO",
    art1Content: (total: string, duration: number) => `O mutuário compromete-se a reembolsar, sem prejuízo, um montante total de ${total} no prazo acordado de ${duration} meses. As operações de pagamento começarão no prazo de carência máxima de 90 dias (3 meses) após a receção dos fundos na conta bancária.`,
    paramTitle: "CÁLCULO CONSOLIDADO DO DISPOSITIVO DE EMPRÉSTIMO",
    paramLoan: "Montante principal do empréstimo:",
    paramTotal: "Montante total de reembolso:",
    paramRate: "Taxa de juro anual fixa:",
    paramInstallment: "Prestação mensal de reembolso:",
    paramInterest: "Juros acumulados totais:",
    paramDuration: "Duração global do empréstimo:",
    art2Title: "2. CALENDÁRIO DE PAGAMENTOS",
    art2Content: (duration: number, installment: string, day: string) => `O mutuário procederá ao pagamento da seguinte forma: pagamento fracionado de ${duration} prestações mensais iguais de ${installment} cada, com vencimento no dia ${day} de cada mês consecutivo.`,
    art3Title: "3. REEMBOLSO ANTECIPADO",
    art3Content: "O mutuário tem o direito de liquidar a totalidade do saldo em dívida a qualquer momento sem custos adicionais por reembolso antecipado.",
    art4Title: "4. RESPONSABILIDADE JURÍDICA CIVIL",
    art4Content: "Embora este ato conte com a assinatura de outros órgãos de controlo, o Mutuário continua a ser o único e exclusivo responsável civil e legal pelo cumprimento das obrigações financeiras.",
    art5Title: "5. SEGURO E TAXAS DE GARANTIA",
    art5Content: (fee: string, amount: string) => `O beneficiário deve certificar a sua solvabilidade mediante o pagamento obrigatório do seguro de crédito. Após a assinatura, o mutuário deverá pagar a quantia de ${fee} para a obtenção da garantia obrigatória ao segurador autorizado, antes do desembolso dos fundos de ${amount}.`,
    art6Title: "6. FALTA DE PAGAMENTO E SANÇÕES",
    art6Content: "Qualquer incumprimento repetido ou violação dos termos contratuais sem uma justificação legal validada pela autoridade competente dará início imediato a ações executivas e à revogação dos prazos concedidos.",
    art7Title: "7. JURISDIÇÃO E DIREITO DE COMPENSAÇÃO",
    art7Content: "Após três prestações não pagas e sem uma justificação aceitável, este ato torna-se executivo e o mutuante obterá compensação total ou parcial junto do segurador de crédito autorizado.",
    closingRemarks: "Caso os atrasos sejam devidamente justificados, a autoridade competente ou o tribunal civil decidirão de comum acordo.",
    labelBorrower: "O MUTUÁRIO (DEVEDOR)",
    labelLender: "O MUTUANTE (CREDOR)",
    labelNotary: "O NOTÁRIO (OFICIAL CIVIL)",
    handwriteLabel: "Escrita manual obrigatória :",
    handwriteTextBorrower: '"Lido e aprovado d\'ofício, bom para acordo"',
    handwriteTextLender: '"Bom para acordo, crédito disponibilizado"',
    handwriteTextNotary: '"Homologado e registado sob selo do Estado"',
    manualSignature: "ASSINATURA MANUAL OBRIGATÓRIA",
    afterPrint: "(A assinar após a impressão física do papel)",
    stampDefaultText: "Selo de homologação do Cartório",
    controlLabel: "CONTROLO ADMINISTRATIVO",
    officerApproved: "OFICIAL",
    approvedLabel: "APROVADO",
    homologatedLabel: "HOMOLOGADO",
    civilSealLabel: "SELO CIVIL",
    proxyLenderLabel: "Procurador Mutuante",
    officerLabel: "Oficial",
    debtorLabel: "Devedor",
    freeEditionMode: "✍️ Modo Edição Livre (Clique no texto para editar diretamente)",
    officialCertified: "🔒 Escritura Oficial Certificada Selada (Não Editável)",
    stateSeal: "Selo de Estado",
    notaryOfficePrefix: "CARTÓRIO NOTARIAL DE ME",
    servicesNotarial: "SERVIÇOS NOTARIAIS"
  },
  NL: {
    headerUnion: "EUROPESE UNIE",
    headerBanking: "EUROPESE BANKENAUTORITEIT",
    headerBar: "ORDE VAN ADVOCATEN EN CIVIELE REGISTRATIE",
    headerCabinet: "NOTARIAAT EN CONTROLE VAN FINANCIËN",
    contractTitle: "LENINGOVEREENKOMST",
    introText: (dateSigned: string) => `Deze leningovereenkomst treedt in werking op ${dateSigned}, na ondertekening door :`,
    lenderRole: (name: string, address: string) => `Dhr. / Mvr. ${name.toUpperCase()} (GELDSCHIETER), hoofdcoördinator van SMART PRESTITO SERVICES S.A. voor de divisie CREDIVITE S.A., gevestigd te ${address}.`,
    borrowerRole: (name: string, address: string) => `En Dhr. / Mvr. ${name.toUpperCase()} (LENER), gevestigd te ${address}.`,
    preambleTitle: "PREAMBULE",
    preambleClause1: (amount: string, duration: number, rate: number) => `Overwegende dat de lener de geldschieter heeft verzocht om een lening van ${amount} over een aflossingsperiode van ${duration} maanden en met een vaste rentevoet van ${rate}%.`,
    preambleClause2: "Overwegende dat de geldschieter ermee instemt deze lening toe te kennen voor de realisatie van diens sociaal-humanitaire project of vertrouwelijke persoonlijke investering.",
    preambleClause3: "Overwegende dat de lener zich plechtig verbindt voor de burgerlijke rechter om deze lening te goeder trouw en in overeenstemming met de gestelde voorwaarden terug te betalen,",
    partiesAgree: "KOMEN JURIDISCH HET VOLGENDE OVEREEN :",
    art1Title: "1. ENKELVOUDIGE TERUGBETALINGSVERPLICHTING",
    art1Content: (total: string, duration: number) => `De lener verbindt zich ertoe, onverminderd, een totaalbedrag van ${total} over de overeengekomen contractduur van ${duration} maanden terug te betalen. De betalingen starten na een maximale respijtperiode van 90 dagen (3 maanden) na ontvangst van de gelden op diens bankrekening.`,
    paramTitle: "GECONSOLIDEERDE BEREKENING VAN DE LENING",
    paramLoan: "Hoofdsom van de lening:",
    paramTotal: "Totaal terug te betalen bedrag:",
    paramRate: "Vaste jaarlijkse rentevoet:",
    paramInstallment: "Maandelijkse termijn:",
    paramInterest: "Totale gecumuleerde rente:",
    paramDuration: "Totale looptijd van de lening:",
    art2Title: "2. TITEL VAN TILGING",
    art2Content: (duration: number, installment: string, day: string) => `De lener zal de regelmatige betaling als volgt uitvoeren: gespreide betaling van ${duration} gelijke maandelijkse termijnen van elk ${installment}, vervallend op de ${day}e van elke opeenvolgende maand.`,
    art3Title: "3. VERVROEGDE TERUGBETALING",
    art3Content: "De lener heeft het recht om de resterende schuld op elk moment zonder extra kosten vervroegd af te lossen.",
    art4Title: "4. BURGERLIJKE JURIDISCHE AANSPRAKELIJKHEID",
    art4Content: "Hoewel deze akte de handtekening van andere controleurs draagt, blijft de lener als enige wettelijk en burgerlijk aansprakelijk voor de nakoming van de aangegane financiële verplichtingen.",
    art5Title: "5. VERZEKERINGS- EN GARANTIEKOSTEN",
    art5Content: (fee: string, amount: string) => `De begunstigde moet zijn kredietwaardigheid aantonen door de verplichte betaling van de kredietverzekering. Na handtekening dient de lener het bedrag van ${fee} te voldoen voor de verplichte garantie bij de erkende verzekeraar, voorafgaand aan de uitbetaling van de hoofsom van ${amount}.`,
    art6Title: "6. WANBETALING EN SANCTIES",
    art6Content: "Elke herhaalde tekortkoming of niet-naleving van deze akte zonder een door de bevoegde autoriteit goedgekeurde wettelijke rechtvaardiging leidt onmiddellijk tot executoriale maatregelen en intrekking van alle verleende betalingstermijnen.",
    art7Title: "7. JURISDICTIE EN RECHT OP COMPENSATIE",
    art7Content: "Na drie onbetaalde termijnen en zonder geldige rechtvaardiging wordt deze akte uitvoerbaar en verkrijgt de geldschieter volledige of gedeeltelijke compensatie via de erkende kredietverzekeraar.",
    closingRemarks: "Indien de vertragingen naar behoren gerechtvaardigd zijn, beslist de bevoegde autoriteit of de burgerlijke rechter in onderling overleg.",
    labelBorrower: "DE LENER (DEBITEUR)",
    labelLender: "DE GELDSCHIETER (CREDITEUR)",
    labelNotary: "DE NOTARIS (BURGERLIJK AMBTENAAR)",
    handwriteLabel: "Verplicht met de hand te schrijven :",
    handwriteTextBorrower: '"Gelezen en goedgekeurd voor akkoord"',
    handwriteTextLender: '"Voor akkoord, krediet officieel vrijgegeven"',
    handwriteTextNotary: '"Gehomologeerd en geregistreerd onder staatszegel"',
    manualSignature: "HANDSCHRIFTELIJKE HANDTEKENING VERPLICHT",
    afterPrint: "(Ondertekenen na fysieke afdruk op papier)",
    stampDefaultText: "Homologatiestempel van de notaris",
    controlLabel: "ADMINISTRATIEVE CONTROLE",
    officerApproved: "OFFICIEEL",
    approvedLabel: "GOEDGEKEURD",
    homologatedLabel: "GEHOMOLOGEERD",
    civilSealLabel: "BURGERLIJK ZEGEL",
    proxyLenderLabel: "Gevolmachtigde Uitlenen",
    officerLabel: "Ambtenaar",
    debtorLabel: "Debiteur",
    freeEditionMode: "✍️ Vrije bewerkingsmodus (Klik om tekst direct te bewerken)",
    officialCertified: "🔒 Officieel gecertificeerde vaste akte (Niet bewerkbaar)",
    stateSeal: "Staatszegel",
    notaryOfficePrefix: "NOTARISKANTOOR VAN ME",
    servicesNotarial: "NOTARIËLE DIENSTEN"
  },
  PL: {
    headerUnion: "UNIA EUROPEJSKA",
    headerBanking: "EUROPEJSKI URZĄD NADZORU BANKOWEGO",
    headerBar: "RADA ADWOKACKA I REJESTR CYWILNY",
    headerCabinet: "KANCELARIA NOTARIALNA I KONTROLA FUNDUSZY CIVIL",
    contractTitle: "UMOWA POŻYCZKI",
    introText: (dateSigned: string) => `Niniejsza umowa pożyczki wchodzi w życie z dniem ${dateSigned}, po podpisaniu przez :`,
    lenderRole: (name: string, address: string) => `Pan / Pani ${name.toUpperCase()} (POŻYCZKODAWCA), główny koordynator SMART PRESTITO SERVICES S.A. dla dywizji CREDIVITE S.A., zamieszkały(a) w ${address}.`,
    borrowerRole: (name: string, address: string) => `Oraz Pan / Pani ${name.toUpperCase()} (POŻYCZKOBIORCA), zamieszkały(a) w ${address}.`,
    preambleTitle: "PREAMBUŁA",
    preambleClause1: (amount: string, duration: number, rate: number) => `Zważywszy, że pożyczkobiorca zwrócił się do pożyczkodawcy z wnioskiem o pożyczkę w wysokości ${amount} na okres spłaty ${duration} miesięcy ze stałym oprocentowaniem ${rate}%.`,
    preambleClause2: "Zważywszy, że pożyczkodawca wyraża zgodę na udzielenie tej pożyczki na realizację poufnego projektu społeczno-humanitarnego lub osobistego.",
    preambleClause3: "Zważywszy, że pożyczkobiorca uroczyście zobowiązuje się przed sądem cywilnym do spłaty tej pożyczki w dobrej wierze i zgodnie z warunkami umowy,",
    partiesAgree: "STRONY UZGADNIAJĄ, CO NASTĘPUJE :",
    art1Title: "1. JEDNORAZOWE ZOBOWIĄZANIE DO SPŁATY",
    art1Content: (total: string, duration: number) => `Pożyczkobiorca zobowiązuje się do spłaty, bez uszczerbku, łącznej kwoty ${total} w uzgodnionym terminie ${duration} miesięcy. Spłaty rozpoczną się po maksymalnym okresie karencji wynoszącym 90 dni (3 miesiące) od otrzymania środków na konto bankowe.`,
    paramTitle: "KONSOLIDOWANE OBLICZENIE POŻYCZKI",
    paramLoan: "Główna kwota pożyczki:",
    paramTotal: "Łączna kwota do spłaty:",
    paramRate: "Stała roczna stopa procentowa:",
    paramInstallment: "Miesięczna rata spłaty:",
    paramInterest: "Łączne skumulowane odsetki:",
    paramDuration: "Całkowity okres amortyzacji:",
    art2Title: "2. HARMONOGRAM SPŁAT",
    art2Content: (duration: number, installment: string, day: string) => `Pożyczkobiorca będzie dokonywał regularnych spłat w następujący sposób: spłata w ${duration} równych ratach miesięcznych, każda w wysokości ${installment}, płatnych do ${day} dnia każdego kolejnego miesiąca.`,
    art3Title: "3. STRUKTURA PRZEDTERMINEJ SPŁATY",
    art3Content: "Pożyczkobiorca ma prawo do spłaty całości pozostałego zadłużenia w dowolnym momencie bez dodatkowych kosztów.",
    art4Title: "4. ODPOWIEDZIALNOŚĆ CYWILNO-PRAWNA",
    art4Content: "Mimo że niniejszy akt nosi podpisy innych kontrolerów, Pożyczkobiorca pozostaje jedynym i wyłącznym odpowiedzialnym cywilnie i prawnie za realizację zobowiązań finansowych.",
    art5Title: "5. UBEZPIECZENIE I OPŁATY GWARANCYJNE",
    art5Content: (fee: string, amount: string) => `Beneficjent musi potwierdzić swoją wypłacalność poprzez obowiązkową opłatę ubezpieczenia kredytowego. Po podpisaniu umowy pożyczkobiorca zobowiązany jest wpłacić kwotę ${fee} na poczet gwarancji u autoryzowanego ubezpieczyciela przed wypłatą kwoty pożyczki ${amount}.`,
    art6Title: "6. BRAK SPŁATY I SANKCJE",
    art6Content: "Każde powtarzające się uchybienie lub brak spłaty bez prawnego uzasadnienia zatwierdzonego przez sąd skutkować będzie natychmiastowym wszczęciem postępowania egzekucyjnego.",
    art7Title: "7. JURYSDYKCJA I PRAWO DO KOMPENSATY",
    art7Content: "Po trzech nieopłaconych ratach i braku odpowiedniego uzasadnienia, umowa staje się wykonalna, a pożyczkodawca otrzyma kompensatę od ubezpieczyciela do kwoty zaległości.",
    closingRemarks: "W przypadku należycie uzasadnionych opóźnień, właściwy organ lub sąd cywilny podejmie decyzję polubowną.",
    labelBorrower: "POŻYCZKOBIORCA (DŁUŻNIK)",
    labelLender: "POŻYCZKODAWCA (WIERZYCIEL)",
    labelNotary: "NOTARIUSZ (URZĘDNIK CYWILNY)",
    handwriteLabel: "Wymóg odręcznego pisma :",
    handwriteTextBorrower: '"Przeczytano i zatwierdzono do zgodnego porozumienia"',
    handwriteTextLender: '"Do zgodnego porozumienia, pożyczka uruchomiona"',
    handwriteTextNotary: '"Zatwierdzono i zarejestrowano pod pieczęcią państwową"',
    manualSignature: "WYMAGANY PODPIS ODRĘCZNY",
    afterPrint: "(Podpisać po fizycznym wydrukowaniu papierowym)",
    stampDefaultText: "Pieczęć homologacyjna kancelarii",
    controlLabel: "KONTROLA ADMINISTRACYJNA",
    officerApproved: "OFICJALNY",
    approvedLabel: "ZATWIERDZONY",
    homologatedLabel: "HOMOLOGOWANY",
    civilSealLabel: "PIECZĘĆ CYWILNA",
    proxyLenderLabel: "Pełnomocnik Pożyczkodawcy",
    officerLabel: "Urzędnik",
    debtorLabel: "Dłużnik",
    freeEditionMode: "✍️ Tryb Edycji Swobodnej (Kliknij tekst, aby edytować bezpośrednio)",
    officialCertified: "🔒 Oficjalny Certyfikowany Akt Zamrożony (Nieedytowalny)",
    stateSeal: "Pieczęć Państwowa",
    notaryOfficePrefix: "KANCELARIA NOTARIALNA REJENTA",
    servicesNotarial: "USŁUGI NOTARIALNE"
  },
  RO: {
    headerUnion: "UNIUNEA EUROPEANĂ",
    headerBanking: "AUTORITATEA BANCARĂ EUROPEANĂ",
    headerBar: "BAROUL DE AVOCAȚI ȘI REGISTRUL CIVIL",
    headerCabinet: "BIROUL NOTARIAL ȘI CONTROLUL FONDURILOR CIVILE",
    contractTitle: "CONTRACT DE ÎMPRUMUT",
    introText: (dateSigned: string) => `Prezentul contract de împrumut intră în vigoare la data de ${dateSigned}, după semnăturile :`,
    lenderRole: (name: string, address: string) => `Dl. / Dna. ${name.toUpperCase()} (ÎMPRUMUTĂTOR), coordonator principal al SMART PRESTITO SERVICES S.A. pentru divizia CREDIVITE S.A., rezident la adresa ${address}.`,
    borrowerRole: (name: string, address: string) => `Și Dl. / Dna. ${name.toUpperCase()} (ÎMPRUMUTAT), rezident la adresa ${address}.`,
    preambleTitle: "PREAMBUL",
    preambleClause1: (amount: string, duration: number, rate: number) => `Având în vedere că împrumutatul a solicitat împrumutătorului un împrumut de ${amount} pe o perioadă de rambursare de ${duration} luni și cu o rată fixă a dobânzii de ${rate}%.`,
    preambleClause2: "Având în vedere că împrumutătorul este de acord să îi acorde acest împrumut pentru realizarea proiectului său socio-humanitar sau investiție personală confidențială.",
    preambleClause3: "Având în vedere că împrumutatul se angajează solemn în fața justiției civile să ramburseze acest împrumut cu bună-credință și în conformitate cu condițiile stipulate,",
    partiesAgree: "PĂRȚILE CONVIN DUPĂ CUM URMEAZĂ :",
    art1Title: "1. OBLIGAȚIA DE RAMBURSARE UNICĂ",
    art1Content: (total: string, duration: number) => `Împrumutatul se angajează să ramburseze, fără prejudiciu, o sumă totală de ${total} pe perioada contractuală de ${duration} luni. Plățile vor începe în termen de grație de maxim 90 de zile (3 luni) de la primirea fondurilor în contul său bancar.`,
    paramTitle: "CALCULUL CONSOLIDAT AL ÎMPRUMUTULUI",
    paramLoan: "Suma principală a împrumutului:",
    paramTotal: "Suma totală de rambursat:",
    paramRate: "Rata dobânzii anuale fixe:",
    paramInstallment: "Suma lunară de rambursat:",
    paramInterest: "Total dobândă civilă acumulată:",
    paramDuration: "Durata generală de amortizare:",
    art2Title: "2. JURUL DE RAMBURSARE",
    art2Content: (duration: number, installment: string, day: string) => `Împrumutatul va efectua plăți regulate după cum urmează: plată eșalonată în ${duration} rate lunare egale, fiecare în valoare de ${installment}, scadente în ziua de ${day} a fiecărei luni consecutive.`,
    art3Title: "3. RAMBURSAREA ANTICIPATĂ",
    art3Content: "Împrumutatul are dreptul de a stinge întreaga datorie rămasă în orice moment, fără costuri suplimentare pentru rambursare anticipată.",
    art4Title: "4. RĂSPUNDERE JURIDICĂ CIVILĂ",
    art4Content: "Deși acest act poartă semnăturile altor organe de control, Împrumutatul rămâne singurul și unicul responsabil civil și legal pentru îndeplinirea obligațiilor financiare asumate.",
    art5Title: "5. ASIGURAREA ȘI TAXASA DE GARANȚIE",
    art5Content: (fee: string, amount: string) => `Beneficiarul trebuie să își certifice solvabilitatea prin plata obligatorie a asigurării de credit. După semnare, împrumutatul va trebui să plătească suma de ${fee} pentru garanția obligatorie la asigurătorul autorizat, înainte de transferul fondurilor de împrumut de ${amount}.`,
    art6Title: "6. NEPLATĂ ȘI SANCȚIUNI",
    art6Content: "Orice neplată repetată sau nerespectare a contractului fără o justificare legală validată de autoritatea competentă va atrage executarea silită și anularea termenelor de plată acordate.",
    art7Title: "7. JURISDICȚIE ȘI DREPTUL DE COMPENSARE",
    art7Content: "După trei rate neplătite și fără o justificare corespunzătoare, actul devine executoriu și împrumutătorul va obține despăgubiri totale sau parțiale prin asigurarea de credit autorizată.",
    closingRemarks: "În cazul în care întârzierile sunt justificate de împrumutat, autoritatea competentă sau instanța civilă vor decide de comun acord.",
    labelBorrower: "ÎMPRUMUTATUL (DEBITOR)",
    labelLender: "ÎMPRUMUTĂTORUL (CREDITOR)",
    labelNotary: "NOTARUL (OFICIAL CIVIL)",
    handwriteLabel: "Scris manual obligatoriu :",
    handwriteTextBorrower: '"Citit și aprobat, bun pentru acord"',
    handwriteTextLender: '"Bun pentru acord, împrumut autorizat"',
    handwriteTextNotary: '"Omologat și înregistrat sub sigiliul de Stat"',
    manualSignature: "SEMNĂTURĂ MANUALĂ OBLIGATORIE",
    afterPrint: "(Se va semna manual după tipărirea fizică)",
    stampDefaultText: "Sigiliu de omologare notarială",
    controlLabel: "CONTROL ADMINISTRATIV",
    officerApproved: "OFICIAL",
    approvedLabel: "APROBAT",
    homologatedLabel: "OMOLOGAT",
    civilSealLabel: "SIGILIU CIVIL",
    proxyLenderLabel: "Procurator Împrumutător",
    officerLabel: "Ofițer",
    debtorLabel: "Debitor",
    freeEditionMode: "✍️ Mod de Editare Liberă (Apăsați textul pentru a edita direct)",
    officialCertified: "🔒 Act Oficial Certificat Blocat (Nemodificabil)",
    stateSeal: "Sigiliul de Stat",
    notaryOfficePrefix: "BIROUL NOTARIAL ME",
    servicesNotarial: "SERVICII NOTARIALE"
  },
  BOTH: {
    // Falls back seamlessly to French to prevent any dual-language mess
    get headerUnion() { return translations.FR.headerUnion; },
    get headerBanking() { return translations.FR.headerBanking; },
    get headerBar() { return translations.FR.headerBar; },
    get headerCabinet() { return translations.FR.headerCabinet; },
    get contractTitle() { return translations.FR.contractTitle; },
    get introText() { return translations.FR.introText; },
    get lenderRole() { return translations.FR.lenderRole; },
    get borrowerRole() { return translations.FR.borrowerRole; },
    get preambleTitle() { return translations.FR.preambleTitle; },
    get preambleClause1() { return translations.FR.preambleClause1; },
    get preambleClause2() { return translations.FR.preambleClause2; },
    get preambleClause3() { return translations.FR.preambleClause3; },
    get partiesAgree() { return translations.FR.partiesAgree; },
    get art1Title() { return translations.FR.art1Title; },
    get art1Content() { return translations.FR.art1Content; },
    get paramTitle() { return translations.FR.paramTitle; },
    get paramLoan() { return translations.FR.paramLoan; },
    get paramTotal() { return translations.FR.paramTotal; },
    get paramRate() { return translations.FR.paramRate; },
    get paramInstallment() { return translations.FR.paramInstallment; },
    get paramInterest() { return translations.FR.paramInterest; },
    get paramDuration() { return translations.FR.paramDuration; },
    get art2Title() { return translations.FR.art2Title; },
    get art2Content() { return translations.FR.art2Content; },
    get art3Title() { return translations.FR.art3Title; },
    get art3Content() { return translations.FR.art3Content; },
    get art4Title() { return translations.FR.art4Title; },
    get art4Content() { return translations.FR.art4Content; },
    get art5Title() { return translations.FR.art5Title; },
    get art5Content() { return translations.FR.art5Content; },
    get art6Title() { return translations.FR.art6Title; },
    get art6Content() { return translations.FR.art6Content; },
    get art7Title() { return translations.FR.art7Title; },
    get art7Content() { return translations.FR.art7Content; },
    get closingRemarks() { return translations.FR.closingRemarks; },
    get labelBorrower() { return translations.FR.labelBorrower; },
    get labelLender() { return translations.FR.labelLender; },
    get labelNotary() { return translations.FR.labelNotary; },
    get handwriteLabel() { return translations.FR.handwriteLabel; },
    get handwriteTextBorrower() { return translations.FR.handwriteTextBorrower; },
    get handwriteTextLender() { return translations.FR.handwriteTextLender; },
    get handwriteTextNotary() { return translations.FR.handwriteTextNotary; },
    get manualSignature() { return translations.FR.manualSignature; },
    get afterPrint() { return translations.FR.afterPrint; },
    get stampDefaultText() { return translations.FR.stampDefaultText; },
    get controlLabel() { return translations.FR.controlLabel; },
    get officerApproved() { return translations.FR.officerApproved; },
    get approvedLabel() { return translations.FR.approvedLabel; },
    get homologatedLabel() { return translations.FR.homologatedLabel; },
    get civilSealLabel() { return translations.FR.civilSealLabel; },
    get proxyLenderLabel() { return translations.FR.proxyLenderLabel; },
    get officerLabel() { return translations.FR.officerLabel; },
    get debtorLabel() { return translations.FR.debtorLabel; },
    get freeEditionMode() { return translations.FR.freeEditionMode; },
    get officialCertified() { return translations.FR.officialCertified; },
    get stateSeal() { return translations.FR.stateSeal; },
    get notaryOfficePrefix() { return translations.FR.notaryOfficePrefix; },
    get servicesNotarial() { return translations.FR.servicesNotarial; }
  }
};

export function ContractPreview({
  lender,
  borrower,
  notary,
  loan,
  styling,
  onOpenSignature,
  fontFamily,
  exportMode = 'official',
  contractType = 'personal_loan',
  selectedDoc = 'main_contract',
}: ContractPreviewProps) {
  
  // Helper to map CUSTOM language label to basic locale keys
  const resolveLangCode = (lang: string, customLabel?: string): string => {
    if (lang !== 'CUSTOM') {
      return lang;
    }
    if (!customLabel) return 'FR';
    const cl = customLabel.toLowerCase();
    if (cl.includes('fr') || cl.includes('fran')) return 'FR';
    if (cl.includes('it') || cl.includes('ital')) return 'IT';
    if (cl.includes('es') || cl.includes('esp')) return 'ES';
    if (cl.includes('de') || cl.includes('all') || cl.includes('deutsch') || cl.includes('ger')) return 'DE';
    if (cl.includes('pt') || cl.includes('port')) return 'PT';
    if (cl.includes('nl') || cl.includes('neer') || cl.includes('dutch') || cl.includes('hol')) return 'NL';
    if (cl.includes('pl') || cl.includes('pol')) return 'PL';
    if (cl.includes('ro') || cl.includes('rou') || cl.includes('rum') || cl.includes('rom')) return 'RO';
    if (cl.includes('en') || cl.includes('ang') || cl.includes('eng')) return 'EN';
    return 'FR'; // default fallback for date/unspecified structures
  };

  // Resolve active language cleanly
  const languageCode = (styling.language === 'BOTH' ? 'FR' : styling.language);
  const matchedBaseCode = resolveLangCode(languageCode, styling.customLanguageLabel);

  const t = (() => {
    if (languageCode === 'CUSTOM' && styling.customTranslations) {
      const ct = styling.customTranslations;
      const repl = (val: any, replacements: Record<string, string | number> = {}) => {
        if (typeof val !== 'string') return val;
        let str = val;
        Object.entries(replacements).forEach(([k, v]) => {
          // Escape regex special chars
          const escapedKey = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          str = str.replace(new RegExp(escapedKey, 'g'), String(v));
        });
        return str;
      };

      return {
        ...translations.FR,
        ...ct,
        introText: (dateSigned: string) => repl(ct.introText || (typeof translations.FR.introText === 'function' ? translations.FR.introText(dateSigned) : translations.FR.introText), { '[DATE_SIGNED]': dateSigned }),
        lenderRole: (name: string, address: string) => repl(ct.lenderRole || (typeof translations.FR.lenderRole === 'function' ? translations.FR.lenderRole(name, address) : translations.FR.lenderRole), { '[NAME]': name.toUpperCase(), '[ADDRESS]': address }),
        borrowerRole: (name: string, address: string) => repl(ct.borrowerRole || (typeof translations.FR.borrowerRole === 'function' ? translations.FR.borrowerRole(name, address) : translations.FR.borrowerRole), { '[NAME]': name.toUpperCase(), '[ADDRESS]': address }),
        preambleClause1: (amount: string, duration: number, rate: number) => repl(ct.preambleClause1 || (typeof translations.FR.preambleClause1 === 'function' ? translations.FR.preambleClause1(amount, duration, rate) : translations.FR.preambleClause1), { '[AMOUNT]': amount, '[DURATION]': duration, '[RATE]': rate }),
        art1Content: (total: string, duration: number) => repl(ct.art1Content || (typeof translations.FR.art1Content === 'function' ? translations.FR.art1Content(total, duration) : translations.FR.art1Content), { '[TOTAL]': total, '[DURATION]': duration }),
        art2Content: (duration: number, installment: string, day: string) => repl(ct.art2Content || (typeof translations.FR.art2Content === 'function' ? translations.FR.art2Content(duration, installment, day) : translations.FR.art2Content), { '[DURATION]': duration, '[INSTALLMENT]': installment, '[DAY]': day }),
        art5Content: (fee: string, amount: string) => repl(ct.art5Content || (typeof translations.FR.art5Content === 'function' ? translations.FR.art5Content(fee, amount) : translations.FR.art5Content), { '[FEE]': fee, '[AMOUNT]': amount }),
      };
    }
    const code = matchedBaseCode as keyof typeof translations;
    return translations[code] || translations.FR;
  })();

  // Helper locales definitions
  const getLocale = (lang: string) => {
    switch (lang) {
      case 'FR': return 'fr-FR';
      case 'IT': return 'it-IT';
      case 'ES': return 'es-ES';
      case 'DE': return 'de-DE';
      case 'PT': return 'pt-PT';
      case 'NL': return 'nl-NL';
      case 'PL': return 'pl-PL';
      case 'RO': return 'ro-RO';
      case 'EN':
      default: return 'en-US';
    }
  };
  const getUnspecifiedDate = (lang: string) => {
    switch (lang) {
      case 'FR': return 'Non spécifiée';
      case 'IT': return 'Non specificata';
      case 'ES': return 'No especificada';
      case 'DE': return 'Nicht angegeben';
      case 'PT': return 'Não especificada';
      case 'NL': return 'Niet gespecificeerd';
      case 'PL': return 'Nie określono';
      case 'RO': return 'Nespecificată';
      default: return 'Not specified';
    }
  };
  const getDefaultDate = (lang: string) => {
    switch (lang) {
      case 'FR': return '13 septembre 2026';
      case 'IT': return '13 settembre 2026';
      case 'ES': return '13 de septiembre de 2026';
      case 'DE': return '13. September 2026';
      case 'PT': return '13 de setembro de 2026';
      case 'NL': return '13 september 2026';
      case 'PL': return '13 września 2026';
      case 'RO': return '13 septembrie 2026';
      default: return 'September 13, 2026';
    }
  };

  // Calculations
  const principal = loan.amount;
  const rate = loan.interestRate;
  const duration = loan.durationMonths;
  
  // Total interests
  const totalInterest = principal * (rate / 100) * (duration / 12);
  const totalRepayable = principal + totalInterest;
  
  // Installment
  let divisionFactor = duration;
  if (loan.repaymentFrequency === 'trimestriel') {
    divisionFactor = duration / 3;
  } else if (loan.repaymentFrequency === 'unique') {
    divisionFactor = 1;
  }
  const installmentPayment = totalRepayable / divisionFactor;

  // TVA & Fees
  const tvaAmount = (totalInterest + loan.feeAmount) * (loan.tvaRate / 100);
  const totalWithTaxes = totalRepayable + tvaAmount;

  const formatMoney = (val: number) => {
    const locale = getLocale(matchedBaseCode);
    return `${val.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${loan.currency}`;
  };

  const fontStyleClass = 
    fontFamily === 'serif' ? 'font-serif' :
    fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const signatureDateFormatted = loan.dateSigned 
    ? new Date(loan.dateSigned).toLocaleDateString(getLocale(matchedBaseCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getDefaultDate(matchedBaseCode);

  const firstDateFormatted = loan.firstRepaymentDate
    ? new Date(loan.firstRepaymentDate).toLocaleDateString(getLocale(matchedBaseCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getUnspecifiedDate(matchedBaseCode);

  const finalDateFormatted = loan.finalRepaymentDate
    ? new Date(loan.finalRepaymentDate).toLocaleDateString(getLocale(matchedBaseCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getUnspecifiedDate(matchedBaseCode);

  // Dynamic adaptations for B2B, mixed, and donation contracts
  const isDonation = contractType === 'donation';
  const isB2B = contractType === 'business_loan';
  const isMixed = contractType === 'party_business_loan';

  let customContractTitle = t.contractTitle;
  let customIntroText = t.introText(signatureDateFormatted);
  let customLenderRole = t.lenderRole(lender.name, lender.address || `${loan.city} (${loan.country})`);
  let customBorrowerRole = t.borrowerRole(borrower.name, borrower.address || `${loan.city} (${loan.country})`);
  let customPreambleTitle = t.preambleTitle;
  let customPreambleClause1 = t.preambleClause1(formatMoney(loan.amount), loan.durationMonths, loan.interestRate);
  let customPreambleClause2 = t.preambleClause2;
  let customPreambleClause3 = t.preambleClause3;
  let customPartiesAgree = t.partiesAgree;
  let customLabelLender = t.labelLender;
  let customLabelBorrower = t.labelBorrower;
  let customHandwriteTextLender = t.handwriteTextLender;
  let customHandwriteTextBorrower = t.handwriteTextBorrower;
  let customClosingRemarks = t.closingRemarks;

  if (isB2B) {
    if (languageCode === 'CUSTOM' && styling.customTranslations) {
      const ct = styling.customTranslations;
      const repl = (val: any, replacements: Record<string, string | number> = {}) => {
        if (typeof val !== 'string') return val;
        let str = val;
        Object.entries(replacements).forEach(([k, v]) => {
          const escapedKey = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          str = str.replace(new RegExp(escapedKey, 'g'), String(v));
        });
        return str;
      };

      customContractTitle = ct.b2bContractTitle || "CONTRAT DE PRÊT COMMERCIAL (B2B)";
      customIntroText = repl(ct.b2bIntroText || "Le présent accord de trésorerie professionnelle prend effet le [DATE_SIGNED], convenu d'un commun accord entre :", { '[DATE_SIGNED]': signatureDateFormatted });
      customLenderRole = repl(ct.b2bLenderRole || "La Société [NAME] (CRÉANCIER / PRÊTEUR PROFESSIONNEL), ayant son siège social à [ADDRESS].", { '[NAME]': lender.name.toUpperCase(), '[ADDRESS]': lender.address || `${loan.city} (${loan.country})` });
      customBorrowerRole = repl(ct.b2bBorrowerRole || "Et la Société [NAME] (EMPRUNTEUR CORPORATIF), sise à [ADDRESS].", { '[NAME]': borrower.name.toUpperCase(), '[ADDRESS]': borrower.address || `${loan.city} (${loan.country})` });
      customPreambleTitle = ct.b2bPreambleTitle || "EXPOSÉ DES MOTIFS (PRÉAMBULE)";
      customPreambleClause1 = repl(ct.b2bPreambleClause1 || "Considérant que l'Emprunteur Corporatif a sollicité auprès du Prêteur un financement professionnel de [AMOUNT] d'une durée de [DURATION] mois.", { '[AMOUNT]': formatMoney(loan.amount), '[DURATION]': loan.durationMonths });
      customPreambleClause2 = ct.b2bPreambleClause2 || "Considérant que le Prêteur consent à allouer ces fonds pour les besoins de trésorerie et d'activité de l'entité emprunteuse.";
      customPreambleClause3 = ct.b2bPreambleClause3 || "Le présent contrat est régi sous l'empire des règles commerciales européennes relatives aux transactions entre sociétés.";
      customPartiesAgree = ct.b2bPartiesAgree || "LES PARTIES DÉCIDENT D'ARRÊTER LES CONVENTIONS SUIVANTES :";
      customClosingRemarks = ct.b2bClosingRemarks || "Fait en trois exemplaires originaux, dument répertoriés aux registres de trésorerie.";
      customLabelLender = ct.b2bLabelLender || "LE PRÊTEUR (CRÉANCIER CORPORATIF)";
      customLabelBorrower = ct.b2bLabelBorrower || "L'EMPRUNTEUR (ENTREPRISE DÉBITRICE)";
    } else if (matchedBaseCode === 'IT') {
      customContractTitle = "CONTRATTO DI PRESTITO COMMERCIALE (B2B)";
      customIntroText = `Il presente accordo di credito professionale entra in vigore dal ${signatureDateFormatted}, tra le imprese firmatarie:`;
      customLenderRole = `La Società ${lender.name.toUpperCase()} (MUTUANTE / CORPORATE), con sede legale a ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `E la Società ${borrower.name.toUpperCase()} (MUTUATARIO / IMPRESA DEBITRICE), sise a ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "PREMESSA COMMERCIALE";
      customPreambleClause1 = `Considerando che il Mutuatario ha sollecitato un finanziamento aziendale di ${formatMoney(loan.amount)} per una durata di ${loan.durationMonths} mesi.`;
      customPreambleClause2 = "Considerando che il Mutuante ha acconsentito a concedere tale fido commerciale nell'ambito della propria operatività finanziaria.";
      customPreambleClause3 = "Le parti approvano il presente regolamento in adempimento alle norme civilistiche e fiscali delle transazioni inter-societarie.";
      customPartiesAgree = "LE PARTI CONCORDANO E STIPULANO QUANTO SEGUE :";
      customClosingRemarks = "Fatto in tre esemplari elettronici aventi pari valore probatorio.";
    } else if (matchedBaseCode === 'EN') {
      customContractTitle = "B2B COMMERCIAL LOAN AGREEMENT";
      customIntroText = `This commercial lending deed is made effective on ${signatureDateFormatted}, between the following corporate entities:`;
      customLenderRole = `The Company ${lender.name.toUpperCase()} (CORPORATE CREDIT LENDER), situated at ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `And the Company ${borrower.name.toUpperCase()} (ORGANIZATIONAL DEBTOR), situated at ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "COMMERCIAL PREAMBLE";
      customPreambleClause1 = `Whereas the Debtor has requested a professional treasury loan of ${formatMoney(loan.amount)} for a duration of ${loan.durationMonths} months.`;
      customPreambleClause2 = "Whereas the Lender is willing to provide such credit solely to support business operations or investment.";
      customPreambleClause3 = "This agreement is framed in observance of the directives of trade law and business regulations.";
      customPartiesAgree = "THE PARTIES STIPULATE AND AGREE AS FOLLOWS:";
      customClosingRemarks = "Executed in triplicate matching originals, each party acknowledging receipt of one copy.";
    } else {
      customContractTitle = "CONTRAT DE PRÊT COMMERCIAL (B2B)";
      customIntroText = `Le présent accord de trésorerie professionnelle prend effet le ${signatureDateFormatted}, convenu d'un commun accord entre :`;
      customLenderRole = `La Société ${lender.name.toUpperCase()} (CRÉANCIER / PRÊTEUR PROFESSIONNEL), ayant son siège social à ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `Et la Société ${borrower.name.toUpperCase()} (EMPRUNTEUR CORPORATIF), sise à ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "EXPOSÉ DES MOTIFS (PRÉAMBULE)";
      customPreambleClause1 = `Considérant que l'Emprunteur Corporatif a sollicité auprès du Prêteur un financement professionnel de ${formatMoney(loan.amount)} d'une durée de ${loan.durationMonths} mois.`;
      customPreambleClause2 = "Considérant que le Prêteur consent à allouer ces fonds pour les besoins de trésorerie et d'activité de l'entité emprunteuse.";
      customPreambleClause3 = "Le présent contrat est régi sous l'empire des règles commerciales européennes relatives aux transactions entre sociétés.";
      customPartiesAgree = "LES PARTIES DÉCIDENT D'ARRÊTER LES CONVENTIONS SUIVANTES :";
      customClosingRemarks = "Fait en trois exemplaires originaux, dument répertoriés aux registres de trésorerie.";
    }
    if (languageCode !== 'CUSTOM' || !styling.customTranslations) {
      customLabelLender = matchedBaseCode === 'IT' ? "IL MUTUANTE (FINANZIATORE CORP)" : matchedBaseCode === 'EN' ? "THE LENDER (CORPORATE CREDITOR)" : "LE PRÊTEUR (CRÉANCIER CORPORATIF)";
      customLabelBorrower = matchedBaseCode === 'IT' ? "IL MUTUATARIO (IMPRESA DEBITRICE)" : matchedBaseCode === 'EN' ? "THE BORROWER (CORPORATE DEBTOR)" : "L'EMPRUNTEUR (ENTREPRISE DÉBITRICE)";
    }
  } else if (isMixed) {
    if (languageCode === 'CUSTOM' && styling.customTranslations) {
      const ct = styling.customTranslations;
      const repl = (val: any, replacements: Record<string, string | number> = {}) => {
        if (typeof val !== 'string') return val;
        let str = val;
        Object.entries(replacements).forEach(([k, v]) => {
          const escapedKey = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          str = str.replace(new RegExp(escapedKey, 'g'), String(v));
        });
        return str;
      };

      customContractTitle = ct.mixedContractTitle || "CONTRAT DE PRÊT MIXTE (ENTREPRISE - PARTICULIER)";
      customIntroText = repl(ct.mixedIntroText || "Le présent acte d'arrangement civil financier prend effet en date du [DATE_SIGNED], entre :", { '[DATE_SIGNED]': signatureDateFormatted });
      customLenderRole = repl(ct.mixedLenderRole || "La Société [NAME] (ENTREPRISE PRÊTEUSE), sise au [ADDRESS].", { '[NAME]': lender.name.toUpperCase(), '[ADDRESS]': lender.address || `${loan.city} (${loan.country})` });
      customBorrowerRole = repl(ct.mixedBorrowerRole || "Et M. / Mme [NAME] (EMPRUNTEUR PARTICULIER), demeurant au [ADDRESS].", { '[NAME]': borrower.name.toUpperCase(), '[ADDRESS]': borrower.address || `${loan.city} (${loan.country})` });
      customPreambleTitle = ct.mixedPreambleTitle || "PRÉAMBULE ADMINISTRATIF";
      customPreambleClause1 = repl(ct.mixedPreambleClause1 || "Considérant que l'emprunteur particulier sollicite une mise à disposition d'une somme de [AMOUNT] d'une durée de [DURATION] mois auprès d'une entreprise prêteuse.", { '[AMOUNT]': formatMoney(loan.amount), '[DURATION]': loan.durationMonths });
      customPreambleClause2 = ct.mixedPreambleClause2 || "Considérant que la société prêteuse décide de consentir à cette demande de financement pour accompagner le projet personnel ou d'investissement du particulier.";
      customPreambleClause3 = ct.mixedPreambleClause3 || "Le présent acte est répertorié dument au greffe pour la traçabilité des opérations de prêt mixte.";
      customPartiesAgree = ct.mixedPartiesAgree || "IL A ÉTÉ ARRÊTÉ ET CONVENU CE QUI SUIT :";
      customLabelLender = ct.mixedLabelLender || "LE PRÊTEUR (SOCIÉTÉ PRÊTEUSE)";
      customLabelBorrower = ct.mixedLabelBorrower || "L'EMPRUNTEUR (PARTICULIER EMPRUNTEUR)";
    } else if (matchedBaseCode === 'IT') {
      customContractTitle = "CONTRATTO DI PRESTITO MISTO (AZIENDA-PRIVATO)";
      customIntroText = `Il presente contratto di debito ad uso misto societario-privato entra in vigore dal ${signatureDateFormatted}, tra:`;
      customLenderRole = `L'Impresa ${lender.name.toUpperCase()} (AZIENDA MUTUANTE), con sede a ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `E M. / Mme ${borrower.name.toUpperCase()} (MUTUATARIO PRIVATO), residente a ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "PREMESSA DEL PRESTITO MISTO";
      customPreambleClause1 = `Considerando che si stipula il fido finanziario di ${formatMoney(loan.amount)} per una durata di ${loan.durationMonths} mesi.`;
      customPreambleClause2 = "Considerando che l'azienda mutuante intende cedere detti capitali per supportare il progetto personale o di investimento del privato.";
      customPreambleClause3 = "Le parti sottoscrivono il presente accordo sotto la vigilanza delle disposizioni fiscali dei prestiti civili registrati.";
      customPartiesAgree = "SI CONCORDANO LE SEGUENTI CLAUSOLE ESECUTORIE :";
    } else if (matchedBaseCode === 'EN') {
      customContractTitle = "MIXED LOAN AGREEMENT (BUSINESS-PRIVATE)";
      customIntroText = `This mixed-use loan agreement is made on ${signatureDateFormatted}, between the following distinct parties:`;
      customLenderRole = `The Corporation ${lender.name.toUpperCase()} (CORPORATE LENDER), having its office at ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `And Mr. / Mrs. ${borrower.name.toUpperCase()} (PRIVATE PARTY BORROWER), residing at ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "PREAMBLE";
      customPreambleClause1 = `Whereas the private debtor has requested a capital credit line of ${formatMoney(loan.amount)} for a duration of ${loan.durationMonths} months.`;
      customPreambleClause2 = "Whereas the corporate lender wishes to support the private initiatives or personal goals of the borrower under agreed protections.";
      customPreambleClause3 = "The parties agree to execute this deed in compliance with private credit guidelines.";
      customPartiesAgree = "THE PARTIES HERETO DECLARE AND AGREE AS FOLLOWS:";
    } else {
      customContractTitle = "CONTRAT DE PRÊT MIXTE (ENTREPRISE - PARTICULIER)";
      customIntroText = `Le présent acte d'arrangement civil financier prend effet en date du ${signatureDateFormatted}, entre :`;
      customLenderRole = `La Société ${lender.name.toUpperCase()} (ENTREPRISE PRÊTEUSE), sise au ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `Et M. / Mme ${borrower.name.toUpperCase()} (EMPRUNTEUR PARTICULIER), demeurant au ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "PRÉAMBULE ADMINISTRATIF";
      customPreambleClause1 = `Considérant que l'emprunteur particulier sollicite une mise à disposition d'une somme de ${formatMoney(loan.amount)} d'une durée de ${loan.durationMonths} mois auprès d'une entreprise prêteuse.`;
      customPreambleClause2 = "Considérant que la société prêteuse décide de consentir à cette demande de financement pour accompagner le projet personnel ou d'investissement du particulier.";
      customPreambleClause3 = "Le présent acte est répertorié dument au greffe pour la traçabilité des opérations de prêt mixte.";
      customPartiesAgree = "IL A ÉTÉ ARRÊTÉ ET CONVENU CE QUI SUIT :";
    }
    if (languageCode !== 'CUSTOM' || !styling.customTranslations) {
      customLabelLender = matchedBaseCode === 'IT' ? "IL MUTUANTE (IMPRESA CREDITOR)" : matchedBaseCode === 'EN' ? "THE LENDER (CORPORATE CREDITOR)" : "LE PRÊTEUR (SOCIÉTÉ PRÊTEUSE)";
      customLabelBorrower = matchedBaseCode === 'IT' ? "IL MUTUATARIO (PRIVATO DEBITORE)" : matchedBaseCode === 'EN' ? "THE BORROWER (PRIVATE DEBTOR)" : "L'EMPRUNTEUR (PARTICULIER EMPRUNTEUR)";
    }
  } else if (isDonation) {
    if (languageCode === 'CUSTOM' && styling.customTranslations) {
      const ct = styling.customTranslations;
      const repl = (val: any, replacements: Record<string, string | number> = {}) => {
        if (typeof val !== 'string') return val;
        let str = val;
        Object.entries(replacements).forEach(([k, v]) => {
          const escapedKey = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          str = str.replace(new RegExp(escapedKey, 'g'), String(v));
        });
        return str;
      };

      customContractTitle = ct.donationContractTitle || "CONVENTION D'ACTE DE DONATION DE SÉCURITÉ FISCALE";
      customIntroText = repl(ct.donationIntroText || "La présente convention d'acte authentique à titre gratuit est signée le [DATE_SIGNED], entre :", { '[DATE_SIGNED]': signatureDateFormatted });
      customLenderRole = repl(ct.donationLenderRole || "M. / Mme / Entité [NAME] (DONATEUR / BIENFAITEUR), résidant à [ADDRESS].", { '[NAME]': lender.name.toUpperCase(), '[ADDRESS]': lender.address || `${loan.city} (${loan.country})` });
      customBorrowerRole = repl(ct.donationBorrowerRole || "Et M. / Mme [NAME] (DONATAIRE / BÉNÉFICIAIRE), demeurant à [ADDRESS].", { '[NAME]': borrower.name.toUpperCase(), '[ADDRESS]': borrower.address || `${loan.city} (${loan.country})` });
      customPreambleTitle = ct.donationPreambleTitle || "EXPOSÉ D'INTENTION LIBÉRALE";
      customPreambleClause1 = repl(ct.donationPreambleClause1 || "Considérant l'intention libérale et l'esprit d'affection qui déterminent le Donateur à céder de manière définitive et irrévocable la somme de [AMOUNT].", { '[AMOUNT]': formatMoney(loan.amount) });
      customPreambleClause2 = ct.donationPreambleClause2 || "Considérant que le Donataire accepte expressément cette donation manuelle avec une gratitude et une reconnaissance absolues.";
      customPreambleClause3 = ct.donationPreambleClause3 || "Cet acte est homologué sous sceau pour préserver les droits successoraux et l'enregistrement de sécurité fiscale des donations.";
      customPartiesAgree = ct.donationPartiesAgree || "LES PARTIES CONVIENNENT DE CE QUI SUIT :";
      customClosingRemarks = ct.donationClosingRemarks || "Fait en trois exemplaires originaux, dument répertoriés aux registres de trésorerie.";
      customLabelLender = ct.donationLabelLender || "LE DONATEUR (BIENFAITEUR)";
      customLabelBorrower = ct.donationLabelBorrower || "LE DONATAIRE (BÉNÉFICIAIRE)";
      customHandwriteTextLender = ct.donationHandwriteTextLender || '"Bon pour donation irrévocable à titre gratuit"';
      customHandwriteTextBorrower = ct.donationHandwriteTextBorrower || '"Lu et accepté avec gratitude, bon dresseur d\'office"';
    } else if (matchedBaseCode === 'IT') {
      customContractTitle = "ATTO DI DONAZIONE DI SICUREZZA FISCALE";
      customIntroText = `La presente scrittura privata di donazione viene sottoscritta e autenticata il ${signatureDateFormatted}, tra:`;
      customLenderRole = `M. / Mme / Società ${lender.name.toUpperCase()} (DONATORE), con sede/residenza a ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `E M. / Mme ${borrower.name.toUpperCase()} (DONATARIO), con residenza a ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "NOTA DI LIBERALITÀ (DIRITTO CIVILE)";
      customPreambleClause1 = `Considerando lo spirito di liberalità che spinge il Donatore a cedere definitivamente e irrevocabilmente la somma di ${formatMoney(loan.amount)} al Donatario.`;
      customPreambleClause2 = "Considerando che il Donatario accetta con massima gratitudine civile detta donazione patrimoniale senza alcuna pretesa futura.";
      customPreambleClause3 = "L'atto viene formalizzato d'ufficio per l'adempimento delle imposte e la sicurezza delle successioni della famiglia.";
      customPartiesAgree = "LE PARTI CONCORDANO L'IMMEDIATEZZA DEI SEGUENTI EFFETTI :";
      customClosingRemarks = "Fatto in triplice esemplare autentico per registrazione d'ufficio.";
    } else if (matchedBaseCode === 'EN') {
      customContractTitle = "TAX-SECURE DEED OF DONATION";
      customIntroText = `This legal deed of voluntary donation is executed and certified on ${signatureDateFormatted}, by and between:`;
      customLenderRole = `Mr. / Mrs. / Entity ${lender.name.toUpperCase()} (DONOR / BENEFACTOR), residing at ${lender.address || `${loan.city} (${loan.country})`}.`;
      customBorrowerRole = `And Mr. / Mrs. ${borrower.name.toUpperCase()} (DONEE / BENEFICIARY), residing at ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "DONATION PREAMBLE";
      customPreambleClause1 = `Whereas the Donor acts out of pure generosity and benevolent intent to completely and irrevocably transfer the asset of ${formatMoney(loan.amount)}.`;
      customPreambleClause2 = "Whereas the Donee accepts said gratuitous manual gift with appreciation, acknowledging no repayment is required.";
      customPreambleClause3 = "This transfer is formalized before administrative authorities to comply with relevant tax reporting mandates.";
      customPartiesAgree = "THEREFORE, THE PARTIES WITNESS AND DECLARE AS FOLLOWS:";
      customClosingRemarks = "Executed voluntarily in presence of authorized notary for future registration.";
    } else {
      customContractTitle = "CONVENTION D'ACTE DE DONATION DE SÉCURITÉ FISCALE";
      customIntroText = `La présente convention d'acte authentique à titre gratuit est signée le ${signatureDateFormatted}, entre :`;
      customLenderRole = `M. / Mme / Entité ${lender.name.toUpperCase()} (DONATEUR / BIENFAITEUR), résidant à ${lender.address || `${lender.address || `${loan.city} (${loan.country})`}`}.`;
      customBorrowerRole = `Et M. / Mme ${borrower.name.toUpperCase()} (DONATAIRE / BÉNÉFICIAIRE), demeurant à ${borrower.address || `${loan.city} (${loan.country})`}.`;
      customPreambleTitle = "EXPOSÉ D'INTENTION LIBÉRALE";
      customPreambleClause1 = `Considérant l'intention libérale et l'esprit d'affection qui déterminent le Donateur à céder de manière définitive et irrévocable la somme de ${formatMoney(loan.amount)}.`;
      customPreambleClause2 = "Considérant que le Donataire accepte expressément cette donation manuelle avec une gratitude et une reconnaissance absolues.";
      customPreambleClause3 = "Cet acte est homologué sous sceau pour préserver les droits successoraux et l'enregistrement de sécurité fiscale des donations.";
      customPartiesAgree = "LES PARTIES DÉCLARENT CONVENIR SPONTANÉMENT DE CE QUI SUIT :";
      customClosingRemarks = "Acté et certifié sous double sceau d'office en trois exemplaires dument notariés.";
    }

    if (languageCode !== 'CUSTOM' || !styling.customTranslations) {
      customLabelLender = matchedBaseCode === 'IT' ? "IL DONATORE (BENEFATTORE)" : matchedBaseCode === 'EN' ? "THE DONOR (BENEFACTOR)" : "LE DONATEUR (BIENFAITEUR)";
      customLabelBorrower = matchedBaseCode === 'IT' ? "IL DONATARIO (DONEE)" : matchedBaseCode === 'EN' ? "THE DONEE (BENEFICIARY)" : "LE DONATAIRE (BÉNÉFICIAIRE)";
      customHandwriteTextLender = matchedBaseCode === 'IT' ? '"In fede di donazione irrevocabile a titre gratuit"' : matchedBaseCode === 'EN' ? '"Approved for voluntary irrevocable gift"' : '"Bon pour donation irrévocable à titre gratuit"';
      customHandwriteTextBorrower = matchedBaseCode === 'IT' ? '"Letto e accettato con gratitudine"' : matchedBaseCode === 'EN' ? '"Accepted with appreciation, bound by terms"' : '"Lu et accepté avec gratitude, bon dresseur d\'office"';
    }
  }

  const getDonationArt = (key: string, replacements: Record<string, string | number> = {}): string => {
    if (languageCode === 'CUSTOM' && styling.customTranslations && styling.customTranslations[key as keyof typeof styling.customTranslations]) {
      let str = styling.customTranslations[key as keyof typeof styling.customTranslations] as string;
      Object.entries(replacements).forEach(([k, v]) => {
        str = str.replace(new RegExp(k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), String(v));
      });
      return str;
    }

    switch (key) {
      case 'donationArt1Title':
        return matchedBaseCode === 'IT' ? "Article 1 : Constatazione di Donazione a Titolo Gratuito" : matchedBaseCode === 'EN' ? "Article 1 : Statement of Gratuitous Donation" : "Article 1 : Constat de libéralité de fonds à titre gratuit";
      case 'donationArt1Content':
        return matchedBaseCode === 'IT'
          ? `Il Donatore trasferisce definitivamente e senza alcuna riserva la somma di ${formatMoney(loan.amount)} al Donatario, che l'accetta.`
          : matchedBaseCode === 'EN'
          ? `The Donor transfers definitely and without reservation the sum of ${formatMoney(loan.amount)} to the Donee, who accepts it.`
          : `Le Donateur transfère définitivement et sans réserve la somme de ${formatMoney(loan.amount)} au Donataire, qui l'accepte.`;
      case 'donationSummaryTitle':
        return matchedBaseCode === 'IT' ? "SCHEDA DONAZIONE" : matchedBaseCode === 'EN' ? "DONATION SUMMARY" : "FICHE DE LIQUIDATION DE DONATION";
      case 'donationLabelAmount':
        return matchedBaseCode === 'IT' ? "Somma Donata:" : matchedBaseCode === 'EN' ? "Donated Value:" : "Valeur Totale Donnée :";
      case 'donationLabelRepayment':
        return matchedBaseCode === 'IT' ? "Obbligo Rimborso:" : matchedBaseCode === 'EN' ? "Repayment Terms:" : "Nature de remboursement :";
      case 'donationValueRepayment':
        return matchedBaseCode === 'IT' ? "ESENTE (GRATUITO)" : matchedBaseCode === 'EN' ? "EXEMPT (GRATUITOUS)" : "EXEMPTÉ (A TITRE GRATUIT)";
      case 'donationLabelInterest':
        return matchedBaseCode === 'IT' ? "Tasso d'interesse:" : matchedBaseCode === 'EN' ? "Interest Rate:" : "Taux d'intérêt conventionnel :";
      case 'donationValueInterest':
        return `0% (${matchedBaseCode === 'IT' ? "Non applicabile" : matchedBaseCode === 'EN' ? "Not applicable" : "Non applicable"})`;
      case 'donationLabelFee':
        return matchedBaseCode === 'IT' ? "Spese Notarili:" : matchedBaseCode === 'EN' ? "Notary Registration fee:" : "Droits d'homologation administrative :";
      case 'donationLabelFrequency':
        return matchedBaseCode === 'IT' ? "Frequenza transazione:" : matchedBaseCode === 'EN' ? "Frequency code:" : "Fréquence d'acte :";
      case 'donationValueFrequency':
        return matchedBaseCode === 'IT' ? "Donazione manuale unica" : matchedBaseCode === 'EN' ? "One-off voluntary transfer" : "Donation manuelle unique";
      case 'donationLabelDeedStatus':
        return matchedBaseCode === 'IT' ? "Natura fiscale dell'atto:" : matchedBaseCode === 'EN' ? "Deed status:" : "Garantie de Sécurité Fiscale :";
      case 'donationValueDeedStatus':
        return matchedBaseCode === 'IT' ? "CONVENZIONE CIVILE FISCALE" : matchedBaseCode === 'EN' ? "SECURE REGISTERED DEED" : "DON MANUEL TRANSMIS HORS TAXATION";
      case 'donationArt2Title':
        return matchedBaseCode === 'IT' ? "Article 2 : Accettazione espressa del Donatario" : matchedBaseCode === 'EN' ? "Article 2 : Explicit Acceptance by Donee" : "Article 2 : Acceptation expresse du Donataire";
      case 'donationArt2Content':
        return matchedBaseCode === 'IT'
          ? "Il Donatario accetta la presente liberalità che i fondi non provengono da operazioni illecite e ringrazia il Donatore."
          : matchedBaseCode === 'EN'
          ? "The Donee accepts this manual gift with highest appreciation, stating that these funds are legitimate."
          : "Le Donataire certifie sa pleine et entière acceptation de cette libéralité de grand cœur et témoigne de sa vive gratitude.";
      case 'donationArt3Title':
        return matchedBaseCode === 'IT' ? "Article 3 : Irrevocabilità della cessione manuale" : matchedBaseCode === 'EN' ? "Article 3 : Irrevocability of Transfer" : "Article 3 : Caractère irrévocable du transfert physique";
      case 'donationArt3Content':
        return matchedBaseCode === 'IT'
          ? "Questo atto costituisce un trasferimento definitivo e irrevocabile. Nessun successore potrà pretendere la revoca del dono."
          : matchedBaseCode === 'EN'
          ? "The current manual transfer is absolute, irreversible, and irrevocable under common civil law guidelines."
          : "Le Donateur déclare et confirme que ce transfert s'effectue de manière absolue, irrévocable et définitive.";
      case 'donationArt4Title':
        return matchedBaseCode === 'IT' ? "Article 4 : Dichiarazione fiscale ordinaria" : matchedBaseCode === 'EN' ? "Article 4 : Tax Compliance and Filing" : "Article 4 : Fiscalité et dispenses d'obligations d'héritage";
      case 'donationArt4Content':
        return matchedBaseCode === 'IT'
          ? "Il beneficiario si impegna ad adempiere a qualsiasi obbligo di registrazione fiscale o dichiarazione locale obbligatoria."
          : matchedBaseCode === 'EN'
          ? "The Donee remains solely responsible for filing the appropriate tax declarations with administrative authorities."
          : "Cet acte civil dispense définitivement le Donataire de toute restitution directe ou indirecte lors des successions familiales.";
      case 'donationArt5Title':
        return matchedBaseCode === 'IT' ? "Article 5 : Spese dello Sceglimento e Notariato" : matchedBaseCode === 'EN' ? "Article 5 : Registry Maintenance Fees" : "Article 5 : Frais d'homologation de sécurité administrative";
      case 'donationArt5Content':
        return matchedBaseCode === 'IT'
          ? `Per la validità opponibile ai terzi, i diritti di dossier pari a ${formatMoney(loan.feeAmount)} sono incassati dall'étude.`
          : matchedBaseCode === 'EN'
          ? `To establish official records, the registration and notary service fee of ${formatMoney(loan.feeAmount)} is fully authorized.`
          : `Pour l'opposabilité de plein droit de cet acte, les frais de sécurité d'enregistrement de ${formatMoney(loan.feeAmount)} sont fixés.`;
      case 'donationArt6Title':
        return matchedBaseCode === 'IT' ? "Article 6 : Capacità civile delle parti" : matchedBaseCode === 'EN' ? "Article 6 : Civil Capacity and Free Will" : "Article 6 : Attestation de capacité civile et libre arbitre";
      case 'donationArt6Content':
        return matchedBaseCode === 'IT'
          ? "Entrambe le parti dichiarano di trovarsi in piene facoltà mentali, libere da qualsiasi costrizione esterna."
          : matchedBaseCode === 'EN'
          ? "Both the Donor and Donee certify they are of sound mind and acting entirely of their own free will without any duress."
          : "Les parties comparaissantes attestent sur l'honneur posséder leur pleine capacité civile et agir de leur libre arbitre physique.";
      case 'donationArt7Title':
        return matchedBaseCode === 'IT' ? "Article 7 : Giurisdizione e Legge Applicabile" : matchedBaseCode === 'EN' ? "Article 7 : Applicable Jurisdiction" : "Article 7 : Opposabilité juridique et enregistrement d'État";
      case 'donationArt7Content':
        return matchedBaseCode === 'IT'
          ? "Qualsiasi controversia relativa all'interpretazione del presente atto è deferita alla giurisdizione del foro civile territorialmente competente."
          : matchedBaseCode === 'EN'
          ? "Any disputes on the interpretation of this deed of donation shall be submitted to the competent civil court of justice."
          : "La présente donation est soumise à la compétence exclusive des tribunaux du siège de l'autorité émettrice.";
      default:
        return "";
    }
  };

  const getB2BMixedArt = (key: string, replacements: Record<string, string | number> = {}): string => {
    if (languageCode === 'CUSTOM' && styling.customTranslations && styling.customTranslations[key as keyof typeof styling.customTranslations]) {
      let str = styling.customTranslations[key as keyof typeof styling.customTranslations] as string;
      Object.entries(replacements).forEach(([k, v]) => {
        str = str.replace(new RegExp(k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), String(v));
      });
      return str;
    }

    switch (key) {
      case 'b2bMixedArt1Title':
        return matchedBaseCode === 'IT' ? "Oggetto e destinazione dei fondi aziendali" : matchedBaseCode === 'EN' ? "Object and Purposed Business Allocation" : "Objet du financement et destination réglementée des fonds";
      case 'b2bMixedArt1Content':
        return matchedBaseCode === 'IT'
          ? `Il Mutuante concede un fido al Mutuatario per l'importo totale consolidato di ${formatMoney(totalRepayable)} (capitale di ${formatMoney(loan.amount)} e interessi).`
          : matchedBaseCode === 'EN'
          ? `The Lender grants credit to the Debtor for the general consolidated amount of ${formatMoney(totalRepayable)} (principal of ${formatMoney(loan.amount)} plus borrowing costs).`
          : `Le Prêteur consent à mettre à disposition de l'Emprunteur l'enveloppe consolidée de ${formatMoney(totalRepayable)} (comprenant le principal exigible de ${formatMoney(loan.amount)} et les coûts afférents).`;
      case 'b2bMixedArt2Title':
        return matchedBaseCode === 'IT' ? "Termini di Ammortamento e Rateizzazione" : matchedBaseCode === 'EN' ? "Amortization and Installment Schedule" : "Calendrier d'amortissement et échéances";
      case 'b2bMixedArt2Content':
        return matchedBaseCode === 'IT'
          ? `L'ammortamento si svolgerà in ${loan.durationMonths} scadenze ricorrenti di valore fisso pari a ${formatMoney(installmentPayment)}, con decorrenza prima scadenza al ${firstDateFormatted}.`
          : matchedBaseCode === 'EN'
          ? `Repayments are structures across ${loan.durationMonths} consecutive installments of ${formatMoney(installmentPayment)}, starting on ${firstDateFormatted} and concluding on ${finalDateFormatted}.`
          : `L'amortissement de la dette s'établira sur la base de ${loan.durationMonths} échéances récurrentes de ${formatMoney(installmentPayment)} chacune, de manière consécutive.`;
      case 'b2bMixedArt3Title':
        return matchedBaseCode === 'IT' ? "Facoltà di Estinzione Anticipata" : matchedBaseCode === 'EN' ? "Right of Prepayment Without Penalty" : "Droit souverain de remboursement anticipé sans frais";
      case 'b2bMixedArt3Content':
        return matchedBaseCode === 'IT'
          ? "Il debitore corporativo o mixed conserva il diritto di saldare in qualsiasi istante l'importo residuo, esente da penalità IRA."
          : matchedBaseCode === 'EN'
          ? "The borrowing party retains the full sovereign right to prepay the outstanding principal at any time without any early repayment charge."
          : "L'Emprunteur conserve expressément la faculté discrétionnaire de solder sa dette par anticipation, sans frais ou pénalités d'office.";
      case 'b2bMixedArt4Title':
        return matchedBaseCode === 'IT' ? "Solidarietà e Garanzia Costituzionale" : matchedBaseCode === 'EN' ? "Guarantees and Joint Liability" : "Responsabilité solidaire et déclaration de solvabilité";
      case 'b2bMixedArt4Content':
        return matchedBaseCode === 'IT'
          ? "I rappresentanti aziendali certificano la solidarietà di pagamento solido ed impegnano l'entità sociale per l'adempimento."
          : matchedBaseCode === 'EN'
          ? "The corporate representatives confirm that this obligation is jointly and severally binding upon the assets of the business."
          : "Le signataire et ses délégations d'affaires engagent solidairement l'ensemble des avoirs de la structure emprunteuse.";
      case 'b2bMixedArt5Title':
        return matchedBaseCode === 'IT' ? "Frais Notarili e Assicurazione" : matchedBaseCode === 'EN' ? "Notary Certification and Service Fees" : "Frais d'homologation d'acte et constitution de garantie";
      case 'b2bMixedArt5Content':
        return matchedBaseCode === 'IT'
          ? `L'omologazione civile prevede spese accessorie di ${formatMoney(loan.feeAmount)} a carico del beneficiario, indispensabili prima del trasferimento.`
          : matchedBaseCode === 'EN'
          ? `To finalize records, the mandatory administrative process cost of ${formatMoney(loan.feeAmount)} is billed, required prior to wire.`
          : `Pour valider l'acte, les frais obligatoires de constitution d'assurance et d'homologation de ${formatMoney(loan.feeAmount)} devront être soldés par l'emprunteur.`;
      case 'b2bMixedArt6Title':
        return matchedBaseCode === 'IT' ? "Interessi Moratori in caso di ritardo" : matchedBaseCode === 'EN' ? "Late Payments and Interest Uplift" : "Pénalités moratoires et déchéance immédiate du terme";
      case 'b2bMixedArt6Content':
        return matchedBaseCode === 'IT'
          ? `In caso di insoluto oltre i 5 giorni, si applicherà un tasso aggiuntivo del ${loan.penaltyRate}% mensile unitamente alla penalità fissa di ${formatMoney(loan.penaltyFixedAmount)}.`
          : matchedBaseCode === 'EN'
          ? `Any default persisting beyond 5 business days incurs late interest rates of ${loan.penaltyRate}% monthly alongside a flat fee of ${formatMoney(loan.penaltyFixedAmount)}.`
          : `Tout retard persistant de plus de cinq jours francs autorisera une majoration de ${loan.penaltyRate}% mensuel assortie d'une astreinte de ${formatMoney(loan.penaltyFixedAmount)}.`;
      case 'b2bMixedArt7Title':
        return matchedBaseCode === 'IT' ? "Tribunale di Commercio Competente" : matchedBaseCode === 'EN' ? "Applicable Corporate Jurisdiction" : "Droit européen régisseur et attribution de juridiction";
      case 'b2bMixedArt7Content':
        return matchedBaseCode === 'IT'
          ? "Il contratto è disciplinato dalle leggi commerciali europee. Per qualsiasi vertenza, il foro commerciale eletto ha competenza esclusiva."
          : matchedBaseCode === 'EN'
          ? "This commercial agreement is governed by the rules of European Trade Law, any claims submitted exclusively to the Commercial Courts."
          : "Le règlement du contrat se réfère au cadre réglementaire des affaires européennes. Tout conflit sera du ressort exclusif du Tribunal de Commerce.";
      default:
        return "";
    }
  };

  // CLOSURE HELPER TO RENDER ASSOCIATED EUROPEAN DOCUMENTS
  const renderSelectedDocContent = () => {
    const lang = (secondaryDocsT[matchedBaseCode] ? matchedBaseCode : 'FR');
    const dict = secondaryDocsT[lang] || secondaryDocsT.FR;

    const d = (key: string, ...args: any[]): string => {
      const val = dict[key];
      if (!val) {
        const fallbackVal = secondaryDocsT.FR[key];
        if (typeof fallbackVal === 'function') {
          return fallbackVal(...args);
        }
        return (fallbackVal as string) || '';
      }
      if (typeof val === 'function') {
        return val(...args);
      }
      return val as string;
    };

    switch (selectedDoc) {
      case 'loan_offer':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('loan_offer_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('loan_offer_intro')}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('loan_offer_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('loan_offer_art1_body', formatMoney(loan.amount), loan.durationMonths, loan.interestRate, formatMoney(totalRepayable))}
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('loan_offer_art2')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('loan_offer_art2_body', signatureDateFormatted)}
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('loan_offer_art3')}
              </h4>
              <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                {d('loan_offer_art3_body', formatMoney(loan.feeAmount), loan.tvaRate, notary.name)}
              </p>
            </div>
          </div>
        );
      case 'amortization_schedule':
        const rows = [];
        const monthlyRate = (loan.interestRate / 100) / 12;
        let amortizationBalance = loan.amount;
        const totalRows = Math.min(12, loan.durationMonths);
        const hasMoreAmortization = loan.durationMonths > 12;
        
        for (let i = 1; i <= totalRows; i++) {
          const interestPaid = amortizationBalance * monthlyRate;
          const capitalPaid = Math.min(amortizationBalance, installmentPayment - interestPaid);
          amortizationBalance = Math.max(0, amortizationBalance - capitalPaid);
          rows.push({
            num: i,
            interest: interestPaid,
            capital: capitalPaid,
            balance: amortizationBalance
          });
        }
        return (
          <div className="space-y-3">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-1">
              {d('amort_title')}
            </h3>
            <p className="leading-relaxed text-slate-700 text-center text-[8.5px] max-w-xl mx-auto italic mb-2">
              {d('amort_intro', formatMoney(loan.amount))}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-stone-200 text-[8.5px] font-mono">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 uppercase font-bold text-[8px] border-b border-stone-300">
                    <th className="border border-stone-200 p-1 text-center font-black">N°</th>
                    <th className="border border-stone-200 p-1 text-right font-black">{d('amort_th_capital')}</th>
                    <th className="border border-stone-200 p-1 text-right font-black">{d('amort_th_interests')}</th>
                    <th className="border border-stone-200 p-1 text-right font-black">{d('amort_th_installment')}</th>
                    <th className="border border-stone-200 p-1 text-right font-black">{d('amort_th_balance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.num} className="hover:bg-slate-50 odd:bg-stone-50/40">
                      <td className="border border-stone-200 p-1 text-center font-bold">{row.num}</td>
                      <td className="border border-stone-200 p-1 text-right text-slate-700">{formatMoney(row.capital)}</td>
                      <td className="border border-stone-200 p-1 text-right text-amber-800">{formatMoney(row.interest)}</td>
                      <td className="border border-stone-200 p-1 text-right font-bold text-blue-800">{formatMoney(installmentPayment)}</td>
                      <td className="border border-stone-200 p-1 text-right font-bold text-purple-900">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                  {hasMoreAmortization && (
                    <tr>
                      <td className="border border-stone-200 p-1 text-center font-bold text-stone-400">...</td>
                      <td className="border border-stone-200 p-1 text-center text-stone-400 italic" colSpan={3}>
                        {d('amort_extrapolate', loan.durationMonths)}
                      </td>
                      <td className="border border-stone-200 p-1 text-right font-bold text-purple-900">{formatMoney(0)}</td>
                    </tr>
                  )}
                  <tr className="bg-slate-100 font-extrabold border-t border-stone-300">
                    <td className="border border-stone-200 p-1 text-center text-[7.5px] uppercase">{d('amort_totals')}</td>
                    <td className="border border-stone-200 p-1 text-right text-slate-900">{formatMoney(loan.amount)}</td>
                    <td className="border border-stone-200 p-1 text-right text-amber-900">{formatMoney(totalInterest)}</td>
                    <td className="border border-stone-200 p-1 text-right text-emerald-900" colSpan={2}>{formatMoney(totalRepayable)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'borrower_insurance':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('ins_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('ins_intro', formatMoney(loan.amount), borrower.name.toUpperCase())}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('ins_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('ins_art1_body')}
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('ins_art2')}
              </h4>
              <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                {d('ins_art2_body', formatMoney(loan.feeAmount))}
              </p>
            </div>
          </div>
        );
      case 'sepa_mandate':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('sepa_title')}
            </h3>
            <p className="leading-relaxed text-slate-700 text-[8.5px] border border-stone-200 p-2 bg-slate-50 rounded-sm">
              {d('sepa_intro')}
            </p>
            <div className="grid grid-cols-2 gap-4 border-y border-stone-200 py-2.5 font-mono text-[8.5px] text-slate-800">
              <div className="space-y-1 text-left">
                <span className="font-bold text-zinc-500 block uppercase">{d('sepa_lbl_creditor_id')}</span>
                <strong className="text-blue-900 block">FR19ZZZ112289</strong>
                <span className="font-bold text-zinc-500 block uppercase">{d('sepa_lbl_creditor_name')}</span>
                <strong className="text-slate-900 block">CREDIVITE S.A. (CENTRAL EUROPE)</strong>
              </div>
              <div className="space-y-1 text-left">
                <span className="font-bold text-zinc-500 block uppercase">{d('sepa_lbl_debtor_name')}</span>
                <strong className="text-emerald-950 block">{borrower.name.toUpperCase()}</strong>
                <span className="font-bold text-zinc-500 block uppercase">IBAN / BIC:</span>
                <strong className="text-slate-900 block">{borrower.address ? `EU91 *** **** **** **** ${borrower.address.substring(0,4)}` : "FR76 1120 9021 3491 **** **** 091"}</strong>
              </div>
            </div>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('sepa_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('sepa_art1_body', formatMoney(installmentPayment))}
              </p>
            </div>
          </div>
        );
      case 'guarantor_agreement':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('guar_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('guar_intro', lender.name.toUpperCase(), borrower.name.toUpperCase())}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('guar_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('guar_art1_body', formatMoney(totalRepayable))}
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('guar_art2')}
              </h4>
              <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                {d('guar_art2_body', formatMoney(loan.feeAmount))}
              </p>
            </div>
          </div>
        );
      case 'mortgage_deed':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('mort_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('mort_intro', borrower.name.toUpperCase(), notary.name)}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('mort_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('mort_art1_body', formatMoney(loan.amount * 1.5))}
              </p>
            </div>
          </div>
        );
      case 'pledge_agreement':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('pledge_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('pledge_intro', formatMoney(loan.amount))}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('pledge_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('pledge_art1_body', formatMoney(loan.amount * 1.1))}
              </p>
            </div>
          </div>
        );
      case 'debt_acknowledgment':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('debt_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('debt_intro', borrower.name.toUpperCase(), borrower.address || `${loan.city} (${loan.country})`)}
            </p>
            <div className="p-3 bg-stone-100 border border-dashed border-stone-400 text-center text-[10px] text-slate-900 font-serif font-bold italic leading-relaxed my-2">
              {d('debt_quote', formatMoney(totalRepayable))}
            </div>
          </div>
        );
      case 'fees_agreement':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('fees_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('fees_intro')}
            </p>
            <div className="border border-stone-200 p-2 rounded-sm space-y-1 bg-slate-50 text-[9px] font-mono select-none">
              <div className="flex justify-between border-b border-stone-100 pb-0.5">
                <span className="text-stone-500">{d('fees_lbl_opening')}</span>
                <strong className="text-slate-800">{formatMoney(loan.feeAmount)}</strong>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-0.5">
                <span className="text-stone-500">{d('fees_lbl_tva')}</span>
                <strong className="text-amber-800">{loan.tvaRate}% ({formatMoney(tvaAmount)})</strong>
              </div>
              <div className="flex justify-between font-bold text-blue-900 pt-0.5">
                <span>{d('fees_lbl_total')}</span>
                <strong>{formatMoney(loan.feeAmount + tvaAmount)}</strong>
              </div>
            </div>
            <p className="leading-relaxed text-[8.5px] italic text-[#b31412] font-semibold">
              {d('fees_warning', notary.name)}
            </p>
          </div>
        );
      case 'general_credit_terms':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('terms_title')}
            </h3>
            <p className="leading-relaxed text-slate-700 text-[8.5px]">
              {d('terms_intro')}
            </p>
            <div className="space-y-1.5 text-[8.5px] pl-2 text-justify">
              <p>{d('terms_lbl1')}</p>
              <p>{d('terms_lbl2')}</p>
            </div>
          </div>
        );
      case 'loan_addendum':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('add_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('add_intro')}
            </p>
            <div>
              <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 border-b border-stone-200 pb-0.5">
                {d('add_art1')}
              </h4>
              <p className="leading-relaxed text-slate-700">
                {d('add_art1_body', formatMoney(installmentPayment))}
              </p>
            </div>
          </div>
        );
      case 'notary_registration':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('reg_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('reg_intro', notary.name, formatMoney(loan.amount))}
            </p>
            <div className="border border-double border-slate-300 p-2.5 bg-slate-50 text-[8.5px] font-mono leading-relaxed select-none">
              <strong>{d('reg_minutier')}</strong>
              <div className="pl-3 mt-1 text-slate-700 space-y-0.5 text-left">
                <p>• {d('reg_item1', loan.notaryLicense || 'H880')}</p>
                <p>• {d('reg_item2', notary.address || 'Europe')}</p>
                <p>• {d('reg_item3')}</p>
                <p>• {d('reg_item4', formatMoney(loan.feeAmount))}</p>
              </div>
            </div>
          </div>
        );
      case 'tva_tax_statement':
        return (
          <div className="space-y-4">
            <h3 className="text-center font-bold text-slate-800 text-[11px] underline uppercase tracking-wider mb-2">
              {d('tva_title')}
            </h3>
            <p className="leading-relaxed text-slate-700">
              {d('tva_intro', notary.name)}
            </p>
            <div className="border border-stone-200 text-[8.5px] font-mono">
              <div className="p-1 px-2.5 bg-slate-100 font-bold border-b border-stone-200">{d('tva_lbl', loan.tvaRate)}</div>
              <div className="p-2 space-y-1 text-slate-800 text-left">
                <div className="flex justify-between"><span>{d('tva_item1')}</span><strong>{formatMoney(totalInterest)}</strong></div>
                <div className="flex justify-between"><span>{d('tva_item2')}</span><strong>{loan.tvaRate}%</strong></div>
                <div className="flex justify-between text-blue-900 font-extrabold border-t border-dashed border-stone-200 pt-1">
                  <span>{d('tva_item3')}</span>
                  <strong>{formatMoney(tvaAmount)}</strong>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="contract-paper-a4-viewport" className="p-1 sm:p-4 bg-slate-100 flex justify-center overflow-x-auto w-full print:overflow-visible print:p-0 print:bg-white select-text">
      {/* Interactive print wrapper */}
      <div 
        id="printed-contract-sheet"
        className={`w-full max-w-[800px] bg-white text-slate-900 shadow-2xl rounded-sm p-4 sm:p-6 relative overflow-hidden transition-all duration-300 print:shadow-none print:p-0 print:m-0 ${fontStyleClass}`}
        style={{ fontSize: '11px', lineHeight: '1.4' }}
      >
        {/* Real-time elegant CSS for single page print compaction and page overflow protection */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: A4;
              margin: 10mm 15mm 10mm 15mm !important;
            }
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              background-color: #ffffff !important;
              height: auto !important;
              min-height: auto !important;
            }
            #printed-contract-sheet {
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
              border: none !important;
              box-shadow: none !important;
              background-color: #ffffff !important;
              font-size: 10px !important;
              line-height: 1.35 !important;
            }
            .border-\[5px\] {
              border-width: 3px !important;
              padding: 12px 15px !important;
              min-height: auto !important;
            }
            .grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 8px !important;
            }
            .min-h-\[145px\] {
              min-height: 110px !important;
            }
            #contract-header {
              padding-bottom: 3px !important;
              margin-bottom: 4px !important;
            }
            .mb-3 {
              margin-bottom: 4px !important;
            }
            .my-1\\.5 {
              margin-top: 3px !important;
              margin-bottom: 3px !important;
            }
            .py-1 {
              padding-top: 1px !important;
              padding-bottom: 1px !important;
            }
            p, span, li, td {
              line-height: 1.35 !important;
            }
            .signature-section {
              page-break-inside: avoid !important;
            }
          }
        ` }} />

        {/* Real Ink SVG Filters Defs */}
        <svg className="absolute w-0 h-0 pointer-events-none select-none invisible" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Stamp ink filter: porous irregular bleed */}
            <filter id="real-stamp-ink" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="3" result="porous-noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.2 -0.8" in="porous-noise" result="stamp-pores" />
              <feComposite operator="out" in="SourceGraphic" in2="stamp-pores" result="textured-ink" />
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="edge-noise" />
              <feDisplacementMap in="textured-ink" in2="edge-noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="stamp-edges" />
              <feGaussianBlur in="stamp-edges" stdDeviation="0.4" result="final-stamp" />
            </filter>
            {/* Hand signature ink filter: flowing fountain/ballpoint absorption */}
            <filter id="real-signature-ink" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" result="paper-bleed" />
              <feDisplacementMap in="SourceGraphic" in2="paper-bleed" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="signature-edges" />
              <feGaussianBlur in="signature-edges" stdDeviation="0.2" result="final-sig" />
            </filter>
          </defs>
        </svg>
        
        {/* Outer Official Double-Border Layout similar to professional high-value notary contracts */}
        <div 
          className={`border-[5px] border-double border-slate-900 p-5 sm:p-8 min-h-[1100px] relative flex flex-col justify-between transition-colors duration-200 ${exportMode === 'editable' ? 'bg-amber-50/5' : ''}`}
          contentEditable={exportMode === 'editable'}
          suppressContentEditableWarning={true}
        >
          
          {/* 1. WATERMARK - Centered scales of justice background */}
          <div 
            id="justice-watermark-overlay"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 background-watermark"
            style={{ opacity: styling.watermarkOpacity }}
          >
            <div className="w-[480px] h-[480px] text-amber-600/24 flex items-center justify-center">
              <ScalesOfJusticeVector color="currentColor" />
            </div>
          </div>

          {/* 2. THREE-COLUMN HEADER WITH SYMMETRICAL SCALES OF JUSTICE */}
          <div id="contract-header" className="relative z-10 grid grid-cols-[10%_1fr_10%] sm:grid-cols-[60px_1fr_60px] md:grid-cols-[70px_1fr_70px] gap-2 items-center pb-2 mb-2 border-b border-slate-100">
            
            {/* Left Column: Scales of Justice */}
            <div className="flex items-center justify-start select-none">
              <svg 
                className="w-11 h-11 sm:w-14 sm:h-14 text-slate-800 drop-shadow-sm" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Base stand / Pillar */}
                <path d="M32 82H68" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M38 77H62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="26" x2="50" y2="77" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                
                {/* Horizontal Beam */}
                <line x1="18" y1="32" x2="82" y2="32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="50" cy="32" r="4" fill="currentColor" />
                
                {/* Left Pan */}
                <line x1="18" y1="32" x2="10" y2="58" stroke="currentColor" strokeWidth="1" />
                <line x1="18" y1="32" x2="26" y2="58" stroke="currentColor" strokeWidth="1" />
                <path d="M8 58H28C28 65 8 65 8 58Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                
                {/* Right Pan */}
                <line x1="82" y1="32" x2="74" y2="58" stroke="currentColor" strokeWidth="1" />
                <line x1="82" y1="32" x2="90" y2="58" stroke="currentColor" strokeWidth="1" />
                <path d="M72 58H92C92 65 72 65 72 58Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Middle Column: Centered Header Group (Official agency identities) */}
            <div className="flex flex-col space-y-0.5 text-center px-1">
              <span className="text-[9.5px] text-blue-700 font-extrabold font-serif tracking-normal leading-tight uppercase">{t.headerUnion}</span>
              <span className="text-[9.5px] text-red-600 font-extrabold font-sans tracking-tight leading-tight uppercase">{t.headerBanking}</span>
              <span className="text-[7.5px] text-emerald-850 font-bold font-serif leading-tight uppercase tracking-tight">{t.headerBar}</span>
              <span className="text-[6.5px] text-stone-500 font-mono font-bold tracking-tighter uppercase underline decoration-stone-300">
                {t.headerCabinet}
              </span>
            </div>

            {/* Right Column: Symmetrical Scales of Justice */}
            <div className="flex items-center justify-end select-none">
              <svg 
                className="w-11 h-11 sm:w-14 sm:h-14 text-slate-800 drop-shadow-sm" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Base stand / Pillar */}
                <path d="M32 82H68" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M38 77H62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="26" x2="50" y2="77" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                
                {/* Horizontal Beam */}
                <line x1="18" y1="32" x2="82" y2="32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="50" cy="32" r="4" fill="currentColor" />
                
                {/* Left Pan */}
                <line x1="18" y1="32" x2="10" y2="58" stroke="currentColor" strokeWidth="1" />
                <line x1="18" y1="32" x2="26" y2="58" stroke="currentColor" strokeWidth="1" />
                <path d="M8 58H28C28 65 8 65 8 58Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                
                {/* Right Pan */}
                <line x1="82" y1="32" x2="74" y2="58" stroke="currentColor" strokeWidth="1" />
                <line x1="82" y1="32" x2="90" y2="58" stroke="currentColor" strokeWidth="1" />
                <path d="M72 58H92C92 65 72 65 72 58Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

          </div>

          {/* 3. ASTERISKS GROUP */}
          <div className="relative z-10 w-full text-center text-[7.5px] tracking-[0.15em] text-slate-400 select-none font-mono my-1 leading-none">
            ************************************************************************************************************************************
          </div>

          {/* DYNAMIC LOCK / EDIT STATUS INDICATOR (PRINT HIDDEN) */}
          <div className="relative z-20 mx-auto my-1 select-none print:hidden flex justify-center">
            {exportMode === 'official' ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-500/10 border border-amber-600/30 text-amber-700 text-[8px] rounded-full font-sans font-bold tracking-wider uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                🔒 Acte Officiel Certifié Figé (Non Modifiable)
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[8px] rounded-full font-sans font-extrabold tracking-wider uppercase animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                ✍️ Mode Édition Libre (Touchez un texte pour le modifier en direct)
              </div>
            )}
          </div>

          {/* 4. CONTRATTO DI PRESTITO / CONTRACT TITLE */}
          <div className="relative z-10 text-center py-1 select-none">
            <h1 className="text-xl sm:text-2xl font-black tracking-[0.15em] text-slate-800 font-serif leading-none uppercase">
              {customContractTitle}
            </h1>
          </div>

          <div className="relative z-10 w-full text-center text-[7.5px] tracking-[0.15em] text-slate-400 select-none font-mono mb-3 leading-none">
            ************************************************************************************************************************************
          </div>

          {/* 5. INITIAL STATEMENT */}
          <div id="contract-intro-statement" className="relative z-10 text-left text-[10px] text-slate-800 mb-3 bg-white/40 leading-relaxed">
            <p>
              {customIntroText}
            </p>
            <ul className="mt-2 space-y-1 pl-2">
              <li className="flex items-start">
                <span className="mr-1.5 font-bold text-blue-700">•</span>
                <span className="leading-normal text-slate-700">
                  {customLenderRole}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 font-bold text-emerald-800">•</span>
                <span className="leading-normal text-slate-700">
                  {customBorrowerRole}
                </span>
              </li>
            </ul>
          </div>

          {/* PREAMBLE */}
          <div className="relative z-10 mb-3 text-[10px]">
            <h3 className="font-extrabold text-[#b31412] uppercase tracking-wide border-b border-[#b31412] pb-0.5 mb-1.5 text-left inline-block">
              • {customPreambleTitle}
            </h3>
            <div className="space-y-1 text-slate-700 pl-1">
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{customPreambleClause1}</span>
              </p>
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{customPreambleClause2}</span>
              </p>
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{customPreambleClause3}</span>
              </p>
              <div className="text-center font-bold text-slate-800 uppercase text-[9px] mt-2 select-none tracking-widest">
                {customPartiesAgree}
              </div>
            </div>
          </div>

          <div id="contract-clauses" className="relative z-10 space-y-2.5 text-[9.5px] text-slate-850 text-justify">
            {selectedDoc === 'main_contract' ? (
              <>
                {contractType === 'personal_loan' ? (
                  <>
                    {/* ARTICLE 1 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art1Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art1Content(formatMoney(totalRepayable), loan.durationMonths)}
                      </p>
                    </div>

                    {/* PARAMETRIC TABLE IN BLUE HIGHLIGHTS */}
                    <div className="py-1 my-1.5 border-y border-stone-200">
                      <h5 className="font-extrabold text-center text-[#b31412] uppercase tracking-widest text-[8.5px] mb-1">
                        • {t.paramTitle}
                      </h5>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-slate-800 font-medium pl-6">
                        <div>
                          <span className="text-slate-600">{t.paramLoan}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(loan.amount)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramTotal}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(totalRepayable)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramRate}</span> <strong className="text-blue-700 font-extrabold">{loan.interestRate}%</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramInstallment}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(installmentPayment)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramInterest}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(totalInterest)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramDuration}</span> <strong className="text-blue-700 font-extrabold">{loan.durationMonths} mesi</strong>
                        </div>
                      </div>
                    </div>

                    {/* ARTICLE 2 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art2Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art2Content(loan.durationMonths, formatMoney(installmentPayment), loan.firstRepaymentDate ? new Date(loan.firstRepaymentDate).getDate().toString().padStart(2, '0') : "05")}
                      </p>
                    </div>

                    {/* ARTICLE 3 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art3Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art3Content}
                      </p>
                    </div>

                    {/* ARTICLE 4 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art4Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art4Content}
                      </p>
                    </div>

                    {/* ARTICLE 5 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art5Title}
                      </h4>
                      <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                        {t.art5Content(formatMoney(loan.feeAmount), formatMoney(loan.amount))}
                      </p>
                    </div>

                    {/* ARTICLE 6 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art6Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art6Content}
                      </p>
                    </div>

                    {/* ARTICLE 7 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {t.art7Title}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {t.art7Content}
                      </p>
                    </div>
                  </>
                ) : isDonation ? (
                  <>
                    {/* DONATION SPECIFIC LAYOUT */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt1Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt1Content', { '[AMOUNT]': formatMoney(loan.amount) })}
                      </p>
                    </div>

                    {/* DONATION PARAMETRIC TABLE */}
                    <div className="py-1 my-1.5 border-y border-stone-200">
                      <h5 className="font-extrabold text-center text-[#b31412] uppercase tracking-widest text-[8.5px] mb-1">
                        • {getDonationArt('donationSummaryTitle')}
                      </h5>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-slate-800 font-medium pl-6">
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelAmount')}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(loan.amount)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelRepayment')}</span> <strong className="text-emerald-700 font-extrabold">{getDonationArt('donationValueRepayment')}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelInterest')}</span> <strong className="text-blue-700 font-extrabold">{getDonationArt('donationValueInterest')}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelFee')}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(loan.feeAmount)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelFrequency')}</span> <strong className="text-blue-700 font-extrabold">{getDonationArt('donationValueFrequency')}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{getDonationArt('donationLabelDeedStatus')}</span> <strong className="text-blue-700 font-extrabold">{getDonationArt('donationValueDeedStatus')}</strong>
                        </div>
                      </div>
                    </div>

                    {/* ARTICLE 2 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt2Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt2Content')}
                      </p>
                    </div>

                    {/* ARTICLE 3 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt3Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt3Content')}
                      </p>
                    </div>

                    {/* ARTICLE 4 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt4Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt4Content')}
                      </p>
                    </div>

                    {/* ARTICLE 5 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt5Title')}
                      </h4>
                      <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                        {getDonationArt('donationArt5Content', { '[FEE]': formatMoney(loan.feeAmount) })}
                      </p>
                    </div>

                    {/* ARTICLE 6 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt6Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt6Content')}
                      </p>
                    </div>

                    {/* ARTICLE 7 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getDonationArt('donationArt7Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getDonationArt('donationArt7Content')}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* B2B / MIXED GENERAL COMPLIANT LAYOUT */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt1Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt1Content', { '[TOTAL]': formatMoney(totalRepayable), '[AMOUNT]': formatMoney(loan.amount) })}
                      </p>
                    </div>

                    {/* PARAMETRIC TABLE */}
                    <div className="py-1 my-1.5 border-y border-stone-200">
                      <h5 className="font-extrabold text-center text-[#b31412] uppercase tracking-widest text-[8.5px] mb-1">
                        • {t.paramTitle}
                      </h5>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-slate-800 font-medium pl-6">
                        <div>
                          <span className="text-slate-600">{t.paramLoan}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(loan.amount)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramTotal}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(totalRepayable)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramRate}</span> <strong className="text-blue-700 font-extrabold">{loan.interestRate}%</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramInstallment}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(installmentPayment)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramInterest}</span> <strong className="text-blue-700 font-extrabold">{formatMoney(totalInterest)}</strong>
                        </div>
                        <div>
                          <span className="text-slate-600">{t.paramDuration}</span> <strong className="text-blue-700 font-extrabold">{loan.durationMonths} mesi</strong>
                        </div>
                      </div>
                    </div>

                    {/* ARTICLE 2 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt2Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt2Content', { '[DURATION]': loan.durationMonths, '[INSTALLMENT]': formatMoney(installmentPayment) })}
                      </p>
                    </div>

                    {/* ARTICLE 3 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt3Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt3Content')}
                      </p>
                    </div>

                    {/* ARTICLE 4 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt4Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt4Content')}
                      </p>
                    </div>

                    {/* ARTICLE 5 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt5Title')}
                      </h4>
                      <p className="leading-relaxed font-semibold italic text-slate-900 bg-amber-50/15 p-1.5 border border-amber-300/30 rounded-xs">
                        {getB2BMixedArt('b2bMixedArt5Content', { '[FEE]': formatMoney(loan.feeAmount) })}
                      </p>
                    </div>

                    {/* ARTICLE 6 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt6Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt6Content', { '[RATE]': loan.penaltyRate, '[FEE_FIXED]': formatMoney(loan.penaltyFixedAmount) })}
                      </p>
                    </div>

                    {/* ARTICLE 7 */}
                    <div>
                      <h4 className="font-extrabold text-[#b31412] uppercase tracking-wide mb-0.5 text-left border-b border-stone-200 pb-0.5">
                        {getB2BMixedArt('b2bMixedArt7Title')}
                      </h4>
                      <p className="leading-relaxed text-slate-700">
                        {getB2BMixedArt('b2bMixedArt7Content')}
                      </p>
                    </div>
                  </>
                )}

                {/* CLOSING REMARKS */}
                <p className="leading-normal font-sans italic text-slate-500 mt-2">
                  {customClosingRemarks}
                </p>
              </>
            ) : (
              renderSelectedDocContent()
            )}
          </div>

          {/* 7. SECURE SIGNATURE CARD SEGMENTS - HIGH DEF SHIELD TO PREVENT OVERFLOW */}
          <div className="border-t border-slate-350 pt-3 mt-4 relative">
            
            {/* Boxed Modular Grid - prevents overlapping completely by locking each in their card boundaries */}
            <div className="grid grid-cols-3 gap-4 text-center text-[10px] leading-tight select-none mt-2 font-mono">
              
              {/* Left Side Column: MUTUATARIO / EMPRUNTEUR */}
              <div 
                onClick={() => onOpenSignature('borrower')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/5 cursor-pointer bg-slate-50/30 rounded-sm p-2 text-center h-full overflow-visible shadow-2xs transition-all"
                title="Cliquez ici pour signer numériquement"
              >
                <div>
                  <span className="font-[450] text-[#b31412] text-[7.5px] uppercase block leading-none mb-1">{customLabelBorrower}</span>
                  <span className="font-black text-slate-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{borrower.name.toUpperCase()}</span>
                </div>
                
                {/* Visual indicator of manual signature space */}
                <div className="h-16 flex flex-col items-center justify-center relative bg-white/50 rounded-sm border border-dashed border-stone-200/60 my-1">
                  {borrower.signatureDrawData ? (
                    <img 
                      src={borrower.signatureDrawData} 
                      alt="Signature Emprunteur" 
                      className="max-h-14 max-w-full object-contain pointer-events-none select-none z-10"
                      style={{ filter: "url(#real-signature-ink)" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                </div>


              </div>

              {/* Middle Side Column: PRESTATORE / PRÊTEUR (CREDIVITE) */}
              <div 
                onClick={() => onOpenSignature('lender')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-blue-600 hover:bg-blue-50/5 cursor-pointer bg-blue-50/10 rounded-sm p-2 text-center h-full overflow-visible shadow-2xs transition-all"
                title="Cliquez ici pour signer"
              >
                <div>
                  <span className="font-[450] text-blue-800 text-[7.5px] uppercase block leading-none mb-1">{customLabelLender}</span>
                  <span className="font-black text-blue-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{lender.name.toUpperCase()}</span>
                </div>
                
                {/* Beautiful dynamic cursive signature of the Prestatore overlapping with the company stamp */}
                <div className="h-16 w-full flex items-center justify-center relative">
                  {/* Signature */}
                  {lender.signatureDrawData ? (
                    <img 
                      src={lender.signatureDrawData} 
                      alt="Signature Prêteur" 
                      className="max-h-14 max-w-full object-contain pointer-events-none select-none z-10"
                      style={{ filter: "url(#real-signature-ink)" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : null}

                  {/* Rubber seal / Blue stamp */}
                  <div className="absolute rotate-[-6deg] z-20 opacity-85 scale-[0.62] transform origin-center" style={{ filter: "url(#real-stamp-ink)" }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-blue-800 font-bold font-mono">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2, 1.5" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                      
                      <path id="lender-stamp-text-upper" d="M 16,50 A 34,34 0 1,1 84,50" fill="none" />
                      <text fontSize="5.2" fontWeight="bold" fill="currentColor">
                        <textPath href="#lender-stamp-text-upper" startOffset="50%" textAnchor="middle">
                          ★ {isDonation ? (lender.name.substring(0, 14).toUpperCase() || "DONATEUR") : isB2B ? (lender.name.substring(0, 14).toUpperCase() || "SOCIETE") : "CREDIVITE S.A."} ★
                        </textPath>
                      </text>
                      
                      <path id="lender-stamp-text-lower" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                      <text fontSize="4.5" fontWeight="bold" fill="currentColor">
                        <textPath href="#lender-stamp-text-lower" startOffset="50%" textAnchor="middle">
                          {isDonation ? (languageCode === 'FR' ? "DONATION ENREGISTRÉE" : languageCode === 'IT' ? "DONAZIONE REGISTRATA" : "SECURED DONATION DEED") : (languageCode === 'FR' ? "CONTRÔLE ADMINISTRATIF" : languageCode === 'IT' ? "CONTROLLO AMMINISTRATIVO" : "DIRECTORATE SECURED LOAN")}
                        </textPath>
                      </text>
                      
                      <text x="50" y="47" fontSize="4.2" textAnchor="middle" fill="currentColor">{languageCode === 'FR' ? "OFFICIEL" : languageCode === 'IT' ? "UFFICIALE" : "OFFICIAL"}</text>
                      <text x="50" y="58" fontSize="5.2" fontWeight="black" textAnchor="middle" fill="currentColor">{isDonation ? (languageCode === 'FR' ? "DONNÉ" : languageCode === 'IT' ? "DONATO" : "GIFTED") : (languageCode === 'FR' ? "AGRÉÉ" : languageCode === 'IT' ? "APPROVATO" : "APPROVED")}</text>
                    </svg>
                  </div>
                </div>


              </div>

              {/* Right Side Column: NOTAIO / NOTAIRE (RED STAMP & CERTIFICATION) */}
              <div 
                onClick={() => onOpenSignature('notary')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-red-650 hover:bg-red-50/5 cursor-pointer bg-red-50/10 rounded-sm p-2 text-center h-full overflow-visible shadow-2xs transition-all"
                title="Cliquez ici pour signer"
              >
                <div>
                  <span className="font-[450] text-[#133c87] text-[7.5px] uppercase block leading-none mb-1">Notaire</span>
                  <span className="font-black text-slate-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{notary.name.toUpperCase()}</span>
                </div>
                
                {/* Beautiful dynamic cursive signature of the Notary overlapping with the red seal */}
                <div className="h-16 w-full flex items-center justify-center relative">
                  {/* Signature */}
                  {notary.signatureDrawData ? (
                    <img 
                      src={notary.signatureDrawData} 
                      alt="Signature Notaire" 
                      className="max-h-14 max-w-full object-contain pointer-events-none select-none z-10"
                      style={{ filter: "url(#real-signature-ink)" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : null}

                  {/*
                    <svg className="w-[115px] h-10 text-[#133c87] absolute z-10" style={{ filter: "url(#real-signature-ink)" }} viewBox="0 0 140 50" fill="none">
                      <path d="M12,18 C30,35 60,5 75,32 Q105,4 125,18 M20,38 L120,12" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
                      <circle cx="45" cy="22" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  */}

                  {/* Official Notary Round Red Stamp */}
                  {styling.showStamp && (
                    <div className="absolute -right-7 -bottom-9 z-35 scale-[0.68] sm:scale-[0.75] md:scale-[0.80] pointer-events-none select-none transform origin-center">
                      <NotaryOfficialStamp 
                        notaryName={notary.name}
                        city={loan.city}
                        country={loan.country}
                        colorClass={styling.stampColor}
                        rotateAngle={styling.stampRotation}
                        customStyle={{
                          position: 'relative',
                          zIndex: 40,
                          filter: 'url(#real-stamp-ink)',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="absolute rotate-[8deg] z-20 opacity-85 scale-[0.62] transform origin-center" style={{ filter: "url(#real-stamp-ink)" }}>
                    <svg width="105" height="105" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-red-700 font-bold font-mono">
                      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5, 1" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      
                      <path id="notary-stamp-text-upper2" d="M 16,50 A 34,34 0 1,1 84,50" fill="none" />
                      <text fontSize="5" fontWeight="extrabold" fill="currentColor">
                        <textPath href="#notary-stamp-text-upper2" startOffset="50%" textAnchor="middle">
                          {`* ETUDE DE ME ${notary.name.toUpperCase()} *`}
                        </textPath>
                      </text>
                      
                      <path id="notary-stamp-text-lower2" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                      <text fontSize="4.5" fontWeight="bold" fill="currentColor">
                        <textPath href="#notary-stamp-text-lower2" startOffset="50%" textAnchor="middle">
                          {`${loan.city.toUpperCase()} (${loan.country.toUpperCase()})`}
                        </textPath>
                      </text>
                      
                      <text x="50" y="47" fontSize="4.2" fontStyle="italic" textAnchor="middle" fill="currentColor">{languageCode === 'FR' ? "HOMOLOGUÉ" : languageCode === 'IT' ? "OMOLOGATO" : "COMMISSIONED"}</text>
                      <text x="50" y="58" fontSize="5.2" fontWeight="bold" textAnchor="middle" fill="currentColor">{languageCode === 'FR' ? "SCEAU CIVIL" : languageCode === 'IT' ? "SIGILLO CIVILE" : "STATE SEAL"}</text>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ABSOLUTE NOTARY OFFICIAL STAMP DEACTIVATED HERE (MOVED INTERNALLY IN THE SIGNATURE CELL) */}
      </div>
    </div>
  );
}
