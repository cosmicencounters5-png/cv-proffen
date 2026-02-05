"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GratisPage() {
  const router = useRouter();

  useEffect(() => {
    // SET FREE TRIAL FLAG
    localStorage.setItem("cvproffen_free_trial", "true");

    // SEND USER TO REGISTER
    router.push("/register");
  }, []);

  return null;
}