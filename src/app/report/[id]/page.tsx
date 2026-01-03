"use client"

import React from "react"
import { useParams } from "next/navigation"
import { 
  CheckCircle2, XCircle, Camera, Download, Car, Info, FileText,
  Clock, MapPin, Calendar, Gauge, Phone, AlertTriangle, ShieldCheck,
  Disc, Activity, Search
} from "lucide-react"

export default function LKWProfessionalReport() {
  const params = useParams()
  const reportId = params.id

  const data = {
    vin: "WBA7N7140A12345",
    licensePlate: "CB 1234 MH",
    make: "BMW",
    model: "530d xDrive (G30)",
    year: "2018",
    mileage: "142,500 км",
    engine: "3.0L Diesel / 265hp",
    nasLink: "https://your-nas-link.com/share/XYZ",
    inspectionScore: "7.8",
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans text-slate-900">
      {/* HEADER STRIP */}
      <div className="bg-[#0f172a] text-white sticky top-16 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-2 rounded">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Technical Inspection Report</h1>
              <p className="text-[10px] text-emerald-400 uppercase font-black tracking-[0.2em]">ID: {reportId || "02213"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={data.nasLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-black text-xs flex items-center gap-2 transition-all uppercase shadow-lg shadow-emerald-900/20">
              <Camera className="w-4 h-4" /> Gallery & Video
            </a>
            <button onClick={() => window.print()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-xs font-black transition-all uppercase flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        
        {/* SECTION 1: VEHICLE CORE DATA */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b flex items-center justify-between">
              <h2 className="font-black uppercase text-sm flex items-center gap-2 italic"><Car className="w-4 h-4 text-emerald-600" /> Vehicle Specification</h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">OFFICIAL DATA</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <DataTile label="Brand" value={data.make} />
              <DataTile label="Model" value={data.model} />
              <DataTile label="Year" value={data.year} />
              <DataTile label="Mileage" value={data.mileage} />
              <DataTile label="VIN Number" value={data.vin} colSpan="sm:col-span-2" />
              <DataTile label="Plate" value={data.licensePlate} />
              <DataTile label="Engine" value={data.engine} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase italic">Final Verdict</div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Condition Score</p>
            <div className="text-7xl font-black text-slate-900 mb-2 leading-none">{data.inspectionScore}<span className="text-2xl text-slate-300">/10</span></div>
            <div className="text-emerald-600 font-black text-sm uppercase tracking-widest italic">Highly Recommended</div>
          </div>
        </div>

        {/* SECTION 2: BRAKES & TIRES (LKW STYLE) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b flex items-center gap-2">
            <Disc className="w-4 h-4 text-emerald-600" />
            <h2 className="font-black uppercase text-sm italic">Wheels, Tires & Braking System</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 uppercase font-black border-b"><th className="pb-2 text-left">Tires Position</th><th className="pb-2">Brand/DOT</th><th className="pb-2 text-right">Depth (mm)</th></tr>
              </thead>
              <tbody className="font-bold divide-y divide-slate-50">
                <TireRow pos="Front Left" brand="Michelin / 2023" depth="6.5 mm" />
                <TireRow pos="Front Right" brand="Michelin / 2023" depth="6.4 mm" />
                <TireRow pos="Rear Left" brand="Michelin / 2023" depth="5.8 mm" />
                <TireRow pos="Rear Right" brand="Michelin / 2023" depth="5.8 mm" />
              </tbody>
            </table>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 uppercase font-black border-b"><th className="pb-2 text-left">Brakes</th><th className="pb-2">Condition</th><th className="pb-2 text-right">Wear %</th></tr>
              </thead>
              <tbody className="font-bold divide-y divide-slate-50">
                <TireRow pos="Front Discs" brand="Original BMW" depth="20%" />
                <TireRow pos="Front Pads" brand="ATE Ceramic" depth="15%" />
                <TireRow pos="Rear Discs" brand="Original BMW" depth="30%" />
                <TireRow pos="Rear Pads" brand="ATE Ceramic" depth="25%" />
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: FULL CHECKLIST */}
        <div className="grid md:grid-cols-2 gap-6">
          <ChecklistGroup title="Engine & Drivetrain">
            <CheckItem label="Engine Oil Level & Quality" status="ok" />
            <CheckItem label="Coolant System / Leaks" status="ok" />
            <CheckItem label="Transmission Shifting" status="ok" />
            <CheckItem label="Turbocharger Operation" status="ok" />
            <CheckItem label="Exhaust System" status="ok" />
          </ChecklistGroup>

          <ChecklistGroup title="Bodywork & Paint">
            <CheckItem label="Paint Thickness Test" status="warn" desc="Hood repainted (210μm)" />
            <CheckItem label="Chassis / Frame Integrity" status="ok" />
            <CheckItem label="Glass / Mirrors Condition" status="ok" />
            <CheckItem label="Door Seals & Alignment" status="ok" />
            <CheckItem label="Underbody Rust Check" status="ok" />
          </ChecklistGroup>

          <ChecklistGroup title="Electronics & Interior">
            <CheckItem label="OBD II Diagnostic Scan" status="ok" />
            <CheckItem label="Air Conditioning System" status="ok" />
            <CheckItem label="Dashboard Warning Lights" status="ok" />
            <CheckItem label="Seat & Upholstery Wear" status="ok" />
            <CheckItem label="Navigation / Infotainment" status="ok" />
          </ChecklistGroup>

          <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-emerald-400 font-black uppercase text-xs mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" /> Expert Summary
              </h3>
              <p className="text-slate-300 italic text-sm leading-relaxed">
                "The vehicle is in very good mechanical condition. Computer diagnostics showed no active faults. The repainted hood is due to stone chips, not a structural accident. All service records are verified."
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-black text-xl">MF</div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500">Inspector</p>
                <p className="font-bold text-sm">Martin Filev (FileVerified)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* HELPER COMPONENTS */

function DataTile({ label, value, colSpan = "" }: { label: string, value: string, colSpan?: string }) {
  return (
    <div className={`p-6 border-r border-b border-slate-100 last:border-r-0 ${colSpan}`}>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <p className="text-xs font-black text-slate-800 uppercase leading-none">{value}</p>
    </div>
  )
}

function ChecklistGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b">
        <h3 className="font-black uppercase text-xs text-slate-500 italic">{title}</h3>
      </div>
      <div className="divide-y divide-slate-50">{children}</div>
    </div>
  )
}

function CheckItem({ label, status, desc }: { label: string, status: 'ok' | 'warn' | 'error', desc?: string }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between group hover:bg-slate-50 transition-colors">
      <div>
        <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">{label}</p>
        {desc && <p className="text-[10px] text-amber-600 font-bold italic mt-0.5 uppercase">{desc}</p>}
      </div>
      {status === 'ok' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-amber-500" />
      )}
    </div>
  )
}

function TireRow({ pos, brand, depth }: { pos: string, brand: string, depth: string }) {
  return (
    <tr>
      <td className="py-3 text-slate-500 uppercase tracking-tighter">{pos}</td>
      <td className="py-3 text-center">{brand}</td>
      <td className="py-3 text-right text-emerald-600 font-black">{depth}</td>
    </tr>
  )
}