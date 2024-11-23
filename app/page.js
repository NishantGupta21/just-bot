"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);

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

          // Send user data to backend API to save it in MongoDB
          fetch("/api/saveUserData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              joinDate: user.join_date,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("User data saved:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      {userData ? (
        <div>
          <h1>Welcome to Telegram Mini App</h1>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Language Code: {userData.language_code}</p>
          <p>Chat ID: {userData.id}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
