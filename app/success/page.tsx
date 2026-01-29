import { Suspense } from "react"
import SuccessClient from "./SuccessClient"

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Fullfører kjøp…</p>}>
      <SuccessClient />
    </Suspense>
  )
}