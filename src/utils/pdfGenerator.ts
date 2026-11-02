import { jsPDF } from "jspdf";
import { ArchitectureModule, DecisionQuestion, ReapItem, RiskItem } from "../data";

export function generateStrategicReport(
  decisions: DecisionQuestion[],
  mvpComplexityText: string,
  modules: ArchitectureModule[],
  reapPlan: ReapItem[],
  risks: RiskItem[]
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin; // 170mm

  let y = 20;
  let pageNum = 1;

  // Helper to add footer with page numbers
  const addFooter = (currentPage: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Plantão360° - Relatório Estratégico do MVP  |  Página ${currentPage}`,
      margin,
      pageHeight - 10
    );
    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: "right" }
    );
  };

  // Helper to check space and add a new page if needed
  const checkSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      addFooter(pageNum);
      doc.addPage();
      pageNum++;
      y = 20;
      return true;
    }
    return false;
  };

  // Helper to draw section title
  const drawSectionTitle = (title: string) => {
    checkSpace(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(10, 132, 255); // #0A84FF blue
    doc.text(title, margin, y);
    y += 5;
    doc.setDrawColor(30, 41, 59); // Slate-800 divider
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 8;
  };

  // --- COVER BANNER / HEADER ---
  doc.setFillColor(15, 15, 18); // Dark background
  doc.rect(0, 0, pageWidth, 45, "F");

  // Title in the cover banner
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("PLANTÃO 360", margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(10, 132, 255); // Blue subtitle
  doc.text("DIRETRIZES TÉCNICAS E ARQUITETURA DO MVP", margin, 24);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(160, 160, 160);
  doc.text("Simulação baseada no Plano de Alinhamento Estratégico com Engenharia Reutilizável", margin, 32);

  // Line at the bottom of the header
  doc.setDrawColor(10, 132, 255);
  doc.setLineWidth(1.5);
  doc.line(0, 45, pageWidth, 45);

  y = 55;

  // --- SECTION 1: TESE E COMPLEXIDADE DO MVP ---
  drawSectionTitle("1. Alinhamento de Complexidade do MVP");

  // Dynamic box for Complexity
  checkSpace(25);
  doc.setFillColor(241, 245, 249); // slate-100 background
  doc.setDrawColor(10, 132, 255);
  doc.setLineWidth(0.5);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("Diagnóstico de Complexidade Operacional do MVP:", margin + 5, y + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 132, 255);
  doc.text(mvpComplexityText, margin + 5, y + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600
  const textComplexity = "Baseado nas decisões estratégicas registradas pelo fundador no mural de decisões, este indicador calcula em tempo real o esforço estimado de engenharia para que o MVP entre em produção em poucas semanas.";
  doc.text(textComplexity, margin + 5, y + 18, { maxWidth: contentWidth - 10 });
  y += 28;

  // --- SECTION 2: ESCOPO CRÍTICO (ÂNCORAS DO MVP) ---
  drawSectionTitle("2. Módulos de Escopo Crítico (Âncoras do MVP)");

  const criticalModules = modules.filter(m => m.prioridade === "Crítica");

  criticalModules.forEach((m) => {
    checkSpace(38);
    // Draw card border & subtle background
    doc.setFillColor(248, 249, 250); // Light off-white for professional readability
    doc.setDrawColor(220, 225, 230);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, 32, "FD");

    // Title of the module
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(m.ambiente, margin + 4, y + 6);

    // Target User badge
    doc.setFillColor(224, 242, 254); // sky-100
    doc.rect(margin + contentWidth - 55, y + 2, 51, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(3, 105, 161); // sky-700
    doc.text(`ALVO: ${m.usuario.toUpperCase()}`, margin + contentWidth - 53, y + 5.5);

    // Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text("Função Principal:", margin + 4, y + 12);
    doc.setFont("helvetica", "normal");
    doc.text(m.funcao, margin + 32, y + 12, { maxWidth: contentWidth - 36 });

    doc.setFont("helvetica", "bold");
    doc.text("Informação Chave:", margin + 4, y + 18);
    doc.setFont("helvetica", "normal");
    doc.text(m.infoPrincipal, margin + 32, y + 18, { maxWidth: contentWidth - 36 });

    doc.setFont("helvetica", "bold");
    doc.text("Ação do Usuário:", margin + 4, y + 24);
    doc.setFont("helvetica", "normal");
    doc.text(m.acaoPrincipal, margin + 32, y + 24, { maxWidth: contentWidth - 36 });

    y += 36;
  });

  // --- SECTION 3: RESPOSTAS AO MURAL DE DECISÕES ---
  drawSectionTitle("3. Mural de Decisões Estratégicas Selecionadas");

  decisions.forEach((q, idx) => {
    checkSpace(30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}. ${q.pergunta}`, margin, y);
    y += 4.5;

    // Selected Option
    const selectedOpt = q.opcoes.find(o => o.value === q.selected) || q.opcoes[0];
    
    doc.setFillColor(241, 245, 249); // slate-100 background
    doc.rect(margin, y, contentWidth, 18, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(10, 132, 255);
    doc.text(`Decisão: ${selectedOpt.label}`, margin + 4, y + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Impacto Técnico: ${selectedOpt.impacto}`, margin + 4, y + 11.5, { maxWidth: contentWidth - 8 });

    y += 22;
  });

  // --- SECTION 4: PLANO DE REAPROVEITAMENTO DO ELEVALAUDO ---
  drawSectionTitle("4. Plano de Reuso de Ativos (ElevaLaudo -> Plantão360)");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const textReapIntro = "Para acelerar o Time-to-Market em mais de 70%, as seguintes rotinas de engenharia do ElevaLaudo foram especificadas para reuso imediato ou sob adaptação pontual:";
  doc.text(textReapIntro, margin, y, { maxWidth: contentWidth });
  y += 10;

  reapPlan.forEach((item) => {
    if (item.reutilizacao === "Direta" || item.reutilizacao === "Adaptação") {
      checkSpace(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(item.elemento, margin, y);

      // Reuse Badge
      const isDireta = item.reutilizacao === "Direta";
      doc.setFillColor(isDireta ? 220 : 254, isDireta ? 252 : 243, isDireta ? 231 : 199); // green-100 or amber-100
      doc.rect(margin + contentWidth - 28, y - 3, 26, 4.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(isDireta ? 21 : 180, isDireta ? 128 : 83, isDireta ? 61 : 9); // green-800 or amber-800
      doc.text(item.reutilizacao.toUpperCase(), margin + contentWidth - 25, y + 0.2);

      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 110, 120);
      doc.text(`Função original: ${item.funcaoAtual}`, margin, y, { maxWidth: contentWidth });
      y += 4;
      doc.text(`Lógica de Reuso: ${item.motivo}`, margin, y, { maxWidth: contentWidth - 10 });
      
      y += 8;
    }
  });

  // --- SECTION 5: MATRIZ DE RISCO CRÍTICOS ---
  drawSectionTitle("5. Gestão de Riscos & Diretrizes de Mitigação");

  risks.slice(0, 3).forEach((r) => {
    checkSpace(28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(190, 24, 74); // pink-700
    doc.text(`Risco: ${r.risco}`, margin, y, { maxWidth: contentWidth - 30 });

    // Impact / Probability Badges
    doc.setFillColor(254, 226, 226); // red-100
    doc.rect(margin + contentWidth - 26, y - 3, 24, 4.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(153, 27, 27); // red-800
    doc.text(`IMPACTO: ${r.impacto.toUpperCase()}`, margin + contentWidth - 25, y + 0.2);

    y += 5.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text("Alerta:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(r.alerta, margin + 12, y, { maxWidth: contentWidth - 14 });
    y += 5.5;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(21, 128, 61); // green-700
    doc.text("Mitigação:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(r.mitigacao, margin + 16, y, { maxWidth: contentWidth - 18 });

    y += 10;
  });

  // Final confirmation footer for last page
  addFooter(pageNum);

  // Download PDF
  doc.save("Relatorio_Estrategico_MVP_Plantao360.pdf");
}
