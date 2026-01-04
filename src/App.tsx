import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Patients } from './pages/Patients/Patients';
import { PatientDetails } from './pages/Patients/PatientDetails';
import { Protocols } from './pages/Protocols/Protocols';
import { StroopTest } from './features/protocols/Stroop/StroopTest';
import { Profile } from './pages/Profile/Profile';
import { Subscription } from './pages/Subscription/Subscription';
import { AppShell } from './components/layout/AppShell/AppShell';
import { useAuthStore } from './store/authStore';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={
                    <PrivateRoute>
                        <AppShell />
                    </PrivateRoute>
                }>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="patients/:id" element={<PatientDetails />} />
                    <Route path="protocols" element={<Protocols />} />
                    <Route path="test/stroop" element={<StroopTest />} />
                    <Route path="settings" element={<Profile />} />
                    <Route path="subscription" element={<Subscription />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
