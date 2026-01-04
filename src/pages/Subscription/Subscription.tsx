import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
// import { api } from '../../services/api';

interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
    isCurrent?: boolean;
}

export const Subscription: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking plans for now until endpoint is ready
        // async function fetchPlans() { ... }
        setPlans([
            {
                id: 'basic',
                name: 'Plano Básico',
                price: 49.90,
                features: ['Até 10 pacientes', 'Relatórios básicos', 'Suporte por email'],
                isCurrent: true
            },
            {
                id: 'pro',
                name: 'Plano Profissional',
                price: 89.90,
                features: ['Pacientes ilimitados', 'Relatórios avançados', 'Testes exclusivos', 'Suporte prioritário'],
                isCurrent: false
            }
        ]);
        setLoading(false);
    }, []);

    const handleSubscribe = (planId: string) => {
        alert(`Funcionalidade de assinatura para o plano ${planId} em desenvolvimento.`);
    };

    if (loading) return <div>Carregando planos...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Assinatura e Planos</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {plans.map((plan) => (
                    <Card key={plan.id} style={{
                        border: plan.isCurrent ? '2px solid var(--primary-color)' : '1px solid #ddd',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {plan.isCurrent && (
                            <div style={{
                                position: 'absolute', top: '-12px', right: '20px',
                                background: 'var(--primary-color)', color: 'white',
                                padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem'
                            }}>
                                Plano Atual
                            </div>
                        )}

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h2>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            R$ {plan.price.toFixed(2)}<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/mês</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ✓ {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={plan.isCurrent ? 'secondary' : 'primary'}
                            onClick={() => !plan.isCurrent && handleSubscribe(plan.id)}
                            disabled={plan.isCurrent}
                            fullWidth
                        >
                            {plan.isCurrent ? 'Plano Ativo' : 'Mudar para este plano'}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};
