import HomeClient from "./home-client";

export const metadata = {
  title: "CV-Proffen | Lag profesjonell CV og jobbsøknad på norsk – på minutter",
  description:
    "Lag en profesjonell CV og jobbsøknad på norsk, basert kun på dine egne opplysninger. Ingen gjetting. Klar PDF. Brukes av jobbsøkere i Norge.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomeClient />;
}