
import React from "react";
import { mockRequests } from "../data/mockData";
import { File, Bell, Clock, Settings, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter only active requests
  const activeRequests = mockRequests.filter(req => req.status === "active");
  
  const handleReply = (requestId: string, medicationId: string, isAvailable: boolean) => {
    // In a real app, this would call an API to update the medication availability
    toast({
      title: isAvailable ? "Médicament disponible" : "Médicament indisponible",
      description: isAvailable 
        ? "Le patient sera notifié de la disponibilité" 
        : "Le patient sera notifié de l'indisponibilité",
      duration: 3000,
    });
  };

  return (
    <div className="w-full h-full bg-muted">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b bg-white">
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Demandes de médicaments en attente</p>
        </header>
        
        {/* Notifications list */}
        <section className="p-4 flex-1 overflow-auto">
          {activeRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bell className="h-12 w-12 mb-2" />
              <p>Aucune demande en attente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{request.patientName}</h3>
                      <span className="text-xs text-gray-500">
                        {request.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {request.patientPhone}
                    </p>
                    
                    <Separator className="my-2" />
                    
                    {/* Medications list */}
                    <div className="space-y-4 mt-3">
                      {request.medications.map((medication) => (
                        <div key={medication.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start">
                            {medication.requiresPrescription ? (
                              <div className="flex-shrink-0 mr-2 mt-1">
                                <File className="h-5 w-5 text-orange-500" />
                              </div>
                            ) : null}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{medication.name}</p>
                              <p className="text-xs text-gray-500">
                                {medication.dosage} - Qté: {medication.quantity}
                              </p>
                              
                              {medication.requiresPrescription && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0 h-auto mt-1 text-primary"
                                >
                                  Voir l'ordonnance
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex gap-2 mt-3">
                            <Button
                              className="flex-1 bg-green-100 hover:bg-green-200 text-green-800"
                              variant="secondary"
                              size="sm"
                              onClick={() => handleReply(request.id, medication.id, true)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Disponible
                            </Button>
                            <Button
                              className="flex-1 bg-red-100 hover:bg-red-200 text-red-800"
                              variant="secondary"
                              size="sm"
                              onClick={() => handleReply(request.id, medication.id, false)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Non disponible
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
        
        {/* Bottom navigation */}
        <nav className="sticky bottom-0 bg-white border-t flex justify-around py-3">
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/dashboard')}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button 
            className="flex flex-col items-center text-primary"
            onClick={() => navigate('/notifications')}
          >
            <div className="relative">
              <Bell className="h-6 w-6" />
              {activeRequests.filter(req => !req.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeRequests.filter(req => !req.read).length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Notifications</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/history')}
          >
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">Historique</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Paramètres</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Notifications;
