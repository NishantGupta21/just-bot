"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);

  // Apply dynamic styles for Telegram Web App viewport
  useEffect(() => {
    // Load Telegram WebApp script dynamically
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;

        // Set viewport styles
        document.body.style.setProperty(
          "--tg-viewport-height",
          `${webApp.viewportHeight}px`
        );
        document.body.style.setProperty(
          "--tg-viewport-stable-height",
          `${webApp.viewportStableHeight}px`
        );

        // Fetch user data
        const user = webApp.initDataUnsafe?.user;
        if (user) {
          setUserData(user);

          // Send user data to the backend
          const saveUserData = async () => {
            try {
              const res = await fetch("/api/saveUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: user.id, // Only send the userId
                }),
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

          saveUserData();
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
}
