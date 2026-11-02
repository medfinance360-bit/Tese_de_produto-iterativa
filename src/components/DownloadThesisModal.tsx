import React, { useState } from "react";
import { 
  FileDown, 
  FileText, 
  Code, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Building2, 
  HelpCircle,
  FileCheck2,
  Download,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  downloadThesisFullPDF, 
  downloadThesisMarkdown, 
  downloadThesisJSON,
  exportDecisionsCSV
} from "../utils/thesisExporter";
import { DecisionQuestion } from "../data";

interface DownloadThesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  decisions: DecisionQuestion[];
  mvpComplexityText: string;
}

export const DownloadThesisModal: React.FC<DownloadThesisModalProps> = ({
  isOpen,
  onClose,
  decisions,
  mvpComplexityText
}) => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    downloadThesisFullPDF({ decisions, mvpComplexityText });
    setDownloadedFormat("PDF");
    setTimeout(() => setDownloadedFormat(null), 3500);
  };

  const handleDownloadMD = () => {
    downloadThesisMarkdown({ decisions, mvpComplexityText });
    setDownloadedFormat("Markdown (.md)");
    setTimeout(() => setDownloadedFormat(null), 3500);
  };

  const handleDownloadJSON = () => {
    downloadThesisJSON({ decisions, mvpComplexityText });
    setDownloadedFormat("JSON (.json)");
    setTimeout(() => setDownloadedFormat(null), 3500);
  };

  const handleDownloadCSV = () => {
    exportDecisionsCSV(decisions, mvpComplexityText);
    setDownloadedFormat("Histórico de Decisões (.csv)");
    setTimeout(() => setDownloadedFormat(null), 3500);
  };

  const handleDownloadAll = () => {
    downloadThesisFullPDF({ decisions, mvpComplexityText });
    setTimeout(() => downloadThesisMarkdown({ decisions, mvpComplexityText }), 300);
    setTimeout(() => downloadThesisJSON({ decisions, mvpComplexityText }), 600);
    setTimeout(() => exportDecisionsCSV(decisions, mvpComplexityText), 900);
    setDownloadedFormat("Pacote Completo (PDF + MD + JSON + CSV)");
    setTimeout(() => setDownloadedFormat(null), 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#151518] border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-blue-950/30 via-[#151518] to-[#151518] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Download do Documento Completo da Tese
                </h3>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  Oficial
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Exporte todo o alinhamento estratégico, diretrizes de arquitetura, brand system e planos de engenharia.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK BANNER */}
        <AnimatePresence>
          {downloadedFormat && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-500/10 border-b border-green-500/20 px-6 py-2.5 flex items-center gap-2 text-green-300 text-xs font-sans"
            >
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>Download de <strong>{downloadedFormat}</strong> iniciado com sucesso!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans">
          
          {/* WHAT IS INCLUDED */}
          <div className="bg-[#0d0d0f] rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Conteúdo Unificado no Arquivo Exportado:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Resumo Executivo & Tese de Autonomia Médica</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Modelo de Negócio, Pricing & Unit Economics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Além da Escala: Catálogo de KPIs & Predição</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Conciliação de Plantões & Repasses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Brand System Oficial & Paleta Hex (#0A84FF)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Módulos de Arquitetura (Médico + Gestor)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Plano de Reúso ElevaLaudo (70% aceleração)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>Matriz de Riscos Críticos e Mitigações</span>
              </div>
            </div>
          </div>

          {/* DOWNLOAD CARDS */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
              Selecione o Formato Desejado:
            </label>

            {/* FORMAT 1: PDF */}
            <div className="p-4 rounded-xl bg-[#0d0d0f] border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Relatório Executivo em PDF</span>
                    <span className="bg-rose-500/10 text-rose-400 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold">.PDF</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Formatado profissionalmente para impressão, apresentações executivas e leitura executiva com tabelas e identidade visual.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-3.5 rounded-xl transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar PDF</span>
              </button>
            </div>

            {/* FORMAT 2: MARKDOWN */}
            <div className="p-4 rounded-xl bg-[#0d0d0f] border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Documento em Markdown Completo</span>
                    <span className="bg-blue-500/10 text-blue-400 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold">.MD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Texto integral estruturado com sintaxe Markdown. Perfeito para importar no Notion, Obsidian, GitHub ou documentação de engenharia.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadMD}
                className="shrink-0 flex items-center gap-1.5 bg-[#1f2937] hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs py-2 px-3.5 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .MD</span>
              </button>
            </div>

            {/* FORMAT 3: JSON */}
            <div className="p-4 rounded-xl bg-[#0d0d0f] border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Dados Estruturados em JSON</span>
                    <span className="bg-amber-500/10 text-amber-400 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold">.JSON</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Arquivo de dados brutos com todos os objetos, matrizes de oportunidades, scores numéricos e definições de arquitetura.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadJSON}
                className="shrink-0 flex items-center gap-1.5 bg-[#1f2937] hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs py-2 px-3.5 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .JSON</span>
              </button>
            </div>

            {/* FORMAT 4: CSV (DECISÕES DO FUNDADOR) */}
            <div className="p-4 rounded-xl bg-[#0d0d0f] border border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Histórico de Decisões do Fundador</span>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold">.CSV</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Planilha compatível com Microsoft Excel e Google Sheets com todas as escolhas selecionadas, justificativas e impactos no MVP.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="shrink-0 flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs py-2 px-3.5 rounded-xl border border-emerald-600/40 transition cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-5 border-t border-slate-800 bg-[#0d0d0f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            Plantão360° · Documento de Engenharia e Tese Estratégica
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs transition cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={handleDownloadAll}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Todos os Formatos</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
