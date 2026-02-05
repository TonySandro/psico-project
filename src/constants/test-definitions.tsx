import { Brain, Palette, Target, Activity, MessageCircle } from 'lucide-react';

export interface TestDefinition {
    id: string;
    name: string;
    fullName: string;
    description: string;
    instructions: string[];
    icon: any;
    color: string;
    timeEstimate: string;
    targetAge: string;
}

export const TEST_DEFINITIONS: Record<string, TestDefinition> = {
    'cars': {
        id: 'cars',
        name: 'CARS',
        fullName: 'Escala de Avaliação de Autismo Infantil',
        description: 'Avalia comportamentos relacionados ao autismo através de observação direta.',
        instructions: [
            'Observe o comportamento da criança em diferentes contextos.',
            'Para cada um dos 15 itens, atribua uma nota de 1 a 4.',
            '1 = Dentro dos limites da normalidade.',
            '2 = Levemente anormal.',
            '3 = Moderadamente anormal.',
            '4 = Gravemente anormal.',
            'Some as pontuações para obter o resultado final.'
        ],
        icon: Brain,
        color: '#14B8A6',
        timeEstimate: '20-30 min',
        targetAge: '2+ anos'
    },
    'stroop': {
        id: 'stroop',
        name: 'Stroop',
        fullName: 'Teste de Cores e Palavras',
        description: 'Avalia a atenção seletiva, controle inibitório e flexibilidade cognitiva.',
        instructions: [
            'Tarefa 1: O paciente deve ler as palavras das cores (ex: ler "VERMELHO" impresso em preto).',
            'Tarefa 2: O paciente deve nomear as cores dos retângulos/X.',
            'Tarefa 3: O paciente deve nomear a cor da tinta em que a palavra está impressa, ignorando o que está escrito.',
            'Registre o tempo (em segundos) e o número de erros para cada tarefa.'
        ],
        icon: Palette,
        color: '#F59E0B',
        timeEstimate: '5-10 min',
        targetAge: '7-14 anos'
    },
    'ata': {
        id: 'ata',
        name: 'ATA',
        fullName: 'Avaliação de Atenção', // Assuming generic name based on context
        description: 'Bateria para avaliação detalhada dos processos de atenção.',
        instructions: [
            'Realize os subtestes de atenção focada, sustentada e alternada.',
            'Certifique-se de que o paciente compreendeu as instruções de cada etapa.',
            'Registre os acertos, erros e o tempo total de execução quando aplicável.',
            'Compare os resultados com a tabela normativa adequada.'
        ],
        icon: Target,
        color: '#EF4444',
        timeEstimate: '15-20 min',
        targetAge: '6-12 anos'
    },
    'snap': {
        id: 'snap',
        name: 'SNAP-IV',
        fullName: 'Escala de Avaliação de TDAH',
        description: 'Questionário para identificar sintomas de desatenção e hiperatividade/impulsividade.',
        instructions: [
            'O questionário deve ser preenchido pelos pais ou professores.',
            'Para cada item, marque a frequência do comportamento observado.',
            '0 = Nem um pouco.',
            '1 = Só um pouco.',
            '2 = Bastante.',
            '3 = Demais.',
            'Calcule a média para cada subescala.'
        ],
        icon: Activity,
        color: '#10B981',
        timeEstimate: '10-15 min',
        targetAge: '6-18 anos'
    },
    'token': {
        id: 'token',
        name: 'Token Test',
        fullName: 'Teste de Compreensão de Linguagem',
        description: 'Avalia a compreensão de ordens verbais de complexidade crescente.',
        instructions: [
            'Utilize peças coloridas (círculos e quadrados) de diferentes tamanhos.',
            'Dê os comandos verbais ao paciente e aguarde a execução.',
            'Comece com comandos simples e avance para os mais complexos.',
            'Conte 1 ponto para cada execução correta.',
            'Interrompa se houver falhas consecutivas conforme o manual.'
        ],
        icon: MessageCircle,
        color: '#8B5CF6',
        timeEstimate: '10-15 min',
        targetAge: '3-12 anos'
    },

};
