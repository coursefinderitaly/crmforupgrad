import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  DollarSign,
  UserCheck,
  Check,
  Plane,
  CreditCard,
  Phone,
  Home,
  Luggage,
  Sparkles,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { PreDepartureData, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const PreDepartureView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updatePreDepartureDossier,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default pre-departure dossier
  const preDeparture: PreDepartureData = student.preDepartureDossier || {
    flightBooked: true,
    airline: 'Air India / ITA Airways',
    flightNo: 'AI-137 (DEL -> MXP)',
    departureDate: '28 Aug 2026',
    departureCity: 'New Delhi (DEL)',
    arrivalAirport: 'Milan Malpensa (MXP)',
    arrivalDate: '28 Aug 2026',
    airportPickupScheduled: true,
    pickupDriverContact: '+39 349 123 4567 (Marco - Padova Student Buddy)',
    codiceFiscaleStatus: 'Generated & Verified',
    codiceFiscaleNumber: 'SHRHLM99R15Z222X',
    forexCardIssued: true,
    forexCardNumber: '**** **** **** 8421 (Niyo Global / Thomas Cook)',
    eSimActivated: true,
    italianSimNumber: '+39 331 987 6543 (Iliad 150GB 5G)',
    permessoKitReady: true,
    accommodationAddress: 'Residenza Universitaria Copernico, Via Copernico 9, Padova (Italy)',
    orientationAttended: true,
    orientationDate: '20 Aug 2026',
    lifecycleStatus: 'Pre-Departure Briefing',
    notes: 'Pre-departure webinar completed. Codice Fiscale issued by Italian Consulate. Pickup confirmed at MXP Terminal 1.',
  };

  const [lifecycleStatus, setLifecycleStatus] = useState<PreDepartureData['lifecycleStatus']>(
    preDeparture.lifecycleStatus
  );
  const [flightNo, setFlightNo] = useState(preDeparture.flightNo || 'AI-137 (DEL -> MXP)');
  const [departureDate, setDepartureDate] = useState(preDeparture.departureDate || '28 Aug 2026');
  const [arrivalAirport, setArrivalAirport] = useState(preDeparture.arrivalAirport || 'Milan Malpensa (MXP)');
  const [codiceFiscale, setCodiceFiscale] = useState(preDeparture.codiceFiscaleNumber || 'SHRHLM99R15Z222X');
  const [accommodation, setAccommodation] = useState(preDeparture.accommodationAddress || '');
  const [pickupContact, setPickupContact] = useState(preDeparture.pickupDriverContact || '');
  const [simNumber, setSimNumber] = useState(preDeparture.italianSimNumber || '');
  const [permessoReady, setPermessoReady] = useState(preDeparture.permessoKitReady);
  const [orientationDone, setOrientationDone] = useState(preDeparture.orientationAttended);
  const [forexDone, setForexDone] = useState(preDeparture.forexCardIssued);
  const [isSaved, setIsSaved] = useState(false);
  const [showEnrolledCelebration, setShowEnrolledCelebration] = useState(false);

  const handleSave = () => {
    updatePreDepartureDossier(student.id, {
      ...preDeparture,
      lifecycleStatus,
      flightNo,
      departureDate,
      arrivalAirport,
      codiceFiscaleNumber: codiceFiscale,
      accommodationAddress: accommodation,
      pickupDriverContact: pickupContact,
      italianSimNumber: simNumber,
      permessoKitReady: permessoReady,
      orientationAttended: orientationDone,
      forexCardIssued: forexDone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleMarkEnrolledAbroad = () => {
    setLifecycleStatus('Enrolled Abroad 🎉');
    updatePreDepartureDossier(student.id, {
      ...preDeparture,
      lifecycleStatus: 'Enrolled Abroad 🎉',
    });
    advanceToStage(
      student.id,
      'completed',
      `🎉 MISSION COMPLETE! ${student.name} is officially landed & enrolled abroad at ${student.targetUniversity || 'destination university'}!`
    );
    setShowEnrolledCelebration(true);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="pre-departure"
        stageNumber={12}
        totalStages={12}
        title="Pre-Departure Orientation, Relocation &amp; Arrival"
        subtitle="Coordinate flight bookings, airport pickup, Italian Codice Fiscale, European eSIMs, Forex cards, and 8-day Permesso di Soggiorno kits"
        icon={Compass}
        iconColor="text-violet-600"
        iconBg="bg-violet-50"
        previousRoute={{ id: 'visa-process', label: 'Visa Process' }}
        advanceButtonText="Mark Enrolled Abroad 🎉"
        onAdvanceStage={handleMarkEnrolledAbroad}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Dossier'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {lifecycleStatus}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Arrival Readiness</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {departureDate}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Flight: {flightNo.split(' ')[0]}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-emerald-700 leading-tight truncate">
              {codiceFiscale}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Codice Fiscale (Tax ID)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-amber-700 leading-tight truncate">
              Padova Copernico
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Housing Confirmed</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: Arrival Logistics Modules (7 cols) + Essential Relocation Checklist (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Relocation Logistics Modules */}
        <div className="lg:col-span-7 space-y-4">
          {/* Flight & Airport Pickup Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center font-bold">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    Flight Itinerary &amp; Airport Greeting
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Coordinated arrival in {student.countryInterest} with local student association buddy
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#087cf5] border border-blue-200">
                Confirmed Flight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Flight &amp; Routing
                </span>
                <p className="font-extrabold text-slate-900">{flightNo}</p>
                <p className="text-[11px] text-slate-500">Departure: {departureDate}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Arrival Airport
                </span>
                <p className="font-extrabold text-[#087cf5]">{arrivalAirport}</p>
                <p className="text-[11px] text-slate-500">Terminal 1 International</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Student Buddy Pickup
                </span>
                <p className="font-extrabold text-emerald-700">Scheduled ✓</p>
                <p className="text-[11px] text-slate-500 truncate" title={pickupContact}>{pickupContact}</p>
              </div>
            </div>

            {/* Accommodation Details */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Destination Student Accommodation Address
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-800 leading-snug">
                    {accommodation || 'Residenza Universitaria Copernico, Via Copernico 9, Padova'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Opening map location for ${student.name}'s housing...`)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-50 shrink-0"
                >
                  View Map
                </button>
              </div>
            </div>
          </div>

          {/* Essential Italian Protocols (Codice Fiscale + Permesso) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
              Mandatory Legal Protocols in Destination Country
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Codice Fiscale (Tax Code)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    Verified
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-slate-800 bg-white p-1.5 rounded border border-slate-200">
                  {codiceFiscale}
                </p>
                <p className="text-[10.5px] text-slate-500">
                  Essential for lease signing, bank accounts, and health card (Tessera Sanitaria).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Permesso di Soggiorno Kit</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                    8-Day Window
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-semibold">
                  Yellow Postal Kit (Kit Giallo) on file
                </p>
                <p className="text-[10.5px] text-slate-500">
                  Must be filed at Italian Post Office (Sportello Amico) within 8 days of arrival.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Readiness Checklist & Life Abroad Completion */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                Arrival Readiness Protocol
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Check off student relocation deliverables
              </p>
            </div>

            {/* Lifecycle Status Switcher */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Lifecycle Status</label>
              <select
                value={lifecycleStatus}
                onChange={(e) => setLifecycleStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="Pre-Departure Briefing">Pre-Departure Briefing</option>
                <option value="In Transit">In Transit (Flying to Destination)</option>
                <option value="Landed & Registered">Landed &amp; Registered in Campus</option>
                <option value="Enrolled Abroad 🎉">Enrolled Abroad 🎉 (Mission Complete)</option>
              </select>
            </div>

            {/* Interactive Checklist */}
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={orientationDone}
                  onChange={(e) => setOrientationDone(e.target.checked)}
                  className="w-4 h-4 rounded text-violet-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Pre-Departure Orientation Webinar Attended
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={forexDone}
                  onChange={(e) => setForexDone(e.target.checked)}
                  className="w-4 h-4 rounded text-violet-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Forex Travel Card &amp; €500 Cash on Hand
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={permessoReady}
                  onChange={(e) => setPermessoReady(e.target.checked)}
                  className="w-4 h-4 rounded text-violet-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  8-Day Permesso di Soggiorno Postal Kit Ready
                </span>
              </label>
            </div>

            {/* Italian Phone & eSIM */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">European eSIM / Contact</label>
              <input
                type="text"
                value={simNumber}
                onChange={(e) => setSimNumber(e.target.value)}
                placeholder="+39 331..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Complete Lifecycle Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleMarkEnrolledAbroad}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#087cf5] hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mark Student Enrolled Abroad 🎉 &bull; Complete</span>
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Completes the full 12-stage journey from lead registration to successful overseas enrollment!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Enrolled Abroad Celebration Modal ── */}
      {showEnrolledCelebration && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Mission Accomplished! 🎓🎉</h3>
              <p className="text-xs text-slate-600 mt-1">
                <strong>{student.name}</strong> has successfully completed the Presume Overseas Education pipeline and is now officially enrolled abroad at <strong>{student.targetUniversity || 'University of Padova'}</strong>!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 text-left space-y-1 font-medium">
              <div>&bull; Destination: <strong>{student.countryInterest}</strong></div>
              <div>&bull; Program: <strong>{student.courseInterest}</strong></div>
              <div>&bull; Flight: <strong>{flightNo}</strong></div>
              <div>&bull; Lifecycle: <strong>12 of 12 Operational Stages Completed</strong></div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEnrolledCelebration(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEnrolledCelebration(false);
                  navigate('dashboard', student.id);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#087cf5] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

