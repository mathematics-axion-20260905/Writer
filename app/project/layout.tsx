import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Project evidence",
    description: "Private view of saved scientific results available to the Writer workspace.",
    alternates: { canonical: "/project" },
    robots: noIndexRobots,
};

export default function WriterProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
