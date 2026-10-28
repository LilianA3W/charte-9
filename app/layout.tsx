import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Votre entreprise | Institut de beauté et coiffure",
  description:
    "Maquette de la charte 9 : accueil éditorial pour un institut de beauté et salon de coiffure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
