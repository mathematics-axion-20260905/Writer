import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Document workspace",
    description: "Private scientific document archive for papers, reports and books.",
    alternates: { canonical: "/documents" },
    robots: noIndexRobots,
};

export default function DocumentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
