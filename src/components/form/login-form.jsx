"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { loginUser } from "@/actions/auth/login";

export function LoginForm() {
  const [_state, action, pending] = useActionState(loginUser, null);

  return (
    <form action={action} className="space-y-2" autoComplete="off">
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input type="password" name="password" placeholder="Password" className="w-full" />
      <Button className="w-full" disabled={pending}>
        Log In
      </Button>
    </form>
  );
}
