import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import TestsPage from './pages/TestsPage';
import FeedbackPage from './pages/FeedbackPage';
import ProfilePage from './pages/ProfilePage';
import CreateAnamnesisPage from './pages/CreateAnamnesisPage';
import TestRunnerPage from './pages/TestRunnerPage'
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ReportEditorPage from './pages/ReportEditorPage';
import PaymentSuccessPage from './pages/payment/SuccessPage';
import PaymentFailurePage from './pages/payment/FailurePage';
import PaymentPendingPage from './pages/payment/PendingPage';

function App() {
  // useEffect(() => {
  //   api.get<Account>('/auth')
  //     .then((response) => {
  //       const token = useAuthStore.getState().token;
  //       if (token && response.data) {
  //         useAuthStore.getState().setUser(response.data, token);
  //       }
  //     })
  //     .catch(() => {
  //       // console.error('Error validating session:', error);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />

        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failure" element={<PaymentFailurePage />} />
        <Route path="/payment/pending" element={<PaymentPendingPage />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="patients/:patientId/anamnesis/new" element={<CreateAnamnesisPage />} />
          <Route path="patients/:patientId/reports/new" element={<ReportEditorPage />} />
          <Route path="reports/:reportId/edit" element={<ReportEditorPage />} />
          <Route path="tests" element={<TestsPage />} />
          <Route path="tests/:type/run" element={<TestRunnerPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;