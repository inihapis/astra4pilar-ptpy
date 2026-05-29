import { useState, useEffect } from 'react';
import { useDraftStore } from '../store/draftStore';
import { useSubmissionStore } from '../store/submissionStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { wilayahData, grupAstraOptions } from '../data/mockData';
import CreatableSelect from '../components/CreatableSelect';

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function OptionalLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
  );
}

export default function RegisterPage() {
  const { user } = useAuthStore();
  const { draft, updateDraft, clearDraft } = useDraftStore();
  const { addSubmission } = useSubmissionStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const pillars = [
    { id: 'kesehatan', title: 'Kesehatan', description: 'Program inovasi bidang kesehatan masyarakat.' },
    { id: 'pendidikan', title: 'Pendidikan', description: 'Program peningkatan kualitas pendidikan.' },
    { id: 'lingkungan', title: 'Lingkungan', description: 'Program pelestarian lingkungan dan keberlanjutan.' },
    { id: 'kewirausahaan', title: 'Kewirausahaan', description: 'Program pengembangan ekonomi dan UMKM.' },
  ];

  const categories = [
    { id: 'inovasi_kelompok', label: 'Inovasi Kelompok' },
    { id: 'tokoh_individu', label: 'Tokoh Penggerak Individu' }
  ];

  // Wilayah derived lists
  const provinsiList = Object.keys(wilayahData);
  const kabupatenList = draft?.provinsi ? Object.keys(wilayahData[draft.provinsi] || {}) : [];
  const kecamatanList = draft?.provinsi && draft?.kabupaten ? Object.keys(wilayahData[draft.provinsi]?.[draft.kabupaten] || {}) : [];
  const desaList = draft?.provinsi && draft?.kabupaten && draft?.kecamatan ? (wilayahData[draft.provinsi]?.[draft.kabupaten]?.[draft.kecamatan] || []) : [];

  // Mock autosave effect
  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, [draft]);

  if (!user || user.role !== 'public') {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Akses Terbatas</h2>
        <p className="mb-6">Silakan login sebagai peserta (Public) untuk mendaftar.</p>
        <button onClick={() => navigate('/login')} className="bg-[var(--color-astra-blue)] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
          Login Sekarang
        </button>
      </div>
    );
  }

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (draft) {
      addSubmission({
        ...draft,
        id: `sub-${Date.now()}`,
        userId: user.id,
      } as any);
      clearDraft();
      navigate('/');
      alert('Pendaftaran berhasil disubmit!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateDraft({ [e.target.name]: e.target.value });
  };

  const handlePillarCategorySelect = (pilarId: string, categoryId: string) => {
    updateDraft({ pilar: pilarId, kategori: categoryId });
  };

  // Reset child wilayah fields when parent changes
  const handleProvinsiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraft({ provinsi: e.target.value, kabupaten: '', kecamatan: '', desa: '' });
  };
  const handleKabupatenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraft({ kabupaten: e.target.value, kecamatan: '', desa: '' });
  };
  const handleKecamatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraft({ kecamatan: e.target.value, desa: '' });
  };

  const inputClass = 'w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-white focus:ring-[var(--color-astra-blue)] focus:border-[var(--color-astra-blue)] outline-none';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-astra-text)]">Pendaftaran Program</h1>
        <p className="text-gray-500 mt-2">Langkah {step} dari {totalSteps}:
          {step === 1 && ' Pilar & Kategori'}
          {step === 2 && ' Data Peserta'}
          {step === 3 && ' Data Program'}
          {step === 4 && ' Review & Submit'}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div className="bg-[var(--color-astra-blue)] h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">

        {/* ========== STEP 1: Pilar & Kategori ========== */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Pilih Pilar & Kategori Lombanya <span className="text-red-500">*</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                  <h3 className="text-lg font-bold text-[var(--color-astra-blue)] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{pillar.description}</p>
                  <div className="space-y-3">
                    {categories.map(cat => {
                      const isSelected = draft?.pilar === pillar.id && draft?.kategori === cat.id;
                      return (
                        <label
                          key={cat.id}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-[var(--color-astra-blue)] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <input
                            type="radio"
                            name="pilar_kategori"
                            checked={isSelected}
                            onChange={() => handlePillarCategorySelect(pillar.id, cat.id)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">{cat.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== STEP 2: Data Peserta ========== */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Data Peserta</h2>

            {/* Nama DSA di paling atas */}
            <div>
              <RequiredLabel>Nama DSA (Desa Sejahtera Astra)</RequiredLabel>
              <input type="text" name="namaDsa" value={draft?.namaDsa || ''} onChange={handleChange} className={inputClass} placeholder="Masukkan nama DSA..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <RequiredLabel>Nama Kelompok / Individu</RequiredLabel>
                <input type="text" name="namaKelompok" value={draft?.namaKelompok || ''} onChange={handleChange} className={inputClass} placeholder="Masukkan nama..." />
              </div>
              <div>
                <OptionalLabel>Nama Ketua (Kosongkan jika individu)</OptionalLabel>
                <input type="text" name="namaKetua" value={draft?.namaKetua || ''} onChange={handleChange} className={inputClass} placeholder="Nama ketua kelompok..." />
              </div>
              <div>
                <RequiredLabel>Email</RequiredLabel>
                <input type="email" name="email" value={draft?.email || ''} onChange={handleChange} className={inputClass} placeholder="Alamat email aktif" />
              </div>
              <div>
                <RequiredLabel>Nomor HP (WhatsApp)</RequiredLabel>
                <input type="tel" name="noHp" value={draft?.noHp || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: 08123456789" />
              </div>
            </div>

            {/* Wilayah - Dropdown terpisah */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Alamat Wilayah</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <RequiredLabel>Provinsi</RequiredLabel>
                  <select name="provinsi" value={draft?.provinsi || ''} onChange={handleProvinsiChange} className={inputClass}>
                    <option value="">Pilih Provinsi...</option>
                    {provinsiList.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <RequiredLabel>Kabupaten / Kota</RequiredLabel>
                  <select name="kabupaten" value={draft?.kabupaten || ''} onChange={handleKabupatenChange} className={inputClass} disabled={!draft?.provinsi}>
                    <option value="">Pilih Kabupaten/Kota...</option>
                    {kabupatenList.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <RequiredLabel>Kecamatan</RequiredLabel>
                  <select name="kecamatan" value={draft?.kecamatan || ''} onChange={handleKecamatanChange} className={inputClass} disabled={!draft?.kabupaten}>
                    <option value="">Pilih Kecamatan...</option>
                    {kecamatanList.map(kec => <option key={kec} value={kec}>{kec}</option>)}
                  </select>
                </div>
                <div>
                  <RequiredLabel>Desa / Kelurahan</RequiredLabel>
                  <select name="desa" value={draft?.desa || ''} onChange={handleChange} className={inputClass} disabled={!draft?.kecamatan}>
                    <option value="">Pilih Desa/Kelurahan...</option>
                    {desaList.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              {draft?.desa && draft?.kecamatan && draft?.kabupaten && (
                <p className="text-xs text-gray-500 mt-3 bg-gray-50 p-2 rounded">
                  📍 {draft.desa} — {draft.kecamatan} — {draft.kabupaten} — {draft.provinsi}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========== STEP 3: Data Program ========== */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Data Program</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <RequiredLabel>Grup Astra (Pembina)</RequiredLabel>
                <CreatableSelect
                  name="grupAstra"
                  value={draft?.grupAstra || ''}
                  onChange={(val) => updateDraft({ grupAstra: val })}
                  options={grupAstraOptions}
                  placeholder="Pilih atau ketik grup Astra..."
                />
              </div>

            </div>

            <div className="pt-4 border-t border-gray-100 space-y-5">
              <div>
                <RequiredLabel>Latar Belakang (Background) Program</RequiredLabel>
                <textarea name="narasiBackground" rows={3} value={draft?.narasiBackground || ''} onChange={handleChange} className={inputClass} placeholder="Ceritakan alasan memulai program..."></textarea>
              </div>
              <div>
                <RequiredLabel>Dampak Program</RequiredLabel>
                <textarea name="narasiDampak" rows={4} value={draft?.narasiDampak || ''} onChange={handleChange} className={inputClass} placeholder="Ceritakan dampak positif yang dihasilkan program secara bebas..."></textarea>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 4: Review & Submit ========== */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">

                <div className="md:col-span-2 pb-2 border-b">
                  <h3 className="font-bold text-gray-800 text-base mb-3">1. Pilar & Kategori</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500 block">Pilar</span><span className="font-medium capitalize">{draft?.pilar || '-'}</span></div>
                    <div><span className="text-gray-500 block">Kategori</span><span className="font-medium capitalize">{draft?.kategori?.replace('_', ' ') || '-'}</span></div>
                  </div>
                </div>

                <div className="md:col-span-2 pb-2 border-b pt-2">
                  <h3 className="font-bold text-gray-800 text-base mb-3">2. Data Peserta</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><span className="text-gray-500 block">Nama DSA</span><span className="font-medium">{draft?.namaDsa || '-'}</span></div>
                    <div><span className="text-gray-500 block">Nama Kelompok/Individu</span><span className="font-medium">{draft?.namaKelompok || '-'}</span></div>
                    <div><span className="text-gray-500 block">Nama Ketua</span><span className="font-medium">{draft?.namaKetua || '-'}</span></div>
                    <div><span className="text-gray-500 block">Email</span><span className="font-medium">{draft?.email || '-'}</span></div>
                    <div><span className="text-gray-500 block">No HP</span><span className="font-medium">{draft?.noHp || '-'}</span></div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Alamat Wilayah</span>
                      <span className="font-medium">
                        {draft?.desa && draft?.kecamatan && draft?.kabupaten && draft?.provinsi
                          ? `${draft.desa} — ${draft.kecamatan} — ${draft.kabupaten} — ${draft.provinsi}`
                          : '-'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-2">
                  <h3 className="font-bold text-gray-800 text-base mb-3">3. Data Program</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500 block">Grup Astra</span><span className="font-medium">{draft?.grupAstra || '-'}</span></div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Latar Belakang</span>
                      <p className="font-medium whitespace-pre-wrap mt-1 text-gray-800 bg-white p-3 border rounded-md">{draft?.narasiBackground || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Dampak Program</span>
                      <p className="font-medium whitespace-pre-wrap mt-1 text-gray-800 bg-white p-3 border rounded-md">{draft?.narasiDampak || '-'}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-start gap-3 text-sm text-blue-800">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="font-semibold mb-1">Penting!</p>
                <p>Pastikan semua data sudah benar. Data yang sudah disubmit tidak dapat diubah kembali. Draft telah otomatis tersimpan di browser Anda jika Anda ingin melanjutkannya nanti.</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Sebelumnya
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg font-medium bg-[var(--color-astra-blue)] text-white hover:bg-blue-800 transition-colors shadow-sm"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm"
            >
              Submit Final
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
