import { useState, useMemo } from "react";
import { 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  FileText, 
  CheckCircle, 
  CheckCircle2, 
  AlertTriangle, 
  LayoutGrid, 
  User, 
  Users, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Upload, 
  Eye, 
  Share2, 
  HelpCircle, 
  Activity, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Play, 
  Check, 
  Lock, 
  RefreshCw, 
  FileDown, 
  Clock, 
  Sparkles,
  Award,
  BarChart3,
  Palette,
  Download,
  FileCheck2,
  Code,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  INITIAL_OPPORTUNITIES, 
  REFERENCE_MODEL, 
  TRANSLATION_MODEL, 
  STRATEGIC_DIRECTIONS, 
  USER_ECOSYSTEM, 
  ARCHITECTURE_MODULES, 
  REAP_PLAN, 
  RISK_ASSESSMENT, 
  DECISION_QUESTIONS,
  Opportunity,
  DecisionQuestion
} from "./data";
import { generateStrategicReport } from "./utils/pdfGenerator";
import { 
  downloadThesisFullPDF, 
  downloadThesisMarkdown, 
  downloadThesisJSON,
  exportDecisionsCSV
} from "./utils/thesisExporter";
import { DownloadThesisModal } from "./components/DownloadThesisModal";
import { ExecutiveDashboard } from "./components/ExecutiveDashboard";
import { BrandSystemView } from "./components/BrandSystemView";
import { DoctorPortalSection } from "./components/DoctorPortalSection";
import { FullThesisDocumentView } from "./components/FullThesisDocumentView";

export default function App() {
  // Navigation tabs matching the required sections
  const [activeTab, setActiveTab] = useState<string>("visao-geral");
  const [prevTab, setPrevTab] = useState<string>("visao-geral");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  const tabOrder = [
    "visao-geral",
    "documento-tese",
    "dashboard-executivo",
    "brand-system",
    "referencias",
    "simulador",
    "mvp",
    "arquitetura",
    "decisoes",
    "riscos"
  ];

  const handleTabChange = (newTab: string) => {
    setPrevTab(activeTab);
    setActiveTab(newTab);
  };

  const activeIndex = tabOrder.indexOf(activeTab);
  const prevIndex = tabOrder.indexOf(prevTab);
  const slideDirection = activeIndex >= prevIndex ? 1 : -1;

  // Framer motion variants for smooth responsive slide-in transitions
  const tabVariants = {
    enter: (dir: number) => ({
      x: dir * 40,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (dir: number) => ({
      x: dir * -40,
      opacity: 0,
      filter: "blur(4px)"
    })
  };

  const tabTransition = {
    x: { type: "spring", stiffness: 320, damping: 32 },
    opacity: { duration: 0.25 },
    filter: { duration: 0.2 }
  };

  // Dynamic state for interactive opportunity simulator
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>("opp_1");

  // Dynamic state for founder decision polling
  const [decisions, setDecisions] = useState<DecisionQuestion[]>(DECISION_QUESTIONS);

  // Search and filters for architecture modules
  const [moduleSearch, setModuleSearch] = useState<string>("");
  const [moduleFilter, setModuleFilter] = useState<string>("todos"); // todos, critica, media, opcional

  // State for step-by-step interactive MVP mock workflow
  const [mvpStep, setMvpStep] = useState<number>(1);
  const [demoSelectedFile, setDemoSelectedFile] = useState<string>("escala_traumatologia_julho.xlsx");
  const [demoAiLogs, setDemoAiLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [demoEditValues, setDemoEditValues] = useState({
    medico1: "Dr. Lucas Ramos",
    medico2: "Dra. Ana Beatriz",
    valor1: "R$ 1.800",
    valor2: "R$ 1.500"
  });
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // Calculate dynamic priorities based on formula:
  // Priority = Value + Frequency + Revenue + Ease + Advantage + Reap - Risk
  const calculatedOpportunities = useMemo(() => {
    return opportunities.map(opp => {
      const priority = opp.value + opp.frequency + opp.revenue + opp.ease + opp.advantage + opp.reap - opp.risk;
      return { ...opp, priority };
    }).sort((a, b) => b.priority - a.priority);
  }, [opportunities]);

  // Update simulator values
  const handleScoreChange = (id: string, field: keyof Opportunity, val: number) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === id) {
        return { ...opp, [field]: val };
      }
      return opp;
    }));
  };

  // Reset simulator to defaults
  const resetSimulator = () => {
    setOpportunities(INITIAL_OPPORTUNITIES);
  };

  // Handle founder decision selection
  const selectDecisionOption = (questionId: string, val: string) => {
    setDecisions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, selected: val };
      }
      return q;
    }));
  };

  const [csvDownloaded, setCsvDownloaded] = useState<boolean>(false);

  const handleExportCSV = () => {
    exportDecisionsCSV(decisions, mvpComplexity.text);
    setCsvDownloaded(true);
    setTimeout(() => {
      setCsvDownloaded(false);
    }, 4500);
  };

  // Compute aggregate MVP complexity based on decisions
  const mvpComplexity = useMemo(() => {
    let score = 0;
    decisions.forEach(q => {
      if (q.selected === "B2C" || q.selected === "WHATSAPP" || q.selected === "FULL_API" || q.selected === "NATIVE_APP") {
        score += 3; // high complexity
      } else if (q.selected === "HIBRIDO" || q.selected === "RO_VIEW" || q.selected === "SILENT") {
        score += 2; // moderate
      } else {
        score += 1; // simple
      }
    });

    if (score <= 6) return { text: "Baixa e Segura (Ideal para MVP)", color: "text-[#72F29A] bg-[#72F29A]/10 border-[#72F29A]/30", val: 30 };
    if (score <= 10) return { text: "Moderada e Viável", color: "text-[#F2B857] bg-[#F2B857]/10 border-[#F2B857]/30", val: 65 };
    return { text: "Alta e Complexidade Crítica (Perigo de Escopo Excessivo)", color: "text-[#ED5380] bg-[#ED5380]/10 border-[#ED5380]/30", val: 95 };
  }, [decisions]);

  // Run mock AI parsing
  const startDemoProcessing = () => {
    setIsProcessing(true);
    setDemoAiLogs([]);
    setIsPublished(false);
    
    const logs = [
      "Iniciando OCR inteligente de escala_traumatologia_julho.xlsx...",
      "Identificado formato: Matriz bidimensional de datas vs plantonistas.",
      "Análise de Padrão Semântico: Coluna 1 mapeada como 'Médico', Coluna 2 como 'Horário/Turno'.",
      "Extraído: Dr. Lucas Ramos em 12/07/2026 (Turno Noturno - 12h) - Valor base: R$ 1.800",
      "Extraído: Dra. Ana Beatriz em 13/07/2026 (Turno Diurno - 12h) - Valor base: R$ 1.500",
      "Conectando com banco de médicos: Match do CRM de Lucas Ramos (98.3%). Match de Ana Beatriz (99.1%).",
      "Varredura de conflitos: OK - Sem médicos sobrepostos no mesmo horário.",
      "Processamento concluído com sucesso. Enviado para o painel de revisão."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setDemoAiLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsProcessing(false);
          setMvpStep(3); // Go to step 3 (review)
        }
      }, (index + 1) * 600);
    });
  };

  // Filtered architectural modules
  const filteredModules = useMemo(() => {
    return ARCHITECTURE_MODULES.filter(mod => {
      const matchSearch = mod.ambiente.toLowerCase().includes(moduleSearch.toLowerCase()) || 
                          mod.funcao.toLowerCase().includes(moduleSearch.toLowerCase()) ||
                          mod.usuario.toLowerCase().includes(moduleSearch.toLowerCase());
      
      if (moduleFilter === "todos") return matchSearch;
      if (moduleFilter === "critica") return matchSearch && mod.prioridade === "Crítica";
      if (moduleFilter === "media") return matchSearch && mod.prioridade === "Média";
      if (moduleFilter === "opcional") return matchSearch && (mod.prioridade === "Opcional" || mod.prioridade === "Futura");
      return matchSearch;
    });
  }, [moduleSearch, moduleFilter]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white antialiased">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#0a0a0b]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
              <span className="text-white font-bold text-base">P</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-xl tracking-tight text-white">Plantão<span className="text-blue-500">360</span></span>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-600/10 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-500/10">ESTRATÉGIA</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Alinhamento Estratégico, MVP & Engenharia de Produto</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleTabChange("documento-tese")}
              className={`flex items-center gap-2 font-bold text-xs py-2 px-3.5 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === "documento-tese"
                  ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30"
                  : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-700 shadow-sm"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Documento Escrito da Tese</span>
            </button>

            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>Baixar Tese Completa</span>
            </button>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono bg-[#151518] p-2 py-1.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>10/07/2026</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-green-500">
                <span>SaaS B2B Hospitalar</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-slate-300">
                <span>Ref: ElevaLaudo</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* SUB-HEADER APP PREVIEW */}
      <div className="bg-slate-900/30 border-b border-slate-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs text-slate-300 font-sans">
              <strong>Ref Visual:</strong> Bento Grid Theme · Azul Cobalto · Alta Densidade · Desktop-First
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Usuário Logado:</span>
            <span className="text-blue-400 font-mono bg-blue-600/10 px-2 py-0.5 rounded border border-blue-500/10">medfinance360@gmail.com</span>
          </div>
        </div>
      </div>

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        
        {/* SIDE NAVIGATION */}
        <aside className="lg:col-span-1 flex flex-col gap-4 bg-[#151518] border border-slate-800 rounded-2xl p-5 h-fit">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-3">Geral</div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans px-3">
              Explore a tese do <strong>Plantão360</strong>, simule a priorização e teste o fluxo interativo do MVP.
            </p>
          </div>

          <nav className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-3 font-mono">Modos</div>
            
            <button
              onClick={() => handleTabChange("visao-geral")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "visao-geral"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>1. Resumo & Tese</span>
            </button>

            <button
              onClick={() => handleTabChange("documento-tese")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "documento-tese"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold shadow-lg shadow-blue-500/10"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
                <span>2. Tese Escrita & KPIs</span>
              </div>
              <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                Completo
              </span>
            </button>

            <button
              onClick={() => handleTabChange("dashboard-executivo")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "dashboard-executivo"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0 text-blue-400" />
              <span>3. Dashboard Executivo</span>
            </button>

            <button
              onClick={() => handleTabChange("brand-system")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "brand-system"
                  ? "bg-blue-600/10 text-[#0A84FF] border border-[#0A84FF]/30 shadow-lg shadow-[#0A84FF]/10 font-bold"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Palette className="w-4 h-4 shrink-0 text-[#0A84FF]" />
              <span>3. Brand System V1.0</span>
            </button>

            <button
              onClick={() => handleTabChange("referencias")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "referencias"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>4. Referências & Tradução</span>
            </button>

            <button
              onClick={() => handleTabChange("simulador")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "simulador"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>5. Matriz & Simulador</span>
            </button>

            <button
              onClick={() => handleTabChange("mvp")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "mvp"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>6. MVP & Fluxo Interativo</span>
            </button>

            <button
              onClick={() => handleTabChange("arquitetura")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "arquitetura"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>7. Arquitetura de Módulos</span>
            </button>

            <button
              onClick={() => handleTabChange("decisoes")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "decisoes"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>8. Decisões do Fundador</span>
            </button>

            <button
              onClick={() => handleTabChange("riscos")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                activeTab === "riscos"
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>9. Riscos & Recomendações</span>
            </button>
          </nav>

          {/* REALTIME SCORECARD SIDEBAR */}
          <div className="mt-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Complexidade do Escopo</span>
            <div className={`p-2.5 rounded-lg border text-xs font-semibold leading-relaxed ${mvpComplexity.color}`}>
              {mvpComplexity.text}
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${mvpComplexity.val}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 leading-normal">
              * Mapeado em tempo real com base no Mural de Decisões.
            </span>
          </div>

          {/* EXPORT THESIS SIDEBAR ACTION */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/30 to-[#0d0d0f] border border-blue-500/20 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-white text-xs font-bold font-sans">
              <FileDown className="w-4 h-4 text-blue-400" />
              <span>Exportar Tese Oficial</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Baixe o documento completo em PDF formatado, Markdown (.md) ou JSON de dados brutos.
            </p>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Arquivo Completo</span>
            </button>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="lg:col-span-3 flex flex-col gap-6">
          
          <AnimatePresence mode="wait">
            {/* TAB 1: VISÃO GERAL & TESE */}
            {activeTab === "visao-geral" && (
              <motion.div
                key="visao-geral"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                {/* DECISION ARTIFACT NOTICE BANNER */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3.5 items-start">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="font-sans">
                    <h4 className="text-sm font-bold text-amber-400">
                      Tese de Produto Centrada no Médico com Inteligência Progressiva de Escalas
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Este painel reflete a verdadeira essência do <strong>Plantão360°</strong>: uma plataforma multiplataforma (mobile + web app) focada na rotina do médico plantonista, expandindo-se de forma progressiva para transformar a planilha do gestor em uma importação estruturada e revisável, que o médico adapta à própria agenda.
                    </p>
                  </div>
                </div>

                {/* FULL THESIS DOCUMENT CTA CALLOUT */}
                <div className="bg-gradient-to-r from-blue-950/50 via-slate-900 to-[#151518] border border-blue-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-blue-500/5">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30 shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-sans">Documento Escrito da Tese Completa</h4>
                        <span className="bg-blue-600/20 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">Novo</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Apresentação detalhada por escrito de cada parte da tese: modelo de negócio, pricing, unit economics, e as <strong>possibilidades de expansão além da leitura de escalas (estruturação de KPIs, prevenção de furos e conciliação)</strong>.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTabChange("documento-tese")}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-blue-600/20 active:scale-95"
                  >
                    <span>Ler Documento Detalhado</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* HERO STRATEGIC BRIEF */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1c1c21] to-[#151518] border border-slate-700/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  <h1 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight mb-4 leading-tight">
                    Plantão360°: A Plataforma Multiplataforma Centrada no Médico Plantonista
                  </h1>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
                    Organizar plantões, acompanhar pagamentos, guardar documentos na gaveta digital com lembretes e ter clareza sobre a vida profissional. O web app expande o mobile e adiciona inteligência à planilha do gestor para transformar a escala em uma importação estruturada e revisável, que o médico adapta à própria agenda.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-sm">
                    <div>
                      <span className="block text-xs text-slate-400 font-mono mb-1">PROPOSTA DE VALOR</span>
                      <strong className="text-white font-sans text-sm block">Autonomia Médica & Organização Inteligente de Escalas</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-mono mb-1">PÚBLICO-ALVO</span>
                      <strong className="text-white font-sans text-sm block">Médico Plantonista (Core) & Gestor de Escalas</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-mono mb-1">MÉTRICA CHAVE MVP</span>
                      <strong className="text-blue-400 font-sans text-sm block">Escala Importada e Adaptada pelo Médico</strong>
                    </div>
                  </div>

                  {/* DIRECT THESIS DOWNLOAD BAR */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d0d0f]/80 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-5 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white font-sans">
                        Documento Oficial da Tese Disponível para Download:
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => downloadThesisFullPDF({ decisions, mvpComplexityText: mvpComplexity.text })}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        title="Baixar Relatório Executivo em PDF"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Baixar PDF</span>
                      </button>
                      <button
                        onClick={() => downloadThesisMarkdown({ decisions, mvpComplexityText: mvpComplexity.text })}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1a24] hover:bg-[#252535] border border-blue-500/30 text-blue-300 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                        title="Baixar Texto Integral em Markdown"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Baixar .MD</span>
                      </button>
                      <button
                        onClick={() => downloadThesisJSON({ decisions, mvpComplexityText: mvpComplexity.text })}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1a24] hover:bg-[#252535] border border-amber-500/30 text-amber-300 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                        title="Baixar Dados Estruturados em JSON"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Baixar .JSON</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* EXECUTIVE SUMMARY */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Resumo Executivo
                  </h2>
                  
                  <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                    <p>
                      O <strong>Plantão360</strong> nasceu para resolver a rotina individual do médico plantonista: organizar plantões, acompanhar pagamentos, guardar documentos na gaveta digital, receber lembretes de vencimento de CRM e ter clareza total sobre a própria vida profissional.
                    </p>
                    <p>
                      O web app não muda essa essência. Ele é a extensão natural do aplicativo mobile para telas maiores, oferecendo mais conforto para visualizar, organizar e revisar plantões, repasses e documentos.
                    </p>
                    <p>
                      A entrada do gestor de escala é uma expansão progressiva da mesma plataforma, mas sem transformar o Plantão360 em um sistema imposto ao médico. O gestor não precisa abandonar sua planilha habitual, e o médico não perde autonomia sobre a própria agenda.
                    </p>
                    <p>
                      O fluxo ideal funciona assim:
                      <br />
                      <strong>1.</strong> O gestor monta a escala na planilha que já utiliza.
                      <br />
                      <strong>2.</strong> Envia a planilha para o Plantão360.
                      <br />
                      <strong>3.</strong> A IA interpreta os dados por médico, data, horário e setor.
                      <br />
                      <strong>4.</strong> O sistema gera uma visualização limpa, com possíveis conflitos e inconsistências.
                      <br />
                      <strong>5.</strong> O gestor pode exportar ou compartilhar visões individuais.
                      <br />
                      <strong>6.</strong> O médico recebe uma sugestão/importação estruturada da escala e decide o que incorporar à sua própria agenda.
                    </p>
                    <p>
                      <strong>O grande diferencial</strong> é que o Plantão360 não tenta substituir o hábito do gestor nem sequestrar a agenda do médico. Ele adiciona inteligência ao processo existente e transforma uma planilha difícil de interpretar em informação organizada, revisável e útil para cada lado.
                    </p>
                  </div>
                </div>

                {/* THE SYSTEM THESIS */}
                <div className="bg-gradient-to-br from-[#1c1c21] to-[#151518] border border-slate-700/50 rounded-2xl p-6">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-2">A TESE DE PRODUTO</span>
                  <blockquote className="border-l-4 border-blue-500 pl-4 text-white text-base italic font-sans mb-4 leading-relaxed">
                    &ldquo;O Plantão360 é a plataforma multiplataforma que coloca a autonomia do médico plantonista no centro. O web app expande o app mobile para dar mais controle sobre plantões, repasses e documentos. Para gestores, adicionamos inteligência progressiva que lê a planilha que eles já usam, organiza a escala e permite distribuir visões individuais — sempre preservando o direito do médico de revisar, adaptar e personalizar sua própria agenda.&rdquo;
                  </blockquote>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-mono uppercase text-blue-400 mb-2">Para o Médico (Núcleo)</h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Organização centralizada de plantões, conciliação de recebíveis, gaveta digital de CRM e recebimento de sugestões/importações de escala com total autonomia para revisar, adaptar e personalizar sua agenda.
                      </p>
                    </div>
                    <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-mono uppercase text-green-400 mb-2">Para o Gestor (Expansão Progressiva)</h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Zero mudança de hábito: o gestor continua usando sua planilha habitual. A IA lê, organiza por médico/setor, aponta inconsistências e distribui visões individuais sem aprisionar a agenda do médico.
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: DASHBOARD EXECUTIVO */}
            {activeTab === "dashboard-executivo" && (
              <motion.div
                key="dashboard-executivo"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                <ExecutiveDashboard 
                  opportunities={opportunities} 
                  calculatedOpportunities={calculatedOpportunities} 
                  mvpComplexity={mvpComplexity} 
                />
              </motion.div>
            )}

            {/* TAB 3: BRAND SYSTEM V1.0 */}
            {activeTab === "brand-system" && (
              <motion.div
                key="brand-system"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                <BrandSystemView />
              </motion.div>
            )}

            {/* TAB 4: REFERÊNCIAS & TRADUÇÃO */}
            {activeTab === "referencias" && (
              <motion.div
                key="referencias"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-500" />
                    Leitura de Referências & Tradução de Domínio
                  </h2>
                </div>

                {/* THE SPLIT REFERENCE EXPLANATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-[#151518] border border-slate-800 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded bg-blue-500 shrink-0"></span>
                      <h3 className="font-sans font-bold text-base text-white">Visual & Sensação: Plantão360</h3>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed font-sans">
                      <li><strong>Esquema Escuro:</strong> Background dark slate (#0a0a0b) reduz a fadiga visual dos médicos em plantão noturno.</li>
                      <li><strong>Azul Cobalto:</strong> Cor de ação e foco, transmitindo sobriedade e precisão médica.</li>
                      <li><strong>Alta Densidade:</strong> Telas estruturadas para desktop contendo calendário de plantões, cards rápidos (Pago, Pendente, Agendado) e distribuições de receita.</li>
                      <li><strong>Módulo de Gaveta Digital:</strong> Repositório intuitivo com pastas para certidões e CRMs.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#151518] border border-slate-800 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <span className="w-2.5 h-2.5 rounded bg-green-500 shrink-0"></span>
                      <h3 className="font-sans font-bold text-base text-white">Lógica & Engenharia: ElevaLaudo</h3>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed font-sans">
                      <li><strong>Upload e Status Assíncronos:</strong> Backend preparado para processar arquivos extensos sem travar a interface.</li>
                      <li><strong>Mapeador Inteligente via IA:</strong> Leitura e conversão de textos de relatórios brutos em schemas JSON limpos.</li>
                      <li><strong>Painel de Validação Side-by-Side:</strong> Human-in-the-Loop para o engenheiro (agora o gestor) revisar falhas e assinar.</li>
                      <li><strong>Organização e Multitenancy:</strong> Dados separados de forma segura por organizações parceiras.</li>
                    </ul>
                  </div>
                </div>

                {/* REAPING TABLE */}
                <div className="p-5 rounded-2xl bg-blue-600/5 border border-blue-500/20 text-xs">
                  <h4 className="font-sans font-semibold text-white mb-2">O que usar de cada um (Como não misturar)</h4>
                  <p className="text-slate-400 leading-normal mb-3">
                    O Plantão360 deve usar a excelente base técnica do ElevaLaudo para upload, fila e revisão do JSON extraído, mas a interface deve reter toda a sofisticação da marca Plantão360: o azul cobalto no lugar do verde, a densidade visual e o foco no faturamento e calendário médico.
                  </p>
                </div>

                {/* TABLE 3: ELEVALAUDO MODEL */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans font-bold text-base text-white">O Modelo Funcional do ElevaLaudo</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#151518] text-slate-400 font-mono border-b border-slate-800">
                          <th className="p-3.5">Etapa</th>
                          <th className="p-3.5">Entrada</th>
                          <th className="p-3.5">Ação do Sistema</th>
                          <th className="p-3.5">Papel da IA</th>
                          <th className="p-3.5">Revisão Humana</th>
                          <th className="p-3.5">Saída</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#0d0d0f]/60 font-sans">
                        {REFERENCE_MODEL.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/40 text-slate-300">
                            <td className="p-3.5 font-semibold text-white">{row.etapa}</td>
                            <td className="p-3.5 max-w-[150px] truncate" title={row.entrada}>{row.entrada}</td>
                            <td className="p-3.5 max-w-[200px] truncate" title={row.acaoSistema}>{row.acaoSistema}</td>
                            <td className="p-3.5 text-blue-400 font-medium">{row.papelIA}</td>
                            <td className="p-3.5">{row.revisaoHumana}</td>
                            <td className="p-3.5 max-w-[150px] truncate text-green-400" title={row.saida}>{row.saida}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TABLE 4: TRANSLATION TO PLANTAO360 */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans font-bold text-base text-white">Como Traduzir o Modelo para Operações Hospitalares (Seis Aplicações Concretas)</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#151518] text-slate-400 font-mono border-b border-slate-800">
                          <th className="p-3.5">Oportunidade</th>
                          <th className="p-3.5">Usuário Primário</th>
                          <th className="p-3.5">Entrada Bruta</th>
                          <th className="p-3.5">Papel Crucial da IA</th>
                          <th className="p-3.5">Revisão Humana</th>
                          <th className="p-3.5">Saída do Sistema</th>
                          <th className="p-3.5">Valor Gerado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#0d0d0f]/60 font-sans">
                        {TRANSLATION_MODEL.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/40 text-slate-300">
                            <td className="p-3.5 font-bold text-white">{row.oportunidade}</td>
                            <td className="p-3.5 font-mono text-slate-400">{row.usuario}</td>
                            <td className="p-3.5">{row.entrada}</td>
                            <td className="p-3.5 text-blue-400">{row.papelIA}</td>
                            <td className="p-3.5 text-slate-400">{row.revisao}</td>
                            <td className="p-3.5 font-mono text-green-400">{row.saida}</td>
                            <td className="p-3.5 font-semibold text-white">{row.valor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 3: MATRIZ & SIMULADOR INTERATIVO */}
            {activeTab === "simulador" && (
              <motion.div
                key="simulador"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Simulador Interativo de Oportunidades & Priorização
                    </h2>
                    <p className="text-xs text-slate-400">
                      Modifique as notas (1 a 5) nos controles abaixo para recalcular as notas e a ordenação de prioridade baseadas na fórmula do MVP.
                    </p>
                  </div>
                  <button 
                    onClick={resetSimulator}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resetar Valores</span>
                  </button>
                </div>

                {/* THE CORE PRIORITY FORMULA BOX */}
                <div className="p-4 bg-gradient-to-r from-[#1c1c21] to-[#151518] rounded-2xl border border-slate-700/50 text-xs">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="font-mono text-slate-400 uppercase">Fórmula de Prioridade Executada:</span>
                    <span className="font-mono text-blue-400 font-bold bg-blue-600/10 px-3 py-1 rounded border border-blue-500/20">
                      Prioridade = (Valor + Frequência + Receita + Facilidade + Vantagem + Reaproveitamento) − Risco
                    </span>
                  </div>
                </div>

                {/* SIMULADOR LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* LEFT: SLIDERS CONTROL */}
                  <div className="lg:col-span-1 bg-[#151518] rounded-2xl border border-slate-800 p-6 flex flex-col gap-4">
                    <span className="text-xs font-mono uppercase text-slate-400">Controlar Notas da Oportunidade</span>
                    
                    <div className="mb-2">
                      <label className="text-xs text-slate-400 block mb-1">Selecionar Oportunidade:</label>
                      <select 
                        value={selectedOpportunity}
                        onChange={(e) => setSelectedOpportunity(e.target.value)}
                        className="w-full bg-[#0d0d0f] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        {calculatedOpportunities.map(opp => (
                          <option key={opp.id} value={opp.id}>
                            {opp.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {opportunities.filter(opp => opp.id === selectedOpportunity).map(opp => (
                      <div key={opp.id} className="flex flex-col gap-4 border-t border-slate-800 pt-4">
                        <span className="text-xs font-semibold text-blue-400">{opp.name}</span>
                        <p className="text-[11px] text-slate-400 leading-normal">{opp.description}</p>
                        
                        {/* SLIDER: VALOR */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Valor para Usuário:</span>
                            <span className="text-blue-400 font-bold">{opp.value}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.value} 
                            onChange={(e) => handleScoreChange(opp.id, "value", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: FREQUENCIA */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Frequência do Problema:</span>
                            <span className="text-blue-400 font-bold">{opp.frequency}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.frequency} 
                            onChange={(e) => handleScoreChange(opp.id, "frequency", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: RECEITA */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Potencial de Receita:</span>
                            <span className="text-blue-400 font-bold">{opp.revenue}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.revenue} 
                            onChange={(e) => handleScoreChange(opp.id, "revenue", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: FACILIDADE */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Facilidade de Implementar:</span>
                            <span className="text-blue-400 font-bold">{opp.ease}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.ease} 
                            onChange={(e) => handleScoreChange(opp.id, "ease", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: VANTAGEM */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Vantagem Competitiva:</span>
                            <span className="text-blue-400 font-bold">{opp.advantage}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.advantage} 
                            onChange={(e) => handleScoreChange(opp.id, "advantage", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: REAPROVEITAMENTO */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Reaproveitar ElevaLaudo:</span>
                            <span className="text-blue-400 font-bold">{opp.reap}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.reap} 
                            onChange={(e) => handleScoreChange(opp.id, "reap", parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* SLIDER: RISCO (Subtraído) */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono text-rose-400">
                            <span>Risco Operacional (Subtrai):</span>
                            <span className="font-bold">{opp.risk}/5</span>
                          </div>
                          <input 
                            type="range" min="1" max="5" value={opp.risk} 
                            onChange={(e) => handleScoreChange(opp.id, "risk", parseInt(e.target.value))}
                            className="w-full accent-rose-500 h-1 bg-[#0d0d0f] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* RIGHT: REALTIME PRIORITIZED LIST */}
                  <div className="lg:col-span-2 bg-[#151518] rounded-2xl border border-slate-800 p-6 flex flex-col gap-4">
                    <span className="text-xs font-mono uppercase text-slate-400">Resultados e Ranking de Prioridade</span>
                    
                    <div className="flex flex-col gap-3">
                      {calculatedOpportunities.map((opp, idx) => {
                        const isAnchor = opp.id === "opp_1";
                        const isComplementary = opp.id === "opp_2" || opp.id === "opp_3";
                        
                        return (
                          <div 
                            key={opp.id}
                            onClick={() => setSelectedOpportunity(opp.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                              selectedOpportunity === opp.id 
                                ? "bg-blue-600/5 border-blue-500/40 shadow-md shadow-blue-950/20" 
                                : "bg-[#0d0d0f] border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex items-start gap-3">
                                <span className="font-mono text-sm font-bold text-slate-500 mt-0.5">
                                  #{idx + 1}
                                </span>
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-sans font-bold text-sm text-white">
                                      {opp.name}
                                    </span>
                                    {isAnchor && (
                                      <span className="text-[9px] font-bold font-mono text-white bg-blue-600 px-1.5 py-0.5 rounded uppercase">
                                        Âncora MVP
                                      </span>
                                    )}
                                    {isComplementary && (
                                      <span className="text-[9px] font-bold font-mono text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 uppercase">
                                        Complemento
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1">
                                    Usuário: <span className="text-slate-300">{opp.user}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col items-end">
                                <span className="font-mono text-base font-extrabold text-blue-400">
                                  {opp.priority} pts
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">Score Calculado</span>
                              </div>
                            </div>

                            {/* SMALL PROGRESS BAR METRIC GRID */}
                            <div className="grid grid-cols-6 gap-1 mt-3 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                              <div className="flex flex-col">
                                <span>Valor</span>
                                <span className="text-white font-medium">{opp.value}/5</span>
                              </div>
                              <div className="flex flex-col">
                                <span>Freq.</span>
                                <span className="text-white font-medium">{opp.frequency}/5</span>
                              </div>
                              <div className="flex flex-col">
                                <span>Rec.</span>
                                <span className="text-white font-medium">{opp.revenue}/5</span>
                              </div>
                              <div className="flex flex-col">
                                <span>Fácil.</span>
                                <span className="text-white font-medium">{opp.ease}/5</span>
                              </div>
                              <div className="flex flex-col">
                                <span>Reap.</span>
                                <span className="text-white font-medium">{opp.reap}/5</span>
                              </div>
                              <div className="flex flex-col text-rose-400">
                                <span>Risco (-)</span>
                                <span className="font-medium text-rose-400">{opp.risk}/5</span>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed font-sans">
                      💡 <strong>Análise Estratégica:</strong> O <strong>Motor de Importação Inteligente de Escalas</strong> desponta isoladamente em primeiro devido ao altíssimo fator de <strong>reaproveitamento técnico do ElevaLaudo (nota 5/5)</strong> e alto valor agregado percebido, justificando plenamente sua seleção como a funcionalidade âncora do MVP do Plantão360.
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB DOCUMENTO COMPLETO DA TESE */}
            {activeTab === "documento-tese" && (
              <motion.div
                key="documento-tese"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                <FullThesisDocumentView 
                  decisions={decisions} 
                  mvpComplexityText={mvpComplexity.text}
                  onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
                />
              </motion.div>
            )}

            {activeTab === "mvp" && (
              <motion.div
                key="mvp"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                  MVP Recomendado & Simulador de Fluxo Operacional
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* SCOPE INCLUDED */}
                  <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6">
                    <span className="text-xs font-mono uppercase text-green-400 block mb-4 tracking-wider">CONTEÚDO DO MVP (Escopo Incluído)</span>
                    <ul className="space-y-4 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Funcionalidade Âncora: Importador Inteligente</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Upload de arquivos XLSX/PDF de escalas médicas, extração inteligente dos médicos, turnos, horários, e geração de calendário de rascunho de forma automática.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Complementar 1: Tela de Revisão Side-by-Side</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Interface para o gestor corrigir erros de leitura da IA, reconciliar duplicidades e conflitos de horários de plantão, e aprovar o lote.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Complementar 2: Gaveta de Documentação com OCR</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Upload e categorização de CRMs profissionais com OCR que extrai validade e alerta sobre expiração automática para garantir conformidade legal.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Portal de Visualização do Médico (Web Link)</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Visualização de calendários e valores individuais confirmados do médico via link seguro e reativo, sem onboarding burocrático de app nativo.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* SCOPE EXCLUDED */}
                  <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6">
                    <span className="text-xs font-mono uppercase text-rose-400 block mb-4 tracking-wider">FORA DO MVP (Escopo Excluído para Mitigar Riscos)</span>
                    <ul className="space-y-4 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Integração de APIs com ERPs complexos</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Evita burocracia de TI e custos monstruosos de integração com Tasy, MV, e outros legados nesta fase inicial do produto.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Sistemas complexos de trocas automáticas</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Regras de chat interativo de troca de plantão e workflows burocráticos de aceites mútuos ficam para a versão 2.0.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Aplicativo móvel nativo (iOS / Android)</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Evita desenvolvimento caro de duas plataformas adicionais e o atrito de download de apps pelos médicos plantonistas.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Automatizações completas de faturamento bancário direto</strong>
                          <p className="text-slate-400 mt-1 leading-relaxed">Pagamento bancário real com PIX/TED integrado ou split de pagamento na conta de cooperativas e médicos.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* INTERACTIVE FLOW WORKFLOW SIMULATOR */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#151518] to-[#0d0d0f] border border-blue-500/20 relative">
                  <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-400 text-[10px] font-mono px-2 py-1 rounded border border-blue-500/20 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>WORKFLOW INTERATIVO DO MVP</span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-white mb-2">
                    Simulação Interativa: O Motor de Importação na Prática
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal mb-6">
                    Acompanhe o caminho exato do processamento documental herdado do ElevaLaudo traduzido para o Plantão360. Clique nos passos abaixo para simular cada etapa do processo:
                  </p>

                  {/* WORKFLOW STEPS HEADER PROGRESS */}
                  <div className="grid grid-cols-4 gap-2 mb-8 text-xs font-mono text-center">
                    <button 
                      onClick={() => { setMvpStep(1); setIsPublished(false); }}
                      className={`p-3 rounded-lg border transition ${
                        mvpStep === 1 
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/10" 
                          : "bg-[#0d0d0f] text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <span className="block font-bold">1. UPLOAD</span>
                      <span className="text-[9px] text-slate-300">Sobe a escala XLSX</span>
                    </button>
                    
                    <button 
                      onClick={() => { if (mvpStep >= 2) setMvpStep(2); }}
                      disabled={mvpStep < 1}
                      className={`p-3 rounded-lg border transition ${
                        mvpStep === 2 
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/10" 
                          : "bg-[#0d0d0f] text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <span className="block font-bold">2. IA PARSING</span>
                      <span className="text-[9px] text-slate-300">Leitura Inteligente</span>
                    </button>

                    <button 
                      onClick={() => { if (mvpStep >= 3) setMvpStep(3); }}
                      disabled={mvpStep < 2}
                      className={`p-3 rounded-lg border transition ${
                        mvpStep === 3 
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/10" 
                          : "bg-[#0d0d0f] text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <span className="block font-bold">3. REVISÃO</span>
                      <span className="text-[9px] text-slate-300">Human-in-the-Loop</span>
                    </button>

                    <button 
                      onClick={() => { if (mvpStep >= 4) setMvpStep(4); }}
                      disabled={mvpStep < 3}
                      className={`p-3 rounded-lg border transition ${
                        mvpStep === 4 
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/10" 
                          : "bg-[#0d0d0f] text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <span className="block font-bold">4. PUBLICAR</span>
                      <span className="text-[9px] text-slate-300">Escala Publicada</span>
                    </button>
                  </div>

                  {/* WORKFLOW CONTAINER CONTENT */}
                  <div className="bg-[#0d0d0f] rounded-xl p-5 border border-slate-800 min-h-[220px] flex flex-col justify-between">
                    
                    {/* STEP 1 CONTROLS */}
                    {mvpStep === 1 && (
                      <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                        <Upload className="w-12 h-12 text-blue-500 animate-bounce" />
                        <div>
                          <p className="text-sm font-semibold text-white">Selecione uma planilha de escala para testar a IA:</p>
                          <p className="text-xs text-slate-400 mt-1">Formatos suportados: .xlsx, .csv, .pdf (layouts bagunçados de hospitais)</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setDemoSelectedFile("escala_traumatologia_julho.xlsx"); setMvpStep(2); startDemoProcessing(); }}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                          >
                            Usar escala_traumatologia_julho.xlsx
                          </button>
                          <button 
                            onClick={() => { setDemoSelectedFile("escala_clinica_medica_final.xlsx"); setMvpStep(2); startDemoProcessing(); }}
                            className="bg-slate-900/50 border border-slate-800 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                          >
                            Usar escala_clinica_medica_final.xlsx
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: PROCESSING / AI LOGGER */}
                    {mvpStep === 2 && (
                      <div className="flex flex-col gap-3 font-mono text-xs">
                        <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-800">
                          <span>Arquivo: <strong className="text-blue-400">{demoSelectedFile}</strong></span>
                          {isProcessing ? (
                            <span className="text-amber-400 flex items-center gap-1 font-sans">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Processando por IA...</span>
                            </span>
                          ) : (
                            <span className="text-green-400">✓ Processado</span>
                          )}
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded-lg h-44 overflow-y-auto space-y-1.5 text-slate-400 border border-slate-800/80">
                          {demoAiLogs.map((log, i) => (
                            <div key={i} className="flex gap-2 items-start text-[11px] leading-relaxed">
                              <span className="text-blue-500 select-none">&gt;&gt;</span>
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: HUMAN IN THE LOOP EDITING TABLE */}
                    {mvpStep === 3 && (
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                          <span className="text-xs text-slate-400 font-mono">
                            Verificação: <span className="text-green-400 font-bold">Dados Extraídos Pronto</span>
                          </span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                            REVISÃO ATIVA REQUERIDA (HUMAN-IN-THE-LOOP)
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          O parser de IA extraiu os plantões da planilha. Por favor, <strong>revise e ajuste os nomes ou valores de repasse</strong> diretamente no rascunho abaixo caso note algum desvio antes de publicar:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* INPUT Row 1 */}
                          <div className="p-3 bg-black/30 rounded-lg border border-slate-800 space-y-2">
                            <span className="text-[10px] text-slate-500 font-mono block">Plantão 1 (Ortopedia - 12/07)</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-400 font-mono block mb-1">Médico:</label>
                                <input 
                                  type="text" value={demoEditValues.medico1}
                                  onChange={(e) => setDemoEditValues(prev => ({ ...prev, medico1: e.target.value }))}
                                  className="w-full bg-[#0d0d0f] border border-slate-800 p-1.5 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-slate-400 font-mono block mb-1">Valor Unitário:</label>
                                <input 
                                  type="text" value={demoEditValues.valor1}
                                  onChange={(e) => setDemoEditValues(prev => ({ ...prev, valor1: e.target.value }))}
                                  className="w-full bg-[#0d0d0f] border border-slate-800 p-1.5 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>

                          {/* INPUT Row 2 */}
                          <div className="p-3 bg-black/30 rounded-lg border border-slate-800 space-y-2">
                            <span className="text-[10px] text-slate-500 font-mono block">Plantão 2 (Clínica Médica - 13/07)</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-400 font-mono block mb-1">Médico:</label>
                                <input 
                                  type="text" value={demoEditValues.medico2}
                                  onChange={(e) => setDemoEditValues(prev => ({ ...prev, medico2: e.target.value }))}
                                  className="w-full bg-[#0d0d0f] border border-slate-800 p-1.5 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-slate-400 font-mono block mb-1">Valor Unitário:</label>
                                <input 
                                  type="text" value={demoEditValues.valor2}
                                  onChange={(e) => setDemoEditValues(prev => ({ ...prev, valor2: e.target.value }))}
                                  className="w-full bg-[#0d0d0f] border border-slate-800 p-1.5 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="flex justify-end pt-2">
                          <button 
                            onClick={() => { setMvpStep(4); setIsPublished(true); }}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Confirmar Revisão e Publicar Escala</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: PUBLISHED SUCCESS VIEW */}
                    {mvpStep === 4 && (
                      <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Sugestão de Escala Enviada ao Portal do Médico!</p>
                          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                            O médico recebe uma importação estruturada e revisável no app. Ele mantém autonomia total para aceitar com 1 clique, ajustar valores negociados ou descartar.
                          </p>
                        </div>

                        {/* MOCKUP PREVIEW CARD ON PORTAL */}
                        <div className="w-full max-w-sm p-4 bg-black/40 border border-slate-800 rounded-xl text-left text-xs font-sans space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-blue-400 font-mono uppercase font-bold">Sugestão Disponibilizada no App:</span>
                            <span className="bg-blue-500/10 text-blue-400 text-[9px] font-mono px-1.5 py-0.5 rounded">Pendente de Aceite</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300 font-semibold border-b border-slate-800 pb-2">
                            <span>Próximo Plantão Sugerido</span>
                            <span className="text-xs font-normal text-slate-500">Julho de 2026</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="block font-bold text-white">{demoEditValues.medico1}</span>
                              <span className="text-[10px] text-slate-400">Ortopedia · 12/07 (Noturno - 12h)</span>
                            </div>
                            <span className="font-mono text-xs text-green-400 font-bold">{demoEditValues.valor1}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-800 flex gap-2">
                            <button 
                              onClick={() => handleTabChange("arquitetura")}
                              className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] rounded-lg transition cursor-pointer text-center"
                            >
                              Testar Aceite / Edição no Portal do Médico →
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => { setMvpStep(1); setIsPublished(false); }}
                          className="text-blue-400 hover:text-blue-300 hover:underline text-xs cursor-pointer"
                        >
                          Reiniciar simulação de fluxo
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 5: ARQUITETURA DE MÓDULOS */}
            {activeTab === "arquitetura" && (
              <motion.div
                key="arquitetura"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-blue-500" />
                    Arquitetura de Módulos & Ambientes do Webapp
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDownloadModalOpen(true)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer self-start sm:self-auto hover:scale-[1.02] active:scale-[0.98] font-sans"
                    >
                      <FileDown className="w-4.5 h-4.5" />
                      <span>Baixar Tese Completa (PDF / MD / JSON)</span>
                    </button>
                  </div>
                </div>

                {/* THE EXPLICIT ARCHITECTURAL TREE DIAGRAM */}
                <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 shadow-sm">
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-4">Árvore Funcional e Separação de Ambientes</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    
                    {/* AMBIENTE DO MÉDICO */}
                    <div className="bg-[#0d0d0f] rounded-xl border border-blue-500/30 p-5 space-y-3 relative group">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2 text-blue-400">
                          <User className="w-4 h-4" />
                          <h4 className="font-bold text-white">1. Portal do Médico (B2C)</h4>
                        </div>
                        <span className="bg-blue-500/10 text-blue-400 text-[9px] font-mono px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                          Núcleo do Produto
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Área individual do médico plantonista com total autonomia para receber sugestões de escalas, aceitar, editar horários/valores ou dispensar plantões, além de gaveta de CRM e controle financeiro.
                      </p>
                      <ul className="space-y-1 text-slate-300 text-[11px] list-inside list-disc">
                        <li>Início (Painel Pessoal & Autonomia)</li>
                        <li>Revisão & Aceite de Escalas Importadas</li>
                        <li>Plantões (Calendário Mensal & Avulsos)</li>
                        <li>Finanças (Repasses Previstos / Recebidos)</li>
                        <li>Gaveta Digital (Dossiê de CRM)</li>
                      </ul>
                      <div className="pt-2 border-t border-slate-800/60">
                        <a 
                          href="#doctor-portal-interactive-section"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition"
                        >
                          <span>Ver Seção Interativa abaixo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* AMBIENTE DO GESTOR */}
                    <div className="bg-[#0d0d0f] rounded-xl border border-slate-800 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-green-400 border-b border-slate-800/80 pb-2">
                        <Users className="w-4 h-4" />
                        <h4 className="font-bold text-white">2. Operação do Gestor (B2B)</h4>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">Painel gerencial focado em importar escalas brutas, cruzar dados e consolidar calendários livres de conflitos de horário.</p>
                      <ul className="space-y-1 text-slate-300 text-[11px] list-inside list-disc">
                        <li>Upload de Arquivos de Escala</li>
                        <li>Mapeador de Colunas inteligente</li>
                        <li>Painel de Revisão Humana Side-by-Side</li>
                        <li>Gestão de Equipe e Médicos</li>
                      </ul>
                    </div>

                    {/* AMBIENTE ADMINISTRATIVO */}
                    <div className="bg-[#0d0d0f] rounded-xl border border-slate-800 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800/80 pb-2">
                        <Layers className="w-4 h-4" />
                        <h4 className="font-bold text-white">3. Administração Hospitalar</h4>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">Gestão corporativa global contendo configurações multitenant, auditoria de dados e faturamento executivo.</p>
                      <ul className="space-y-1 text-slate-300 text-[11px] list-inside list-disc">
                        <li>Painel Financeiro & Auditoria</li>
                        <li>Módulo de Organizações/Filiais</li>
                        <li>Indicadores Estratégicos (BI)</li>
                        <li>Trilha imutável de Auditoria (Logs)</li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* INTERACTIVE DOCTOR PORTAL SECTION */}
                <DoctorPortalSection />

                {/* MODULE SEARCH AND FILTER */}
                <div className="bg-[#151518] rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row justify-between gap-4">
                  
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input 
                      type="text" 
                      placeholder="Buscar por módulo, função ou usuário..."
                      value={moduleSearch}
                      onChange={(e) => setModuleSearch(e.target.value)}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-400 font-mono">Filtro Prioridade:</span>
                    <div className="flex bg-[#0d0d0f] border border-slate-800 rounded-xl p-1">
                      <button 
                        onClick={() => setModuleFilter("todos")}
                        className={`px-3 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${moduleFilter === "todos" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                      >
                        Todos
                      </button>
                      <button 
                        onClick={() => setModuleFilter("critica")}
                        className={`px-3 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${moduleFilter === "critica" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                      >
                        Crítica (MVP)
                      </button>
                      <button 
                        onClick={() => setModuleFilter("media")}
                        className={`px-3 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${moduleFilter === "media" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                      >
                        Média
                      </button>
                      <button 
                        onClick={() => setModuleFilter("opcional")}
                        className={`px-3 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${moduleFilter === "opcional" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                      >
                        Futura / Opcional
                      </button>
                    </div>
                  </div>

                </div>

                {/* ARCHITECTURE MODULES TABLE */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#151518] text-slate-400 font-mono border-b border-slate-800">
                        
                        {/* 1. AMBIENTE OU MÓDULO */}
                        <th className="p-3.5 relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1">
                            Ambiente ou Módulo
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute left-4 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Divisão de Ambientes</p>
                            Separação clara entre o Portal do Médico (B2C) e os painéis corporativos (Gestor B2B e Admin). Facilita um MVP enxuto focado no reaproveitamento de rotinas.
                            <div className="absolute top-full left-6 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                        {/* 2. USUÁRIO ALVO */}
                        <th className="p-3.5 relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1">
                            Usuário Alvo
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Segmentação de Acesso</p>
                            Identifica o ator específico do ecossistema hospitalar. Garante que dores de escala do gestor (B2B) e visualização do médico (B2C) sejam tratadas de forma distinta.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                        {/* 3. FUNÇÃO PRINCIPAL */}
                        <th className="p-3.5 relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1">
                            Função Principal
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Entrega de Valor Focada</p>
                            O objetivo operacional primordial de cada módulo. No MVP, focamos nas rotinas críticas que eliminam conflitos de escalas e vazamento de receita imediatamente.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                        {/* 4. INFORMAÇÃO CHAVE */}
                        <th className="p-3.5 relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1">
                            Informação Chave Exibida
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Métricas e Visualização</p>
                            Quais dados estratégicos precisam ser visíveis imediatamente na interface para subsidiar tomadas de decisão rápidas (ex: valor de repasse, conflito de CRM).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                        {/* 5. AÇÃO PRINCIPAL */}
                        <th className="p-3.5 relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1">
                            Ação Principal
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Gatilho e Conversão</p>
                            A principal interação desejada do usuário. Desenhada para ser o mais fluida e direta possível no MVP, como links web sem instalação de app nativo.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                        {/* 6. PRIORIDADE */}
                        <th className="p-3.5 text-right relative group cursor-help select-none">
                          <span className="border-b border-dashed border-slate-600 hover:border-blue-400 transition pb-0.5 inline-flex items-center gap-1 justify-end ml-auto">
                            Prioridade
                            <HelpCircle className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </span>
                          <div className="absolute right-4 bottom-full mb-2 hidden group-hover:block w-64 bg-[#1a1a22] border border-slate-700/80 text-slate-200 text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed z-50 text-left font-sans font-normal normal-case">
                            <p className="font-bold text-blue-400 mb-1">Estratégia de Escopo</p>
                            Classificação de urgência no MVP. Permite focar e validar as hipóteses âncoras mais críticas antes de partir para integrações automáticas de API em fases futuras.
                            <div className="absolute top-full right-6 border-4 border-transparent border-t-[#1a1a22]"></div>
                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-[#0d0d0f]/60 font-sans">
                      {filteredModules.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/40 text-slate-300">
                          <td className="p-3.5 font-bold text-white">{row.ambiente}</td>
                          <td className="p-3.5 font-mono text-slate-400">{row.usuario}</td>
                          <td className="p-3.5">{row.funcao}</td>
                          <td className="p-3.5 text-blue-400 font-medium">{row.infoPrincipal}</td>
                          <td className="p-3.5 font-mono text-slate-400">{row.acaoPrincipal}</td>
                          <td className="p-3.5 text-right">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] font-mono border ${
                              row.prioridade === "Crítica" 
                                ? "text-green-400 bg-green-500/10 border-green-500/20" 
                                : row.prioridade === "Média"
                                ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                                : "text-slate-400 bg-slate-400/10 border-slate-400/20"
                            }`}>
                              {row.prioridade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </motion.div>
            )}

            {/* TAB 6: DECISÕES DO FUNDADOR */}
            {activeTab === "decisoes" && (
              <motion.div
                key="decisoes"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                <div className="bg-[#151518] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-500" />
                        Mural de Decisões do Fundador
                      </h2>
                      <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        {decisions.length} Decisões Mapeadas
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                      Responda às perguntas abaixo selecionando uma das hipóteses estratégicas para calibrar em tempo real a <strong>complexidade do MVP</strong>.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={handleExportCSV}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      title="Baixar arquivo CSV com todas as respostas e decisões estratégicas selecionadas pelo usuário"
                    >
                      {csvDownloaded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>CSV Baixado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="w-4 h-4 text-white" />
                          <span>Exportar Histórico de Decisões</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* CSV DOWNLOAD NOTIFICATION */}
                <AnimatePresence>
                  {csvDownloaded && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs text-emerald-300 font-sans shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          Arquivo <strong>Historico_Decisoes_Fundador_Plantao360.csv</strong> gerado e baixado! Formatado com codificação UTF-8 e delimitador padrão (<code>;</code>) para abertura direta no Microsoft Excel, Apple Numbers e Google Planilhas.
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                        CSV OK
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-6">
                  {decisions.map((q, qIdx) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-[#151518] border border-slate-800 space-y-4 shadow-sm">
                      
                      <div className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-blue-600/10 text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-white">{q.pergunta}</h4>
                          <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">{q.contexto}</p>
                        </div>
                      </div>

                      {/* OPTIONS RADIO */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                        {q.opcoes.map((opt) => {
                          const isSelected = q.selected === opt.value;
                          return (
                            <div 
                              key={opt.value}
                              onClick={() => selectDecisionOption(q.id, opt.value)}
                              className={`p-3.5 rounded-lg border cursor-pointer text-xs font-sans transition-all flex flex-col justify-between ${
                                isSelected 
                                  ? "bg-blue-600/5 border-blue-500/40 text-white" 
                                  : "bg-[#0d0d0f] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2 font-semibold">
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSelected ? "border-blue-500 text-blue-400" : "border-slate-700"
                                }`}>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                                </span>
                                <span>{opt.label}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                                {opt.impacto}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>

                {/* DECISÃO RECOMENDADA ATUAL PANEL */}
                <div className="bg-gradient-to-br from-[#1c1c21] to-[#151518] rounded-2xl border border-blue-500/30 p-6 space-y-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                      Decisão Recomendada Atual (Direção do MVP)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Com base no cruzamento das restrições de mercado, tempo de lançamento (Time-to-Market) e do reaproveitamento tecnológico máximo da infraestrutura do ElevaLaudo, o posicionamento ideal e recomendação estratégica consolidada para o MVP do Plantão360° é:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-1">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">MODELO DE NEGÓCIO & PÚBLICO</span>
                      <strong className="text-xs text-white block">B2B Hospitalar / Clínicas de Especialidades</strong>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        Foco corporativo para resolver vazamentos e conciliação financeira de repasses de escalas médicas.
                      </p>
                    </div>

                    <div className="p-4 bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-1">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">ENTRADA DE DADOS DO MVP</span>
                      <strong className="text-xs text-white block">Planilhas Excel/XLSX/CSV como Entrada Inicial</strong>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        Entrada inicial pragmática, lida com alta acurácia pela inteligência de mapeamento flexível.
                      </p>
                    </div>

                    <div className="p-4 bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-1">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">INTEGRAÇÃO COM ERPs</span>
                      <strong className="text-xs text-white block">Sem Integração via API no MVP (Zero-API)</strong>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        Onboarding em semanas usando apenas relatórios de escala exportados de sistemas legados (ex: MV, Tasy).
                      </p>
                    </div>

                    <div className="p-4 bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-1">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">QUALIDADE E CONFIANÇA</span>
                      <strong className="text-xs text-white block">Revisão Humana Side-by-Side (HITL)</strong>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        Validação das escalas sugeridas pela IA com feedbacks visuais e ajuste fino manual ágil.
                      </p>
                    </div>

                    <div className="p-4 bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-1 md:col-span-2">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">ACESSO DO CORPO CLÍNICO</span>
                      <strong className="text-xs text-white block">Acesso Médico via Link Web Responsivo</strong>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        Sem fricção de aplicativos nativos. O médico clica em um link recebido por WhatsApp para ver sua agenda de plantão consolidada e limpa.
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 7: RISCOS & RECOMENDAÇÕES */}
            {activeTab === "riscos" && (
              <motion.div
                key="riscos"
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="flex flex-col gap-6"
              >
                
                <h2 className="font-sans font-bold text-xl text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-blue-500" />
                  Matriz de Riscos, Mitigações & Diretrizes Finais
                </h2>

                {/* THE EXPLICIT REAP TABLE FROM ELEVALAUDO */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans font-bold text-base text-white">Plano de Reaproveitamento Técnico do ElevaLaudo</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#151518] text-slate-400 font-mono border-b border-slate-800">
                          <th className="p-3.5">Elemento Técnico</th>
                          <th className="p-3.5">Função Original no ElevaLaudo</th>
                          <th className="p-3.5 text-center">Tipo de Reutilização</th>
                          <th className="p-3.5">Motivação / Justificativa de Produto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#0d0d0f]/60 font-sans">
                        {REAP_PLAN.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/40 text-slate-300">
                            <td className="p-3.5 font-bold text-white">{row.elemento}</td>
                            <td className="p-3.5 text-slate-400">{row.funcaoAtual}</td>
                            <td className="p-3.5 text-center">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] font-mono border ${
                                row.reutilizacao === "Direta" 
                                  ? "text-green-400 bg-green-500/10 border-green-500/20" 
                                  : row.reutilizacao === "Adaptação"
                                  ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                                  : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                              }`}>
                                {row.reutilizacao}
                              </span>
                            </td>
                            <td className="p-3.5 max-w-xs text-slate-300 leading-normal">{row.motivo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* THE RISKS MATRIX TABLE */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans font-bold text-base text-white">Matriz de Riscos de Implementação</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#151518] text-slate-400 font-mono border-b border-slate-800">
                          <th className="p-3.5">Ameaça / Risco Identificado</th>
                          <th className="p-3.5">Impacto</th>
                          <th className="p-3.5">Probabilidade</th>
                          <th className="p-3.5">Sinal de Alerta / Gatilho</th>
                          <th className="p-3.5">Mitigação Operacional Recomendada</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#0d0d0f]/60 font-sans">
                        {RISK_ASSESSMENT.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/40 text-slate-300">
                            <td className="p-3.5 font-bold text-white max-w-[180px]">{row.risco}</td>
                            <td className="p-3.5 font-bold">
                              <span className={
                                row.impacto === "Muito Alto" ? "text-rose-400" : 
                                row.impacto === "Alto" ? "text-amber-400" : "text-slate-300"
                              }>{row.impacto}</span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-400">{row.probabilidade}</td>
                            <td className="p-3.5 max-w-[150px] text-slate-400 leading-normal">{row.alerta}</td>
                            <td className="p-3.5 max-w-xs text-green-400 leading-normal">{row.mitigacao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FINAL RECOMMENDATION STATEMENT BOX */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#151518] to-[#0d0d0f] border border-blue-500/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="text-blue-500 w-6 h-6 shrink-0" />
                    <span className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Recomendação Executiva Final de Produto</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
                    <p>
                      <strong>1. Direção a Seguir:</strong> O Plantão360 deve evoluir imediatamente como uma <strong>Solução B2B Hospitalar de Importação, Auditoria e Organização de Escalas Médicas</strong>.
                    </p>
                    <p>
                      <strong>2. MVP de Sucesso:</strong> Devemos focar 100% no <strong>Motor Inteligente de Importação de Planilhas de Escala com Validação Human-in-the-Loop</strong>. Esse MVP economiza dezenas de horas semanais de digitação manual de escalas, previne furos operacionais no pronto-socorro e elimina glosas de faturamento administrativo de médicos parceiros.
                    </p>
                    <p>
                      <strong>3. O que Reaproveitar:</strong> Reutilize integralmente as engines e layouts de <strong>Upload, Fila e Painel de Revisão Split-Screen</strong> criados para o ElevaLaudo, apenas substituindo os inputs de dados técnicos por médicos, horários e valores de plantão.
                    </p>
                    <p>
                      <strong>4. Maior Erro a Evitar:</strong> Não gaste recursos valiosos tentando desenvolver integrações de APIs nativas complexas com ERPs legados (MV/Tasy) no MVP. Ofereça um simples exportador/importador de planilhas. Evite também o desenvolvimento imediato de aplicativos nativos complexos para médicos: implemente um <strong>Link Dinâmico Web</strong> responsivo, reativo e de adoção instantânea.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
          
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#0d0d0f] py-6 text-center text-xs text-slate-400 mt-auto font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 Plantão360°. Todos os direitos reservados. Projeto Acadêmico & Estrutural.</p>
          <div className="flex gap-4">
            <span className="text-slate-700">•</span>
            <span>Ref Visual: Plantão360 Bento Grid Slate</span>
            <span className="text-slate-700">•</span>
            <span>Ref Lógica: ElevaLaudo Document Engine</span>
          </div>
        </div>
      </footer>

      {/* DOWNLOAD THESIS MODAL */}
      <DownloadThesisModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        decisions={decisions}
        mvpComplexityText={mvpComplexity.text}
      />

    </div>
  );
}
