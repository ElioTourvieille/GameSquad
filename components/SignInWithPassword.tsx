"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
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
    <form
      className="flex flex-col"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        try {
          await signIn(provider ?? "password", formData);
          handleSent?.(formData.get("email") as string);
          // After successful sign in, redirect to /user
          router.push("/user");
        } catch (error) {
          console.error(error);
          const title =
            flow === "signIn"
              ? "Could not sign in, did you mean to sign up?"
              : "Could not sign up, did you mean to sign in?";
          toast({ title, variant: "destructive" });
          setSubmitting(false);
        }
      }}
    >
      <label htmlFor="email" className="text-purple-100">Email</label>
      <Input name="email" id="email" className="mb-4" autoComplete="email" />
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="text-purple-100">Password</label>
        {handlePasswordReset && flow === "signIn" ? (
          <Button
            className="p-0 h-auto"
            type="button"
            variant="link"
            onClick={handlePasswordReset}
          >
            Forgot your password?
          </Button>
        ) : null}
      </div>
      <Input
        type="password"
        name="password"
        id="password"
        className="mb-4 "
        autoComplete={flow === "signIn" ? "current-password" : "new-password"}
      />
      <input name="flow" value={flow} type="hidden" />
      <Button type="submit" disabled={submitting} className="bg-purple-700 hover:bg-purple-800">
        {flow === "signIn" ? "Sign in" : "Sign up"}
      </Button>
      <Button
        variant="link"
        type="button"
        onClick={() => {
          setFlow(flow === "signIn" ? "signUp" : "signIn");
        }}
      >
        {flow === "signIn"
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </Button>
    </form>
  );
}