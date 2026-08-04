import { useState } from 'react';

export type EquipmentStatus = 'operational' | 'service_due' | 'maintenance' | 'retired';

export interface MaintenanceLog {
  id: string;
  date: string;
  technician: string;
  actionTaken: string;
  costKES: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  serialNo: string;
  location: string;
  status: EquipmentStatus;
  lastServiced: string;
  nextServiceDue: string;
  springLifePercent: number;
  notes: string;
  maintenanceHistory: MaintenanceLog[];
}

export interface RetailProduct {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'e1', name: 'Reformer Bed #1', serialNo: 'RF-001', location: 'Studio 1', status: 'operational',
    lastServiced: 'Jun 14, 2026', nextServiceDue: 'Sep 14, 2026', springLifePercent: 85, notes: 'Springs replaced. Footbar adjusted.',
    maintenanceHistory: [
      { id: 'm1', date: 'Jun 14, 2026', technician: 'Kipchumba Mechanics', actionTaken: 'Replaced 4 red springs, oiled carriage wheels.', costKES: 12500 }
    ]
  },
  {
    id: 'e2', name: 'Reformer Bed #2', serialNo: 'RF-002', location: 'Studio 1', status: 'service_due',
    lastServiced: 'Mar 01, 2026', nextServiceDue: 'Aug 07, 2026', springLifePercent: 30, notes: 'Carriage alignment check needed.',
    maintenanceHistory: []
  },
  {
    id: 'e3', name: 'Reformer Bed #3', serialNo: 'RF-003', location: 'Studio 1', status: 'maintenance',
    lastServiced: 'Jul 01, 2026', nextServiceDue: 'Aug 05, 2026', springLifePercent: 10, notes: 'Strap replacement in progress. Out of use.',
    maintenanceHistory: []
  },
  {
    id: 'e4', name: 'Cadillac Machine', serialNo: 'CAD-01', location: 'Studio 2', status: 'operational',
    lastServiced: 'May 20, 2026', nextServiceDue: 'Aug 20, 2026', springLifePercent: 90, notes: 'Trapeze bar tightened.',
    maintenanceHistory: []
  },
];

const INITIAL_RETAIL: RetailProduct[] = [
  { id: 'r1', name: 'Pilates Grip Socks',       category: 'Accessories', sku: 'SOCK-001', price: 850,   stock: 42,  lowStockThreshold: 10 },
  { id: 'r2', name: 'Core Balance Water Bottle', category: 'Accessories', sku: 'BTLE-001', price: 1800,  stock: 8,   lowStockThreshold: 10 },
  { id: 'r3', name: 'Studio Pilates Mat (6mm)',  category: 'Equipment',   sku: 'MAT-001',  price: 4500,  stock: 3,   lowStockThreshold: 5 },
  { id: 'r4', name: 'Resistance Band Set',       category: 'Equipment',   sku: 'BAND-003', price: 2200,  stock: 14,  lowStockThreshold: 5 },
];

export const useInventory = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [products, setProducts] = useState<RetailProduct[]>(INITIAL_RETAIL);

  const addMaintenanceLog = (equipmentId: string, technician: string, actionTaken: string, costKES: number) => {
    setEquipment(prev => prev.map(item => {
      if (item.id === equipmentId) {
        const newLog: MaintenanceLog = {
          id: `log_${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          technician,
          actionTaken,
          costKES,
        };
        return {
          ...item,
          status: 'operational',
          springLifePercent: 100,
          lastServiced: newLog.date,
          maintenanceHistory: [newLog, ...item.maintenanceHistory],
        };
      }
      return item;
    }));
  };

  const adjustStock = (productId: string, delta: number) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
  };

  return {
    equipment,
    products,
    addMaintenanceLog,
    adjustStock,
  };
};
