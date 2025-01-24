import { Suspense } from "react"
import ServiceLanding from "../components/ServiceLanding"

export default function LandingHousing() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceLanding service="Housing" />
    </Suspense>
  )
}

