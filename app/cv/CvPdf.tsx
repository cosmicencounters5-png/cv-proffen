"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

export default function CvPdf({ data }: any) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{data.personal?.navn}</Text>

        <Text style={styles.section}>Kontakt</Text>
        <Text>{data.personal?.epost}</Text>
        <Text>{data.personal?.telefon}</Text>

        <Text style={styles.section}>Arbeidserfaring</Text>
        <Text>{data.experience}</Text>

        {data.education && (
          <>
            <Text style={styles.section}>Utdanning</Text>
            <Text>{data.education}</Text>
          </>
        )}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11 },
  title: { fontSize: 18, marginBottom: 12 },
  section: {
    fontSize: 13,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});