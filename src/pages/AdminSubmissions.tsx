import { useState } from 'react';
import { useSubmissionStore } from '../store/submissionStore';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

export default function AdminSubmissions() {
  const { submissions, updateSubmissionStatus } = useSubmissionStore();
  const [search, setSearch] = useState('');
  const [filterPilar, setFilterPilar] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredData = submissions
    .filter(sub => 
      (filterPilar === 'all' || sub.pilar === filterPilar) &&
      (filterStatus === 'all' || sub.status === filterStatus) &&
      (
        sub.namaKelompok.toLowerCase().includes(search.toLowerCase()) || 
        sub.namaKetua.toLowerCase().includes(search.toLowerCase()) ||
        sub.namaDsa.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const dateA = new Date(a.submittedAt || 0).getTime();
      const dateB = new Date(b.submittedAt || 0).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-astra-text)]">Data Peserta</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 space-y-4 md:space-y-0 md:flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Kelompok / DSA..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select value={filterPilar} onChange={(e) => setFilterPilar(e.target.value)} className="border rounded-md py-2 px-3 outline-none focus:ring-blue-500">
              <option value="all">Semua Pilar</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="kewirausahaan">Kewirausahaan</option>
            </select>
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-md py-2 px-3 outline-none focus:ring-blue-500">
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="screening">Screening</option>
            <option value="top10">Top 10</option>
            <option value="finalist">Finalist</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="border rounded-md py-2 px-3 outline-none focus:ring-blue-500 bg-gray-50">
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendaftar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilar / Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi (DSA)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Data tidak ditemukan.</td>
                </tr>
              ) : (
                filteredData.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{sub.namaKelompok}</div>
                      <div className="text-sm text-gray-500">{sub.namaKetua || 'Individu'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 capitalize">{sub.pilar}</div>
                      <div className="text-xs text-gray-500 capitalize">{sub.kategori?.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-[200px]" title={sub.namaDsa}>{sub.namaDsa}</div>
                      <div className="text-xs text-gray-500">{sub.kabupaten}, {sub.provinsi}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={sub.status}
                        onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                        className="text-xs font-semibold rounded-full px-2 py-1 bg-gray-100 border border-gray-200 uppercase outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="draft">DRAFT</option>
                        <option value="submitted">SUBMITTED</option>
                        <option value="screening">SCREENING</option>
                        <option value="top10">TOP 10</option>
                        <option value="finalist">FINALIST</option>
                        <option value="rejected">REJECTED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <Link to={`/admin/submissions/${sub.id}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-md transition-colors inline-block">
                        Detail
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
