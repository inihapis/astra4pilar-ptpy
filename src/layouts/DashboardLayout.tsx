import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function DashboardLayout({ allowedRole }: { allowedRole: 'admin' | 'judge' }) {
  const { user, logout } = useAuthStore();

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="p-4 border-b h-16 flex items-center">
          <span className="text-[var(--color-astra-blue)] font-bold">[ASTRA LOGO]</span>
        </div>
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {allowedRole} Panel
          </div>
          <div className="text-sm font-medium text-gray-900 mb-6">{user.name}</div>
          
          <nav className="space-y-1">
            <Link to={allowedRole === 'admin' ? '/admin' : '/judge'} className="bg-blue-50 text-blue-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <button onClick={logout} className="w-full text-left text-sm text-red-600 font-medium hover:bg-red-50 px-2 py-2 rounded-md transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-4 md:hidden justify-between">
          <span className="font-bold text-[var(--color-astra-blue)]">Dashboard</span>
          <button onClick={logout} className="text-sm text-red-600 font-medium">Logout</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
