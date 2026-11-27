import { useState } from "react";
import { loginUser } from "../services/api";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // empêche rechargement page

        try {
            const response = await loginUser(email, password);
            console.log("Login successful:", response);
            // You can store the token in localStorage or context for future authenticated requests
            localStorage.setItem("token", response.token);
            window.location.href = "/dashboard"; // Redirect to home page after successful login
            setError(""); // Clear any previous errors
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "❌ Login failed. Please try again.");
        }
    };
    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        <i className="fa-regular fa-envelope mr-2 text-indigo-500"></i>
                        Adresse email
                    </label>
                    <input 
                            type="email" 
                            name="email"
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
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fa-solid fa-lock text-gray-400 group-focus-within:text-indigo-500 transition-colors"></i>
                        </div>
                        <input 
                            type="password" 
                            name="password"
                            className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <i className="fa-regular fa-eye text-gray-400 hover:text-indigo-500 transition-colors"></i>
                        </button>
                    </div>
                </div>

                {/* Options supplémentaires */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500" />
                        <span className="text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                        Mot de passe oublié ?
                    </a>
                </div>

                {/* Bouton de connexion */}
                <button type="submit" className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>Se connecter</span>
                    <i className="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
                </button>

                {/* Séparateur */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/80 text-gray-500">ou continuer avec</span>
                    </div>
                </div>

                {/* Boutons de connexion sociale (optionnel, pour un design plus complet) */}
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group">
                        <i className="fa-brands fa-google text-gray-600 group-hover:text-indigo-600"></i>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group">
                        <i className="fa-brands fa-github text-gray-600 group-hover:text-indigo-600"></i>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">GitHub</span>
                    </button>
                </div>

                {/* Lien d'inscription */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Pas encore de compte ? 
                    <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                        S'inscrire
                    </a>
                </p>
            </form>
        </div>
    // Script pour le toggle du mot de passe (optionnel)
    // <script>
    //     Petit script pour rendre le bouton de l'œil fonctionnel
    //     document.querySelectorAll('.fa-eye').forEach(eye => {
    //         eye.addEventListener('click', function() {
    //             const input = this.closest('.relative').querySelector('input');
    //             if (input.type === 'password') {
    //                 input.type = 'text';
    //                 this.classList.remove('fa-eye');
    //                 this.classList.add('fa-eye-slash');
    //             } else {
    //                 input.type = 'password';
    //                 this.classList.remove('fa-eye-slash');
    //                 this.classList.add('fa-eye');
    //             }
    //         });
    //     }); 
    // </script>
    );
}

