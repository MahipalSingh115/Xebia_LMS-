import { useState, useEffect, useRef } from "react";
import AppLayout from "@/app/layouts/AppLayout";
import { Save, ChevronRight, CheckCircle2, X, Upload } from "lucide-react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-slide-up">
      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
      <span className="text-[13px] font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}

function Toggle({ checked, onChange, id }) {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`w-10 h-5 rounded-full transition-colors duration-200 ${
          checked ? "bg-primary" : "bg-slate-200"
        } relative`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}

export default function Settings() {
  const [instanceName, setInstanceName] = useState("Xebia Global Learning");
  const [adminEmail, setAdminEmail] = useState("admin@xebia.com");
  const [language, setLanguage] = useState("English (US)");
  const [timezone, setTimezone] = useState("(GMT+05:30) India Standard Time");
  const [brandColor, setBrandColor] = useState("#6C1D5F");

  // Appearance toggles
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(true);

  // SMTP
  const [smtpServer, setSmtpServer] = useState("smtp.xebia-cloud.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpEncryption, setSmtpEncryption] = useState("STARTTLS");

  // Notifications
  const [notifyRegistration, setNotifyRegistration] = useState(true);
  const [notifyCompletion, setNotifyCompletion] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);

  // Logo upload
  const [logoPreview, setLogoPreview] = useState(null);
  const logoRef = useRef(null);

  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate an async save
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setToast("Platform settings saved successfully!");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <AppLayout>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
          <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold">Settings</span>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Platform Settings
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Manage your LMS configuration, branding, and security preferences.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── General ─────────────────────────────── */}
          <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[20px] block">tune</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">General</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-slate-600">Instance Name</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    type="text"
                    value={instanceName}
                    onChange={(e) => setInstanceName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-slate-600">Admin Contact Email</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-slate-600">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none bg-white"
                  >
                    <option>English (US)</option>
                    <option>Dutch</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-slate-600">Time Zone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none bg-white"
                  >
                    <option>(GMT+01:00) Central European Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+05:30) India Standard Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ── Branding ─────────────────────────────── */}
          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[20px] block">palette</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">Branding</h3>
            </div>

            <div className="space-y-4">
              {/* Logo Upload */}
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              {logoPreview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-3 flex items-center justify-center">
                  <img src={logoPreview} alt="Logo preview" className="max-h-20 object-contain" />
                  <button
                    onClick={() => { setLogoPreview(null); logoRef.current.value = ""; }}
                    className="absolute top-2 right-2 bg-slate-900/70 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => logoRef.current.click()}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center hover:border-primary transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">
                    cloud_upload
                  </span>
                  <p className="font-bold text-slate-700 text-[12px] mt-2">Upload Platform Logo</p>
                  <p className="text-[10px] text-slate-400">SVG, PNG or JPG (max. 2MB)</p>
                </div>
              )}

              {/* Brand Color */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-300 shadow-inner flex-shrink-0 transition-colors"
                    style={{ backgroundColor: brandColor }}
                  />
                  <input
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg font-mono text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                  />
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-8 h-8 p-0 border-0 outline-none rounded-lg cursor-pointer"
                    title="Pick a color"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Appearance ─────────────────────────────── */}
          <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[20px] block">visibility</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">Appearance</h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Dark Mode",
                  desc: "Switch between light and dark themes",
                  state: darkMode,
                  set: setDarkMode,
                  id: "toggle-dark",
                },
                {
                  label: "Compact View",
                  desc: "Reduce whitespace in data tables",
                  state: compactView,
                  set: setCompactView,
                  id: "toggle-compact",
                },
              ].map(({ label, desc, state, set, id }) => (
                <div
                  key={id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    state ? "bg-primary/5 border-primary/20" : "bg-slate-50/50 border-slate-100"
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-800 text-[12px]">{label}</p>
                    <p className="text-[11px] text-slate-400">{desc}</p>
                  </div>
                  <Toggle checked={state} onChange={() => set(!state)} id={id} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Email Configuration ─────────────────────────────── */}
          <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[20px] block">mail</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">Email Configuration</h3>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-slate-600">SMTP Server</label>
                <input
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  type="text"
                  value={smtpServer}
                  onChange={(e) => setSmtpServer(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-slate-600">Port</label>
                  <input
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-slate-600">Encryption</label>
                  <select
                    value={smtpEncryption}
                    onChange={(e) => setSmtpEncryption(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[13px] bg-white focus:outline-none"
                  >
                    <option>STARTTLS</option>
                    <option>SSL/TLS</option>
                    <option>None</option>
                  </select>
                </div>
              </div>

              {/* Test Connection */}
              <button
                onClick={() => setToast("SMTP connection test successful!")}
                className="mt-1 w-full border border-slate-200 py-1.5 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Test Connection
              </button>
            </div>
          </div>

          {/* ── Notifications ─────────────────────────────── */}
          <div className="col-span-12 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[20px] block">notifications_active</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">System Notifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "New Registrations",
                  icon: "person_add",
                  state: notifyRegistration,
                  set: setNotifyRegistration,
                  id: "toggle-reg",
                },
                {
                  label: "Course Completions",
                  icon: "assignment_turned_in",
                  state: notifyCompletion,
                  set: setNotifyCompletion,
                  id: "toggle-completion",
                },
                {
                  label: "Security Alerts",
                  icon: "security",
                  state: notifySecurity,
                  set: setNotifySecurity,
                  id: "toggle-security",
                },
              ].map(({ label, icon, state, set, id }) => (
                <div
                  key={id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    state ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${state ? "text-primary" : "text-slate-400"}`}>
                      {icon}
                    </span>
                    <span className="text-[12px] text-slate-700 font-semibold">{label}</span>
                  </div>
                  <Toggle checked={state} onChange={() => set(!state)} id={id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>
    </AppLayout>
  );
}
