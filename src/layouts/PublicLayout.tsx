import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function PublicLayout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[var(--color-astra-blue)] font-bold text-xl">[ASTRA LOGO]</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-medium">[DESA SEJAHTERA ASTRA]</span>
          </Link>
          <nav>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                {user.role === 'admin' && <Link to="/admin" className="text-sm text-blue-600 hover:underline">Admin Dashboard</Link>}
                {user.role === 'judge' && <Link to="/judge" className="text-sm text-blue-600 hover:underline">Judge Dashboard</Link>}
                <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-[var(--color-astra-blue)] hover:underline">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-50 border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Astra Impact Awards Prototype
        </div>
      </footer>
    </div>
  );
}
