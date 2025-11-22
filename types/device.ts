export type DeviceStatus = 'healthy' | 'warning' | 'maintenance_due' | 'expired';

export interface MaintenanceSchedule {
  id: string;
  checkDate: string;
  nextCheckDate?: string;
  status: 'done' | 'overdue' | 'upcoming';
  level: number;
}

export interface MaintenanceHistory {
  id: string;
  date: string;
  type: string;
  cost?: number;
  technician?: string;
  notes?: string;
}

export interface Device {
  id: string;
  name: string;
  productCode: string;
  roomId: string;
  image?: any;
  type?: string;
  brand?: string;
  capacity?: string;
  color?: string;
  purchaseDate?: string;
  warrantyExpiry: string;
  status: DeviceStatus;
  maintenanceSchedule?: MaintenanceSchedule[];
  maintenanceHistory?: MaintenanceHistory[];
  documents?: Document[];
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: 'manual' | 'warranty' | 'guide';
}
