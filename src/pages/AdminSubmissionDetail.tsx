import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSubmissionStore } from '../store/submissionStore';
import { ArrowLeft, User, MapPin, Building, Activity } from 'lucide-react';

export default function AdminSubmissionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { submissions, updateSubmissionStatus } = useSubmissionStore();
  
  const sub = submissions.find(s => s.id === id);

  if (!sub) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Data Tidak Ditemukan</h2>
        <button onClick={() => navigate('/admin/submissions')} className="text-blue-600 hover:underline">
          Kembali ke Daftar Peserta
        </button>
      </div>
    );
  }

  const Label = ({ children }: { children: React.ReactNode }) => <span className="text-sm font-semibold text-gray-500 block mb-1">{children}</span>;
  const Value = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <div className={`text-gray-900 font-medium mb-4 pb-2 border-b border-gray-100 ${className}`}>{children || '-'}</div>;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <Link to="/admin/submissions" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6">
        <ArrowLeft size={16} /> Kembali ke Daftar Peserta
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-astra-text)]">{sub.namaKelompok}</h1>
          <p className="text-gray-500 capitalize">{sub.pilar} - {sub.kategori?.replace('_', ' ')}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Ubah Status:</span>
          <select 
            value={sub.status}
            onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
            className="border-2 border-blue-500 rounded-md py-1.5 px-3 text-sm font-bold uppercase text-blue-700 bg-blue-50 focus:ring-blue-500 outline-none"
          >
            <option value="draft">DRAFT</option>
            <option value="submitted">SUBMITTED</option>
            <option value="screening">SCREENING</option>
            <option value="top10">TOP 10</option>
            <option value="finalist">FINALIST</option>
            <option value="rejected">REJECTED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 border-b pb-3 mb-4 text-gray-800"><User size={18} /> Profil Pendaftar</h3>
            <Label>Nama Ketua / Individu</Label><Value>{sub.namaKetua || 'Individu'}</Value>
            <Label>Email</Label><Value>{sub.email}</Value>
            <Label>No HP / WA</Label><Value>{sub.noHp}</Value>
            <Label>Tanggal Daftar</Label><Value>{new Date(sub.submittedAt || sub.lastUpdated).toLocaleDateString('id-ID')}</Value>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 border-b pb-3 mb-4 text-gray-800"><MapPin size={18} /> Lokasi (DSA)</h3>
            <Label>Nama DSA</Label><Value>{sub.namaDsa}</Value>
            <Label>Provinsi</Label><Value>{sub.provinsi}</Value>
            <Label>Kabupaten/Kota</Label><Value>{sub.kabupaten}</Value>
            <Label>Kecamatan</Label><Value>{sub.kecamatan}</Value>
            <Label>Desa/Kelurahan</Label><Value className="border-0 mb-0">{sub.desa}</Value>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 border-b pb-3 mb-5 text-gray-800"><Building size={18} /> Info Program</h3>
            <div className="grid grid-cols-2 gap-x-6">
              <div><Label>Grup Astra Pembina</Label><Value>{sub.grupAstra}</Value></div>
              <div><Label>Kategori Program</Label><Value className="capitalize">{sub.kategori?.replace('_', ' ')}</Value></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 border-b pb-3 mb-5 text-gray-800"><Activity size={18} /> Narasi Program</h3>
            <Label>Latar Belakang</Label>
            <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiBackground || '-'}</p>

            <Label>Tujuan (Objective)</Label>
            <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiObjective || '-'}</p>

            <Label>Dampak Program</Label>
            <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiDampak || '-'}</p>

            <Label>Pencapaian (Achievement)</Label>
            <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiAchievement || '-'}</p>

            <Label>Pihak yang Terlibat</Label>
            <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiPihakTerlibat || '-'}</p>

            <Label>Target 2 Tahun Ke Depan</Label>
            <p className="text-gray-800 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">{sub.narasiTarget2Tahun || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
