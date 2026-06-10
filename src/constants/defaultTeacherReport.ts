import type { TeacherReportTemplate } from '../types/teacherReport';

export const DEFAULT_TEACHER_REPORT: Omit<TeacherReportTemplate, 'id' | 'createdAt'> = {
  name: 'Relatório do Professor para Avaliação Psicopedagógica',
  description: 'Modelo padrão completo para coleta de observações escolares sobre o rendimento, ritmo, comportamento, cognição e aspectos complementares do aluno.',
  schema: {
    sections: [
      {
        title: 'Identificação',
        fields: [
          { id: 'ident_professor', type: 'text', label: 'Nome do Professor', required: true },
          { id: 'ident_telefone', type: 'text', label: 'Telefone de Contato' }
        ]
      },
      {
        title: '1. Rendimento Escolar e Ritmo',
        fields: [
          {
            id: 'rend_escolar',
            type: 'radio',
            label: '1. Em relação ao rendimento escolar, o aluno apresenta:',
            options: ['progresso constante', 'progrediu até certo ponto', 'não apresenta progressos'],
            required: true
          },
          {
            id: 'inteligencia',
            type: 'radio',
            label: '2. Em relação à inteligência:',
            options: ['parece ter inteligência normal', 'parece ter inteligência acima da média', 'parece ter inteligência abaixo da média'],
            required: true
          },
          {
            id: 'ritmo_desempenho',
            type: 'radio',
            label: '3. Quanto ao ritmo do seu desempenho escolar:',
            options: ['é lento', 'é rápido', 'é normal'],
            required: true
          },
          {
            id: 'qualidade_atividades',
            type: 'radio',
            label: '4. Em relação à qualidade de suas atividades:',
            options: [
              'é satisfatória, seus trabalhos são limpos e bem feitos',
              'inicia os trabalhos, mas não os conclui. É pouco persistente.',
              'faz de qualquer forma, sem o mínimo de cuidados',
              'risca os erros manchando a folha'
            ],
            required: true
          },
          {
            id: 'frequencia_escolar',
            type: 'radio',
            label: '5. Sua frequência escolar aponta:',
            options: ['assiduidade', 'muitas faltas', 'atrasos constantes'],
            required: true
          },
          {
            id: 'dificuldades_reacao',
            type: 'multiple_choice_with_other',
            label: '6. Quando apresenta dificuldades:',
            options: [
              'pede auxílio ao professor',
              'pede auxílio aos colegas',
              'deixa o trabalho de lado, nada pergunta'
            ]
          },
          {
            id: 'atividades_casa',
            type: 'radio',
            label: '7. Suas atividades de casa:',
            options: ['são sempre feitas', 'às vezes são feitas', 'nunca são feitas'],
            required: true
          }
        ]
      },
      {
        title: '2. Habilidades Cognitivas e Comunicação',
        fields: [
          {
            id: 'relacionamento_professor',
            type: 'multiple_choice',
            label: '8. Seu relacionamento com o (a) professor (a) pode ser considerado:',
            options: ['bom, sem problemas', 'regular', 'ótimo', 'ruim', 'chora', 'agride', 'ignora', 'mostra-se magoado']
          },
          {
            id: 'obedece_ordens',
            type: 'radio',
            label: '9. Obedece ordens e aceita o que lhe foi solicitado:',
            options: ['SIM', 'NÃO'],
            required: true
          },
          {
            id: 'memoria',
            type: 'radio',
            label: '10. Em relação à sua memória:',
            options: ['parece boa, sem dificuldades', 'parece ruim, tem dificuldades', 'não foi observada'],
            required: true
          },
          {
            id: 'capacidade_visual',
            type: 'radio',
            label: '11. Em relação à sua capacidade visual:',
            options: ['parece normal', 'apresenta dificuldades', 'não foi identificada'],
            required: true
          },
          {
            id: 'capacidade_auditiva',
            type: 'radio',
            label: '12. Em relação à sua capacidade auditiva:',
            options: ['parece normal', 'apresenta dificuldades', 'não foi observada'],
            required: true
          },
          {
            id: 'vocabulario_pronuncia',
            type: 'multiple_choice',
            label: '13. O vocabulário e a pronúncia exibidos na escola são:',
            options: ['sem problemas', 'prejudicado porque troca letras', 'prejudicado porque omite letras', 'apresenta gagueira']
          },
          {
            id: 'escrita_caracteristicas',
            type: 'multiple_choice',
            label: '14. Em relação à escrita:',
            options: ['a letra é boa', 'a letra é pequena', 'a letra é grande', 'apresenta muitos erros ortográficos']
          },
          {
            id: 'leitura',
            type: 'radio',
            label: '15. Sua leitura:',
            options: ['está de acordo com o ano que cursa', 'é regular', 'não consegue ler'],
            required: true
          },
          {
            id: 'conhecimento_numeros',
            type: 'multiple_choice',
            label: '16. Seu conhecimento em relação aos números:',
            options: [
              'conhece bem os números',
              'não conhece os números',
              'resolve problemas sem dificuldades',
              'resolve problemas com dificuldades',
              'não consegue resolver problemas'
            ]
          },
          {
            id: 'dificuldades_areas',
            type: 'multiple_choice',
            label: '17. Apresenta dificuldades com:',
            options: ['escrita', 'atenção', 'recreação', 'artes', 'leitura', 'números', 'música', 'disciplina']
          }
        ]
      },
      {
        title: '3. Comportamento e Aspectos Psicoemocionais',
        fields: [
          {
            id: 'observacoes_comportamento',
            type: 'multiple_choice',
            label: '18. Foi observado que:',
            options: ['está sempre agitado', 'é muito barulhento', 'derruba objetos frequentemente', 'prefere correr a andar', 'sobe nos móveis com frequência']
          },
          {
            id: 'motivacao_aprendizado',
            type: 'radio',
            label: '19. Em relação a sua motivação para o aprendizado:',
            options: ['parece boa', 'é desinteressado', 'depende da atividade'],
            required: true
          },
          {
            id: 'comportamento_classe',
            type: 'multiple_choice',
            label: '20. Quanto ao seu comportamento em classe manifesta:',
            options: [
              'agressividade', 'chora muito', 'inquietação', 'ansiedade', 'labilidade (ora alegre, ora triste)',
              'alegria', 'obediência', 'dependência', 'introversão', 'cooperação', 'muito falante',
              'adequa-se facilmente a mudanças', 'tranquilidade', 'autoritarismo', 'insegurança', 'tristeza',
              'desobediência', 'independência', 'extroversão', 'brigas constantes', 'incapaz de aguardar a vez'
            ]
          }
        ]
      },
      {
        title: '4. Questões Discursivas',
        fields: [
          { id: 'repetente', type: 'textarea', label: '21. É repetente? Qual série?', rows: 2 },
          { id: 'compreende_licoes', type: 'textarea', label: '22. Geralmente compreende as lições?', rows: 2 },
          { id: 'isola_recreio', type: 'textarea', label: '23. Costuma isolar-se durante o recreio?', rows: 2 },
          { id: 'provoca_amigos', type: 'textarea', label: '24. Provoca frequentemente os amigos para brigar? Se provocado (a) como reage?', rows: 3 },
          { id: 'liderar_grupo', type: 'textarea', label: '25. Gosta de liderar ou ser liderado em atividades de grupo?', rows: 2 },
          { id: 'gozacao_colegas', type: 'textarea', label: '26. É alvo de gozação dos colegas? Caso sim, como reage?', rows: 3 },
          { id: 'atividades_preferidas', type: 'textarea', label: '27. Atividades preferidas:', rows: 2 },
          { id: 'atividades_rejeitadas', type: 'textarea', label: '28. Atividades rejeitadas:', rows: 2 },
          { id: 'potencialidades', type: 'textarea', label: '29. Em sua opinião quais seriam as principais potencialidades do aluno?', rows: 3 },
          { id: 'dificuldades_opiniao', type: 'textarea', label: '30. Em sua opinião quais seriam as principais dificuldades do aluno?', rows: 3 },
          { id: 'causas_dificuldades', type: 'textarea', label: '31. Em sua opinião, quais causas poderiam ser atribuídas para tais dificuldades?', rows: 3 },
          { id: 'atuacao_diante_delas', type: 'textarea', label: '32. Como você descreve sua atuação diante delas?', rows: 3 },
          { id: 'participacao_pais', type: 'textarea', label: '33. Como você percebe a participação dos pais na vida do aluno?', rows: 3 },
          { id: 'informou_direcao_pais', type: 'textarea', label: '34. Você chegou a informar a direção ou aos pais sobre o comportamento do aluno? Quais atitudes foram tomadas?', rows: 3 },
          { id: 'outras_observacoes', type: 'textarea', label: '35. Outras observações:', rows: 3 }
        ]
      },
      {
        title: '5. Questões Complementares',
        fields: [
          {
            id: 'questoes_complementares',
            type: 'multiple_choice',
            label: 'Assinale as alternativas com o comportamento que seu aluno apresenta:',
            options: [
              'Necessidade de um ambiente calmo e quieto',
              'É incapaz de concentrar-se e distrai-se facilmente',
              'Grita na sala, faz barulho',
              'Sobe nos móveis',
              'Pede frequentemente para repetir as coisas',
              'É extremamente excitável',
              'Tem dificuldade em permanecer sentado',
              'Criança sonhadora, parece perdida no "espaço"',
              'Tem inquietação quando espera sua vez',
              'Confusa, parece perdida em seus pensamentos',
              'Fala excessivamente',
              'Mexe muito com os pés e as mãos',
              'Não termina o que iniciou',
              'Perturba as outras crianças',
              'Muda constantemente de atividade, começando várias ao mesmo tempo, sem concluí-las',
              'Ouve, porém parece não escutar',
              'Não consegue seguir instruções',
              'Apático (indiferente/insensível), desmotivado, move-se com lentidão',
              'Fala excessivamente, é barulhento(a)'
            ]
          }
        ]
      }
    ]
  }
};
