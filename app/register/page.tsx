async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (signUpError || !data.user) {
    setError("Kunne ikke opprette konto.");
    setLoading(false);
    return;
  }

  const user = data.user;

  // CHECK FREE TRIAL FLAG
  const freeTrial = localStorage.getItem("cvproffen_free_trial");

  if (freeTrial === "true") {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await supabase.from("user_entitlements").upsert({
      user_id: user.id,
      has_cv: true,
      has_application: false,
      expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    });

    localStorage.removeItem("cvproffen_free_trial");

    router.push("/cv");
    return;
  }

  // NORMAL FLOW
  router.push("/pricing");
}