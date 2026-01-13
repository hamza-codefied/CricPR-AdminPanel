import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";
import { useToast } from "../../components/ui/toast";
import logo from "../../assets/CircPr-logo.png";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const { setTheme } = useThemeStore();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme).state.theme;
        setTheme(theme);
      } catch {
        setTheme("light");
      }
    }
  }, [setTheme]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      addToast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success",
      });
      navigate("/dashboard");
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-login-top-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230E795D' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-xl bg-card/95 relative z-10">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto mb-2 flex items-center justify-center">
            <img
              src={logo}
              alt="CricPR Logo"
              className="h-20 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <div>
            <CardDescription className="text-base">
              Enter your credentials to access the admin panel
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@cricpr.com"
                className="h-11 border-2 focus:border-primary transition-colors"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 border-2 focus:border-primary transition-colors"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-primary-button-gradient hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="pt-2">
              <p className="text-xs text-center text-muted-foreground bg-muted/50 rounded-lg py-2 px-3">
                <span className="font-semibold">Demo Credentials:</span>{" "}
                admin@cricpr.com / admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
