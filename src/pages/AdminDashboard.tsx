import { useSubmissionStore } from '../store/submissionStore';

export default function AdminDashboard() {
  const { submissions, updateSubmissionStatus } = useSubmissionStore();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-astra-text)]">Admin Dashboard</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilar / Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelompok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Belum ada submission.</td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{sub.pilar} - {sub.kategori?.replace('_', ' ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.namaKelompok || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.desa || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 uppercase">
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select 
                        value={sub.status}
                        onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                        className="border border-gray-300 rounded text-sm p-1"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="screening">Screening</option>
                        <option value="top10">Top 10</option>
                        <option value="finalist">Finalist</option>
                        <option value="rejected">Rejected</option>
                      </select>
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
