import type { Metadata } from "next";
import { AdminMediaManager } from "@/components/features/admin-media/AdminMediaManager";

export const metadata: Metadata = {
  title: "Media Admin | Iffer's Pictures",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMediaPage() {
  return <AdminMediaManager />;
}
