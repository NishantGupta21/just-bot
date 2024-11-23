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
        } else {
          console.log("User ID not available.");
          setUserId(123);
          saveUserData(123);
        }
      }
    };

    script.onerror = () => {
      console.error("Failed to load Telegram Web App script.");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect only runs once on component mount

  const saveUserData = async (userId) => {
    try {
      const res = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User data saved:", data);
      } else if (res.status === 409) {
        console.log("User already exists, no action needed");
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
      {userId ? (
        <p>Your User ID: {userId}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </main>
  );
}
