export type PackageType = "cv_only" | "cv_plus"

export const PACKAGES = {
  cv_only: {
    label: "Kun CV",
    priceNOK: 199,
    features: ["CV-bygger"],
  },
  cv_plus: {
    label: "CV + søknad",
    priceNOK: 299,
    features: ["CV-bygger", "Søknads-AI"],
  },
} as const