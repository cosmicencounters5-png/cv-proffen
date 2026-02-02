import LogoutButton from "@/components/LogoutButton";

export default function AccountPage() {
  return (
    <div className="container">
      <h1>Min konto</h1>

      <div className="card" style={{ marginTop: 24 }}>
        <LogoutButton />
      </div>
    </div>
  );
}