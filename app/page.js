"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;

        // Set viewport styles for better UI
        document.body.style.setProperty(
          "--tg-viewport-height",
          `${webApp.viewportHeight}px`
        );
        document.body.style.setProperty(
          "--tg-viewport-stable-height",
          `${webApp.viewportStableHeight}px`
        );

        // Fetch user data from Telegram Web App
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
                  userId: user.id,
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

          saveUserData();
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

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {userData && <p>Welcome, {userData.first_name}!</p>}
    </main>
  );
}
