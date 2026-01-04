import React, { useEffect, useState } from 'react';
import { Users, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card/Card';
import { useAuthStore } from '../../store/authStore';
import { statisticsService, UserStatistics } from '../../features/statistics/statisticsService';
import styles from './Dashboard.module.css';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className={styles.statCard}>
        <div className={styles.statIcon} style={{ backgroundColor: color }}>
            {icon}
        </div>
        <div className={styles.statInfo}>
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statTitle}>{title}</span>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const [stats, setStats] = useState<UserStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.accountId) {
                try {
                    const data = await statisticsService.getUserStatistics(user.accountId);
                    setStats(data);
                } catch (error) {
                    console.error('Error fetching statistics:', error);
                    // Mock data on error to show UI
                    setStats({
                        totalPatients: 0,
                        totalPatientsWithAnamnesis: 0,
                        totalActiveProtocols: 0,
                        averagePatientAge: 0,
                        patientsByGender: {}
                    });
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStats();
    }, [user]);

    if (!user) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.welcomeText}>Bem-vindo, {user.name}!</p>

            <div className={styles.statsGrid}>
                <StatCard
                    title="Pacientes Totais"
                    value={loading ? '-' : stats?.totalPatients || 0}
                    icon={<Users size={24} color="white" />}
                    color="var(--color-primary)"
                />
                <StatCard
                    title="Com Anamnese"
                    value={loading ? '-' : stats?.totalPatientsWithAnamnesis || 0}
                    icon={<CheckCircle size={24} color="white" />}
                    color="var(--color-success)"
                />
                <StatCard
                    title="Protocolos Ativos"
                    value={loading ? '-' : stats?.totalActiveProtocols || 0}
                    icon={<FileText size={24} color="white" />}
                    color="var(--color-warning)"
                />
                <StatCard
                    title="Média de Idade"
                    value={loading ? '-' : Math.round(stats?.averagePatientAge || 0)}
                    icon={<AlertCircle size={24} color="white" />}
                    color="var(--color-secondary)"
                />
            </div>

            <div className={styles.contentGrid}>
                <Card title="Atividades Recentes" className={styles.recentActivity}>
                    <p className={styles.placeholder}>Nenhuma atividade recente.</p>
                </Card>
                <Card title="Próximas Sessões" className={styles.upcomingSessions}>
                    <p className={styles.placeholder}>Nenhuma sessão agendada.</p>
                </Card>
            </div>
        </div>
    );
};
