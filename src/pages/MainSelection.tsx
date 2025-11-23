import { useNavigate } from "react-router";
import { ModeCard } from "@/components/ModeCard";

export default function MainSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center tracking-tight">
        Sélection du Mode
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* MÉDECIN */}
        <ModeCard
          title="Médecin"
          description="Accès au panneau médical et aux outils de gestion."
          image="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg"
          onClick={() => navigate("/medecines")}
        />

        {/* ACTIONNEUR */}
        <ModeCard
          title="Actionneur"
          description="Contrôle et automatisation des dispositifs."
          image="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=900&q=80"
          onClick={() => navigate("/actionneur")}
        />
      </div>
    </div>
  );
}
