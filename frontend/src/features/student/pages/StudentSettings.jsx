import React, { useState } from "react";
import {
  Palette,
  ToggleLeft,
  Settings,
  Bell,
  Eye,
  Download,
  Shield,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [theme, setTheme] = useState("light");
  const [settingsState, setSettingsState] = useState({
    emailNotif: true,
    pushNotif: false,
    chatNotif: true,
    highContrast: false,
    largeText: false,
    autoDownload: true,
  });

  const toggleSetting = (key) => {
    setSettingsState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h2>
        <p className="text-[13px] text-slate-400 mt-1">Manage your account preferences and application experience.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Section Selector Tab Buttons */}
        <div className="w-full lg:w-60 shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-3 lg:pb-0 hide-scrollbar">
            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-3 px-4.5 py-3 rounded-xl font-bold text-[12.5px] transition-all cursor-pointer border-none outline-none ${
                activeTab === "appearance"
                  ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/20 text-[#6C1D5F]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <Palette size={16} /> Appearance & Accessibility
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4.5 py-3 rounded-xl font-bold text-[12.5px] transition-all cursor-pointer border-none outline-none ${
                activeTab === "notifications"
                  ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/20 text-[#6C1D5F]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <Bell size={16} /> Notifications & Alerts
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`flex items-center gap-3 px-4.5 py-3 rounded-xl font-bold text-[12.5px] transition-all cursor-pointer border-none outline-none ${
                activeTab === "downloads"
                  ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/20 text-[#6C1D5F]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <Download size={16} /> Downloads & Storage
            </button>
          </nav>
        </div>

        {/* Right: Section Panels */}
        <div className="flex-1 space-y-6">
          {activeTab === "appearance" && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/70 shadow-sm space-y-8 animate-fadeIn">
              {/* Theme Settings */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[14.5px] text-slate-850">Theme Mode</h3>
                  <p className="text-[11.5px] text-slate-400">Choose your preferred visual style for the app.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer bg-white outline-none ${
                      theme === "light"
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F] font-bold"
                        : "border-slate-200 hover:border-slate-350 text-slate-500"
                    }`}
                  >
                    <Sun size={18} />
                    <span className="text-[11.5px]">Light Mode</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer bg-white outline-none ${
                      theme === "dark"
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F] font-bold"
                        : "border-slate-200 hover:border-slate-350 text-slate-500"
                    }`}
                  >
                    <Moon size={18} />
                    <span className="text-[11.5px]">Dark Mode</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer bg-white outline-none ${
                      theme === "system"
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F] font-bold"
                        : "border-slate-200 hover:border-slate-350 text-slate-500"
                    }`}
                  >
                    <Laptop size={18} />
                    <span className="text-[11.5px]">System Auto</span>
                  </button>
                </div>
              </div>

              {/* Accessibility Settings */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div>
                  <h3 className="font-bold text-[14.5px] text-slate-850">Accessibility</h3>
                  <p className="text-[11.5px] text-slate-400">Optimize the application interface for readability.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* High Contrast */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-700">High Contrast Mode</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Increases visual contrast between text and background elements.</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("highContrast")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                        settingsState.highContrast ? "bg-[#6C1D5F]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                        settingsState.highContrast ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Large Text */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-700">Larger Font Sizes</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Scale up textual sizes to aid reading comfort.</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("largeText")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                        settingsState.largeText ? "bg-[#6C1D5F]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                        settingsState.largeText ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/70 shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-[14.5px] text-slate-850">Notification Preferences</h3>
                <p className="text-[11.5px] text-slate-400">Configure how and when you receive portal updates.</p>
              </div>

              <div className="divide-y divide-slate-100">
                {/* Email Notif */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-700">Email Notifications</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Receive digests and final deadline reminders in your mailbox.</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("emailNotif")}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                      settingsState.emailNotif ? "bg-[#6C1D5F]" : "bg-slate-200"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      settingsState.emailNotif ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Push Notif */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-700">Browser Push Alerts</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Instant popup alerts when grades or modules are published.</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("pushNotif")}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                      settingsState.pushNotif ? "bg-[#6C1D5F]" : "bg-slate-200"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      settingsState.pushNotif ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Chat Companion Notif */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-700">AI Companion Notifications</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Receive hints and interactive reminders from your study buddy.</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("chatNotif")}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                      settingsState.chatNotif ? "bg-[#6C1D5F]" : "bg-slate-200"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      settingsState.chatNotif ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "downloads" && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/70 shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-[14.5px] text-slate-850">Offline Storage Settings</h3>
                <p className="text-[11.5px] text-slate-400">Configure file cache size limits and download behaviors.</p>
              </div>

              <div className="divide-y divide-slate-100">
                {/* Auto Download */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-700">Pre-download Reading Material</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Automatically sync class PDFs when enrolling in a new module.</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("autoDownload")}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                      settingsState.autoDownload ? "bg-[#6C1D5F]" : "bg-slate-200"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      settingsState.autoDownload ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Storage usage */}
                <div className="py-5 space-y-3.5">
                  <div className="flex justify-between items-center text-[12.5px] font-bold text-slate-700">
                    <span>Cache Storage Usage</span>
                    <span className="text-[#6C1D5F]">452 MB / 2 GB limit</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6C1D5F] rounded-full" style={{ width: "22%" }} />
                  </div>
                  <button className="px-4 py-2 border border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-[11.5px] font-bold transition-all cursor-pointer bg-white outline-none">
                    Clear Offline Cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
