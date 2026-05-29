import { Link } from 'react-router-dom';

export default function LandingPage() {
  const pillars = [
    { id: 'kesehatan', title: 'Kesehatan', description: 'Program inovasi bidang kesehatan masyarakat.' },
    { id: 'pendidikan', title: 'Pendidikan', description: 'Program peningkatan kualitas pendidikan.' },
    { id: 'lingkungan', title: 'Lingkungan', description: 'Program pelestarian lingkungan dan keberlanjutan.' },
    { id: 'kewirausahaan', title: 'Kewirausahaan', description: 'Program pengembangan ekonomi dan UMKM.' },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-[var(--color-astra-blue)] text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Lomba 4 Pilar</h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
          Apresiasi untuk program binaan yang memberikan dampak sosial terbaik bagi masyarakat.
        </p>
        <Link to="/register" className="inline-block bg-white text-[var(--color-astra-blue)] font-semibold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Daftar Sekarang
        </Link>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-4 w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-astra-text)]">4 Pilar Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-astra-blue)]">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
