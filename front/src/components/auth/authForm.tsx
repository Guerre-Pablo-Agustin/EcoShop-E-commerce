import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Leaf, Check } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { error, clearError } = useAuthStore();

  const handleTabChange = (loginMode: boolean) => {
    setIsLogin(loginMode);
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-12">
          <div className="w-48 h-48 rounded-3xl bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <p className="text-sm text-gray-600 font-medium">
                Sustainable Business Ecosystem
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Únete al futuro sostenible
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Conecta tu marca con consumidores conscientes y construye un
              negocio responsable con el medio ambiente.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 p-1 text-white" />
                <p className="text-sm text-gray-700">
                  Certificación de sostenibilidad
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 p-1 text-white" />
                <p className="text-sm text-gray-700">
                  Análisis de impacto ambiental
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 p-1 text-white" />
                <p className="text-sm text-gray-700">
                  Red de proveedores verificados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button
              type="button"
              onClick={() => handleTabChange(true)}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                isLogin ? "text-green-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Iniciar Sesión
              {isLogin && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange(false)}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                !isLogin
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Registrarse
              {!isLogin && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {isLogin ? "Bienvenido de vuelta" : "Crear cuenta"}
              </h1>
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Accede a tu panel de gestión sostenible"
                  : "Regístrate para empezar tu viaje sostenible"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Render LoginForm o RegisterForm según el estado */}
            {isLogin ? <LoginForm /> : <RegisterForm />}

            {/* Footer Links */}
            <div className="pt-4 space-y-2 text-center">
              <p className="text-xs text-gray-600">
                Manténgase al día |{" "}
                <button
                  type="button"
                  onClick={() => console.log("Soporte")}
                  className="text-green-600 hover:underline"
                >
                  Contacta soporte
                </button>
              </p>
              <p className="text-xs text-gray-600">
                Al registrarte, aceptas nuestros{" "}
                <button
                  type="button"
                  onClick={() => console.log("Términos")}
                  className="text-green-600 hover:underline"
                >
                  Términos de Servicio
                </button>
              </p>
              <p className="text-xs text-gray-600">
                <button
                  type="button"
                  onClick={() => console.log("Privacidad")}
                  className="text-green-600 hover:underline"
                >
                  Política de Privacidad
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}