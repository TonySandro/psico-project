import { Brain, Palette, Target, Activity, MessageCircle, BookOpen, Baby } from 'lucide-react';

export interface TestDefinition {
    id: string;
    name: string;
    fullName: string;
    description: string;
    instructions: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        fullName: 'Escala de Avaliação de Traços Autísticos',
        description: 'Escala de rastreio para a identificação de comportamentos e traços associados ao transtorno do espectro autista.',
        instructions: [
            'Consulte o material original da ATA fora do sistema.',
            'Para cada uma das 23 subescalas (S01 a S23), atribua a pontuação correspondente de 0 a 2.',
            '0 = Ausente.',
            '1 = Presença de um indicador.',
            '2 = Presença de dois ou mais indicadores.',
            'Informe a data da aplicação, informante e idade em anos.',
            'Preencha as observações clínicas (opcional) e salve para obter o resultado.'
        ],
        icon: Target,
        color: '#EF4444',
        timeEstimate: '10-15 min',
        targetAge: '2+ anos'
    },
    'snap': {
        id: 'snap',
        name: 'SNAP-IV',
        fullName: 'Escala de Avaliação de TDAH e TOD',
        description: 'Questionário para identificar sintomas de desatenção, hiperatividade/impulsividade e transtorno opositivo-desafiador (TOD).',
        instructions: [
            'O questionário deve ser preenchido pelos pais ou professores.',
            'Para cada comportamento abaixo, selecione o nível de frequência observado.',
            '0 = Nem um pouco.',
            '1 = Só um pouco.',
            '2 = Bastante.',
            '3 = Demais.',
            'O sistema calculará automaticamente o indicativo clínico para cada subescala.'
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
    'tde2': {
        id: 'tde2',
        name: 'TDE-II',
        fullName: 'Teste de Desempenho Escolar (Segunda Edição)',
        description: 'Avalia o desempenho escolar em leitura, escrita e aritmética. O sistema calcula os indicadores quantitativos; a interpretação qualitativa é exibida após o profissional inserir o percentil consultado no material original.',
        instructions: [
            'Selecione o subteste aplicado: Escrita, Leitura ou Aritmética.',
            'Informe o ano escolar do paciente (1º ao 9º ano).',
            'Preencha a pontuação total, acertos, erros e o total de "Não sabe".',
            'Informe o tempo de execução e a unidade (minutos ou segundos).',
            'O sistema calculará os indicadores quantitativos (acúrácia, velocidade, eficiência).',
            'Consulte o percentil correspondente no material original do TDE-II.',
            'Insira o percentil manualmente para que a interpretação qualitativa seja exibida.',
        ],
        icon: BookOpen,
        color: '#3B82F6',
        timeEstimate: '10-20 min',
        targetAge: '1º ao 9º ano'
    },
    'aq10-child': {
        id: 'aq10-child',
        name: 'AQ-10 Child',
        fullName: 'Quociente de Espectro Autista (AQ-10) - Versão Infantil',
        description: 'Questionário de triagem rápida de traços autísticos para crianças de 4 a 11 anos, preenchido pelos pais ou responsáveis.',
        instructions: [
            'O questionário deve ser preenchido por um informante (pais ou responsáveis).',
            'Para cada comportamento abaixo, selecione a opção de frequência observada.',
            'Selecione Concordo Totalmente/Em parte ou Discordo Totalmente/Em parte.',
            'Informe o informante e a idade da criança (deve ser entre 4 e 11 anos).',
            'Preencha as observações clínicas (opcional) e salve para obter o resultado.'
        ],
        icon: Baby,
        color: '#8B5CF6',
        timeEstimate: '5-10 min',
        targetAge: '4-11 anos'
    }
};
