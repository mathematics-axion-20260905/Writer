"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, X } from "lucide-react";

import { AxBadge, AxButton, AxEmptyState, AxLoadingState, AxNotice } from "@/components/axion";
import { AxionMark } from "@/components/axion";
import { WriteTypeSelector } from "@/components/write-type-selector";
import { fetchPublic, isExpectedBackendOfflineError } from "@/lib/api";
import { deleteWriterPaper } from "@/lib/writer-api";
import { useLocale } from "@/components/locale-provider";

type Paper = {
    id: number;
    title: string;
    abstract: string;
    status: string;
    document_kind?: string;
    section_count?: number;
    created_at: string;
    updated_at: string;
};

type Filter = "all" | "draft" | "published";

export default function DocumentsPage() {
    const { locale } = useLocale();
    const copy = locale === "uz"
        ? {
            workspace: "Nashr ish maydoni", projectResults: "Loyiha natijalari", newDocument: "Yangi hujjat", documents: "Hujjatlar", title: "Ilmiy nashr ish maydoni.", lead: "Maqola, hisobot va kitoblarni qo‘lyozmaga yo‘naltirilgan muhitda yozing. Ilmiy dalillar o‘z manbasi bo‘lgan Loyiha bilan bog‘langan holda qoladi.", search: "Hujjatlardan izlash", clear: "Qidiruvni tozalash", drafts: "Qoralamalar", published: "Nashr qilingan", allDocuments: "Barcha hujjatlar", manuscriptNote: "Avval qo‘lyozma. Ilmiy metadata yozuvga zarur bo‘lmaguncha ikkilamchi bo‘lib qoladi.", archiveUnavailable: "Arxiv mavjud emas", archiveOffline: "Hujjatlar arxivi vaqtincha ishlamayapti. Mahalliy yozuv va yangi hujjatlar mavjud.", archiveError: "Hujjatlar arxivini yuklab bo‘lmadi. Yangi qoralama boshlashingiz mumkin.", loading: "Hujjatlar yuklanmoqda", loadingDetail: "Joriy Writer arxivi o‘qilmoqda.", emptyTitle: "Hozircha hujjatlar yo‘q.", emptyDescription: "Bo‘sh qoralamadan boshlang yoki saqlangan Loyiha natijasidan hujjat yarating.", createDocument: "Hujjat yaratish", untitled: "Nomsiz hujjat", noAbstract: "Annotatsiya hali kiritilmagan.", sections: "bo‘lim", updated: "Yangilangan", open: "Ochish", delete: "Hujjatni o‘chirish", confirmDelete: "«{title}» hujjati o‘chirilsinmi?", publishedStatus: "Nashr qilingan", draftStatus: "Qoralama",
        }
        : {
            workspace: "Publication workspace", projectResults: "Project results", newDocument: "New document", documents: "Documents", title: "Scientific publication workspace.", lead: "Draft papers, reports and books in a manuscript-focused environment. Scientific evidence remains linked to the Project it came from.", search: "Search documents", clear: "Clear search", drafts: "Drafts", published: "Published", allDocuments: "All documents", manuscriptNote: "Manuscript first. Scientific metadata remains secondary until the writing requires it.", archiveUnavailable: "Archive unavailable", archiveOffline: "Document archive is offline. Local drafting and new documents remain available.", archiveError: "The document archive could not be loaded. You can still start a new draft.", loading: "Loading documents", loadingDetail: "Reading the current Writer archive.", emptyTitle: "No documents here yet.", emptyDescription: "Start with a clean draft or create one from a saved Project result.", createDocument: "Create document", untitled: "Untitled document", noAbstract: "No abstract yet.", sections: "sections", updated: "Updated", open: "Open", delete: "Delete document", confirmDelete: "Delete “{title}”?", publishedStatus: "Published", draftStatus: "Draft",
        };
    const [projectId, setProjectId] = useState<string | null>(null);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");
    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        setProjectId(new URLSearchParams(window.location.search).get("project"));
    }, []);

    const fetchPapers = useCallback(async () => {
        setLoading(true);
        setNotice(null);
        try {
            const params = new URLSearchParams();
            if (filter !== "all") params.set("status", filter);
            if (query.trim()) params.set("q", query.trim());
            if (projectId) params.set("project", projectId);
            const response = await fetchPublic(`/api/builder/papers/?${params.toString()}`);
            if (!response.ok) throw new Error("archive-unavailable");
            setPapers(await response.json());
        } catch (error) {
            setPapers([]);
            setNotice(isExpectedBackendOfflineError(error) ? copy.archiveOffline : copy.archiveError);
        } finally {
            setLoading(false);
        }
    }, [copy.archiveError, copy.archiveOffline, filter, locale, projectId, query]);

    useEffect(() => {
        const timer = window.setTimeout(() => void fetchPapers(), 260);
        return () => window.clearTimeout(timer);
    }, [fetchPapers]);

    const counts = useMemo(() => ({
        all: papers.length,
        draft: papers.filter((paper) => paper.status === "draft").length,
        published: papers.filter((paper) => paper.status === "published").length,
    }), [papers]);

    return (
        <div className="ax-workspace-root min-h-[calc(100vh-28px)]">
            <header className="ax-work-subnav sticky top-0 z-40">
                <div className="ax-work-container flex h-16 items-center justify-between gap-5">
                    <Link href="/" className="flex min-w-0 items-center gap-3 rounded-[var(--ax-work-control-radius)] outline-none focus-visible:shadow-[var(--ax-focus-ring)]">
                        <AxionMark className="h-8 w-8 text-[var(--ax-accent)]" />
                        <span className="min-w-0 leading-none">
                            <span className="block truncate font-serif text-[19px] font-medium tracking-[-0.03em]">Axion Writer</span>
                            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--ax-text-faint)]">{copy.workspace}</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href={projectId ? `/project?project=${encodeURIComponent(projectId)}` : "/project"} className="hidden px-3 py-2 text-[11px] font-semibold text-[var(--ax-text-soft)] hover:text-[var(--ax-text)] sm:inline-flex">{copy.projectResults}</Link>
                        <AxButton variant="primary" size="sm" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" />{copy.newDocument}</AxButton>
                    </div>
                </div>
            </header>

            <main className="ax-work-container">
                <section className="ax-work-pagehead">
                    <div>
                        <p className="ax-work-kicker">{copy.documents}</p>
                        <h1 className="ax-work-title">{copy.title}</h1>
                        <p className="ax-work-lead">{copy.lead}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ax-text-faint)]" />
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} className="ax-work-input h-11 w-full pl-10 pr-10 text-sm" />
                            {query ? <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ax-text-faint)] hover:text-[var(--ax-text)]" aria-label={copy.clear}><X className="h-4 w-4" /></button> : null}
                        </div>
                        <div className="ax-work-stats">
                            <div className="ax-work-stat"><div className="ax-work-stat-value">{counts.all}</div><div className="ax-work-stat-label">{copy.documents}</div></div>
                            <div className="ax-work-stat"><div className="ax-work-stat-value">{counts.draft}</div><div className="ax-work-stat-label">{copy.drafts}</div></div>
                            <div className="ax-work-stat"><div className="ax-work-stat-value">{counts.published}</div><div className="ax-work-stat-label">{copy.published}</div></div>
                        </div>
                    </div>
                </section>

                <section className="ax-work-section grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)]">
                    <aside>
                        <div className="sticky top-[88px] border-t border-[var(--ax-work-line)] pt-3">
                            {([[
                                "all", copy.allDocuments],
                                ["draft", copy.drafts],
                                ["published", copy.published],
                            ] as const).map(([id, label]) => (
                                <button key={id} onClick={() => setFilter(id)} className={`flex w-full items-center justify-between border-l px-3 py-3 text-left text-[11px] font-semibold transition-colors ${filter === id ? "border-[var(--ax-accent)] text-[var(--ax-text)]" : "border-transparent text-[var(--ax-text-soft)] hover:border-[var(--ax-line-strong)] hover:text-[var(--ax-text)]"}`}>
                                    <span>{label}</span><span className="text-[10px] text-[var(--ax-text-faint)]">{counts[id]}</span>
                                </button>
                            ))}
                            <div className="mt-6 border-t border-[var(--ax-work-line)] pt-5 text-[10px] leading-5 text-[var(--ax-text-faint)]">{copy.manuscriptNote}</div>
                        </div>
                    </aside>

                    <div className="min-w-0">
                        {notice ? <AxNotice tone="warning" title={copy.archiveUnavailable}>{notice}</AxNotice> : null}
                        {loading ? (
                            <AxLoadingState label={copy.loading} detail={copy.loadingDetail} />
                        ) : papers.length === 0 ? (
                            <AxEmptyState title={copy.emptyTitle} description={copy.emptyDescription} action={<AxButton variant="primary" onClick={() => setCreateOpen(true)}>{copy.createDocument}</AxButton>} />
                        ) : (
                            <div className="ax-work-list">
                                {papers.map((paper) => (
                                    <article key={paper.id} className="ax-work-row group grid gap-4 px-1 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-5 lg:px-6">
                                        <Link href={`/${paper.id}${projectId ? `?project=${encodeURIComponent(projectId)}` : ""}`} className="min-w-0 rounded-[var(--ax-work-control-radius)] outline-none focus-visible:shadow-[var(--ax-focus-ring)]">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="truncate font-serif text-[25px] tracking-[-0.035em]">{paper.title || copy.untitled}</h2>
                                                <AxBadge tone={paper.status === "published" ? "success" : "neutral"}>{paper.status === "published" ? copy.publishedStatus : copy.draftStatus}</AxBadge>
                                                <AxBadge>{paper.document_kind || "paper"}</AxBadge>
                                            </div>
                                            <p className="mt-2 line-clamp-2 max-w-3xl text-[12px] leading-6 text-[var(--ax-text-soft)]">{paper.abstract || copy.noAbstract}</p>
                                            <div className="mt-3 flex flex-wrap gap-4 text-[9.5px] text-[var(--ax-text-faint)]">
                                                <span>{paper.section_count || 1} {copy.sections}</span>
                                                <span>{copy.updated} {new Date(paper.updated_at).toLocaleDateString()}</span>
                                            </div>
                                        </Link>
                                        <div className="flex items-center gap-1">
                                            <Link href={`/${paper.id}`} className="inline-flex h-9 items-center rounded-[var(--ax-work-control-radius)] border border-[var(--ax-work-line-strong)] bg-[var(--ax-surface)] px-3 text-[10px] font-semibold hover:bg-[var(--ax-work-surface-muted)]">{copy.open}</Link>
                                            <button onClick={async () => { if (window.confirm(copy.confirmDelete.replace("{title}", paper.title || copy.untitled))) { await deleteWriterPaper(paper.id); await fetchPapers(); } }} className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--ax-work-control-radius)] text-[var(--ax-text-faint)] hover:bg-[var(--ax-work-surface-muted)] hover:text-[var(--ax-danger)]" aria-label={copy.delete}><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <WriteTypeSelector isOpen={createOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
}
