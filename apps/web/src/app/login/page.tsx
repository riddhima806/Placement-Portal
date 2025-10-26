"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Users,
  Shield,
  GraduationCap,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("tpo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log("Login attempt:", { email, password, role: selectedRole });
      // Simulate login success
      alert(`Login successful as ${roles.find(r => r.id === selectedRole)?.name}!`);
      const selectedRoleData = roles.find(r => r.id === selectedRole);
      if (selectedRoleData) {
        router.push(selectedRoleData.route);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        className="fixed h-screen w-screen opacity-50 z-0"
        src="/bg.png"
        alt="Background"
      />
      <section className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/nmims.png" className="max-h-16 mx-auto mb-4" alt="NMIMS Logo" />
            <h1 className="text-3xl font-bold text-zinc-900">Placement Portal</h1>
            <p className="text-zinc-600 mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-zinc-200">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-3">
                  Select Role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedRole === role.id
                          ? "border-nmims bg-nmims/5"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-nmims text-white">
                          <role.icon className="size-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-zinc-900">{role.name}</h3>
                          <p className="text-sm text-zinc-600">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
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

              {/* Password Input */}
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-nmims text-white py-2 rounded-md font-medium hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-700 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-zinc-600 space-y-1">
                <p><strong>TPO:</strong> tpo@nmims.edu / password123</p>
                <p><strong>Admin:</strong> admin@nmims.edu / password123</p>
                <p><strong>Company:</strong> company@example.com / password123</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-zinc-600">
              Don't have an account?{" "}
              <Link href="/contact" className="text-nmims hover:underline">
                Contact Administrator
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}