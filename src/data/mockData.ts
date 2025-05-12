
import { Request } from "../types";

// Current date for timestamp formatting
const today = new Date();

// Helper function to format date to dd/mm/yyyy
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Generate date X minutes ago
const getTimeAgo = (minutesAgo: number): string => {
  const date = new Date(today);
  date.setMinutes(date.getMinutes() - minutesAgo);
  return formatDate(date);
};

// Mock medication requests data
export const mockRequests: Request[] = [
  {
    id: "req-1",
    patientName: "Amadou Diop",
    patientId: "pat-0023",
    patientPhone: "+221 77 123 4567",
    timestamp: getTimeAgo(15),
    medications: [
      {
        id: "med-1",
        name: "Paracétamol 500mg",
        requiresPrescription: false,
        dosage: "500mg",
        quantity: 20
      },
      {
        id: "med-2",
        name: "Ibuprofène 400mg",
        requiresPrescription: false,
        dosage: "400mg",
        quantity: 10
      }
    ],
    status: "active",
    read: false
  },
  {
    id: "req-2",
    patientName: "Fatou Ndiaye",
    patientId: "pat-0045",
    patientPhone: "+221 77 987 6543",
    timestamp: getTimeAgo(45),
    medications: [
      {
        id: "med-3",
        name: "Amoxicilline 500mg",
        requiresPrescription: true,
        dosage: "500mg",
        quantity: 15,
        prescriptionImage: "prescription-1.jpg"
      }
    ],
    status: "active",
    read: false
  },
  {
    id: "req-3",
    patientName: "Moussa Sall",
    patientId: "pat-0067",
    patientPhone: "+221 77 234 5678",
    timestamp: getTimeAgo(120),
    medications: [
      {
        id: "med-4",
        name: "Loratadine 10mg",
        requiresPrescription: false,
        dosage: "10mg",
        quantity: 30
      }
    ],
    status: "active",
    read: true
  },
  {
    id: "req-4",
    patientName: "Aïssatou Faye",
    patientId: "pat-0089",
    patientPhone: "+221 76 345 6789",
    timestamp: getTimeAgo(300),
    medications: [
      {
        id: "med-5",
        name: "Metformine 850mg",
        requiresPrescription: true,
        dosage: "850mg",
        quantity: 60,
        prescriptionImage: "prescription-2.jpg"
      },
      {
        id: "med-6",
        name: "Amlodipine 5mg",
        requiresPrescription: true,
        dosage: "5mg",
        quantity: 30,
        prescriptionImage: "prescription-2.jpg"
      }
    ],
    status: "completed",
    read: true,
    response: {
      available: ["med-5"],
      unavailable: ["med-6"],
      message: "Nous n'avons pas d'Amlodipine en stock actuellement."
    }
  },
  {
    id: "req-5",
    patientName: "Ousmane Diallo",
    patientId: "pat-0112",
    patientPhone: "+221 77 456 7890",
    timestamp: getTimeAgo(480),
    medications: [
      {
        id: "med-7",
        name: "Diazépam 5mg",
        requiresPrescription: true,
        dosage: "5mg",
        quantity: 20,
        prescriptionImage: "prescription-3.jpg"
      }
    ],
    status: "completed",
    read: true,
    response: {
      available: ["med-7"],
      unavailable: [],
    }
  }
];
