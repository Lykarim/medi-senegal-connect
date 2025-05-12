
import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ showText = true, size = "md" }: LogoProps) => {
  const getLogoSize = () => {
    switch(size) {
      case "sm": return { container: "w-10 h-10", icon: "h-5 w-5" };
      case "lg": return { container: "w-24 h-24", icon: "h-12 w-12" };
      default: return { container: "w-16 h-16", icon: "h-8 w-8" };
    }
  };
  
  const { container, icon } = getLogoSize();
  
  return (
    <div className="flex items-center gap-3">
      <div className={`bg-primary rounded-xl p-3 ${container} flex items-center justify-center flex-shrink-0`}>
        <Plus className={`${icon} text-white`} />
      </div>
      {showText && <span className="text-xl font-bold text-slate-800">MediFinder</span>}
    </div>
  );
};

export default Logo;
