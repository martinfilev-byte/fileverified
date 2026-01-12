"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Plus, Edit3, Trash2, ChevronLeft, AlertCircle, Eye, ImageIcon, X, Upload, Info } from "lucide-react";

export default function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const emptyData = {
    vin: "", year: "", mileage: "", images: [] as string[],
    paintData: { "Преден капак": "", "Таван": "", "Предна лява врата": "", "Предна дясна врата": "", "Задна лява врата": "", "Задна дясна врата": "", "Заден капак": "" },
    diagnostics: "", finalVerdict: ""
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
    
    // Проверка за slug
    if (!editingReport.slug) {
      alert("ГРЕШКА: Първо напишете Линк (slug) горе, за да знам в коя папка да сложа снимките!");
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append("slug", editingReport.slug); 
    Array.from(e.target.files).forEach(file => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (!res.ok) {
        alert("Грешка от сървъра: " + data.error);
        return;
      }

      if (data.paths) {
        const currentImages = editingReport.data.images || [];
        setEditingReport({
          ...editingReport,
          data: { ...editingReport.data, images: [...currentImages, ...data.paths] }
        });
      }
    } catch (err) { 
      alert("Няма връзка с API-то за качване.");
    } finally { 
      setUploading(false); 
      e.target.value = ''; // Изчистваме инпута за следващо качване
    }
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
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900 mt-10">
      <div className="max-w-5xl mx-auto">
        {/* СПИСЪК И ХЕДЪР (същият като преди) */}
        {!editingReport ? (
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black uppercase">Инспекции</h1>
            <button onClick={() => setEditingReport({ slug: "", carModel: "", clientName: "", data: { ...emptyData }, isPublished: false })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"><Plus /> НОВ ОТЧЕТ</button>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
             {/* РЕДАКТОР */}
             <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
              <button onClick={() => setEditingReport(null)} className="font-bold text-slate-400 hover:text-slate-900 flex items-center gap-2"><ChevronLeft size={20}/> ОТКАЗ</button>
              <h2 className="font-black uppercase text-sm italic tracking-widest text-slate-300">Инспекторски панел</h2>
            </div>

            <div className="p-8 space-y-12">
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
                <input className="px-6 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="Марка и Модел" value={editingReport.carModel} onChange={(e) => setEditingReport({...editingReport, carModel: e.target.value})} />
                <input className="px-6 py-4 bg-blue-50/50 border-2 border-blue-100 rounded-2xl outline-none" placeholder="Линк (slug)" value={editingReport.slug} onChange={(e) => setEditingReport({...editingReport, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                <input className="px-6 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="Клиент" value={editingReport.clientName} onChange={(e) => setEditingReport({...editingReport, clientName: e.target.value})} />
              </section>

              {/* СЕКЦИЯ ГАЛЕРИЯ */}
              <section className={`p-8 rounded-[2rem] border-2 transition-all ${!editingReport.slug ? 'bg-slate-50 border-slate-100 opacity-50' : 'bg-white border-dashed border-blue-200 shadow-inner'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-blue-600 font-black text-xs uppercase flex items-center gap-2"><ImageIcon size={16}/> Снимки за {editingReport.slug || '...'}</h3>
                  <label className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${!editingReport.slug ? 'bg-slate-300 cursor-not-allowed opacity-50' : 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'}`}>
                    {uploading ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
                    ИЗСИПИ СНИМКИТЕ ТУК
                    <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading || !editingReport.slug} />
                  </label>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {editingReport.data.images?.map((img: string, i: number) => (
                    <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden shadow-md bg-slate-100 border-2 border-white">
                      <img src={`/api/files?path=${img}`} className="w-full h-full object-cover" alt="car" />
                      <button onClick={() => {
                         const filtered = editingReport.data.images.filter((_: any, idx: number) => idx !== i);
                         setEditingReport({ ...editingReport, data: { ...editingReport.data, images: filtered } });
                      }} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"><X size={14}/></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* ТЕХНИЧЕСКИ ПОЛЕТА */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="VIN" value={editingReport.data.vin} onChange={(e) => setEditingReport({...editingReport, data: {...editingReport.data, vin: e.target.value}})} />
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="Година" value={editingReport.data.year} onChange={(e) => setEditingReport({...editingReport, data: {...editingReport.data, year: e.target.value}})} />
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="Пробег" value={editingReport.data.mileage} onChange={(e) => setEditingReport({...editingReport, data: {...editingReport.data, mileage: e.target.value}})} />
              </section>

              <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-3xl">
                <input type="checkbox" id="pub" checked={editingReport.isPublished} onChange={(e) => setEditingReport({...editingReport, isPublished: e.target.checked})} className="w-6 h-6 accent-blue-600" />
                <label htmlFor="pub" className="font-bold text-slate-700">ПУБЛИКУВАЙ</label>
              </div>

              {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold uppercase text-xs">{error}</div>}

              <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl transition-all">
                {loading ? <Loader2 className="animate-spin" /> : <Save size={24} />} ЗАПАЗИ ОТЧЕТА
              </button>
            </div>
          </div>
        )}

        {/* СПИСЪК С ОТЧЕТИ */}
        {!editingReport && (
          <div className="grid gap-4 mt-10">
            {reports.map((r: any) => (
              <div key={r.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">{r.carModel}</span>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-black uppercase ${r.isPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {r.isPublished ? 'Публикуван' : 'Чернова'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">Клиент: {r.clientName} • Линк: /report/{r.slug}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`/report/${r.slug}`} target="_blank" className="bg-slate-50 p-4 rounded-2xl hover:text-emerald-600 text-slate-400"><Eye size={20} /></a>
                  <button onClick={() => setEditingReport({ ...r, data: JSON.parse(r.jsonData) })} className="bg-slate-50 p-4 rounded-2xl hover:text-blue-600 text-slate-400"><Edit3 size={20} /></button>
                  <button onClick={async () => { if (confirm("Изтриване?")) { await fetch(`/api/reports?id=${r.id}`, { method: "DELETE" }); fetchReports(); } }} className="bg-slate-50 p-4 rounded-2xl hover:text-red-600 text-slate-300"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}