const res = await fetch("/api/cv", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ test: "HELLO_FROM_FRONTEND" }),
})

console.log("SAVE RESPONSE:", await res.json())