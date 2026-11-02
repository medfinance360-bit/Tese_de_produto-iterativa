import React, { useState, useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  Legend
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Filter, 
  Clock, 
  Users, 
  Zap,
  HelpCircle
} from "lucide-react";
import { Opportunity } from "../data";

interface ExecutiveDashboardProps {
  opportunities: Opportunity[];
  calculatedOpportunities: (Opportunity & { priority: number })[];
  mvpComplexity: { val: number; text: string; color: string };
}

// Color palette for charts matching Plantão360 dark visual identity
const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
];

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  opportunities,
  calculatedOpportunities,
  mvpComplexity
}) => {
  const [selectedHospitalFilter, setSelectedHospitalFilter] = useState<string>("todos");
  const [periodMode, setPeriodMode] = useState<"mensal" | "trimestral" | "semestral">("mensal");

  // Multiplier based on selected period
  const periodMultiplier = useMemo(() => {
    switch (periodMode) {
      case "trimestral":
        return 3;
      case "semestral":
        return 6;
      case "mensal":
      default:
        return 1;
    }
  }, [periodMode]);

  const periodLabel = useMemo(() => {
    switch (periodMode) {
      case "trimestral":
        return "Trimestral (3 Meses)";
      case "semestral":
        return "Semestral (6 Meses)";
      case "mensal":
      default:
        return "Mensal (Julho / 2026)";
    }
  }, [periodMode]);

  // Calculate dynamic impact from simulator opportunities
  const simulatorMetrics = useMemo(() => {
    const avgValue = opportunities.reduce((acc, curr) => acc + curr.value, 0) / (opportunities.length || 1);
    const avgRevenue = opportunities.reduce((acc, curr) => acc + curr.revenue, 0) / (opportunities.length || 1);
    const avgEase = opportunities.reduce((acc, curr) => acc + curr.ease, 0) / (opportunities.length || 1);
    const topOpportunity = calculatedOpportunities[0];

    // Estimated monthly hours saved by AI automation (scaled by ease & value)
    const baseHoursSaved = Math.round(avgEase * 18 + avgValue * 12);
    const hoursSaved = baseHoursSaved * periodMultiplier;

    // Estimated financial recovery rate (%)
    const recoveryRate = (avgRevenue * 2.8 + avgValue * 1.5).toFixed(1);

    // Estimated recovered revenue for typical hospital group (BRL)
    const baseMonthlyRecoveredBrl = Math.round(avgRevenue * 6800 + avgValue * 4200);
    const monthlyRecoveredBrl = baseMonthlyRecoveredBrl * periodMultiplier;

    return {
      avgValue: avgValue.toFixed(1),
      avgRevenue: avgRevenue.toFixed(1),
      hoursSaved,
      recoveryRate,
      monthlyRecoveredBrl,
      topOpportunityName: topOpportunity?.name || "Sincronização & Leitura Inteligente"
    };
  }, [opportunities, calculatedOpportunities, periodMultiplier]);

  // Data 1: Shift Distribution by Specialty & Department
  const shiftDistributionData = useMemo(() => {
    const base = [
      { name: "Traumatologia", plantoes: 42 * periodMultiplier, percentual: 28, valorTotal: 71400 * periodMultiplier },
      { name: "Pronto Socorro", plantoes: 36 * periodMultiplier, percentual: 24, valorTotal: 54000 * periodMultiplier },
      { name: "UTI Geral", plantoes: 30 * periodMultiplier, percentual: 20, valorTotal: 51000 * periodMultiplier },
      { name: "Pediatria", plantoes: 22 * periodMultiplier, percentual: 15, valorTotal: 33000 * periodMultiplier },
      { name: "Cardiologia", plantoes: 18 * periodMultiplier, percentual: 13, valorTotal: 27000 * periodMultiplier },
    ];

    if (selectedHospitalFilter === "sao-luiz") {
      return base.map(item => ({ ...item, plantoes: Math.round(item.plantoes * 0.4), valorTotal: Math.round(item.valorTotal * 0.4) }));
    }
    if (selectedHospitalFilter === "einstein") {
      return base.map(item => ({ ...item, plantoes: Math.round(item.plantoes * 0.3), valorTotal: Math.round(item.valorTotal * 0.35) }));
    }
    return base;
  }, [selectedHospitalFilter, periodMultiplier]);

  // Data 2: Cost per Hospital & Shift Investment
  const hospitalCostData = useMemo(() => {
    const mult = periodMultiplier;
    return [
      { hospital: "Hosp. São Luiz", orcado: 84000 * mult, realizado: 81500 * mult, plantoes: 52 * mult, valorMedio: 1567 },
      { hospital: "Hosp. Albert Einstein", orcado: 65000 * mult, realizado: 63200 * mult, plantoes: 38 * mult, valorMedio: 1663 },
      { hospital: "Rede D'Or", orcado: 52000 * mult, realizado: 49800 * mult, plantoes: 32 * mult, valorMedio: 1556 },
      { hospital: "Hosp. Samaritano", orcado: 38000 * mult, realizado: 36400 * mult, plantoes: 24 * mult, valorMedio: 1516 },
      { hospital: "Hosp. das Clínicas", orcado: 25000 * mult, realizado: 24200 * mult, plantoes: 16 * mult, valorMedio: 1512 },
    ];
  }, [periodMultiplier]);

  // Data 3: Revenue Predictability and Recoverable Glosas
  const revenueTrendData = useMemo(() => {
    if (periodMode === "trimestral") {
      return [
        { mes: "Q3 2025", faturamentoBruto: 43500, repasseRecebido: 38100, divergenciaIA: 5400, plantoes: 27 },
        { mes: "Q4 2025", faturamentoBruto: 48200, repasseRecebido: 42600, divergenciaIA: 5600, plantoes: 31 },
        { mes: "Q1 2026", faturamentoBruto: 46500, repasseRecebido: 41200, divergenciaIA: 5300, plantoes: 29 },
        { mes: "Q2 2026", faturamentoBruto: 52900, repasseRecebido: 46900, divergenciaIA: 6000, plantoes: 34 },
        { mes: "Q3 2026 (Atual)", faturamentoBruto: 59400, repasseRecebido: 54300, divergenciaIA: 5100, plantoes: 39 },
        { mes: "Q4 2026 (Proj)", faturamentoBruto: 63000, repasseRecebido: 58800, divergenciaIA: 4200, plantoes: 42 },
      ];
    }
    if (periodMode === "semestral") {
      return [
        { mes: "2º Sem 2024", faturamentoBruto: 82000, repasseRecebido: 72000, divergenciaIA: 10000, plantoes: 52 },
        { mes: "1º Sem 2025", faturamentoBruto: 89000, repasseRecebido: 78500, divergenciaIA: 10500, plantoes: 58 },
        { mes: "2º Sem 2025", faturamentoBruto: 91700, repasseRecebido: 80700, divergenciaIA: 11000, plantoes: 58 },
        { mes: "1º Sem 2026", faturamentoBruto: 99400, repasseRecebido: 88100, divergenciaIA: 11300, plantoes: 63 },
        { mes: "2º Sem 2026 (Atual)", faturamentoBruto: 118800, repasseRecebido: 108600, divergenciaIA: 10200, plantoes: 78 },
        { mes: "1º Sem 2027 (Proj)", faturamentoBruto: 126000, repasseRecebido: 117600, divergenciaIA: 8400, plantoes: 84 },
      ];
    }
    // Mensal
    return [
      { mes: "Fev", faturamentoBruto: 14200, repasseRecebido: 12400, divergenciaIA: 1800, plantoes: 9 },
      { mes: "Mar", faturamentoBruto: 15800, repasseRecebido: 13900, divergenciaIA: 1900, plantoes: 10 },
      { mes: "Abr", faturamentoBruto: 13500, repasseRecebido: 11800, divergenciaIA: 1700, plantoes: 8 },
      { mes: "Mai", faturamentoBruto: 17200, repasseRecebido: 15100, divergenciaIA: 2100, plantoes: 11 },
      { mes: "Jun", faturamentoBruto: 18500, repasseRecebido: 16400, divergenciaIA: 2100, plantoes: 12 },
      { mes: "Jul (Atual)", faturamentoBruto: 19800, repasseRecebido: 18100, divergenciaIA: 1700, plantoes: 13 },
      { mes: "Ago (Proj)", faturamentoBruto: 21000, repasseRecebido: 19600, divergenciaIA: 1400, plantoes: 14 },
    ];
  }, [periodMode]);

  // Data 4: Operational Efficiency Comparison (Manual vs Plantão360 IA)
  const efficiencyComparisonData = useMemo(() => {
    const mult = periodMultiplier;
    return [
      { etapa: "Consolidação de Escala", manualHoras: 16 * mult, comIAHoras: 1.5 * mult },
      { etapa: "Trocas & Remanejamento", manualHoras: 12 * mult, comIAHoras: 2.0 * mult },
      { etapa: "Gaveta & Validade CRM", manualHoras: 8 * mult, comIAHoras: 0.5 * mult },
      { etapa: "Auditoria de Repasses", manualHoras: 14 * mult, comIAHoras: 1.8 * mult },
      { etapa: "Distribuição aos Médicos", manualHoras: 10 * mult, comIAHoras: 0.2 * mult },
    ];
  }, [periodMultiplier]);

  // Format currency helper
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* BANNER CABEÇALHO DEDICADO */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1c1c21] via-[#151518] to-[#0d0d0f] border border-slate-700/60 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Analytics & Data Intelligence</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Dashboard Executivo Plantão360°
              </h2>
              <p className="text-xs md:text-sm text-slate-300 font-sans mt-1 max-w-3xl leading-relaxed">
                Visualização estratégica sobre distribuição de plantões, custo consolidado por hospital e a previsibilidade de receita dos médicos — integrados diretamente com os pesos calculados no simulador de prioridades.
              </p>
            </div>

            {/* CONTROLES DE FILTRO NO CABEÇALHO */}
            <div className="flex flex-wrap items-center gap-2 bg-[#121215] p-2 rounded-xl border border-slate-800 self-stretch md:self-auto shrink-0">
              <div className="flex items-center gap-1.5 px-2 text-xs text-slate-400 font-mono">
                <Filter className="w-3.5 h-3.5 text-blue-400" />
                <span>Hospital:</span>
              </div>
              <select
                value={selectedHospitalFilter}
                onChange={(e) => setSelectedHospitalFilter(e.target.value)}
                className="bg-[#1a1a20] text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 font-sans cursor-pointer"
              >
                <option value="todos">Todos os Hospitais (Consolidado)</option>
                <option value="sao-luiz">Hospital São Luiz</option>
                <option value="einstein">Hospital Albert Einstein</option>
                <option value="dor">Rede D'Or</option>
              </select>

              <div className="flex items-center gap-1.5 px-2 text-xs text-slate-400 font-mono border-l border-slate-800 pl-3">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Período:</span>
              </div>
              <select
                value={periodMode}
                onChange={(e) => setPeriodMode(e.target.value as "mensal" | "trimestral" | "semestral")}
                className="bg-[#1a1a20] text-emerald-400 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-emerald-500/40 focus:outline-none focus:border-emerald-400 font-sans cursor-pointer"
              >
                <option value="mensal">Mensal (Julho / 2026)</option>
                <option value="trimestral">Trimestral (Q3 2026)</option>
                <option value="semestral">Semestral (2º Sem / 2026)</option>
              </select>
            </div>
          </div>

          {/* METRIC CARDS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            
            <div className="p-4 rounded-xl bg-[#121215]/80 border border-slate-800/80 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Volume de Plantões</span>
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{148 * periodMultiplier} turnos</div>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-sans">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{12 + (periodMultiplier - 1) * 3}% no período ({periodMode})</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121215]/80 border border-slate-800/80 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Custo Hospitalar</span>
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{formatBRL(235700 * periodMultiplier)}</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                {periodMode === "mensal" ? "Média R$ 1.592 por plantão 12h" : `Acumulado ${periodLabel}`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121215]/80 border border-slate-800/80 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Previsibilidade Médica</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight">{formatBRL(18100 * periodMultiplier)}</div>
              <p className="text-[11px] text-slate-300 mt-1 font-sans">
                Média líquida/médico ({13 * periodMultiplier} plantões)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121215]/80 border border-slate-800/80 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Receita Recuperada IA</span>
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-purple-300 tracking-tight">{formatBRL(simulatorMetrics.monthlyRecoveredBrl)}</div>
              <p className="text-[11px] text-purple-400/90 mt-1 font-sans">
                Retorno estimado ({periodMode})
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CONTROLE DEDICADO DE SELEÇÃO DE PERÍODO ACIMA DOS GRÁFICOS */}
      <div className="bg-[#151518] p-4 md:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg bg-gradient-to-r from-[#151518] via-[#1a1a22] to-[#151518]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-bold text-white font-sans">Filtro Temporal dos Gráficos</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase font-semibold">
                Modo {periodMode.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Altere a escala de consolidação temporal para recalcular os gráficos e indicadores abaixo.
            </p>
          </div>
        </div>

        {/* DROPDOWN SELECTOR DE PERÍODO: MENSAL, TRIMESTRAL, SEMESTRAL */}
        <div className="flex items-center gap-3 w-full md:w-auto self-stretch md:self-auto justify-between md:justify-end">
          <label htmlFor="period-select-dropdown" className="text-xs font-mono text-slate-300 shrink-0 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Período:</span>
          </label>
          <div className="relative w-full md:w-64">
            <select
              id="period-select-dropdown"
              value={periodMode}
              onChange={(e) => setPeriodMode(e.target.value as "mensal" | "trimestral" | "semestral")}
              className="w-full bg-[#1e1e26] text-white text-xs md:text-sm font-bold px-3.5 py-2.5 rounded-xl border border-blue-500/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-inner tracking-wide"
            >
              <option value="mensal">📅 Visão Mensal (Julho / 2026)</option>
              <option value="trimestral">📊 Visão Trimestral (Q3 2026 - 3 Meses)</option>
              <option value="semestral">📈 Visão Semestral (2º Semestre - 6 Meses)</option>
            </select>
          </div>
        </div>
      </div>

      {/* DASHBOARD CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: CUSTO POR HOSPITAL */}
        <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-base font-bold text-white">Custo por Hospital & Investimento em Plantões</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {periodMode.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Comparativo entre o orçamento previsto e o repasse efetivo realizado por instituição parceira ({periodLabel}).
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hospitalCostData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262e" />
                  <XAxis dataKey="hospital" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#f4f4f5" }}
                    formatter={(value: any) => [formatBRL(Number(value)), ""]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                  <Bar dataKey="orcado" name="Orçado no Hospital" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realizado" name="Repasse Realizado" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#0d0d0f] p-2 rounded-lg">
              <span className="text-slate-400 text-[10px] block font-mono">MAIOR VOLUME</span>
              <strong className="text-white">São Luiz ({52 * periodMultiplier} plantões)</strong>
            </div>
            <div className="bg-[#0d0d0f] p-2 rounded-lg">
              <span className="text-slate-400 text-[10px] block font-mono">MAIOR VALOR HORA</span>
              <strong className="text-emerald-400">Einstein (R$ 1.663)</strong>
            </div>
            <div className="bg-[#0d0d0f] p-2 rounded-lg">
              <span className="text-slate-400 text-[10px] block font-mono">ECONOMIA GLOSAS</span>
              <strong className="text-blue-400">{formatBRL(11100 * periodMultiplier)} retidos</strong>
            </div>
          </div>
        </div>

        {/* CHART 2: DISTRIBUIÇÃO DE PLANTÕES POR ESPECIALIDADE */}
        <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Distribuição de Plantões por Especialidade</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {periodMode.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Proporção de turnos executados nas áreas de maior demanda hospitalar ({periodLabel}).
            </p>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shiftDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="plantoes"
                  >
                    {shiftDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#f4f4f5" }}
                    formatter={(val: any, name: any, item: any) => [`${val} plantões (${item.payload.percentual}%) - ${formatBRL(item.payload.valorTotal)}`, name]}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right" 
                    wrapperStyle={{ fontSize: "12px", color: "#cbd5e1" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total de Plantões Alocados:</span>
            <span className="font-bold text-white bg-slate-800 px-2.5 py-1 rounded-md">
              {148 * periodMultiplier} Plantões ({periodMode})
            </span>
          </div>
        </div>

      </div>

      {/* CHARTS ROW 2: PREVISIBILIDADE DE RECEITA & IMPACTO DO SIMULADOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 3: PREVISIBILIDADE DE RECEITA MÉDICA (2 COLS) */}
        <div className="lg:col-span-2 bg-[#151518] rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">Previsibilidade de Receita dos Médicos & Conciliação</h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                SERIES ({periodMode.toUpperCase()})
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Acompanhamento histórico do repasse efetivo x glosas recuperadas pela IA ({periodLabel}).
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRepasse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262e" />
                  <XAxis dataKey="mes" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#f4f4f5" }}
                    formatter={(val: any) => [formatBRL(Number(val)), ""]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="faturamentoBruto" name="Bruto Faturado" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFaturamento)" />
                  <Area type="monotone" dataKey="repasseRecebido" name="Repasse Efetivo na Conta" stroke="#10b981" fillOpacity={1} fill="url(#colorRepasse)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-[#0d0d0f] rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block font-mono">DIVERGÊNCIA MÉDIA IA</span>
              <strong className="text-purple-400 text-sm">{formatBRL(1780 * periodMultiplier)} / período</strong>
              <p className="text-[10px] text-slate-400 mt-0.5">Detectado automaticamente</p>
            </div>
            <div className="p-2.5 bg-[#0d0d0f] rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block font-mono">VALOR MÉDIO PLANTÃO</span>
              <strong className="text-blue-400 text-sm">R$ 1.523 / turno</strong>
              <p className="text-[10px] text-slate-400 mt-0.5">Turno padrão de 12 horas</p>
            </div>
            <div className="p-2.5 bg-[#0d0d0f] rounded-xl border border-slate-800 col-span-2 md:col-span-1">
              <span className="text-slate-400 text-[10px] block font-mono">TAXA DE SUCESSO</span>
              <strong className="text-emerald-400 text-sm">98.4% de conciliação</strong>
              <p className="text-[10px] text-slate-400 mt-0.5">Sem erros manuais</p>
            </div>
          </div>
        </div>

        {/* INTEGRATED SIMULATOR MATRIX IMPACT PANEL (1 COL) */}
        <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Integração do Simulador</h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">LIVE METRICS</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
              Métricas calculadas em tempo real com base nos pesos atribuídos na <strong>Aba 4 (Matriz & Simulador)</strong>.
            </p>

            {/* IMPACT KPI BLOCK */}
            <div className="space-y-3 font-sans">
              
              <div className="p-3 bg-[#111114] rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-mono mb-1">FUNCIONALIDADE NÚCLEO</span>
                <strong className="text-white text-xs block truncate">{simulatorMetrics.topOpportunityName}</strong>
                <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                  <span className="text-emerald-400 font-semibold">Prioridade Máxima</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Calculado via algoritmo</span>
                </div>
              </div>

              <div className="p-3 bg-[#111114] rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-slate-400 font-mono">HORAS ECONOMIZADAS ({periodMode.toUpperCase()})</span>
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-lg font-bold text-blue-400">{simulatorMetrics.hoursSaved} horas por gestor</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Substituindo digitação manual por IA</p>
              </div>

              <div className="p-3 bg-[#111114] rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-slate-400 font-mono">RETORNO ESTIMADO (B2B)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-emerald-400">{simulatorMetrics.recoveryRate}% de eficiência</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Eliminação de furos & glosas</p>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-sans">Complexidade do Escopo:</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${mvpComplexity.color}`}>
                {mvpComplexity.text}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* CHART 4: COMPARATIVO DE EFICIÊNCIA OPERACIONAL */}
      <div className="bg-[#151518] rounded-2xl border border-slate-800 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="text-base font-bold text-white">Eficiência Operacional: Processo Manual vs. Plantão360°</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Horas estimadas por ciclo ({periodLabel}) em cada etapa de gestão de escalas e conciliação.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-slate-600 inline-block"></span>
              <span className="text-slate-400">Manual (Sem IA)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
              <span className="text-blue-400 font-bold">Plantão360° (Com IA)</span>
            </div>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={efficiencyComparisonData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#26262e" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} unit="h" />
              <YAxis dataKey="etapa" type="category" stroke="#94a3b8" fontSize={11} width={150} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#f4f4f5" }}
                formatter={(val: any) => [`${val} horas (${periodMode})`, ""]}
              />
              <Bar dataKey="manualHoras" name="Processo Manual (Sem IA)" fill="#475569" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="comIAHoras" name="Plantão360° (Com IA)" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Redução total de tempo operacional de <strong>{60 * periodMultiplier} horas</strong> para apenas <strong>{6 * periodMultiplier} horas</strong> ({periodMode}).</span>
          </div>
          <span className="text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 font-semibold">
            Economia de 90% do Tempo do Gestor
          </span>
        </div>
      </div>

    </div>
  );
};
