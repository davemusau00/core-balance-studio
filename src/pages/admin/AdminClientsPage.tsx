import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Mail, UserX, UserCheck, Phone } from 'lucide-react';

export const AdminClientsPage: React.FC = () => {
  const { user } = useOutletContext<{ user: any }>();

  // Mock data for clients
  const clients = [
    { id: 1, name: 'Wambui N.', phone: '0712 345 678', email: 'wambui@example.com', status: 'Active', package: '10 Class Pack', remaining: 4, joined: 'Jan 10, 2026' },
    { id: 2, name: 'Logan M.', phone: '0722 987 654', email: 'logan@example.com', status: 'Inactive', package: 'None', remaining: 0, joined: 'Feb 14, 2026' },
    { id: 3, name: 'Aisha K.', phone: '0733 456 789', email: 'aisha@example.com', status: 'Active', package: 'Unlimited Monthly', remaining: '∞', joined: 'Mar 01, 2026' },
    { id: 4, name: 'Brian O.', phone: '0700 111 222', email: 'brian@example.com', status: 'Active', package: '5 Class Pack', remaining: 1, joined: 'Apr 20, 2026' },
    { id: 5, name: 'Sarah J.', phone: '0799 888 777', email: 'sarah@example.com', status: 'Active', package: '10 Class Pack', remaining: 10, joined: 'May 05, 2026' },
  ];

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Clients Database</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Manage your studio members and packages.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search by name, email or phone..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#e5e2eb] rounded-2xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" />
        </div>
      </div>

      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1c1c2b]">
            <thead className="bg-[#fbf9fd] text-[#6b7280] uppercase tracking-wider text-[10px] font-semibold border-b border-[#e5e2eb]">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Active Package</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2eb]">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#f4f0fb]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f4f0fb] text-[#6b4cc6] flex items-center justify-center font-bold font-serif text-sm">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-semibold">{client.name}</span>
                        <span className="block text-[10px] text-[#6b7280]">Joined {client.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-[#6b7280]"><Mail className="w-3 h-3" /> {client.email}</span>
                      <span className="flex items-center gap-1.5 text-[#6b7280]"><Phone className="w-3 h-3" /> {client.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${client.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="block font-semibold text-[#4e2f80]">{client.package}</span>
                    <span className="block text-[10px] text-[#6b7280]">{client.remaining} credits left</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button className="p-2 bg-white border border-[#e5e2eb] rounded-xl text-[#6b7280] hover:text-[#6b4cc6] hover:bg-[#f4f0fb] transition-colors" title="View Profile">
                      <UserCheck className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white border border-[#e5e2eb] rounded-xl text-[#6b7280] hover:text-red-600 hover:bg-red-50 transition-colors" title="Deactivate">
                      <UserX className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#e5e2eb] flex items-center justify-between text-xs text-[#6b7280]">
          <span>Showing 1 to 5 of 5 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-[#e5e2eb] rounded-lg bg-neutral-50 text-neutral-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 border border-[#e5e2eb] rounded-lg bg-white text-[#1c1c2b] hover:bg-neutral-50">1</button>
            <button className="px-3 py-1 border border-[#e5e2eb] rounded-lg bg-neutral-50 text-neutral-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
};
