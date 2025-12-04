import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
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

  // Estados para verificaciÃ³n de email
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { register, isLoading, clearError } = useAuthStore();
  const { checkEmailExists } = useCustomerStore();

  // FunciÃ³n para verificar si el email existe (automÃ¡tica)
  const handleVerifyEmail = async (emailToVerify: string) => {
    // ValidaciÃ³n bÃ¡sica de formato
    if (!emailToVerify || !emailToVerify.includes("@")) {
      setEmailVerified(null);
      setEmailError(null);
      return;
    }

    setIsCheckingEmail(true);
    setEmailVerified(null);
    setEmailError(null);

    try {
      console.log("Iniciando verificacion de email:", emailToVerify);
      const exists = await checkEmailExists(emailToVerify);
      console.log("Resultado de verificacion - Email existe:", exists);
      
      setEmailVerified(!exists); // true si esta disponible, false si ya existe
      setEmailError(null);
    } catch (error: any) {
      console.error("Error al verificar email:", error);
      
      // Manejo especÃ­fico de errores
      let errorMessage = "Error al verificar el email. Por favor intenta nuevamente.";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 400) {
        errorMessage = "El formato del email no es valido o no es aceptado por el servidor.";
      } else if (error?.response?.status === 500) {
        errorMessage = "Error en el servidor. Por favor intenta mas tarde.";
      }
      
      setEmailError(errorMessage);
      setEmailVerified(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Resetear verificaciÃ³n cuando cambia el email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailVerified(null);
    setEmailError(null);
  };

  // Verificar automÃ¡ticamente cuando el usuario sale del campo
  const handleEmailBlur = () => {
    console.log("Campo email perdiÃ³ el foco. Email actual:", email);
    if (email && email.includes("@")) {
      handleVerifyEmail(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Validar que el email haya sido verificado y estÃ© disponible
    if (emailVerified !== true) {
      alert(
        "Por favor verifica que el email este disponible antes de registrarte"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseÃ±as no coinciden");
      return;
    }

    try {
      await register(firstName, lastName, email, password);
      console.log("Registro exitoso! Usuario creado como CUSTOMER");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registro fallÃ³:", error);
    }
  };

  return (
    <div className="space-y-5">
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
              placeholder="PÃ©rez"
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
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="empresa@ejemplo.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
            disabled={isCheckingEmail}
            className={`pl-10 pr-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all ${
              emailVerified === true
                ? "border-green-500 focus:border-green-600 bg-green-50"
                : emailVerified === false || emailError
                ? "border-red-500 focus:border-red-600 bg-red-50"
                : ""
            } ${isCheckingEmail ? "opacity-60 cursor-not-allowed" : ""}`}
          />
          {isCheckingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          )}
          {!isCheckingEmail && emailVerified !== null && !emailError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {emailVerified ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 animate-in fade-in zoom-in duration-300" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 animate-in fade-in zoom-in duration-300" />
              )}
            </div>
          )}
          {!isCheckingEmail && emailError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-orange-600 animate-in fade-in zoom-in duration-300" />
            </div>
          )}
        </div>

        {/* Mensaje de estado de verificaciÃ³n */}
        {isCheckingEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verificando disponibilidad del email en el servidor...
            </p>
          </div>
        )}

        {!isCheckingEmail && emailVerified === true && !emailError && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
            Email disponible - Puedes continuar con el registro
            </p>
          </div>
        )}

        {!isCheckingEmail && emailVerified === false && !emailError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-red-700 font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Este email ya esta registrado - Por favor usa otro email
            </p>
          </div>
        )}

        {!isCheckingEmail && emailError && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-orange-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {emailError}
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
            placeholder="********"
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
              <EyeOff className="w-4 h-4" />
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
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="pl-10 pr-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || emailVerified !== true}
      >
        {isLoading ? "Cargando..." : "Registrarse"}
      </Button>
    </div>
  );
}