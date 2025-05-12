
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Clock, Settings as SettingsIcon, Activity, MapPin, Store, Phone, Clock as ClockIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user || !user.pharmacy) {
    return null;
  }
  
  return (
    <div className="w-full h-full bg-muted">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b bg-white">
          <div className="flex items-center mb-2">
            <Logo size="sm" showText={false} />
            <div className="ml-2">
              <h1 className="text-xl font-bold">Paramètres</h1>
              <p className="text-muted-foreground">Informations de la pharmacie</p>
            </div>
          </div>
        </header>
        
        {/* Settings content */}
        <section className="p-4 flex-1 overflow-auto">
          <Card className="mb-4">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Store className="h-5 w-5 mr-2 text-primary" />
                Profil de la pharmacie
              </h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{user.pharmacy.name}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-medium">{user.pharmacy.address}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-primary" />
                    Téléphone
                  </p>
                  <p className="font-medium">{user.pharmacy.phone}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-primary" />
                    Horaires d'ouverture
                  </p>
                  <p className="font-medium">{user.pharmacy.hours}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/edit-profile')}
              >
                Modifier les informations
              </Button>
            </div>
          </Card>
          
          <Card className="mb-4">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Géolocalisation
              </h2>
              
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-500">Carte de localisation</p>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/edit-location')}
              >
                Modifier la position
              </Button>
            </div>
          </Card>
          
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
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
              {/* Notification badge logic here */}
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
            className="flex flex-col items-center text-primary"
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Paramètres</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Settings;
