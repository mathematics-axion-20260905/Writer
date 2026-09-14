"use client";

import React from "react";
import Link from "next/link";

import { AxActionLink, AxBadge, AxEmptyState, AxLoadingState } from "@/components/axion";
import { AxionMark } from "@/components/axion";
import { getEcosystemHref } from "@/lib/ecosystem/apps";
import { importLocalScientificObject, listLocalScientificObjects } from "@/lib/ecosystem/local-object-store";
import { getLocalProjectTitle, resolveActiveProjectId } from "@/lib/ecosystem/project-context";
import { getRemoteProject, listRemoteScientificObjects } from "@/lib/ecosystem/remote-object-store";
import type { ScientificObject } from "@/lib/ecosystem/contracts";
import { useLocale } from "@/components/locale-provider";

export default function WriterProjectResultsPage() {
    const { locale } = useLocale();
    const copy = locale === "uz"
        ? { workspace: "Loyiha dalillari", importJson: "JSON import qilish", imported: "Import qilindi", importedOther: "Boshqa Loyihaga import qilindi", importFailed: "Import amalga oshmadi", documents: "Hujjatlar", newDocument: "Yangi hujjat", results: "Loyiha natijalari", active: "Faol loyiha", lead: "Saqlangan ilmiy natijani tanlab, undan Writer qoralamasini boshlang. Dalil nusxaga ajralib ketmaydi, o‘sha Loyiha bilan bog‘langan holda qoladi.", resultCount: "Natijalar", source: "Manba", context: "Kontekst", noProject: "Faol Loyiha yo‘q.", noProjectDescription: "Hujjat bir xil tadqiqot kontekstini saqlashi uchun Writerga Science Hub orqali kiring.", loading: "Loyiha natijalari yuklanmoqda", loadingDetail: "Ekotizim yadrosidagi saqlangan ilmiy obyektlar o‘qilmoqda.", saved: "Saqlangan natija", empty: "Hozircha saqlangan Math natijalari yo‘q.", emptyDescription: "Laboratoriyada masala yeching va Save tugmasini bosing. Natija server orqali alohida import qilinmasdan shu yerda ko‘rinadi.", openMath: "Mathni ochish" }
        : { workspace: "Project evidence", importJson: "Import JSON", imported: "Imported", importedOther: "Imported into another Project", importFailed: "Import failed", documents: "Documents", newDocument: "New document", results: "Project results", active: "Active project", lead: "Choose a saved scientific result and start a Writer draft from it. Evidence stays linked to the same Project instead of becoming a detached copy.", resultCount: "Results", source: "Source", context: "Context", noProject: "No active Project.", noProjectDescription: "Open Writer from the Science Hub so the document can keep the same research context.", loading: "Loading Project results", loadingDetail: "Reading saved scientific objects from the ecosystem core.", saved: "Saved result", empty: "No saved Math results yet.", emptyDescription: "Solve something in Laboratory and press Save. The result will appear here without a server-side import step.", openMath: "Open Math" };
    const [projectId, setProjectId] = React.useState<string | null>(null);
    const [projectTitle, setProjectTitle] = React.useState<string | null>(null);
    const [objects, setObjects] = React.useState<ScientificObject[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [transferMessage, setTransferMessage] = React.useState<string | null>(null);
    const importInputRef = React.useRef<HTMLInputElement>(null);

    const refreshObjects = React.useCallback((activeProjectId: string | null) => {
        if (!activeProjectId) return Promise.resolve();
        setLoading(true);
        return listLocalScientificObjects(activeProjectId)
            .then(async (items) => {
                const merged = new Map(items.map((item) => [item.id, item]));
                try {
                    const remote = await listRemoteScientificObjects(activeProjectId);
                    for (const object of remote) {
                        if (!merged.has(object.id)) {
                            try {
                                await importLocalScientificObject(object.serializedPayload);
                                const cached = (await listLocalScientificObjects(activeProjectId)).find((item) => item.id === object.id);
                                merged.set(object.id, cached || object);
                            } catch {
                                merged.set(object.id, object);
                            }
                        }
                    }
                } catch {
                    // Use the local cache while the core is temporarily offline.
                }
                setObjects([...merged.values()].filter((item) => item.sourceApp === "math"));
            })
            .catch(() => setObjects([]))
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        const activeProjectId = resolveActiveProjectId();
        setProjectId(activeProjectId);
        setProjectTitle(getLocalProjectTitle(activeProjectId));
        if (!activeProjectId) {
            setLoading(false);
            return;
        }
        void getRemoteProject(activeProjectId)
            .then((project) => { if (project?.title) setProjectTitle(project.title); })
            .catch(() => undefined);
        void refreshObjects(activeProjectId);
    }, [refreshObjects]);

    return (
        <div className="ax-workspace-root min-h-[calc(100vh-28px)]">
            <header className="ax-work-subnav sticky top-0 z-40">
                <div className="ax-work-container flex h-16 items-center justify-between gap-5">
                    <Link href="/" className="flex min-w-0 items-center gap-3 rounded-[var(--ax-work-control-radius)] outline-none focus-visible:shadow-[var(--ax-focus-ring)]">
                        <AxionMark className="h-8 w-8 text-[var(--ax-accent)]" />
                        <span className="min-w-0 leading-none"><span className="block truncate font-serif text-[19px] font-medium tracking-[-0.03em]">Axion Writer</span><span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--ax-text-faint)]">{copy.workspace}</span></span>
                    </Link>
                    <nav className="flex items-center gap-1.5" aria-label="Writer">
                        <input ref={importInputRef} type="file" accept="application/json,.json" className="hidden" onChange={async (event) => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (!file) return;
                            try {
                                const imported = await importLocalScientificObject(await file.text());
                                setTransferMessage(imported.projectId === projectId ? copy.imported : copy.importedOther);
                                await refreshObjects(projectId);
                            } catch (error) {
                                setTransferMessage(error instanceof Error ? error.message : copy.importFailed);
                            }
                        }} />
                        <AxActionLink href="#" variant="quiet" size="sm" onClick={(event) => { event.preventDefault(); importInputRef.current?.click(); }}>{copy.importJson}</AxActionLink>
                        {transferMessage ? <span className="hidden text-[9px] font-semibold text-[var(--ax-accent)] lg:inline">{transferMessage}</span> : null}
                        <AxActionLink href={projectId ? `/documents?project=${encodeURIComponent(projectId)}` : "/documents"} variant="quiet" size="sm">{copy.documents}</AxActionLink>
                        <AxActionLink href={projectId ? `/new?project=${encodeURIComponent(projectId)}` : "/new"} variant="primary" size="sm">{copy.newDocument}</AxActionLink>
                    </nav>
                </div>
            </header>

            <main className="ax-work-container">
                <section className="ax-work-pagehead">
                    <div>
                        <p className="ax-work-kicker">{copy.results}</p>
                        <h1 className="ax-work-title">{projectTitle || copy.active}</h1>
                        <p className="ax-work-lead">{copy.lead}</p>
                    </div>
                    <div className="ax-work-stats">
                        <div className="ax-work-stat"><div className="ax-work-stat-value">{objects.length}</div><div className="ax-work-stat-label">{copy.resultCount}</div></div>
                        <div className="ax-work-stat"><div className="ax-work-stat-value">Math</div><div className="ax-work-stat-label">{copy.source}</div></div>
                        <div className="ax-work-stat"><div className="ax-work-stat-value">Core</div><div className="ax-work-stat-label">{copy.context}</div></div>
                    </div>
                </section>

                <section className="ax-work-section">
                    {!projectId ? (
                        <AxEmptyState title={copy.noProject} description={copy.noProjectDescription} />
                    ) : loading ? (
                        <AxLoadingState label={copy.loading} detail={copy.loadingDetail} />
                    ) : objects.length ? (
                        <div className="ax-work-list">
                            {objects.map((object, index) => (
                                <article key={object.id} className="ax-work-row grid gap-4 px-1 py-6 sm:px-5 md:grid-cols-[54px_minmax(0,1fr)_auto] md:items-center lg:px-6">
                                    <div className="font-serif text-[20px] text-[var(--ax-text-faint)]">{String(index + 1).padStart(2, "0")}</div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2"><h2 className="truncate font-serif text-[26px] tracking-[-0.035em] text-[var(--ax-text)]">{object.title}</h2><AxBadge>{copy.saved}</AxBadge></div>
                                        <div className="mt-2 text-[9.5px] uppercase tracking-[0.13em] text-[var(--ax-text-faint)]">{object.domain || object.kind}</div>
                                    </div>
                                    <AxActionLink href={`/new?source=project&project=${encodeURIComponent(projectId)}&objectId=${encodeURIComponent(object.id)}`} variant="primary">{copy.newDocument}</AxActionLink>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <AxEmptyState title={copy.empty} description={copy.emptyDescription} action={<AxActionLink href={getEcosystemHref("math", "writer", projectId)}>{copy.openMath}</AxActionLink>} />
                    )}
                </section>
            </main>
        </div>
    );
}
