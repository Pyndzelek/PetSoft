import Logo from "@/components/logo";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center h-screen">
      <Logo />
      {children}
      <Toaster position="bottom-right" />
    </div>
  );
}
