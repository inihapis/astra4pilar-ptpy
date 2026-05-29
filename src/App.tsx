import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import JudgeDashboard from './pages/JudgeDashboard';

import AdminSubmissions from './pages/AdminSubmissions';
import AdminSubmissionDetail from './pages/AdminSubmissionDetail';
import JudgeHistory from './pages/JudgeHistory';
import JudgeScoringPage from './pages/JudgeScoringPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<DashboardLayout allowedRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
          <Route path="/admin/submissions/:id" element={<AdminSubmissionDetail />} />
        </Route>

        {/* Judge Routes */}
        <Route element={<DashboardLayout allowedRole="judge" />}>
          <Route path="/judge" element={<JudgeDashboard />} />
          <Route path="/judge/history" element={<JudgeHistory />} />
          <Route path="/judge/score/:id" element={<JudgeScoringPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
