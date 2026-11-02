import React, { useState, useMemo } from "react";
import { 
  User, 
  Calendar, 
  DollarSign, 
  Clock, 
  Check, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Plus, 
  X, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  FileSpreadsheet, 
  Building2, 
  ChevronRight,
  Info,
  CalendarDays,
  FileCheck2,
  Lock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ImportedShift {
  id: string;
  hospital: string;
  setor: string;
  data: string;
  dataObj: string; // YYYY-MM-DD
  horario: string;
  duracaoHoras: number;
  turno: "Diurno" | "Noturno" | "24h" | "6h";
  valorOriginal: number;
  valorAjustado: number;
  origemPlanilha: string;
  status: "pendente" | "aceito" | "editado" | "recusado";
  notasPessoais?: string;
  motivoRecusa?: string;
  corAgenda?: string;
}

const INITIAL_IMPORTED_SHIFTS: ImportedShift[] = [
  {
    id: "shift_1",
    hospital: "Hospital São Lucas",
    setor: "UTI Geral Adulto",
    data: "Sex, 14 de Agosto",
    dataObj: "2026-08-14",
    horario: "19:00 às 07:00",
    duracaoHoras: 12,
    turno: "Noturno",
    valorOriginal: 1800,
    valorAjustado: 1800,
    origemPlanilha: "Escala_UTI_Agosto_Gestor.xlsx",
    status: "pendente",
    notasPessoais: "Cobrir passagem de plantão com Dra. Mariana",
    corAgenda: "#3b82f6"
  },
  {
    id: "shift_2",
    hospital: "Pronto-Socorro Central",
    setor: "Emergência & Trauma",
    data: "Seg, 17 de Agosto",
    dataObj: "2026-08-17",
    horario: "07:00 às 19:00",
    duracaoHoras: 12,
    turno: "Diurno",
    valorOriginal: 1650,
    valorAjustado: 1650,
    origemPlanilha: "Escala_PS_Trauma_Jul_Ago.xlsx",
    status: "pendente",
    notasPessoais: "",
    corAgenda: "#10b981"
  },
  {
    id: "shift_3",
    hospital: "Hospital Santa Marcelina",
    setor: "Ortopedia / Sobreaviso",
    data: "Sáb, 22 de Agosto",
    dataObj: "2026-08-22",
    horario: "07:00 às 07:00 (+1)",
    duracaoHoras: 24,
    turno: "24h",
    valorOriginal: 2400,
    valorAjustado: 2400,
    origemPlanilha: "Escala_Cirurgias_Agosto.pdf",
    status: "pendente",
    notasPessoais: "Adicional de acionamento cirúrgico confirmado",
    corAgenda: "#8b5cf6"
  },
  {
    id: "shift_4",
    hospital: "UPA Zona Sul",
    setor: "Clínica Médica",
    data: "Ter, 25 de Agosto",
    dataObj: "2026-08-25",
    horario: "13:00 às 19:00",
    duracaoHoras: 6,
    turno: "6h",
    valorOriginal: 950,
    valorAjustado: 950,
    origemPlanilha: "Escala_UPA_Rede_Municipal.xlsx",
    status: "pendente",
    notasPessoais: "",
    corAgenda: "#f59e0b"
  }
];

export const DoctorPortalSection: React.FC = () => {
  const [shifts, setShifts] = useState<ImportedShift[]>(INITIAL_IMPORTED_SHIFTS);
  const [activeFilter, setActiveFilter] = useState<"todos" | "pendentes" | "aceitos" | "recusados">("pendentes");
  const [editingShift, setEditingShift] = useState<ImportedShift | null>(null);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ msg: string; type: "success" | "info" | "warn" } | null>(null);

  // New custom shift form state
  const [customShift, setCustomShift] = useState({
    hospital: "",
    setor: "",
    data: "Qua, 26 de Agosto",
    horario: "07:00 às 19:00",
    duracaoHoras: 12,
    turno: "Diurno" as "Diurno" | "Noturno" | "24h" | "6h",
    valor: 1700,
    notasPessoais: "Plantão avulso negociado diretamente"
  });

  const showToast = (msg: string, type: "success" | "info" | "warn" = "success") => {
    setFeedbackToast({ msg, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 4000);
  };

  // Metrics
  const metrics = useMemo(() => {
    const accepted = shifts.filter(s => s.status === "aceito" || s.status === "editado");
    const pending = shifts.filter(s => s.status === "pendente");
    const rejected = shifts.filter(s => s.status === "recusado");

    const totalHours = accepted.reduce((acc, curr) => acc + curr.duracaoHoras, 0);
    const totalEarnings = accepted.reduce((acc, curr) => acc + curr.valorAjustado, 0);

    return {
      acceptedCount: accepted.length,
      pendingCount: pending.length,
      rejectedCount: rejected.length,
      totalHours,
      totalEarnings
    };
  }, [shifts]);

  // Actions
  const handleAccept = (id: string) => {
    setShifts(prev => prev.map(shift => {
      if (shift.id === id) {
        return { ...shift, status: "aceito" };
      }
      return shift;
    }));
    const shift = shifts.find(s => s.id === id);
    showToast(`Plantão no ${shift?.hospital || "Hospital"} incorporado à sua agenda pessoal com sucesso!`, "success");
  };

  const handleReject = (id: string, motivo?: string) => {
    setShifts(prev => prev.map(shift => {
      if (shift.id === id) {
        return { 
          ...shift, 
          status: "recusado",
          motivoRecusa: motivo || "Dispensado pelo médico (conflito de agenda ou descanso)" 
        };
      }
      return shift;
    }));
    showToast("Plantão descartado. Sua agenda continua 100% sob seu controle.", "info");
  };

  const handleSaveEdit = () => {
    if (!editingShift) return;
    setShifts(prev => prev.map(shift => {
      if (shift.id === editingShift.id) {
        return { 
          ...editingShift, 
          status: "editado" 
        };
      }
      return shift;
    }));
    setEditingShift(null);
    showToast(`Plantão editado e incorporado com novos valores e horários!`, "success");
  };

  const handleAddCustomShift = () => {
    if (!customShift.hospital || !customShift.setor) {
      showToast("Preencha o hospital e o setor para adicionar", "warn");
      return;
    }

    const newShift: ImportedShift = {
      id: `custom_${Date.now()}`,
      hospital: customShift.hospital,
      setor: customShift.setor,
      data: customShift.data,
      dataObj: "2026-08-26",
      horario: customShift.horario,
      duracaoHoras: Number(customShift.duracaoHoras),
      turno: customShift.turno,
      valorOriginal: Number(customShift.valor),
      valorAjustado: Number(customShift.valor),
      origemPlanilha: "Adicionado manualmente pelo médico",
      status: "aceito",
      notasPessoais: customShift.notasPessoais,
      corAgenda: "#0A84FF"
    };

    setShifts(prev => [newShift, ...prev]);
    setShowAddCustomModal(false);
    setCustomShift({
      hospital: "",
      setor: "",
      data: "Qua, 26 de Agosto",
      horario: "07:00 às 19:00",
      duracaoHoras: 12,
      turno: "Diurno",
      valor: 1700,
      notasPessoais: "Plantão avulso negociado diretamente"
    });
    showToast("Plantão avulso adicionado diretamente à sua agenda pessoal!", "success");
  };

  const handleReset = () => {
    setShifts(INITIAL_IMPORTED_SHIFTS);
    setActiveFilter("pendentes");
    setEditingShift(null);
    showToast("Exemplo de escala reiniciado para o estado original!", "info");
  };

  // Filtered list
  const filteredShifts = useMemo(() => {
    if (activeFilter === "todos") return shifts;
    if (activeFilter === "pendentes") return shifts.filter(s => s.status === "pendente");
    if (activeFilter === "aceitos") return shifts.filter(s => s.status === "aceito" || s.status === "editado");
    if (activeFilter === "recusados") return shifts.filter(s => s.status === "recusado");
    return shifts;
  }, [shifts, activeFilter]);

  return (
    <div id="doctor-portal-interactive-section" className="bg-[#151518] rounded-2xl border border-slate-800 p-6 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <User className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Portal do Médico — Recepção de Escalas & Autonomia de Agenda
                </h3>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  Interativo
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Simulação real de como o médico plantonista recebe as escalas geradas pelo gestor, decide o que aceitar, edita dados de repasse/turno ou descarta sem perder a autonomia.
              </p>
            </div>
          </div>
        </div>

        {/* TOP ACTIONS */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setShowAddCustomModal(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-3.5 rounded-xl shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Plantão Avulso</span>
          </button>
          <button
            onClick={handleReset}
            title="Resetar Demonstração"
            className="flex items-center gap-1.5 bg-[#0d0d0f] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs py-2 px-3 rounded-xl transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resetar</span>
          </button>
        </div>
      </div>

      {/* CORE PHILOSOPHY CALLOUT */}
      <div className="p-4 bg-gradient-to-r from-blue-950/20 via-[#1c1c21] to-[#151518] rounded-xl border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-white block">Princípio de Não-Sequestro de Agenda:</span>
            <p className="text-slate-300 leading-relaxed font-sans">
              O Plantão360 <strong>não impõe plantões na agenda</strong>. A IA processa a planilha do hospital e disponibiliza uma <em>sugestão estruturada</em>. O médico é soberano: aceita, corrige o valor real do repasse, muda o horário ou dispensa o turno livremente.
            </p>
          </div>
        </div>
      </div>

      {/* SUMMARY STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Plantões na Agenda</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {metrics.acceptedCount} <span className="text-xs font-normal text-slate-500 font-sans">confirmados</span>
          </div>
          <span className="text-[10px] text-green-400/90 block">Incorporados à sua rotina</span>
        </div>

        <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Previsão de Repasse</span>
            <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-blue-400 font-mono">
            R$ {metrics.totalEarnings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-400 block">Soma dos plantões ativos</span>
        </div>

        <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Carga Horária Total</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {metrics.totalHours} <span className="text-xs font-normal text-slate-500 font-sans">horas no mês</span>
          </div>
          <span className="text-[10px] text-purple-400/90 block">Tempo dedicado estimado</span>
        </div>

        <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Aguardando Decisão</span>
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono">
            {metrics.pendingCount} <span className="text-xs font-normal text-slate-500 font-sans">sugestões</span>
          </div>
          <span className="text-[10px] text-amber-400/90 block">Disponíveis para revisão</span>
        </div>
      </div>

      {/* TOAST FEEDBACK */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-xl text-xs font-sans flex items-center justify-between gap-2 ${
              feedbackToast.type === "success" 
                ? "bg-green-500/10 border border-green-500/30 text-green-300"
                : feedbackToast.type === "warn"
                ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                : "bg-blue-500/10 border border-blue-500/30 text-blue-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{feedbackToast.msg}</span>
            </div>
            <button onClick={() => setFeedbackToast(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-1.5 bg-[#0d0d0f] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveFilter("pendentes")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "pendentes" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sugestões Recebidas ({metrics.pendingCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter("aceitos")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "aceitos" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Minha Agenda Confirmada ({metrics.acceptedCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter("todos")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeFilter === "todos" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>Todos ({shifts.length})</span>
          </button>
          {metrics.rejectedCount > 0 && (
            <button
              onClick={() => setActiveFilter("recusados")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "recusados" 
                  ? "bg-rose-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Dispensados ({metrics.rejectedCount})</span>
            </button>
          )}
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          Exibindo {filteredShifts.length} {filteredShifts.length === 1 ? "registro" : "registros"}
        </span>
      </div>

      {/* SHIFTS LIST */}
      <div className="space-y-3">
        {filteredShifts.length === 0 ? (
          <div className="py-12 text-center bg-[#0d0d0f] rounded-xl border border-slate-800 space-y-3">
            <CalendarDays className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-sans">
              Nenhum plantão nesta visualização.
            </p>
            <button
              onClick={() => setActiveFilter("todos")}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              Ver todos os plantões
            </button>
          </div>
        ) : (
          filteredShifts.map((shift) => {
            const isAccepted = shift.status === "aceito";
            const isEdited = shift.status === "editado";
            const isPending = shift.status === "pendente";
            const isRejected = shift.status === "recusado";

            return (
              <div 
                key={shift.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isAccepted
                    ? "bg-[#0f1715] border-green-500/30 shadow-sm"
                    : isEdited
                    ? "bg-[#0f141f] border-blue-500/30 shadow-sm"
                    : isRejected
                    ? "bg-[#160d0e] border-rose-500/20 opacity-70"
                    : "bg-[#0d0d0f] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* LEFT: HOSPITAL & DATE INFO */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        {shift.hospital}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">· {shift.setor}</span>
                      
                      {/* STATUS BADGE */}
                      {isPending && (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          Sugestão Importada
                        </span>
                      )}
                      {isAccepted && (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Na Minha Agenda
                        </span>
                      )}
                      {isEdited && (
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Edit3 className="w-3 h-3" /> Editado & Incorporado
                        </span>
                      )}
                      {isRejected && (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          Dispensado da Agenda
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-sans">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <strong>{shift.data}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {shift.horario} ({shift.duracaoHoras}h · {shift.turno})
                      </span>
                      <span className="flex items-center gap-1 font-mono font-bold text-green-400">
                        <DollarSign className="w-3.5 h-3.5 text-green-500" />
                        R$ {shift.valorAjustado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        {shift.valorAjustado !== shift.valorOriginal && (
                          <span className="text-[10px] text-slate-500 line-through font-normal">
                            (de R$ {shift.valorOriginal})
                          </span>
                        )}
                      </span>
                    </div>

                    {/* SOURCE & PERSONAL NOTES */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-slate-500">
                        <FileSpreadsheet className="w-3 h-3 text-slate-500" />
                        Origem: <span className="text-slate-400">{shift.origemPlanilha}</span>
                      </span>
                      {shift.notasPessoais && (
                        <span className="text-blue-300/80 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 font-sans">
                          Nota: {shift.notasPessoais}
                        </span>
                      )}
                      {shift.motivoRecusa && (
                        <span className="text-rose-400/80 font-sans">
                          Motivo: {shift.motivoRecusa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: INTERACTIVE ACTION BUTTONS */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
                    {/* IF PENDING */}
                    {isPending && (
                      <>
                        <button
                          onClick={() => handleAccept(shift.id)}
                          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white font-semibold text-xs py-2 px-3.5 rounded-xl shadow-sm transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Aceitar na Agenda</span>
                        </button>
                        <button
                          onClick={() => setEditingShift(shift)}
                          className="flex items-center gap-1.5 bg-[#1a1a24] hover:bg-[#252535] border border-blue-500/30 text-blue-300 font-semibold text-xs py-2 px-3 rounded-xl transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar & Ajustar</span>
                        </button>
                        <button
                          onClick={() => handleReject(shift.id)}
                          className="flex items-center gap-1 bg-[#1a1314] hover:bg-rose-900/30 border border-rose-500/20 text-rose-300 text-xs py-2 px-2.5 rounded-xl transition cursor-pointer"
                          title="Dispensar este plantão"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Dispensar</span>
                        </button>
                      </>
                    )}

                    {/* IF ACCEPTED OR EDITED */}
                    {(isAccepted || isEdited) && (
                      <>
                        <button
                          onClick={() => setEditingShift(shift)}
                          className="flex items-center gap-1.5 bg-[#0d0d0f] hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs py-1.5 px-3 rounded-lg transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Modificar Detalhes</span>
                        </button>
                        <button
                          onClick={() => handleReject(shift.id, "Removido da agenda pelo médico")}
                          className="flex items-center gap-1 bg-[#0d0d0f] hover:bg-rose-900/20 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 text-xs py-1.5 px-2.5 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remover</span>
                        </button>
                      </>
                    )}

                    {/* IF REJECTED */}
                    {isRejected && (
                      <button
                        onClick={() => handleAccept(shift.id)}
                        className="flex items-center gap-1.5 bg-[#0d0d0f] hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs py-1.5 px-3 rounded-lg transition cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3 text-green-400" />
                        <span>Reincorporar à Agenda</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* EDIT MODAL / DRAWER */}
      <AnimatePresence>
        {editingShift && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151518] border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-blue-400" />
                  <h4 className="font-bold text-white text-sm">Personalizar Plantão na Sua Agenda</h4>
                </div>
                <button 
                  onClick={() => setEditingShift(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Ajuste os valores, horários e observações reais de acordo com seu acordo com o hospital ou disponibilidade:
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Hospital / Instituição:</label>
                  <input
                    type="text"
                    value={editingShift.hospital}
                    onChange={(e) => setEditingShift({ ...editingShift, hospital: e.target.value })}
                    className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Setor / Especialidade:</label>
                    <input
                      type="text"
                      value={editingShift.setor}
                      onChange={(e) => setEditingShift({ ...editingShift, setor: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Data:</label>
                    <input
                      type="text"
                      value={editingShift.data}
                      onChange={(e) => setEditingShift({ ...editingShift, data: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Horário:</label>
                    <input
                      type="text"
                      value={editingShift.horario}
                      onChange={(e) => setEditingShift({ ...editingShift, horario: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Duração (h):</label>
                    <input
                      type="number"
                      value={editingShift.duracaoHoras}
                      onChange={(e) => setEditingShift({ ...editingShift, duracaoHoras: Number(e.target.value) })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Repasse (R$):</label>
                    <input
                      type="number"
                      value={editingShift.valorAjustado}
                      onChange={(e) => setEditingShift({ ...editingShift, valorAjustado: Number(e.target.value) })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-green-400 font-bold font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Notas Pessoais / Lembretes:</label>
                  <textarea
                    rows={2}
                    value={editingShift.notasPessoais || ""}
                    onChange={(e) => setEditingShift({ ...editingShift, notasPessoais: e.target.value })}
                    placeholder="Ex: Levar carimbo, trocar passagem com colega..."
                    className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setEditingShift(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Salvar & Incorporar à Agenda</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CUSTOM SHIFT MODAL */}
      <AnimatePresence>
        {showAddCustomModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151518] border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <h4 className="font-bold text-white text-sm">Adicionar Plantão Avulso ou Consultório</h4>
                </div>
                <button 
                  onClick={() => setShowAddCustomModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Cadastre qualquer plantão particular, cobertura ou consultório próprio para manter toda a sua vida profissional em um único lugar:
              </p>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Local / Hospital:</label>
                    <input
                      type="text"
                      placeholder="Ex: Hospital Samaritano"
                      value={customShift.hospital}
                      onChange={(e) => setCustomShift({ ...customShift, hospital: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Setor / Atividade:</label>
                    <input
                      type="text"
                      placeholder="Ex: CTI Coronariana"
                      value={customShift.setor}
                      onChange={(e) => setCustomShift({ ...customShift, setor: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Data:</label>
                    <input
                      type="text"
                      value={customShift.data}
                      onChange={(e) => setCustomShift({ ...customShift, data: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Horário:</label>
                    <input
                      type="text"
                      value={customShift.horario}
                      onChange={(e) => setCustomShift({ ...customShift, horario: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Valor (R$):</label>
                    <input
                      type="number"
                      value={customShift.valor}
                      onChange={(e) => setCustomShift({ ...customShift, valor: Number(e.target.value) })}
                      className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-green-400 font-bold font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Observações:</label>
                  <input
                    type="text"
                    placeholder="Ex: Pagamento no dia 15 via PJ"
                    value={customShift.notasPessoais}
                    onChange={(e) => setCustomShift({ ...customShift, notasPessoais: e.target.value })}
                    className="w-full bg-[#0d0d0f] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddCustomShift}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Cadastrar na Minha Agenda</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER COMPARISON ACCORDION / HIGHLIGHT */}
      <div className="bg-[#0d0d0f] p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        <div>
          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block mb-1">
            ❌ O que os grandes sistemas fazem (e médicos odeiam):
          </span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Sistemas hospitalares tradicionais sequestram a agenda do médico, bloqueiam horários arbitrariamente e forçam o profissional a se adaptar ao software corporativo do hospital.
          </p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">
            ✅ A Alma do Plantão360 (Liberdade e Autonomia):
          </span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            A IA faz o trabalho pesado de ler a planilha caótica do hospital e entrega uma proposta estruturada. O médico decide o que fazer, ajusta valores e gerencia sua carreira em um só app.
          </p>
        </div>
      </div>
    </div>
  );
};
