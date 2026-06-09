/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PartyDetails, LoanDetails, StylingDetails } from './types';
import { SignaturePad } from './components/SignaturePad';
import { ContractPreview } from './components/ContractPreview';
import { 
  Building,
  User,
  CreditCard,
  Scale,
  Calendar,
  FileText,
  Clock,
  Briefcase,
  AlertTriangle,
  Flame,
  Printer,
  FileDown,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  Mail,
  Phone,
  Landmark,
  PenTool,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ShieldCheck,
  Lock,
  Edit
} from 'lucide-react';

export default function App() {
  // 1. STATE INITIALIZATION WITH LEGAL ADMINISTRATION PRESETS
  const [lender, setLender] = useState<PartyDetails>({
    name: 'Bertytru Silly',
    address: 'Via dei Condotti 45, Roma, Italie',
    birthDate: '12/10/1971',
    birthPlace: 'Milano (Italie)',
    idNumber: 'IT-BS781903-A',
    idIssuedBy: 'Questura di Milano',
    idIssuedDate: '14/09/2019',
    phone: '+39 06 123456',
    email: 'b.silly@notaria.it',
    profession: 'Conseiller d\'Investissement Privé',
    signatureType: 'text',
    signatureDrawData: '',
    fontStyle: 'font-signature1',
  });

  const [borrower, setBorrower] = useState<PartyDetails>({
    name: 'Annesse Dubois',
    address: '14 Rue de la Paix, 75002 Paris, France',
    birthDate: '23/04/1982',
    birthPlace: 'Lyon (France)',
    idNumber: 'FR-AD820921-T',
    idIssuedBy: 'Préfecture du Rhône',
    idIssuedDate: '20/11/2021',
    phone: '+33 6 44556677',
    email: 'annesse.dubois@courrier.fr',
    profession: 'Analyste Marketing',
    employer: 'Global Strategy Corp',
    monthlyIncome: 4800,
    signatureType: 'text',
    signatureDrawData: '',
    fontStyle: 'font-signature2',
  });

  const [notary, setNotary] = useState<PartyDetails>({
    name: 'Ericam Dupont',
    address: 'Ufficio Notarile Romano, Piazza Navona 102, Roma, Italie',
    birthDate: '09/05/1965',
    birthPlace: 'Rome',
    idNumber: 'NOT-ED-1965-09',
    idIssuedBy: 'Chambre Nationale des Notaires',
    idIssuedDate: '01/01/2000',
    phone: '+39 06 998877',
    email: 'etude.dupont@notaria.it',
    profession: 'Notaire Royal International Assermenté',
    signatureType: 'text',
    signatureDrawData: '',
    fontStyle: 'font-signature3',
  });

  const [loan, setLoan] = useState<LoanDetails>({
    amount: 600000,
    currency: '€',
    durationMonths: 60,
    interestRate: 2,
    country: 'Italie',
    city: 'Rome',
    dateSigned: '2026-06-09',
    feeAmount: 350,
    customReference: 'N° REF-0047/ITT-ROM-2026',
    fundPurpose: 'Régulation financière et facilitation immobilière pour investissement locatif certifié d\'alliance',
    firstRepaymentDate: '2026-07-10',
    finalRepaymentDate: '2031-06-10',
    penaltyRate: 1.5, // 1.5% par mois de retard
    penaltyFixedAmount: 150, // 150 € forfaitaire par mois
    tvaRate: 20, // 20% de TVA applicable
    repaymentFrequency: 'mensuel',
    notaryLicense: 'NTR-90812735-RM',
  });

  const [styling, setStyling] = useState<StylingDetails>({
    flagLeft: 'IT',
    flagRight: 'FR',
    headerText: 'ATTORNEY GENERAL & NOTARIAL SERVICES',
    headerSubText: 'Administration Centrale d\'Homologation Judiciaire\nSceau d\'État et Régulation Financière Civile Coordonnée',
    watermarkOpacity: 0.08,
    stampColor: 'text-blue-700',
    stampRotation: -6,
    stampText: 'ÉTUDE NOTARIALE DE ME DUPONT',
    subStampText: 'ROME (ITALIE) * SERVICES NOTARIAUX',
    showStamp: true,
    language: 'FR',
  });

  // UI States
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [exportMode, setExportMode] = useState<'editable' | 'official'>('official');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [fontFamily, setFontFamily] = useState<string>('serif');
  const [bannerAlert, setBannerAlert] = useState<string | null>(
    "Remplissez les informations administratives ci-dessous puis appuyez sur 'Générer le contrat' pour concevoir l'acte juridique officiel signé."
  );
  
  // Signature Modals
  const [sigTarget, setSigTarget] = useState<'lender' | 'borrower' | 'notary' | null>(null);

  // Automatically compute loan finalRepaymentDate based on durationMonths & dateSigned
  useEffect(() => {
    if (loan.dateSigned) {
      const date = new Date(loan.dateSigned);
      const startMonth = date.getMonth();
      // Add duration layout
      date.setMonth(startMonth + loan.durationMonths);
      const isoString = date.toISOString().split('T')[0];
      
      // Calculate first repayment date (approx 1 month later)
      const firstDate = new Date(loan.dateSigned);
      firstDate.setMonth(startMonth + 1);
      const firstIsoString = firstDate.toISOString().split('T')[0];

      setLoan(prev => ({
        ...prev,
        finalRepaymentDate: isoString,
        firstRepaymentDate: firstIsoString
      }));
    }
  }, [loan.durationMonths, loan.dateSigned]);

  const handleLenderChange = (key: keyof PartyDetails, value: string) => {
    setLender(prev => ({ ...prev, [key]: value }));
  };

  const handleBorrowerChange = (key: keyof PartyDetails, value: string | number) => {
    setBorrower(prev => ({ ...prev, [key]: value }));
  };

  const handleLoanChange = (key: keyof LoanDetails, value: string | number) => {
    setLoan(prev => ({ ...prev, [key]: value }));
  };

  const handleStylingChange = (key: keyof StylingDetails, value: string | number | boolean) => {
    setStyling(prev => ({ ...prev, [key]: value }));
  };

  const saveSignature = (dataUrl: string) => {
    if (sigTarget === 'lender') {
      setLender(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl }));
    } else if (sigTarget === 'borrower') {
      setBorrower(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl }));
    } else if (sigTarget === 'notary') {
      setNotary(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl }));
    }
    setBannerAlert(`Signature dessinée enregistrée pour : ${sigTarget === 'lender' ? "Le Prêteur" : sigTarget === 'borrower' ? "L'Emprunteur" : "Le Notaire"}.`);
  };

  const clearSignatureData = (party: 'lender' | 'borrower' | 'notary') => {
    if (party === 'lender') {
      setLender(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '' }));
    } else if (party === 'borrower') {
      setBorrower(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '' }));
    } else if (party === 'notary') {
      setNotary(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '' }));
    }
    setBannerAlert("La signature a été réinitialisée au format textuel par défaut.");
  };

  const buildPreset = (type: string) => {
    if (type === 'default') {
      setLender({
        name: 'Bertytru Silly',
        address: 'Via dei Condotti 45, Roma, Italie',
        birthDate: '12/10/1971',
        birthPlace: 'Milano (Italie)',
        idNumber: 'IT-BS781903-A',
        idIssuedBy: 'Questura di Milano',
        idIssuedDate: '14/09/2019',
        phone: '+39 06 123456',
        email: 'b.silly@notaria.it',
        profession: 'Conseiller d\'Investissement Privé',
        signatureType: 'text',
        signatureDrawData: '',
        fontStyle: 'font-signature1',
      });
      setBorrower({
        name: 'Annesse Dubois',
        address: '14 Rue de la Paix, 75002 Paris, France',
        birthDate: '23/04/1982',
        birthPlace: 'Lyon (France)',
        idNumber: 'FR-AD820921-T',
        idIssuedBy: 'Préfecture du Rhône',
        idIssuedDate: '20/11/2021',
        phone: '+33 6 44556677',
        email: 'annesse.dubois@courrier.fr',
        profession: 'Analyste Marketing',
        employer: 'Global Strategy Corp',
        monthlyIncome: 4800,
        signatureType: 'text',
        signatureDrawData: '',
        fontStyle: 'font-signature2',
      });
      setNotary({
        name: 'Ericam Dupont',
        address: 'Ufficio Notarile Romano, Piazza Navona 102, Roma, Italie',
        birthDate: '09/05/1965',
        birthPlace: 'Rome',
        idNumber: 'NOT-ED-1965-09',
        idIssuedBy: 'Chambre Nationale des Notaires',
        idIssuedDate: '01/01/2000',
        phone: '+39 06 998877',
        email: 'etude.dupont@notaria.it',
        profession: 'Notaire Royal International Assermenté',
        signatureType: 'text',
        signatureDrawData: '',
        fontStyle: 'font-signature3',
      });
      setLoan(prev => ({
        ...prev,
        amount: 600000,
        interestRate: 2,
        durationMonths: 60,
        currency: '€',
        country: 'Italie',
        city: 'Rome',
        customReference: 'N° REF-0047/ITT-ROM-2026',
        fundPurpose: 'Régulation financière et facilitation immobilière pour investissement locatif certifié d\'alliance',
      }));
      setBannerAlert("Modèle de contrat réinitialisé avec les valeurs d'origine.");
    } else if (type === 'clean') {
      // Clear data to let them write
      setLender(prev => ({ ...prev, name: '', address: '', idNumber: '', phone: '', email: '' }));
      setBorrower(prev => ({ ...prev, name: '', address: '', idNumber: '', employer: '', monthlyIncome: 0 }));
      setLoan(prev => ({ ...prev, amount: 10000, interestRate: 1, durationMonths: 12 }));
      setBannerAlert("Formulaire vidé. Prêt pour votre propre saisie !");
    }
  };

  // NATIVE PRINT CALL
  const triggerPrintPDF = () => {
    window.print();
  };

  // EXPORT WORD DOCUMENT .DOC OR HYPER-COMPATIBLE EDITABLE HTML
  const triggerDownloadContract = (format: 'doc' | 'html' = 'html') => {
    const principal = loan.amount;
    const rate = loan.interestRate;
    const duration = loan.durationMonths;
    const totalInterest = principal * (rate / 100) * (duration / 12);
    const totalRepayable = principal + totalInterest;
    
    let divisionFactor = duration;
    if (loan.repaymentFrequency === 'trimestriel') divisionFactor = duration / 3;
    else if (loan.repaymentFrequency === 'unique') divisionFactor = 1;
    const installmentPayment = totalRepayable / divisionFactor;

    const tvaAmount = (totalInterest + loan.feeAmount) * (loan.tvaRate / 100);
    const totalWithTaxes = totalRepayable + tvaAmount;

    // Resolve active language
    const activeLang = (styling.language === 'BOTH' ? 'FR' : styling.language) as 'FR' | 'IT' | 'EN';

    const formatM = (val: number) => {
      const locale = activeLang === 'FR' ? 'fr-FR' : activeLang === 'IT' ? 'it-IT' : 'en-US';
      return `${val.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${loan.currency}`;
    };

    const signatureDateFormatted = loan.dateSigned 
      ? new Date(loan.dateSigned).toLocaleDateString(activeLang === 'FR' ? 'fr-FR' : activeLang === 'IT' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : (activeLang === 'FR' ? "13 septembre 2026" : activeLang === 'IT' ? "13 settembre 2026" : "September 13, 2026");

    const firstDateFormatted = loan.firstRepaymentDate
      ? new Date(loan.firstRepaymentDate).toLocaleDateString(activeLang === 'FR' ? 'fr-FR' : activeLang === 'IT' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : (activeLang === 'FR' ? "Non spécifiée" : activeLang === 'IT' ? "Non specificata" : "Not specified");

    const finalDateFormatted = loan.finalRepaymentDate
      ? new Date(loan.finalRepaymentDate).toLocaleDateString(activeLang === 'FR' ? 'fr-FR' : activeLang === 'IT' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : (activeLang === 'FR' ? "Non spécifiée" : activeLang === 'IT' ? "Non specificata" : "Not specified");

    // Translation catalog for Word Document
    const tWord = {
      FR: {
        docTitle: "Acte Authentique de Prêt Notarié",
        refLine: "ACTE NOTARIÉ CIVIL D'ENREGISTREMENT SYSTÉMIQUE :",
        titleBox: "CONTRAT DE PRÊT",
        procedureTitle: "PROCÉDURE D'ADMINISTRATION JURIDIQUE ET ADMINISTRATIVE :",
        procedureBody: `Devant Maître <strong>${notary.name}</strong>, notaire assermenté inscrit à la chancellerie près l'adresse professionnelle <strong>${notary.address}</strong>, titulaire du brevet de licence notariale de l'État <strong>N° ${loan.notaryLicense}</strong>. Comparissent d'une part le Prêteur et d'autre part l'Emprunteur dument identifiés ci-après sous foi de serment.`,
        section1Title: "Article 1 : Désignation des Parties et Pouvoirs",
        cardA: "A. LE PRÊTEUR (CRÉANCIER)",
        cardB: "B. L'EMPRUNTEUR (DÉBITEUR)",
        fullName: "Nom complet :",
        birthInfo: "Date & Lieu de naissance :",
        profession: "Profession déclarée :",
        addressLabel: "Adresse légale :",
        identityLabel: "Identité légale :",
        contactLabel: "Coordonnées :",
        employerLabel: "Profession & Employeur :",
        incomeLabel: "Ressources financières :",
        incomeValue: `Revenu mensuel déclaré récurrent de ~${borrower.monthlyIncome ? borrower.monthlyIncome.toLocaleString('fr-FR') : 'N/C'} ${loan.currency}`,
        section2Title: "Article 2 : Clauses de Financement et d'Amortissement",
        sec21Title: "Section 2.1 : Mise à disposition des fonds et motif contractuel",
        sec21Body: `Le Prêteur consent à transférer sous forme de prêt à l'Emprunteur la somme principale de <strong>${formatM(principal)}</strong>. L'Emprunteur certifie sous peine de nullité de plein droit que cette somme est intégralement affectée à l'usage exclusif suivant : <strong>« ${loan.fundPurpose} »</strong>.`,
        sec22Title: "Section 2.2 : Rémunération et Taux d'intérêt",
        sec22Body: `Ce crédit est consenti au taux d'intérêt nominal annuel et conventionnel fixe de <strong>${rate}%</strong>. Sur la durée complète convenue de <strong>${duration} mois</strong>, le montant d'intérêts s'établit à <strong>${formatM(totalInterest)}</strong>.`,
        sec23Title: "Section 2.3 : Échéancier de Remboursement",
        sec23Body_start: `L'amortissement du capital et des intérêts cumulés s'élève à un total général de <strong>${formatM(totalRepayable)}</strong> et s'effectuera selon une fréquence <strong>${loan.repaymentFrequency.toUpperCase()}</strong>.`,
        sec23Body_mensuel: `Le remboursement s'effectuera en ${duration} mensualités consécutives de <strong>${formatM(installmentPayment)}</strong> chacune.`,
        sec23Body_trimestriel: `Le remboursement s'effectuera par trimestre pour un montant récurrent de <strong>${formatM(installmentPayment)}</strong>.`,
        sec23Body_unique: `Le remboursement global libératoire de la somme capitalisée interviendra en un seul versement unique.`,
        sec23Body_dates: `La première échéance obligatoire interviendra le <strong>${firstDateFormatted}</strong>, et la date d'échéance finale libératoire est planifiée pour le <strong>${finalDateFormatted}</strong>.`,
        section3Title: "Article 3 : Pénalités de Retard, Intérêts Moratoires et Sanctions",
        section3Body: "En cas d'échéance impayée au-delà d'un délai de carence réglementaire de cinq (5) jours, l'Emprunteur encourt de plein droit des sanctions moratoires strictes :",
        penaltyBoxHeader: "PÉNALITÉ DE NON-REMBOURSEMENT :",
        penaltyFixed: `- Pénalité administrative forfaitaire fixe : <strong>${formatM(loan.penaltyFixedAmount)}</strong> par mensualité éludée.`,
        penaltyRate: `- Majoration d'intérêt moratoire cumulatif de : <strong>${loan.penaltyRate}% par mois de retard</strong> applicable sur l'ensemble de l'amortissement en souffrance.`,
        penaltyWarning: "À défaut de régularisation intégrale dans les quinze jours d'une mise en demeure par Huissier de Justice, l'acte devient exécutoire de plein droit et le Prêteur pourra réclamer la totalité des sommes impayées par saisie administrative directe.",
        section4Title: "Article 4 : Fiscalité, Frais Notariaux et Assujettissement TVA et Assurances",
        section4Body: `Conformément à la réglementation sur la taxation notariale des actes obligataires d'État, les frais d'homologation administrative de <strong>${formatM(loan.feeAmount)}</strong> sont soumis à la taxe sur la valeur ajoutée (TVA) à un taux de <strong>${loan.tvaRate}%</strong> sur l’intérêt cumulé. Le montant de taxe prélevé s'estime à <strong>${formatM(tvaAmount)}</strong>, portant l'enveloppe finale consolidée à <strong>${formatM(totalWithTaxes)}</strong>.`,
        labelDone: `Dressé et authentifié sous sceau légal à ${loan.city} (${loan.country}), le ${signatureDateFormatted}`,
        labelLender: "LE PRÊTEUR (CRÉANCIER)",
        labelBorrower: "L'EMPRUNTEUR (DÉBITEUR)",
        labelNotary: "IL NOTAIO / LE NOTAIRE",
        stampLenderTitle: "★★ CREDIVITE S.A. ★★",
        stampLenderDept: "SERVICES DE FINANCEMENT CIVILS",
        stampLenderCert: "APPROUVÉ & CERTIFIÉ CONFORME",
        stampLenderSig: "Signature Proxy CREDIVITE",
        docLenderMention: "Bon pour accord, crédit débloqué d'office",
        stampNotaryTitle: "HOMOLOGATION CIVILE CIVIQUE",
        stampNotarySig: `Me ${notary.name}`,
        stampNotaryTax: "TIMBRE FISCAL MARCA DA BOLLO € 16,00",
        docNotaryMention: "Homologué et enregistré sous sceau d'État",
        stampBorrowerTitle: "SIGNATURE MANUELLE OBLIGATOIRE",
        stampBorrowerSub: "(À signer après impression physique)",
        docBorrowerMention: 'Écrire de sa main : "Lu et approuvé d\'office, bon pour accord"',
        section5Title: "Article 5 : Assurance obligatoire et Activation du Crédit",
        section5Body: `Le bénéficiaire certifie sa solvabilité et valide la mise à disposition immédiate de ses fonds en s'acquittant de l'assurance crédit réglementaire de <strong>${formatM(loan.feeAmount)}</strong>. Suite à la signature de l'accord, l'emprunteur devra s'acquitter de cette somme pour l'enregistrement du dossier d'assurance crédit avant le virement de l'enveloppe de <strong>${formatM(principal)}</strong>.`
      },
      IT: {
        docTitle: "Atto Autentico di Prestito Notarile",
        refLine: "ATTO NOTARILE CIVILE DI REGISTRAZIONE SISTEMICA :",
        titleBox: "CONTRATTO DI PRESTITO NOTARILE OMOLOGATO",
        procedureTitle: "PROCEDURA DI AMMINISTRAZIONE GIURIDICA E AMMINISTRATIVA :",
        procedureBody: `Dinanzi a Me <strong>${notary.name}</strong>, notaio giurato iscritto alla cancelleria presso l'ufficio professionale <strong>${notary.address}</strong>, titolare della licenza notarile di Stato <strong>N. ${notary.idNumber || loan.notaryLicense}</strong>. Compariscono da una parte il Mutuante e dall'altra il Mutuatario debitamente identificati sotto giuramento legale.`,
        section1Title: "Articolo 1 : Designazione delle Parti e Poteri",
        cardA: "A. IL MUTUANTE (CREDITORE)",
        cardB: "B. IL MUTUATARIO (DEBITORE)",
        fullName: "Nome completo :",
        birthInfo: "Data & Luogo di nascita :",
        profession: "Professione dichiarata :",
        addressLabel: "Indirizzo legale :",
        identityLabel: "Identità legale :",
        contactLabel: "Contatti :",
        employerLabel: "Professione & Datore :",
        incomeLabel: "Risorse finanziarie :",
        incomeValue: `Reddito mensile ricorrente dichiarato di ~${borrower.monthlyIncome ? borrower.monthlyIncome.toLocaleString('it-IT') : 'N/C'} ${loan.currency}`,
        section2Title: "Articolo 2 : Clausole di Finanziamento e Ammortamento",
        sec21Title: "Sezione 2.1 : Erogazione dei fondi e causale contrattuale",
        sec21Body: `Il Mutuante acconsente a trasferire a titolo di prestito al Mutuatario la somma principale di <strong>${formatM(principal)}</strong>. Il Mutuatario certifica sotto pena di nullità immediata che tale somma è interamente destinata all'uso esclusivo seguente: <strong>« ${loan.fundPurpose} »</strong>.`,
        sec22Title: "Sezione 2.2 : Tasso di interesse e remunerazione",
        sec22Body: `Questo credito è concesso al tasso di interesse nominale annuo e convenzionale fisso del <strong>${rate}%</strong>. Su tutta la durata concordata di <strong>${duration} mesi</strong>, l'importo totale degli interessi è pari a <strong>${formatM(totalInterest)}</strong>.`,
        sec23Title: "Sezione 2.3 : Piano di ammortamento",
        sec23Body_start: `L'ammortamento del capitale e degli interessi cumulati ammonta a un totale complessivo di <strong>${formatM(totalRepayable)}</strong> e sarà eseguito con frequenza <strong>${loan.repaymentFrequency.toUpperCase()}</strong>.`,
        sec23Body_mensuel: `Il rimborso sarà effettuato in ${duration} rate mensili consecutive di <strong>${formatM(installmentPayment)}</strong> ciascuna.`,
        sec23Body_trimestriel: `Il rimborso sarà effettuato trimestralmente per un importo ricorrente di <strong>${formatM(installmentPayment)}</strong>.`,
        sec23Body_unique: `Il rimborso globale liberatorio della somma capitalizzata avverrà in un'unica soluzione.`,
        sec23Body_dates: `La prima scadenza obbligatoria avverrà il <strong>${firstDateFormatted}</strong>, e la data di scadenza finale liberatoria è prevista per il <strong>${finalDateFormatted}</strong>.`,
        section3Title: "Articolo 3 : Penali di Ritardo e Spese di Morosità",
        section3Body: "In caso di rata non pagata oltre un termine di grazia regolamentare di cinque (5) giorni, il Mutuatario incorre di diritto nelle seguenti sanzioni moratorie:",
        penaltyBoxHeader: "PENALITÀ DI MANCATO RIMBORSO :",
        penaltyFixed: `- Penale forfettaria fissa di ritardo : <strong>${formatM(loan.penaltyFixedAmount)}</strong> per ogni rata insoluta.`,
        penaltyRate: `- Maggiorazione dell'interesse di mora cumulativo del : <strong>${loan.penaltyRate}% al mese</strong> applicabile sull'importo scaduto e non pagato.`,
        penaltyWarning: "In mancanza di regolarizzazione entro quindici giorni da una formale diffida ad adempiere, l'atto diventa esecutivo a tutti gli effetti di legge e il Mutuante potrà richiedere l'esecuzione forzata e il pignoramento dei beni.",
        section4Title: "Articolo 4 : Tasse, Spese Notarili e Applicazione IVA",
        section4Body: `In conformità con la legislazione sulla tassazione degli atti notarili di Stato, le spese di omologazione di <strong>${formatM(loan.feeAmount)}</strong> sono soggette all'imposta sul valore aggiunto (IVA) con un'aliquota del <strong>${loan.tvaRate}%</strong>. L'imposta calcolata è pari a <strong>${formatM(tvaAmount)}</strong>, per un valore totale di <strong>${formatM(totalWithTaxes)}</strong>.`,
        labelDone: `Redatto e autenticato sotto sigillo legale a ${loan.city} (${loan.country}), il ${signatureDateFormatted}`,
        labelLender: "IL MUTUANTE (CREDITORE)",
        labelBorrower: "IL MUTUATARIO (DEBITORE)",
        labelNotary: "IL NOTAIO (OFFICIALE CIVILE)",
        stampLenderTitle: "★★ CREDIVITE S.A. ★★",
        stampLenderDept: "SERVIZI FINANZIARI CIVILI",
        stampLenderCert: "APPROVATO & CERTIFICATO CONFORME",
        stampLenderSig: "Firma Proxy CREDIVITE",
        docLenderMention: "Buono per accordo, credito deliberato d'ufficio",
        stampNotaryTitle: "OMOLOGAZIONE CIVILE STATALE",
        stampNotarySig: `Me ${notary.name}`,
        stampNotaryTax: "IMPOSTA DI BOLLO MARCA DA BOLLO € 16,00",
        docNotaryMention: "Omologato e registrato sotto sigillo di Stato",
        stampBorrowerTitle: "FIRMA MANUALE OBBLIGATORIA",
        stampBorrowerSub: "(Da firmare dopo la stampa cartacea)",
        docBorrowerMention: 'Scrivere a mano: "Letto e approvato d\'ufficio, buono per accordo"',
        section5Title: "Articolo 5 : Assicurazione obbligatoria e Attivazione del Credito",
        section5Body: `Il beneficiario certifica la propria solvibilità e convalida la disponibilità immediata dei fondi pagando i diritti obbligatori di assicurazione sul credito di <strong>${formatM(loan.feeAmount)}</strong>. Successivamente alla sottoscrizione del presente accordo, il mutuatario dovrà corrispondere tale somma per la registrazione del dossier assicurativo prima del trasferimento effettivo di <strong>${formatM(principal)}</strong>.`
      },
      EN: {
        docTitle: "Authenticated Notarial Loan Agreement Deed",
        refLine: "NOTARIAL DEED OF ADMINISTRATIVE REGISTRATION :",
        titleBox: "OFFICIAL NOTARIAL AUTHENTICATED LOAN CONTRACT",
        procedureTitle: "ADMINISTRATIVE AND LEGAL REGISTRATION PROCEDURE :",
        procedureBody: `Before Sworn Notary Public <strong>${notary.name}</strong>, registered with the civil registry at <strong>${notary.address}</strong>, holding public notary commission <strong>N° ${loan.notaryLicense}</strong>. Personally appeared the Lender on the one side, and the Borrower on the other, both identifying themselves under lawful oath.`,
        section1Title: "Article 1 : Designation of Parties and Authorities",
        cardA: "A. THE LENDER (CREDITOR)",
        cardB: "B. THE BORROWER (DEBENTURE)",
        fullName: "Full Name :",
        birthInfo: "Date & Place of birth :",
        profession: "Declared Profession :",
        addressLabel: "Legal Address :",
        identityLabel: "Legal ID Details :",
        contactLabel: "Contact Information :",
        employerLabel: "Profession & Employer :",
        incomeLabel: "Financial Resources :",
        incomeValue: `Declared recurrent monthly income: ~${borrower.monthlyIncome ? borrower.monthlyIncome.toLocaleString('en-US') : 'N/C'} ${loan.currency}`,
        section2Title: "Article 2 : Financial Covenants and Amortization Terms",
        sec21Title: "Section 2.1 : Grant of Loan and Legal Purpose",
        sec21Body: `The Lender hereby agrees to advance to the Borrower the principal loan sum of <strong>${formatM(principal)}</strong>. The Borrower certifies under penalty of absolute nullity that the proceeds of this loan shall be solely applied to: <strong>“ ${loan.fundPurpose} ”</strong>.`,
        sec22Title: "Section 2.2 : Coupon and Interest rate",
        sec22Body: `This loan facility is advanced at a fixed annual administrative interest rate of <strong>${rate}%</strong>. Over the defined amortization period of <strong>${duration} months</strong>, the cumulative interest amounts to <strong>${formatM(totalInterest)}</strong>.`,
        sec23Title: "Section 2.3 : Repayment Schedule and Installments",
        sec23Body_start: `Amortization of principal and cumulative interest totals <strong>${formatM(totalRepayable)}</strong> and shall be serviced with a <strong>${loan.repaymentFrequency.toUpperCase()}</strong> frequency.`,
        sec23Body_mensuel: `Repayment shall be made in ${duration} successive monthly installments of <strong>${formatM(installmentPayment)}</strong> each.`,
        sec23Body_trimestriel: `Repayment shall be made quarterly in recurrent amounts of <strong>${formatM(installmentPayment)}</strong>.`,
        sec23Body_unique: `The complete debt settlement shall be made in a single, final balloon payment.`,
        sec23Body_dates: `The first statutory payment is due on <strong>${firstDateFormatted}</strong>, and the final debt clearance date is scheduled on <strong>${finalDateFormatted}</strong>.`,
        section3Title: "Article 3 : Delinquency Penalties and Default Interest Rates",
        section3Body: "Should any payment remain unpaid past a regulatory grace period of five (5) days, the Borrower is subject by law to immediate moratory interest surcharges:",
        penaltyBoxHeader: "UNPAID DELINQUENCY REMEDIES:",
        penaltyFixed: `- Contractual late fee penalty: <strong>${formatM(loan.penaltyFixedAmount)}</strong> per missed payment window.`,
        penaltyRate: `- Moratory cumulative interest surcharge rate: <strong>${loan.penaltyRate}% per month</strong> calculated daily over overall past-due balances.`,
        penaltyWarning: "In the absence of total remediation within fifteen days from formal administrative summons, this deed becomes immediately executory by law and the Lender may pursue attachment of assets.",
        section4Title: "Article 4 : Fees, Taxes and Value Added Tax (VAT) Assessment",
        section4Body: `In accordance with registration legislation for notarial instruments, the administrative deed recording fees of <strong>${formatM(loan.feeAmount)}</strong> are subject to Value Added Tax (VAT) at a rate of <strong>${loan.tvaRate}%</strong>. The assessed tax amounts to <strong>${formatM(tvaAmount)}</strong>, for a total filing disbursement of <strong>${formatM(totalWithTaxes)}</strong>.`,
        labelDone: `Executed and authenticated under official seal at ${loan.city} (${loan.country}), on ${signatureDateFormatted}`,
        labelLender: "THE LENDER (CREDITOR)",
        labelBorrower: "THE BORROWER (DEBTOR)",
        labelNotary: "THE NOTARY PUBLIC",
        stampLenderTitle: "★★ CREDIVITE S.A. ★★",
        stampLenderDept: "CIVIL FINANCING OPERATIONS",
        stampLenderCert: "APPROVED & INTEGRALLY CERTIFIED",
        stampLenderSig: "Proxy Signature CREDIVITE S.A.",
        docLenderMention: "Good for agreement, loan released officially",
        stampNotaryTitle: "OFFICIAL CIVIL REGISTRATION COMMISSION",
        stampNotarySig: `Notary ${notary.name}`,
        stampNotaryTax: "STAMP FEE REVENUE TAX PIECE DISCHARGED",
        docNotaryMention: "Authenticated and recorded under State Seal",
        stampBorrowerTitle: "MANDATORY HANDWRITTEN SIGNATURE",
        stampBorrowerSub: "(To be signed manually on printed copy)",
        docBorrowerMention: 'Must handwrite: "Read and approved, good for agreement"',
        section5Title: "Article 5 : Collateral Insurance and Disbursement Activation",
        section5Body: `The borrower certifies their financial capacity and activates the prompt check or wire transfer of funds by paying the regulatory credit indemnity insurance of <strong>${formatM(loan.feeAmount)}</strong>. Following signature, this fee must be cleared for official insurance filing before the immediate dispatch of the principal of <strong>${formatM(principal)}</strong>.`
      }
    };

    const currentT = tWord[activeLang];

    // High fidelity DOC structure matching the administrative layout
    const fileHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>${currentT.docTitle}</title>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Times New Roman', Times, serif; 
            font-size: 11pt; 
            line-height: 1.5; 
            color: #111827; 
            margin: 40px; 
          }
          .title-box {
            border: 4px double #111827;
            padding: 15px;
            text-align: center;
            background-color: #f8fafc;
            margin-bottom: 30px;
          }
          .header-title {
            font-size: 14pt;
            font-weight: bold;
            letter-spacing: 2px;
            color: #1a365d;
            text-transform: uppercase;
            text-align: center;
          }
          .header-subtext {
            font-size: 9pt;
            color: #4b5563;
            text-align: center;
            font-style: italic;
            margin-bottom: 20px;
          }
          .reference-line {
            text-align: center;
            font-family: Courier, monospace;
            font-size: 10pt;
            color: #b91c1c;
            font-weight: bold;
            margin-bottom: 25px;
          }
          .editorial-notary {
            font-size: 9.5pt;
            background-color: #f9fafb;
            border-left: 4px solid #b45309;
            padding: 12px;
            margin-bottom: 25px;
            text-align: justify;
          }
          .section-title {
            font-weight: bold;
            color: #1a365d;
            font-size: 11.5pt;
            margin-top: 25px;
            margin-bottom: 12px;
            border-bottom: 1.5px solid #1a365d;
            padding-bottom: 4px;
            text-transform: uppercase;
          }
          .party-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .party-card {
            width: 50%;
            border: 1px solid #cbd5e1;
            padding: 12px;
            vertical-align: top;
            background-color: #fcfcfc;
          }
          .article-title {
            font-weight: bold;
            color: #1a365d;
            font-size: 10.5pt;
            margin-top: 15px;
            margin-bottom: 6px;
            text-transform: uppercase;
          }
          .article-content {
            text-align: justify;
            margin-bottom: 15px;
            font-size: 10.5pt;
          }
          .penalty-box {
            background-color: #fef2f2;
            border: 1px solid #fee2e2;
            padding: 12px;
            color: #991b1b;
            font-size: 10pt;
            margin-top: 10px;
            margin-bottom: 15px;
          }
          .signature-section {
            width: 100%;
            margin-top: 35px;
            border-top: 2px solid #111827;
            padding-top: 15px;
          }
          .sig-cell {
            width: 32%;
            vertical-align: top;
            padding: 12px;
            border: 1px solid #e2e8f0;
            background-color: #fafafa;
          }
          .stamp-box-credivite {
            border: 2px double #1d4ed8;
            color: #1d4ed8;
            padding: 10px;
            margin-top: 10px;
            background-color: #f8fafc;
            font-family: Courier, monospace;
            font-size: 8pt;
            text-align: center;
          }
          .stamp-box-notary {
            border: 1px dashed #dc2626;
            color: #dc2626;
            padding: 10px;
            margin-top: 10px;
            background-color: #fef2f2;
            font-family: Courier, monospace;
            font-size: 8pt;
            text-align: center;
          }
          .stamp-box-borrower {
            border: 2px dashed #059669;
            color: #059669;
            padding: 12px;
            margin-top: 10px;
            background-color: #f0fdf4;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <!-- Header with Symmetrical Scales of Justice -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
          <tr>
            <!-- Left Scale of Justice -->
            <td style="width: 70px; vertical-align: middle; text-align: left;">
              <svg width="55" height="55" style="color: #1e293b;" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 82H68" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                <path d="M38 77H62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                <line x1="50" y1="26" x2="50" y2="77" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                <line x1="18" y1="32" x2="82" y2="32" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="50" cy="32" r="4" fill="currentColor" />
                <line x1="18" y1="32" x2="10" y2="58" stroke="currentColor" stroke-width="1" />
                <line x1="18" y1="32" x2="26" y2="58" stroke="currentColor" stroke-width="1" />
                <path d="M8 58H28C28 65 8 65 8 58Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
                <line x1="82" y1="32" x2="74" y2="58" stroke="currentColor" stroke-width="1" />
                <line x1="82" y1="32" x2="90" y2="58" stroke="currentColor" stroke-width="1" />
                <path d="M72 58H92C92 65 72 65 72 58Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
              </svg>
            </td>
            
            <!-- Middle Text Header Group, in original colors -->
            <td style="vertical-align: middle; text-align: center;">
              <div style="font-size: 10pt; color: #1d4ed8; font-weight: bold; font-family: 'Times New Roman', Times, serif; text-transform: uppercase; margin-bottom: 2px;">
                ${activeLang === 'FR' ? "UNION EUROPÉENNE" : activeLang === 'IT' ? "UNIONE EUROPEA" : "EUROPEAN UNION"}
              </div>
              <div style="font-size: 10pt; color: #dc2626; font-weight: bold; font-family: Arial, sans-serif; text-transform: uppercase; margin-bottom: 2px;">
                ${activeLang === 'FR' ? "AUTORITÉ BANCAIRE EUROPÉENNE" : activeLang === 'IT' ? "AUTORITÀ BANCARIA EUROPEA" : "EUROPEAN BANKING AUTHORITY"}
              </div>
              <div style="font-size: 8pt; color: #065f46; font-weight: bold; font-family: 'Times New Roman', Times, serif; text-transform: uppercase; margin-bottom: 2px;">
                ${activeLang === 'FR' ? "ORDRES DES AVOCATS ET GREFFE CIVIL" : activeLang === 'IT' ? "ORDINES DEI CONTROLLORI GIUDIZIARI" : "BAR ASSOCIATIONS AND CIVIL REGISTRY"}
              </div>
              <div style="font-size: 7.5pt; color: #737373; font-family: monospace; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
                ${activeLang === 'FR' ? "OFFICE NOTARIAL ET CONTROLE DES FONDS" : activeLang === 'IT' ? "UFFICIO NOTARILE E CONTROLLO FONDI" : "NOTARY COMMISSION AND FUND AUDIT"}
              </div>
            </td>

            <!-- Right Scale of Justice -->
            <td style="width: 70px; vertical-align: middle; text-align: right;">
              <svg width="55" height="55" style="color: #1e293b;" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 82H68" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                <path d="M38 77H62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                <line x1="50" y1="26" x2="50" y2="77" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                <line x1="18" y1="32" x2="82" y2="32" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="50" cy="32" r="4" fill="currentColor" />
                <line x1="18" y1="32" x2="10" y2="58" stroke="currentColor" stroke-width="1" />
                <line x1="18" y1="32" x2="26" y2="58" stroke="currentColor" stroke-width="1" />
                <path d="M8 58H28C28 65 8 65 8 58Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
                <line x1="82" y1="32" x2="74" y2="58" stroke="currentColor" stroke-width="1" />
                <line x1="82" y1="32" x2="90" y2="58" stroke="currentColor" stroke-width="1" />
                <path d="M72 58H92C92 65 72 65 72 58Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
              </svg>
            </td>
          </tr>
        </table>
        
        <div class="reference-line" style="margin-top: 10px; margin-bottom: 20px; text-align: center; font-family: Courier, monospace; font-size: 10pt; color: #b91c1c; font-weight: bold;">
          ${currentT.refLine} ${loan.customReference}
        </div>

        <div class="title-box">
          <h2 style="margin: 0; font-size: 15pt; color: #1a365d; letter-spacing: 1.5px; text-transform: uppercase;">
            ${currentT.titleBox}
          </h2>
        </div>

        <div class="editorial-notary">
          <strong>${currentT.procedureTitle}</strong><br>
          ${currentT.procedureBody}
        </div>

        <div class="section-title">${currentT.section1Title}</div>
        <table class="party-table">
          <tr>
            <td class="party-card">
              <strong style="color: #1a365d;">${currentT.cardA}</strong><br>
              <strong>${currentT.fullName}</strong> ${lender.name}<br>
              <strong>${currentT.birthInfo}</strong> ${lender.birthDate} ${lender.birthPlace ? `à ${lender.birthPlace}` : ''}<br>
              <strong>${currentT.profession}</strong> ${lender.profession}<br>
              <strong>${currentT.addressLabel}</strong> ${lender.address}<br>
              <strong>${currentT.identityLabel}</strong> N° ${lender.idNumber} (délivrée par ${lender.idIssuedBy} le ${lender.idIssuedDate || 'N/C'})<br>
              <strong>${currentT.contactLabel}</strong> ${lender.email} / ${lender.phone}
            </td>
            <td class="party-card">
              <strong style="color: #047857;">${currentT.cardB}</strong><br>
              <strong>${currentT.fullName}</strong> ${borrower.name}<br>
              <strong>${currentT.birthInfo}</strong> ${borrower.birthDate} ${borrower.birthPlace ? `à ${borrower.birthPlace}` : ''}<br>
              <strong>${currentT.employerLabel}</strong> ${borrower.profession} ${borrower.employer ? `chez ${borrower.employer}` : ''}<br>
              <strong>${currentT.incomeLabel}</strong> ${currentT.incomeValue}<br>
              <strong>${currentT.addressLabel}</strong> ${borrower.address}<br>
              <strong>${currentT.identityLabel}</strong> N° ${borrower.idNumber} (délivrée par ${borrower.idIssuedBy} le ${borrower.idIssuedDate || 'N/C'})<br>
              <strong>${currentT.contactLabel}</strong> ${borrower.email} / ${borrower.phone}
            </td>
          </tr>
        </table>

        <div class="section-title">${currentT.section2Title}</div>
        
        <div class="article-title">${currentT.sec21Title}</div>
        <div class="article-content">
          ${currentT.sec21Body}
        </div>

        <div class="article-title">${currentT.sec22Title}</div>
        <div class="article-content">
          ${currentT.sec22Body}
        </div>

        <div class="article-title">${currentT.sec23Title}</div>
        <div class="article-content">
          ${currentT.sec23Body_start} 
          ${loan.repaymentFrequency === 'mensuel' ? currentT.sec23Body_mensuel : ''}
          ${loan.repaymentFrequency === 'trimestriel' ? currentT.sec23Body_trimestriel : ''}
          ${loan.repaymentFrequency === 'unique' ? currentT.sec23Body_unique : ''}
          ${currentT.sec23Body_dates}
        </div>

        <div class="section-title">${currentT.section5Title}</div>
        <div class="article-content">
          ${currentT.section5Body}
        </div>

        <div class="section-title">${currentT.section3Title}</div>
        <div class="article-content">
          ${currentT.section3Body}
          <div class="penalty-box">
            <strong>${currentT.penaltyBoxHeader}</strong><br>
            ${currentT.penaltyFixed}<br>
            ${currentT.penaltyRate}
          </div>
          ${currentT.penaltyWarning}
        </div>

        <div class="section-title">${currentT.section4Title}</div>
        <div class="article-content">
          ${currentT.section4Body}
        </div>

        <p style="text-align: right; margin-top: 30px; font-style: italic; font-weight: bold; border-top: 1px dotted #ccc; padding-top: 10px;">
          ${currentT.labelDone}
        </p>

        <!-- Dynamic Signature blocks with full high fidelity seals & drawn signature data -->
        <table class="signature-section" style="width: 100%; border-collapse: separate; border-spacing: 12px; margin-top: 35px; border-top: 2px solid #111827; padding-top: 15px;">
          <tr>
            <!-- Column 1: LENDER (CREDIVITE S.A.) WITH SPACIOUS PACKAGING -->
            <td class="sig-cell" style="width: 33%; vertical-align: top; border: 1px solid #b8c2cc; border-radius: 4px; padding: 12px; background-color: #f4f6f8; position: relative;">
              <strong style="color: #1d4ed8; font-size: 9.5pt; font-family: serif; text-transform: uppercase; display: block; border-bottom: 1px solid #1d4ed8; padding-bottom: 4px; margin-bottom: 6px;">${currentT.labelLender}</strong>
              <span style="font-size: 8pt; color: #4b5563; display: block; margin-bottom: 4px;">Proxy Lendeur: <strong>${lender.name}</strong></span>
              
              <!-- Signature and Overlapping Stamp Area -->
              <div style="height: 80px; position: relative; overflow: visible; display: block; margin-top: 10px;">
                <!-- Simulated or drawn signature -->
                <div style="position: absolute; left: 0; top: 15px; z-index: 10;">
                  ${lender.signatureDrawData ? `
                    <img src="${lender.signatureDrawData}" alt="Signature Prêteur" style="max-height: 55px; max-width: 140px; object-fit: contain;" />
                  ` : lender.signatureType === 'text' && lender.name ? `
                    <span style="font-family: 'Brush Script MT', 'Caveat', cursive, sans-serif; font-size: 15pt; color: #1d4ed8; font-weight: bold;">${lender.name}</span>
                  ` : `
                    <svg width="112" height="40" style="color: #1e3a8a;" viewBox="0 0 140 50" fill="none">
                      <path d="M10,25 Q35,8 45,32 Q75,4 95,28 T130,12 M35,22 L115,26" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                      <path d="M15,15 Q65,42 125,20" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />
                    </svg>
                  `}
                </div>

                <!-- Overlapping Circular Blue Stamp -->
                <div style="position: absolute; right: -5px; top: -5px; z-index: 20; transform: rotate(-6deg); opacity: 0.85;">
                  <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="color: #111827; font-family: monospace; font-weight: bold;">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#1d4ed8" stroke-width="1.8" />
                    <circle cx="50" cy="50" r="41" fill="none" stroke="#1d4ed8" stroke-width="0.8" stroke-dasharray="2, 1.5" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#1d4ed8" stroke-width="1" />
                    
                    <path id="lender-stamp-text-upper" d="M 16,50 A 34,34 0 1,1 84,50" fill="none" />
                    <text font-size="5.2" font-weight="bold" fill="#1d4ed8">
                      <textPath href="#lender-stamp-text-upper" startOffset="50%" text-anchor="middle">
                        ★ CREDIVITE S.A. ★
                      </textPath>
                    </text>
                    
                    <path id="lender-stamp-text-lower" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                    <text font-size="4.5" font-weight="bold" fill="#1d4ed8">
                      <textPath href="#lender-stamp-text-lower" startOffset="50%" text-anchor="middle">
                        ${activeLang === 'FR' ? "CONTRÔLE ADMINISTRATIF" : activeLang === 'IT' ? "CONTROLLO AMMINISTRATIVO" : "DIRECTORATE SECURED LOAN"}
                      </textPath>
                    </text>
                    
                    <text x="50" y="47" font-size="4.2" text-anchor="middle" fill="#1d4ed8">${activeLang === 'FR' ? "OFFICIEL" : activeLang === 'IT' ? "UFFICIALE" : "OFFICIAL"}</text>
                    <text x="50" y="58" font-size="5.2" font-weight="black" text-anchor="middle" fill="#1d4ed8">${activeLang === 'FR' ? "AGRÉÉ" : activeLang === 'IT' ? "APPROVATO" : "APPROVED"}</text>
                  </svg>
                </div>
              </div>
            </td>

            <!-- Column 2: NOTARY (Ericam Dupont/Sebastien Gabard) -->
            <td class="sig-cell" style="width: 33%; vertical-align: top; border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; background-color: #fafbfc; position: relative;">
              <strong style="color: #111827; font-size: 9.5pt; font-family: serif; text-transform: uppercase; display: block; border-bottom: 1px solid #111827; padding-bottom: 4px; margin-bottom: 6px;">${currentT.labelNotary}</strong>
              <span style="font-size: 8pt; color: #4b5563; display: block; margin-bottom: 4px;">Officier: <strong>Me ${notary.name}</strong></span>
              
              <!-- Signature and Overlapping Stamp Area -->
              <div style="height: 80px; position: relative; overflow: visible; display: block; margin-top: 10px;">
                <!-- Simulated or drawn signature -->
                <div style="position: absolute; left: 0; top: 15px; z-index: 10;">
                  ${notary.signatureDrawData ? `
                    <img src="${notary.signatureDrawData}" alt="Signature Notaire" style="max-height: 55px; max-width: 140px; object-fit: contain;" />
                  ` : notary.signatureType === 'text' && notary.name ? `
                    <span style="font-family: 'Brush Script MT', 'Caveat', cursive, sans-serif; font-size: 15pt; color: #2563eb; font-weight: bold;">${notary.name}</span>
                  ` : `
                    <svg width="112" height="40" style="color: #133c87;" viewBox="0 0 140 50" fill="none">
                      <path d="M12,18 C30,35 60,5 75,32 Q105,4 125,18 M20,38 L120,12" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" />
                      <circle cx="45" cy="22" r="3" stroke="currentColor" stroke-width="1" fill="none" />
                    </svg>
                  `}
                </div>

                <!-- Overlapping Circular Red Stamp -->
                <div style="position: absolute; right: -5px; top: -5px; z-index: 20; transform: rotate(8deg); opacity: 0.85;">
                  <svg width="84" height="84" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="color: #111827; font-family: monospace; font-weight: bold;">
                    <circle cx="50" cy="50" r="47" fill="none" stroke="#b91c1c" stroke-width="2" />
                    <circle cx="50" cy="50" r="41" fill="none" stroke="#b91c1c" stroke-width="0.8" stroke-dasharray="1.5, 1" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#b91c1c" stroke-width="1.2" />
                    
                    <path id="notary-stamp-text-upper2" d="M 16,50 A 34,34 0 1,1 84,50" fill="none" />
                    <text font-size="5" font-weight="extrabold" fill="#b91c1c">
                      <textPath href="#notary-stamp-text-upper2" startOffset="50%" text-anchor="middle">
                        * ETUDE DE ME ${notary.name.toUpperCase()} *
                      </textPath>
                    </text>
                    
                    <path id="notary-stamp-text-lower2" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                    <text font-size="4.5" font-weight="bold" fill="#b91c1c">
                      <textPath href="#notary-stamp-text-lower2" startOffset="50%" text-anchor="middle">
                        ${loan.city.toUpperCase()} (${loan.country.toUpperCase()})
                      </textPath>
                    </text>
                    
                    <text x="50" y="47" font-size="4.2" font-style="italic" text-anchor="middle" fill="#b91c1c">${activeLang === 'FR' ? "HOMOLOGUÉ" : activeLang === 'IT' ? "OMOLOGATO" : "COMMISSIONED"}</text>
                    <text x="50" y="58" font-size="5.2" font-weight="bold" text-anchor="middle" fill="#b91c1c">${activeLang === 'FR' ? "SCEAU CIVIL" : activeLang === 'IT' ? "SIGILLO CIVILE" : "STATE SEAL"}</text>
                  </svg>
                </div>
              </div>
            </td>

            <!-- Column 3: BORROWER -->
            <td class="sig-cell" style="width: 33%; vertical-align: top; border: 1px solid #a7f3d0; border-radius: 4px; padding: 12px; background-color: #f0fdf4; position: relative;">
              <strong style="color: #047857; font-size: 9.5pt; font-family: serif; text-transform: uppercase; display: block; border-bottom: 1px solid #047857; padding-bottom: 4px; margin-bottom: 6px;">${currentT.labelBorrower}</strong>
              <span style="font-size: 8pt; color: #4b5563; display: block; margin-bottom: 4px;">Débiteur: <strong>${borrower.name}</strong></span>
              
              <!-- Signature Area -->
              <div style="height: 80px; position: relative; display: block; margin-top: 10px;">
                <div style="position: absolute; left: 0; top: 15px; z-index: 10;">
                  ${borrower.signatureDrawData ? `
                    <img src="${borrower.signatureDrawData}" alt="Signature Emprunteur" style="max-height: 55px; max-width: 140px; object-fit: contain;" />
                  ` : borrower.signatureType === 'text' && borrower.name ? `
                    <span style="font-family: 'Brush Script MT', 'Caveat', cursive, sans-serif; font-size: 15pt; color: #047857; font-weight: bold;">${borrower.name}</span>
                  ` : `
                    <div style="border-bottom: 2px dashed #059669; width: 100px; padding-top: 25px; height: 1px;"></div>
                  `}
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Superimposed Official Stamp (optional) -->
        ${styling.showStamp ? `
          <div style="position: absolute; right: 40px; bottom: 120px; transform: rotate(${styling.stampRotation || -15}deg) scale(0.9); opacity: 0.95; z-index: 100;">
            <svg width="125" height="125" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="71" fill="none" stroke="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" stroke-width="1.5" stroke-dasharray="3,3" />
              <circle cx="75" cy="75" r="67" fill="none" stroke="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" stroke-width="2.5" />
              <circle cx="75" cy="75" r="46" fill="none" stroke="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" stroke-width="1.2" />
              <path id="stamp-text-upper-exp" d="M 18,75 A 57,57 0 1,1 132,75" fill="none" />
              <text font-family="monospace" font-size="8.2" font-weight="bold" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" letter-spacing="1.2">
                <textPath href="#stamp-text-upper-exp" startOffset="50%" text-anchor="middle">
                  * ÉTUDE NOTARIALE DE ME ${notary.name.toUpperCase()} *
                </textPath>
              </text>
              <path id="stamp-text-lower-exp" d="M 132,75 A 57,57 0 1,1 18,75" fill="none" />
              <text font-family="monospace" font-size="8" font-weight="bold" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" letter-spacing="1.5">
                <textPath href="#stamp-text-lower-exp" startOffset="50%" text-anchor="middle">
                  ${loan.city.toUpperCase()} (${loan.country.toUpperCase()}) * SERVICES NOTARIAUX
                </textPath>
              </text>
              <g stroke="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}" stroke-width="1">
                <path d="M60,95 L90,95 M67,93 L83,93 M75,93 L75,55 M70,55 L80,55" stroke-width="1.5" />
                <path d="M53,59 Q75,54 97,59" stroke-width="2" fill="none" />
                <path d="M53,59 L48,75 M53,59 L58,75" />
                <path d="M48,75 Q53,78 58,75" fill="none" />
                <path d="M97,59 L92,75 M97,59 L102,75" />
                <path d="M92,75 Q97,78 102,75" fill="none" />
                <circle cx="75" cy="50" r="2.5" />
              </g>
              <text x="75" y="44" font-family="serif" font-size="6.5" font-weight="bold" text-anchor="middle" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}">
                OFFICIEL
              </text>
              <text x="75" y="105" font-family="serif" font-size="6" font-style="italic" text-anchor="middle" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}">
                Sceau d'État
              </text>
            </svg>
          </div>
        ` : ''}
      </body>
      </html>
    `;

    if (format === 'html') {
      let htmlWithEditor = '';
      
      if (exportMode === 'editable') {
        // Add custom helper stylesheet for HTML version in EDITABLE mode, without any banner at the top of the body
        htmlWithEditor = fileHtml.replace(
          '</head>',
          `  <style>
               @media print { .print-hidden { display: none !important; } }
               [contenteditable="true"]:focus { outline: 2px dashed #f59e0b; background-color: rgba(245, 158, 11, 0.05); }
             </style>
           </head>`
        ).replace(
          '<body>',
          `<body contenteditable="true" style="padding: 20px 40px; font-family: 'Times New Roman', Times, serif; background-color: #f8fafc; min-height: 100vh;">`
        );
      } else {
        // Add static locked style for OFFICIAL/NON-MODIFIABLE mode, without any banner at the top of the body
        htmlWithEditor = fileHtml.replace(
          '</head>',
          `  <style>
               @media print { .print-hidden { display: none !important; } }
             </style>
           </head>`
        ).replace(
          '<body>',
          `<body style="padding: 20px 40px; font-family: 'Times New Roman', Times, serif; background-color: #f8fafc; min-height: 100vh;">`
        );
      }

      const blob = new Blob(['\ufeff', htmlWithEditor], {
        type: 'text/html;charset=utf-8'
      });
      
      const url = URL.createObjectURL(blob);
      const tmpAnchor = document.createElement('a');
      tmpAnchor.href = url;

      const filePrefix = exportMode === 'editable'
        ? (activeLang === 'FR' ? 'contrat_pret_modifiable_android_' : activeLang === 'IT' ? 'contratto_prestito_modificabile_' : 'editable_loan_agreement_')
        : (activeLang === 'FR' ? 'contrat_pret_officiel_fige_android_' : activeLang === 'IT' ? 'contratto_prestito_fissato_' : 'official_non_editable_loan_agreement_');
      
      tmpAnchor.download = `${filePrefix}${lender.name.replace(/\s+/g, '_')}_${borrower.name.replace(/\s+/g, '_')}.html`;
      
      document.body.appendChild(tmpAnchor);
      tmpAnchor.click();
      document.body.removeChild(tmpAnchor);
      
      const feedbackMsg = exportMode === 'editable'
        ? (activeLang === 'FR' ? "Format HTML Éditable (.html) généré ! Ouvrez-le directement sur votre Android ou PC pour modifier librement et imprimer en PDF propre."
           : activeLang === 'IT' ? "Documento HTML modificabile (.html) generato! Aprilo direttamente su Android o PC per modificare e stampare come PDF sano."
           : "Editable HTML document (.html) successfully generated! Open it on Android or PC to edit and print to PDF.")
        : (activeLang === 'FR' ? "Format HTML Officiel Figé (.html) généré sous forme sécurisée non modifiable !"
           : activeLang === 'IT' ? "Documento HTML ufficiale fissato (.html) scaricato con successo!"
           : "Official secure non-editable HTML document (.html) generated successfully!");
        
      setBannerAlert(feedbackMsg);
    } else {
      // Package as Word Document (.doc) - with a custom filename according to selected language
      const blob = new Blob(['\ufeff', fileHtml], {
        type: 'application/msword;charset=utf-8'
      });
      
      const url = URL.createObjectURL(blob);
      const tmpAnchor = document.createElement('a');
      tmpAnchor.href = url;

      const filePrefix = exportMode === 'editable'
        ? (activeLang === 'FR' ? 'contrat_pret_notarie_modifiable_' : activeLang === 'IT' ? 'contratto_prestito_notarile_modificabile_' : 'editable_notarial_loan_agreement_')
        : (activeLang === 'FR' ? 'contrat_pret_notarie_officiel_fige_' : activeLang === 'IT' ? 'contratto_prestito_notarile_originale_' : 'original_secured_loan_agreement_');
      
      tmpAnchor.download = `${filePrefix}${lender.name.replace(/\s+/g, '_')}_${borrower.name.replace(/\s+/g, '_')}.doc`;
      
      document.body.appendChild(tmpAnchor);
      tmpAnchor.click();
      document.body.removeChild(tmpAnchor);
      
      const feedbackMsg = exportMode === 'editable'
        ? (activeLang === 'FR' ? "Version Word (.doc) Modifiable générée ! Idéal pour Microsoft Word sur ordinateur PC."
           : activeLang === 'IT' ? "Versione Word (.doc) modificabile scaricata con successo! Consigliata per Microsoft Word su PC."
           : "Editable Word (.doc) version successfully generated and downloaded for full customization!")
        : (activeLang === 'FR' ? "Version Word (.doc) Officielle Figée générée ! Protégée contre les déréglages involontaires."
           : activeLang === 'IT' ? "Versione Word (.doc) ufficiale fissa scaricata! Consigliata per Microsoft Word su PC."
           : "Official secure non-editable Word (.doc) version successfully generated and downloaded!");
        
      setBannerAlert(feedbackMsg);
    }
  };

  return (
    <div id="notary-app-root" className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col h-screen overflow-hidden print:bg-white print:h-auto print:overflow-visible">
      
      {/* GLOBAL CSS CUSTOM OVERRIDES AND ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, html, #notary-app-root, #action-menu-view-contract {
            background: white !important;
            color: black !important;
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            position: relative !important;
          }
          #printed-contract-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            background: white !important;
          }
          #notary-wizard-container, #alert-status-banner, .print\\:hidden, button {
            display: none !important;
          }
          #contract-paper-a4-viewport {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
          }
          #printed-contract-sheet * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=La+Belle+Aurore&family=Reenie+Beanie&family=Nothing+You+Could+Do&display=swap');
        
        .font-signature1 { font-family: 'Caveat', cursive; font-weight: 700; }
        .font-signature2 { font-family: 'La Belle Aurore', cursive; }
        .font-signature3 { font-family: 'Nothing You Could Do', cursive; font-weight: bold; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />

      {/* TOP HEADER FLAG BAR FOR BOTH MODES */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-3 flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-3 z-10 print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg shadow-md">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Générateur d'Acte Notarié</span>
            <span className="text-[10px] text-zinc-400 block font-mono">Administration & Sceau de l'État</span>
          </div>
        </div>

        {/* Dynamic Interactive Tab Switcher - Works on both Android and Computer */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 max-w-sm w-full md:w-auto">
          <button
            id="tab-edit-mode"
            onClick={() => setIsGenerated(false)}
            className={`flex-1 md:flex-initial py-1.5 px-3.5 text-center text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 w-[140px] ${!isGenerated ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            ⚙️ Modifier Saisie
          </button>
          <button
            id="tab-preview-mode"
            onClick={() => {
              setIsGenerated(true);
              setBannerAlert("Mode Aperçu de l'Acte Contractuel Activé.");
            }}
            className={`flex-1 md:flex-initial py-1.5 px-3.5 text-center text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 w-[140px] ${isGenerated ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            📄 Acte Contrat
          </button>
        </div>

        {/* Action Status Bar */}
        <div className="hidden md:flex items-center gap-2.5 text-xs text-slate-400">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-mono">Procédure légale certifiée</span>
        </div>
      </div>

      {/* COMPACT FLOATING NOTIFICATION BANNER */}
      {bannerAlert && (
        <div id="alert-status-banner" className="bg-amber-500/10 border-b border-amber-500/25 px-4 sm:px-6 py-2.5 text-xs text-amber-300 font-medium flex items-center justify-between gap-3 flex-shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
            <span>{bannerAlert}</span>
          </div>
          <button onClick={() => setBannerAlert(null)} className="text-amber-400 hover:text-white font-bold text-sm">×</button>
        </div>
      )}

      {/* CORE CONTENT SPLIT ACCORDING TO USER'S DIRECTIVE GOAL */}
      <div className="flex-1 overflow-hidden print:overflow-visible flex flex-col">
        {!isGenerated ? (
          
          /* ==========================================
             STAGE A: FULL ADMINISTRATIVE SIZING FORM
             ========================================== */
          <div id="notary-wizard-container" className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 bg-[#0b0f19] flex justify-center items-start">
            <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
              
              {/* Wizard Section Banner */}
              <div className="bg-gradient-to-r from-blue-950 to-slate-900 border-b border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-amber-500" />
                    Fiche Administrative Civile - Enregistrement d'Acte Obligataire
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Conformez l'ensemble des informations de crédit d'après le greffe légal italien ou français.</p>
                </div>
                
                {/* Preset Fast Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => buildPreset('default')} 
                    className="p-1 px-2.5 bg-blue-900/40 hover:bg-blue-900/70 text-blue-300 hover:text-white text-[11px] font-bold rounded-md border border-blue-800 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset original
                  </button>
                  <button 
                    onClick={() => buildPreset('clean')} 
                    className="p-1 px-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[11px] font-bold rounded-md border border-slate-700 transition-colors"
                  >
                    Vider la fiche
                  </button>
                </div>
              </div>

              {/* Wizard Steps Timeline Indicator */}
              <div className="grid grid-cols-4 bg-slate-950/60 text-xs border-b border-slate-800.5 py-3">
                <button 
                  onClick={() => setWizardStep(1)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1 text-center font-bold ${wizardStep === 1 ? 'text-amber-500' : 'text-slate-500'}`}
                >
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full text-[10px] ${wizardStep === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>1</div>
                  <span className="hidden sm:inline">Créancier / Prêteur</span>
                </button>
                <button 
                  onClick={() => setWizardStep(2)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1 text-center font-bold ${wizardStep === 2 ? 'text-amber-500' : 'text-slate-500'}`}
                >
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full text-[10px] ${wizardStep === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>2</div>
                  <span className="hidden sm:inline">Débiteur / Emprunteur</span>
                </button>
                <button 
                  onClick={() => setWizardStep(3)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1 text-center font-bold ${wizardStep === 3 ? 'text-amber-500' : 'text-slate-500'}`}
                >
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full text-[10px] ${wizardStep === 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>3</div>
                  <span className="hidden sm:inline">Conditions Prêt</span>
                </button>
                <button 
                  onClick={() => setWizardStep(4)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1 text-center font-bold ${wizardStep === 4 ? 'text-amber-500' : 'text-slate-500'}`}
                >
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full text-[10px] ${wizardStep === 4 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>4</div>
                  <span className="hidden sm:inline">Notaire & Design</span>
                </button>
              </div>

              {/* Wizard Multi-Step Form Layout */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* STEP 1: LENDER DETAILED INFORMATIONS */}
                {wizardStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-blue-900/60">
                      <Award className="h-5 w-5 text-blue-400" />
                      <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Étape 1 : Identification Légale du Prêteur (Créancier)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Nom civil complet</label>
                        <input 
                          type="text" 
                          value={lender.name} 
                          onChange={(e) => handleLenderChange('name', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Profession active</label>
                        <input 
                          type="text" 
                          value={lender.profession} 
                          onChange={(e) => handleLenderChange('profession', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Né(e) le (JJ/MM/AAAA)</label>
                        <input 
                          type="text" 
                          value={lender.birthDate} 
                          onChange={(e) => handleLenderChange('birthDate', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Lieu officiel de naissance</label>
                        <input 
                          type="text" 
                          value={lender.birthPlace} 
                          onChange={(e) => handleLenderChange('birthPlace', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-300 font-medium block mb-1">Adresse physique de résidence fiscale</label>
                      <input 
                        type="text" 
                        value={lender.address} 
                        onChange={(e) => handleLenderChange('address', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Série / N° Pièce d'identité</label>
                        <input 
                          type="text" 
                          value={lender.idNumber} 
                          onChange={(e) => handleLenderChange('idNumber', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Délivrée par</label>
                        <input 
                          type="text" 
                          value={lender.idIssuedBy || ''} 
                          onChange={(e) => handleLenderChange('idIssuedBy', e.target.value)}
                          placeholder="Administration / Questura"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1 font-mono text-slate-400">Date de délivrance</label>
                        <input 
                          type="text" 
                          value={lender.idIssuedDate || ''} 
                          onChange={(e) => handleLenderChange('idIssuedDate', e.target.value)}
                          placeholder="Ex: 12/10/2021"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">Adresse email civile (fiscale)</label>
                        <input 
                          type="email" 
                          value={lender.email} 
                          onChange={(e) => handleLenderChange('email', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">N° de Téléphone d'urgence</label>
                        <input 
                          type="text" 
                          value={lender.phone} 
                          onChange={(e) => handleLenderChange('phone', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    {/* Pre-signature pad visual inside the wizard */}
                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-300 block">Signature officielle du prêteur (Bertytru)</span>
                        <span className="text-[10px] text-slate-500">Choisissez de dessiner directement votre paraphe manuellement à l'encre d'Italie.</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSigTarget('lender')}
                          className="p-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 hover:text-black font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1"
                        >
                          <PenTool className="h-3.5 w-3.5" />
                          Tracer une signature à la main
                        </button>
                        {lender.signatureDrawData && (
                          <button 
                            onClick={() => clearSignatureData('lender')} 
                            className="p-2 border border-slate-800 hover:bg-slate-800 text-zinc-400 hover:text-white font-medium text-xs rounded-lg transition"
                          >
                            Réinitialiser
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: BORROWER DETAILED INFORMATIONS */}
                {wizardStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-blue-900/60">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Étape 2 : Identification Légale de l'Emprunteur (Débiteur)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Nom civil complet</label>
                        <input 
                          type="text" 
                          value={borrower.name} 
                          onChange={(e) => handleBorrowerChange('name', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Profession / Rôle d'emploi</label>
                        <input 
                          type="text" 
                          value={borrower.profession} 
                          onChange={(e) => handleBorrowerChange('profession', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Société Employeuse</label>
                        <input 
                          type="text" 
                          value={borrower.employer || ''} 
                          onChange={(e) => handleBorrowerChange('employer', e.target.value)}
                          placeholder="Ex: Global Strategy SRL"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Revenu Mensuel Déclaré Net</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={borrower.monthlyIncome || 0} 
                            onChange={(e) => handleBorrowerChange('monthlyIncome', Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none" 
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-slate-500 font-bold">{loan.currency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Né(e) le (JJ/MM/AAAA)</label>
                        <input 
                          type="text" 
                          value={borrower.birthDate} 
                          onChange={(e) => handleBorrowerChange('birthDate', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Lieu officiel de naissance</label>
                        <input 
                          type="text" 
                          value={borrower.birthPlace} 
                          onChange={(e) => handleBorrowerChange('birthPlace', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-300 font-medium block mb-1">Adresse de résidence fiscale habituelle</label>
                      <input 
                        type="text" 
                        value={borrower.address} 
                        onChange={(e) => handleBorrowerChange('address', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Série / N° Pièce d'identité</label>
                        <input 
                          type="text" 
                          value={borrower.idNumber} 
                          onChange={(e) => handleBorrowerChange('idNumber', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Émetteur légal</label>
                        <input 
                          type="text" 
                          value={borrower.idIssuedBy || ''} 
                          onChange={(e) => handleBorrowerChange('idIssuedBy', e.target.value)}
                          placeholder="Gouvernement"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Date d'échéance délivrance</label>
                        <input 
                          type="text" 
                          value={borrower.idIssuedDate || ''} 
                          onChange={(e) => handleBorrowerChange('idIssuedDate', e.target.value)}
                          placeholder="JJ/MM/AAAA"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">Adresse email personnelle</label>
                        <input 
                          type="email" 
                          value={borrower.email} 
                          onChange={(e) => handleBorrowerChange('email', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">N° de mobile de contact</label>
                        <input 
                          type="text" 
                          value={borrower.phone} 
                          onChange={(e) => handleBorrowerChange('phone', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-300 block">Signature officielle de l'emprunteur (Annesse)</span>
                        <span className="text-[10px] text-slate-500">Tracez votre propre paraphe à l'encre ci-dessous.</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSigTarget('borrower')}
                          className="p-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1"
                        >
                          <PenTool className="h-3.5 w-3.5" />
                          Tracer la signature debiteur
                        </button>
                        {borrower.signatureDrawData && (
                          <button 
                            onClick={() => clearSignatureData('borrower')} 
                            className="p-2 border border-slate-800 hover:bg-slate-800 text-zinc-400 hover:text-white font-medium text-xs rounded-lg transition"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: FINANCIAL PARAMETERS */}
                {wizardStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-blue-900/60">
                      <CreditCard className="h-5 w-5 text-amber-500" />
                      <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Étape 3 : Conditions Financières, Termes & Échéances de Prêt</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Montant global du Capital Prêté</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={loan.amount} 
                            onChange={(e) => handleLoanChange('amount', Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500" 
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">{loan.currency}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-zinc-300 font-medium block mb-1">Devise légale</label>
                          <select 
                            value={loan.currency} 
                            onChange={(e) => handleLoanChange('currency', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                          >
                            <option value="€">Euro (€)</option>
                            <option value="$">Dollar USD ($)</option>
                            <option value="FCFA">Franc CFA (FCFA)</option>
                            <option value="CHF">Franc Suisse (CHF)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-300 font-medium block mb-1">Intérêt Annuel (%)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={loan.interestRate} 
                            onChange={(e) => handleLoanChange('interestRate', parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none font-mono font-bold" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Loan Duration with nice slider */}
                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-lg">
                      <label className="text-xs text-zinc-300 font-medium flex justify-between mb-1.5">
                        <span>Durée conventionnelle d'amortissement : <strong>{loan.durationMonths} mois</strong></span>
                        <span className="text-slate-500 font-mono">({(loan.durationMonths / 12).toFixed(1)} ans)</span>
                      </label>
                      <input 
                        type="range" 
                        min="3" 
                        max="120" 
                        step="1"
                        value={loan.durationMonths} 
                        onChange={(e) => handleLoanChange('durationMonths', Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                      />
                      <div className="flex justify-between text-[9px] text-zinc-500 mt-1">
                        <span>3 mois</span>
                        <span>60 mois (5 ans)</span>
                        <span>120 mois (10 ans)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-300 font-medium block mb-1">Motif formel administratif d'utilisation des fonds (Tracé obligatoire)</label>
                      <input 
                        type="text" 
                        value={loan.fundPurpose} 
                        onChange={(e) => handleLoanChange('fundPurpose', e.target.value)}
                        placeholder="Ex: Régulation de dettes familiales et expansion locative certifiée..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                      />
                      <span className="text-[9px] text-slate-500 mt-1 block font-sans">Ce motif est requis par les autorités publiques d'enregistrement anti-blanchiment d'Europe.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-1">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Fréquence de Remboursement</label>
                        <select 
                          value={loan.repaymentFrequency} 
                          onChange={(e) => handleLoanChange('repaymentFrequency', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                        >
                          <option value="mensuel">Mensuelle (Amortissement classique)</option>
                          <option value="trimestriel">Trimestrielle (Tous les 3 mois)</option>
                          <option value="unique">En une fois libératoire à l'échéance finale</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Date exacte de Signature contractuelle</label>
                        <input 
                          type="date" 
                          value={loan.dateSigned} 
                          onChange={(e) => handleLoanChange('dateSigned', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none font-mono" 
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-blue-900/40 bg-blue-950/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-0.5">Date première mensualité :</span>
                        <strong className="text-white block font-mono">
                          {loan.firstRepaymentDate ? new Date(loan.firstRepaymentDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-0.5">Échéance finale d'amortissement complète :</span>
                        <strong className="text-amber-400 block font-mono">
                          {loan.finalRepaymentDate ? new Date(loan.finalRepaymentDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: NOTARY DETAILS & SANCTIONS/PÉNALITÉS RETARD */}
                {wizardStep === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-blue-900/60">
                      <Scale className="h-5 w-5 text-amber-500" />
                      <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Étape 4 : Dispositions administratives, Sanctions de retard & Sceau</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Nom du Notaire Instrumentant</label>
                        <input 
                          type="text" 
                          value={notary.name} 
                          onChange={(e) => handleLenderChange('name', e.target.value)} /* Direct binding */
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white cursor-not-allowed opacity-75"
                          disabled={true} // Notary defaults to Ericam Dupont but still editable in other ways if they want, but here we enforce original preset
                        />
                        <span className="text-[9px] text-slate-500 mt-1 block">Régulé sous l'Étude notariale de Maître {notary.name}.</span>
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">N° Licence Professionnelle de l'Étude</label>
                        <input 
                          type="text" 
                          value={loan.notaryLicense} 
                          onChange={(e) => handleLoanChange('notaryLicense', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Taux Pénalités mensuelles de Retard (%)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            step="0.1"
                            value={loan.penaltyRate} 
                            onChange={(e) => handleLoanChange('penaltyRate', parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono" 
                          />
                          <span className="absolute right-3 top-2 text-xs text-slate-500 font-mono">% mensuel</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Pénalité Forfaitaire de Retard Fixe</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={loan.penaltyFixedAmount} 
                            onChange={(e) => handleLoanChange('penaltyFixedAmount', Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono" 
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-slate-500 font-bold">{loan.currency} / mois</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Commission Homologation d'Étude</label>
                        <input 
                          type="number" 
                          value={loan.feeAmount} 
                          onChange={(e) => handleLoanChange('feeAmount', Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono" 
                        />
                      </div>
                      
                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Taux TVA fiscal d'État (%)</label>
                        <input 
                          type="number" 
                          value={loan.tvaRate} 
                          onChange={(e) => handleLoanChange('tvaRate', Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono" 
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium block mb-1">Sceau Notaire d'État</label>
                        <select 
                          value={styling.stampColor} 
                          onChange={(e) => handleStylingChange('stampColor', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                        >
                          <option value="text-blue-700">Bleu Encre Notaire 🔵</option>
                          <option value="text-red-700">Rouge Fiscal 🔴</option>
                          <option value="text-emerald-700">Sceau Vert 🟢</option>
                          <option value="text-slate-800">Noir ⚰️</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/20 border border-slate-850 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">Drapeau d'Entête Gauche</label>
                        <select 
                          value={styling.flagLeft} 
                          onChange={(e) => handleStylingChange('flagLeft', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                        >
                          <option value="IT">Italie 🇮🇹</option>
                          <option value="FR">France 🇫🇷</option>
                          <option value="EU">Union Européenne 🇪🇺</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 font-medium block mb-1">Drapeau d'Entête Droit</label>
                        <select 
                          value={styling.flagRight} 
                          onChange={(e) => handleStylingChange('flagRight', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                        >
                          <option value="FR">France 🇫🇷</option>
                          <option value="IT">Italie 🇮🇹</option>
                          <option value="EU">Union Européenne 🇪🇺</option>
                        </select>
                      </div>
                    </div>

                    {/* Pre-signature for Notary */}
                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-300 block">Signer l'homologation de l'acte par le Notaire</span>
                        <span className="text-[10px] text-zinc-500">Mettez sous Sceau de l'État votre autorisation.</span>
                      </div>
                      <button 
                        onClick={() => setSigTarget('notary')}
                        className="p-2 px-3 bg-[#1e293b] hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-700 transition flex items-center gap-1"
                      >
                        <PenTool className="h-3.5 w-3.5" />
                        Dessiner signature du Notaire (Ericam)
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Wizard Bottom Buttons Panel */}
              <div className="bg-slate-950 border-t border-slate-855 p-5 flex items-center justify-between">
                <div>
                  {wizardStep > 1 ? (
                    <button 
                      onClick={() => setWizardStep(prev => prev - 1)}
                      className="p-2 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg transition flex items-center gap-1.5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </button>
                  ) : <div />}
                </div>

                <div className="flex gap-2.5">
                  {wizardStep < 4 ? (
                    <button 
                      onClick={() => setWizardStep(prev => prev + 1)}
                      className="p-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsGenerated(true);
                        setBannerAlert("Acte Authentique Généré sous Sceau d'État avec Succès ! Utilisez les options en haut du contrat pour télécharger ou imprimer.");
                      }}
                      className="p-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-lg transition-all shadow-md flex items-center gap-2 tracking-wider uppercase scale-105 active:scale-100"
                    >
                      <Check className="h-4 w-4 stroke-[3px]" />
                      Générer le contrat de prêt
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          
          /* ==========================================
             STAGE B: DOCUMENT GENERATED & SUBLIME VIEW
             ========================================== */
          <div id="action-menu-view-contract" className="flex-1 flex flex-col min-h-0 bg-[#0f172a] print:bg-white">
            
            {/* Top high-end administrative action control dashboard */}
            <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden flex-shrink-0">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="p-2 px-4 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg transition flex items-center gap-2 shadow-xs"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Modifier les informations (Retour)
                </button>
                <div className="hidden lg:flex items-center gap-1.5 text-xs text-lime-400 font-medium uppercase font-mono bg-lime-500/10 px-2.5 py-1 rounded-sm border border-lime-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-ping"></span>
                  Acte Officiel Validé
                </div>
              </div>

              {/* The major goal download options HTML, WORD & PDF */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={triggerPrintPDF}
                  className="w-full sm:w-auto p-2.5 px-4.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-extrabold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-md uppercase tracking-wide"
                  title="Ouvrir l'imprimante système pour enregistrer en PDF propre A4"
                >
                  <Printer className="h-4 w-4 text-slate-300" />
                  Imprimer / PDF
                </button>
                
                <button
                  onClick={() => triggerDownloadContract('html')}
                  className="w-full sm:w-auto p-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-lg transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer scale-102 active:scale-98 animate-pulse"
                  title="Télécharger l'acte au format HTML 100% éditable (Recommandé pour smartphones, tablettes Android et PC)"
                >
                  <FileText className="h-4 w-4" />
                  HTML Modifiable (Conseillé Android/PC)
                </button>

                <button
                  onClick={() => triggerDownloadContract('doc')}
                  className="w-full sm:w-auto p-2.5 px-4 bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-200 font-extrabold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-md uppercase tracking-wide"
                  title="Télécharger sous format classique .doc pour Microsoft Word sur ordinateur"
                >
                  <FileDown className="h-4 w-4 text-slate-400" />
                  Word (.doc) PC
                </button>
              </div>

            </div>

            {/* Version choice bar (locked vs editable) */}
            <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 print:hidden flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-wide font-mono">Format requis</span>
                <span className="text-slate-300 text-xs font-semibold font-sans">Choisissez la version souhaitée pour l'impression ou l'exportation :</span>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setExportMode('official');
                    setBannerAlert("Version Officielle Figée sélectionnée : Rendu judiciaire authentique, non-modifiable et prêt pour la signature administrative.");
                  }}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    exportMode === 'official'
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-102 font-black'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                  title="Génère l'acte homologué sous sa forme définitive scellée conforme."
                >
                  <Lock className="h-3.5 w-3.5" />
                  🔒 Version Figée (Officielle)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportMode('editable');
                    setBannerAlert("Version Modifiable activée ! Vous pouvez double-cliquer ou taper directement sur n'importe quel texte du contrat ci-dessous pour le corriger en direct avant d'imprimer ou de le télécharger.");
                  }}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    exportMode === 'editable'
                      ? 'bg-emerald-500 text-slate-950 shadow-md scale-102 font-black animate-pulse'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                  title="Permet l'édition de texte à la volée sur l'aperçu A4 avant l'enregistrement."
                >
                  <Edit className="h-3.5 w-3.5" />
                  ✍️ Version Modifiable (Éditeur)
                </button>
              </div>
            </div>

            {/* A4 PAPER CONTRACT RENDERING SPACE */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#151c2c] print:p-0 print:bg-white">
              <div id="document-paper-box" className="mx-auto max-w-3xl border border-slate-850 shadow-2xl rounded-sm">
                
                {/* Real-time document rendering info */}
                <div className="bg-slate-950 border-b border-slate-850 p-4 text-xs rounded-t-sm print:hidden space-y-3.5">
                  <div className="text-amber-400 flex items-start gap-2.5">
                    <AlertTriangle className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Aperçu d'impression A4 optimal :</strong> Pour un rendu visuel impeccable, assurez-vous d'activer l'option <strong>« Graphismes d'arrière-plan » (ou Background graphics)</strong> dans les réglages système de votre imprimante ou navigateur. Cela intégrera parfaitement la balance de justice en filigrane de fond de page et le cachet authentique à l'encre !
                    </div>
                  </div>
                  <div className="border-t border-slate-850 pt-3 text-cyan-300 flex items-start gap-2.5">
                    <div className="h-4 w-4 text-cyan-400 font-bold flex-shrink-0 text-center bg-cyan-500/20 rounded-full flex items-center justify-center text-[9px] mt-0.5">i</div>
                    <div>
                      <strong>Avis Android & Compatibilité Mobile :</strong> Les applications mobiles d'Office (comme Microsoft Word Mobile ou Google Docs sur Android) refusent d'ouvrir les fichiers d'ordinateurs classiques .doc et affichent à tort que le fichier est <em>« endommagé »</em>. <strong className="text-emerald-400">Pour modifier le document directement sur votre téléphone Android ou PC, téléchargez la version « HTML Modifiable (Conseillé Android/PC) » : elle s'ouvre instantanément sans aucune erreur, et vous permet de modifier n'importe quel texte en tapant simplement dessus avant d'enregistrer l'acte final en PDF !</strong>
                    </div>
                  </div>
                </div>

                <ContractPreview
                  lender={lender}
                  borrower={borrower}
                  notary={notary}
                  loan={loan}
                  styling={styling}
                  onOpenSignature={(party) => setSigTarget(party)}
                  fontFamily={fontFamily}
                  exportMode={exportMode}
                />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 6. MODALS FOR ASSIGNED SIGNATURE DRAW CANVASES */}
      <SignaturePad
        isOpen={sigTarget !== null}
        onClose={() => setSigTarget(null)}
        onSave={saveSignature}
        title={`Assigner la signature dessinée officielle de : ${
          sigTarget === 'lender' ? lender.name : 
          sigTarget === 'borrower' ? borrower.name : 
          `Me ${notary.name} (Notaire)`
        }`}
      />

    </div>
  );
}
