import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Activity, BookOpen } from 'lucide-react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import styles from './Protocols.module.css';

const PROTOCOLS = [
    {
        id: 'stroop',
        title: 'Teste Stroop',
        description: 'Avalia atenção seletiva e controle inibitório. O paciente deve nomear a cor da tinta ignorando a palavra escrita.',
        icon: <Brain size={24} />
    },
    {
        id: 'tde',
        title: 'TDE (Teste de Desempenho Escolar)',
        description: 'Avaliação fundamental de capacidades de escrita, leitura e aritmética para crianças.',
        icon: <BookOpen size={24} />
    },
    {
        id: 'snap',
        title: 'SNAP-IV',
        description: 'Escala para avaliação de sintomas de TDAH e transtorno desafiador de oposição.',
        icon: <Activity size={24} />
    },
    // Add more protocols here
];

export const Protocols: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Protocolos de Avaliação</h1>
            </div>

            <div className={styles.grid}>
                {PROTOCOLS.map(protocol => (
                    <Card key={protocol.id} className={styles.protocolCard}>
                        <div className={styles.iconWrapper}>
                            {protocol.icon}
                        </div>
                        <h3 className={styles.cardTitle}>{protocol.title}</h3>
                        <p className={styles.cardDesc}>{protocol.description}</p>
                        <div className={styles.cardFooter}>
                            <Button
                                variant="ghost"
                                onClick={() => navigate(`/test/${protocol.id}`)}
                            >
                                Iniciar Teste
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
