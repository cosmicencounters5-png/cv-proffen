"use client";

import { useState } from "react";
import StepPersonal from "./steps/StepPersonal";
import StepExperience from "./steps/StepExperience";
import StepEducation from "./steps/StepEducation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CvPdf from "./CvPdf";

export default function CvWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<string | null>(null);

  const [data, setData] = useState({
    personal: {},
    experience: "",
    education: "",
  });

  async function generateCv() {
    setLoading(true);
    setCv(null);

    const res = await fetch("/api/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setCv(json.cv);
    setLoading(false);
  }

  return (
    <div className="card">
      {step === 1 && (
        <StepPersonal
          value={data.personal}
          onChange={(v: any) =>
            setData({ ...data, personal: v })
          }
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepExperience
          value={data.experience}
          onChange={(v: string) =>
            setData({ ...data, experience: v })
          }
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepEducation
          value={data.education}
          onChange={(v: string) =>
            setData({ ...data, education: v })
          }
          onBack={() => setStep(2)}
          onGenerate={generateCv}
          loading={loading}
        />
      )}

      {cv && (
        <div style={{ marginTop: 24 }}>
          <h3>Forhåndsvisning av CV</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f9fafb",
              padding: 16,
              borderRadius: 8,
              marginTop: 12,
            }}
          >
            {cv}
          </pre>

          {/* ✅ PDF-knapp – RIKTIG MÅTE */}
          <PDFDownloadLink
            document={<CvPdf data={data} />}
            fileName="cv-proffen.pdf"
            style={{
              marginTop: 16,
              display: "inline-block",
              background: "#16a34a",
              color: "white",
              padding: "10px 16px",
              borderRadius: 6,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Last ned PDF
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}