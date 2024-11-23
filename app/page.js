"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const user = window.Telegram?.WebApp.initDataUnsafe?.user;
      const userId = user?.id || 123; // Fallback user ID if not available
      setUserId(userId);
      saveUserData(userId);
    };

    script.onerror = () => {
      console.error("Failed to load Telegram Web App script.");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const saveUserData = async (userId) => {
    try {
      const res = await fetch("/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User data saved:", data);
      } else {
        console.error("Error saving user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Telegram User ID</h1>
      <p>
        {userId ? `Your User ID: ${userId}` : "Loading user information..."}
      </p>
    </main>
  );
}
