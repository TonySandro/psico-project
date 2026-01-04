import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button/Button';
import { Card } from '../../../components/ui/Card/Card';
import styles from './StroopTest.module.css';

const WORDS = [
    { text: 'VERMELHO', color: 'red' },
    { text: 'AZUL', color: 'blue' },
    { text: 'VERDE', color: 'green' },
    { text: 'AMARELO', color: '#eab308' }, // darker yellow for visibility
];

const COLORS = [
    { name: 'Vermelho', value: 'red' },
    { name: 'Azul', value: 'blue' },
    { name: 'Verde', value: 'green' },
    { name: 'Amarelo', value: '#eab308' },
];

export const StroopTest: React.FC = () => {
    const [phase, setPhase] = useState<'intro' | 'test' | 'results'>('intro');
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [currentWord, setCurrentWord] = useState(WORDS[0]);
    const [currentColor, setCurrentColor] = useState(COLORS[0].value);

    const startTest = () => {
        setPhase('test');
        setRound(1);
        nextRound();
    };

    const nextRound = () => {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setCurrentWord(randomWord);
        setCurrentColor(randomColor.value);
    };

    const handleAnswer = (colorValue: string) => {
        if (colorValue === currentColor) {
            setScore(s => s + 1);
        }

        if (round >= 10) {
            setPhase('results');
        } else {
            setRound(r => r + 1);
            nextRound();
        }
    };

    if (phase === 'intro') {
        return (
            <div className={styles.container}>
                <Card className={styles.intro}>
                    <h2 className={styles.title}>Teste de Stroop</h2>
                    <p className={styles.instructions}>
                        Você verá nomes de cores escritos em tintas coloridas.<br />
                        Sua tarefa é identificar a <strong>COR DA TINTA</strong>, ignorando o que está escrito.
                    </p>
                    <Button onClick={startTest} style={{ fontSize: '1.25rem', padding: '0.75rem 2rem' }}>
                        Começar
                    </Button>
                </Card>
            </div>
        );
    }

    if (phase === 'results') {
        return (
            <div className={styles.container}>
                <Card className={styles.results}>
                    <h2 className={styles.title}>Teste Concluído</h2>
                    <p className={styles.instructions}>Seu resultado:</p>
                    <div className={styles.score}>{score}/10</div>
                    <Button onClick={() => setPhase('intro')}>Voltar</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card className={styles.testArea}>
                <div className={styles.header}>Rodada {round}/10</div>
                <div className={styles.stimulus} style={{ color: currentColor }}>
                    {currentWord.text}
                </div>

                <div className={styles.options}>
                    {COLORS.map(color => (
                        <button
                            key={color.value}
                            className={styles.optionBtn}
                            onClick={() => handleAnswer(color.value)}
                        >
                            {color.name}
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
};
