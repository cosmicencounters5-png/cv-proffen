const improveWithAI = async () => {
  setLoading(true)

  const res = await fetch("/api/ai/improve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "summary",
      content: value,
    }),
  })

  const json = await res.json()
  if (json.result) {
    setDraft(json.result)
  }

  setLoading(false)
}