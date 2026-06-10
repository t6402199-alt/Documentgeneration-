/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PartyDetails {
  name: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  idNumber: string;
  idIssuedBy: string;
  idIssuedDate: string;
  phone: string;
  email: string;
  profession: string;
  employer?: string; // Optionnel (pour l'emprunteur)
  monthlyIncome?: number; // Optionnel (pour l'emprunteur)
  signatureType: 'text' | 'draw';
  signatureDrawData: string; // Base64 png data or empty
  fontStyle: string; // cursive style name
  hasSigned?: boolean; // toggle to skip fake signature if not signed
}

export interface LoanDetails {
  amount: number;
  currency: string;
  durationMonths: number;
  interestRate: number;
  country: string;
  city: string;
  dateSigned: string;
  feeAmount: number;
  customReference: string;
  fundPurpose: string; // Motif d'utilisation des fonds
  firstRepaymentDate: string; // Date de 1ère échéance
  finalRepaymentDate: string; // Date de fin de remboursement
  penaltyRate: number; // Pénalités en cas de retard (% mensuel)
  penaltyFixedAmount: number; // Pénalités fixes forfaitaires
  tvaRate: number; // Taux de TVA applicable sur frais administratifs / intérêts (%)
  repaymentFrequency: 'mensuel' | 'trimestriel' | 'unique'; // Fréquence de remboursement
  notaryLicense: string; // Licence professionnelle du notaire
}

export interface StylingDetails {
  flagLeft: string; // 'IT' | 'FR' | 'EU' | 'UN' | 'JUSTICE'
  flagRight: string; // 'IT' | 'FR' | 'EU' | 'UN' | 'JUSTICE'
  headerText: string;
  headerSubText: string;
  watermarkOpacity: number; // 0 to 1
  stampColor: string; // hex or tailwind text class
  stampRotation: number; // degrees
  stampText: string;
  subStampText: string;
  showStamp: boolean;
  language: 'FR' | 'IT' | 'BOTH' | 'EN' | 'ES' | 'DE' | 'PT' | 'NL' | 'PL' | 'RO' | 'CUSTOM';
  customLanguageLabel?: string;
  customTranslations?: any;
  customTranslationsWord?: any;
}

export interface ArticleContent {
  id: string;
  titleFR: string;
  titleIT: string;
  contentFR: string;
  contentIT: string;
}
