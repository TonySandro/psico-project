import type { AnamnesisTemplate } from '../types/anamnesis';

export const DEFAULT_ANAMNESIS: Omit<AnamnesisTemplate, 'id' | 'createdAt'> = {
  name: 'Anamnese Padrão - Roteiro de Entrevista Inicial',
  description: 'Modelo completo baseado no roteiro de entrevista inicial para avaliação neuropsicológica/psicológica.',
  schema: {
    sections: [
      {
        title: '1. Identificação',
        fields: [
          { id: 'ident_nome', type: 'text', label: 'Nome do Paciente', required: true },
          { id: 'ident_data_nascimento', type: 'date', label: 'Data de Nascimento', required: true },
          { id: 'ident_idade', type: 'text', label: 'Idade', required: true },
          { id: 'ident_sexo', type: 'radio', label: 'Sexo', options: ['Masculino', 'Feminino'], required: true },
          { id: 'ident_nome_pai', type: 'text', label: 'Nome do Pai' },
          { id: 'ident_ocupacao_pai', type: 'text', label: 'Ocupação do Pai' },
          { id: 'ident_nome_mae', type: 'text', label: 'Nome da Mãe' },
          { id: 'ident_ocupacao_mae', type: 'text', label: 'Ocupação da Mãe' },
          { id: 'ident_escola', type: 'text', label: 'Nome da Escola' },
          { id: 'ident_serie', type: 'text', label: 'Série Escolar' },
        ]
      },
      {
        title: '2. Composição Familiar',
        fields: [
          { id: 'fam_estado_civil', type: 'select', label: 'Estado civil dos pais biológicos', options: ['Casados', 'Separados', 'Divorciados', 'Outro'], required: true },
          { id: 'fam_custodia', type: 'text', label: 'Quem tem a custódia legal da criança?' },
          { id: 'fam_moradores', type: 'textarea', label: 'Pessoas que moram com a criança (Nome, Idade, Parentesco)', rows: 3 },
          { id: 'fam_ambiente', type: 'textarea', label: 'Relacionamento entre os membros da família', rows: 3 },
        ]
      },
      {
        title: '3. Queixa Principal',
        fields: [
          { id: 'queixa_descricao', type: 'textarea', label: 'Descrição da queixa principal', required: true, rows: 6 },
          { id: 'queixa_inicio', type: 'text', label: 'Quando a dificuldade foi identificada?' },
          { id: 'queixa_reacao', type: 'textarea', label: 'Como a criança reage diante de sua dificuldade?', rows: 2 },
        ]
      },
      {
        title: '4. Gestação e Parto',
        fields: [
          { id: 'gest_desejada', type: 'radio', label: 'A criança foi desejada?', options: ['Sim', 'Não'] },
          { id: 'gest_doencas', type: 'textarea', label: 'Doenças ou intercorrências durante a gestação', rows: 2 },
          { id: 'gest_substancias', type: 'checkbox', label: 'Consumo de substâncias na gestação', options: ['Cigarro', 'Álcool', 'Drogas'] },
          { id: 'parto_tipo', type: 'select', label: 'Tipo de parto', options: ['Normal', 'Cesárea', 'Fórceps'] },
          { id: 'parto_condicao', type: 'textarea', label: 'Condição ao nascer (peso, apgar, choro, intercorrências)', rows: 2 },
        ]
      },
      {
        title: '5. Desenvolvimento Neuro-motor',
        fields: [
          { id: 'dev_andar', type: 'text', label: 'Idade que andou sozinho' },
          { id: 'dev_falar', type: 'text', label: 'Idade das primeiras palavras' },
          { id: 'dev_frases', type: 'text', label: 'Idade da primeira frase' },
          { id: 'dev_esfincter', type: 'text', label: 'Idade do controle de esfíncter' },
          { id: 'dev_autonomia', type: 'textarea', label: 'Autonomia (comer, vestir, banho sozinho)', rows: 2 },
        ]
      },
      {
        title: '6. Sono e Linguagem',
        fields: [
          { id: 'sono_qualidade', type: 'radio', label: 'Qualidade do sono', options: ['Calmo', 'Agitado'] },
          { id: 'sono_detalhes', type: 'textarea', label: 'Detalhes do sono (fala, range dentes, acorda, etc.)', rows: 2 },
          { id: 'ling_dificuldade', type: 'radio', label: 'Apresenta dificuldade de fala atual?', options: ['Sim', 'Não'] },
          { id: 'ling_exames', type: 'textarea', label: 'Exames auditivos ou visuais relevantes', rows: 2 },
        ]
      },
      {
        title: '7. Histórico Médico e Familiar',
        fields: [
          { id: 'med_doencas', type: 'textarea', label: 'Histórico de doenças (convulsões, meningite, cirurgias, hospitalizações)', rows: 3 },
          { id: 'med_familiar', type: 'textarea', label: 'Histórico familiar (aprendizagem, tiques, TDAH, doenças psiquiátricas)', rows: 3 },
        ]
      },
      {
        title: '8. Escolaridade',
        fields: [
          { id: 'esc_inicio', type: 'text', label: 'Idade que entrou na escola' },
          { id: 'esc_gosta', type: 'radio', label: 'Gosta de estudar?', options: ['Sim', 'Não'] },
          { id: 'esc_dificuldades', type: 'textarea', label: 'Dificuldades escolares (leitura, escrita, matemática)', rows: 3 },
          { id: 'esc_comportamento', type: 'textarea', label: 'Comportamento na escola', rows: 2 },
        ]
      },
      {
        title: '9. Comportamento e Sociabilidade',
        fields: [
          { id: 'soc_amigos', type: 'textarea', label: 'Sociabilidade (fazer amigos, brincar, contato visual)', rows: 3 },
          { id: 'comp_geral', type: 'textarea', label: 'Traços de comportamento (tímido, agressivo, ansioso, medos)', rows: 3 },
          { id: 'soc_atividades', type: 'text', label: 'Atividades extraescolares' },
        ]
      },
      {
        title: '10. Critérios de Rastreio (Anexos)',
        fields: [
          { id: 'track_tdah', type: 'textarea', label: 'Observações sobre Atenção e Agitação (Critérios TDAH)', rows: 3 },
          { id: 'track_conduta', type: 'textarea', label: 'Observações sobre Regras e Conduta', rows: 2 },
          { id: 'track_ansiedade', type: 'textarea', label: 'Observações sobre Ansiedade e Manias', rows: 2 },
          { id: 'track_tea', type: 'textarea', label: 'Observações sobre Interação Social e Rigidez (Critérios TEA)', rows: 2 },
        ]
      }
    ]
  }
};
