
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo and name */}
        <div className="flex flex-col items-center space-y-3">
          <Logo size="lg" showText={false} />
          <h1 className="text-3xl font-bold text-slate-800">MediFinder</h1>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground px-6">
          Connectez votre pharmacie avec les patients à proximité et répondez rapidement à leurs demandes de médicaments
        </p>
        
        {/* Call to action button */}
        <Button 
          className="w-full py-6 text-lg"
          onClick={handleGetStarted}
        >
          Commencer
        </Button>
      </div>
    </div>
  );
};

export default Index;
