export interface Opportunity {
  id: string;
  name: string;
  user: string;
  input: string;
  iaRole: string;
  humanReview: string;
  output: string;
  value: number;       // 1 to 5
  frequency: number;   // 1 to 5
  revenue: number;     // 1 to 5
  ease: number;        // 1 to 5
  advantage: number;   // 1 to 5
  reap: number;        // 1 to 5
  risk: number;        // 1 to 5 (will be subtracted in formula)
  description: string;
}

export interface ReferenceItem {
  etapa: string;
  entrada: string;
  acaoSistema: string;
  papelIA: string;
  revisaoHumana: string;
  saida: string;
  reutilizável: string;
}

export interface TranslationItem {
  oportunidade: string;
  usuario: string;
  entrada: string;
  papelIA: string;
  revisao: string;
  saida: string;
  valor: string;
}

export interface DirectionItem {
  direcao: string;
  valor: string;
  comprador: string;
  frequencia: string;
  receita: string;
  complexidade: string;
  risco: string;
  recomendacao: string;
}

export interface UserProfile {
  perfil: string;
  papel: string;
  dorPrincipal: string;
  acaoPrincipal: string;
  beneficio: string;
  prioridade: "Alta" | "Média" | "Baixa";
}

export interface ArchitectureModule {
  ambiente: string;
  usuario: string;
  funcao: string;
  infoPrincipal: string;
  acaoPrincipal: string;
  prioridade: "Crítica" | "Média" | "Opcional" | "Futura";
}

export interface ReapItem {
  elemento: string;
  funcaoAtual: string;
  reutilizacao: "Direta" | "Adaptação" | "Não Recomendado";
  motivo: string;
}

export interface RiskItem {
  risco: string;
  impacto: "Muito Alto" | "Alto" | "Médio" | "Baixo";
  probabilidade: "Alta" | "Média" | "Baixa";
  alerta: string;
  mitigacao: string;
}

export interface DecisionQuestion {
  id: string;
  pergunta: string;
  contexto: string;
  opcoes: {
    label: string;
    value: string;
    impacto: string;
  }[];
  selected?: string;
}

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp_1",
    name: "Importação Inteligente de Escalas com Autonomia da Agenda",
    user: "Médico Plantonista & Gestor de Escala",
    input: "Planilha habitual do gestor (XLSX/CSV) ou PDF enviado pelo hospital",
    iaRole: "Lê a planilha sem forçar o gestor a mudar seu hábito, interpreta datas/horários/setores e gera sugestão estruturada de escala",
    humanReview: "Médico recebe a sugestão/importação estruturada e decide o que incorporar, adaptar ou personalizar em sua agenda",
    output: "Sugestão de escala estruturada para o médico incorporar à sua própria agenda e visão organizada para o gestor",
    value: 5,
    frequency: 5,
    revenue: 5,
    ease: 4,
    advantage: 5,
    reap: 5,
    risk: 1,
    description: "O gestor continua montando a escala em sua planilha como sempre fez. A IA interpreta e organiza os dados. O médico recebe uma sugestão estruturada e mantém total liberdade para revisar, adaptar e incorporar os plantões à sua agenda."
  },
  {
    id: "opp_2",
    name: "Conciliação Pessoal de Plantões e Repasses Financeiros",
    user: "Médico Plantonista (Núcleo do Produto)",
    input: "Demonstrativo de faturamento do hospital vs. registro de plantões trabalhados pelo médico",
    iaRole: "Cruza os plantões realizados com os repasses pagos pelo hospital/grupo e identifica divergências de valor ou faltas",
    humanReview: "Médico valida as inconsistências e pode gerar contestação amigável com um clique",
    output: "Extrato didático e transparente de faturamento com alerta de valores não repassados",
    value: 5,
    frequency: 4,
    revenue: 4,
    ease: 4,
    advantage: 5,
    reap: 4,
    risk: 2,
    description: "Dá clareza e previsibilidade total ao médico sobre seus ganhos, identificando de forma autônoma plantões não pagos ou valores divergentes repassados pelas fontes pagadoras."
  },
  {
    id: "opp_3",
    name: "Gaveta Digital e Lembretes de Documentação Médica",
    user: "Médico Plantonista & RH Hospitalar",
    input: "Upload de fotos de CRM, diplomas, certidões e coberturas de seguro profissional",
    iaRole: "Extrai CRM, nome, categoria do documento e data de validade via OCR e LLM",
    humanReview: "Médico confirma a extração em 1 clique",
    output: "Dossiê digital organizado com alertas preventivos automáticos de expiração (CRM)",
    value: 5,
    frequency: 3,
    revenue: 3,
    ease: 5,
    advantage: 4,
    reap: 5,
    risk: 1,
    description: "Guarda a documentação médica em um local seguro na nuvem. Dispara lembretes preventivos de vencimento, garantindo conformidade regulatória sem dor de cabeça."
  },
  {
    id: "opp_4",
    name: "Distribuição e Exportação de Escalas Individuais",
    user: "Médico Plantonista & Coordenador",
    input: "Escala processada e aprovada pelo gestor",
    iaRole: "Gera visões limpas individualizadas por médico, eliminando a poluição visual de planilhas gigantes",
    humanReview: "Gestor aprova o disparo com um clique",
    output: "Agenda pessoal e individual enviada direto para a conta web/mobile do médico",
    value: 4,
    frequency: 5,
    revenue: 4,
    ease: 4,
    advantage: 4,
    reap: 4,
    risk: 1,
    description: "Permite distribuir e exportar escalas de forma personalizada, para que cada médico veja exatamente os seus plantões no smartphone ou navegador, sem confusão."
  },
  {
    id: "opp_5",
    name: "Análise de Cobertura e Prevenção de Furos na Escala",
    user: "Gestor de Escala & Direção Médica",
    input: "Escala sincronizada e confirmações de presença do corpo clínico",
    iaRole: "Analisa lacunas, prevê turnos sob risco de ficar sem médico e sugere substitutos cadastrados",
    humanReview: "Aprovação do gestor para envio de convite de substituição",
    output: "Painel em tempo real de integridade da escala com alertas de furos",
    value: 4,
    frequency: 4,
    revenue: 4,
    ease: 3,
    advantage: 4,
    reap: 3,
    risk: 2,
    description: "Conecta o médico à operação hospitalar: detecta furos na escala antes do plantão começar e facilita convites para substitutos sem poluir grupos de mensagens."
  },
  {
    id: "opp_6",
    name: "Experiência Multiplataforma Integrada (Mobile App + Web App)",
    user: "Médico Plantonista (Core)",
    input: "Dados de plantões, finanças e documentos sincronizados na nuvem",
    iaRole: "Sincroniza preferências, lembretes e extratos entre smartphone e telas maiores",
    humanReview: "Nenhuma (uso fluido pelo próprio médico)",
    output: "Plataforma viva e unificada da rotina e carreira do médico plantonista",
    value: 5,
    frequency: 5,
    revenue: 4,
    ease: 4,
    advantage: 5,
    reap: 4,
    risk: 1,
    description: "O web app expande o aplicativo mobile do médico: oferece tela ampla para analisar repasses e anexar documentos sem perder a rapidez de consulta no celular no meio do plantão."
  }
];

export const REFERENCE_MODEL: ReferenceItem[] = [
  {
    etapa: "1. Envio de Documento",
    entrada: "PDF técnico de inspeção (geralmente complexo e longo, escaneado ou nativo).",
    acaoSistema: "Faz o upload seguro do arquivo, associa à empresa cliente e dispara processo assíncrono.",
    papelIA: "Segmenta o documento, realiza OCR se necessário e lê o conteúdo para reconhecer termos técnicos.",
    revisaoHumana: "Nenhuma nesta etapa inicial de recebimento.",
    saida: "Arquivo armazenado e enfileirado para processamento.",
    reutilizável: "Interface de upload 'drag-and-drop', backend de processamento assíncrono e fila de status."
  },
  {
    etapa: "2. Extração & Estruturação",
    entrada: "Texto extraído bruto do documento técnico de engenharia.",
    acaoSistema: "Organiza as variáveis estruturadas encontradas na memória temporária do sistema.",
    papelIA: "Identifica e extrai equipamentos, inconformidades encontradas, prazos legais e gravidade.",
    revisaoHumana: "Nenhuma (processamento de backend puro).",
    saida: "Rascunho de laudo estruturado em formato JSON persistido no banco temporário.",
    reutilizável: "Módulo de comunicação com a API da Gemini, parsing de JSON estruturado e manipulação de schemas."
  },
  {
    etapa: "3. Revisão Ativa",
    entrada: "Rascunho estruturado exibido lado a lado com o PDF original no painel do engenheiro.",
    acaoSistema: "Renderiza interface interativa com campos editáveis, alertas visuais de inconsistência.",
    papelIA: "Sugere correções automáticas e aponta possíveis omissões identificadas na leitura.",
    revisaoHumana: "O engenheiro analisa, corrige falhas do OCR, altera inconformidades e valida cada linha.",
    saida: "Laudo técnico validado com status de 'Aprovado pelo Engenheiro' e pronto para assinatura.",
    reutilizável: "Layout de tela dividida (Split Screen PDF vs Form), inputs reativos com feedback instantâneo."
  },
  {
    etapa: "4. Publicação & Entrega",
    entrada: "Laudo validado pelo engenheiro responsável.",
    acaoSistema: "Bloqueia edições, gera versão PDF finalizada e atualiza os dashboards do cliente corporativo.",
    papelIA: "Gera resumos em linguagem simples e clara dos pontos críticos para o cliente não técnico.",
    revisaoHumana: "O engenheiro clica no botão 'Publicar' para homologar os dados.",
    saida: "Painel dinâmico acessível ao cliente final com visão clara de ações corretivas pendentes.",
    reutilizável: "Módulo de controle de acessos (permissões do cliente vs criador) e geração de relatórios limpos."
  }
];

export const TRANSLATION_MODEL: TranslationItem[] = [
  {
    oportunidade: "Importação Inteligente e Estruturada de Escalas",
    usuario: "Gestor de Escala & Médico Plantonista",
    entrada: "Planilha de escala no formato habitual do gestor (XLSX, CSV ou PDF).",
    papelIA: "Mapeia colunas de forma inteligente, identifica médicos pelos nomes, resolve duplicidades, extrai datas, horários e setores sem exigir formato padrão.",
    revisao: "Gestor visualiza os dados no painel side-by-side e o médico recebe uma importação estruturada e revisável.",
    saida: "Sugestão de escala organizada, sem conflitos, pronta para o médico revisar e adaptar à sua própria agenda.",
    valor: "O gestor mantém sua planilha habitual e o médico ganha uma importação organizada sem perder a autonomia da própria agenda."
  },
  {
    oportunidade: "Conciliação Pessoal de Repasses Financeiros",
    usuario: "Médico Plantonista (Core do Produto)",
    entrada: "Demonstrativo do hospital vs. registro pessoal de plantões realizados.",
    papelIA: "Compara de forma autônoma a escala executada com os extratos de faturamento, identificando falhas de pagamento ou valores incorretos.",
    revisao: "Médico valida as inconsistências e pode disparar contestação transparente.",
    saida: "Extrato didático de recebíveis com alerta visual de divergências de pagamento.",
    valor: "Previsibilidade financeira e recuperação de receitas médicas perdidas por falhas administrativas."
  },
  {
    oportunidade: "Gaveta Digital e Lembretes de CRM",
    usuario: "Médico Plantonista & RH Hospitalar",
    entrada: "Fotos/PDFs de documentos pessoais (CRM, diplomas, seguros).",
    papelIA: "Realiza o reconhecimento OCR das fotos, classifica o tipo de documento, extrai datas de validade e número do CRM.",
    revisao: "O próprio médico confirma a veracidade dos dados em 1 clique.",
    saida: "Dossiê digital organizado com alertas preventivos de vencimento de licenças.",
    valor: "Garantia de conformidade jurídica contínua e tranquilidade profissional para o médico."
  },
  {
    oportunidade: "Distribuição e Alerta de Furos na Escala",
    usuario: "Gestor de Escala & Equipe Médica",
    entrada: "Déficits de escala sinalizados pelo sistema ou substituições necessárias.",
    papelIA: "Detecta horários descobertos e identifica médicos parceiros com perfil e disponibilidade adequados.",
    revisao: "Gestor e médico aceitam a convocação/troca.",
    saida: "Convites diretos enviados com atualização instantânea no calendário do médico.",
    valor: "Resolução de furos de escala em minutos sem atrito ou spam em grupos de WhatsApp."
  }
];

export const STRATEGIC_DIRECTIONS: DirectionItem[] = [
  {
    direcao: "1. Plataforma Multiplataforma Centrada no Médico (Core do Produto)",
    valor: "Foco total na vida do médico: organizar plantões, acompanhar pagamentos, guardar documentos com lembretes e ter clareza profissional. O web app amplia a experiência do mobile.",
    comprador: "Médico Plantonista (Adoção direta e engajamento diário).",
    frequencia: "Diária / Semanal (Consulta de escalas, faturamento e lembretes).",
    receita: "Alta por retenção orgânica + atração viral direta de hospitais.",
    complexidade: "Média (Sincronização fluida entre mobile app e web app).",
    risco: "Baixo (Constrói relacionamento direto e lealdade com o usuário na ponta).",
    recomendacao: "ESSÊNCIA E NÚCLEO DO PRODUTO. O médico é a prioridade absoluta."
  },
  {
    direcao: "2. Camada Progressiva de Conexão com o Gestor (Sem Troca de Hábitos)",
    valor: "O gestor continua usando sua planilha de sempre. A IA do Plantão360 interpreta, organiza por médico/data/setor e envia como importação estruturada e revisável para o médico adaptar à sua agenda.",
    comprador: "Coordenadores de Escala, Clínicas de Especialidades e Hospitais.",
    frequencia: "Semanal / Mensal (Envio de planilhas e distribuição de escalas).",
    receita: "Altíssima (Monetização B2B por volume de médicos sem impor novos softwares ao gestor).",
    complexidade: "Média (Aproveita a engine de OCR/LLM do ElevaLaudo).",
    risco: "Baixo (Não impõe fricção ou mudança abrupta ao processo do gestor).",
    recomendacao: "EXPANSÃO NATURAL. Adiciona inteligência e distribuição ao fluxo que o gestor já possui."
  },
  {
    direcao: "3. Ecossistema Conectado (Médico + Operação Hospitalar)",
    valor: "Integração viva: o médico obtém previsibilidade e controle da carreira, e o hospital obtém cobertura sem furos e auditoria financeira transparente.",
    comprador: "Diretoria Médica, Superintendência e Financeiro.",
    frequencia: "Contínua (Sincronização de dados e BI de escala).",
    receita: "Altíssima em contratos corporativos recorrentes.",
    complexidade: "Média/Alta.",
    risco: "Baixo/Médio.",
    recomendacao: "VISÃO DE LONGO PRAZO. Conexão completa entre corpo clínico e hospital."
  }
];

export const USER_ECOSYSTEM: UserProfile[] = [
  {
    perfil: "Médico Plantonista",
    papel: "Centro do Produto (Core User)",
    dorPrincipal: "Organizar a vida profissional, saber exatamente quando e quanto vai receber, evitar perdas financeiras e gerenciar documentos com prazos.",
    acaoPrincipal: "Usar o app mobile e o web app para gerenciar plantões, conferir extratos, guardar documentos e ver a escala oficial.",
    beneficio: "Clareza, paz de espírito e controle total sobre a carreira e as finanças.",
    prioridade: "Alta"
  },
  {
    perfil: "Gestor de Escala / Coordenador",
    papel: "Expansão Progressiva (Parceiro de Operação)",
    dorPrincipal: "Perder tempo formatando planilhas e distribuindo manualmente horários por WhatsApp, com alto risco de furos.",
    acaoPrincipal: "Subir a planilha que já utiliza no Plantão360 para a IA organizar, gerar visões limpas e disponibilizar aos médicos como sugestão estruturada.",
    beneficio: "Zero necessidade de aprender um software novo. Ganha velocidade de distribuição e escala sem furos.",
    prioridade: "Alta"
  },
  {
    perfil: "RH Médico & Faturamento",
    papel: "Beneficiário do Ecossistema",
    dorPrincipal: "Médicos com documentos vencidos e cobranças duplicadas ou desalinhadas no repasse.",
    acaoPrincipal: "Acompanhar a gaveta de documentos e relatórios de conciliação gerados de forma transparente.",
    beneficio: "Garantia de conformidade regulatória (CRM) e faturamento auditado sem atrito.",
    prioridade: "Média"
  }
];

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    ambiente: "Experiência Multiplataforma do Médico (Web + Mobile App)",
    usuario: "Médico Plantonista",
    funcao: "Núcleo do produto: visão fluida da agenda de plantões, extrato de recebíveis e histórico profissional.",
    infoPrincipal: "Calendário mensal de plantões, cards de vencimento, resumo de faturamento e avisos de lembretes.",
    acaoPrincipal: "Visualizar escalas, lançar plantões pessoais e conferir repasses.",
    prioridade: "Crítica"
  },
  {
    ambiente: "Gaveta Digital de Documentos & Lembretes",
    usuario: "Médico Plantonista",
    funcao: "Repositório seguro de licenças, CRM, diplomas e contratos com extração por OCR.",
    infoPrincipal: "Data de expiração, status de validação e lembretes preventivos de vencimento.",
    acaoPrincipal: "Upload de documentos e verificação de alertas de conformidade.",
    prioridade: "Crítica"
  },
  {
    ambiente: "Leitor e Interpretador de Escalas por IA (Gestor)",
    usuario: "Gestor de Escala / Coordenador",
    funcao: "Motor de recepção das planilhas habituais do gestor (XLSX, CSV, PDF).",
    infoPrincipal: "Status de leitura, identificação de médicos/turnos e prévia da escala organizada.",
    acaoPrincipal: "Enviar a planilha usual para a IA interpretar e organizar.",
    prioridade: "Crítica"
  },
  {
    ambiente: "Painel de Revisão & Sincronização (Human-in-the-Loop)",
    usuario: "Gestor de Escala",
    funcao: "Interface de conferência visual side-by-side entre a planilha e a escala organizada.",
    infoPrincipal: "Avisos de duplicidade ou furos e botão de sincronização individual.",
    acaoPrincipal: "Aprovar a escala organizada e disparar a sincronização para a conta de cada médico.",
    prioridade: "Crítica"
  },
  {
    ambiente: "Conciliação Pessoal de Repasses Financeiros",
    usuario: "Médico Plantonista",
    funcao: "Cruzamento inteligente entre plantões trabalhados e demonstrativos do hospital.",
    infoPrincipal: "Divergências de repasse, plantões não pagos e histórico de recebimentos.",
    acaoPrincipal: "Auditar extrato financeiro e emitir contestação amigável.",
    prioridade: "Média"
  },
  {
    ambiente: "Central de Indicadores e Cobertura Operacional",
    usuario: "Direção Médica / Coordenador",
    funcao: "Painel de integridade de escalas e prevenção de furos de plantão.",
    infoPrincipal: "Taxa de cobertura, plantões descobertos e alertas de substituição.",
    acaoPrincipal: "Visualizar relatórios de cobertura em tempo real.",
    prioridade: "Média"
  }
];

export const REAP_PLAN: ReapItem[] = [
  {
    elemento: "1. Fluxo de Autenticação & Cadastro",
    funcaoAtual: "Registro e login de usuários na plataforma.",
    reutilizacao: "Direta",
    motivo: "O login básico e os fluxos de recuperação de senha do ElevaLaudo são idênticos em infraestrutura para o Plantão360."
  },
  {
    elemento: "2. Motor de Upload & Enfileiramento Assíncrono",
    funcaoAtual: "Recebe arquivos complexos, envia para armazenamento na nuvem e inicia leitura em background.",
    reutilizacao: "Direta",
    motivo: "Essa é a espinha dorsal técnica. O código de upload seguro e os webhooks de acompanhamento de status do processamento do PDF/XLSX podem ser reaproveitados sem alterações lógicas."
  },
  {
    elemento: "3. Layout e Interface de Revisão Humana (Split Screen)",
    funcaoAtual: "Exibe o documento bruto lado a lado com o formulário de dados extraídos para o engenheiro assinar.",
    reutilizacao: "Adaptação",
    motivo: "A mecânica de comparar o arquivo importado com os dados estruturados mapeados pela IA é perfeita. A adaptação será no layout dos campos: em vez de equipamentos e prazos, exibirá colunas de nomes de médicos, turnos, e o calendário do plantão."
  },
  {
    elemento: "4. Mapeamento Multitenant (Organizações / Empresas)",
    funcaoAtual: "Agrupa laudos por empresas clientes para personalização de marca e isolamento de dados.",
    reutilizacao: "Direta",
    motivo: "Fundamental no B2B hospitalar. O Plantão360 precisa isolar os dados de cada Hospital ou Clínica cliente, permitindo que gestores acessem apenas suas filiais autorizadas."
  },
  {
    elemento: "5. Prompting & Conectores de IA (Gemini API)",
    funcaoAtual: "Envia o laudo bruto para a API e retorna o JSON estruturado seguindo o schema de laudos.",
    reutilizacao: "Adaptação",
    motivo: "O conector com a biblioteca @google/genai é mantido integralmente. O prompt da IA será totalmente reescrito para focar na lógica médica (reconhecer médicos, especialidades e conciliar turnos no contexto de escalas de saúde)."
  },
  {
    elemento: "6. Estilo Visual (Dark Mode e Identidade Verde)",
    funcaoAtual: "Interface moderna focada em tons de cinza escuro com botões verdes de ação na engenharia.",
    reutilizacao: "Não Recomendado",
    motivo: "O Plantão360 possui uma identidade visual escura premium pré-concebida onde o AZUL é a cor principal de ação. Misturar o verde do ElevaLaudo descaracterizaria a marca."
  },
  {
    elemento: "7. Fluxo de Publicação de Painel para Clientes",
    funcaoAtual: "Gera um link compartilhado onde o cliente da engenharia consulta os laudos em formato didático.",
    reutilizacao: "Adaptação",
    motivo: "Excelente ideia comercial. Adaptar para gerar um painel limpo onde o hospital exibe a escala de plantões atualizada para toda a equipe médica, que pode acessar via celular sem precisar fazer login complexo."
  }
];

export const RISK_ASSESSMENT: RiskItem[] = [
  {
    risco: "Altíssima variabilidade no formato de planilhas de escala dos hospitais",
    impacto: "Muito Alto",
    probabilidade: "Alta",
    alerta: "Taxa de erro da IA elevada na extração inicial de planilhas muito bagunçadas, gerando retrabalho no mapeamento.",
    mitigacao: "Implementar um assistente interativo de 'mapeamento de cabeçalho' na primeira importação. O usuário indica à IA uma única vez qual coluna representa o Médico, qual o Horário e qual a Data, e o sistema memoriza o template para aquele hospital específico."
  },
  {
    risco: "Duplicidade ou ambiguidade de nomes de médicos na extração (ex: Dr. João Silva)",
    impacto: "Alto",
    probabilidade: "Média",
    alerta: "Surgimento de médicos fantasmas ou lançamentos financeiros atribuídos ao médico errado.",
    mitigacao: "A IA cruza nomes extraídos com o banco de médicos pré-cadastrados no hospital usando algoritmos de similaridade de string (fuzzy matching). Caso haja ambiguidade, o painel de revisão sinaliza em amarelo para escolha rápida por clique do gestor."
  },
  {
    risco: "Conformidade com a LGPD no processamento de dados profissionais e repasses financeiros",
    impacto: "Muito Alto",
    probabilidade: "Média",
    alerta: "Armazenamento inadequado de planilhas contendo CPFs, telefones e valores de vencimento de terceiros sem termos claros.",
    mitigacao: "Criptografia de dados sensíveis em trânsito e em repouso. Termo de uso de tratamento de dados obrigatório para a organização contratante, garantindo que o upload é feito sob prerrogativa de execução de contrato de prestação de serviços médicos."
  },
  {
    risco: "Resistência de adoção por parte de gestores de escala acostumados com processos manuais",
    impacto: "Médio",
    probabilidade: "Alta",
    alerta: "Inatividade no módulo de importação após a contratação inicial da plataforma.",
    mitigacao: "Manter o upload extremamente simples (drag-and-drop rápido) e garantir que o primeiro resultado visual (calendário gerado em menos de 15 segundos) traga um fator de encantamento imediato ('uau') de economia de tempo real."
  },
  {
    risco: "Dependência de planilhas perfeitamente padronizadas no MVP",
    impacto: "Alto",
    probabilidade: "Média",
    alerta: "O sistema quebra ou recusa arquivos se as colunas forem ligeiramente alteradas no dia a dia.",
    mitigacao: "O parser de IA é flexível por natureza. Em vez de quebrar, ele deve colocar dados duvidosos em uma gaveta de 'pendências de revisão', permitindo que o gestor termine de preencher manualmente as lacunas na própria interface amigável do Plantão360."
  }
];

export interface BusinessPlanTier {
  nome: string;
  publico: string;
  preco: string;
  cobranca: string;
  features: string[];
  valorPercebido: string;
  destaque?: boolean;
}

export interface UnitEconomicsMetrics {
  cacB2C: string;
  ltvB2C: string;
  paybackB2C: string;
  cacB2B: string;
  ltvB2B: string;
  paybackB2B: string;
  margemBruta: string;
  churnMensalEsperado: string;
}

export const BUSINESS_MODEL_DATA = {
  resumo: "Modelo híbrido de expansão bottom-up (Product-Led Growth). O médico plantonista adota a ferramenta individualmente para ter controle de sua escala e de seus repasses financeiros (B2C). À medida que múltiplos médicos de um mesmo hospital ou grupo adotam o app, o Plantão360 expande para a coordenação de escala e direção clínica com módulos de gestão e KPIs (B2B SaaS).",
  unitEconomics: {
    cacB2C: "R$ 45 - R$ 75 (Via tráfego pago direcionado a médicos e boca a boca em grupos de WhatsApp)",
    ltvB2C: "R$ 720 - R$ 1.180 (Considerando retenção média de 24 a 30 meses)",
    paybackB2C: "1,5 a 2 meses",
    cacB2B: "R$ 1.200 - R$ 2.800 (Inside sales focado em coordenadores de serviço e clínicas médicas)",
    ltvB2B: "R$ 18.000 - R$ 45.000 (Retenção institucional superior a 36 meses)",
    paybackB2B: "3 a 4 meses",
    margemBruta: "88% (Estrutura em nuvem escalável com custos marginais baixos por médico)",
    churnMensalEsperado: "< 1,8% no B2C / < 0,7% no B2B"
  } as UnitEconomicsMetrics,
  tiers: [
    {
      nome: "Plantonista Free",
      publico: "Médico Plantonista Individual",
      preco: "Gratuito",
      cobranca: "Vitalício",
      features: [
        "Visualização de escalas e importação básica",
        "Agenda integrada de plantões",
        "Gaveta digital básica (até 5 documentos)",
        "Lembretes de escala no smartphone"
      ],
      valorPercebido: "Porta de entrada para gerar efeito de rede e engajamento orgânico do corpo clínico."
    },
    {
      nome: "Plantonista Pro",
      publico: "Médico com Múltiplos Vínculos / PJ",
      preco: "R$ 39,90",
      cobranca: "por mês (ou R$ 349/ano)",
      features: [
        "Conciliação automática de repasses financeiros vs. plantões realizados",
        "Identificação inteligente de glosas e plantões não pagos",
        "Gaveta digital ilimitada com alertas pró-ativos de vencimento de CRM/RQE",
        "Sincronização bidirecional com Google Agenda e Apple Calendar",
        "Relatório consolidado para contabilidade / Livro-Caixa e Carnê-Leão",
        "Simulador tributário PF vs. PJ médica"
      ],
      valorPercebido: "Retorno financeiro imediato: recuperar 1 único plantão glosado de R$ 1.500 paga 3 anos de assinatura.",
      destaque: true
    },
    {
      nome: "Coordenador / Grupo Médico",
      publico: "Chefes de Plantão, Coordenadores de UTI/PS e Grupos Tercerizados",
      preco: "R$ 690,00",
      cobranca: "por escala / mês (até 40 médicos)",
      features: [
        "Upload de planilhas habituais (Excel/CSV/PDF) com parser IA instantâneo",
        "Painel side-by-side de conferência e resolução de conflitos em 1 clique",
        "Disparo de escalas individuais personalizadas para o WhatsApp e app dos médicos",
        "Alerta de turnos descobertos e sugestão de substitutos elegíveis",
        "Relatório de conferência de horas para faturamento hospitalar"
      ],
      valorPercebido: "Redução de mais de 15 horas de trabalho administrativo mensal do coordenador de escala."
    },
    {
      nome: "Hospital / Enterprise",
      publico: "Diretorias Clínicas, RHs e Operações de Grandes Redes Hospitalares",
      preco: "R$ 3.490,00+",
      cobranca: "por unidade hospitalar / mês",
      features: [
        "Painel Executivo de KPIs Médicos e Hospitalares em Tempo Real",
        "Índice de turnover e absenteísmo médico por especialidade",
        "Custo efetivo da hora médica vs. orçamento previsto por centro de custo",
        "Previsão preditiva de furos de escala com 72h de antecedência",
        "Integração via API com sistemas de ponto, folha e ERPs (MV, Tasy, Senior)",
        "SLA corporativo, suporte dedicado 24/7 e compliance LGPD institucional"
      ],
      valorPercebido: "Governança clínica, eliminação de plantões fantasmas e redução de até 8% nos custos de honorários."
    }
  ] as BusinessPlanTier[]
};

export interface ExpansionKPI {
  codigo: string;
  nome: string;
  categoria: "Operacional" | "Financeiro" | "Corpo Clínico" | "Qualidade & Risco";
  formula: string;
  metaBenchmark: string;
  impactoExecutivo: string;
  fonteDados: string;
  acaoAutomatica: string;
}

export const EXPANSION_KPIS_DATA: ExpansionKPI[] = [
  {
    codigo: "KPI-01",
    nome: "Taxa de Cobertura de Escala (Fill Rate)",
    categoria: "Operacional",
    formula: "(Turnos com médico confirmado / Total de turnos contratados) × 100",
    metaBenchmark: "≥ 99,2%",
    impactoExecutivo: "Evita o fechamento de leitos de UTI e restrição no Pronto-Socorro por falta de equipe médica.",
    fonteDados: "Escala consolidada vs. confirmações no app",
    acaoAutomatica: "Alerta vermelho disparado com 72h e 24h para coordenação com lista de médicos elegíveis para plantão extra."
  },
  {
    codigo: "KPI-02",
    nome: "Índice de Turnos Descobertos de Última Hora (Lead Time < 24h)",
    categoria: "Operacional",
    formula: "Número de desistências a menos de 24h do turno / Total de plantões no mês",
    metaBenchmark: "< 1,5%",
    impactoExecutivo: "Reduz o estresse da equipe em serviço e o pagamento de sobrepreço de emergência para substitutos.",
    fonteDados: "Log de cancelamentos e pedidos de troca no Plantão360",
    acaoAutomatica: "Disparo instantâneo de notificação push para banco de talentos de plantonistas cadastrados com perfil compatível."
  },
  {
    codigo: "KPI-03",
    nome: "Custo Efetivo da Hora Médica vs. Orçada",
    categoria: "Financeiro",
    formula: "(Total de honorários pagos + bônus de emergência) / Horas totais trabalhadas",
    metaBenchmark: "Desvio máximo de ± 3,0%",
    impactoExecutivo: "Identifica setores (como anestesia, UTI pediátrica) onde custos inflacionados comprometem a margem da unidade.",
    fonteDados: "Cruzamento entre demonstrativo hospitalar e valores acordados por turno",
    acaoAutomatica: "Gráfico de dispersão por especialidade com identificação de pagamentos anômalos fora da tabela de referência."
  },
  {
    codigo: "KPI-04",
    nome: "Taxa de Glosas e Divergências de Repasse",
    categoria: "Financeiro",
    formula: "(Valor de plantões contestados / Total bruto de honorários faturados) × 100",
    metaBenchmark: "< 0,8%",
    impactoExecutivo: "Garante a justiça remuneratória para os médicos e reduz conflitos jurídicos e atrito institucional.",
    fonteDados: "Conciliação do app do médico vs. relatório do faturamento",
    acaoAutomatica: "Geração automática de espelho de conciliação para RH/faturamento com memória de cálculo turno a turno."
  },
  {
    codigo: "KPI-05",
    nome: "Índice de Rotatividade do Corpo Clínico (Turnover de Plantonistas)",
    categoria: "Corpo Clínico",
    formula: "(Médicos desligados ou que deixaram a escala no mês / Média de médicos ativos) × 100",
    metaBenchmark: "< 3,0% ao mês",
    impactoExecutivo: "Médicos veteranos conhecem os protocolos do hospital; alto turnover aumenta tempo de atendimento e erros assistenciais.",
    fonteDados: "Histórico de presença e escalas mensais recorrentes",
    acaoAutomatica: "Detecção precoce de desengajamento (médico reduzindo turnos consecutivos) e alerta preventivo ao diretor clínico."
  },
  {
    codigo: "KPI-06",
    nome: "Índice de Sobrecarga e Fadiga Médica (Plantões Consecutivos)",
    categoria: "Qualidade & Risco",
    formula: "Plantonistas com mais de 24h consecutivas ou > 60h semanais sem repouso obrigatório",
    metaBenchmark: "0 casos críticos",
    impactoExecutivo: "Mitiga risco de processos trabalhistas, acidentes ocupacionais e eventos adversos com pacientes.",
    fonteDados: "Cruzamento de escalas entre múltiplos serviços e hospitais parceiros",
    acaoAutomatica: "Bloqueio ou aviso prévio em vermelho na alocação de turno para o médico com histórico de sobrecarga."
  },
  {
    codigo: "KPI-07",
    nome: "Prazo Médio de Liquidação de Honorários (DSO Médico)",
    categoria: "Financeiro",
    formula: "Tempo médio em dias entre a realização do plantão e o efetivo crédito na conta do médico",
    metaBenchmark: "≤ 30 dias",
    impactoExecutivo: "Atrasos recorrentes são o gatilho número um para abandono de escalas pelos melhores especialistas.",
    fonteDados: "Data de realização do plantão vs. data de compensação bancária",
    acaoAutomatica: "Painel comparativo de pontualidade de pagamento por convênio / fonte pagadora."
  }
];

export const EXPANSION_OPPORTUNITIES = [
  {
    titulo: "1. Leitura e Estruturação de KPIs Hospitalares e de Escala",
    resumo: "Transformar os dados brutos de escalas em métricas operacionais claras: taxa de cobertura de turnos, prevenção de furos de escala, distribuição de carga horária e assiduidade do corpo clínico.",
    vantagemCompetitiva: "Coordenadores e hospitais ganham visibilidade em tempo real sobre a integridade de suas escalas sem abandonar o Excel habitual."
  },
  {
    titulo: "2. Detecção e Prevenção de Furos na Escala",
    resumo: "A IA analisa a escala consolidada, identifica lacunas com antecedência e ajuda o gestor a mapear plantonistas disponíveis dentro do próprio grupo, reduzindo trocas caóticas no WhatsApp.",
    vantagemCompetitiva: "Elimina o estresse de escalas descobertas de última hora e garante que todos os turnos tenham profissionais escalados."
  },
  {
    titulo: "3. Conciliação Pessoal de Plantões e Repasses",
    resumo: "O médico compara o registro de plantões trabalhados com o demonstrativo de repasses fornecido pelo hospital ou grupo, identificando eventuais divergências de valores ou turnos não contabilizados.",
    vantagemCompetitiva: "Transparência total para o médico e redução de atritos na prestação de contas com o faturamento hospitalar."
  },
  {
    titulo: "4. Gaveta Digital de Documentos e Conformidade (CRM)",
    resumo: "Armazenamento seguro em nuvem de diplomas, CRM e certidões profissionais, com alertas preventivos de vencimento para evitar que o médico atue em situação irregular.",
    vantagemCompetitiva: "Tranquilidade regulatória para o médico e garantia de conformidade contínua para os serviços hospitalares."
  }
];

export const DECISION_QUESTIONS: DecisionQuestion[] = [
  {
    id: "q1",
    pergunta: "Qual é o centro de gravidade e posicionamento estratégico do Plantão360?",
    contexto: "Definir a essência do produto e como médicos e gestores interagem na plataforma.",
    opcoes: [
      { label: "Plataforma Centrada no Médico + Expansão Progressiva do Gestor", value: "MEDICO_CENTRIC", impacto: "O médico é o núcleo. O web app expande o mobile. O gestor usa sua planilha habitual e a IA lê e gera uma importação estruturada que o médico adapta à própria agenda." },
      { label: "Software B2B Exclusivo para Hospitais (Com eliminação do médico)", value: "B2B_ONLY", impacto: "Perde o engajamento direto e a força viral da comunidade médica plantonista." },
      { label: "App Mobile Isolado sem Extensão Web ou Leitura de Escalas", value: "APP_ONLY", impacto: "Limita o potencial de inteligência operacional e dificulta a leitura de documentos complexos." }
    ]
  },
  {
    id: "q2",
    pergunta: "Como o gestor de escala deve interagir com o Plantão360?",
    contexto: "Definir se o gestor precisa aprender um software novo ou se mantemos seu fluxo de trabalho atual.",
    opcoes: [
      { label: "Mantém a planilha de sempre + Envia para a IA interpretar e distribuir", value: "FLUXO_PLANILHA", impacto: "Zero atrito de adoção. O gestor monta a planilha como sempre fez e a IA do Plantão360 interpreta e disponibiliza sugestões estruturadas aos médicos." },
      { label: "Obrigá-lo a cadastrar médicos e montar a escala do zero em nossa tela", value: "TELA_NOVA", impacto: "Alta resistência de adoção. Gestores ocupados recusam migrar para sistemas que aumentam seu trabalho inicial." }
    ]
  },
  {
    id: "q3",
    pergunta: "Como a escala organizada chega até o médico plantonista?",
    contexto: "Definir a experiência final de distribuição e importação de escalas preservando a autonomia.",
    opcoes: [
      { label: "Importação Estruturada e Revisável na Conta do Médico (App Mobile + Web App)", value: "SYNC_DIRECT", impacto: "Autonomia garantida. O médico recebe a sugestão de escala, revisa, adapta e escolhe o que incorporar à sua própria agenda sem ter sua rotina sequestrada." },
      { label: "Envio de PDFs pesados por e-mail sem integração ou controle", value: "PDF_EMAIL", impacto: "Apenas reproduz o caos do e-mail sem dar inteligência à vida do médico." }
    ]
  },
  {
    id: "q4",
    pergunta: "Qual formato de escala médica é a prioridade número um para o parser de IA ler?",
    contexto: "Os dados de escalas chegam em múltiplos formatos estruturais. Focar no mais doloroso e frequente poupa esforço de desenvolvimento.",
    opcoes: [
      { label: "Planilhas Excel (XLSX/CSV) estruturadas de forma variada", value: "EXCEL", impacto: "Mais frequente nos hospitais; IA consegue extrair com altíssima taxa de acerto (95%+)." },
      { label: "PDFs gerados por exportação de sistemas hospitalares antigos", value: "PDF_SISTEMA", impacto: "Estrutura rígida, ideal para reaproveitamento direto dos parsers de PDF do ElevaLaudo." },
      { label: "Imagens brutas de escala física ou mensagens do WhatsApp", value: "WHATSAPP", impacto: "Altamente caótico, exige OCR pesado e tem maior taxa de erro, melhor deixar para um segundo momento." }
    ]
  },
  {
    id: "q5",
    pergunta: "Como lidaremos com erros de extração da IA na planilha enviada pelo gestor?",
    contexto: "A IA pode eventualmente errar um sobrenome ou confundir um dígito de horário.",
    opcoes: [
      { label: "Sinalização Visual Side-by-Side (Human-in-the-loop)", value: "HITL", impacto: "Tese do ElevaLaudo. O gestor visualiza o dado extraído ao lado da planilha original e ajusta em poucos cliques antes de sincronizar." },
      { label: "Bloquear e exigir re-upload da planilha corrigida", value: "BLOCK", impacto: "Gera péssima experiência ao usuário e causa desistência imediata do produto." },
      { label: "Silenciosamente aceitar e deixar para o médico reclamar depois", value: "SILENT", impacto: "Risco de erros de escala que prejudicam a credibilidade da marca." }
    ]
  }
];
