import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSubmissionStore } from '../store/submissionStore';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Save, FileEdit } from 'lucide-react';

export default function JudgeScoringPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { submissions, scores, addScore } = useSubmissionStore();
  const { user } = useAuthStore();
  
  const sub = submissions.find(s => s.id === id);
  const existingScore = scores.find(s => s.submissionId === id && s.judgeId === user?.id);

  const [formData, setFormData] = useState({
    durasiProgram: existingScore?.durasiProgram || 0,
    backgroundProgram: existingScore?.backgroundProgram || 0,
    dampakProgram: existingScore?.dampakProgram || 0,
    notes: existingScore?.notes || ''
  });

  useEffect(() => {
    if (existingScore) {
      setFormData({
        durasiProgram: existingScore.durasiProgram,
        backgroundProgram: existingScore.backgroundProgram,
        dampakProgram: existingScore.dampakProgram,
        notes: existingScore.notes
      });
    }
  }, [existingScore]);

  if (!sub) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Data Tidak Ditemukan</h2>
        <button onClick={() => navigate('/judge')} className="text-blue-600 hover:underline">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const handleScoreChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: Math.min(100, Math.max(0, value)) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addScore({
        submissionId: sub.id,
        judgeId: user.id,
        ...formData
      });
      alert('Penilaian berhasil disimpan!');
      navigate('/judge/history');
    }
  };

  const totalScore = formData.durasiProgram + formData.backgroundProgram + formData.dampakProgram;
  const isReadOnly = !!existingScore;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <Link to="/judge" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6">
        <ArrowLeft size={16} /> Kembali
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kiri: Data Submission */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-[var(--color-astra-text)] mb-1">{sub.namaKelompok}</h1>
            <p className="text-gray-500 capitalize mb-6">{sub.pilar} - {sub.kategori?.replace('_', ' ')}</p>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-semibold text-gray-500 block">Latar Belakang</span>
                <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">{sub.narasiBackground}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500 block">Tujuan</span>
                <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">{sub.narasiObjective}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500 block">Dampak & Pencapaian</span>
                <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">{sub.narasiDampak}</p>
                <p className="text-gray-900 mt-2 bg-gray-50 p-3 rounded-md">{sub.narasiAchievement}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500 block">Target 2 Tahun</span>
                <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">{sub.narasiTarget2Tahun}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: Form Penilaian */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg"><FileEdit size={20} /></span>
              Form Penilaian
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durasi & Keberlanjutan Program (0-100)</label>
                <input 
                  type="number" 
                  min="0" max="100" 
                  value={formData.durasiProgram}
                  onChange={(e) => handleScoreChange('durasiProgram', Number(e.target.value))}
                  disabled={isReadOnly}
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kesesuaian Latar Belakang (0-100)</label>
                <input 
                  type="number" 
                  min="0" max="100" 
                  value={formData.backgroundProgram}
                  onChange={(e) => handleScoreChange('backgroundProgram', Number(e.target.value))}
                  disabled={isReadOnly}
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signifikansi Dampak (0-100)</label>
                <input 
                  type="number" 
                  min="0" max="100" 
                  value={formData.dampakProgram}
                  onChange={(e) => handleScoreChange('dampakProgram', Number(e.target.value))}
                  disabled={isReadOnly}
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                <textarea 
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  disabled={isReadOnly}
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-blue-500 disabled:bg-gray-100"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total Skor:</span>
                <span className="text-2xl font-bold text-[var(--color-astra-blue)]">{totalScore} <span className="text-sm text-gray-400">/ 300</span></span>
              </div>

              {!isReadOnly ? (
                <button type="submit" className="w-full bg-[var(--color-astra-blue)] text-white py-2.5 rounded-lg font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2">
                  <Save size={18} /> Simpan Penilaian
                </button>
              ) : (
                <div className="text-center p-3 bg-green-50 text-green-700 rounded-lg text-sm font-semibold border border-green-100">
                  Sudah Dinilai
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
