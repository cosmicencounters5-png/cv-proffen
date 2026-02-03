import HomeClient from "./home-client";

export const metadata = {
  title: "CV-Proffen – Lag profesjonell CV og jobbsøknad på norsk",
  description:
    "CV-Proffen hjelper deg å lage en strukturert og korrekt CV og jobbsøknad basert kun på dine egne opplysninger. Egnet for privat og offentlig sektor.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomeClient />;
}