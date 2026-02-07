import type { Metadata } from "next";
import { Raleway, Lora, Archivo_Black } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Community Patrol | Toronto Neighborhood Security",
  description:
    "Toronto's first proactive neighborhood security service. Trained officers on your streets before trouble starts.",
  openGraph: {
    title: "Community Patrol | Toronto Neighborhood Security",
    description:
      "Toronto's first proactive neighborhood security service. Trained officers on your streets before trouble starts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${lora.variable} ${archivoBlack.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
