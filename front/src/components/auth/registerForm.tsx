import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeClosed,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useCustomerStore } from "@/store/customer.store";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para verificación de email
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const navigate = useNavigate();
  const { register, isLoading, clearError } = useAuthStore();
  const { checkEmailExists } = useCustomerStore();

  // Función para verificar si el email existe
  const handleVerifyEmail = async () => {
    if (!email || !email.includes("@")) {
      alert("Por favor ingresa un email válido");
      return;
    }

    setIsCheckingEmail(true);
    setEmailVerified(null);

    try {
      const exists = await checkEmailExists(email);
      setEmailVerified(!exists); // true si está disponible, false si ya existe
    } catch (error) {
      console.error("Error al verificar email:", error);
      // ✅ Mostrar mensaje más específico
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al verificar el email. Por favor intenta nuevamente.";
      alert(errorMessage);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Resetear verificación cuando cambia el email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailVerified(null); // Resetear estado de verificación
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Validar que el email haya sido verificado y esté disponible
    if (emailVerified !== true) {
      alert(
        "Por favor verifica que el email esté disponible antes de registrarte"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(firstName, lastName, email, password);
      console.log("Registro exitoso! Usuario creado como CUSTOMER");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registro falló:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-gray-700 text-sm font-medium"
          >
            Nombre
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-gray-700 text-sm font-medium"
          >
            Apellido
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="lastName"
              type="text"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
          Email corporativo
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="empresa@ejemplo.com"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isCheckingEmail}
              className={`pl-10 pr-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all ${
                emailVerified === true
                  ? "border-green-500 focus:border-green-600 bg-green-50"
                  : emailVerified === false
                  ? "border-red-500 focus:border-red-600 bg-red-50"
                  : ""
              } ${isCheckingEmail ? "opacity-60 cursor-not-allowed" : ""}`}
            />
            {isCheckingEmail && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            )}
            {!isCheckingEmail && emailVerified !== null && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {emailVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 animate-in fade-in zoom-in duration-300" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 animate-in fade-in zoom-in duration-300" />
                )}
              </div>
            )}
          </div>
          <Button
            type="button"
            onClick={handleVerifyEmail}
            disabled={isCheckingEmail || !email}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 whitespace-nowrap font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            {isCheckingEmail ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verificando...
              </span>
            ) : (
              "Verificar Email"
            )}
          </Button>
        </div>

        {/* Mensaje de estado de verificación */}
        {isCheckingEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verificando disponibilidad del email en el servidor...
            </p>
          </div>
        )}

        {!isCheckingEmail && emailVerified === true && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />✓ Email disponible - Puedes
              continuar con el registro
            </p>
          </div>
        )}

        {!isCheckingEmail && emailVerified === false && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-red-700 font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4" />✗ Este email ya está registrado -
              Por favor usa otro email
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeClosed className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

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

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || emailVerified !== true}
      >
        {isLoading ? "Cargando..." : "Registrarse"}
      </Button>
    </form>
  );
}
