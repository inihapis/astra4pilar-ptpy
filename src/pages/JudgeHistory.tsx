import { useSubmissionStore } from '../store/submissionStore';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function JudgeHistory() {
  const { submissions, scores } = useSubmissionStore();
  const { user } = useAuthStore();

  const myScores = scores.filter(s => s.judgeId === user?.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-astra-text)]">Riwayat Penilaian</h1>
      <p className="text-gray-500 mb-6">Daftar program yang sudah Anda nilai.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelompok / Individu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Skor</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myScores.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada riwayat penilaian.</td>
                </tr>
              ) : (
                myScores.sort((a,b) => new Date(b.scoredAt).getTime() - new Date(a.scoredAt).getTime()).map((score) => {
                  const sub = submissions.find(s => s.id === score.submissionId);
                  const total = score.durasiProgram + score.backgroundProgram + score.dampakProgram;
                  return (
                    <tr key={score.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(score.scoredAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sub?.namaKelompok || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                        {total} / 300
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Link to={`/judge/score/${score.submissionId}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-md transition-colors inline-flex items-center gap-1.5">
                          <Eye size={16} /> Lihat Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
