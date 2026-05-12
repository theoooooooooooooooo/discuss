"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      console.log(error);
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Créer un compte ✨
        </h1>

        <p className="auth-subtitle">
          Rejoignez la communauté Discuss
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            type="text"
            placeholder="Nom"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Adresse email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
            value={password}
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
              "S’inscrire"
            )}
          </button>
        </form>

        <p className="auth-footer">
          Déjà inscrit ?{" "}
          <Link href="/login">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}