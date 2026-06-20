import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './stores/authStore';
import { api } from './services/api';
import type { Account } from './types/schema';

// Lazy load layout and page components
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ConfirmEmailPage = lazy(() => import('./pages/ConfirmEmailPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PatientsPage = lazy(() => import('./pages/PatientsPage'));
const PatientDetailPage = lazy(() => import('./pages/PatientDetailPage'));
const TestsPage = lazy(() => import('./pages/TestsPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreateAnamnesisPage = lazy(() => import('./pages/CreateAnamnesisPage'));
const PublicAnamnesisPage = lazy(() => import('./pages/PublicAnamnesisPage'));
const TemplatesPage = lazy(() => import('./pages/anamnesis/TemplatesPage'));
const RespondPage = lazy(() => import('./pages/anamnesis/RespondPage'));
const TemplateBuilderPage = lazy(() => import('./pages/anamnesis/TemplateBuilderPage'));
const PublicTeacherReportPage = lazy(() => import('./pages/PublicTeacherReportPage'));
const TeacherReportTemplatesPage = lazy(() => import('./pages/teacher-report/TemplatesPage'));
const TeacherReportRespondPage = lazy(() => import('./pages/teacher-report/RespondPage'));
const TeacherReportTemplateBuilderPage = lazy(() => import('./pages/teacher-report/TemplateBuilderPage'));
const TestRunnerPage = lazy(() => import('./pages/TestRunnerPage'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const ReportEditorPage = lazy(() => import('./pages/ReportEditorPage'));
const PaymentSuccessPage = lazy(() => import('./pages/payment/SuccessPage'));
const PaymentFailurePage = lazy(() => import('./pages/payment/FailurePage'));
const PaymentPendingPage = lazy(() => import('./pages/payment/PendingPage'));
const SubscribePage = lazy(() => import('./pages/payment/SubscribePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-sm">Carregando...</p>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    api.get<Account>('/auth')
      .then((response) => {
        const token = useAuthStore.getState().token;
        if (token && response.data) {
          useAuthStore.getState().setUser(response.data, token);
          api.get('/payment/status')
            .then((subResponse) => {
              useAuthStore.getState().setSubscription(subResponse.data);
            })
            .catch((err) => {
              console.error('Error fetching subscription status on boot', err);
            });
        }
      })
      .catch(() => {
        console.error('Error validating session');
      });
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/confirm" element={<ConfirmEmailPage />} />
          <Route path="/quem-somos" element={<AboutUsPage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos-de-uso" element={<TermsPage />} />
          <Route path="/politica-de-cookies" element={<CookiesPage />} />
          <Route path="/anamnesis/responder/:token" element={<PublicAnamnesisPage />} />
          <Route path="/teacher-report/responder/:token" element={<PublicTeacherReportPage />} />

          <Route path="/payment/subscribe" element={<SubscribePage />} />
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
            <Route path="anamnesis/templates" element={<TemplatesPage />} />
            <Route path="anamnesis/templates/new" element={<TemplateBuilderPage />} />
            <Route path="anamnesis/templates/edit/:id" element={<TemplateBuilderPage />} />
            <Route path="anamnesis/respond/:responseId" element={<RespondPage />} />
            <Route path="teacher-report/templates" element={<TeacherReportTemplatesPage />} />
            <Route path="teacher-report/templates/new" element={<TeacherReportTemplateBuilderPage />} />
            <Route path="teacher-report/templates/:id" element={<TeacherReportTemplateBuilderPage />} />
            <Route path="teacher-report/respond/:responseId" element={<TeacherReportRespondPage />} />
            <Route path="reports/:reportId/edit" element={<ReportEditorPage />} />
            <Route path="tests" element={<TestsPage />} />
            <Route path="tests/:type/run" element={<TestRunnerPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
