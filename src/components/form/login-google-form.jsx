"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { loginGoogle } from "@/actions/auth/login-google";
import Image from "next/image";
import google from "@/assets/icon/google.svg";

export function LoginGoogleForm() {
  const [_state, action, pending] = useActionState(loginGoogle, null);

  return (
    <form action={action} className="space-y-2" autoComplete="off">
      <Button variant="outline" className="w-full space-x-2" disabled={pending}>
        <Image src={google} alt="google logo" />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}
