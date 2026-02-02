async function handleLogin(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // Etter login: sjekk entitlements
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push("/");
    return;
  }

  const { data } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", user.id)
    .single();

  const now = new Date();

  if (
    data?.has_cv &&
    (!data.expires_at || new Date(data.expires_at) > now)
  ) {
    router.push("/cv");
  } else {
    router.push("/pricing");
  }
}
