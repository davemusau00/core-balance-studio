import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Building, Bell, Shield, Smartphone, Globe, CreditCard, Mail } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useApp();

  const [studioName, setStudioName] = useState('Core Balance Studio');
  const [email, setEmail] = useState('contact@corebalance.co.ke');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [location, setLocation] = useState('Lavington, Nairobi');
  const [currency, setCurrency] = useState('KES');
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    dailySummary: true,
    waitlistAutoNotify: true,
  });

  const [mpesaPaybill, setMpesaPaybill] = useState('400200');
  const [mpesaAccount, setMpesaAccount] = useState('COREBALANCE');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Studio configurations have been updated successfully.', 'success');
  };

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Studio Settings</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Manage studio details, integrations, and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#5b3894] transition-all"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Studio Info */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#e5e2eb] pb-3">
            <Building className="w-5 h-5 text-[#6b4cc6]" />
            <h3 className="font-bold text-base text-[#1c1c2b]">General Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Studio Name</label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Primary Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>
          </div>
        </div>

        {/* Payment & Integration Settings */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#e5e2eb] pb-3">
            <Smartphone className="w-5 h-5 text-[#1f9d62]" />
            <h3 className="font-bold text-base text-[#1c1c2b]">M-Pesa & Payment Gateway</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Currency</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">M-Pesa Paybill Number</label>
              <input
                type="text"
                value={mpesaPaybill}
                onChange={(e) => setMpesaPaybill(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#1f9d62]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1c2b] mb-1.5">Account Name Prefix</label>
              <input
                type="text"
                value={mpesaAccount}
                onChange={(e) => setMpesaAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#1f9d62]"
              />
            </div>
          </div>
        </div>

        {/* Notifications & System Preferences */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#e5e2eb] pb-3">
            <Bell className="w-5 h-5 text-[#6b4cc6]" />
            <h3 className="font-bold text-base text-[#1c1c2b]">System Notifications</h3>
          </div>

          <div className="space-y-3">
            {[
              { key: 'emailAlerts', title: 'Email Booking Notifications', desc: 'Receive an email whenever a client books or cancels a session.' },
              { key: 'smsAlerts', title: 'SMS / M-Pesa Alerts', desc: 'Send automated SMS confirmation on successful payment.' },
              { key: 'dailySummary', title: 'Daily Studio Summary', desc: 'Receive a daily breakdown of class occupancy and revenue at 8 PM.' },
              { key: 'waitlistAutoNotify', title: 'Automated Waitlist Promotion', desc: 'Automatically move waitlisted clients into open slots upon cancellation.' },
              { key: 'appTourEnabled', title: 'Guided App Tour & Feature Tooltips', desc: 'Enable step-by-step interactive onboarding tours and feature tooltips.' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl">
                <div>
                  <h4 className="font-semibold text-xs text-[#1c1c2b]">{item.title}</h4>
                  <p className="text-[11px] text-[#6b7280]">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-[#6b4cc6]' : 'bg-neutral-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </main>
  );
};
