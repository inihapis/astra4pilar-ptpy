import { useSubmissionStore } from '../store/submissionStore';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { submissions } = useSubmissionStore();

  const total = submissions.length;
  const pending = submissions.filter(s => s.status === 'submitted').length;
  const screening = submissions.filter(s => s.status === 'screening').length;
  const finalists = submissions.filter(s => s.status === 'finalist' || s.status === 'top10').length;

  const statCards = [
    { label: 'Total Pendaftar', value: total, icon: <Users size={24} />, color: 'bg-blue-100 text-blue-700' },
    { label: 'Menunggu Screening', value: pending, icon: <Clock size={24} />, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Sedang Dinilai', value: screening, icon: <FileText size={24} />, color: 'bg-purple-100 text-purple-700' },
    { label: 'Finalis/Top 10', value: finalists, icon: <CheckCircle size={24} />, color: 'bg-green-100 text-green-700' },
  ];

  const pilarCount = submissions.reduce((acc, curr) => {
    acc[curr.pilar] = (acc[curr.pilar] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-astra-text)]">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Sebaran Berdasarkan Pilar</h2>
          <div className="space-y-4">
            {['kesehatan', 'pendidikan', 'lingkungan', 'kewirausahaan'].map(pilar => {
              const count = pilarCount[pilar] || 0;
              const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
              return (
                <div key={pilar}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium text-gray-700">{pilar}</span>
                    <span className="text-gray-500">{count} pendaftar ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[var(--color-astra-blue)] h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Pendaftar Terbaru</h2>
          <div className="space-y-4">
            {submissions.slice(-5).reverse().map(sub => (
              <div key={sub.id} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium text-gray-900">{sub.namaKelompok || sub.namaKetua}</div>
                  <div className="text-sm text-gray-500 capitalize">{sub.pilar}</div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded uppercase font-semibold">
                  {sub.status}
                </span>
              </div>
            ))}
            {submissions.length === 0 && <div className="text-gray-500 text-sm">Belum ada pendaftar.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
