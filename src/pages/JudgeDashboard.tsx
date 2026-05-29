import { useState } from 'react';
import { useSubmissionStore } from '../store/submissionStore';
import { useAuthStore } from '../store/authStore';

export default function JudgeDashboard() {
  const { user } = useAuthStore();
  const { submissions, addScore, scores } = useSubmissionStore();
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const judgePilar = user?.pilar;
  const pilarSubmissions = submissions.filter(s => s.pilar === judgePilar);
  const selectedSub = pilarSubmissions.find(s => s.id === selectedSubId);
  const currentScore = scores.find(s => s.submissionId === selectedSubId && s.judgeId === user?.id);

  const [scoreData, setScoreData] = useState({
    durasiProgram: 1,
    backgroundProgram: 1,
    dampakProgram: 1,
    notes: ''
  });

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubId && user) {
      addScore({
        ...scoreData,
        submissionId: selectedSubId,
        judgeId: user.id,
      });
      alert('Penilaian disimpan!');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* List Submissions */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-gray-50 font-semibold text-gray-700 capitalize">
          Pilar: {judgePilar}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pilarSubmissions.length === 0 ? (
            <p className="text-gray-500 text-sm">Tidak ada submission untuk pilar ini.</p>
          ) : (
            pilarSubmissions.map(sub => {
              const hasScored = scores.some(s => s.submissionId === sub.id && s.judgeId === user?.id);
              return (
                <div 
                  key={sub.id} 
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-3 border rounded-lg cursor-pointer hover:border-[var(--color-astra-blue)] transition-colors ${selectedSubId === sub.id ? 'border-[var(--color-astra-blue)] bg-blue-50' : 'border-gray-200'} ${hasScored ? 'opacity-70' : ''}`}
                >
                  <div className="font-medium text-gray-900">{sub.namaKelompok || 'Tanpa Nama'}</div>
                  <div className="text-xs text-gray-500 mt-1">{hasScored ? '✅ Sudah dinilai' : '⚠️ Belum dinilai'}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail & Scoring */}
      <div className="flex-1 flex gap-6">
        {selectedSub ? (
          <>
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Detail Submission</h2>
              <div className="space-y-4 text-sm">
                <div><span className="font-medium text-gray-500">Nama Kelompok:</span> <br/>{selectedSub.namaKelompok}</div>
                <div><span className="font-medium text-gray-500">Ketua:</span> <br/>{selectedSub.namaKetua}</div>
                <div><span className="font-medium text-gray-500">Desa:</span> <br/>{selectedSub.desa}</div>
                <div><span className="font-medium text-gray-500">Dampak Program:</span> <br/><p className="whitespace-pre-wrap mt-1 text-gray-700">{selectedSub.narasiDampak}</p></div>
              </div>
            </div>

            <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-4">Penilaian Juri</h3>
              {currentScore && <div className="mb-4 text-xs font-medium text-green-600 bg-green-50 p-2 rounded">Skor sudah disimpan sebelumnya. Anda dapat memperbaruinya.</div>}
              
              <form onSubmit={handleScoreSubmit} className="flex-1 space-y-4">
                {['durasiProgram', 'backgroundProgram', 'dampakProgram'].map(crit => (
                  <div key={crit}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{crit.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <select 
                      className="w-full border-gray-300 rounded-md p-2 border text-sm"
                      value={scoreData[crit as keyof typeof scoreData] as number}
                      onChange={(e) => setScoreData({...scoreData, [crit]: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                  <textarea 
                    className="w-full border-gray-300 rounded-md p-2 border text-sm" rows={3}
                    value={scoreData.notes}
                    onChange={(e) => setScoreData({...scoreData, notes: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-[var(--color-astra-blue)] text-white font-medium py-2 rounded-md hover:bg-blue-800 transition-colors mt-auto">
                  Simpan Penilaian
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-500">
            Pilih submission di samping untuk mulai menilai.
          </div>
        )}
      </div>
    </div>
  );
}
