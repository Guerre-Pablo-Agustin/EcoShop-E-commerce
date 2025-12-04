import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Leaf, Check } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import bolsaImage from "@/assets/bolsa.png";
import manosImage from "@/assets/Manos.png";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { error, clearError } = useAuthStore();

  const handleTabChange = (loginMode: boolean) => {
    setIsLogin(loginMode);
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Info */}
        <div className="hidden lg:flex flex-col items-start space-y-8 p-12 pt-20">
          <div className="w-full h-64 rounded-3xl bg-gray-200 flex items-start justify-start">
            {isLogin ? (
              <img
                src={bolsaImage}
                alt="bolsa"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <img
                src={manosImage}
                alt="Manos"
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>

          {isLogin ? (
            <div className="space-y-6 max-w-md">
              <h3 className="text-2xl font-bold text-gray-800 text-start">
                Únete al futuro sostenible
              </h3>
              <p className="text-gray-600 text-start leading-relaxed">
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
          ) : (
            <div className="space-y-6 max-w-md">
              <Leaf className="w-10 h-10 flex mx-auto items-center justify-center shrink-0 p-1 text-primary" />
              <p className="text-lg  text-primary text-center font-playfair">
                "Cada compra cuenta una historia. Empieza a escribir la tuya de
                forma responsable."
              </p>
            </div>
          )}
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

          {/* Container con altura mínima fija */}
          <div className="p-8 space-y-6 min-h-[600px] flex flex-col">
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
            <div className="flex-1">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>

            {/* Footer Links */}
            <div className="pt-4 space-y-2 text-center mt-auto">
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
