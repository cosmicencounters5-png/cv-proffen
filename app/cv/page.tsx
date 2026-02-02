const improveFullCv = async () => {
  if (!sessionToken) return

  const res = await fetch("/api/ai/improve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({
      type: "full-cv",
      content: cv,
    }),
  })

  if (!res.ok) {
    alert("Kunne ikke forbedre CV-en")
    return
  }

  const { result } = await res.json()

  try {
    const improvedCv = JSON.parse(result)

    await saveCv({
      ...cv,
      ...improvedCv,
    })
  } catch (err) {
    console.error("AI returnerte ugyldig format", err)
    alert("AI-feil – prøv igjen")
  }
}