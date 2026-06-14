/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PartyDetails, LoanDetails, StylingDetails } from '../types';
import { 
  FileText, 
  HelpCircle, 
  RefreshCw, 
  Coins, 
  LayoutTemplate, 
  Stamp, 
  Settings, 
  FileDown, 
  Printer, 
  Sparkles,
  Info
} from 'lucide-react';

interface EditorSidebarProps {
  lender: PartyDetails;
  setLender: React.Dispatch<React.SetStateAction<PartyDetails>>;
  borrower: PartyDetails;
  setBorrower: React.Dispatch<React.SetStateAction<PartyDetails>>;
  notary: PartyDetails;
  setNotary: React.Dispatch<React.SetStateAction<PartyDetails>>;
  loan: LoanDetails;
  setLoan: React.Dispatch<React.SetStateAction<LoanDetails>>;
  styling: StylingDetails;
  setStyling: React.Dispatch<React.SetStateAction<StylingDetails>>;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  onDownloadWord: () => void;
  onPrintPDF: () => void;
  onTriggerPreset: (presetName: string) => void;
  onTriggerAITranslation: (targetLang: string) => Promise<void>;
  isTranslating: boolean;
}

export function EditorSidebar({
  lender,
  setLender,
  borrower,
  setBorrower,
  notary,
  setNotary,
  loan,
  setLoan,
  styling,
  setStyling,
  fontFamily,
  setFontFamily,
  onDownloadWord,
  onPrintPDF,
  onTriggerPreset,
  onTriggerAITranslation,
  isTranslating,
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<'parties' | 'financial' | 'design' | 'presets'>('parties');
  const [selectedLangOption, setSelectedLangOption] = useState<string>('');
  const [customLangInput, setCustomLangInput] = useState<string>('');

  // Interactive local states or direct bindings to inputs
  const handleLenderChange = (key: keyof PartyDetails, value: string) => {
    setLender(prev => ({ ...prev, [key]: value }));
  };

  const handleBorrowerChange = (key: keyof PartyDetails, value: string) => {
    setBorrower(prev => ({ ...prev, [key]: value }));
  };

  const handleNotaryChange = (key: keyof PartyDetails, value: string) => {
    setNotary(prev => ({ ...prev, [key]: value }));
  };

  const handleLoanChange = (key: keyof LoanDetails, value: string | number) => {
    setLoan(prev => ({ ...prev, [key]: value }));
  };

  const handleStylingChange = (key: keyof StylingDetails, value: string | number | boolean) => {
    setStyling(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div id="editor-control-sidebar" className="bg-slate-900 text-slate-100 flex flex-col h-full overflow-y-auto border-r border-slate-800">
      
      {/* 1. Header & Title */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg shadow-md">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide text-white">Éditeur Notarial</h2>
            <p className="text-[10px] text-slate-400">Contrat de Prêt Éditable</p>
          </div>
        </div>
        
        <button 
          id="btn-help-guide"
          title="Consignes d'utilisation"
          className="text-slate-400 hover:text-white transition-colors"
          onClick={() => alert("Bienvenue sur le Générateur de Contrat Notarié.\n\n" +
            "1. Modifiez les informations financières ou d'identité dans la barre latérale.\n" +
            "2. Ajustez l'esthétique du modèle (drapeaux d'en-tête, filigranes, sceau).\n" +
            "3. Dessinez ou modifiez les signatures en cliquant directement dessus sur le document.\n" +
            "4. Cliquez sur 'Imprimer l'Acte / PDF' pour sauvegarder une copie PDF officielle et officielle.\n" +
            "5. Cliquez sur 'Exporter en Word' pour télécharger une version modifiable dans MS Word.")}
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Quick Action Toolbar */}
      <div className="px-5 py-3.5 bg-slate-950 flex gap-2 border-b border-slate-800">
        <button
          id="btn-print-pdf-header"
          onClick={onPrintPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-all"
        >
          <Printer className="h-3.5 w-3.5" />
          Imprimer l'Acte / PDF
        </button>
        <button
          id="btn-export-word-header"
          onClick={onDownloadWord}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-500 font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-all border border-slate-700"
        >
          <FileDown className="h-3.5 w-3.5 animate-bounce-subtle" />
          Exporter en Word
        </button>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-950 text-xs">
        <button
          id="tab-btn-parties"
          onClick={() => setActiveTab('parties')}
          className={`py-3 text-center font-medium border-b-2 transition-colors ${activeTab === 'parties' ? 'border-amber-500 text-amber-500 bg-slate-900' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <div className="flex flex-col items-center gap-1">
            <FileText className="h-4 w-4" />
            PARTIES
          </div>
        </button>
        <button
          id="tab-btn-financial"
          onClick={() => setActiveTab('financial')}
          className={`py-3 text-center font-medium border-b-2 transition-colors ${activeTab === 'financial' ? 'border-amber-500 text-amber-500 bg-slate-900' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <div className="flex flex-col items-center gap-1">
            <Coins className="h-4 w-4" />
            FINANCIER
          </div>
        </button>
        <button
          id="tab-btn-design"
          onClick={() => setActiveTab('design')}
          className={`py-3 text-center font-medium border-b-2 transition-colors ${activeTab === 'design' ? 'border-amber-500 text-amber-500 bg-slate-900' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <div className="flex flex-col items-center gap-1">
            <LayoutTemplate className="h-4 w-4" />
            DESIGN
          </div>
        </button>
        <button
          id="tab-btn-presets"
          onClick={() => setActiveTab('presets')}
          className={`py-3 text-center font-medium border-b-2 transition-colors ${activeTab === 'presets' ? 'border-amber-500 text-amber-500 bg-slate-900' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="h-4 w-4" />
            MODÈLES
          </div>
        </button>
      </div>

      {/* 4. Tab Contents */}
      <div className="p-5 flex-1 space-y-5 text-sm">
        
        {/* TAB 1: PARTIES IDENTITIES */}
        {activeTab === 'parties' && (
          <div id="tab-parties-content" className="space-y-6">
            <div className="flex items-center gap-2 border-l-2 border-blue-500 pl-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">1. INFORMATIONS DU PRÊTEUR</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Nom complet du Prêteur</label>
                <input
                  id="input-lender-name"
                  type="text"
                  value={lender.name}
                  onChange={(e) => handleLenderChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Né(e) le</label>
                  <input
                    id="input-lender-birth-date"
                    type="text"
                    value={lender.birthDate}
                    onChange={(e) => handleLenderChange('birthDate', e.target.value)}
                    placeholder="04/12/1978"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Lieu de naissance</label>
                  <input
                    id="input-lender-birth-place"
                    type="text"
                    value={lender.birthPlace}
                    onChange={(e) => handleLenderChange('birthPlace', e.target.value)}
                    placeholder="Rome (Italie)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">N° de Pièce d'Identité / Passeport</label>
                <input
                  id="input-lender-id-number"
                  type="text"
                  value={lender.idNumber}
                  onChange={(e) => handleLenderChange('idNumber', e.target.value)}
                  placeholder="Ex : PAS-98725"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Adresse de Résidence</label>
                <input
                  id="input-lender-address"
                  type="text"
                  value={lender.address}
                  onChange={(e) => handleLenderChange('address', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 border-l-2 border-emerald-500 pl-2 mt-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">2. L'EMPRUNTEUR</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Nom complet de l'Emprunteur</label>
                <input
                  id="input-borrower-name"
                  type="text"
                  value={borrower.name}
                  onChange={(e) => handleBorrowerChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Né(e) le</label>
                  <input
                    id="input-borrower-birth-date"
                    type="text"
                    value={borrower.birthDate}
                    onChange={(e) => handleBorrowerChange('birthDate', e.target.value)}
                    placeholder="15/08/1985"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Lieu de naissance</label>
                  <input
                    id="input-borrower-birth-place"
                    type="text"
                    value={borrower.birthPlace}
                    onChange={(e) => handleBorrowerChange('birthPlace', e.target.value)}
                    placeholder="Lyon (France)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">N° de Pièce d'Identité / Passeport</label>
                <input
                  id="input-borrower-id-number"
                  type="text"
                  value={borrower.idNumber}
                  onChange={(e) => handleBorrowerChange('idNumber', e.target.value)}
                  placeholder="Ex : ID-67252"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Adresse de Résidence</label>
                <input
                  id="input-borrower-address"
                  type="text"
                  value={borrower.address}
                  onChange={(e) => handleBorrowerChange('address', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 border-l-2 border-amber-500 pl-2 mt-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">3. LE NOTAIRE PUBLIC</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Nom du Notaire</label>
                <input
                  id="input-notary-name"
                  type="text"
                  value={notary.name}
                  onChange={(e) => handleNotaryChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL PARAMETERS */}
        {activeTab === 'financial' && (
          <div id="tab-financial-content" className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Coins className="h-4 w-4 text-amber-500" />
              CONDITIONS FINANCIÈRES DU PRÊT
            </h3>
            
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Montant Principal du Prêt</label>
              <div className="relative">
                <input
                  id="input-loan-amount"
                  type="number"
                  value={loan.amount}
                  onChange={(e) => handleLoanChange('amount', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 select-none font-bold">
                  {loan.currency}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-2">Devise</label>
                <select
                  id="select-loan-currency"
                  value={loan.currency}
                  onChange={(e) => handleLoanChange('currency', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="€">Euro (€)</option>
                  <option value="$">Dollars ($)</option>
                  <option value="FCFA">FCFA (CFA)</option>
                  <option value="£">Livres (£)</option>
                  <option value="CHF">Franc Suisse</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-2">Taux d'Intérêt</label>
                <div className="relative">
                  <input
                    id="input-loan-rate"
                    type="number"
                    step="0.1"
                    value={loan.interestRate}
                    onChange={(e) => handleLoanChange('interestRate', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                  <span className="absolute right-3.5 top-2 text-xs text-slate-400 select-none">% an</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium flex justify-between mb-1.5">
                <span>Durée du prêt : <strong>{loan.durationMonths} mois</strong></span>
                <span className="text-slate-500 font-mono">({(loan.durationMonths / 12).toFixed(1)} ans)</span>
              </label>
              <input
                id="range-loan-duration"
                type="range"
                min="3"
                max="120"
                step="1"
                value={loan.durationMonths}
                onChange={(e) => handleLoanChange('durationMonths', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>3 mois</span>
                <span>60 mois (5 ans)</span>
                <span>120 mois (10 ans)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Date de signature</label>
                <input
                  id="input-loan-date"
                  type="date"
                  value={loan.dateSigned}
                  onChange={(e) => handleLoanChange('dateSigned', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Frais d'Homologation</label>
                <div className="relative">
                  <input
                    id="input-loan-fees"
                    type="number"
                    value={loan.feeAmount}
                    onChange={(e) => handleLoanChange('feeAmount', Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-2 pr-7 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                  <span className="absolute right-2.5 top-2.5 text-xs text-slate-500 font-bold">{loan.currency}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Lieu de Signature</label>
                <input
                  id="input-loan-city"
                  type="text"
                  value={loan.city}
                  onChange={(e) => handleLoanChange('city', e.target.value)}
                  placeholder="Rome"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Pays Émetteur</label>
                <input
                  id="input-loan-country"
                  type="text"
                  value={loan.country}
                  onChange={(e) => handleLoanChange('country', e.target.value)}
                  placeholder="Italie"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Code / Nº Réf. Enregistrement</label>
              <input
                id="input-loan-reference"
                type="text"
                value={loan.customReference}
                onChange={(e) => handleLoanChange('customReference', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
              />
            </div>

            {/* Simulated Live Calculations Box */}
            <div id="financial-live-calculs-box" className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 mt-4">
              <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase flex items-center gap-1">
                <Info className="h-3 w-3" />
                DÉTAIL D'AMORTISSEMENT CALCULÉ
              </span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Mensualité fixe :</span>
                <strong className="text-white font-mono text-xs">
                  {((loan.amount + (loan.amount * (loan.interestRate / 100) * (loan.durationMonths / 12))) / loan.durationMonths).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} {loan.currency}
                </strong>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Cumul d'intérêts ({loan.interestRate}%) :</span>
                <strong className="text-amber-400 font-mono text-xs">
                  {(loan.amount * (loan.interestRate / 100) * (loan.durationMonths / 12)).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} {loan.currency}
                </strong>
              </div>
              <div className="flex justify-between text-xs text-slate-200 border-t border-slate-800 pt-1.5 mt-1.5">
                <span>Remboursement total :</span>
                <strong className="text-white font-mono text-sm">
                  {(loan.amount + (loan.amount * (loan.interestRate / 100) * (loan.durationMonths / 12))).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} {loan.currency}
                </strong>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ESTHÉTIQUE & DESIGN LAYOUT */}
        {activeTab === 'design' && (
          <div id="tab-design-content" className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <LayoutTemplate className="h-4 w-4 text-amber-500" />
              SÉLECTION & ESTHÉTIQUE
            </h3>

            {/* Language Selector */}
            <div className="space-y-3">
              <label className="text-xs text-slate-300 font-medium block mb-1">Langue de l'Acte Juridique (Régularisation)</label>
              
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-lg">
                <button
                  id="lang-btn-fr"
                  type="button"
                  onClick={() => handleStylingChange('language', 'FR')}
                  className={`py-1.5 text-xs rounded-md font-medium transition-colors ${styling.language === 'FR' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Français
                </button>
                <button
                  id="lang-btn-it"
                  type="button"
                  onClick={() => handleStylingChange('language', 'IT')}
                  className={`py-1.5 text-xs rounded-md font-medium transition-colors ${styling.language === 'IT' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Italien
                </button>
                <button
                  id="lang-btn-en"
                  type="button"
                  onClick={() => handleStylingChange('language', 'EN')}
                  className={`py-1.5 text-xs rounded-md font-medium transition-colors ${styling.language === 'EN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Anglais
                </button>
              </div>

              {/* Advanced Translation Panel */}
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                  Système de Traduction Globale (IA)
                </span>
                
                <select
                  value={selectedLangOption}
                  onChange={(e) => {
                    setSelectedLangOption(e.target.value);
                    if (e.target.value && e.target.value !== 'CUSTOM_INPUT') {
                      const codeMapping: { [key: string]: string } = {
                        'Espagnol': 'ES',
                        'Allemand': 'DE',
                        'Portugais': 'PT',
                        'Néerlandais': 'NL',
                        'Polonais': 'PL',
                        'Roumain': 'RO'
                      };
                      if (codeMapping[e.target.value]) {
                        handleStylingChange('language', codeMapping[e.target.value]);
                        onTriggerAITranslation(e.target.value);
                      }
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choisir n'importe quelle langue --</option>
                  <option value="Espagnol">Espagnol 🇪🇸</option>
                  <option value="Allemand">Allemand 🇩🇪</option>
                  <option value="Portugais">Portugais 🇵🇹</option>
                  <option value="Néerlandais">Néerlandais 🇳🇱</option>
                  <option value="Polonais">Polonais 🇵🇱</option>
                  <option value="Roumain">Roumain 🇷🇴</option>
                  <option value="Arabe">Arabe 🇸🇦</option>
                  <option value="Russe">Russe 🇷🇺</option>
                  <option value="Chinois">Chinois 🇨🇳</option>
                  <option value="Japonais">Japonais 🇯🇵</option>
                  <option value="Turc">Turc 🇹🇷</option>
                  <option value="Vietnamien">Vietnamien 🇻🇳</option>
                  <option value="Portugais Brésil">Portugais (Brésil) 🇧🇷</option>
                  <option value="Coréen">Coréen 🇰🇷</option>
                  <option value="Grec">Grec 🇬🇷</option>
                  <option value="Suédois">Suédois 🇸🇪</option>
                  <option value="Hindi">Hindi 🇮🇳</option>
                  <option value="Ukrainien">Ukrainien 🇺🇦</option>
                  <option value="Persan">Persan 🇮🇷</option>
                  <option value="CUSTOM_INPUT">✍️ Autre langue (Saisir...)</option>
                </select>

                {selectedLangOption === 'CUSTOM_INPUT' && (
                  <input
                    type="text"
                    value={customLangInput}
                    onChange={(e) => setCustomLangInput(e.target.value)}
                    placeholder="Ex: Slovaque, Thaï, Bulgare..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                )}

                <button
                  type="button"
                  disabled={isTranslating || !selectedLangOption || (selectedLangOption === 'CUSTOM_INPUT' && !customLangInput)}
                  onClick={() => {
                    const lang = selectedLangOption === 'CUSTOM_INPUT' ? customLangInput : selectedLangOption;
                    if (lang) {
                      onTriggerAITranslation(lang);
                    }
                  }}
                  className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold text-xs rounded-md transition-all flex items-center justify-center gap-1.5 uppercase shadow-sm cursor-pointer"
                >
                  {isTranslating ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Traduction en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" />
                      Traduire avec Gemini
                    </>
                  )}
                </button>
              </div>

              {styling.language === 'CUSTOM' && styling.customLanguageLabel && (
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-md text-[11px] text-amber-200">
                  Le contrat est actuellement traduit en <strong className="text-amber-400">{styling.customLanguageLabel}</strong> via l'IA.
                </div>
              )}
            </div>

            {/* Corner Flag Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">Drapeau Gauche</label>
                <select
                  id="select-flag-left"
                  value={styling.flagLeft}
                  onChange={(e) => handleStylingChange('flagLeft', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="IT">Italie 🇮🇹</option>
                  <option value="FR">France 🇫🇷</option>
                  <option value="EU">Union Eur. 🇪🇺</option>
                  <option value="DE">Allemagne 🇩🇪</option>
                  <option value="ES">Espagne 🇪🇸</option>
                  <option value="BE">Belgique 🇧🇪</option>
                  <option value="NL">Pays-Bas 🇳🇱</option>
                  <option value="LU">Luxembourg 🇱🇺</option>
                  <option value="PT">Portugal 🇵🇹</option>
                  <option value="IE">Irlande 🇮🇪</option>
                  <option value="GR">Grèce 🇬🇷</option>
                  <option value="AT">Autriche 🇦🇹</option>
                  <option value="PL">Pologne 🇵🇱</option>
                  <option value="RO">Roumanie 🇷🇴</option>
                  <option value="SE">Suède 🇸🇪</option>
                  <option value="DK">Danemark 🇩🇰</option>
                  <option value="FI">Finlande 🇫🇮</option>
                  <option value="CH">Suisse 🇨🇭</option>
                  <option value="GB">Royaume-Uni 🇬🇧</option>
                  <option value="HR">Croatie 🇭🇷</option>
                  <option value="CZ">Rép. Tchèque 🇨🇿</option>
                  <option value="HU">Hongrie 🇭🇺</option>
                  <option value="BG">Bulgarie 🇧🇬</option>
                  <option value="EE">Estonie 🇪🇪</option>
                  <option value="LT">Lituanie 🇱🇹</option>
                  <option value="LV">Lettonie 🇱🇻</option>
                  <option value="NO">Norvège 🇳🇴</option>
                  <option value="IS">Islande 🇮🇸</option>
                  <option value="MC">Monaco 🇲🇨</option>
                  <option value="LI">Liechtenstein 🇱🇮</option>
                  <option value="SK">Slovaquie 🇸🇰</option>
                  <option value="SI">Slovénie 🇸🇮</option>
                  <option value="UA">Ukraine 🇺🇦</option>
                  <option value="MT">Malte 🇲🇹</option>
                  <option value="CY">Chypre 🇨🇾</option>
                  <option value="AL">Albanie 🇦🇱</option>
                  <option value="RS">Serbie 🇷🇸</option>
                  <option value="UN">Nations Unies 🇺🇳</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">Drapeau Droit</label>
                <select
                  id="select-flag-right"
                  value={styling.flagRight}
                  onChange={(e) => handleStylingChange('flagRight', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="FR">France 🇫🇷</option>
                  <option value="IT">Italie 🇮🇹</option>
                  <option value="EU">Union Eur. 🇪🇺</option>
                  <option value="DE">Allemagne 🇩🇪</option>
                  <option value="ES">Espagne 🇪🇸</option>
                  <option value="BE">Belgique 🇧🇪</option>
                  <option value="NL">Pays-Bas 🇳🇱</option>
                  <option value="LU">Luxembourg 🇱🇺</option>
                  <option value="PT">Portugal 🇵🇹</option>
                  <option value="IE">Irlande 🇮🇪</option>
                  <option value="GR">Grèce 🇬🇷</option>
                  <option value="AT">Autriche 🇦🇹</option>
                  <option value="PL">Pologne 🇵🇱</option>
                  <option value="RO">Roumanie 🇷🇴</option>
                  <option value="SE">Suède 🇸🇪</option>
                  <option value="DK">Danemark 🇩🇰</option>
                  <option value="FI">Finlande 🇫🇮</option>
                  <option value="CH">Suisse 🇨🇭</option>
                  <option value="GB">Royaume-Uni 🇬🇧</option>
                  <option value="HR">Croatie 🇭🇷</option>
                  <option value="CZ">Rép. Tchèque 🇨🇿</option>
                  <option value="HU">Hongrie 🇭🇺</option>
                  <option value="BG">Bulgarie 🇧🇬</option>
                  <option value="EE">Estonie 🇪🇪</option>
                  <option value="LT">Lituanie 🇱🇹</option>
                  <option value="LV">Lettonie 🇱🇻</option>
                  <option value="NO">Norvège 🇳🇴</option>
                  <option value="IS">Islande 🇮🇸</option>
                  <option value="MC">Monaco 🇲🇨</option>
                  <option value="LI">Liechtenstein 🇱🇮</option>
                  <option value="SK">Slovaquie 🇸🇰</option>
                  <option value="SI">Slovénie 🇸🇮</option>
                  <option value="UA">Ukraine 🇺🇦</option>
                  <option value="MT">Malte 🇲🇹</option>
                  <option value="CY">Chypre 🇨🇾</option>
                  <option value="AL">Albanie 🇦🇱</option>
                  <option value="RS">Serbie 🇷🇸</option>
                  <option value="UN">Nations Unies 🇺🇳</option>
                </select>
              </div>
            </div>

            {/* Typography selection */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">Style Typographique</label>
              <select
                id="select-font-style"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="serif">Élégant Serif (Georgia/Times - Recommandé)</option>
                <option value="sans">Moderne Minimal (Inter/Sans)</option>
                <option value="mono">Technique Judiciaire (Fira Code/Mono)</option>
              </select>
            </div>

            {/* Headers Custom Text */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Texte de l'En-tête Principal</label>
              <input
                id="input-header-text"
                type="text"
                value={styling.headerText}
                onChange={(e) => handleStylingChange('headerText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Sous-titre d'En-tête</label>
              <input
                id="input-header-subtext"
                type="text"
                value={styling.headerSubText}
                onChange={(e) => handleStylingChange('headerSubText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            {/* Watermark opacity */}
            <div>
              <label className="text-xs text-slate-300 font-medium flex justify-between mb-1.5">
                <span>Opacité du filigrane (balance de justice)</span>
                <span className="font-mono">{(styling.watermarkOpacity * 100).toFixed(0)}%</span>
              </label>
              <input
                id="range-watermark-opacity"
                type="range"
                min="0"
                max="0.30"
                step="0.02"
                value={styling.watermarkOpacity}
                onChange={(e) => handleStylingChange('watermarkOpacity', parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 appearance-none accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Stamp & Seal Controls */}
            <div className="border-t border-slate-800 pt-4 mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Stamp className="h-4 w-4 text-emerald-500" />
                  SCEAU ET TIMBRE FISCAL
                </span>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="checkbox-show-stamp"
                    type="checkbox"
                    checked={styling.showStamp}
                    onChange={(e) => handleStylingChange('showStamp', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 relative"></div>
                </label>
              </div>

              {styling.showStamp && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Couleur d'Encre</label>
                      <select
                        id="select-stamp-color"
                        value={styling.stampColor}
                        onChange={(e) => handleStylingChange('stampColor', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="text-blue-700">Bleu Encre (Notaire)</option>
                        <option value="text-red-700">Rouge Officiel</option>
                        <option value="text-emerald-700">Vert Sceau</option>
                        <option value="text-slate-800">Noir Charbon</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 flex justify-between">
                        <span>Inclinaison</span>
                        <span>{styling.stampRotation}°</span>
                      </label>
                      <input
                        id="range-stamp-rotation"
                        type="range"
                        min="-20"
                        max="20"
                        step="2"
                        value={styling.stampRotation}
                        onChange={(e) => handleStylingChange('stampRotation', Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 appearance-none accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: PRESETS MODEL CONTRACTS */}
        {activeTab === 'presets' && (
          <div id="tab-presets-content" className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              RÉGLAGES & MODÈLES PRÉ-DÉFINIS
            </h3>
            
            <p className="text-xs text-slate-400 leading-normal">
              Utilisez les préréglages automatiques ci-dessous pour remplir le formulaire ou réinitialiser le document selon le cas :
            </p>

            <div className="space-y-2.5">
              <button
                id="preset-btn-def"
                onClick={() => onTriggerPreset('default')}
                className="w-full text-left p-3 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700 transition"
              >
                <div className="font-bold text-xs text-amber-500">Modèle d'Acte de Prêt Standard 🇮🇹🇫🇷</div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  Bertytru Silly, Annesse Dubois, 600.000 €, Italie, Notaire Ericam Dupont, Taux 2%.
                </div>
              </button>

              <button
                id="preset-btn-it"
                onClick={() => onTriggerPreset('italian_only')}
                className="w-full text-left p-3 rounded-lg border border-slate-850 bg-slate-950/30 hover:bg-slate-800/40 hover:border-slate-750 transition"
              >
                <div className="font-bold text-xs text-blue-400">Version 100% Italienne (Rome)</div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  Document optimisé en Italien. TRIBUNALE DI ROMA. Taux 1.5%.
                </div>
              </button>

              <button
                id="preset-btn-fr"
                onClick={() => onTriggerPreset('french_only')}
                className="w-full text-left p-3 rounded-lg border border-slate-850 bg-slate-950/30 hover:bg-slate-800/40 hover:border-slate-755 transition"
              >
                <div className="font-bold text-xs text-emerald-400">Version 100% Française (Paris)</div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  En-tête et articles traduits intégralement en français. Sceau républicain.
                </div>
              </button>
            </div>

            <div className="border-t border-slate-800 pt-4 mt-3 text-xs text-slate-500 p-3 bg-slate-950/50 rounded-lg leading-normal">
              <span className="font-bold text-slate-300 uppercase block mb-1">💡 ASTUCE DE SIGNATURE</span>
              Cliquez directement sur l'une des zones de signature bleues dans le contrat à droite pour dessiner ou effacer votre signature de manière interactive !
            </div>
          </div>
        )}

      </div>

      {/* 5. Footer branding info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 text-[10px] text-slate-500 flex justify-between items-center font-mono">
        <span>© {new Date().getFullYear()} NotaryForge V4</span>
        <span>Version Homologuée</span>
      </div>

    </div>
  );
}
