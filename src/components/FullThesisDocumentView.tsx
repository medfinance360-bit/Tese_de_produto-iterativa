import React, { useState, useMemo } from "react";
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Search, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Users, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  BookOpen, 
  BarChart3, 
  Zap, 
  ArrowUpRight, 
  Filter,
  CheckCircle2,
  Share2,
  FileDown,
  Code,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  INITIAL_OPPORTUNITIES, 
  USER_ECOSYSTEM, 
  ARCHITECTURE_MODULES, 
  REAP_PLAN, 
  RISK_ASSESSMENT, 
  BUSINESS_MODEL_DATA, 
  EXPANSION_KPIS_DATA, 
  EXPANSION_OPPORTUNITIES,
  DecisionQuestion 
} from "../data";
import { 
  downloadThesisFullPDF, 
  downloadThesisMarkdown, 
  downloadThesisJSON,
  exportDecisionsCSV
} from "../utils/thesisExporter";

interface FullThesisDocumentViewProps {
  decisions?: DecisionQuestion[];
  mvpComplexityText?: string;
  onOpenDownloadModal?: () => void;
}

export const FullThesisDocumentView: React.FC<FullThesisDocumentViewProps> = ({
  decisions = [],
  mvpComplexityText = "Baixa e Segura (Ideal para MVP)",
  onOpenDownloadModal
}) => {
  const [activeChapter, setActiveChapter] = useState<string>("cap1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("todos");
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [selectedKpiCode, setSelectedKpiCode] = useState<string>("KPI-01");

  const chapters = [
    { id: "cap1", num: "1", title: "Resumo Executivo & Tese Central", tag: "tese", icon: BookOpen },
    { id: "cap2", num: "2", title: "Diagnóstico de Mercado & Oportunidade", tag: "mercado", icon: TrendingUp },
    { id: "cap3", num: "3", title: "O MVP: Leitura Inteligente de Escalas", tag: "mvp", icon: Zap },
    { id: "cap4", num: "4", title: "Modelo de Negócio, Pricing & Unit Economics", tag: "negocio", icon: DollarSign },
    { id: "cap5", num: "5", title: "Além da Escala: Estruturação de KPIs & Futuro", tag: "kpis", icon: Activity },
    { id: "cap6", num: "6", title: "Mapeamento de Personas & Ecossistema", tag: "personas", icon: Users },
    { id: "cap7", num: "7", title: "Arquitetura Técnica, IA & Segurança", tag: "engenharia", icon: Layers },
    { id: "cap8", num: "8", title: "Plano de Reúso (ElevaLaudo -> Plantão360)", tag: "engenharia", icon: Sparkles },
    { id: "cap9", num: "9", title: "Matriz de Riscos Críticos & Mitigações", tag: "riscos", icon: AlertTriangle },
    { id: "cap10", num: "10", title: "Roteiro Estratégico em 4 Fases (Roadmap)", tag: "estrategia", icon: Calendar }
  ];

  const handleCopyMarkdown = () => {
    const dateStr = new Date().toLocaleDateString("pt-BR");
    const fullText = `# PLANTÃO 360° — TESE COMPLETA DE PRODUTO, MODELO DE NEGÓCIO & ENGENHARIA
Versão Oficial 1.0 · Data: ${dateStr}

## 1. RESUMO EXECUTIVO & TESE DE PRODUTO
O Plantão360° é uma plataforma multiplataforma (Mobile App + Web App) centrada na vida e rotina do médico plantonista.
Princípio Soberano: Não-Sequestro de Agenda. O médico mantém autonomia total para aceitar, adaptar ou recusar turnos sugeridos.

## 2. O MERCADO
Mais de 550.000 médicos ativos no Brasil. R$ 60 bilhões/ano transacionados em plantões. Perdas de 8% a 15% em remuneração médica por glosas e desorganização.

## 3. MODELO DE NEGÓCIO
- Plantonista Free: Visualização de escalas, gaveta básica. Entrada viral.
- Plantonista Pro: R$ 39,90/mês. Conciliação financeira automática de repasses vs. plantões, gaveta ilimitada, integração com contabilidade.
- Coordenador / Grupo Médico: R$ 690,00/mês. Upload de planilhas de sempre, resolução de conflitos, disparo de escalas personalizadas.
- Hospital Enterprise: R$ 3.490,00+/mês. Painel de KPIs clínicos e operacionais em tempo real, predição de furos de escala.

## 4. ALÉM DA LEITURA DE ESCALAS: KPIS & POSSIBILIDADES FUTURAS
1. Leitura e Estruturação de KPIs: Taxa de Cobertura de Escala (Fill Rate), detecção de furos com antecedência, distribuição de turnos e horas trabalhadas.
2. Alerta e Prevenção de Furos: Identificação antecipada de turnos descobertos para convocação de plantonistas do próprio serviço sem caos no WhatsApp.
3. Conciliação Pessoal de Plantões: Comparação autônoma do que o médico trabalhou vs demonstrativo do hospital/grupo para contestação de divergências.
4. Gaveta Digital de Documentos: Validação e alertas de vencimento de CRM, RQE e certidões éticas para garantia de conformidade contínua.`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedKpi = useMemo(() => {
    return EXPANSION_KPIS_DATA.find(k => k.codigo === selectedKpiCode) || EXPANSION_KPIS_DATA[0];
  }, [selectedKpiCode]);

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-blue-950/40 via-[#151518] to-slate-900/60 border border-blue-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Documento Estratégico Oficial
              </span>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-0.5 rounded font-mono font-medium">
                Versão 1.0 · Aprovada
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Tempo estimado de leitura: ~12 min
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tese Completa de Produto, Modelo de Negócio & Engenharia
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              O documento executivo integral do <strong>Plantão360°</strong>: posicionamento centrado no médico, modelo de monetização B2C e B2B SaaS, viabilidade técnica de importação de escalas, e o ecossistema de <strong>estruturação de KPIs e inteligência preditiva hospitalar</strong>.
            </p>
          </div>

          {/* ACTION BUTTONS TOOLBAR */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
              title="Copiar texto formatado em Markdown"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copiar Tese (MD)</span>
                </>
              )}
            </button>

            <button
              onClick={() => downloadThesisMarkdown({ decisions, mvpComplexityText })}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95"
              title="Baixar arquivo Markdown"
            >
              <FileDown className="w-4 h-4" />
              <span>Baixar .MD</span>
            </button>

            <button
              onClick={() => downloadThesisFullPDF({ decisions, mvpComplexityText })}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/20 cursor-pointer active:scale-95"
              title="Exportar PDF Oficial Completo"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PDF Oficial</span>
            </button>

            <button
              onClick={() => exportDecisionsCSV(decisions, mvpComplexityText)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95"
              title="Baixar Histórico de Decisões do Fundador em CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Decisões (.CSV)</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
              title="Imprimir / Salvar nativamente como PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QUICK SEARCH & CHAPTER FILTER */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar termos na tese (ex: KPI, B2C, glosa, OCR)..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-slate-500" />
              Filtro:
            </span>
            {[
              { id: "todos", label: "Todos os Capítulos" },
              { id: "negocio", label: "Modelo de Negócio" },
              { id: "kpis", label: "Além da Escala & KPIs" },
              { id: "mvp", label: "MVP & IA" },
              { id: "engenharia", label: "Engenharia" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedTag(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTag === f.id
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN DOCUMENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* TABLE OF CONTENTS SIDEBAR */}
        <div className="lg:col-span-4 bg-[#151518] border border-slate-800 rounded-2xl p-4 sticky top-24 space-y-3">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Índice de Capítulos
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">10 Seções</span>
          </div>

          <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
            {chapters.map((ch) => {
              const Icon = ch.icon;
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapter(ch.id);
                    const element = document.getElementById(ch.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition cursor-pointer ${
                    isActive
                      ? "bg-blue-600/15 text-blue-400 font-bold border border-blue-500/30 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] shrink-0 ${
                      isActive ? "bg-blue-600 text-white font-bold" : "bg-slate-800 text-slate-400"
                    }`}>
                      {ch.num}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-blue-400" : "text-slate-600"}`} />
                </button>
              );
            })}
          </nav>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaque da Versão</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Capítulo 5 detalha minuciosamente todas as <strong>possibilidades de expansão além da leitura de escalas</strong>, incluindo a estruturação de KPIs, motor preditivo de cobertura e FinTech médica.
            </p>
          </div>
        </div>

        {/* DOCUMENT CONTENT STREAM */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* CAPÍTULO 1 */}
          <section id="cap1" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  1
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Resumo Executivo & Tese Central</h2>
                  <p className="text-xs text-slate-400">O posicionamento do Plantão360 e o princípio da soberania da agenda médica</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-semibold">
                Tese Core
              </span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
              <p>
                O <strong>Plantão360°</strong> foi concebido para resolver uma das dores mais crônicas e custosas da saúde no Brasil: a desarticulação completa entre o <strong>médico plantonista</strong>, suas fontes pagadoras (hospitais, cooperativas, grupos de anestesia/pediatria) e as escalas de atendimento de emergência e UTI.
              </p>

              <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  O Princípio Soberano: Não-Sequestro de Agenda
                </h4>
                <p className="text-xs text-slate-300">
                  A imensa maioria dos sistemas hospitalares tradicionais (ERPs corporativos) fracassa na ponta médica porque tenta <em>sequestrar a agenda do médico</em>, obrigando-o a preencher telas burocráticas ou aceitar ordens unilaterais. No <strong>Plantão360</strong>, o médico mantém <strong>autonomia total</strong>: ele recebe sugestões de escala estruturadas pela IA e escolhe livremente com 1 clique o que incorporar, adaptar valores negociados ou dispensar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white block">1. Organização de Agenda</span>
                  <p className="text-[11px] text-slate-400">Importação estruturada da planilha de sempre enviada pelo gestor hospitalar.</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white block">2. Conciliação Financeira</span>
                  <p className="text-[11px] text-slate-400">Controle rigoroso de repasses pagos vs. previstos, apontando divergências e glosas.</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white block">3. Gaveta Digital</span>
                  <p className="text-[11px] text-slate-400">Armazenamento em nuvem com alerta preventivo de expiração de CRM, RQE e seguros.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CAPÍTULO 2 */}
          <section id="cap2" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  2
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Diagnóstico de Mercado & Tamanho da Oportunidade</h2>
                  <p className="text-xs text-slate-400">Dados demográficos, volume financeiro e análise de dores crônicas</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                R$ 60 Bi/Ano
              </span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono block">550k+</span>
                  <span className="text-[11px] text-slate-400">Médicos ativos no Brasil</span>
                </div>
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono block">80%</span>
                  <span className="text-[11px] text-slate-400">Fazem plantão regular</span>
                </div>
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-purple-400 font-mono block">2M+</span>
                  <span className="text-[11px] text-slate-400">Plantões realizados/mês</span>
                </div>
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono block">8-15%</span>
                  <span className="text-[11px] text-slate-400">Perda financeira por glosas</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white pt-2">O Caos Atual: A Síndrome da Escala em WhatsApp</h3>
              <p>
                Hoje, mais de 78% dos hospitais privados e públicos no Brasil ainda coordenam escalas através de conversas fragmentadas no WhatsApp e planilhas de Excel sem versionamento. Isso resulta em três desastres diários:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                <li>
                  <strong>Para o Médico:</strong> Desconhecimento de quanto realmente tem a receber no fim do mês; bitributação involuntária e ausência de conciliação de horas extras e feriados trabalhados.
                </li>
                <li>
                  <strong>Para o Coordenador:</strong> Gasto médio de 15 a 25 horas mensais montando planilhas manuais e caçando desesperadamente plantonistas substitutos no domingo à noite.
                </li>
                <li>
                  <strong>Para o Hospital:</strong> Risco ético e assistencial severo por plantões descobertos, fechamento de leitos de UTI e passivos trabalhistas decorrentes de fadiga por jornadas dobradas sem controle.
                </li>
              </ul>
            </div>
          </section>

          {/* CAPÍTULO 3 */}
          <section id="cap3" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  3
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">O MVP: Leitura Inteligente de Escalas (Core Engine)</h2>
                  <p className="text-xs text-slate-400">Arquitetura de processamento sem atrito: do Excel do gestor à agenda do médico</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-semibold">
                MVP Focado
              </span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
              <p>
                A genialidade do MVP do Plantão360 consiste em <strong>não exigir que o gestor mude sua rotina</strong>. O gestor continua criando sua planilha no Excel como sempre fez há anos. A inteligência artificial assume o trabalho pesado de interpretação e normalização.
              </p>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Etapas do Pipeline de Processamento (Reúso do ElevaLaudo)
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white">Ingestão Polimórfica:</strong> Coordenador arrasta arquivo XLSX, CSV ou PDF de escala de qualquer hospital.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white">Parsing Semântico Multimodal:</strong> A IA identifica entidades médicas (nomes, CRMs, turnos de 12h/24h, setores como UTI e PS, e valores de honorários).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white">Validação Determinística & HITL:</strong> O sistema checa conflitos de agenda (ex: mesmo médico em dois lugares na mesma hora) e exibe o espelho lado a lado (Side-by-Side) para aprovação em 1 clique.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-white">Entrega Estruturada ao Médico:</strong> Cada médico recebe apenas seus turnos no celular e no web app, sem planilhas gigantes de 100 linhas.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CAPÍTULO 4 - MODELO DE NEGÓCIO */}
          <section id="cap4" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 font-mono text-sm font-bold flex items-center justify-center border border-emerald-500/30">
                  4
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Modelo de Negócio Completo, Tiers de Preço & Unit Economics</h2>
                  <p className="text-xs text-slate-400">Estratégia híbrida de Product-Led Growth (B2C) com Land & Expand corporativo (B2B SaaS)</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                Monetização & SaaS
              </span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-6 leading-relaxed">
              <p>
                O modelo de negócios do Plantão360 baseia-se na virilidade da comunidade médica. O médico entra gratuitamente para visualizar suas escalas e rapidamente converte para o plano <strong>Pro</strong> pelo valor evidente de conciliação financeira e controle de glosas. A concentração de médicos Pro em um hospital abre as portas para a venda corporativa B2B.
              </p>

              {/* PRICING TIERS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                {BUSINESS_MODEL_DATA.tiers.map((tier, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 ${
                      tier.destaque 
                        ? "bg-gradient-to-b from-blue-950/40 to-[#18181c] border-blue-500/50 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/30" 
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-white">{tier.nome}</span>
                        {tier.destaque && (
                          <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Mais Popular
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-white font-mono">{tier.preco}</span>
                        <span className="text-xs text-slate-400">{tier.cobranca}</span>
                      </div>

                      <div className="text-[11px] text-blue-400 font-medium">
                        Alvo: {tier.publico}
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] text-slate-400 italic">
                        <strong>Retorno percebido:</strong> {tier.valorPercebido}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* UNIT ECONOMICS TABLE */}
              <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 not-prose">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Métricas de Eficiência Financeira & Unit Economics
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                    Margem Bruta: 88%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">CAC B2C (Médico)</span>
                    <strong className="text-white font-mono text-sm">R$ 45 - R$ 75</strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">LTV B2C</span>
                    <strong className="text-emerald-400 font-mono text-sm">R$ 720 - R$ 1.180</strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">Payback B2C</span>
                    <strong className="text-blue-400 font-mono text-sm">1,5 a 2 meses</strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">Churn Mensal</span>
                    <strong className="text-purple-400 font-mono text-sm">&lt; 1,8%</strong>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl text-xs text-slate-300">
                  <strong>Por que o médico converte com facilidade para o Pro?</strong> No Brasil, um único plantão médico de 12h varia entre R$ 1.200 e R$ 2.500. Se a conciliação do Plantão360 identificar uma única falta de repasse hospitalar não computada no ano todo, a assinatura de R$ 39,90/mês se paga por quase três anos inteiros (ROI &gt; 35x).
                </div>
              </div>
            </div>
          </section>

          {/* CAPÍTULO 5 - ALÉM DA LEITURA DE ESCALAS & KPIS (DESTAQUE MÁXIMO) */}
          <section id="cap5" className="bg-[#151518] border-2 border-blue-500/40 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28 shadow-xl shadow-blue-500/5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-sm font-bold flex items-center justify-center shadow-lg shadow-blue-600/30">
                  5
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Além da Leitura de Escalas: Estruturação de KPIs & Futuro
                    <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                      Chave da Tese
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">Como transformar dados brutos em inteligência executiva hospitalar, predição e FinTech</p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-6 leading-relaxed">
              <div className="p-4 bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-900 border border-blue-500/30 rounded-xl text-xs text-slate-200">
                <strong className="text-blue-400 font-bold block mb-1">A Visão de Longo Prazo do Plantão360:</strong>
                A leitura e extração de planilhas de escala é a âncora de entrada (*wedge*). O valor transformador da empresa para investidores e hospitais está no que acontece <em>depois</em>: a geração de uma camada analítica e operacional que nenhum prontuário eletrônico (Tasy, MV, Epimed) consegue entregar.
              </div>

              {/* AS 4 GRANDES OPORTUNIDADES ALÉM DA LEITURA */}
              <h3 className="text-sm font-bold text-white pt-2">1. Os Quatro Pilares de Expansão Pós-Escala</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                {EXPANSION_OPPORTUNITIES.map((opp, oIdx) => (
                  <div key={oIdx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-blue-400 block">{opp.titulo}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{opp.resumo}</p>
                    <div className="text-[11px] text-emerald-400 pt-1">
                      <strong>Fosso Competitivo:</strong> {opp.vantagemCompetitiva}
                    </div>
                  </div>
                ))}
              </div>

              {/* CATÁLOGO INTERATIVO DE KPIS HOSPITALARES */}
              <h3 className="text-sm font-bold text-white pt-4">2. Catálogo Estruturado de KPIs Operacionais, Clínicos e Financeiros</h3>
              <p className="text-xs text-slate-400">
                Clique nos indicadores abaixo para inspecionar a fórmula de cálculo matemático, o benchmark ideal de mercado e o gatilho automático de IA disparado pelo sistema:
              </p>

              {/* KPI SELECTOR BUTTONS */}
              <div className="flex flex-wrap gap-2 not-prose">
                {EXPANSION_KPIS_DATA.map(kpi => (
                  <button
                    key={kpi.codigo}
                    onClick={() => setSelectedKpiCode(kpi.codigo)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      selectedKpiCode === kpi.codigo
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400"
                        : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
                    }`}
                  >
                    <span>{kpi.codigo}</span>
                    <span className="hidden sm:inline font-sans font-medium text-[11px]">· {kpi.nome.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* ACTIVE KPI CARD DETAIL */}
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-blue-500/30 space-y-4 not-prose shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 font-mono text-xs font-bold rounded border border-blue-500/30">
                      {selectedKpi.codigo}
                    </span>
                    <h4 className="text-sm font-bold text-white">{selectedKpi.nome}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      Categoria: {selectedKpi.categoria}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded font-mono">
                      Meta: {selectedKpi.metaBenchmark}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Fórmula de Cálculo:</span>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 font-mono text-slate-200">
                      {selectedKpi.formula}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Fonte Primária de Dados:</span>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 text-slate-300">
                      {selectedKpi.fonteDados}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Impacto para a Diretoria Hospitalar:</span>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                      {selectedKpi.impactoExecutivo}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-blue-400 font-mono uppercase font-bold">Ação Proativa do Plantão360 (Gatilho IA):</span>
                    <p className="text-slate-200 leading-relaxed bg-blue-950/30 p-2.5 rounded-lg border border-blue-500/20">
                      {selectedKpi.acaoAutomatica}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONCILIAÇÃO PESSOAL DE REPASSES */}
              <h3 className="text-sm font-bold text-white pt-4">3. Conciliação Pessoal de Plantões e Repasses</h3>
              <p>
                O médico plantonista frequentemente atua em múltiplos serviços hospitalares e enfrenta dificuldades para saber se todos os plantões realizados foram devidamente faturados e repassados.
              </p>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Mecanismo de Conciliação Transparente:
                </div>
                <p className="text-slate-300">
                  O Plantão360 cruza os plantões confirmados na agenda do médico com o demonstrativo emitido pelo hospital ou grupo de escala. O sistema aponta com clareza eventuais divergências de valor ou turnos não contabilizados, gerando um resumo didático para alinhamento amigável com a administração.
                </p>
              </div>
            </div>
          </section>

          {/* CAPÍTULO 6 - PERSONAS */}
          <section id="cap6" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  6
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Mapeamento de Personas & Ecossistema de Usuários</h2>
                  <p className="text-xs text-slate-400">Análise de atores, motivações, dores e valor gerado</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {USER_ECOSYSTEM.map((user, uIdx) => (
                <div key={uIdx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{user.perfil}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      user.prioridade === "Alta" 
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {user.prioridade} Prioridade
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <strong>Papel:</strong> {user.papel}
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-400">Dor:</strong> {user.dorPrincipal}
                  </div>

                  <div className="text-xs text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/15">
                    <strong>Benefício:</strong> {user.beneficio}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CAPÍTULO 7 - ARQUITETURA TÉCNICA */}
          <section id="cap7" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  7
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Arquitetura Técnica, IA & Segurança LGPD</h2>
                  <p className="text-xs text-slate-400">Stack de engenharia, isolamento de dados e conformidade regulatória CFM</p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
              <p>
                A arquitetura foi estruturada para ser <strong>leve, de alta densidade e resiliente</strong>, utilizando tecnologias modernas que garantem tempo de resposta sub-segundo e disponibilidade de 99,9%:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs not-prose">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-blue-400" />
                    Frontend & Experiência
                  </span>
                  <p className="text-slate-400">React 19 + TypeScript + Tailwind CSS com tema Bento Grid em Dark Mode, garantindo leitura rápida sob iluminação de UTI.</p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Motor de Inteligência (Gemini 2.5)
                  </span>
                  <p className="text-slate-400">IA multimodal com processamento zero-shot de tabelas complexas, normalização de datas e detecção semântica de especialidades.</p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Segurança & LGPD
                  </span>
                  <p className="text-slate-400">Criptografia em repouso (AES-256) e em trânsito (TLS 1.3), anonimização de dados sensíveis e auditoria de logs com carimbo de tempo.</p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    PWA & Sincronização
                  </span>
                  <p className="text-slate-400">Progressive Web App com suporte offline temporário para consultas rápidas em áreas do hospital sem sinal de celular.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CAPÍTULO 8 - REUSO ELEVALAUDO */}
          <section id="cap8" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-sm font-bold flex items-center justify-center border border-blue-500/30">
                  8
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Plano de Reúso de Ativos (ElevaLaudo &rarr; Plantão360)</h2>
                  <p className="text-xs text-slate-400">Aceleração de 70% no time-to-market aproveitando componentes maduros</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {REAP_PLAN.map((item, rIdx) => (
                <div key={rIdx} className="p-3.5 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-white block">{item.elemento}</span>
                    <p className="text-xs text-slate-400">{item.motivo}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase shrink-0 w-fit ${
                    item.reutilizacao === "Direta" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}>
                    Reúso {item.reutilizacao}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* CAPÍTULO 9 - RISCOS & MITIGAÇÕES */}
          <section id="cap9" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-rose-600/20 text-rose-400 font-mono text-sm font-bold flex items-center justify-center border border-rose-500/30">
                  9
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Matriz de Riscos Críticos & Diretrizes de Mitigação</h2>
                  <p className="text-xs text-slate-400">Blindagem jurídica, operacional e reputacional do produto</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {RISK_ASSESSMENT.map((risk, rIdx) => (
                <div key={rIdx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-bold text-xs text-rose-300">{risk.risco}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded w-fit">
                      Impacto: {risk.impacto} · Probabilidade: {risk.probabilidade}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Alerta:</strong> {risk.alerta}
                  </p>

                  <div className="text-xs text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/15">
                    <strong>Estratégia de Mitigação:</strong> {risk.mitigacao}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CAPÍTULO 10 - ROADMAP EM 4 FASES */}
          <section id="cap10" className="bg-[#151518] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 font-mono text-sm font-bold flex items-center justify-center border border-purple-500/30">
                  10
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">Roteiro Estratégico em 4 Fases (Roadmap)</h2>
                  <p className="text-xs text-slate-400">Do MVP ao ecossistema hospitalar e FinTech médica</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 uppercase font-semibold">
                Execução
              </span>
            </div>

            <div className="relative pl-6 space-y-6 border-l-2 border-slate-800">
              
              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-blue-500 absolute -left-[31px] top-1 ring-4 ring-[#151518]"></span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">Fase 1: MVP Core (Meses 1-3)</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono font-bold">Atual</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Importação e parsing inteligente de escalas Excel/PDF, interface mobile e web do médico, e gaveta digital de CRM. Validação com 300 médicos plantonistas.
                  </p>
                </div>
              </div>

              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-emerald-500 absolute -left-[31px] top-1 ring-4 ring-[#151518]"></span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">Fase 2: Conciliação Financeira & B2C Pro (Meses 4-6)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Lançamento do plano Pro (R$ 39,90/mês) com conciliação automática de repasses vs. plantões, identificação de glosas, exportação contábil para Livro-Caixa e alertas fiscais.
                  </p>
                </div>
              </div>

              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-purple-500 absolute -left-[31px] top-1 ring-4 ring-[#151518]"></span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">Fase 3: B2B Enterprise & Catálogo de KPIs (Meses 7-12)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Portal do Coordenador Clínico com painel de KPIs (Fill Rate, Turnover, Custo Efetivo da Hora Médica) e motor preditivo de substitutos para turnos sob risco de furo.
                  </p>
                </div>
              </div>

              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-amber-500 absolute -left-[31px] top-1 ring-4 ring-[#151518]"></span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">Fase 4: Inteligência de Escala & Indicadores Hospitalares (Meses 10+)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Consolidação do ecossistema hospitalar conectado: auditoria de faturamento de horas de plantão, prevenção de furos e monitoramento contínuo de conformidade ética e regulatória (CRM/RQE).
                  </p>
                </div>
              </div>

            </div>

            {/* CALL TO ACTION AT THE END OF DOCUMENT */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 via-slate-900 to-slate-900 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">Pronto para exportar o documento para a diretoria?</h4>
                <p className="text-xs text-slate-400">Baixe o documento completo em PDF oficial diagramado ou em arquivo Markdown para uso em Notion/Docs.</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => downloadThesisFullPDF({ decisions, mvpComplexityText })}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/20 cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar PDF Completo</span>
                </button>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
};
