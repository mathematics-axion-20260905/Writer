import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Edit document",
    description: "Private scientific manuscript editor.",
    robots: noIndexRobots,
};

export default function EditDocumentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
