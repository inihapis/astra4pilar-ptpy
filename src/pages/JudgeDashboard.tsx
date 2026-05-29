import { useSubmissionStore } from '../store/submissionStore';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { FileEdit } from 'lucide-react';

export default function JudgeDashboard() {
  const { submissions, scores } = useSubmissionStore();
  const { user } = useAuthStore();

  // Filter submissions that haven't been scored by this judge yet
  const pendingSubmissions = submissions.filter(sub => {
    // Usually judges only see submissions in top10 or finalist status, and matching their pilar
    // but for demo we just show all that they haven't scored.
    const hasScored = scores.some(s => s.submissionId === sub.id && s.judgeId === user?.id);
    return !hasScored && sub.status !== 'draft';
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-astra-text)]">Tugas Penilaian</h1>
      <p className="text-gray-500 mb-6">Berikut adalah daftar program yang menunggu untuk Anda nilai.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelompok / Individu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilar & Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    <CheckCircleIcon className="mx-auto h-12 w-12 text-green-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">Semua tugas selesai!</p>
                    <p>Tidak ada program yang perlu dinilai saat ini.</p>
                  </td>
                </tr>
              ) : (
                pendingSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {sub.namaKelompok}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {sub.pilar} - {sub.kategori?.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sub.desa}, {sub.kabupaten}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link 
                        to={`/judge/score/${sub.id}`}
                        className="inline-flex items-center gap-1.5 bg-[var(--color-astra-blue)] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm"
                      >
                        <FileEdit size={16} /> Beri Nilai
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Temporary icon for empty state
function CheckCircleIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
