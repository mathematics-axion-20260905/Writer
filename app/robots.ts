import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/documents", "/new", "/project"] }],
        sitemap: "https://writer.dirac.space/sitemap.xml",
    };
}
