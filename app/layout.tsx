import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/providers/auth-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Capsa Lycei",
  description: "Plataforma educativa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={font.className}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
