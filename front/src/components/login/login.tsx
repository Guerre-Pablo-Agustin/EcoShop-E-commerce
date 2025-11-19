import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Leaf, Mail, Lock, Check, Eye, EyeIcon, EyeOffIcon, EyeClosed } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login:", { email, password, rememberMe });
    } else {
      console.log("Register:", { email, password, confirmPassword });
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
              onClick={() => setIsLogin(true)}
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
              onClick={() => {
                setIsLogin(false);
                setConfirmPassword("");
                setRememberMe(false);
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
                    onClick={handleShowPassword}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                   <button type="button" onClick={handleShowPassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary focus:outline-none">
                  {showPassword ? <Eye /> : <EyeClosed />} 
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
                      type= {showPassword ? "text" : "password"}
                      onClick={handleShowPassword}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
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
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Recordarme
                    </label>
                  </div>
                  <button
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
              >
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
                onClick={() => console.log("Google login")}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
                onClick={() => console.log("Microsoft login")}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
                Microsoft
              </Button>
            </div>

            {/* Footer Links */}
            <div className="pt-4 space-y-2 text-center">
              <p className="text-xs text-gray-600">
                Manténgase al día |{" "}
                <button
                  onClick={() => console.log("Soporte")}
                  className="text-green-600 hover:underline"
                >
                  Contacta soporte
                </button>
              </p>
              <p className="text-xs text-gray-600">
                Al registrarte, aceptas nuestros{" "}
                <button
                  onClick={() => console.log("Términos")}
                  className="text-green-600 hover:underline"
                >
                  Términos de Servicio
                </button>
              </p>
              <p className="text-xs text-gray-600">
                <button
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
