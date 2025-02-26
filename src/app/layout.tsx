import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of your pet with PetSoft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
