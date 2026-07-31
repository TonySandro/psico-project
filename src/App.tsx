import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import CookieConsentBanner from './components/CookieConsentBanner';
import AnalyticsTracker from './components/AnalyticsTracker';
import { useAuthStore } from './stores/authStore';
import { api } from './services/api';
import type { Account } from './types/schema';

// Helper to gracefully retry loading dynamic chunks when a new build/deployment replaces old JS bundle hashes
function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const pageHasAlreadyBeenRefreshed = JSON.parse(
      sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      sessionStorage.setItem('retry-lazy-refreshed', 'false');
      return component;
    } catch (error: any) {
      if (!pageHasAlreadyBeenRefreshed) {
        sessionStorage.setItem('retry-lazy-refreshed', 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}

// Lazy load layout and page components
const HomePage = lazyWithRetry(() => import('./pages/HomePage'));
const LoginPage = lazyWithRetry(() => import('./pages/LoginPage'));
const ResetPasswordPage = lazyWithRetry(() => import('./pages/ResetPasswordPage'));
const SignupPage = lazyWithRetry(() => import('./pages/SignupPage'));
const ConfirmEmailPage = lazyWithRetry(() => import('./pages/ConfirmEmailPage'));
const DashboardPage = lazyWithRetry(() => import('./pages/DashboardPage'));
const PatientsPage = lazyWithRetry(() => import('./pages/PatientsPage'));
const PatientDetailPage = lazyWithRetry(() => import('./pages/PatientDetailPage'));
const TestsPage = lazyWithRetry(() => import('./pages/TestsPage'));
const FeedbackPage = lazyWithRetry(() => import('./pages/FeedbackPage'));
const ProfilePage = lazyWithRetry(() => import('./pages/ProfilePage'));
const CreateAnamnesisPage = lazyWithRetry(() => import('./pages/CreateAnamnesisPage'));
const PublicAnamnesisPage = lazyWithRetry(() => import('./pages/PublicAnamnesisPage'));
const TemplatesPage = lazyWithRetry(() => import('./pages/anamnesis/TemplatesPage'));
const RespondPage = lazyWithRetry(() => import('./pages/anamnesis/RespondPage'));
const TemplateBuilderPage = lazyWithRetry(() => import('./pages/anamnesis/TemplateBuilderPage'));
const PublicTeacherReportPage = lazyWithRetry(() => import('./pages/PublicTeacherReportPage'));
const TeacherReportTemplatesPage = lazyWithRetry(() => import('./pages/teacher-report/TemplatesPage'));
const TeacherReportRespondPage = lazyWithRetry(() => import('./pages/teacher-report/RespondPage'));
const TeacherReportTemplateBuilderPage = lazyWithRetry(() => import('./pages/teacher-report/TemplateBuilderPage'));
const TestRunnerPage = lazyWithRetry(() => import('./pages/TestRunnerPage'));
const DashboardLayout = lazyWithRetry(() => import('./layouts/DashboardLayout'));
const ReportEditorPage = lazyWithRetry(() => import('./pages/ReportEditorPage'));
const PaymentSuccessPage = lazyWithRetry(() => import('./pages/payment/SuccessPage'));
const PaymentFailurePage = lazyWithRetry(() => import('./pages/payment/FailurePage'));
const PaymentPendingPage = lazyWithRetry(() => import('./pages/payment/PendingPage'));
const SubscribePage = lazyWithRetry(() => import('./pages/payment/SubscribePage'));
const AboutUsPage = lazyWithRetry(() => import('./pages/AboutUsPage'));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const CookiesPage = lazyWithRetry(() => import('./pages/CookiesPage'));
const PlataformaPage = lazyWithRetry(() => import('./pages/PlataformaPage'));
const RecursoTestesPage = lazyWithRetry(() => import('./pages/recursos/RecursoTestesPage'));
const RecursoProntuarioPage = lazyWithRetry(() => import('./pages/recursos/RecursoProntuarioPage'));
const RecursoAnamnesePage = lazyWithRetry(() => import('./pages/recursos/RecursoAnamnesePage'));
const RecursoRelatoriosPage = lazyWithRetry(() => import('./pages/recursos/RecursoRelatoriosPage'));
const RecursoPacientesPage = lazyWithRetry(() => import('./pages/recursos/RecursoPacientesPage'));

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
    const token = useAuthStore.getState().token;
    if (!token) return;

    api.get<Account>('/auth')
      .then((response) => {
        if (response.data) {
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
      <ScrollToTop />
      <AnalyticsTracker />
      <CookieConsentBanner />
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
          <Route path="/plataforma" element={<PlataformaPage />} />
          <Route path="/recursos/testes" element={<RecursoTestesPage />} />
          <Route path="/recursos/prontuario" element={<RecursoProntuarioPage />} />
          <Route path="/recursos/anamnese" element={<RecursoAnamnesePage />} />
          <Route path="/recursos/relatorios" element={<RecursoRelatoriosPage />} />
          <Route path="/recursos/pacientes" element={<RecursoPacientesPage />} />
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
