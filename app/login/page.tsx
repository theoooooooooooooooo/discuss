"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      router.push("/chat");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Bon retour 👋
        </h1>

        <p className="auth-subtitle">
          Connectez-vous à Discuss
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            type="email"
            placeholder="Adresse email"
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? (
              <PacmanLoader
                size={12}
                color="#fff"
              />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ?{" "}
          <Link href="/register">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}