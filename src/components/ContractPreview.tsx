/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PartyDetails, LoanDetails, StylingDetails } from '../types';
import { Award, ShieldCheck, Scale, Landmark, Calendar, Percent, AlertOctagon, Mail, Phone, Briefcase } from 'lucide-react';

interface ContractPreviewProps {
  lender: PartyDetails;
  borrower: PartyDetails;
  notary: PartyDetails;
  loan: LoanDetails;
  styling: StylingDetails;
  onOpenSignature: (party: 'lender' | 'borrower' | 'notary') => void;
  fontFamily: string;
  exportMode?: 'editable' | 'official';
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

export function NotaryOfficialStamp({ notaryName, city, country, colorClass, rotateAngle }: {
  notaryName: string;
  city: string;
  country: string;
  colorClass: string;
  rotateAngle: number;
}) {
  const colorHex = 
    colorClass === 'text-blue-700' ? '#1d4ed8' :
    colorClass === 'text-red-700' ? '#b91c1c' :
    colorClass === 'text-emerald-700' ? '#047857' : '#1e293b';

  return (
    <div 
      id="notary-notarial-stamp"
      className="absolute select-none pointer-events-none transition-transform duration-300 print:opacity-95"
      style={{ 
        transform: `rotate(${rotateAngle}deg) scale(0.88)`,
        right: '4%',
        bottom: '3%',
        zIndex: 40,
        filter: 'url(#real-stamp-ink)'
      }}
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
    contractTitle: "CONTRATTO DI PRESTITO",
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
}: ContractPreviewProps) {
  
  // Resolve active language cleanly
  const languageCode = (styling.language === 'BOTH' ? 'FR' : styling.language) as 'FR' | 'IT' | 'EN' | 'ES' | 'DE' | 'PT' | 'NL' | 'PL' | 'RO';
  const t = translations[languageCode];

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
    const locale = getLocale(languageCode);
    return `${val.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${loan.currency}`;
  };

  const fontStyleClass = 
    fontFamily === 'serif' ? 'font-serif' :
    fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const signatureDateFormatted = loan.dateSigned 
    ? new Date(loan.dateSigned).toLocaleDateString(getLocale(languageCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getDefaultDate(languageCode);

  const firstDateFormatted = loan.firstRepaymentDate
    ? new Date(loan.firstRepaymentDate).toLocaleDateString(getLocale(languageCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getUnspecifiedDate(languageCode);

  const finalDateFormatted = loan.finalRepaymentDate
    ? new Date(loan.finalRepaymentDate).toLocaleDateString(getLocale(languageCode), { day: 'numeric', month: 'long', year: 'numeric' })
    : getUnspecifiedDate(languageCode);

  return (
    <div id="contract-paper-a4-viewport" className="p-1 sm:p-4 bg-slate-100 flex justify-center overflow-x-auto w-full print:overflow-visible print:p-0 print:bg-white select-text">
      {/* Interactive print wrapper */}
      <div 
        id="printed-contract-sheet"
        className={`w-full max-w-[800px] bg-white text-slate-900 shadow-2xl rounded-sm p-4 sm:p-6 relative overflow-hidden transition-all duration-300 print:shadow-none print:p-0 print:m-0 ${fontStyleClass}`}
        style={{ fontSize: '11px', lineHeight: '1.4' }}
      >
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
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            style={{ opacity: styling.watermarkOpacity }}
          >
            <div className="w-[480px] h-[480px] text-amber-600/50 flex items-center justify-center">
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
              {t.contractTitle}
            </h1>
          </div>

          <div className="relative z-10 w-full text-center text-[7.5px] tracking-[0.15em] text-slate-400 select-none font-mono mb-3 leading-none">
            ************************************************************************************************************************************
          </div>

          {/* 5. INITIAL STATEMENT */}
          <div id="contract-intro-statement" className="relative z-10 text-left text-[10px] text-slate-800 mb-3 bg-white/40 leading-relaxed">
            <p>
              {t.introText(signatureDateFormatted)}
            </p>
            <ul className="mt-2 space-y-1 pl-2">
              <li className="flex items-start">
                <span className="mr-1.5 font-bold text-blue-700">•</span>
                <span className="leading-normal text-slate-700">
                  {t.lenderRole(lender.name, lender.address || `${loan.city} (${loan.country})`)}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 font-bold text-emerald-800">•</span>
                <span className="leading-normal text-slate-700">
                  {t.borrowerRole(borrower.name, borrower.address || `${loan.city} (${loan.country})`)}
                </span>
              </li>
            </ul>
          </div>

          {/* PREAMBLE */}
          <div className="relative z-10 mb-3 text-[10px]">
            <h3 className="font-extrabold text-[#b31412] uppercase tracking-wide border-b border-[#b31412] pb-0.5 mb-1.5 text-left inline-block">
              • {t.preambleTitle}
            </h3>
            <div className="space-y-1 text-slate-700 pl-1">
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{t.preambleClause1(formatMoney(loan.amount), loan.durationMonths, loan.interestRate)}</span>
              </p>
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{t.preambleClause2}</span>
              </p>
              <p className="flex items-start leading-normal">
                <span className="mr-2 text-[#b31412] font-mono">-</span>
                <span>{t.preambleClause3}</span>
              </p>
              <div className="text-center font-bold text-slate-800 uppercase text-[9px] mt-2 select-none tracking-widest">
                {t.partiesAgree}
              </div>
            </div>
          </div>

          {/* 6. ARTICLES */}
          <div id="contract-clauses" className="relative z-10 space-y-2.5 text-[9.5px] text-slate-850 text-justify">
            
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

            {/* CLOSING REMARKS */}
            <p className="leading-normal font-sans italic text-slate-500 mt-2">
              {t.closingRemarks}
            </p>

          </div>

          {/* 7. SECURE SIGNATURE CARD SEGMENTS - HIGH DEF SHIELD TO PREVENT OVERFLOW */}
          <div className="border-t border-slate-350 pt-3 mt-4 relative">
            
            {/* Boxed Modular Grid - prevents overlapping completely by locking each in their card boundaries */}
            <div className="grid grid-cols-3 gap-4 text-center text-[10px] leading-tight select-none mt-2">
              
              {/* Left Side Column: MUTUATARIO / EMPRUNTEUR */}
              <div 
                onClick={() => onOpenSignature('borrower')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/5 cursor-pointer bg-slate-50/30 rounded-sm p-2 text-center h-full overflow-hidden shadow-2xs transition-all"
                title="Cliquez ici pour signer numériquement"
              >
                <span className="font-black text-slate-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{borrower.name.toUpperCase()}</span>
                
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
                  ) : borrower.signatureType === 'text' && borrower.name ? (
                    <span 
                      className={`text-sm text-emerald-800 font-bold select-none cursor-pointer ${borrower.fontStyle || 'font-signature1'}`}
                      style={{ filter: "url(#real-signature-ink)" }}
                    >
                      {borrower.name}
                    </span>
                  ) : (
                    <div className="w-20 border-b border-dashed border-stone-300 absolute bottom-3"></div>
                  )}
                </div>
              </div>

              {/* Middle Side Column: PRESTATORE / PRÊTEUR (CREDIVITE) */}
              <div 
                onClick={() => onOpenSignature('lender')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-blue-600 hover:bg-blue-50/5 cursor-pointer bg-blue-50/10 rounded-sm p-2 text-center h-full overflow-hidden shadow-2xs transition-all"
                title="Cliquez ici pour signer"
              >
                <span className="font-black text-blue-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{lender.name.toUpperCase()}</span>
                
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
                  ) : lender.signatureType === 'text' && lender.name ? (
                    <span 
                      className={`text-sm text-blue-800 font-bold select-none cursor-pointer z-10 ${lender.fontStyle || 'font-signature2'}`}
                      style={{ filter: "url(#real-signature-ink)" }}
                    >
                      {lender.name}
                    </span>
                  ) : (
                    <svg className="w-[110px] h-10 text-blue-850 absolute z-10 opacity-90" style={{ filter: "url(#real-signature-ink)" }} viewBox="0 0 140 50" fill="none">
                      <path d="M10,25 Q35,8 45,32 Q75,4 95,28 T130,12 M35,22 L115,26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15,15 Q65,42 125,20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  )}

                  {/* Rubber seal / Blue stamp */}
                  <div className="absolute rotate-[-6deg] z-20 opacity-85 scale-[0.62] transform origin-center" style={{ filter: "url(#real-stamp-ink)" }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-blue-800 font-bold font-mono">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2, 1.5" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                      
                      <path id="lender-stamp-text-upper" d="M 16,50 A 34,34 0 1,1 84,50" fill="none" />
                      <text fontSize="5.2" fontWeight="bold" fill="currentColor">
                        <textPath href="#lender-stamp-text-upper" startOffset="50%" textAnchor="middle">
                          ★ CREDIVITE S.A. ★
                        </textPath>
                      </text>
                      
                      <path id="lender-stamp-text-lower" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                      <text fontSize="4.5" fontWeight="bold" fill="currentColor">
                        <textPath href="#lender-stamp-text-lower" startOffset="50%" textAnchor="middle">
                          {languageCode === 'FR' ? "CONTRÔLE ADMINISTRATIF" : languageCode === 'IT' ? "CONTROLLO AMMINISTRATIVO" : "DIRECTORATE SECURED LOAN"}
                        </textPath>
                      </text>
                      
                      <text x="50" y="47" fontSize="4.2" textAnchor="middle" fill="currentColor">{languageCode === 'FR' ? "OFFICIEL" : languageCode === 'IT' ? "UFFICIALE" : "OFFICIAL"}</text>
                      <text x="50" y="58" fontSize="5.2" fontWeight="black" textAnchor="middle" fill="currentColor">{languageCode === 'FR' ? "AGRÉÉ" : languageCode === 'IT' ? "APPROVATO" : "APPROVED"}</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side Column: NOTAIO / NOTAIRE (RED STAMP & CERTIFICATION) */}
              <div 
                onClick={() => onOpenSignature('notary')}
                className="flex flex-col justify-between min-h-[145px] relative border border-slate-200 hover:border-red-650 hover:bg-red-50/5 cursor-pointer bg-red-50/10 rounded-sm p-2 text-center h-full overflow-hidden shadow-2xs transition-all"
                title="Cliquez ici pour signer"
              >
                <span className="font-black text-slate-900 tracking-wider block uppercase text-[8.5px] border-b border-slate-200 pb-1 mb-1">{notary.name.toUpperCase()}</span>
                
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
                  ) : notary.signatureType === 'text' && notary.name ? (
                    <span 
                      className={`text-sm text-[#133c87] font-bold select-none cursor-pointer z-10 ${notary.fontStyle || 'font-signature3'}`}
                      style={{ filter: "url(#real-signature-ink)" }}
                    >
                      {notary.name}
                    </span>
                  ) : (
                    <svg className="w-[115px] h-10 text-[#133c87] absolute z-10" style={{ filter: "url(#real-signature-ink)" }} viewBox="0 0 140 50" fill="none">
                      <path d="M12,18 C30,35 60,5 75,32 Q105,4 125,18 M20,38 L120,12" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
                      <circle cx="45" cy="22" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  )}

                  {/* Official Notary Round Red Stamp */}
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

        {/* ABSOLUTE NOTARY OFFICIAL STAMP OVERLAP IF TOGGLED */}
        {styling.showStamp && (
          <NotaryOfficialStamp 
            notaryName={notary.name}
            city={loan.city}
            country={loan.country}
            colorClass={styling.stampColor}
            rotateAngle={styling.stampRotation}
          />
        )}
      </div>
    </div>
  );
}
