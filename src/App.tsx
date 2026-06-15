/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PartyDetails, LoanDetails, StylingDetails, ContractType, DocumentViewType } from './types';
import { SignaturePad } from './components/SignaturePad';
import { ContractPreview } from './components/ContractPreview';
import { tWordFallback } from './components/wordTranslationsFallback';
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
  Download,
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
  RefreshCw,
  Award,
  BookOpen,
  ShieldCheck,
  Lock,
  Edit
} from 'lucide-react';

const baseTemplateForTranslation = {
  headerUnion: "UNION EUROPÉENNE",
  headerBanking: "AUTORITÉ BANCAIRE EUROPÉENNE",
  headerBar: "ORDRES DES AVOCATS ET GREFFE CIVIL",
  headerCabinet: "OFFICE NOTARIAL ET CONTROLE DES FONDS",
  contractTitle: "CONTRAT DE PRÊT",
  introText: "Le présent contrat de prêt prend effet à compter du [DATE_SIGNED], après signatures de :",
  lenderRole: "M. / Mme [NAME] (PRÊTEUR), coordinateur principal de SMART PRESTITO SERVICES S.A. pour la division CREDIVITE S.A., résident à [ADDRESS].",
  borrowerRole: "Et M. / Mme [NAME] (EMPRUNTEUR), résident à [ADDRESS].",
  preambleTitle: "PREAMBULE",
  preambleClause1: "Considérant que l'emprunteur a sollicité auprès du prêteur un prêt de [AMOUNT] sur une durée de remboursement de [DURATION] mois et avec un taux d'intérêt fixe de [RATE]%.",
  preambleClause2: "Considérant que le prêteur accepte de lui octroyer ce prêt pour la réalisation de son projet socio-humanitaire ou d'investissement personnel confidentiel.",
  preambleClause3: "Considérant que l'emprunteur s'engage solennellement devant la justice civile à rembourser ce prêt conformément aux conditions stipulées et de bonne foi,",
  partiesAgree: "LES PARTIES CONVIENNENT DE CE QUI SUIT :",
  closingRemarks: "Dans le cas où les retards seraient dument justifiés par l'emprunteur, l'autorité financière compétente ou le tribunal civil décidera d'un commun accord.",
  labelBorrower: "L'EMPRUNTEUR (DÉBITEUR)",
  labelLender: "LE PRÊTEUR (CRÉANCIER)",
  labelNotary: "LE NOTAIRE (OFFICIER CIVIL)",

  // Personal Loan Articles
  art1Title: "1. OBLIGATION DE REMBOURSEMENT UNIQUE",
  art1Content: "L'emprunteur s'engage à rembourser, sans préjudice, un montant total de [TOTAL] sur l'échéance contractuelle de [DURATION] mois. Les opérations de versement démarreront sous un délai de carence maximum de 90 jours (3 mois) après réception des fonds sur son compte bancaire.",
  paramTitle: "CALCUL CONSOLIDE DU DISPOSITIF DE PRÊT",
  paramLoan: "Montant principal du prêt :",
  paramTotal: "Montant total de remboursement :",
  paramRate: "Taux d'intérêt annuel fixe :",
  paramInstallment: "Mensualité de remboursement :",
  paramInterest: "Cumul total des intérêts civils :",
  paramDuration: "Durée globale d'amortissement :",
  art2Title: "2. ÉCHÉANCIER DE VERSEMENT",
  art2Content: "L'emprunteur procédera au paiement régulier comme suit : règlement fractionné de [DURATION] mensualités d'égales valeurs s'élevant chacune à [INSTALLMENT], fixées au [DAY] de chaque mois consécutif.",
  art3Title: "3. REMBOURSEMENT ANTICIPÉ",
  art3Content: "L'emprunteur dispose de la faculté d'éteindre sa dette à tout moment sans frais supplémentaires par un remboursement anticipé de l'intégralité du solde résiduel dû.",
  art4Title: "4. RESPONSABILITÉ JURIDIQUE CIVILE",
  art4Content: "Bien que le présent acte implique d'autres intervenants de contrôle, l'Emprunteur demeure seul et unique responsable légal de la bonne réalisation des obligations financières souscrites d'office.",
  art5Title: "5. ASSURANCE ET FRAIS DE GARANTIE ACTE",
  art5Content: "Le bénéficiaire doit certifier sa demande par le versement obligatoire de l'assurance crédit. Suite à la signature, l'emprunteur devra s'acquitter de la somme de [FEE] pour la garantie obligatoire de son dossier auprès de l'assureur agréé, préalablement au virement des fonds de [AMOUNT].",
  art6Title: "6. DÉFAUT DE REMBOURSEMENT ET SANCTIONS",
  art6Content: "Tout manquement répété ou non-respect de l'acte sans justification légale validée par l'autorité compétente entraînera des poursuites directes ainsi que la révocation immédiate des délais de paiement consentis d'office.",
  art7Title: "7. JURIDICTION ET DROIT DE COMPENSAZIONE",
  art7Content: "Après trois échéances impayées et sans justification appropriée validée, l'acte devient dument exécutoire et le prêteur obtiendra la compensation totale ou partielle par l'assureur crédit agréé à la hauteur des montants en souffrance.",

  // B2B specific template fields
  b2bContractTitle: "CONTRAT DE PRÊT COMMERCIAL (B2B)",
  b2bIntroText: "Le présent accord de trésorerie professionnelle prend effet le [DATE_SIGNED], convenu d'un commun accord entre :",
  b2bLenderRole: "La Société [NAME] (CRÉANCIER / PRÊTEUR PROFESSIONNEL), ayant son siège social à [ADDRESS].",
  b2bBorrowerRole: "Et la Société [NAME] (EMPRUNTEUR CORPORATIF), sise à [ADDRESS].",
  b2bPreambleTitle: "EXPOSÉ DES MOTIFS (PRÉAMBULE)",
  b2bPreambleClause1: "Considérant que l'Emprunteur Corporatif a sollicité auprès du Prêteur un financement professionnel de [AMOUNT] d'une durée de [DURATION] mois.",
  b2bPreambleClause2: "Considérant que le Prêteur consent à allouer ces fonds pour les besoins de trésorerie et d'activité de l'entité emprunteuse.",
  b2bPreambleClause3: "Le présent contrat est régi sous l'empire des règles commerciales européennes relatives aux transactions entre sociétés.",
  b2bPartiesAgree: "LES PARTIES DÉCIDENT D'ARRÊTER LES CONVENTIONS SUIVANTES :",
  b2bClosingRemarks: "Fait en trois exemplaires originaux, dument répertoriés aux registres de trésorerie.",
  b2bLabelLender: "LE PRÊTEUR (CRÉANCIER CORPORATIF)",
  b2bLabelBorrower: "L'EMPRUNTEUR (ENTREPRISE DÉBITRICE)",

  // Mixed specific template fields
  mixedContractTitle: "CONTRAT DE PRÊT MIXTE (ENTREPRISE - PARTICULIER)",
  mixedIntroText: "Le présent acte d'arrangement civil financier prend effet en date du [DATE_SIGNED], entre :",
  mixedLenderRole: "La Société [NAME] (ENTREPRISE PRÊTEUSE), sise au [ADDRESS].",
  mixedBorrowerRole: "Et M. / Mme [NAME] (EMPRUNTEUR PARTICULIER), demeurant au [ADDRESS].",
  mixedPreambleTitle: "PRÉAMBULE ADMINISTRATIF",
  mixedPreambleClause1: "Considérant que l'emprunteur particulier sollicite une mise à disposition d'une somme de [AMOUNT] d'une durée de [DURATION] mois auprès d'une entreprise prêteuse.",
  mixedPreambleClause2: "Considérant que la société prêteuse décide de consentir à cette demande de financement pour accompagner le projet personnel ou d'investissement du particulier.",
  mixedPreambleClause3: "Le présent acte est répertorié dument au greffe pour la traçabilité des opérations de prêt mixte.",
  mixedPartiesAgree: "IL A ÉTÉ ARRÊTÉ ET CONVENU CE QUI SUIT :",
  mixedLabelLender: "LE PRÊTEUR (SOCIÉTÉ PRÊTEUSE)",
  mixedLabelBorrower: "L'EMPRUNTEUR (PARTICULIER EMPRUNTEUR)",

  // B2B & Mixed common articles
  b2bMixedArt1Title: "Article 1 : Objet du financement et destination réglementée des fonds",
  b2bMixedArt1Content: "Le Prêteur consent à mettre à disposition de l'Emprunteur l'enveloppe consolidée de [TOTAL] (comprenant le principal exigible de [AMOUNT] et les coûts afférents).",
  b2bMixedArt2Title: "Article 2 : Calendrier d'amortissement et échéances",
  b2bMixedArt2Content: "L'amortissement de la dette s'établira sur la base de [DURATION] échéances récurrentes de [INSTALLMENT] chacune, de manière consécutive.",
  b2bMixedArt3Title: "Article 3 : Droit souverain de remboursement anticipé sans frais",
  b2bMixedArt3Content: "L'Emprunteur conserve expressément la faculté discrétionnaire de solder sa dette par anticipation, sans frais ou pénalités d'office.",
  b2bMixedArt4Title: "Article 4 : Responsabilité solidaire et déclaration de solvabilité",
  b2bMixedArt4Content: "Le signataire et ses délégations d'affaires engagent solidairement l'ensemble des avoirs de la structure emprunteuse.",
  b2bMixedArt5Title: "Article 5 : Frais d'homologation d'acte et constitution de garantie",
  b2bMixedArt5Content: "Pour valider l'acte, les frais obligatoires de constitution d'assurance et d'homologation de [FEE] devront être soldés par l'emprunteur.",
  b2bMixedArt6Title: "Article 6 : Pénalités moratoires et déchéance immédiate du terme",
  b2bMixedArt6Content: "Tout retard persistant de plus de cinq jours francs autorisera une majoration de [RATE]% mensuel assortie d'une astreinte de [FEE_FIXED].",
  b2bMixedArt7Title: "Article 7 : Droit européen régisseur et attribution de juridiction",
  b2bMixedArt7Content: "Le règlement du contrat se réfère au cadre réglementaire des affaires européennes. Tout conflit sera du ressort exclusif du Tribunal de Commerce.",

  // Donation specific template fields
  donationContractTitle: "CONVENTION D'ACTE DE DONATION DE SÉCURITÉ FISCALE",
  donationIntroText: "La présente convention d'acte authentique à titre gratuit est signée le [DATE_SIGNED], entre :",
  donationLenderRole: "M. / Mme / Entité [NAME] (DONATEUR / BIENFAITEUR), résidant à [ADDRESS].",
  donationBorrowerRole: "Et M. / Mme [NAME] (DONATAIRE / BÉNÉFICIAIRE), demeurant à [ADDRESS].",
  donationPreambleTitle: "EXPOSÉ D'INTENTION LIBÉRALE",
  donationPreambleClause1: "Considérant l'intention libérale et l'esprit d'affection qui déterminent le Donateur à céder de manière définitive et irrévocable la somme de [AMOUNT].",
  donationPreambleClause2: "Considérant que le Donataire accepte expressément cette donation manuelle avec une gratitude et une reconnaissance absolues.",
  donationPreambleClause3: "Cet acte est homologué sous sceau pour préserver les droits successoraux et l'enregistrement de sécurité fiscale des donations.",
  donationPartiesAgree: "LES PARTIES CONVIENNENT DE CE QUI SUIT :",
  donationClosingRemarks: "Fait en trois exemplaires originaux, dument répertoriés aux registres de trésorerie.",
  donationLabelLender: "LE DONATEUR (BIENFAITEUR)",
  donationLabelBorrower: "LE DONATAIRE (BÉNÉFICIAIRE)",
  donationHandwriteTextLender: '"Bon pour donation irrévocable à titre gratuit"',
  donationHandwriteTextBorrower: '"Lu et accepté avec gratitude, bon dresseur d\'office"',

  // Donation Articles
  donationArt1Title: "Article 1 : Constat de libéralité de fonds à titre gratuit",
  donationArt1Content: "Le Donateur transfère définitivement et sans réserve la somme de [AMOUNT] au Donataire, qui l'accepte.",
  donationSummaryTitle: "FICHE DE LIQUIDATION DE DONATION",
  donationLabelAmount: "Valeur Totale Donnée :",
  donationLabelRepayment: "Nature de remboursement :",
  donationValueRepayment: "EXEMPTÉ (A TITRE GRATUIT)",
  donationLabelInterest: "Taux d'intérêt conventionnel :",
  donationValueInterest: "Non applicable",
  donationLabelFee: "Droits d'homologation administrative :",
  donationLabelFrequency: "Fréquence d'acte :",
  donationValueFrequency: "Donazione manuale unica",
  donationLabelDeedStatus: "Garantie de Sécurité Fiscale :",
  donationValueDeedStatus: "DON MANUEL TRANSMIS HORS TAXATION",
  donationArt2Title: "Article 2 : Acceptation expresse du Donataire",
  donationArt2Content: "Le Donataire certifie sa pleine et entière acceptation de cette libéralité de grand cœur et témoigne de sa vive gratitude.",
  donationArt3Title: "Article 3 : Caractère irrévocable du transfert physique",
  donationArt3Content: "Le Donateur déclare et confirme que ce transfert s'effectue de manière absolue, irrévocable et définitive.",
  donationArt4Title: "Article 4 : Fiscalité et dispenses d'obligations d'héritage",
  donationArt4Content: "Cet acte civil dispense définitivement le Donataire de toute restitution directe ou indirecte lors des successions familiales.",
  donationArt5Title: "Article 5 : Frais d'homologation de sécurité administrative",
  donationArt5Content: "Pour l'opposabilité de plein droit de cet acte, les frais de sécurité d'enregistrement de [FEE] sont fixés.",
  donationArt6Title: "Article 6 : Attestation de capacité civile et libre arbitre",
  donationArt6Content: "Les parties comparaissantes attestent sur l'honneur posséder leur pleine capacité civile et agir de leur libre arbitre physique.",
  donationArt7Title: "Article 7 : Opposabilité juridique et enregistrement d'État",
  donationArt7Content: "La présente donation est soumise à la compétence exclusive des tribunaux du siège de l'autorité émettrice.",

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
};

const baseWordTemplate = {
  docTitle: "Acte Authentique de Prêt Notarié",
  refLine: "ACTE NOTARIÉ CIVIL D'ENREGISTREMENT SYSTÉMIQUE :",
  titleBox: "CONTRAT DE PRÊT",
  procedureTitle: "PROCÉDURE D'ADMINISTRATION JURIDIQUE ET ADMINISTRATIVE :",
  procedureBody: "Devant Maître [NOTARY_NAME], notaire assermenté inscrit à la chancellerie près l'adresse professionnelle [NOTARY_ADDRESS], titulaire du brevet de licence notariale de l'État N° [NOTARY_LICENSE]. Comparissent d'une part le Prêteur et d'autre part l'Emprunteur dument identifiés ci-après sous foi de serment.",
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
  incomeValue: "Revenu mensuel déclaré récurrent de ~[MONTHLY_INCOME] [CURRENCY]",
  section2Title: "Article 2 : Clauses de Financement et d'Amortissement",
  sec21Title: "Section 2.1 : Mise à disposition des fonds et motif contractuel",
  sec21Body: "Le prêteur s'engage à mettre à la disposition de l'emprunteur, qui accepte, la somme en principal de [PRINCIPAL]. L'emprunteur atteste et certifie sous peine de nullité absolue de l'acte que cette somme est exclusivement destinée à la réalisation du projet suivant : « [FUND_PURPOSE] ».",
  sec22Title: "Section 2.2 : Taux d'intérêt conventionnel et coût du crédit",
  sec22Body: "Ce crédit est consenti au taux d'intérêt nominal annuel et conventionnel fixe de [RATE]%. Sur toute la durée convenue de [DURATION] mois, l'importo total des intérêts s'élève à [TOTAL_INTEREST].",
  sec23Title: "Section 2.3 : Tableau d'échéance et amortissement",
  sec23Body_start: "L'amortissement du principal et des intérêts cumulés représentant une somme totale de [TOTAL_REPAYABLE] s'effectuera selon une périodicité de remboursement [REPAYMENT_FREQUENCY].",
  sec23Body_mensuel: "Le remboursement s'effectuera mensuellement pour un montant récurrent réglé par fraction de [INSTALLMENT_PAYMENT] chacune.",
  sec23Body_trimestriel: "Le remboursement s'effectuera trimestriellement pour un montant récurrent réglé par fraction de [INSTALLMENT_PAYMENT] chacune.",
  sec23Body_unique: "Le remboursement s'effectuera en une seule échéance finale à terme échu représentant la totalité de l'obligation financière.",
  sec23Body_dates: "La première échéance obligatoire est fixée au [FIRST_REPAYMENT_DATE], et la date de libération totale de la dette est fixée au [FINAL_REPAYMENT_DATE].",
  section3Title: "Article 3 : Pénalités de Retard et Intérêts Moratoires",
  section3Body: "En cas d'impayé persistant au-delà d'un délai de tolérance de cinq (5) jours consécutifs, l'Emprunteur s'expose de plein droit à l'application de pénalités moratoires cumulatives :",
  penaltyBoxHeader: "DISPOSITIFS DE SANCTION DE RETARD CONVENTIONNELS :",
  penaltyFixed: "- Indemnité forfaitaire de retard fixe de : [PENALTY_FIXED_AMOUNT] par échéance en défaut.",
  penaltyRate: "- Taux de majoration pénal moratoire d'intérêt de retard cumulatif de : [PENALTY_RATE]% par mois applicable sur l'échéance non payée.",
  penaltyWarning: "En l'absence de régularisation totale sous quinzaine après mise en demeure officielle, le présent acte devient de plein droit dument exécutoire par l'Officier Civil compétent.",
  section4Title: "Article 4 : Frais d'Acte, Fiscalité & Taxes nationales assorties",
  section4Body: "Conformément à la législation civile en vigueur sur l'enregistrement des actes de financement, les frais d'évaluation notariale et d'homologation s'élevant à [FEE_AMOUNT] sont soumis à la taxe sur la valeur ajoutée au taux de [TVA_RATE]%. Le montant de la taxe due s'élève à [TVA_AMOUNT], pour un montant total exigible de [TOTAL_WITH_TAXES].",
  labelDone: "Fait et homologué sous signature officielle de Maître d'étude à [CITY] ([COUNTRY]), le [SIGNATURE_DATE]",
  labelLender: "LE PRÊTEUR (CRÉANCIER)",
  labelBorrower: "L'EMPRUNTEUR (DÉBITEUR)",
  labelNotary: "LE NOTAIRE DE L'ÉTUDE",
  stampLenderTitle: "★★ CREDIVITE S.A. ★★",
  stampLenderDept: "DIVISION CRÉDITS D'INVESTISSEMENTS",
  stampLenderCert: "ACTO DE PRÂT CERTIFIÉ VALIDÉ",
  stampLenderSig: "Signature du Représentant CREDIVITE S.A.",
  docLenderMention: "Bon pour accord, crédit débloqué d'office",
  stampNotaryTitle: "SCEAU DE L'OFFICE CIVIL D'ENREGISTREMENT D'ÉTAT",
  stampNotarySig: "Sceau de Me [NOTARY_NAME]",
  stampNotaryTax: "TAXE DE TIMBRE DE SÉCURITÉ ENREGISTRÉE COMPENSÉE",
  docNotaryMention: "Homologué et enregistré sous sceau de l'État",
  stampBorrowerTitle: "SIGNATURE MANUELLE OBLIGATOIRE EMPRUNTEUR",
  stampBorrowerSub: "(Parapher chaque page, signer d'encre noire)",
  docBorrowerMention: "Doit écrire de sa main: \"Lu et approuvé d'office, bon pour accord\"",
  section5Title: "Article 5 : Assurance Crédit Optionnelle & Déblocage des fonds",
  section5Body: "Le bénéficiaire certifie sa solvabilité et active la mise à disposition des fonds en s'acquittant des droits de l'assurance crédit obligatoire d'un montant de [FEE_AMOUNT]. Suite à la signature des présentes, l'emprunteur s'engage à régulariser cette somme auprès de l'assureur agréé pour finaliser formellement l'envoi effectif du capital de [PRINCIPAL]."
};

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
    hasSigned: true,
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
    hasSigned: true,
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
    hasSigned: true,
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
  const [contractType, setContractType] = useState<ContractType>('personal_loan');
  const [selectedDoc, setSelectedDoc] = useState<DocumentViewType>('main_contract');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [exportMode, setExportMode] = useState<'editable' | 'official'>('official');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [fontFamily, setFontFamily] = useState<string>('serif');
  const [bannerAlert, setBannerAlert] = useState<string | null>(
    "Remplissez les informations administratives ci-dessous puis appuyez sur 'Générer le contrat' pour concevoir l'acte juridique officiel signé."
  );

  // States for custom translation and Gemini dynamic mapping
  const [customTranslations, setCustomTranslations] = useState<any | null>(null);
  const [customTranslationsWord, setCustomTranslationsWord] = useState<any | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [localCustomLangInput, setLocalCustomLangInput] = useState<string>('');
  const [translatedLangCode, setTranslatedLangCode] = useState<string>('');
  
  // Signature Modals
  const [sigTarget, setSigTarget] = useState<'lender' | 'borrower' | 'notary' | null>(null);

  // Download status state for mobile feedback and Chrome correction
  const [downloadState, setDownloadState] = useState<{
    status: 'idle' | 'preparing' | 'ready';
    fileName: string;
    format: 'doc' | 'html';
    onDownloadTrigger?: () => void;
  }>({ status: 'idle', fileName: '', format: 'html' });

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

  const triggerAITranslation = async (targetLang: string) => {
    setIsTranslating(true);
    setTranslationError(null);
    setBannerAlert(`Traduction en cours du contrat en ${targetLang} avec l'IA Gemini...`);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetLanguage: targetLang,
          texts: {
            preview: baseTemplateForTranslation,
            word: baseWordTemplate
          }
        })
      });
      const data = await response.json();
      if (data.success && data.translation) {
        setCustomTranslations(data.translation.preview);
        setCustomTranslationsWord(data.translation.word);
        setTranslatedLangCode(targetLang);
        
        // Update styling state with custom values
        setStyling(prev => ({
          ...prev,
          language: 'CUSTOM',
          customLanguageLabel: targetLang,
          customTranslations: data.translation.preview,
          customTranslationsWord: data.translation.word
        }));
        
        setBannerAlert(`Succès ! Votre contrat est maintenant traduit en "${targetLang}" par l'IA.`);
      } else {
        throw new Error(data.error || "La traduction a échoué.");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.message || String(error);
      const norm = targetLang.toLowerCase();
      let matchedCode: 'ES' | 'DE' | 'PT' | 'NL' | 'PL' | 'RO' | 'EN' | 'IT' | 'FR' | null = null;
      if (norm.includes('esp') || norm.includes('span') || norm === 'es') matchedCode = 'ES';
      else if (norm.includes('all') || norm.includes('germ') || norm.includes('deutsch') || norm === 'de') matchedCode = 'DE';
      else if (norm.includes('port') || norm === 'pt') matchedCode = 'PT';
      else if (norm.includes('nee') || norm.includes('dutch') || norm.includes('hol') || norm === 'nl') matchedCode = 'NL';
      else if (norm.includes('pol') || norm === 'pl') matchedCode = 'PL';
      else if (norm.includes('rou') || norm.includes('rom') || norm.includes('rum') || norm === 'ro') matchedCode = 'RO';
      else if (norm.includes('it') || norm.includes('ita')) matchedCode = 'IT';
      else if (norm.includes('ang') || norm.includes('eng') || norm === 'en') matchedCode = 'EN';
      else if (norm.includes('fr') || norm.includes('fra')) matchedCode = 'FR';

      if (matchedCode) {
        setStyling(prev => ({
          ...prev,
          language: matchedCode as any,
          customLanguageLabel: targetLang,
          customTranslations: null,
          customTranslationsWord: null
        }));
        setBannerAlert(`Échec Traduction IA (Détail: ${errMsg}). Votre contrat a été traduit en "${targetLang}" à l'aide de la traduction certifiée de secours.`);
      } else {
        setStyling(prev => ({
          ...prev,
          language: 'EN',
          customLanguageLabel: targetLang,
          customTranslations: null,
          customTranslationsWord: null
        }));
        setBannerAlert(`Échec Traduction IA (Détail: ${errMsg}). Le contrat certifié par défaut en Anglais a été chargé pour "${targetLang}".`);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (lang: StylingDetails['language']) => {
    if (lang === 'CUSTOM') {
      setStyling(prev => ({ ...prev, language: 'CUSTOM' }));
      return;
    }
    
    // Check if it's one of the standard translation catalogs
    if (['FR', 'EN', 'IT', 'ES', 'DE', 'PT', 'NL', 'PL', 'RO', 'BOTH'].includes(lang)) {
      setStyling(prev => ({ ...prev, language: lang }));
      setCustomTranslations(null);
      setCustomTranslationsWord(null);
      setTranslatedLangCode('');
      
      const langMapping: { [key: string]: string } = {
        'FR': 'Français',
        'IT': 'Italien',
        'EN': 'Anglais',
        'ES': 'Espagnol',
        'DE': 'Allemand',
        'PT': 'Portugais',
        'NL': 'Néerlandais',
        'PL': 'Polonais',
        'RO': 'Roumain',
        'BOTH': 'Bilingue'
      };
      setBannerAlert(`Langue sélectionnée : ${langMapping[lang] || lang}.`);
    } else {
      // It's a custom-selected language
      const langMapping: { [key: string]: string } = {
        'ES': 'Espagnol',
        'DE': 'Allemand',
        'PT': 'Portugais',
        'NL': 'Néerlandais',
        'PL': 'Polonais',
        'RO': 'Roumain'
      };
      const label = langMapping[lang] || 'Espagne';
      setStyling(prev => ({ ...prev, language: lang }));
      triggerAITranslation(label);
    }
  };

  const handleLangToggleAndTranslate = (langText: string) => {
    setStyling(prev => ({
      ...prev,
      language: 'CUSTOM',
      customLanguageLabel: langText
    }));
    triggerAITranslation(langText);
  };

  const saveSignature = (dataUrl: string) => {
    if (sigTarget === 'lender') {
      setLender(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl, hasSigned: true }));
    } else if (sigTarget === 'borrower') {
      setBorrower(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl, hasSigned: true }));
    } else if (sigTarget === 'notary') {
      setNotary(prev => ({ ...prev, signatureType: 'draw', signatureDrawData: dataUrl, hasSigned: true }));
    }
    setBannerAlert(`Signature dessinée enregistrée pour : ${sigTarget === 'lender' ? "Le Prêteur" : sigTarget === 'borrower' ? "L'Emprunteur" : "Le Notaire"}.`);
  };

  const clearSignatureData = (party: 'lender' | 'borrower' | 'notary') => {
    if (party === 'lender') {
      setLender(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '', hasSigned: true }));
    } else if (party === 'borrower') {
      setBorrower(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '', hasSigned: true }));
    } else if (party === 'notary') {
      setNotary(prev => ({ ...prev, signatureType: 'text', signatureDrawData: '', hasSigned: true }));
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
        hasSigned: true,
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
        hasSigned: true,
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
        hasSigned: true,
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

  // ADVANCED CONVERSION AND DOWNLOAD DIRECT TO PDF
  const triggerDownloadPDF = async () => {
    const sheetElement = document.getElementById('printed-contract-sheet');
    if (!sheetElement) {
      setBannerAlert("Erreur de récupération de l'élément de rendu contractuel.");
      return;
    }

    setBannerAlert("Génération du document PDF officiel en cours (moteur haute-définition). Veuillez patienter quelques secondes...");

    try {
      // 1. Render the element to a High-Definition Canvas
      const canvas = await html2canvas(sheetElement, {
        scale: 2.0, // High-DPI crystal clear vector rendering
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#f1f5f9', // Clean white-slate background identical to screen
        windowWidth: 800, // Fixed layout width to maintain perfect printable proportions
        scrollX: 0,
        scrollY: 0,
      });

      // 2. Extract JPEG representation with high-mid compression quality
      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      // 3. Coordinate conversion proportions for standard DIN-A4 page sizes
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const canvasHeightInMm = (canvas.height * imgWidth) / canvas.width;

      // 4. Initialize the custom jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let heightLeft = canvasHeightInMm;
      let position = 0;

      // Push the first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, Math.min(canvasHeightInMm, pageHeight), undefined, 'FAST');
      heightLeft -= pageHeight;

      // Handle subsequent page splits gracefully
      while (heightLeft > 0) {
        position = heightLeft - canvasHeightInMm; // Offset position to create clean division pages
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, canvasHeightInMm, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      // Name elements
      const docLabel = selectedDoc.toLowerCase();
      const typeLabel = contractType.toLowerCase();
      const langLabel = (styling.customLanguageLabel || styling.language).toLowerCase();
      const modeLabel = exportMode === 'editable' ? 'modifiable' : 'officiel';
      const cleanLender = lender.name.replace(/\s+/g, '_');
      const cleanBorrower = borrower.name.replace(/\s+/g, '_');
      const filename = `acte_${docLabel}_${typeLabel}_${langLabel}_${modeLabel}_${cleanLender}_vs_${cleanBorrower}.pdf`;

      // 5. Trigger download event
      pdf.save(filename);

      setBannerAlert(`Acte de prêt officiel au format PDF téléchargé avec succès ! Fichier : ${filename}`);
    } catch (err: any) {
      console.error("PDF target export error details:", err);
      const errorMsg = err?.message || String(err);
      setBannerAlert(`Échec de la génération PDF : ${errorMsg}. Veuillez utiliser l'option 'Imprimer / PDF' si votre navigateur bloque les popups/téléchargements.`);
    }
  };

  // EXPORT WORD DOCUMENT .DOC OR HYPER-COMPATIBLE EDITABLE HTML
  const triggerDownloadContract = (format: 'doc' | 'html' = 'html') => {
    const sheetElement = document.getElementById('printed-contract-sheet');
    if (!sheetElement) {
      setBannerAlert("Erreur de récupération de l'élément de rendu contractuel.");
      return;
    }

    // Get the exact parsed inner HTML from the paper on screen
    const sheetContent = sheetElement.innerHTML;

    // Build the standalone document matching the preview styles exactly
    const finalHtml = `<!DOCTYPE html>
<html lang="${styling.language === 'BOTH' ? 'fr' : styling.language === 'CUSTOM' ? 'fr' : styling.language.toLowerCase()}">
<head>
  <meta charset="utf-8">
  <title>${selectedDoc === 'main_contract' ? 'Acte Authentique d\'Origine' : 'Acte Administratif - Conforme CE'}</title>
  
  <!-- Tailwind CSS CDN to dynamically parse all styled templates -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Official high contrast administrative typography scales -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: inherit;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    [contenteditable="true"]:focus {
      outline: 2px dashed #f59e0b;
      background-color: rgba(245, 158, 11, 0.05);
      border-radius: 4px;
    }

    /* === PRESTIGIOUS HIGH DENSITY ADMINISTRATIVE GUILLOCHÉ / BALANCE === */
    .document-guilloche-bg {
      position: relative !important;
      background-color: #f0f4f8 !important;
    }

    /* Fond léger - Lignes fines horizontales et verticales */
    .document-guilloche-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(90deg, rgba(0, 70, 140, 0.04) 1px, transparent 1px),
        linear-gradient(rgba(0, 80, 150, 0.035) 1px, transparent 1px);
      background-size: 70px 55px, 55px 70px;
      opacity: 0.65;
      z-index: 1;
      pointer-events: none;
    }

    /* Guillochis courbes principal - Version plus claire et légère */
    .document-guilloche-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cdefs%3E%3Cpattern id='guilloche' patternUnits='userSpaceOnUse' width='300' height='300'%3E%3Cpath d='M50 100 Q120 30 200 110 Q280 190 220 260 Q150 320 70 240 Q30 170 80 120' fill='none' stroke='%23004a80' stroke-width='1.8' opacity='0.09'/%3E%3Cpath d='M80 180 Q160 110 250 160 Q340 220 260 290 Q180 340 100 260' fill='none' stroke='%23006ab0' stroke-width='1.3' opacity='0.07'/%3E%3Cpath d='M30 220 Q110 150 190 210 Q270 270 210 330' fill='none' stroke='%23008cd0' stroke-width='1' opacity='0.06'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23guilloche)'/%3E%3C/svg%3E");
      background-size: 260px 260px;
      mix-blend-mode: multiply;
      opacity: 0.45;
      z-index: 2;
      pointer-events: none;
    }

    .document-guilloche-bg > * {
      position: relative;
      z-index: 10;
    }

    .background-watermark {
      z-index: 5 !important;
    }
    
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body ${format === 'html' && exportMode === 'editable' ? 'contenteditable="true"' : ''} style="background-color: ${format === 'html' ? '#f1f5f9' : '#ffffff'}; padding: 40px 10px; display: flex; justify-content: center; min-height: 100vh;">
  <div class="document-guilloche-bg w-full max-w-[800px] bg-white text-slate-900 duration-300 relative overflow-hidden" style="padding: 30px; box-shadow: ${format === 'html' ? '0 25px 50px -12px rgb(0 0 0 / 0.15)' : 'none'}; border: 1px solid #e2e8f0; border-radius: 4px;">
    ${sheetContent}
  </div>
</body>
</html>`;

    const fileContent = '\ufeff' + finalHtml;
    const blobType = format === 'html' ? 'text/html;charset=utf-8' : 'application/msword;charset=utf-8';
    const blob = new Blob([fileContent], { type: blobType });
    const url = URL.createObjectURL(blob);
    
    const tmpAnchor = document.createElement('a');
    tmpAnchor.href = url;

    // Name elements
    const docLabel = selectedDoc.toLowerCase();
    const typeLabel = contractType.toLowerCase();
    const langLabel = (styling.customLanguageLabel || styling.language).toLowerCase();
    const modeLabel = exportMode === 'editable' ? 'modifiable' : 'officiel';
    const cleanLender = lender.name.replace(/\s+/g, '_');
    const cleanBorrower = borrower.name.replace(/\s+/g, '_');

    tmpAnchor.download = `acte_${docLabel}_${typeLabel}_${langLabel}_${modeLabel}_${cleanLender}_vs_${cleanBorrower}.${format}`;
    
    document.body.appendChild(tmpAnchor);
    tmpAnchor.click();
    document.body.removeChild(tmpAnchor);

    // Provide feedback output
    const formatName = format === 'html' ? 'HTML Mobile & PC' : 'Word (.doc)';
    const feedback = `Acte au format ${formatName} exporté avec succès ! Document : ${docLabel.toUpperCase()} - Contexte : ${typeLabel.toUpperCase()} (${langLabel.toUpperCase()})`;
    setBannerAlert(feedback);
    return;
  };

  const old_triggerDownloadContract_will_be_ignored = (format: 'doc' | 'html' = 'html') => {
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

    const currentT = (() => {
      if (['FR', 'IT', 'EN'].includes(styling.language)) {
        return tWord[styling.language as 'FR' | 'IT' | 'EN'];
      }
      if (styling.language === 'BOTH') {
        return tWord.FR;
      }
      if (['ES', 'DE', 'PT', 'NL', 'PL', 'RO'].includes(styling.language)) {
        const raw = tWordFallback[styling.language];
        return {
          ...raw,
          procedureBody: (raw.procedureBody || "")
            .replace("[NOTARY_NAME]", `<strong>${notary.name}</strong>`)
            .replace("[NOTARY_ADDRESS]", `<strong>${notary.address}</strong>`)
            .replace("[NOTARY_LICENSE]", `<strong>N° ${loan.notaryLicense || notary.idNumber}</strong>`),
          incomeValue: (raw.incomeValue || "")
            .replace("[MONTHLY_INCOME]", borrower.monthlyIncome ? borrower.monthlyIncome.toLocaleString() : 'N/C')
            .replace("[CURRENCY]", loan.currency),
          sec21Body: (raw.sec21Body || "")
            .replace("[PRINCIPAL]", `<strong>${formatM(principal)}</strong>`)
            .replace("[FUND_PURPOSE]", `<strong>${loan.fundPurpose}</strong>`),
          sec22Body: (raw.sec22Body || "")
            .replace("[RATE]", `<strong>${rate}%</strong>`)
            .replace("[DURATION]", `<strong>${duration} mois</strong>`)
            .replace("[TOTAL_INTEREST]", `<strong>${formatM(totalInterest)}</strong>`),
          sec23Body_start: (raw.sec23Body_start || "")
            .replace("[TOTAL_REPAYABLE]", `<strong>${formatM(totalRepayable)}</strong>`)
            .replace("[REPAYMENT_FREQUENCY]", `<strong>${loan.repaymentFrequency.toUpperCase()}</strong>`),
          sec23Body_mensuel: (raw.sec23Body_mensuel || "")
            .replace("[DURATION]", String(duration))
            .replace("[INSTALLMENT_PAYMENT]", `<strong>${formatM(installmentPayment)}</strong>`),
          sec23Body_trimestriel: (raw.sec23Body_trimestriel || "")
            .replace("[INSTALLMENT_PAYMENT]", `<strong>${formatM(installmentPayment)}</strong>`),
          sec23Body_unique: (raw.sec23Body_unique || ""),
          sec23Body_dates: (raw.sec23Body_dates || "")
            .replace("[FIRST_REPAYMENT_DATE]", `<strong>${firstDateFormatted}</strong>`)
            .replace("[FINAL_REPAYMENT_DATE]", `<strong>${finalDateFormatted}</strong>`),
          penaltyFixed: (raw.penaltyFixed || "")
            .replace("[PENALTY_FIXED_AMOUNT]", `<strong>${formatM(loan.penaltyFixedAmount)}</strong>`),
          penaltyRate: (raw.penaltyRate || "")
            .replace("[PENALTY_RATE]", `<strong>${loan.penaltyRate}</strong>`),
          section4Body: (raw.section4Body || "")
            .replace("[FEE_AMOUNT]", `<strong>${formatM(loan.feeAmount)}</strong>`)
            .replace("[TVA_RATE]", `<strong>${loan.tvaRate}</strong>`)
            .replace("[TVA_AMOUNT]", `<strong>${formatM(tvaAmount)}</strong>`)
            .replace("[TOTAL_WITH_TAXES]", `<strong>${formatM(totalWithTaxes)}</strong>`),
          labelDone: (raw.labelDone || "")
            .replace("[CITY]", loan.city)
            .replace("[COUNTRY]", loan.country)
            .replace("[SIGNATURE_DATE]", signatureDateFormatted),
          stampNotarySig: (raw.stampNotarySig || "")
            .replace("[NOTARY_NAME]", notary.name),
          section5Body: (raw.section5Body || "")
            .replace("[FEE_AMOUNT]", `<strong>${formatM(loan.feeAmount)}</strong>`)
            .replace("[PRINCIPAL]", `<strong>${formatM(principal)}</strong>`)
        };
      }
      // If we have custom translations loaded in customTranslationsWord
      if (customTranslationsWord) {
        const raw = customTranslationsWord;
        return {
          ...raw,
          refLine: raw.refLine || "ACTE NOTARIÉ CIVIL D'ENREGISTREMENT SYSTÉMIQUE :",
          procedureBody: (raw.procedureBody || "")
            .replace("[NOTARY_NAME]", `<strong>${notary.name}</strong>`)
            .replace("[NOTARY_ADDRESS]", `<strong>${notary.address}</strong>`)
            .replace("[NOTARY_LICENSE]", `<strong>N° ${loan.notaryLicense || notary.idNumber}</strong>`),
          incomeValue: (raw.incomeValue || "")
            .replace("[MONTHLY_INCOME]", borrower.monthlyIncome ? borrower.monthlyIncome.toLocaleString() : 'N/C')
            .replace("[CURRENCY]", loan.currency),
          sec21Body: (raw.sec21Body || "")
            .replace("[PRINCIPAL]", `<strong>${formatM(principal)}</strong>`)
            .replace("[FUND_PURPOSE]", `<strong>${loan.fundPurpose}</strong>`),
          sec22Body: (raw.sec22Body || "")
            .replace("[RATE]", `<strong>${rate}%</strong>`)
            .replace("[DURATION]", `<strong>${duration} mois</strong>`)
            .replace("[TOTAL_INTEREST]", `<strong>${formatM(totalInterest)}</strong>`),
          sec23Body_start: (raw.sec23Body_start || "")
            .replace("[TOTAL_REPAYABLE]", `<strong>${formatM(totalRepayable)}</strong>`)
            .replace("[REPAYMENT_FREQUENCY]", `<strong>${loan.repaymentFrequency.toUpperCase()}</strong>`),
          sec23Body_mensuel: (raw.sec23Body_mensuel || "")
            .replace("[DURATION]", String(duration))
            .replace("[INSTALLMENT_PAYMENT]", `<strong>${formatM(installmentPayment)}</strong>`),
          sec23Body_trimestriel: (raw.sec23Body_trimestriel || "")
            .replace("[INSTALLMENT_PAYMENT]", `<strong>${formatM(installmentPayment)}</strong>`),
          sec23Body_unique: (raw.sec23Body_unique || ""),
          sec23Body_dates: (raw.sec23Body_dates || "")
            .replace("[FIRST_REPAYMENT_DATE]", `<strong>${firstDateFormatted}</strong>`)
            .replace("[FINAL_REPAYMENT_DATE]", `<strong>${finalDateFormatted}</strong>`),
          penaltyFixed: (raw.penaltyFixed || "")
            .replace("[PENALTY_FIXED_AMOUNT]", `<strong>${formatM(loan.penaltyFixedAmount)}</strong>`),
          penaltyRate: (raw.penaltyRate || "")
            .replace("[PENALTY_RATE]", `<strong>${loan.penaltyRate}</strong>`),
          section4Body: (raw.section4Body || "")
            .replace("[FEE_AMOUNT]", `<strong>${formatM(loan.feeAmount)}</strong>`)
            .replace("[TVA_RATE]", `<strong>${loan.tvaRate}</strong>`)
            .replace("[TVA_AMOUNT]", `<strong>${formatM(tvaAmount)}</strong>`)
            .replace("[TOTAL_WITH_TAXES]", `<strong>${formatM(totalWithTaxes)}</strong>`),
          labelDone: (raw.labelDone || "")
            .replace("[CITY]", loan.city)
            .replace("[COUNTRY]", loan.country)
            .replace("[SIGNATURE_DATE]", signatureDateFormatted),
          stampNotarySig: (raw.stampNotarySig || "")
            .replace("[NOTARY_NAME]", notary.name),
          section5Body: (raw.section5Body || "")
            .replace("[FEE_AMOUNT]", `<strong>${formatM(loan.feeAmount)}</strong>`)
            .replace("[PRINCIPAL]", `<strong>${formatM(principal)}</strong>`)
        };
      }
      // Failover to French if custom not loaded yet
      return tWord.FR;
    })();

    // Dynamic adaptations for B2B, mixed, and donation contracts
    const isDonation = contractType === 'donation';
    const isB2B = contractType === 'business_loan';
    const isMixed = contractType === 'party_business_loan';

    let customExportTitle = currentT.titleBox;
    let customExportLenderRole = currentT.labelLender;
    let customExportBorrowerRole = currentT.labelBorrower;
    let customExportHandwriteLender = currentT.docLenderMention || 'Must handwrite: "Approved for agreement, loan released officially"';
    let customExportHandwriteBorrower = currentT.docBorrowerMention || 'Must handwrite: "Read and approved, good for agreement"';

    if (isB2B) {
      customExportTitle = activeLang === 'FR' ? "CONTRAT DE PRÊT COMMERCIAL (B2B)" : activeLang === 'IT' ? "CONTRATTO DI PRESTITO COMMERCIALE (B2B)" : "B2B COMMERCIAL LOAN AGREEMENT";
      customExportLenderRole = activeLang === 'FR' ? "LE PRÊTEUR (CRÉANCIER CORPORATIF)" : activeLang === 'IT' ? "IL MUTUANTE (FINANZIATORE CORP)" : "THE LENDER (CORPORATE CREDITOR)";
      customExportBorrowerRole = activeLang === 'FR' ? "L'EMPRUNTEUR (ENTREPRISE DÉBITRICE)" : activeLang === 'IT' ? "IL MUTUATARIO (IMPRESA DEBITRICE)" : "THE BORROWER (CORPORATE DEBTOR)";
    } else if (isMixed) {
      customExportTitle = activeLang === 'FR' ? "CONTRAT DE PRÊT MIXTE (ENTREPRISE - PARTICULIER)" : activeLang === 'IT' ? "CONTRATTO DI PRESTITO MISTO (AZIENDA-PRIVATO)" : "MIXED LOAN AGREEMENT (BUSINESS-PRIVATE)";
      customExportLenderRole = activeLang === 'FR' ? "LE PRÊTEUR (SOCIÉTÉ PRÊTEUSE)" : activeLang === 'IT' ? "IL MUTUANTE (IMPRESA CREDITOR)" : "THE LENDER (CORPORATE CREDITOR)";
      customExportBorrowerRole = activeLang === 'FR' ? "L'EMPRUNTEUR (PARTICULIER EMPRUNTEUR)" : activeLang === 'IT' ? "IL MUTUATARIO (PRIVATO DEBITORE)" : "THE BORROWER (PRIVATE DEBTOR)";
    } else if (isDonation) {
      customExportTitle = activeLang === 'FR' ? "CONVENTION D'ACTE DE DONATION DE SÉCURITÉ FISCALE" : activeLang === 'IT' ? "ATTO DI DONAZIONE DI SICUREZZA FISCALE" : "TAX-SECURE DEED OF DONATION";
      customExportLenderRole = activeLang === 'FR' ? "LE DONATEUR (BIENFAITEUR)" : activeLang === 'IT' ? "IL DONATORE (BENEFATTORE)" : "THE DONOR (BENEFACTOR)";
      customExportBorrowerRole = activeLang === 'FR' ? "LE DONATAIRE (BÉNÉFICIAIRE)" : activeLang === 'IT' ? "IL DONATARIO (DONEE)" : "THE DONEE (BENEFICIARY)";
      customExportHandwriteLender = activeLang === 'FR' ? '"Bon pour donation irrévocable à titre gratuit"' : activeLang === 'IT' ? '"In fede di donazione irrevocabile a titolo gratuito"' : '"Approved for voluntary irrevocable gift"';
      customExportHandwriteBorrower = activeLang === 'FR' ? '"Lu et accepté avec gratitude"' : activeLang === 'IT' ? '"Letto e accettato con gratitudine"' : '"Accepted with appreciation, bound by terms"';
    }

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
            ${customExportTitle}
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

        ${contractType === 'personal_loan' ? `
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
        ` : isDonation ? `
          <div class="section-title">${activeLang==='FR'? "DECLARATIONS DU TRANSFERT (DONATION MANUELLE)" : activeLang==='IT'? "DICHIARAZIONE DELLA CESSIONE (DONAZIONE)" : "DEED DETAILS AND CERTIFICATION"}</div>
          
          <div class="article-title">${activeLang==='FR'? 'Article 1 : Constat de libéralité de fonds à titre gratuit' : activeLang==='IT'? 'Articolo 1 : Constatazione di Donazione a Titolo Gratuito' : 'Article 1 : Statement of Gratuitous Donation'}</div>
          <div class="article-content">
            ${activeLang==='FR'? `Le Donateur transfère définitivement et sans réserve la somme de <strong>${formatM(loan.amount)}</strong> au Donataire, qui l'accepte.` : activeLang==='IT'? `Il Donatore trasferisce definitivamente e senza alcuna riserva la somme di <strong>${formatM(loan.amount)}</strong> al Donatario, che l'accetta.` : `The Donor transfers definitely and without reservation the sum of <strong>${formatM(loan.amount)}</strong> to the Donee, who accepts it.`}
          </div>

          <div class="article-title">${activeLang==='FR'? "Article 2 : Acceptation expresse du Donataire" : activeLang==='IT'? "Articolo 2 : Accettazione espressa del Donatario" : "Article 2 : Explicit Acceptance by Donee"}</div>
          <div class="article-content">
            ${activeLang==='FR'? "Le Donataire certifie sa pleine et entière acceptation de cette libéralité de grand cœur et témoigne de sa vive gratitude." : activeLang==='IT'? "Il Donatario accetta la presente liberalità dichiarando che i fondi non provengono da operazioni illecite e ringrazia le Donatore." : "The Donee accepts this manual gift with highest appreciation, stating that these funds are legitimate."}
          </div>

          <div class="article-title">${activeLang==='FR'? "Article 3 : Caractère irrévocable du transfert physique" : activeLang==='IT'? "Articolo 3 : Irrevocabilità della cessione manuale" : "Article 3 : Irrevocability of Transfer"}</div>
          <div class="article-content">
            ${activeLang==='FR'? "Le Donateur déclare et confirme que ce transfert s'effectue de manière absolue, irrévocable et définitive." : activeLang==='IT'? "Questo atto costituisce un trasferimento definitivo e irrevocabile. Nessun successore potrà pretendere la revoca del dono." : "The current manual transfer is absolute, irreversible, and irrevocable under common civil law guidelines."}
          </div>

          <div class="article-title">${activeLang==='FR'? "Article 4 : Fiscalité et dispenses d'obligations d'héritage" : activeLang==='IT'? "Articolo 4 : Dichiarazione fiscale ordinaria" : "Article 4 : Tax Compliance and Filing"}</div>
          <div class="article-content">
            ${activeLang==='FR'? "Cet acte civil dispense définitivement le Donataire de toute restitution directe ou indirecte lors des successions familiales." : activeLang==='IT'? "Il beneficiario si impegna ad adempiere a qualsiasi obbligo di registrazione fiscale o dichiarazione locale obbligatoria." : "The Donee remains solely responsible for filing the appropriate tax declarations with administrative authorities."}
          </div>

          <div class="section-title">${activeLang==='FR'? "Homologation et Frais Administratifs" : activeLang==='IT'? "Omologazione e Spese Accessorie" : "Certification and Filing Charges"}</div>
          <div class="article-content" style="font-weight: bold; background-color: #fafbfa; padding: 12px; border-left: 3px solid #059669;">
            ${activeLang==='FR'? `Pour l'opposabilité de plein droit de cet acte, les frais de sécurité d'enregistrement de <strong>${formatM(loan.feeAmount)}</strong> sont fixés.` : activeLang==='IT'? `Per la validità opponibile ai terzi, i diritti di dossier pari a <strong>${formatM(loan.feeAmount)}</strong> sono incassati dall'étude.` : `To establish official records, the registration and notary service fee of <strong>${formatM(loan.feeAmount)}</strong> is fully authorized.`}
          </div>

          <div class="article-title">${activeLang==='FR'? "Article 5 : Attestation de capacité civile et libre arbitre" : activeLang==='IT'? "Articolo 5 : Capacità civile delle parti" : "Article 5 : Civil Capacity and Free Will"}</div>
          <div class="article-content">
            ${activeLang==='FR'? "Les parties comparaissantes attestent sur l'honneur posséder leur pleine capacité civile et agir de leur libre arbitre physique." : activeLang==='IT'? "Entrambe le parti dichiarano di trovarsi in piene facoltà mentali, libere da qualsiasi costrizione externa." : "Both the Donor and Donee certify they are of sound mind and acting entirely of their own free will without any duress."}
          </div>

          <div class="article-title">${activeLang==='FR'? "Article 6 : Opposabilité juridique et enregistrement d'État" : activeLang==='IT'? "Articolo 6 : Giurisdizione e Legge Applicabile" : "Article 6 : Applicable Jurisdiction"}</div>
          <div class="article-content">
            ${activeLang==='FR'? "La présente donation est soumise à la compétence exclusive des tribunaux du siège de l'autorité émettrice." : activeLang==='IT'? "Qualsiasi controversia relativa all'interpretazione del presente atto è deferita alla giurisdizione del foro civile territorialmente competente." : "Any disputes on the interpretation of this deed of donation shall be submitted to the competent civil court of justice."}
          </div>
        ` : `
          <div class="section-title">${activeLang==='FR'? "CLAUSES D'ENGAGEMENT CONTRACTUELLES" : activeLang==='IT'? "CLAUSOLE CONTRATTUAI DI CREDITO" : "CONTRACTUAL COVENANTS AND STIPULATIONS"}</div>
          
          <div class="article-title">Article 1 : ${activeLang==='FR'? "Objet du financement et destination réglementée des fonds" : activeLang==='IT'? "Oggetto e destinazione dei fondi" : "Object and Purposed Allocation"}</div>
          <div class="article-content">
            ${activeLang==='FR'? (isMixed ? `La Société prêteuse consent à mettre à disposition de l'emprunteur particulier l'enveloppe consolidée de <strong>${formatM(totalRepayable)}</strong> (comprenant le principal exigible de <strong>${formatM(loan.amount)}</strong> et les coûts afférents).` : `Le Prêteur consent à mettre à disposition de l'Emprunteur l'enveloppe consolidée de <strong>${formatM(totalRepayable)}</strong> (comprenant le principal exigible de <strong>${formatM(loan.amount)}</strong> et les coûts afférents).`) : activeLang==='IT'? (isMixed ? `L'azienda mutuante concede un fido al mutuatario privato per l'importo totale consolidato di <strong>${formatM(totalRepayable)}</strong> (capitale di <strong>${formatM(loan.amount)}</strong> e interessi).` : `Il Mutuante concede un fido al Mutuatario per l'importo totale consolidato di <strong>${formatM(totalRepayable)}</strong> (capitale di <strong>${formatM(loan.amount)}</strong> e interessi).`) : (isMixed ? `The Corporate Lender grants credit to the private Debtor for the general consolidated amount of <strong>${formatM(totalRepayable)}</strong> (principal of <strong>${formatM(loan.amount)}</strong> plus borrowing costs).` : `The Lender grants credit to the Debtor for the general consolidated amount of <strong>${formatM(totalRepayable)}</strong> (principal of <strong>${formatM(loan.amount)}</strong> plus borrowing costs).`)}
          </div>

          <div class="article-title">Article 2 : ${activeLang==='FR'? "Calendrier d'amortissement et échéances" : activeLang==='IT'? "Termini di Ammortamento e Rateizzazione" : "Amortization and Installment Schedule"}</div>
          <div class="article-content">
            ${activeLang==='FR'? `L'amortissement de la dette s'établira sur la base de <strong>${loan.durationMonths}</strong> échéances récurrentes de <strong>${formatM(installmentPayment)}</strong> chacune, de manière consécutive, avec début le <strong>${firstDateFormatted}</strong> et fin le <strong>${finalDateFormatted}</strong>.` : activeLang==='IT'? `L'ammortamento si svolgerà in <strong>${loan.durationMonths}</strong> scadenze ricorrenti di valore fisso pari a <strong>${formatM(installmentPayment)}</strong>, con decorrenza prima scadenza al <strong>${firstDateFormatted}</strong>.` : `Repayments are structures across <strong>${loan.durationMonths}</strong> consecutive installments of <strong>${formatM(installmentPayment)}</strong>, starting on <strong>${firstDateFormatted}</strong> and concluding on <strong>${finalDateFormatted}</strong>.`}
          </div>

          <div class="article-title">Article 3 : ${activeLang==='FR'? "Droit souverain de remboursement anticipé sans frais" : activeLang==='IT'? "Facoltà di Estinzione Anticipata" : "Right of Prepayment Without Penalty"}</div>
          <div class="article-content">
            ${activeLang==='FR'? (isMixed ? "L'Emprunteur particulier conserve expressément la faculté discrétionnaire de solder sa dette par anticipation, sans frais ou pénalités d'office." : "L'Emprunteur conserve expressément la faculté discrétionnaire de solder sa dette par anticipation, sans frais ou pénalités d'office.") : activeLang==='IT'? (isMixed ? "Il debitore privato conserva il diritto di saldare in qualsiasi istante l'importo residuo, esente da penalità." : "Il debitore corporativo conserva il diritto di saldare in qualsiasi istante l'importo residuo, esente da penalità.") : "The borrowing party retains the full sovereign right to prepay the outstanding principal at any time without any early repayment charge."}
          </div>

          <div class="article-title">Article 4 : ${activeLang==='FR'? "Responsabilité solidaire et déclaration de solvabilité" : activeLang==='IT'? "Solidarietà e Garanzia Costituzionale" : "Guarantees and Joint Liability"}</div>
          <div class="article-content">
            ${activeLang==='FR'? (isMixed ? "L'emprunteur particulier engage solidairement l'ensemble de ses avoirs personnels pour la bonne réalisation du remboursement." : "Le signataire et ses délégations d'affaires engagent solidairement l'ensemble des avoirs de la structure emprunteuse.") : activeLang==='IT'? (isMixed ? "Il mutuatario privato impegna in solido tutti i suoi beni personali per il corretto completamento del rimborso." : "I rappresentanti aziendali certificano la solidarietà di pagamento solido ed impegnano l'entità sociale per l'adempimento.") : (isMixed ? "The private borrower commits all their personal assets jointly and severally for the proper fulfillment of the repayment." : "The corporate representatives confirm that this obligation is jointly and severally binding upon the assets of the business.")}
          </div>

          <div class="section-title">${activeLang==='FR'? "Homologation d'acte et constitution de garantie" : activeLang==='IT'? "Frais Notarili e Assicurazione" : "Notary Certification and Service Fees"}</div>
          <div class="article-content" style="font-weight: bold; background-color: #fafbfa; padding: 12px; border-left: 3px solid #1d4ed8;">
            ${activeLang==='FR'? `Pour valider l'acte, les frais obligatoires de constitution d'assurance et d'homologation de <strong>${formatM(loan.feeAmount)}</strong> devront être soldés par l'emprunteur.` : activeLang==='IT'? `L'omologazione civile prevede spese accessorie di <strong>${formatM(loan.feeAmount)}</strong> a carico del beneficiario, indispensabili prima del trasferimento.` : `To finalize records, the mandatory administrative process cost of <strong>${formatM(loan.feeAmount)}</strong> is billed, required prior to wire.`}
          </div>

          <div class="article-title">Article 5 : ${activeLang==='FR'? "Pénalités moratoires et déchéance immédiate du terme" : activeLang==='IT'? "Interessi Moratori in caso di ritardo" : "Late Payments and Interest Uplift"}</div>
          <div class="article-content">
            ${activeLang==='FR'? `Tout retard persistant de plus de cinq jours francs autorisera une majoration de <strong>${loan.penaltyRate}%</strong> mensuel assortie d'une astreinte de <strong>${formatM(loan.penaltyFixedAmount)}</strong>.` : activeLang==='IT'? `In caso di insoluto oltre i 5 giorni, si applicherà un tasso aggiuntivo del <strong>${loan.penaltyRate}%</strong> mensile unitamente alla penalità fissa di <strong>${formatM(loan.penaltyFixedAmount)}</strong>.` : `Any default persisting beyond 5 business days incurs late interest rates of <strong>${loan.penaltyRate}%</strong> monthly alongside a flat fee of <strong>${formatM(loan.penaltyFixedAmount)}</strong>.`}
          </div>

          <div class="article-title">Article 6 : ${activeLang==='FR'? "Droit applicable et attribution de juridiction" : activeLang==='IT'? "Tutela Giudiziaria e Foro Competente" : "Applicable Jurisdiction"}</div>
          <div class="article-content">
            ${activeLang==='FR'? (isMixed ? "Le règlement du contrat se réfère au droit civil et commercial applicable. Tout conflit sera du ressort exclusif du Tribunal compétent civilement." : "Le règlement du contrat se réfère au cadre réglementaire des affaires européennes. Tout conflit sera du ressort exclusif du Tribunal de Commerce.") : activeLang==='IT'? (isMixed ? "Il contratto è disciplinato dalle leggi civili e commerciali applicabili. Per qualsiasi vertenza, il foro competente ha giurisdizione esclusiva." : "Il contratto è disciplinato dalle leggi commerciali europee. Per qualsiasi vertenza, il foro commerciale eletto ha competenza esclusiva.") : (isMixed ? "This agreement is governed by the rules of applicable civil and commercial law, any claims submitted exclusively to the competent Courts of Justice." : "This commercial agreement is governed by the rules of European Trade Law, any claims submitted exclusively to the Commercial Courts.")}
          </div>
        `}

        <p style="text-align: right; margin-top: 30px; font-style: italic; font-weight: bold; border-top: 1px dotted #ccc; padding-top: 10px;">
          ${currentT.labelDone}
        </p>

        <!-- Dynamic Signature blocks with full high fidelity seals & drawn signature data -->
        <table class="signature-section" style="width: 100%; border-collapse: separate; border-spacing: 12px; margin-top: 35px; border-top: 2px solid #111827; padding-top: 15px;">
          <tr>
            <!-- Column 1: LENDER (CREDIVITE S.A.) WITH SPACIOUS PACKAGING -->
            <td class="sig-cell" style="width: 33%; vertical-align: top; border: 1px solid #b8c2cc; border-radius: 4px; padding: 12px; background-color: #f4f6f8; position: relative;">
              <strong style="color: #1d4ed8; font-size: 9.5pt; font-family: serif; text-transform: uppercase; display: block; border-bottom: 1px solid #1d4ed8; padding-bottom: 4px; margin-bottom: 6px;">${customExportLenderRole}</strong>
              <span style="font-size: 8pt; color: #4b5563; display: block; margin-bottom: 4px;">${isDonation ? (activeLang === 'FR' ? "Donateur :" : activeLang === 'IT' ? "Donatore :" : "Donor :") : (activeLang === 'FR' ? "Créancier :" : activeLang === 'IT' ? "Creditore :" : "Creditor :")} <strong>${lender.name}</strong></span>
              
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
                        ★ ${isDonation ? (lender.name.substring(0, 14).toUpperCase() || "DONATEUR") : isB2B ? (lender.name.substring(0, 14).toUpperCase() || "SOCIETE") : "CREDIVITE S.A."} ★
                      </textPath>
                    </text>
                    
                    <path id="lender-stamp-text-lower" d="M 84,50 A 34,34 0 1,1 16,50" fill="none" />
                    <text font-size="4.5" font-weight="bold" fill="#1d4ed8">
                      <textPath href="#lender-stamp-text-lower" startOffset="50%" text-anchor="middle">
                        ${isDonation ? (activeLang === 'FR' ? "DONATION ENREGISTRÉE" : activeLang === 'IT' ? "DONAZIONE REGISTRATA" : "SECURED DONATION DEED") : (activeLang === 'FR' ? "CONTRÔLE ADMINISTRATIF" : activeLang === 'IT' ? "CONTROLLO AMMINISTRATIVO" : "DIRECTORATE SECURED LOAN")}
                      </textPath>
                    </text>
                    
                    <text x="50" y="47" font-size="4.2" text-anchor="middle" fill="#1d4ed8">${activeLang === 'FR' ? "OFFICIEL" : activeLang === 'IT' ? "UFFICIALE" : "OFFICIAL"}</text>
                    <text x="50" y="58" font-size="5.2" font-weight="black" text-anchor="middle" fill="#1d4ed8">${isDonation ? (activeLang === 'FR' ? "DONNÉ" : activeLang === 'IT' ? "DONATO" : "GIFTED") : (activeLang === 'FR' ? "AGRÉÉ" : activeLang === 'IT' ? "APPROVATO" : "APPROVED")}</text>
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
                ${styling.showStamp ? `
                  <div style="position: absolute; right: -28px; bottom: -32px; transform: rotate(${styling.stampRotation || -15}deg) scale(0.85); opacity: 0.95; z-index: 100; pointer-events: none;">
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
                      <text x="75" y="67" font-family="serif" font-size="6.5" font-weight="bold" text-anchor="middle" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}">${activeLang === 'FR' ? "HOMOLOGUÉ" : activeLang === 'IT' ? "OMOLOGATO" : "COMMISSIONED"}</text>
                      <text x="75" y="82" font-family="serif" font-size="6.5" font-weight="bold" text-anchor="middle" fill="${styling.stampColor === 'text-blue-700' ? '#1d4ed8' : styling.stampColor === 'text-red-700' ? '#b91c1c' : styling.stampColor === 'text-emerald-700' ? '#047857' : '#1e293b'}">${activeLang === 'FR' ? "SCEAU CIVIL" : activeLang === 'IT' ? "SIGILLO CIVILE" : "STATE SEAL"}</text>
                    </svg>
                  </div>
                ` : ''}
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
              <strong style="color: #047857; font-size: 9.5pt; font-family: serif; text-transform: uppercase; display: block; border-bottom: 1px solid #047857; padding-bottom: 4px; margin-bottom: 6px;">${customExportBorrowerRole}</strong>
              <span style="font-size: 8pt; color: #4b5563; display: block; margin-bottom: 4px;">${isDonation ? (activeLang === 'FR' ? "Donataire :" : activeLang === 'IT' ? "Donatario :" : "Donee :") : (activeLang === 'FR' ? "Débiteur :" : activeLang === 'IT' ? "Debitore :" : "Debtor :")} <strong>${borrower.name}</strong></span>
              
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

        <!-- Page-level master stamp deactivated here (moved internally under the Notary column for optimal page locking) -->
      </body>
      </html>
    `;
  };

  return (
    <div id="notary-app-root" className={`min-h-screen bg-[#0f172a] text-slate-100 flex flex-col print:bg-white print:h-auto print:overflow-visible ${isGenerated ? 'h-auto overflow-y-auto' : 'h-screen overflow-hidden'}`}>
      
      {/* DOWNLOAD PROGRESS & VERIFICATION STATUS MODAL OVERLAY */}
      {downloadState.status !== 'idle' && (
        <div id="download-progress-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div id="download-progress-card" className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl max-w-md w-full overflow-hidden p-6 text-center text-slate-100 animate-fade-in">
            {downloadState.status === 'preparing' ? (
              <div className="space-y-4">
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">Génération du document en cours...</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calcul de la mise en page administrative, formatage de sécurité et packaging du fichier en cours d'encapsulation. Veuillez patienter un instant.
                </p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center py-2">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">Votre document est prêt !</h3>
                <p className="text-[11px] text-slate-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 truncate">
                  {downloadState.fileName}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed text-left">
                  Le téléchargement a dû s'initier automatiquement. Si la sécurité de votre appareil l'a bloqué, cliquez sur le bouton vert ci-dessous pour forcer le téléchargement directement de notre serveur.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (downloadState.onDownloadTrigger) {
                        downloadState.onDownloadTrigger();
                      }
                    }}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger le document
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadState({ status: 'idle', fileName: '', format: 'html' })}
                    className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors border border-slate-700 cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GLOBAL CSS CUSTOM OVERRIDES AND ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
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
        }

        /* === PRESTIGIOUS HIGH DENSITY ADMINISTRATIVE GUILLOCHÉ / BALANCE === */
        #printed-contract-sheet, .document-guilloche-bg {
          position: relative !important;
          background-color: #f0f4f8 !important;
        }

        #printed-contract-sheet::before, .document-guilloche-bg::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background-image: 
            linear-gradient(90deg, rgba(0, 70, 140, 0.04) 1px, transparent 1px),
            linear-gradient(rgba(0, 80, 150, 0.035) 1px, transparent 1px) !important;
          background-size: 70px 55px, 55px 70px !important;
          opacity: 0.65 !important;
          z-index: 1 !important;
          pointer-events: none !important;
        }

        /* Guillochis courbes principal - Version plus claire et légère */
        #printed-contract-sheet::after, .document-guilloche-bg::after {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cdefs%3E%3Cpattern id='guilloche' patternUnits='userSpaceOnUse' width='300' height='300'%3E%3Cpath d='M50 100 Q120 30 200 110 Q280 190 220 260 Q150 320 70 240 Q30 170 80 120' fill='none' stroke='%23004a80' stroke-width='1.8' opacity='0.09'/%3E%3Cpath d='M80 180 Q160 110 250 160 Q340 220 260 290 Q180 340 100 260' fill='none' stroke='%23006ab0' stroke-width='1.3' opacity='0.07'/%3E%3Cpath d='M30 220 Q110 150 190 210 Q270 270 210 330' fill='none' stroke='%23008cd0' stroke-width='1' opacity='0.06'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23guilloche)'/%3E%3C/svg%3E") !important;
          background-size: 260px 260px !important;
          mix-blend-mode: multiply !important;
          opacity: 0.45 !important;
          z-index: 2 !important;
          pointer-events: none !important;
        }

        /* Frame container for relative stacking */
        #printed-contract-sheet > *, .document-guilloche-bg > * {
          position: relative;
          z-index: 10;
        }

        .background-watermark {
          background-image: url('...');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          z-index: 5 !important;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght=500;700&family=La+Belle+Aurore&family=Reenie+Beanie&family=Nothing+You+Could+Do&display=swap');
        
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
      <div className={`flex-1 print:overflow-visible flex flex-col ${isGenerated ? 'overflow-visible h-auto' : 'overflow-hidden'}`}>
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
                
                {/* GLOBAL DOCUMENT TYPE & CONTEXT SELECTOR */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3.5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <span className="text-xs font-bold text-amber-500 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                      <FileText className="h-4 w-4" />
                      Configuration Globale de l'Acte Cons civil
                    </span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/10">
                      Standard Européen
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-zinc-300 font-bold block mb-1">1. Contexte Juridique de l'Acte</label>
                      <select
                        value={contractType}
                        onChange={(e) => {
                          const val = e.target.value as ContractType;
                          setContractType(val);
                          setBannerAlert(`Nouveau modèle de contrat configuré : ${
                            val === 'personal_loan' ? 'Prêt entre particuliers' :
                            val === 'business_loan' ? 'Prêt entre entreprise (B2B)' :
                            val === 'party_business_loan' ? 'Prêt entre particulier et entreprise' :
                            'Contrat de donation officielle'
                          }.`);
                          
                          // If current document is mortgage and they switched to donation, let's stay on main contract
                          if (val === 'donation' && selectedDoc !== 'main_contract') {
                            setSelectedDoc('main_contract');
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      >
                        <option value="personal_loan">🤝 Prêt entre Particuliers Civils</option>
                        <option value="business_loan">🏢 Prêt entre Entreprises (B2B - Pro)</option>
                        <option value="party_business_loan">⚖️ Prêt mixte (Particulier vers Entreprise)</option>
                        <option value="donation">🎁 Acte de Donation Officiel (Libéralité)</option>
                      </select>
                      <span className="text-[9.5px] text-zinc-500 mt-1 block">
                        Fige l'introduction légale et adapte les clauses aux exigences de chaque profil.
                      </span>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-300 font-bold block mb-1">2. Document Spécifique à Configurer / Exporter</label>
                      <select
                        value={selectedDoc}
                        onChange={(e) => {
                          const val = e.target.value as DocumentViewType;
                          setSelectedDoc(val);
                          setBannerAlert(`Document sélectionné : ${e.target.options[e.target.selectedIndex].text}. Remplissez le formulaire puis affichez l'acte !`);
                        }}
                        className="w-full bg-slate-900 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      >
                        <optgroup label="CONTRATS & ACCORDS PRINCIPAUX">
                          <option value="main_contract">📄 Acte de Contrat Principal d'Origine</option>
                          {contractType !== 'donation' && (
                            <>
                              <option value="loan_offer">✉️ Offre de Prêt Acceptée Formelle</option>
                              <option value="amortization_schedule">📅 Tableau d'Amortissement Consolidé</option>
                              <option value="borrower_insurance">🛡️ Contrat d'Assurance Emprunteur Juris</option>
                              <option value="general_credit_terms">📚 Conditions Générales de Crédit Consortiaux</option>
                            </>
                          )}
                        </optgroup>
                        {contractType !== 'donation' && (
                          <optgroup label="SÛRETÉS & RECOUVREMENT">
                            <option value="sepa_mandate">🏦 Mandat de Prélèvement SEPA Européen</option>
                            <option value="guarantor_agreement">👤 Contrat de Cautionnement Solidaire (Garant)</option>
                            <option value="mortgage_deed">🏠 Acte d'Hypothèque Immobilière Solennel</option>
                            <option value="pledge_agreement">🪙 Contrat de Nantissement ou Gage de Sûreté</option>
                            <option value="debt_acknowledgment">📜 Reconnaissance de Dette Civile Officielle</option>
                          </optgroup>
                        )}
                        <optgroup label="FORMALITÉS ADMINISTRATIVES & FISCALITÉ">
                          <option value="fees_agreement">💼 Accord sur les Frais de Dossier & Commissions</option>
                          <option value="notary_registration">🏛️ Acte d'Enregistrement Notarial Judiciaire</option>
                          <option value="tva_tax_statement">📊 Déclaration Administrative de TVA & Fiscalité</option>
                          {contractType !== 'donation' && (
                            <option value="loan_addendum">✍️ Avenant Modificatif au Contrat de Prêt</option>
                          )}
                        </optgroup>
                      </select>
                      <span className="text-[9.5px] text-zinc-500 mt-1 block">
                        Exige l'ensemble des 14 documents requis par les administrations européennes lors d'un audit de prêt ou succession.
                      </span>
                    </div>
                  </div>
                </div>
                
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
                          <option value="DE">Allemagne 🇩🇪</option>
                          <option value="ES">Espagne 🇪🇸</option>
                          <option value="BE">Belgique 🇧🇪</option>
                          <option value="NL">Pays-Bas 🇳🇱</option>
                          <option value="PT">Portugal 🇵🇹</option>
                          <option value="AT">Autriche 🇦🇹</option>
                          <option value="PL">Pologne 🇵🇱</option>
                          <option value="RO">Roumanie 🇷🇴</option>
                          <option value="SE">Suède 🇸🇪</option>
                          <option value="CH">Suisse 🇨🇭</option>
                          <option value="GB">Royaume-Uni 🇬🇧</option>
                          <option value="UN">Nations Unies 🇺🇳</option>
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
                          <option value="DE">Allemagne 🇩🇪</option>
                          <option value="ES">Espagne 🇪🇸</option>
                          <option value="BE">Belgique 🇧🇪</option>
                          <option value="NL">Pays-Bas 🇳🇱</option>
                          <option value="PT">Portugal 🇵🇹</option>
                          <option value="AT">Autriche 🇦🇹</option>
                          <option value="PL">Pologne 🇵🇱</option>
                          <option value="RO">Roumanie 🇷🇴</option>
                          <option value="SE">Suède 🇸🇪</option>
                          <option value="CH">Suisse 🇨🇭</option>
                          <option value="GB">Royaume-Uni 🇬🇧</option>
                          <option value="UN">Nations Unies 🇺🇳</option>
                        </select>
                      </div>
                    </div>

                    {/* Language and Translation selector */}
                    <div className="p-4 bg-slate-950/20 border border-slate-850 rounded-lg space-y-3.5">
                      <div>
                        <span className="text-xs font-bold text-slate-300 block">Langue officielle de l'Acte de Prêt</span>
                        <span className="text-[10px] text-zinc-500 block">Déterminez la langue d'origine ou traduisez en direct d'autres langues via l'IA Gemini.</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] text-zinc-400 font-medium block mb-1">Langue de base</label>
                          <select 
                            value={styling.language === 'CUSTOM' ? 'CUSTOM' : styling.language} 
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'CUSTOM') {
                                handleLanguageChange('CUSTOM');
                              } else {
                                handleLanguageChange(val as any);
                              }
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                          >
                            <option value="FR">Français 🇫🇷 (Conseillé par défaut)</option>
                            <option value="IT">Italien 🇮🇹</option>
                            <option value="EN">Anglais 🇬🇧</option>
                            <option value="ES">Espagnol 🇪🇸</option>
                            <option value="DE">Allemand 🇩🇪</option>
                            <option value="PT">Portugais 🇵🇹</option>
                            <option value="NL">Néerlandais 🇳🇱</option>
                            <option value="PL">Polonais 🇵🇱</option>
                            <option value="RO">Roumain 🇷🇴</option>
                            <option value="CUSTOM">Option Traduction IA Personnalisée 🤖</option>
                          </select>
                        </div>
                        
                        {(styling.language === 'CUSTOM' || !['FR', 'IT', 'EN', 'ES', 'DE', 'PT', 'NL', 'PL', 'RO', 'BOTH'].includes(styling.language)) && (
                          <div className="space-y-1">
                            <label className="text-[11px] text-zinc-400 font-medium block mb-1">Traduire dans n'importe quelle langue (ex: Arabe, Chinois, Russe, etc.)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder="Saisir la langue..."
                                defaultValue={styling.customLanguageLabel || ''}
                                onBlur={(e) => {
                                  const val = e.target.value.trim();
                                  if (val && val !== styling.customLanguageLabel) {
                                    handleLangToggleAndTranslate(val);
                                  }
                                }}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {isTranslating ? (
                        <div className="p-2.5 bg-slate-950 border border-slate-850 rounded-md text-xs text-amber-400 flex items-center gap-2 font-mono">
                          <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                          Configuration et traduction IA en cours d'exécution...
                        </div>
                      ) : (
                        styling.language === 'CUSTOM' && styling.customLanguageLabel && (
                          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-xs text-amber-300">
                            ✨ Le contrat est parfaitement configuré pour être généré et exporté en <strong>{styling.customLanguageLabel}</strong>.
                          </div>
                        )
                      )}
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
          <div id="action-menu-view-contract" className="flex-1 flex flex-col bg-[#0f172a] print:bg-white">
            
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
                  onClick={triggerDownloadPDF}
                  className="w-full sm:w-auto p-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs rounded-lg transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer scale-102 active:scale-98"
                  title="Télécharger l'acte authentique sous format PDF officiel et autonome"
                >
                  <Download className="h-4 w-4 text-sky-200 animate-bounce" />
                  Télécharger en PDF
                </button>

                <button
                  onClick={triggerPrintPDF}
                  className="w-full sm:w-auto p-2.5 px-4.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-extrabold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-md uppercase tracking-wide"
                  title="Ouvrir l'imprimante système pour enregistrer en PDF propre A4 ou imprimer"
                >
                  <Printer className="h-4 w-4 text-slate-300" />
                  Imprimer / PDF
                </button>
                
                <button
                  onClick={() => triggerDownloadContract('html')}
                  className="w-full sm:w-auto p-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-lg transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer scale-102 active:scale-98"
                  title="Télécharger l'acte au format HTML 100% éditable (Recommandé pour smartphones, tablettes Android et PC)"
                >
                  <FileText className="h-4 w-4" />
                  HTML Modifiable
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

            {/* Document Navigation Sub-Bar */}
            <div className="bg-[#111827] border-b border-slate-800 px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 print:hidden flex-shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span className="text-slate-300 font-bold">📄 Document affiché à l'écran :</span>
                <span className="text-slate-400 text-[11px]">Basculez librement entre les 14 actes constitutifs du dossier juridique européen.</span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                <select
                  value={contractType}
                  onChange={(e) => {
                    const val = e.target.value as ContractType;
                    setContractType(val);
                    setBannerAlert(`Nouveau modèle de contrat configuré : ${
                      val === 'personal_loan' ? "Prêt entre particuliers" :
                      val === 'business_loan' ? "Prêt entre entreprise (B2B)" :
                      val === 'party_business_loan' ? "Prêt particulier-entreprise" :
                      "Acte de donation officielle"
                    }`);
                    if (val === 'donation' && selectedDoc !== 'main_contract') {
                      setSelectedDoc('main_contract');
                    }
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-9 font-semibold"
                >
                  <option value="personal_loan">🤝 Prêt entre Particuliers</option>
                  <option value="business_loan">🏢 Prêt entre Entreprises (B2B)</option>
                  <option value="party_business_loan">⚖️ Prêt Particulier-Entreprise</option>
                  <option value="donation">🎁 Acte de Donation</option>
                </select>

                <select
                  value={selectedDoc}
                  onChange={(e) => {
                    const val = e.target.value as DocumentViewType;
                    setSelectedDoc(val);
                    setBannerAlert(`Document affiché : ${e.target.options[e.target.selectedIndex].text}`);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 h-9 font-bold"
                >
                  <optgroup label="CONTRATS & ACCORDS PRINCIPAUX">
                    <option value="main_contract">📄 Acte de Contrat Principal d'Origine</option>
                    {contractType !== 'donation' && (
                      <>
                        <option value="loan_offer">✉️ Offre de Prêt Acceptée Formelle</option>
                        <option value="amortization_schedule">📅 Tableau d'Amortissement Consolidé</option>
                        <option value="borrower_insurance">🛡️ Contrat d'Assurance Emprunteur Juris</option>
                        <option value="general_credit_terms">📚 Conditions Générales de Crédit Consortiaux</option>
                      </>
                    )}
                  </optgroup>
                  {contractType !== 'donation' && (
                    <optgroup label="SÛRETÉS & RECOUVREMENT">
                      <option value="sepa_mandate">🏦 Mandat de Prélèvement SEPA Européen</option>
                      <option value="guarantor_agreement">👤 Contrat de Cautionnement Solidaire (Garant)</option>
                      <option value="mortgage_deed">🏠 Acte d'Hypothèque Immobilière Solennel</option>
                      <option value="pledge_agreement">🪙 Contrat de Nantissement ou Gage de Sûreté</option>
                      <option value="debt_acknowledgment">📜 Reconnaissance de Dette Civile Officielle</option>
                    </optgroup>
                  )}
                  <optgroup label="FORMALITÉS ADMINISTRATIVES & FISCALITÉ">
                    <option value="fees_agreement">💼 Accord sur les Frais de Dossier & Commissions</option>
                    <option value="notary_registration">🏛️ Acte d'Enregistrement Notarial Judiciaire</option>
                    <option value="tva_tax_statement">📊 Déclaration Administrative de TVA & Fiscalité</option>
                    {contractType !== 'donation' && (
                      <option value="loan_addendum">✍️ Avenant Modificatif au Contrat de Prêt</option>
                    )}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Live Translation Bar */}
            <div className="bg-slate-950 border-b border-slate-850 px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 print:hidden flex-shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                <span className="text-slate-300 font-bold">Traducteur IA Gemini (Optionnel) :</span>
                <span className="text-slate-400 text-[11px]">Traduire l'acte juridique généré dans n'importe quelle langue avant l'exportation.</span>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={styling.language === 'CUSTOM' ? (styling.customLanguageLabel || 'CUSTOM_PROMPT') : styling.language}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    if (['FR', 'IT', 'EN'].includes(val)) {
                      handleLanguageChange(val as any);
                    } else if (val === 'CUSTOM_PROMPT') {
                      handleLanguageChange('CUSTOM');
                    } else {
                      handleLangToggleAndTranslate(val);
                    }
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-9"
                >
                  <option value="">-- Sélectionner n'importe quelle langue pour traduire --</option>
                  <option value="FR">Français 🇫🇷 (Défaut)</option>
                  <option value="IT">Italien 🇮🇹</option>
                  <option value="EN">Anglais 🇬🇧</option>
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
                  <option value="CUSTOM_PROMPT">✍️ Saisir une autre langue spécifique...</option>
                </select>

                {(styling.language === 'CUSTOM' || styling.language === 'CUSTOM_PROMPT') && (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="Saisir la langue..."
                      defaultValue={styling.customLanguageLabel || ''}
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        if (val && val !== styling.customLanguageLabel) {
                          handleLangToggleAndTranslate(val);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val && val !== styling.customLanguageLabel) {
                            handleLangToggleAndTranslate(val);
                          }
                        }
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-9 w-36"
                    />
                  </div>
                )}

                {isTranslating ? (
                  <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-amber-400 font-bold font-mono h-9">
                    <RefreshCw className="h-3 w-3 animate-spin text-amber-400" />
                    En cours...
                  </div>
                ) : (
                  styling.language === 'CUSTOM' && styling.customLanguageLabel && (
                    <div className="hidden lg:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-300 font-semibold font-mono h-9">
                      Contrat traduit en « {styling.customLanguageLabel} »
                    </div>
                  )
                )}
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
            <div className="p-4 sm:p-8 bg-[#151c2c] print:p-0 print:bg-white overflow-visible h-auto">
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
                  contractType={contractType}
                  selectedDoc={selectedDoc}
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
