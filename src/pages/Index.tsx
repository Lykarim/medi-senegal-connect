
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">MediFinder</h1>
        <p className="text-primary">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default Index;
