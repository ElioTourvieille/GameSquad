import { SignInWithPassword } from "@/components/SignInWithPassword";
import { Toaster } from "@/components/ui/toaster";

export function SignInFormPassword() {
  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      <h2 className="font-semibold text-2xl text-purple-100 tracking-tight">
        Sign in or create an account
      </h2>
      <SignInWithPassword />
      <Toaster />
    </div>
  );
}