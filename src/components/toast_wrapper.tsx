import { ToastProvider } from "@heroui/react";

export default function ToastWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}