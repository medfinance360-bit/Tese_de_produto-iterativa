import React, { useState } from "react";
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  MessageSquare, 
  Instagram, 
  Eye, 
  Layers, 
  Info,
  ChevronRight,
  ChevronLeft,
  Share2,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export function BrandSystemView() {
  const [activeSection, setActiveSection] = useState<string>("all");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  // Interactive Carousel Simulator State
  const [carouselSlide, setCarouselSlide] = useState<number>(1);
  const [activeStoryCard, setActiveStoryCard] = useState<boolean>(true);
  const [activeHighlight, setActiveHighlight] = useState<string>("Baixar");

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const carouselData = [
    {
      slide: 1,
      bg: "black",
      type: "01/05 · HOOK",
      headlinePrefix: "Você sabe quanto ",
      blueWord: "realmente",
      headlineSuffix: " tem a receber?",
      subtitle: "A maioria dos médicos plantonistas descobre divergências nos repasses meses depois.",
      cta: "Deslize para ver →"
    },
    {
      slide: 2,
      bg: "white",
      type: "02/05 · DOR",
      headlinePrefix: "Planilhas e anotações geram ",
      blueWord: "perdas",
      headlineSuffix: " invisíveis.",
      subtitle: "Glosas não auditadas e escalas descentralizadas tomam mais de 16h do seu tempo todo mês.",
      cta: "A solução no próximo slide →"
    },
    {
      slide: 3,
      bg: "black",
      type: "03/05 · SOLUÇÃO",
      headlinePrefix: "Plantão360° traz ",
      blueWord: "clareza",
      headlineSuffix: " total do seu trabalho.",
      subtitle: "Cada plantão vira um recebível com status automático: pago, pendente ou atrasado.",
      cta: "Conheça os recursos →"
    },
    {
      slide: 4,
      bg: "white",
      type: "04/05 · FEATURE",
      headlinePrefix: "IA que lê suas escalas e ",
      blueWord: "audita",
      headlineSuffix: " valores.",
      subtitle: "Importe fotos ou planilhas de hospitais. Nosso sistema sincroniza tudo no seu calendário.",
      cta: "Veja como começar →"
    },
    {
      slide: 5,
      bg: "black",
      type: "05/05 · CTA",
      headlinePrefix: "Assuma o controle da sua ",
      blueWord: "carreira",
      headlineSuffix: " médica hoje.",
      subtitle: "Junte-se a +5.000 médicos que não perdem mais nenhum centavo de plantão.",
      cta: "Baixe grátis no link da bio"
    }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      {/* BRAND SYSTEM HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#090a0f] via-[#0d111a] to-[#000000] p-6 md:p-10 border border-slate-800 shadow-2xl">
        {/* Background decorative concentric circles */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full border border-[#0A84FF]" />
          <div className="absolute top-12 right-12 w-[300px] h-[300px] rounded-full border border-[#0A84FF]" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20 text-xs font-mono font-bold tracking-wider uppercase">
              Documento Oficial · V1.0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
              Status: Oficial · Imutável
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
              Julho 2026
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-sans">
              Plantão360<span className="text-[#0A84FF] inline-block font-extrabold">°</span>
            </h1>
            <span className="text-xl md:text-2xl font-light text-slate-400">Brand System</span>
          </div>

          <p className="text-sm md:text-base text-slate-300 font-sans max-w-2xl leading-relaxed">
            Identidade visual completa, regras de composição e diretrizes de aplicação para todo material oficial da marca — Instagram, app e comunicação institucional.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            <button
              onClick={() => setActiveSection("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "all"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              Visão Completa
            </button>
            <button
              onClick={() => setActiveSection("logo")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "logo"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              01. Logo & Símbolo
            </button>
            <button
              onClick={() => setActiveSection("cores")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "cores"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              02. Cores & Status
            </button>
            <button
              onClick={() => setActiveSection("tipografia")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "tipografia"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              03. Tipografia Inter
            </button>
            <button
              onClick={() => setActiveSection("composicao")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "composicao"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              04-05. Layout & Estilo
            </button>
            <button
              onClick={() => setActiveSection("simulador")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "simulador"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              07. Simulador de Peças
            </button>
            <button
              onClick={() => setActiveSection("instagram")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === "instagram"
                  ? "bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              08. Perfil Instagram
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 01: LOGO & SÍMBOLO */}
      {(activeSection === "all" || activeSection === "logo") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">01 — MARCA & SÍMBOLO</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Logotipo & Regras do Grau (°)</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              O logotipo é o nome completo em <strong>Inter Extra Bold</strong>, com o símbolo de grau (°) sempre em azul de marca (<strong>#0A84FF</strong>).
            </p>
          </div>

          {/* LOGO VARIANTS PREVIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light Version */}
            <div className="bg-white rounded-xl p-6 text-black flex flex-col justify-between h-44 shadow-lg border border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">Versão Principal (Fundo Claro)</span>
              <div className="my-auto">
                <span className="text-3xl font-black tracking-tight text-black font-sans">
                  Plantão360<span className="text-[#0A84FF]">°</span>
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium">Uso: Posts em fundo branco, documentos impressos</span>
            </div>

            {/* Dark Version */}
            <div className="bg-black rounded-xl p-6 text-white flex flex-col justify-between h-44 border border-slate-800 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Versão Alternativa (Fundo Escuro)</span>
              <div className="my-auto">
                <span className="text-3xl font-black tracking-tight text-white font-sans">
                  Plantão360<span className="text-[#0A84FF]">°</span>
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Uso: Posts em fundo preto, capas de destaques</span>
            </div>

            {/* Isolated Symbol */}
            <div className="bg-[#0a0b0e] rounded-xl p-6 flex flex-col justify-between h-44 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Símbolo Isolado</span>
              <div className="my-auto flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black border border-slate-700 flex items-center justify-center text-white text-2xl font-black shadow-inner">
                  360<span className="text-[#0A84FF]">°</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#0A84FF] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-[#0A84FF]/20">
                  °
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Uso: Avatar Instagram, Favicon, App Icon</span>
            </div>
          </div>

          {/* GUIDELINES & RESTRICTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-[#16161a] border border-slate-800/80">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" /> Diretrizes de Aplicação
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Área de Proteção:</strong> Espaço livre mínimo equivalente à altura da letra &quot;P&quot; de Plantão.</li>
                <li>• <strong>Tamanho Mínimo:</strong> 90px de largura em tela (abaixo disso, o grau perde legibilidade).</li>
                <li>• <strong>Posição Fixa:</strong> Topo esquerdo em todo post/carrossel/story, a 56–64px da borda.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1315] border border-rose-900/30">
              <h4 className="font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4" /> O Que Não Fazer
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                <li>• 🚫 Recolorir o grau (ele é <strong>sempre #0A84FF</strong>, nunca preto, branco ou cinza).</li>
                <li>• 🚫 Esticar ou distorcer a proporção do wordmark.</li>
                <li>• 🚫 Rotacionar, inclinar ou aplicar sombra no logo.</li>
                <li>• 🚫 Trocar a fonte do wordmark por outra família diferente de Inter.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 02: PALETA DE CORES */}
      {(activeSection === "all" || activeSection === "cores") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">02 — CORES · PALETA DA MARCA</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Cores Neutras, Destaque Accent e Status do App</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Base neutra em preto e branco puros. Verde, laranja e vermelho são cores funcionais do produto, nunca decorativas.
            </p>
          </div>

          {/* COLOR SWATCHES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Preto */}
            <div className="bg-[#000000] p-4 rounded-xl border border-slate-800 flex flex-col justify-between h-36 relative group">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Base Neutra</span>
              <div>
                <strong className="text-white text-sm block">Preto Puro</strong>
                <span className="text-xs font-mono text-slate-500">#000000</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#000000")}
                className="mt-2 text-[10px] font-mono bg-slate-900 text-slate-300 py-1 px-2 rounded flex items-center justify-between hover:bg-slate-800 transition"
              >
                <span>{copiedColor === "#000000" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Branco */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl text-black flex flex-col justify-between h-36 relative group">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Base Neutra</span>
              <div>
                <strong className="text-black text-sm block">Branco Puro</strong>
                <span className="text-xs font-mono text-slate-600">#FFFFFF</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#FFFFFF")}
                className="mt-2 text-[10px] font-mono bg-slate-200 text-slate-800 py-1 px-2 rounded flex items-center justify-between hover:bg-slate-300 transition"
              >
                <span>{copiedColor === "#FFFFFF" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Azul Accent */}
            <div className="bg-[#0A84FF] p-4 rounded-xl text-white flex flex-col justify-between h-36 relative group shadow-lg shadow-[#0A84FF]/20">
              <span className="text-[10px] font-mono text-blue-100 uppercase">Azul Accent</span>
              <div>
                <strong className="text-white text-sm block">Azul de Marca</strong>
                <span className="text-xs font-mono text-blue-100">#0A84FF</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#0A84FF")}
                className="mt-2 text-[10px] font-mono bg-blue-700 text-white py-1 px-2 rounded flex items-center justify-between hover:bg-blue-800 transition"
              >
                <span>{copiedColor === "#0A84FF" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Pago / Sucesso */}
            <div className="bg-[#72F29A] p-4 rounded-xl text-slate-950 flex flex-col justify-between h-36 relative group shadow-md">
              <span className="text-[10px] font-mono text-emerald-900 uppercase">Status do App</span>
              <div>
                <strong className="text-slate-950 text-sm block">Pago / Sucesso</strong>
                <span className="text-xs font-mono text-emerald-900">#72F29A</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#72F29A")}
                className="mt-2 text-[10px] font-mono bg-emerald-800 text-white py-1 px-2 rounded flex items-center justify-between hover:bg-emerald-900 transition"
              >
                <span>{copiedColor === "#72F29A" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Pendente */}
            <div className="bg-[#F2B857] p-4 rounded-xl text-slate-950 flex flex-col justify-between h-36 relative group shadow-md">
              <span className="text-[10px] font-mono text-amber-950 uppercase">Status do App</span>
              <div>
                <strong className="text-slate-950 text-sm block">Pendente</strong>
                <span className="text-xs font-mono text-amber-950">#F2B857</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#F2B857")}
                className="mt-2 text-[10px] font-mono bg-amber-800 text-white py-1 px-2 rounded flex items-center justify-between hover:bg-amber-900 transition"
              >
                <span>{copiedColor === "#F2B857" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Atrasado / Erro */}
            <div className="bg-[#ED5380] p-4 rounded-xl text-white flex flex-col justify-between h-36 relative group shadow-md">
              <span className="text-[10px] font-mono text-rose-100 uppercase">Status do App</span>
              <div>
                <strong className="text-white text-sm block">Atrasado / Erro</strong>
                <span className="text-xs font-mono text-rose-100">#ED5380</span>
              </div>
              <button 
                onClick={() => handleCopyColor("#ED5380")}
                className="mt-2 text-[10px] font-mono bg-rose-800 text-white py-1 px-2 rounded flex items-center justify-between hover:bg-rose-900 transition"
              >
                <span>{copiedColor === "#ED5380" ? "Copiado!" : "Copiar HEX"}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* COLOR RULES */}
          <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <strong className="text-white block mb-1">Fundos de Post & Carrossel</strong>
              <p className="text-slate-400">Somente <strong>#FFFFFF</strong> ou <strong>#000000</strong>. Alternar entre slides — nunca dois fundos iguais em sequência. Nunca cinza, nunca gradiente.</p>
            </div>
            <div>
              <strong className="text-white block mb-1">Fundos de Story (Única Exceção)</strong>
              <p className="text-slate-400">Único lugar onde gradiente é permitido: <strong>#001E3C → #0A84FF</strong> em diagonal, com card branco centralizado.</p>
            </div>
            <div>
              <strong className="text-white block mb-1">Destaque de Texto (1 Palavra)</strong>
              <p className="text-slate-400">Exatamente <strong>1 palavra em azul</strong> (#0A84FF) por título. Nunca em bloco de texto corrido, nunca como fundo cheio.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 03: TIPOGRAFIA */}
      {(activeSection === "all" || activeSection === "tipografia") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">03 — TIPOGRAFIA · INTER</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Família Única e Hierarquia Tipográfica</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Uma única família tipográfica (Inter) em toda a comunicação. Hierarquia definida exclusivamente por peso e tamanho.
            </p>
          </div>

          {/* TYPOGRAPHY SAMPLE CARDS */}
          <div className="space-y-4">
            {/* Headline */}
            <div className="p-5 rounded-xl bg-[#18181c] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#0A84FF] uppercase font-bold">Extra Bold 800 · Headline (H1)</span>
                <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Você sabe quanto <span className="text-[#0A84FF]">realmente</span> tem a receber?
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-400 shrink-0 bg-[#0f0f12] p-2.5 rounded-lg border border-slate-800">
                <div>68px / 800</div>
                <div>Line-height: 1.15</div>
                <div className="text-[#0A84FF] font-bold">1 palavra em azul</div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="p-5 rounded-xl bg-[#18181c] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Regular 400 · Subtítulo</span>
                <p className="text-lg md:text-xl font-normal text-slate-300">
                  A maioria dos médicos plantonistas não sabe o valor exato até o repasse cair.
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-400 shrink-0 bg-[#0f0f12] p-2.5 rounded-lg border border-slate-800">
                <div>32px / 400</div>
                <div>Cor: #555 (Claro) / #B0B0B0 (Escuro)</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 rounded-xl bg-[#18181c] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Regular 400 · Corpo / Legenda de Post</span>
                <p className="text-sm font-normal text-slate-300 leading-relaxed">
                  Cada plantão vira um recebível com status automático — pago, pendente ou cancelado — e o total do mês aparece sozinho no seu celular, sem precisar de planilha.
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-400 shrink-0 bg-[#0f0f12] p-2.5 rounded-lg border border-slate-800">
                <div>15–17px / 400</div>
                <div>Corpo corrido (≤150 palavras)</div>
              </div>
            </div>

            {/* Label / Tag */}
            <div className="p-5 rounded-xl bg-[#18181c] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bold 700 · Label / Numeração</span>
                <p className="text-sm font-bold text-slate-200 tracking-wider uppercase font-mono">
                  01/05 · PILAR: PAGAMENTOS & CONCILIAÇÃO
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-400 shrink-0 bg-[#0f0f12] p-2.5 rounded-lg border border-slate-800">
                <div>13–20px / 700</div>
                <div>Uppercase, Letter-spacing 0.06em</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 04 & 05: LAYOUT & REGRAS DE COMPOSIÇÃO */}
      {(activeSection === "all" || activeSection === "composicao") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">04 & 05 — COMPOSIÇÃO & ESTILO VISUAL</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Regras do Grid, Curvas e Proibições</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Sem fotografia de estoque, sem ilustração decorativa. A interface real do app e as curvas azuis concêntricas são os únicos elementos gráficos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0A84FF]" /> Curvas Concêntricas
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Dois círculos no canto superior direito (480px e 300px), borda azul em baixa opacidade (18% e 12%), nunca preenchidos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" /> Mockup de iPhone
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Canto inferior direito, rotação leve 5–15°, tela escura com linhas e pills coloridas simulando UI do app (#72F29A, #F2B857, #ED5380).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Layout className="w-4 h-4 text-purple-400" /> Margens & Padding
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Padding interno fixo de 72px. Logo fixo no topo esquerdo (56–64px da borda). Numeração de slide no canto inferior esquerdo.
              </p>
            </div>
          </div>

          {/* BANNED VISUAL ELEMENTS */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-[#1a1315] to-[#121215] border border-rose-900/30 text-xs space-y-2">
            <strong className="text-rose-400 text-sm block font-bold flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Elementos Estritamente Proibidos em Posts e Carrosséis
            </strong>
            <p className="text-slate-300 leading-relaxed">
              Foto de banco de imagem (stock photo), ilustração vetorial decorativa, emojis no layout, texturas de papel/ruído, sombras projetadas em cartões, gradientes de fundo (exceto no Story).
            </p>
          </div>
        </div>
      )}

      {/* SECTION 07: SIMULADOR INTERATIVO DE CARROSSEL & STORY */}
      {(activeSection === "all" || activeSection === "simulador") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">07 — SIMULADOR INTERATIVO DE TEMPLATES</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Testador em Tempo Real de Carrossel (5 Slides) & Story</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Veja o cumprimento exato das regras de alternância preto/branco, 1 palavra em azul, curvas concêntricas e mockup de iPhone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CAROUSEL SIMULATOR (8 COLS) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                  Template 1: Carrossel Instagram (1080×1080)
                </span>
                <div className="flex items-center gap-1 bg-[#1a1a20] p-1 rounded-lg border border-slate-800">
                  {carouselData.map((item) => (
                    <button
                      key={item.slide}
                      onClick={() => setCarouselSlide(item.slide)}
                      className={`px-2.5 py-1 text-xs font-mono rounded transition-all ${
                        carouselSlide === item.slide
                          ? "bg-[#0A84FF] text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      0{item.slide}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIVE SLIDE CANVAS */}
              {(() => {
                const current = carouselData.find(c => c.slide === carouselSlide) || carouselData[0];
                const isBlack = current.bg === "black";

                return (
                  <div className={`relative aspect-square w-full rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-colors duration-300 shadow-2xl border ${
                    isBlack 
                      ? "bg-black text-white border-slate-800" 
                      : "bg-white text-black border-slate-200"
                  }`}>
                    {/* Concentric circles in top right */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 pointer-events-none opacity-20">
                      <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-[#0A84FF]" />
                      <div className="absolute top-8 right-8 w-44 h-44 rounded-full border border-[#0A84FF]" />
                    </div>

                    {/* Top Bar: Logo & Slide Pillar Tag */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="text-xl font-black tracking-tight font-sans">
                        Plantão360<span className="text-[#0A84FF]">°</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isBlack ? "bg-slate-900 text-slate-300" : "bg-slate-100 text-slate-700"
                      }`}>
                        {current.type}
                      </span>
                    </div>

                    {/* Center Content: Headline & Subtitle */}
                    <div className="relative z-10 my-auto space-y-4 max-w-lg">
                      <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight font-sans">
                        {current.headlinePrefix}
                        <span className="text-[#0A84FF] inline-block font-black">{current.blueWord}</span>
                        {current.headlineSuffix}
                      </h3>

                      <p className={`text-sm md:text-base font-normal leading-relaxed ${
                        isBlack ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {current.subtitle}
                      </p>
                    </div>

                    {/* Bottom Bar: Numbering & CTA */}
                    <div className="relative z-10 flex items-end justify-between pt-4 border-t border-slate-800/20">
                      <span className="text-xs font-mono font-bold tracking-widest opacity-80">
                        0{current.slide}/05
                      </span>

                      {/* iPhone Mockup element preview */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0A84FF] flex items-center gap-1 font-sans">
                          {current.cta}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* CONTROLS BELOW SLIDE */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <button
                  disabled={carouselSlide === 1}
                  onClick={() => setCarouselSlide(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18181c] border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span>Fundo Atual: <strong>{carouselData[carouselSlide - 1].bg === "black" ? "#000000 (Preto)" : "#FFFFFF (Branco)"}</strong></span>
                <button
                  disabled={carouselSlide === 5}
                  onClick={() => setCarouselSlide(prev => Math.min(5, prev + 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18181c] border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STORY TEMPLATE SIMULATOR (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                  Template 2: Story Instagram (1080×1920)
                </span>
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                  Gradiente Diagonal
                </span>
              </div>

              {/* STORY CANVAS PREVIEW */}
              <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto rounded-3xl p-6 bg-gradient-to-br from-[#001E3C] to-[#0A84FF] flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-700">
                {/* Top safe area info & logo */}
                <div className="relative z-10 pt-2 flex items-center justify-between">
                  <span className="text-white font-black text-lg font-sans">
                    Plantão360<span className="text-white">°</span>
                  </span>
                  <span className="text-[9px] font-mono text-blue-100 bg-white/10 px-2 py-0.5 rounded-full">
                    Story Official
                  </span>
                </div>

                {/* Floating Central White Card (border-radius 24px) */}
                <div className="relative z-10 bg-white text-black p-6 rounded-[24px] shadow-2xl space-y-3 border border-white/40">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">RECURSO DO APP</span>
                  <h4 className="text-lg font-extrabold text-black leading-snug">
                    Sua conciliação financeira em <span className="text-[#0A84FF]">30 segundos</span>.
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Compare o repasse bancário com a escala prevista do hospital sem abrir nenhuma planilha.
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0A84FF]">
                    <span>Toque para baixar o app</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Safe Area CTA */}
                <div className="relative z-10 text-center pb-2">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold font-sans tracking-wide border border-white/30 inline-block shadow-lg">
                    Link na bio: @plantao.360
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 06: BRAND VOICE */}
      {(activeSection === "all" || activeSection === "brandvoice") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">06 — BRAND VOICE · TOM DE VOZ</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Comunicação Direta, Confiante e Sem Firula</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Como o Plantão360° se comunica com o médico plantonista sem usar jargões de tecnologia ou marketing vazio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-1.5">
              <strong className="text-white text-sm block font-bold">1. Direto</strong>
              <p className="text-slate-300">Frases curtas, vai direto ao benefício real do produto, sem enrolação.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-1.5">
              <strong className="text-white text-sm block font-bold">2. Técnico-Acessível</strong>
              <p className="text-slate-300">Fala a língua do plantonista (escalas, repasses, CRM, glosas) sem clichês de tech.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-1.5">
              <strong className="text-white text-sm block font-bold">3. Confiante</strong>
              <p className="text-slate-300">Afirma com propriedade, não sugere. Demonstra domínio absoluto das dores do médico.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#16161c] border border-slate-800 space-y-1.5">
              <strong className="text-white text-sm block font-bold">4. Sem Firula</strong>
              <p className="text-slate-300">Zero emojis nos posts, zero gíria corporativa e zero superlativos vazios.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 08: EXEMPLO DE APLICAÇÃO NO INSTAGRAM */}
      {(activeSection === "all" || activeSection === "instagram") && (
        <div className="bg-[#121215] rounded-2xl p-6 border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0A84FF] font-bold uppercase tracking-wider">08 — EXEMPLO DE APLICAÇÃO · PERFIL & DESTAQUES</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Estrutura do Instagram Oficial (@plantao.360)</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Bio focada em prova social, CTAs diretos e capas de destaque minimalistas com ícones outline monocromáticos.
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full bg-black rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
            {/* Instagram Profile Header */}
            <div className="flex items-center gap-6">
              {/* Avatar Icon */}
              <div className="w-20 h-20 rounded-full bg-black border-2 border-[#0A84FF] p-1 flex items-center justify-center shrink-0 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#090a0f] flex items-center justify-center text-white text-xl font-black font-sans">
                  360<span className="text-[#0A84FF]">°</span>
                </div>
              </div>

              {/* Bio Stats */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-sans">@plantao.360</h3>
                  <span className="px-3 py-1 bg-[#0A84FF] text-white text-xs font-bold rounded-lg">Seguir</span>
                </div>
                <div className="flex gap-6 text-xs text-slate-300 font-mono">
                  <div><strong>124</strong> posts</div>
                  <div><strong>5.4k</strong> seguidores</div>
                  <div><strong>128</strong> seguindo</div>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="text-xs text-slate-200 font-sans space-y-1 bg-[#0e0e12] p-4 rounded-xl border border-slate-800">
              <strong className="text-white text-sm block">Gestão de plantões para médicos.</strong>
              <p>Escalas + pagamentos + documentos em um app.</p>
              <p className="text-emerald-400 font-medium">Usado por +5.000 médicos no Brasil.</p>
              <div className="pt-2 text-[#0A84FF] font-bold flex items-center gap-1">
                <span>↓ Baixe grátis:</span>
                <span className="underline">plantao360.app</span>
              </div>
            </div>

            {/* Highlights (Destaques) */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Capas dos Destaques (Outline Monocromático)</span>
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {[
                  { name: "Baixar", icon: Smartphone },
                  { name: "Como Usar", icon: Info },
                  { name: "Recursos", icon: Sparkles },
                  { name: "FAQs", icon: MessageSquare },
                  { name: "Reviews", icon: CheckCircle2 }
                ].map((hl) => {
                  const IconComp = hl.icon;
                  const isSelected = activeHighlight === hl.name;
                  return (
                    <button
                      key={hl.name}
                      onClick={() => setActiveHighlight(hl.name)}
                      className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                    >
                      <div className={`w-14 h-14 rounded-full bg-black flex items-center justify-center border transition-all ${
                        isSelected 
                          ? "border-[#0A84FF] ring-2 ring-[#0A84FF]/30 scale-105" 
                          : "border-slate-800 group-hover:border-slate-600"
                      }`}>
                        <IconComp className="w-6 h-6 text-white stroke-[2]" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 font-medium">{hl.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post Grid Preview */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Feed Oficial (Alternância de Fundo)</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-black border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                  <span className="text-[8px] font-mono text-[#0A84FF]">01/05</span>
                  <span className="text-[10px] font-extrabold text-white leading-tight">Você sabe quanto tem a receber?</span>
                </div>
                <div className="aspect-square bg-white border border-slate-200 rounded-lg p-2 flex flex-col justify-between text-black">
                  <span className="text-[8px] font-mono text-[#0A84FF]">02/05</span>
                  <span className="text-[10px] font-extrabold text-black leading-tight">Planilhas geram perdas invisíveis.</span>
                </div>
                <div className="aspect-square bg-black border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                  <span className="text-[8px] font-mono text-[#0A84FF]">03/05</span>
                  <span className="text-[10px] font-extrabold text-white leading-tight">Plantão360° traz clareza total.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
