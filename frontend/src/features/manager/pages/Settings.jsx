import { useState } from "react";
import { Settings as SettingsIcon, Building2, Palette, Shield, Users, Lock, Upload, Save, CheckCircle2 } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general"); // general | branding | security | roles
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Form states
  const [orgDetails, setOrgDetails] = useState({
    name: "Xebia Global Learning",
    email: "admin@xebia.com",
    address: "123 Tech Plaza, Innovation District, CA 94043, United States",
  });

  const [branding, setBranding] = useState({
    theme: "Corporate Modern (Deep Plum)",
    primaryColor: "#51053f",
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30 minutes",
    ipRestriction: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  const tabs = [
    { id: "general", label: "Organization", icon: Building2 },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "roles", label: "Roles & Permissions", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Platform Configuration</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Manage your institution's global preferences, security protocols, and visual branding identity.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sub-Navigation Tabs */}
        <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-left transition-all cursor-pointer ${
                  active
                    ? "bg-[#84117C] text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={14} className={active ? "text-white" : "text-slate-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Settings Form Container */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-[15px] font-bold text-slate-800">Organization Details</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Define your core corporate entity attributes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Organization Name</label>
                    <input
                      type="text"
                      value={orgDetails.name}
                      onChange={(e) => setOrgDetails({ ...orgDetails, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Admin Email</label>
                    <input
                      type="email"
                      value={orgDetails.email}
                      onChange={(e) => setOrgDetails({ ...orgDetails, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered Address</label>
                    <textarea
                      value={orgDetails.address}
                      onChange={(e) => setOrgDetails({ ...orgDetails, address: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "branding" && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-[15px] font-bold text-slate-800">Visual Identity & Themes</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Customize your logos and branding accents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Platform Logo</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-primary">
                        <Upload size={18} />
                      </div>
                      <p className="text-[12px] font-bold text-slate-700">Upload new logo</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Recommended: SVG or PNG (512x512px)</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Theme Profile</label>
                      <select
                        value={branding.theme}
                        onChange={(e) => setBranding({ ...branding, theme: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary"
                      >
                        <option>Corporate Modern (Deep Plum)</option>
                        <option>Academic Classic (Emerald)</option>
                        <option>High-Contrast (Midnight)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Theme Color Swatches</label>
                      <div className="flex gap-2">
                        {["#84117C", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setBranding({ ...branding, primaryColor: color })}
                            className="w-8 h-8 rounded-full cursor-pointer border border-slate-200 transition-all flex items-center justify-center"
                            style={{ backgroundColor: color }}
                          >
                            {branding.primaryColor === color && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-[15px] font-bold text-slate-800">Security & Sign-On Protocols</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Configure compliance rules and session limits.</p>
                </div>

                <div className="space-y-4 max-w-[448px]">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700">Dual-Factor Authentication (2FA)</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Enforce SMS or email verification codes for administrators.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                      className="w-4 h-4 text-primary rounded outline-none focus:ring-0 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Session Timeout Duration</label>
                    <select
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary"
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700">IP Range Restriction</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Only allow portal sign-ins from authorized corporate subnets.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={security.ipRestriction}
                      onChange={(e) => setSecurity({ ...security, ipRestriction: e.target.checked })}
                      className="w-4 h-4 text-primary rounded outline-none focus:ring-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "roles" && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-[15px] font-bold text-slate-800">Roles & Governance</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Manage administrative roles and default permissions.</p>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="p-3">Role Profile</th>
                        <th className="p-3">Permissions Level</th>
                        <th className="p-3 text-center">Active Users</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">Super Administrator</td>
                        <td className="p-3">All Permissions</td>
                        <td className="p-3 text-center font-semibold">12</td>
                        <td className="p-3 text-right">
                          <button type="button" className="text-primary hover:underline cursor-pointer font-semibold">View Details</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">L&D Director</td>
                        <td className="p-3">Manage Curriculums, Categories</td>
                        <td className="p-3 text-center font-semibold">24</td>
                        <td className="p-3 text-right">
                          <button type="button" className="text-primary hover:underline cursor-pointer font-semibold">View Details</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">External Trainer</td>
                        <td className="p-3">Manage assigned cohorts, grades</td>
                        <td className="p-3 text-center font-semibold">98</td>
                        <td className="p-3 text-right">
                          <button type="button" className="text-primary hover:underline cursor-pointer font-semibold">View Details</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[11px] text-slate-400">
                Last modified: Oct 24, 2026 by Sarah Jenkins
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm shadow-[#84117C]/15 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Save Success Toast */}
      {showSavedToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 animate-slide-in">
          <CheckCircle2 className="text-emerald-600" size={18} />
          <div>
            <h4 className="text-[12px] font-bold">Configuration Saved</h4>
            <p className="text-[10px] text-emerald-600 mt-0.5">Platform configuration has been successfully synchronized.</p>
          </div>
        </div>
      )}
    </div>
  );
}
