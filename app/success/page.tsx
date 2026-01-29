export const dynamic = "force-dynamic"

import { Suspense } from "react"
import SuccessContent from "./SuccessContent"

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Laster…</div>}>
      <SuccessContent />
    </Suspense>
  )
}