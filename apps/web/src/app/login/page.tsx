"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Users, Shield, Eye, EyeOff } from "lucide-react";

export default function LoginPahe() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Login></Login>
    </Suspense>
  );
}

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRole, setSelectedRole] = useState("tpo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      id: "tpo",
      name: "TPO Officer",
      description: "Manage drives, companies, and student data",
      icon: Users,
      route: "/tpo",
    },
    {
      id: "admin",
      name: "Admin",
      description: "Full system access and approvals",
      icon: Shield,
      route: "/admin",
    },
    {
      id: "company",
      name: "Company",
      description: "Post drives and manage applications",
      icon: Building2,
      route: "/company",
    },
  ];

  // auto-select role from query params
  useEffect(() => {
    const roleFromQuery = searchParams.get("role");
    if (roleFromQuery && roles.some((r) => r.id === roleFromQuery)) {
      setSelectedRole(roleFromQuery);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const selectedRoleData = roles.find((r) => r.id === selectedRole);
      alert(`Login successful as ${selectedRoleData?.name}!`);
      if (selectedRoleData) router.push(selectedRoleData.route as any);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="relative min-h-screen flex bg-zinc-50">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/bg.png"
        alt="Background"
      />

      <div className="relative z-10 flex w-full max-w-5xl mx-auto my-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left side — Logo & Role selector */}
        <div className="w-1/2 bg-zinc-50 border-r border-zinc-200 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <img src="/nmims.png" className="h-14" alt="NMIMS Logo" />
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">
                Placement Portal
              </h1>
              <p className="text-zinc-600 text-sm">NMIMS University</p>
            </div>
          </div>

          <h2 className="text-sm font-medium text-zinc-700 mb-3">
            Select your role
          </h2>
          <div className="flex flex-col gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedRole === role.id
                    ? "border-nmims bg-nmims/5"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="p-2 rounded-lg bg-nmims text-white">
                  <role.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-zinc-900">{role.name}</h3>
                  <p className="text-sm text-zinc-600">{role.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right side — Login form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Sign in</h2>
            <p className="text-zinc-600 text-sm mt-1">
              Continue as{" "}
              <span className="font-medium text-nmims">
                {roles.find((r) => r.id === selectedRole)?.name}
              </span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-nmims text-white py-2 rounded-md font-medium hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-zinc-50 rounded-lg text-sm">
            <p className="font-medium text-zinc-700 mb-1">Demo Credentials</p>
            <p className="text-zinc-600">
              <strong>TPO:</strong> tpo@nmims.edu / password123
              <br />
              <strong>Admin:</strong> admin@nmims.edu / password123
              <br />
              <strong>Company:</strong> company@example.com / password123
            </p>
          </div>

          <p className="text-sm text-center text-zinc-600 mt-8">
            Don’t have an account?{" "}
            <span className="text-nmims hover:underline">
              Contact Administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
