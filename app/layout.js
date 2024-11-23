import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Telegram Mini App</title>
        <meta
          name="description"
          content="A Telegram JUST tokens mining mini app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
