import { useState } from "react";
import { registerUser } from "../services/api";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await registerUser(name, email, password);
            setSuccess("Compte créé avec succès ! Redirection...");
            setError("");
            
            // On attend 2 secondes puis on redirige vers le login
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            
        } catch (err: any) {
            console.error("Register failed:", err);
            setError(err.response?.data?.message || "❌ L'inscription a échoué. Veuillez réessayer.");
            setSuccess("");
        }
    };

    return (
        <div>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Champ Nom */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        <i className="fa-regular fa-user mr-2 text-indigo-500"></i>
                        Nom complet
                    </label>
                    <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50"
                        placeholder="Petros"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Champ Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        <i className="fa-regular fa-envelope mr-2 text-indigo-500"></i>
                        Adresse email
                    </label>
                    <input 
                        type="email" 
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Champ Mot de passe */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        <i className="fa-solid fa-key mr-2 text-indigo-500"></i>
                        Mot de passe
                    </label>
                    <input 
                        type="password" 
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Bouton */}
                <button type="submit" className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group mt-4">
                    <span>Créer mon compte</span>
                    <i className="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
                </button>

                {/* Lien retour login */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Déjà un compte ? 
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors ml-1">
                        Se connecter
                    </a>
                </p>
            </form>
        </div>
    );
}

