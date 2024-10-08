"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { registerUser } from "@/actions/auth/register-user";

export function RegisterForm() {
  const [_state, action, pending] = useActionState(registerUser, null);

  return (
    <form action={action} className="space-y-2" autoComplete="off">
      <Input type="text" name="username" placeholder="Username" className="w-full" />
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input type="password" name="password" placeholder="Password" className="w-full" />
      <Button className="w-full" disabled={pending}>
        Register
      </Button>
    </form>
  );
}
