// Types for Astra 4 Pilar prototype

export type UserRole = 'public' | 'admin' | 'judge' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  pilar?: string; // For judge
}

// SubmissionDraft represents the data being collected in the 4‑step registration form.
// The "namaDsa" field follows the example format: "{Nama Desa - Kecamatan - Kab/Kota}".
export interface SubmissionDraft {
  id: string;
  userId: string;
  pilar: string;
  kategori: string;
  namaKelompok: string;
  namaKetua: string;
  email: string;
  noHp: string;
  namaDsa: string; // Example: "Desa Harapan - Kecamatan Jaya - Kab/Kota Bandung"
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  grupAstra: string;
  // Narrative fields replace former numeric counts
  narasiBackground: string;
  narasiObjective: string;
  narasiDampak: string;
  narasiAchievement: string;
  narasiPihakTerlibat: string;
  narasiTarget2Tahun: string;
  // Timestamps
  lastUpdated: string;
}

export type SubmissionStatus = 'draft' | 'submitted' | 'screening' | 'top10' | 'finalist' | 'rejected';

export interface Submission extends SubmissionDraft {
  status: SubmissionStatus;
  submittedAt?: string;
}

export interface Score {
  id: string;
  submissionId: string;
  judgeId: string;
  durasiProgram: number;
  backgroundProgram: number;
  dampakProgram: number;
  notes: string;
  scoredAt: string;
}

