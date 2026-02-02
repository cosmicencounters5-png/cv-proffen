import { redirect } from "next/navigation";
import CvWizard from "./CvWizard";

export default function CvPage({
  searchParams,
}: {
  searchParams: { paid?: string };
}) {
  // Kun tilgang hvis betalt
  if (searchParams.paid !== "true") {
    redirect("/pricing");
  }

  return (
    <div className="container">
      <h1>Lag din CV</h1>
      <CvWizard />
    </div>
  );
}