import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
    title: "New scientific document",
    description: "Private manuscript editor for starting a paper, report or book from a template or scientific object.",
    alternates: { canonical: "/new" },
    robots: noIndexRobots,
};

export default function NewDocumentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
