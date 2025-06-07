"use client"
import { useState,useEffect } from "react";
import { Eye, EyeOff, User, Lock} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";

interface LoginFormProps {
  onLogin: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {

   const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status, router])

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    signIn('credentials', {
      email,
      password,
      redirect: false
    }).then((result) => {
      if (result?.error) {
        alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      } else {
        router.push('/');
      }
    }).catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
    });

  };
   return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        {/* Logo/Avatar */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-800 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido!</h1>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-700"
              placeholder="Correo electrónico"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-green-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-700"
              placeholder="Contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;