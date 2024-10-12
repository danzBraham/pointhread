import { LoginForm } from "@/components/form/login-form";
import { LoginGoogleForm } from "@/components/form/login-google-form";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="fixed left-8 top-8 text-3xl font-bold tracking-tight">
        Poin<span className="text-rose-500">thread</span>
      </h1>

      <section className="w-full max-w-sm space-y-6">
        <div>
          <h3 className="text-2xl font-medium">Log In</h3>
          <p>Hello, Welcome Back 👋</p>
        </div>

        <div className="space-y-4">
          <LoginForm />

          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-full rounded-full bg-slate-950"></div>
            <p className="text-sm">Or</p>
            <div className="h-[1px] w-full rounded-full bg-slate-950"></div>
          </div>

          <LoginGoogleForm />
        </div>

        <p>
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold text-rose-500">
            Register
          </a>
        </p>
      </section>
    </main>
  );
}
