"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignInWithPassword({
  provider,
  handleSent,
  handlePasswordReset,
}: {
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
      setSubmitting(true);
      const formData = new FormData(event.currentTarget);
      try {
        await signIn(provider ?? "password", formData);
        toast({
          title: flow === "signIn" ? "Signed in successfully!" : "Account created successfully!",
          description: "Redirected to dashboard",
        });
        handleSent?.(formData.get("email") as string);
        router.push("/user");
      } catch (error) {
        console.error(error);
        const title = flow === "signIn"
          ? "Could not sign in, did you mean to sign up?"
          : "Could not sign up, did you mean to sign in?";
        toast({ 
          title, 
          description: "Please check your credentials and try again.",
          variant: "destructive" 
        });
      } finally {
        setSubmitting(false);
      }
    }} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-indigo-300">Email</label>
        <Input
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
          disabled={submitting}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-indigo-300">Password</label>
          {handlePasswordReset && flow === "signIn" && (
            <Button
              type="button"
              variant="link"
              onClick={handlePasswordReset}
              className="text-purple-400 hover:text-purple-300 p-0 h-auto"
            >
              Forgot your password?
            </Button>
          )}
        </div>
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete={flow === "signIn" ? "current-password" : "new-password"}
          className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
          disabled={submitting}
        />
      </div>
      <input name="flow" value={flow} type="hidden" />
      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={submitting}
      >
        {submitting ? "Loading..." : flow === "signIn" ? "Sign in" : "Sign up"}
      </Button>
      <Button
        variant="link"
        type="button"
        className="w-full text-purple-400 hover:text-purple-300"
        onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
      >
        {flow === "signIn"
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </Button>
    </form>
  );
}