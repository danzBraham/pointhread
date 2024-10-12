"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { register } from "@/actions/auth/register";

export function RegisterForm() {
  const [_state, action, pending] = useActionState(register, null);

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
