import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>Welcome to Chat App</h1>
      <p>Real-time chat using Next.js and Node.js</p>

      <div style={{ marginTop: "30px" }}>
        <Link href="api/auth/register">
          <button style={{ marginRight: "10px" }}>Register</button>
        </Link>

        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </main>
  );
}
