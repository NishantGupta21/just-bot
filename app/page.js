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
      if (window.Telegram?.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
          setUserId(user.id); // Set user ID from Telegram
          saveUserData(user.id); // Save user ID to backend
        }
      }
    };

    script.onerror = () => {
      console.error("Failed to load Telegram Web App script.");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to save the user ID to the backend
  const saveUserData = async (userId) => {
    try {
      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId to the backend
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User saved:", data.message);
      } else {
        console.error("Failed to save user:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Telegram User ID</h1>
      {userId ? (
        <p>Your User ID: {userId}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </main>
  );
}
