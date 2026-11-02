import { jsPDF } from "jspdf";
import { 
  INITIAL_OPPORTUNITIES, 
  REFERENCE_MODEL, 
  TRANSLATION_MODEL, 
  STRATEGIC_DIRECTIONS, 
  USER_ECOSYSTEM, 
  ARCHITECTURE_MODULES, 
  REAP_PLAN, 
  RISK_ASSESSMENT, 
  BUSINESS_MODEL_DATA,
  EXPANSION_KPIS_DATA,
  EXPANSION_OPPORTUNITIES,
  DecisionQuestion 
} from "../data";

export interface FullThesisExportOptions {
  decisions?: DecisionQuestion[];
  mvpComplexityText?: string;
}

/**
 * Generates and triggers download for the Full Thesis in Markdown format (.md)
 */
export function downloadThesisMarkdown(options?: FullThesisExportOptions) {
  const dateStr = new Date().toLocaleDateString("pt-BR");
  
  const content = `# PLANTÃO 360° — TESE COMPLETA DE PRODUTO, MODELO DE NEGÓCIO & ENGENHARIA
*Documento Estratégico Oficial · Versão 1.0 · Data: ${dateStr}*
*Autor: Equipe de Produto & Engenharia Plantão360 (Ref. ElevaLaudo)*

---

## 1. RESUMO EXECUTIVO & TESE DE PRODUTO

O **Plantão360°** é uma plataforma multiplataforma (Mobile App + Web App) centrada na vida e na rotina do **médico plantonista**. Ele unifica em um único ambiente:
1. **Organização da Agenda de Plantões**: com importação inteligente e autônoma de escalas a partir de planilhas habituais.
2. **Conciliação Financeira Transparente**: controle detalhado de repasses previstos, valores pendentes, identificação de inconsistências hospitalares e auditoria de glosas.
3. **Gaveta Digital de Documentos**: armazenamento em nuvem de CRM, certificados, certidões éticas e apólices com lembretes proativos de validade.
4. **Extensão Progressiva B2B (Gestor)**: a IA lê as planilhas habituais (Excel/CSV/PDF) que o gestor já utiliza, sem exigir que ele aprenda um software novo, e entrega ao médico uma *sugestão de escala estruturada e revisável*.

### Princípio Soberano: Não-Sequestro de Agenda
Diferente dos sistemas corporativos hospitalares legados (ex: MV, Tasy) que buscam impor telas burocráticas e "sequestrar" a rotina médica, o Plantão360 **não sequestra a agenda do médico**. O profissional mantém autonomia absoluta para revisar cada plantão sugerido, aceitar com 1 clique, ajustar horários e valores reais negociados, ou dispensar turnos incompatíveis.

---

## 2. O PROBLEMA DE MERCADO & TAMANHO DA OPORTUNIDADE

- **Mercado Endereçável (Brasil):** Mais de 550.000 médicos ativos. Cerca de 80% realizam plantões regulares em seus primeiros 10 anos de carreira.
- **Volume Transacionado:** Estima-se mais de R$ 60 bilhões/ano em honorários de plantões médicos no Brasil, com mais de 2 milhões de turnos mensais.
- **Dores Críticas do Médico:**
  - *Fragmentação e Caos:* Escalas enviadas como fotos ou planilhas despadronizadas em mais de 10 grupos de WhatsApp simultâneos.
  - *Perda Financeira Silenciosa:* Médicos perdem entre 8% e 15% de sua remuneração real por falta de conciliação de horas extras, adicionais noturnos e glosas arbitrárias dos hospitais/cooperativas.
  - *Risco Jurídico e Regulatório:* Médicos acumulam plantões sem controle de descanso mínimo, arriscando cancelamento de CRM por documentos expirados.
- **Dores Críticas do Hospital / Coordenador:**
  - *Furos de Escala de Última Hora:* Gaps não cobertos fecham leitos de UTI e geram custos de emergência 50% superiores à média.
  - *Resistência a Softwares Complexos:* Coordenadores clínicos não têm tempo para preencher sistemas ERP legados e preferem o bom e velho Excel.

---

## 3. MODELO DE NEGÓCIO COMPLETO & MONETIZAÇÃO

O Plantão360 opera sob uma tese híbrida de expansão **Bottom-up (Product-Led Growth)** com **Land & Expand**. O médico adota o aplicativo para resolver seu próprio controle financeiro e agenda (B2C). A densidade de médicos em um mesmo serviço impulsiona a contratação corporativa por coordenadores e hospitais (B2B SaaS).

### 3.1 Tiers de Precificação e Proposta de Valor

| Plano | Público | Preço | Proposta de Valor & Recursos |
|---|---|---|---|
| **Plantonista Free** | Médico Plantonista Individual | Gratuito | Visualização de escalas, agenda integrada, gaveta digital básica (até 5 docs) e lembretes de plantão no smartphone. Porta de entrada viral. |
| **Plantonista Pro** | Médico PJ / Múltiplos Vínculos | **R$ 39,90/mês** (ou R$ 349/ano) | **Conciliação financeira automática** com alerta de divergências/glosas, gaveta ilimitada com alertas de CRM/RQE, exportação para contabilidade/Carnê-Leão e sincronização com Google/Apple Calendar. **ROI comprovado: recuperar 1 único plantão glosado paga 3 anos do app.** |
| **Coordenador / Grupo** | Chefes de Serviço, UTIs e Clínicas | **R$ 690,00/mês** (até 40 médicos) | Upload da planilha habitual (Excel/CSV) com parser IA instantâneo, painel side-by-side de resolução de conflitos, disparo de escalas personalizadas para WhatsApp/App e relatórios de horas para faturamento. Economiza 15h+/mês de burocracia. |
| **Hospital Enterprise** | Diretorias Clínicas e RH Hospitalar | **R$ 3.490,00+/mês** por unidade | Painel de KPIs Operacionais e Clínicos em tempo real, predição de furos de escala com 72h, índice de turnover médico, auditoria de folha, integração API com ERPs hospitalares e compliance LGPD institucional. |

### 3.2 Unit Economics Projetados
- **CAC B2C:** R$ 45 - R$ 75 (via aquisição comunitária e grupos médicos)
- **LTV B2C:** R$ 720 - R$ 1.180 (retenção média projetada de 24-30 meses)
- **Payback B2C:** 1,5 a 2 meses
- **CAC B2B:** R$ 1.200 - R$ 2.800 (Inside sales direcionado a coordenadores)
- **LTV B2B:** R$ 18.000 - R$ 45.000 (Retenção institucional superior a 36 meses)
- **Payback B2B:** 3 a 4 meses
- **Margem Bruta Operacional:** 88%

---

## 4. O MVP: LEITURA INTELIGENTE DE ESCALAS (CORE ENGINE)

O motor central do MVP traduz a lógica comprovada do ElevaLaudo (OCR + IA Multimodal + Human-in-the-Loop) para o setor hospitalar:
1. **Entrada Sem Atrito:** O coordenador arrasta sua planilha de sempre (XLSX, CSV ou PDF).
2. **Interpretação Semântica por IA:** A IA mapeia nomes de médicos com base no banco de CRMs, identifica turnos (12h diurno, 12h noturno, 24h), setores (UTI Adulto, PS, Sala Vermelha) e valores combinados.
3. **Revisão Side-by-Side (HITL):** O coordenador visualiza o espelho da planilha original ao lado dos dados estruturados. Conflitos (médico escalado em dois lugares ao mesmo tempo) são destacados em vermelho.
4. **Distribuição Autônoma:** Com 1 clique, cada médico recebe apenas a sua respectiva escala em formato claro e limpo no mobile/web app, mantendo autonomia para aceitar ou adaptar.

---

## 5. ALÉM DA LEITURA DE ESCALAS: OPÇÕES, POSSIBILIDADES E ESTRUTURAÇÃO DE KPIS

A leitura e importação de escalas é a porta de entrada indispensável. No entanto, a verdadeira barreira competitiva (*moat*) e valor para diretores clínicos e investidores reside nas **possibilidades subsequentes de estruturação de dados, inteligência operacional e KPIs**.

### 5.1 Leitura, Estruturação e Inteligência de KPIs Médicos e Hospitalares

Transformar a escala viva em um painel executivo com métricas estratégicas que os ERPs tradicionais não conseguem apurar:

1. **Taxa de Cobertura de Escala (Fill Rate):**
   - *Fórmula:* (Turnos com médico confirmado / Total de turnos necessários) × 100
   - *Meta:* ≥ 99,2%
   - *Ação Automática:* Alerta vermelho de gap com 72h e 24h para coordenação com sugestão de substitutos.

2. **Índice de Turnos Descobertos de Última Hora (Lead Time < 24h):**
   - *Fórmula:* Desistências a menos de 24h do turno / Total de plantões no mês
   - *Meta:* < 1,5%
   - *Impacto:* Reduz o pagamento de sobrepreço de emergência para plantonistas substitutos.

3. **Custo Efetivo da Hora Médica vs. Orçada:**
   - *Fórmula:* (Honorários totais pagos + bônus de emergência) / Horas totais trabalhadas
   - *Meta:* Desvio máximo de ± 3,0%
   - *Impacto:* Identifica serviços onde plantões extras descontrolados estão corroendo a margem do hospital.

4. **Taxa de Glosas e Divergências de Repasse:**
   - *Fórmula:* (Valor de plantões contestados / Total bruto de honorários faturados) × 100
   - *Meta:* < 0,8%
   - *Impacto:* Elimina fricção e conflitos trabalhistas entre os médicos e a administração hospitalar.

5. **Índice de Rotatividade do Corpo Clínico (Turnover de Plantonistas):**
   - *Fórmula:* (Médicos desligados no mês / Média de médicos ativos) × 100
   - *Meta:* < 3,0% ao mês
   - *Impacto:* Médicos estáveis conhecem a rotina da unidade e reduzem o tempo de internação e taxas de reinternação.

6. **Índice de Sobrecarga e Fadiga Médica:**
   - *Fórmula:* Plantonistas acumulando mais de 24h consecutivas ou > 60h semanais sem descanso
   - *Meta:* 0 casos críticos
   - *Impacto:* Prevenção direta de eventos adversos graves com pacientes e mitigação de risco civil/ético perante o CFM.

7. **Prazo Médio de Liquidação de Honorários (DSO Médico):**
   - *Fórmula:* Tempo médio em dias entre a realização do plantão e o crédito efetivo em conta
   - *Meta:* ≤ 30 dias
   - *Impacto:* Manutenção dos melhores profissionais no corpo clínico através de previsibilidade financeira.

### 5.2 Alertas e Prevenção de Furos na Escala
O sistema analisa a integridade da escala consolidada e sinaliza lacunas de plantão com antecedência, permitindo ao gestor identificar horários descobertos e coordenar substituições sem desespero em grupos de WhatsApp.

### 5.3 Conciliação Pessoal de Plantões e Repasses Hospitalares
- **Conferência Simples e Transparente:** O médico cruza os plantões realizados com o demonstrativo fornecido pelo hospital/grupo, identificando turnos esquecidos ou valores divergentes para alinhamento amigável.
- **Autonomia Total:** Sem intermediários financeiros ou burocracia desnecessária; apenas clareza entre o que foi trabalhado e o que foi repassado.

### 5.4 Gestão Contínua de Conformidade na Gaveta Digital
- Alertas preventivos de renovação de CRM, títulos de especialista (RQE) e apólices de seguro profissional, mantendo o médico e o serviço hospitalar em conformidade legal contínua.

---

## 6. PERSONAS & PERFIS DO ECOSYSTEMA

${USER_ECOSYSTEM.map((p, i) => `### 6.${i + 1} ${p.perfil} (${p.papel})
- **Prioridade:** ${p.prioridade}
- **Dor Principal:** ${p.dorPrincipal}
- **Ação Chave no Plantão360:** ${p.acaoPrincipal}
- **Benefício Entregue:** ${p.beneficio}
`).join("\n")}

---

## 7. ARQUITETURA DE MÓDULOS DO SISTEMA

${ARCHITECTURE_MODULES.map((m, idx) => `### 7.${idx + 1} [${m.prioridade.toUpperCase()}] ${m.ambiente}
- **Usuário Alvo:** ${m.usuario}
- **Função Principal:** ${m.funcao}
- **Informação Principal:** ${m.infoPrincipal}
- **Ação Principal:** ${m.acaoPrincipal}
`).join("\n")}

---

## 8. PLANO DE REAPROVEITAMENTO DE ENGENHARIA (ElevaLaudo -> Plantão360)

O Plantão360 acelera seu Time-to-Market em mais de 70% aproveitando componentes maduros do ElevaLaudo:

${REAP_PLAN.map((item, idx) => `- **${item.elemento}** [Reúso: *${item.reutilizacao}*]
  - *Função Atual:* ${item.funcaoAtual}
  - *Lógica de Adaptação:* ${item.motivo}
`).join("\n")}

---

## 9. GESTÃO DE RISCOS CRÍTICOS & DIRETRIZES DE MITIGAÇÃO

${RISK_ASSESSMENT.map((r, idx) => `### 9.${idx + 1} ${r.risco}
- **Impacto:** ${r.impacto} | **Probabilidade:** ${r.probabilidade}
- **Alerta do Sistema:** ${r.alerta}
- **Estratégia de Mitigação:** ${r.mitigacao}
`).join("\n")}

${options?.decisions ? `
---

## 10. MURAL DE DECISÕES ESTRATÉGICAS

${options.decisions.map((d, idx) => {
  const chosen = d.opcoes.find(o => o.value === d.selected) || d.opcoes[0];
  return `### 10.${idx + 1} ${d.pergunta}
- **Decisão Selecionada:** ${chosen.label}
- **Impacto no MVP:** ${chosen.impacto}
`;
}).join("\n")}
` : ""}

---

*Plantão360° — Plataforma Estratégica Multiplataforma. Todos os direitos reservados.*
`;

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tese_Completa_Plantao360.md";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and triggers download for the Full Thesis in structured JSON format (.json)
 */
export function downloadThesisJSON(options?: FullThesisExportOptions) {
  const data = {
    nome: "Plantão360°",
    versao: "1.0",
    dataExportacao: new Date().toISOString(),
    resumoExecutivo: {
      titulo: "Plantão360°: A Plataforma Multiplataforma Centrada no Médico Plantonista",
      tese: "Organizar plantões, acompanhar pagamentos, guardar documentos na gaveta digital com lembretes e ter clareza sobre a vida profissional. O web app expande o mobile e adiciona inteligência à planilha do gestor para transformar a escala em uma importação estruturada e revisável, que o médico adapta à própria agenda.",
      principios: [
        "Centrado no Médico Plantonista",
        "Não-Sequestro de Agenda (Human-in-the-Loop)",
        "Zero Atrito de Adoção para o Gestor (IA lê planilha existente)",
        "Gaveta Digital de Documentos com Lembretes",
        "Conciliação e Transparência Financeira"
      ]
    },
    brandSystem: {
      primaryColor: "#0A84FF",
      fontHeadlines: "Inter Extra Bold 800",
      fontBody: "Inter Regular 400",
      statusColors: {
        success: "#30D158",
        warning: "#FFD60A",
        danger: "#FF453A",
        info: "#64D2FF"
      }
    },
    personas: USER_ECOSYSTEM,
    modeloNegocio: BUSINESS_MODEL_DATA,
    kpisExpansao: EXPANSION_KPIS_DATA,
    oportunidadesAlemEscala: EXPANSION_OPPORTUNITIES,
    oportunidadesPriorizadas: INITIAL_OPPORTUNITIES,
    modulosArquitetura: ARCHITECTURE_MODULES,
    planoReusoElevaLaudo: REAP_PLAN,
    direcoesEstrategicas: STRATEGIC_DIRECTIONS,
    modeloReferenciaElevaLaudo: REFERENCE_MODEL,
    traducaoParaPlantao360: TRANSLATION_MODEL,
    matrizRiscos: RISK_ASSESSMENT,
    decisoesEstrategicas: options?.decisions || []
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tese_Completa_Plantao360.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and triggers download for Founder Decisions in CSV format (.csv)
 */
export function exportDecisionsCSV(decisions: DecisionQuestion[], mvpComplexityText?: string) {
  const dateStr = new Date().toLocaleDateString("pt-BR");
  const timeStr = new Date().toLocaleTimeString("pt-BR");

  const escapeCell = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const headers = [
    "Item",
    "ID_Decisao",
    "Pergunta_Estrategica",
    "Contexto_Decisao",
    "Opcao_Selecionada",
    "Chave_Opcao",
    "Impacto_no_MVP",
    "Data_Registro",
    "Hora_Registro"
  ];

  const rows = decisions.map((q, idx) => {
    const chosen = q.opcoes.find(o => o.value === q.selected) || q.opcoes[0];
    return [
      escapeCell(idx + 1),
      escapeCell(q.id),
      escapeCell(q.pergunta),
      escapeCell(q.contexto),
      escapeCell(chosen.label),
      escapeCell(chosen.value),
      escapeCell(chosen.impacto),
      escapeCell(dateStr),
      escapeCell(timeStr)
    ].join(";");
  });

  const summaryHeader = [
    escapeCell("#"),
    escapeCell("SUMARIO_EXECUTIVO"),
    escapeCell("Complexidade do MVP"),
    escapeCell("Total_Questoes"),
    escapeCell("Status_Alinhamento"),
    escapeCell(""),
    escapeCell(""),
    escapeCell("Data"),
    escapeCell("Hora")
  ].join(";");

  const summaryLine = [
    escapeCell("META"),
    escapeCell("Plantão360"),
    escapeCell(mvpComplexityText || "Calculada em tempo real"),
    escapeCell(`${decisions.length} Decisões Mapeadas`),
    escapeCell("Alinhamento do Fundador Confirmado"),
    escapeCell(""),
    escapeCell(""),
    escapeCell(dateStr),
    escapeCell(timeStr)
  ].join(";");

  // UTF-8 BOM (\uFEFF) ensures Excel opens special characters (acentos) correctly
  const csvContent = "\uFEFF" + [
    headers.map(escapeCell).join(";"),
    ...rows,
    "",
    summaryHeader,
    summaryLine
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fileDate = new Date().toISOString().slice(0, 10);
  link.download = `Historico_Decisoes_Fundador_Plantao360_${fileDate}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Enhanced Full Multi-Page Comprehensive PDF Exporter
 */
export function downloadThesisFullPDF(options?: FullThesisExportOptions) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 18;
  const contentWidth = pageWidth - 2 * margin; // 174mm

  let y = 18;
  let pageNum = 1;

  const addFooter = (currentPage: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(130, 140, 150);
    doc.text(
      `Plantão360° — Tese Completa de Produto & Engenharia  |  Pág. ${currentPage}`,
      margin,
      pageHeight - 9
    );
    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
      pageWidth - margin,
      pageHeight - 9,
      { align: "right" }
    );
  };

  const checkSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 18) {
      addFooter(pageNum);
      doc.addPage();
      pageNum++;
      y = 18;
      return true;
    }
    return false;
  };

  const drawSectionTitle = (title: string, subtitle?: string) => {
    checkSpace(subtitle ? 22 : 16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(10, 132, 255); // #0A84FF
    doc.text(title, margin, y);
    y += 4.5;
    
    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 115, 130);
      doc.text(subtitle, margin, y);
      y += 4;
    }

    doc.setDrawColor(220, 226, 235);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 7;
  };

  // --- COVER HEADER ---
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, 48, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("PLANTÃO 360°", margin, 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(10, 132, 255); // #0A84FF
  doc.text("DOCUMENTO OFICIAL DA TESE DE PRODUTO & DIRETRIZES TÉCNICAS", margin, 25);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 190, 200);
  doc.text("Multiplataforma Centrada no Médico com Importação Inteligente de Escalas e Reúso do ElevaLaudo", margin, 32);
  doc.text(`Data do Relatório: ${new Date().toLocaleDateString("pt-BR")} · Versão 1.0`, margin, 38);

  doc.setDrawColor(10, 132, 255);
  doc.setLineWidth(1.8);
  doc.line(0, 48, pageWidth, 48);

  y = 56;

  // --- 1. RESUMO EXECUTIVO & TESE ---
  drawSectionTitle("1. Resumo Executivo & Tese de Produto", "Posicionamento estratégico, proposta de valor e autonomia profissional");

  checkSpace(40);
  doc.setFillColor(243, 246, 250);
  doc.setDrawColor(10, 132, 255);
  doc.setLineWidth(0.4);
  doc.rect(margin, y, contentWidth, 34, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("A Essência do Plantão360°:", margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const teseText = "O Plantão360 é uma plataforma centrada na rotina do médico plantonista (B2C Core) com expansão progressiva para o gestor hospitalar (B2B). Unifica a organização de escalas, conciliação transparente de repasses e gaveta de CRM em um ambiente unificado.";
  doc.text(teseText, margin + 4, y + 12, { maxWidth: contentWidth - 8 });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(10, 132, 255);
  doc.text("Princípio de Não-Sequestro de Agenda:", margin + 4, y + 23);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const autonomiaText = "O médico mantém total soberania para aceitar com 1 clique, editar horários e valores reais, ou dispensar sugestões de escalas enviadas pelo gestor.";
  doc.text(autonomiaText, margin + 4, y + 28, { maxWidth: contentWidth - 8 });

  y += 40;

  // --- 2. MODELO DE NEGÓCIO & MONETIZAÇÃO ---
  drawSectionTitle("2. Modelo de Negócio, Pricing & Unit Economics", "Tese Bottom-up (PLG) e monetização B2C / B2B SaaS");

  checkSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Resumo da Estratégia de Monetização:", margin, y);
  y += 4.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(BUSINESS_MODEL_DATA.resumo, margin, y, { maxWidth: contentWidth });
  y += 12;

  // Plan Tiers
  BUSINESS_MODEL_DATA.tiers.forEach((tier) => {
    checkSpace(22);
    doc.setFillColor(tier.destaque ? 240 : 250, tier.destaque ? 247 : 250, tier.destaque ? 255 : 252);
    doc.setDrawColor(tier.destaque ? 10 : 225, tier.destaque ? 132 : 230, tier.destaque ? 255 : 238);
    doc.setLineWidth(tier.destaque ? 0.4 : 0.2);
    doc.rect(margin, y, contentWidth, 20, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(tier.destaque ? 10 : 15, tier.destaque ? 132 : 23, tier.destaque ? 255 : 42);
    doc.text(`${tier.nome} — ${tier.preco} ${tier.cobranca}`, margin + 4, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 115, 130);
    doc.text(`Público: ${tier.publico}`, margin + 4, y + 9);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Valor Percebido:", margin + 4, y + 14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(tier.valorPercebido, margin + 26, y + 14, { maxWidth: contentWidth - 30 });

    y += 24;
  });

  // --- 3. ALÉM DA LEITURA DE ESCALAS & KPIS ---
  drawSectionTitle("3. Além da Leitura de Escalas: Inteligência & KPIs", "Opções de expansão, predição e indicadores hospitalares");

  EXPANSION_OPPORTUNITIES.forEach((opp) => {
    checkSpace(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(10, 132, 255);
    doc.text(opp.titulo, margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(opp.resumo, margin + 4, y, { maxWidth: contentWidth - 4 });
    y += 8;
  });

  // KPIs
  checkSpace(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Catálogo Estruturado de KPIs Operacionais e Financeiros:", margin, y);
  y += 5;

  EXPANSION_KPIS_DATA.slice(0, 5).forEach((kpi) => {
    checkSpace(18);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(220, 230, 240);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, 16, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`[${kpi.codigo}] ${kpi.nome}`, margin + 4, y + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(10, 132, 255);
    doc.text(`Meta: ${kpi.metaBenchmark}`, margin + contentWidth - 32, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Fórmula: ${kpi.formula}`, margin + 4, y + 9, { maxWidth: contentWidth - 8 });
    doc.text(`Ação Automática: ${kpi.acaoAutomatica}`, margin + 4, y + 13.5, { maxWidth: contentWidth - 8 });

    y += 19;
  });

  // --- 4. PERSONAS ---
  drawSectionTitle("4. Mapeamento de Usuários e Perfis", "Públicos impactados e objetivos funcionais");

  USER_ECOSYSTEM.forEach((u) => {
    checkSpace(24);
    doc.setFillColor(250, 250, 252);
    doc.setDrawColor(225, 230, 238);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, 20, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${u.perfil} — ${u.papel}`, margin + 4, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(10, 132, 255);
    doc.text(`PRIORIDADE: ${u.prioridade.toUpperCase()}`, margin + contentWidth - 34, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("Dor:", margin + 4, y + 10);
    doc.setFont("helvetica", "normal");
    doc.text(u.dorPrincipal, margin + 14, y + 10, { maxWidth: contentWidth - 18 });

    doc.setFont("helvetica", "bold");
    doc.text("Ação:", margin + 4, y + 15);
    doc.setFont("helvetica", "normal");
    doc.text(u.acaoPrincipal, margin + 14, y + 15, { maxWidth: contentWidth - 18 });

    y += 24;
  });

  // --- 3. IDENTIDADE VISUAL ---
  drawSectionTitle("3. Brand System & Diretrizes Visuais", "Identidade, paleta cromática e tipografia");

  checkSpace(28);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Cores Institucionais:", margin, y);
  y += 5;

  const colors = [
    { name: "Azul Cobalto", hex: "#0A84FF", role: "Primária / Destaque", rgb: [10, 132, 255] },
    { name: "Verde Sucesso", hex: "#30D158", role: "Confirmado / Pagamento", rgb: [48, 209, 88] },
    { name: "Âmbar Alerta", hex: "#FFD60A", role: "Pendente / Revisão", rgb: [255, 214, 10] },
    { name: "Vermelho Perigo", hex: "#FF453A", role: "Conflito / Furto / Furo", rgb: [255, 69, 58] }
  ];

  const colW = (contentWidth - 6) / 4;
  colors.forEach((c, idx) => {
    const cx = margin + idx * (colW + 2);
    doc.setFillColor(c.rgb[0], c.rgb[1], c.rgb[2]);
    doc.rect(cx, y, colW, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(c.name, cx, y + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 110, 125);
    doc.text(`${c.hex} · ${c.role}`, cx, y + 18, { maxWidth: colW });
  });

  y += 26;

  // --- 4. MÓDULOS DE ARQUITETURA ---
  drawSectionTitle("4. Arquitetura de Módulos do Sistema", "Ambientes funcionais e separação de escopo");

  ARCHITECTURE_MODULES.forEach((m) => {
    checkSpace(28);
    doc.setFillColor(248, 249, 252);
    doc.setDrawColor(220, 226, 235);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, 24, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(m.ambiente, margin + 4, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(m.prioridade === "Crítica" ? 180 : 10, m.prioridade === "Crítica" ? 20 : 132, m.prioridade === "Crítica" ? 50 : 255);
    doc.text(`[${m.prioridade.toUpperCase()}] ALVO: ${m.usuario.toUpperCase()}`, margin + contentWidth - 56, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text("Função:", margin + 4, y + 10);
    doc.setFont("helvetica", "normal");
    doc.text(m.funcao, margin + 20, y + 10, { maxWidth: contentWidth - 24 });

    doc.setFont("helvetica", "bold");
    doc.text("Ação Chave:", margin + 4, y + 16);
    doc.setFont("helvetica", "normal");
    doc.text(m.acaoPrincipal, margin + 20, y + 16, { maxWidth: contentWidth - 24 });

    y += 28;
  });

  // --- 5. PLANO DE REÚSO ELEVALAUDO ---
  drawSectionTitle("5. Plano de Reúso de Ativos (ElevaLaudo -> Plantão360)", "Estratégia de aceleração de engenharia");

  REAP_PLAN.forEach((r) => {
    checkSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${r.elemento}`, margin, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(r.reutilizacao === "Direta" ? 30 : 180, r.reutilizacao === "Direta" ? 140 : 100, r.reutilizacao === "Direta" ? 50 : 20);
    doc.text(`[${r.reutilizacao.toUpperCase()}]`, margin + contentWidth - 30, y);

    y += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Aplicação no Plantão360: ${r.motivo}`, margin + 4, y, { maxWidth: contentWidth - 6 });

    y += 8;
  });

  // --- 6. RISCOS E MITIGAÇÃO ---
  drawSectionTitle("6. Matriz de Riscos Críticos e Mitigação", "Blindagem operacional e técnica");

  RISK_ASSESSMENT.forEach((risk) => {
    checkSpace(25);
    doc.setFillColor(255, 248, 248);
    doc.setDrawColor(254, 202, 202);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, 20, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text(`Risco: ${risk.risco}`, margin + 4, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(120, 50, 50);
    doc.text(`Impacto: ${risk.impacto} · Probabilidade: ${risk.probabilidade}`, margin + contentWidth - 60, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Mitigação:", margin + 4, y + 11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(risk.mitigacao, margin + 18, y + 11, { maxWidth: contentWidth - 22 });

    y += 24;
  });

  // Footer for the last page
  addFooter(pageNum);

  // Save the full thesis PDF
  doc.save("Tese_Completa_Plantao360_Estrategia.pdf");
}

