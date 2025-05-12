
import React from "react";
import { mockRequests } from "../data/mockData";
import { Bell, Clock, Settings, Activity, FileText, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const History: React.FC = () => {
  const navigate = useNavigate();
  
  // Get completed requests
  const completedRequests = mockRequests.filter(req => req.status === "completed");
  
  return (
    <div className="w-full h-full bg-muted">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b bg-white">
          <h1 className="text-xl font-bold">Historique</h1>
          <p className="text-muted-foreground">Demandes de médicaments traitées</p>
        </header>
        
        {/* History list */}
        <section className="p-4 flex-1 overflow-auto">
          {completedRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Clock className="h-12 w-12 mb-2" />
              <p>Aucun historique disponible</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{request.patientName}</h3>
                        <span className="text-xs text-gray-500">
                          {request.timestamp}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        Traité
                      </Badge>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    {/* Medications list */}
                    <div className="space-y-3 mt-2">
                      {request.medications.map((medication) => {
                        const isAvailable = request.response?.available.includes(medication.id);
                        const isUnavailable = request.response?.unavailable.includes(medication.id);
                        
                        return (
                          <div key={medication.id} className="bg-gray-50 p-3 rounded-lg flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              {isAvailable ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : isUnavailable ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <FileText className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium text-sm ${isUnavailable ? 'line-through text-gray-500' : ''}`}>
                                {medication.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {medication.dosage} - Qté: {medication.quantity}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Response message if any */}
                    {request.response?.message && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                        <p className="font-medium mb-1">Message:</p>
                        <p>{request.response.message}</p>
                      </div>
                    )}
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
            <Activity className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/notifications')}
          >
            <div className="relative">
              <Bell className="h-6 w-6" />
              {mockRequests.filter(req => req.status === "active" && !req.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {mockRequests.filter(req => req.status === "active" && !req.read).length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Notifications</span>
          </button>
          <button 
            className="flex flex-col items-center text-primary"
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

export default History;
