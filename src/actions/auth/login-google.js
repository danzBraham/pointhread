"use server";

import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/utils/arctic";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginGoogle(_prevState, _formData) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  await cookies().set("codeVerifier", codeVerifier);

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  redirect(url.href);
}
