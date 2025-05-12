
export interface Medication {
  id: string;
  name: string;
  requiresPrescription: boolean;
  dosage: string;
  quantity: number;
  prescriptionImage?: string;
}

export interface Request {
  id: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  timestamp: string;
  medications: Medication[];
  status: "active" | "completed" | "pending";
  read: boolean;
  response?: {
    available: string[];
    unavailable: string[];
    message?: string;
  };
}
