
import React from "react";
import { useAuth } from "../context/AuthContext";
import { mockRequests } from "../data/mockData";
import { Bell, CheckCircle, Activity, Clock, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter active requests
  const activeRequests = mockRequests.filter(req => req.status === "active");
  
  // Count responded requests
  const respondedRequests = mockRequests.filter(req => req.status === "completed").length;
  
  // Calculate availability rate (mock data for now)
  const availabilityRate = 75;

  // Format current date in French
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
  
  return (
    <div className="w-full h-full bg-muted">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header with logo and date */}
        <header className="p-4 border-b bg-white">
          <div className="flex items-center mb-3">
            <Logo size="sm" showText={false} />
            <div className="ml-2">
              <p className="text-muted-foreground text-sm">{formattedDate}</p>
              <h1 className="text-2xl font-bold">Bienvenue, {user?.pharmacy.name}</h1>
            </div>
          </div>
          <p className="text-primary">
            Vous avez <span className="font-semibold">{activeRequests.length}</span> demandes actives
          </p>
        </header>
        
        {/* Dashboard stats */}
        <section className="p-4">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Active requests card */}
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">{activeRequests.length}</span>
                  <span className="text-sm text-muted-foreground">Demandes actives</span>
                </div>
                
                {/* Responses card */}
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <span className="text-2xl font-bold">{respondedRequests}</span>
                  <span className="text-sm text-muted-foreground">Réponses données</span>
                </div>
              </div>
              
              {/* Availability rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Taux de disponibilité</span>
                  <span className="text-primary font-semibold">{availabilityRate}%</span>
                </div>
                <Progress value={availabilityRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </section>
        
        <div className="flex-grow"></div>
        
        {/* Bottom navigation */}
        <nav className="sticky bottom-0 bg-white border-t flex justify-around py-3">
          <button 
            className="flex flex-col items-center text-primary"
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

export default Dashboard;
