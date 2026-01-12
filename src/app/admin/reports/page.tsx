"use client";

import React, { useState, useEffect } from "react";
import { 
  Loader2, Save, Plus, Edit3, Trash2, ChevronLeft, 
  Eye, ImageIcon, X, Upload, CarFront, Cpu, 
  Activity, Gauge, Zap, ShieldCheck, User,
  Disc, Fuel, Search, Layers
} from "lucide-react";

// Дефинираме типовете за данните вjsonData
interface ReportData {
  vin: string;
  year: string;
  mileage: string;
  engine: string;
  hp: string;
  gearbox: string;
  fuel: string;
  drivetrain: string;
  location: string;
  images: string[];
  paintData: Record<string, string>;
  exteriorStatus: string;
  exteriorNotes: string;
  interiorStatus: string;
  interiorNotes: string;
  engineStatus: string;
  engineNotes: string;
  suspensionStatus: string;
  suspensionNotes: string;
  brakesStatus: string;
  brakesNotes: string;
  diagnostics: string;
  ecuErrors: boolean;
  testDrive: string;
  finalVerdict: string;
}

export default function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const emptyData: ReportData = {
    vin: "", year: "", mileage: "", engine: "", hp: "",
    gearbox: "Автоматична", fuel: "Дизел", drivetrain: "AWD (4x4)",
    location: "София",
    images: [],
    paintData: { 
      "Преден капак": "", "Таван": "", "Багажник": "",
      "Калник ПЛ": "", "Калник ПД": "", "Калник ЗЛ": "", "Калник ЗД": "",
      "Врата ПЛ": "", "Врата ПД": "", "Врата ЗЛ": "", "Врата ЗД": "",
      "Колона А (Л):": "", "Колона А (Д):": "",
      "Колона B (Л):": "", "Колона B (Д):": ""
    },
    exteriorStatus: "Отличен", exteriorNotes: "",
    interiorStatus: "Отличен", interiorNotes: "",
    engineStatus: "Отличен", engineNotes: "",
    suspensionStatus: "Отличен", suspensionNotes: "",
    brakesStatus: "Отличен", brakesNotes: "",
    diagnostics: "", 
    ecuErrors: false,
    testDrive: "",
    finalVerdict: ""
  };

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    if (!editingReport.slug) {
      alert("ГРЕШКА: Първо напишете Линк (slug) горе!");
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append("slug", editingReport.slug); 
    Array.from(e.target.files).forEach(file => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.paths) {
        const currentImages = editingReport.data.images || [];
        setEditingReport({
          ...editingReport,
          data: { ...editingReport.data, images: [...currentImages, ...data.paths] }
        });
      }
    } catch (err) { alert("Грешка при качване"); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const handleSave = async () => {
    setError("");
    if (!editingReport.carModel || !editingReport.slug) return setError("Марка и Линк са задължителни!");
    setLoading(true);
    const payload = { ...editingReport, jsonData: JSON.stringify(editingReport.data) };
    try {
      const res = await fetch("/api/reports", {
        method: editingReport.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setEditingReport(null); fetchReports(); }
      else { const d = await res.json(); setError(d.error); }
    } catch (e) { setError("Грешка при запис"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-[1400px] mx-auto">
        
        {!editingReport ? (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 mt-10">
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">Инспекции</h1>
              <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em]">FileVerified Admin Terminal</p>
            </div>
            <button onClick={() => setEditingReport({ slug: "", carModel: "", clientName: "", data: { ...emptyData }, isPublished: false })} 
              className="w-full md:w-auto bg-blue-600 text-white px-12 py-6 rounded-3xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 hover:scale-[1.02] transition-all">
              <Plus size={28} /> НОВ РЕПОРТ
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden mb-20 animate-in fade-in zoom-in duration-300">
             
             <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
                <button onClick={() => setEditingReport(null)} className="font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase text-[10px] tracking-widest transition-colors">
                  <ChevronLeft size={20}/> Отказ
                </button>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-600" size={24} />
                  <span className="font-black uppercase text-xs tracking-widest text-slate-800 italic underline decoration-blue-500 decoration-4 underline-offset-4">Редактиране на Доклад</span>
                </div>
            </div>

            <div className="p-8 md:p-16 space-y-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <InputGroup label="Марка и Модел" icon={<CarFront size={18}/>}>
                  <input className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-black text-xl border-2 border-transparent focus:border-blue-500 transition-all shadow-inner" placeholder="Audi RS6 C8" value={editingReport.carModel} onChange={(e) => setEditingReport({...editingReport, carModel: e.target.value})} />
                </InputGroup>
                <InputGroup label="Линк (Slug)" icon={<Activity size={18}/>}>
                  <input className="w-full p-5 bg-blue-50 border-2 border-blue-100 text-blue-700 rounded-2xl outline-none font-bold text-xl" placeholder="audi-rs6-ivan" value={editingReport.slug} onChange={(e) => setEditingReport({...editingReport, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                </InputGroup>
                <InputGroup label="Клиент" icon={<User size={18}/>}>
                  <input className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold text-xl border-2 border-transparent focus:border-blue-500 shadow-inner" placeholder="Име на клиент" value={editingReport.clientName} onChange={(e) => setEditingReport({...editingReport, clientName: e.target.value})} />
                </InputGroup>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 shadow-2xl">
                  <DarkInput label="VIN Номер" value={editingReport.data.vin} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, vin: v.toUpperCase()}})} />
                  <DarkInput label="Година" value={editingReport.data.year} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, year: v}})} />
                  <DarkInput label="Пробег" value={editingReport.data.mileage} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, mileage: v}})} />
                  <DarkInput label="Двигател" value={editingReport.data.engine} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, engine: v}})} />
                  <DarkInput label="Мощност (hp)" value={editingReport.data.hp} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, hp: v}})} />
                  <SelectInput label="Трансмисия" value={editingReport.data.gearbox} options={["Автоматична", "Ръчна", "DSG", "CVT"]} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, gearbox: v}})} />
                  <SelectInput label="Гориво" value={editingReport.data.fuel} options={["Дизел", "Бензин", "Хибрид", "Електрическа"]} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, fuel: v}})} />
                  <SelectInput label="Задвижване" value={editingReport.data.drivetrain} options={["AWD (4x4)", "RWD (Задно)", "FWD (Предно)"]} onChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, drivetrain: v}})} />
              </div>

              <section className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
                <Layers className="absolute -right-10 -top-10 w-40 h-40 text-slate-50 rotate-12" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-10 flex items-center gap-3">
                  <Gauge size={24} /> Измерване на ЛКП (μm)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                  {Object.keys(editingReport.data.paintData).map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{key}</label>
                      <input 
                        type="number"
                        className="w-full p-4 bg-slate-50 rounded-2xl font-black text-center text-lg focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none border border-transparent focus:border-blue-400"
                        value={editingReport.data.paintData[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newPaint = { ...editingReport.data.paintData, [key]: e.target.value };
                          setEditingReport({ ...editingReport, data: { ...editingReport.data, paintData: newPaint } });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <StatusCard label="Екстериор" icon={<CarFront />} status={editingReport.data.exteriorStatus} onStatusChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, exteriorStatus: v}})} notes={editingReport.data.exteriorNotes} onNotesChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, exteriorNotes: v}})} />
                <StatusCard label="Интериор" icon={<Search />} status={editingReport.data.interiorStatus} onStatusChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, interiorStatus: v}})} notes={editingReport.data.interiorNotes} onNotesChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, interiorNotes: v}})} />
                <StatusCard label="Двигател" icon={<Zap />} status={editingReport.data.engineStatus} onStatusChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, engineStatus: v}})} notes={editingReport.data.engineNotes} onNotesChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, engineNotes: v}})} />
                <StatusCard label="Окачване" icon={<Disc />} status={editingReport.data.suspensionStatus} onStatusChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, suspensionStatus: v}})} notes={editingReport.data.suspensionNotes} onNotesChange={(v: string) => setEditingReport({...editingReport, data: {...editingReport.data, suspensionNotes: v}})} />
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black uppercase text-xs tracking-widest text-blue-400 flex items-center gap-2"><Cpu /> Компютърна Диагностика</h3>
                    <label className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                      <input type="checkbox" checked={editingReport.data.ecuErrors} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingReport({...editingReport, data: {...editingReport.data, ecuErrors: e.target.checked}})} className="w-5 h-5 accent-blue-500" />
                      <span className="text-[10px] font-black uppercase">Активни Грешки</span>
                    </label>
                  </div>
                  <textarea className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none min-h-[150px] font-medium text-slate-300 italic" placeholder="Заключение от диагностиката..." value={editingReport.data.diagnostics} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingReport({...editingReport, data: {...editingReport.data, diagnostics: e.target.value}})} />
              </div>

              <div className="space-y-4">
                  <h3 className="font-black uppercase text-sm tracking-[0.3em] text-blue-600 ml-6 italic">ЕКСПЕРТНО ЗАКЛЮЧЕНИЕ</h3>
                  <textarea className="w-full bg-blue-600 text-white p-12 rounded-[4rem] outline-none font-black text-2xl shadow-2xl shadow-blue-200 placeholder:text-blue-300 min-h-[200px]" placeholder="Финална присъда..." value={editingReport.data.finalVerdict} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingReport({...editingReport, data: {...editingReport.data, finalVerdict: e.target.value}})} />
              </div>

              <section className={`p-10 rounded-[4rem] border-4 transition-all ${!editingReport.slug ? 'bg-slate-50 border-slate-100 opacity-50' : 'bg-white border-dashed border-blue-200'}`}>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                  <div>
                    <h3 className="text-slate-900 font-black text-2xl uppercase tracking-tighter flex items-center gap-3"><ImageIcon className="text-blue-600" size={32}/> Фотодоклад ({editingReport.data.images?.length || 0})</h3>
                  </div>
                  <label className={`w-full lg:w-auto px-16 py-8 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl ${!editingReport.slug ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 text-white cursor-pointer hover:bg-slate-900'}`}>
                    {uploading ? <Loader2 className="animate-spin" size={32}/> : <Upload size={32}/>}
                    КАЧИ СНИМКИ
                    <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading || !editingReport.slug} />
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {editingReport.data.images?.map((img: string, i: number) => (
                    <div key={i} className="relative group aspect-square rounded-[2rem] overflow-hidden shadow-lg bg-slate-100 border-4 border-white">
                      <img src={`/api/files?path=${img}`} className="w-full h-full object-cover" alt="car" />
                      <button onClick={() => {
                         const filtered = editingReport.data.images.filter((_: any, idx: number) => idx !== i);
                         setEditingReport({ ...editingReport, data: { ...editingReport.data, images: filtered } });
                      }} className="absolute inset-0 bg-red-600/90 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xs uppercase tracking-widest">
                        <X size={32} className="mb-2" /> Изтрий
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-col lg:flex-row gap-8 pt-10">
                <div className="flex-1 flex items-center gap-6 p-10 bg-white rounded-[3rem] border-4 border-slate-100 shadow-inner">
                  <input type="checkbox" id="pub" checked={editingReport.isPublished} onChange={(e) => setEditingReport({...editingReport, isPublished: e.target.checked})} className="w-12 h-12 accent-emerald-500 cursor-pointer" />
                  <label htmlFor="pub" className="font-black text-slate-800 uppercase tracking-widest text-lg cursor-pointer">Публикувай</label>
                </div>
                <button onClick={handleSave} disabled={loading} className="flex-[2] bg-slate-900 text-white py-10 rounded-[3.5rem] font-black text-3xl flex items-center justify-center gap-6 hover:bg-blue-600 transition-all shadow-2xl">
                  {loading ? <Loader2 className="animate-spin" size={40} /> : <Save size={40} />} ГЕНЕРИРАЙ ОТЧЕТ
                </button>
              </div>

              {error && <div className="p-8 bg-red-50 text-red-600 rounded-[2.5rem] border-4 border-red-100 font-black text-center uppercase text-lg">{error}</div>}
            </div>
          </div>
        )}

        {/* СПИСЪК */}
        {!editingReport && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {reports.map((r: any) => (
              <div key={r.id} className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-xl flex flex-col justify-between group hover:border-blue-500 transition-all">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900">{r.carModel}</h3>
                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mt-2">{r.clientName}</p>
                  </div>
                  <span className={`text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-[0.2em] ${r.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {r.isPublished ? 'LIVE' : 'DRAFT'}
                  </span>
                </div>
                <div className="flex gap-3">
                  <a href={`/report/${r.slug}`} target="_blank" className="flex-1 bg-slate-50 p-6 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"><Eye size={24} /></a>
                  <button onClick={() => setEditingReport({ ...r, data: JSON.parse(r.jsonData) })} className="flex-1 bg-slate-50 p-6 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={24} /></button>
                  <button onClick={async () => { if (confirm("Изтриване?")) { await fetch(`/api/reports?id=${r.id}`, { method: "DELETE" }); fetchReports(); } }} className="flex-1 bg-slate-50 p-6 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={24} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- ТИПИЗИРАНИ UI HELPERS ---

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
function InputGroup({ label, icon, children }: InputGroupProps) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

interface DarkInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}
function DarkInput({ label, value, onChange }: DarkInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{label}</label>
      <input 
        className="p-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-black text-white text-lg focus:border-blue-500 focus:bg-white/10 transition-all" 
        value={value} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
      />
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}
function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{label}</label>
      <select 
        className="p-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-black text-white text-lg focus:border-blue-500 appearance-none cursor-pointer" 
        value={value} 
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        {options.map((opt: string) => <option key={opt} className="bg-slate-900 text-white font-bold">{opt}</option>)}
      </select>
    </div>
  );
}

interface StatusCardProps {
  label: string;
  icon: React.ReactNode;
  status: string;
  onStatusChange: (v: string) => void;
  notes: string;
  onNotesChange: (v: string) => void;
}
function StatusCard({ label, icon, status, onStatusChange, notes, onNotesChange }: StatusCardProps) {
  const getStatusColor = (s: string) => {
    if (s === "Отличен") return "bg-emerald-500";
    if (s === "Добър") return "bg-blue-500";
    if (s === "Забележки") return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 space-y-6 shadow-sm group hover:shadow-xl transition-all duration-500">
      <div className="flex justify-between items-center">
        <h3 className="font-black uppercase text-xs tracking-widest text-slate-500 flex items-center gap-3">
          <span className="text-blue-600">{icon}</span> {label}
        </h3>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(status)}`}></div>
           <select 
              value={status} 
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onStatusChange(e.target.value)} 
              className="bg-slate-50 p-3 rounded-xl font-black text-xs uppercase tracking-tighter cursor-pointer outline-none border-none"
            >
            <option>Отличен</option>
            <option>Добър</option>
            <option>Забележки</option>
            <option>Критичен</option>
          </select>
        </div>
      </div>
      <textarea 
        className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none text-base font-bold italic min-h-[120px] border-2 border-transparent focus:border-blue-100 transition-all shadow-inner"
        placeholder={`Бележки за ${label.toLowerCase()}...`}
        value={notes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onNotesChange(e.target.value)}
      />
    </div>
  );
}