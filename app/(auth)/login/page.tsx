import LoginForm from "@/components/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm p-6 border border-black rounded-lg shadow-sm">
        {/* Logo / Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">Admin Login</h1>
          <p className="text-sm text-gray-600">Sign in to manage your store</p>
        </div>

        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
}
