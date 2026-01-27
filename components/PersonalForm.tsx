import { CV } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function PersonalForm({ cv, setCv }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <input
        placeholder="Fornavn"
        value={cv.personal.firstName}
        onChange={(e) =>
          setCv({ ...cv, personal: { ...cv.personal, firstName: e.target.value } })
        }
      />
      <input
        placeholder="Etternavn"
        value={cv.personal.lastName}
        onChange={(e) =>
          setCv({ ...cv, personal: { ...cv.personal, lastName: e.target.value } })
        }
      />
      <input
        placeholder="E-post"
        value={cv.personal.email}
        onChange={(e) =>
          setCv({ ...cv, personal: { ...cv.personal, email: e.target.value } })
        }
      />
      <input
        placeholder="Telefon"
        value={cv.personal.phone}
        onChange={(e) =>
          setCv({ ...cv, personal: { ...cv.personal, phone: e.target.value } })
        }
      />
    </div>
  )
}