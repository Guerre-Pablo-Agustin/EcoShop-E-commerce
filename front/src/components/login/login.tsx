import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Leaf, Mail, Lock, Check, Eye, EyeClosed } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Validación para registro
    if (!isLogin && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        console.log("Login exitoso!");
        navigate("/dashboard"); // Redirigir después del login
      } else {
        // TODO: Agregar función de registro en el store
        console.log("Registro aún no implementado");
        alert("Función de registro en desarrollo");
      }
    } catch (error) {
      console.error("Operación falló:", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
              onClick={() => {
                setIsLogin(true);
                clearError();
              }}
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
              onClick={() => {
                setIsLogin(false);
                setConfirmPassword("");
                setRememberMe(false);
                clearError();
              }}
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 text-sm font-medium"
                >
                  Email corporativo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="empresa@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-700 text-sm font-medium"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Recordarme
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Recuperar contraseña")}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 transition-all"
                disabled={isLoading}
              >
                {isLoading
                  ? "Cargando..."
                  : isLogin
                  ? "Iniciar Sesión"
                  : "Registrarse"}
              </Button>
            </form>

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