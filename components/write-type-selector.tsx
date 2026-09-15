"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Check, FlaskConical, GraduationCap, Newspaper, ScrollText, X } from "lucide-react";

import {
    DEFAULT_WRITER_TEMPLATE_ID,
    writerTemplates,
    type WriterTemplateCategory,
    type WriterTemplateIcon,
} from "@/lib/writer-templates";
import { useLocale } from "@/components/locale-provider";

interface WriteTypeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

const iconMap: Record<WriterTemplateIcon, typeof BookOpen> = {
    "book-open": BookOpen,
    flask: FlaskConical,
    "graduation-cap": GraduationCap,
    newspaper: Newspaper,
    "scroll-text": ScrollText,
};

function templateCategoryLabel(category: WriterTemplateCategory, locale: "en" | "uz") {
    if (locale === "uz") {
        if (category === "research") return "Tadqiqot";
        if (category === "article") return "Maqola";
        if (category === "teaching") return "O‘qitish";
        if (category === "thesis") return "Dissertatsiya";
        if (category === "book") return "Kitob";
        return "Laboratoriya";
    }
    if (category === "research") return "Research";
    if (category === "article") return "Article";
    if (category === "teaching") return "Teaching";
    if (category === "thesis") return "Thesis";
    if (category === "book") return "Book";
    return "Lab";
}

const templateLabels: Record<string, { en: { title: string; summary: string }; uz: { title: string; summary: string } }> = {
    "research-paper": { en: { title: "Research paper", summary: "IMRaD structure for formal scientific work." }, uz: { title: "Tadqiqot maqolasi", summary: "Formal ilmiy maqola uchun IMRaD tuzilmasi." } },
    "expository-article": { en: { title: "Expository article", summary: "A clear structure for explanatory or public-facing writing." }, uz: { title: "Tushuntiruvchi maqola", summary: "Tushuntiruvchi va ilmiy-ommabop matnlar uchun aniq tuzilma." } },
    "lecture-note": { en: { title: "Lecture notes", summary: "Definitions, examples and exercises for teaching material." }, uz: { title: "Ma’ruza konspekti", summary: "Dars va seminar materiallari uchun ta’rif, misol va mashqlar." } },
    "thesis-chapter": { en: { title: "Thesis chapter", summary: "A formal structure for a thesis or dissertation chapter." }, uz: { title: "Dissertatsiya bobi", summary: "Bitiruv ishi yoki dissertatsiya bobi uchun formal tuzilma." } },
    "textbook-manuscript": { en: { title: "Book manuscript", summary: "A chapter-based structure for a textbook or monograph." }, uz: { title: "Kitob qo‘lyozmasi", summary: "Darslik yoki monografiya uchun boblar asosidagi tuzilma." } },
    "lab-report": { en: { title: "Laboratory report", summary: "Turn computational results into a clear research report." }, uz: { title: "Laboratoriya hisoboti", summary: "Hisoblash natijalarini aniq ilmiy hisobotga aylantirish uchun." } },
};

function localizedTemplate(template: (typeof writerTemplates)[number], locale: "en" | "uz") {
    return templateLabels[template.id]?.[locale] || { title: template.title, summary: template.shortDescription };
}

export function WriteTypeSelector({ isOpen, onClose }: WriteTypeSelectorProps) {
    const router = useRouter();
    const { locale } = useLocale();
    const copy = locale === "uz"
        ? { closeSelector: "Hujjat tuzilmasi tanlagichini yopish", close: "Yopish", kicker: "Yangi hujjat", title: "Tuzilmani tanlang.", description: "Mos andozani tanlang. Keyin barcha bo‘limlar va matnni erkin tahrirlashingiz mumkin.", templates: "Shablonlar", selected: "Tanlangan tuzilma", category: "Kategoriya", start: "Hujjatni boshlash" }
        : { closeSelector: "Close document structure selector", close: "Close", kicker: "New document", title: "Choose a structure.", description: "Select a starting structure. Every section and sentence remains fully editable.", templates: "Templates", selected: "Selected structure", category: "Category", start: "Start document" };
    const [selectedTemplateId, setSelectedTemplateId] = React.useState(DEFAULT_WRITER_TEMPLATE_ID);

    React.useEffect(() => {
        if (isOpen) setSelectedTemplateId(DEFAULT_WRITER_TEMPLATE_ID);
    }, [isOpen]);

    const selectedTemplate =
        writerTemplates.find((template) => template.id === selectedTemplateId) ??
        writerTemplates.find((template) => template.id === DEFAULT_WRITER_TEMPLATE_ID) ??
        writerTemplates[0];

    const selectedTemplateLabel = localizedTemplate(selectedTemplate, locale);
    const SelectedIcon = iconMap[selectedTemplate.icon];

    if (!isOpen) return null;

    const openDraftWithTemplate = (templateId: string) => {
        const query = new URLSearchParams();
        query.set("template", templateId);
        router.push(`/new?${query.toString()}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(15_23_42_/_0.28)] p-4 backdrop-blur-[3px] sm:p-6" role="dialog" aria-modal="true" aria-labelledby="writer-template-title">
            <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label={copy.closeSelector} />

            <div className="relative flex max-h-[min(640px,calc(100vh-2rem))] w-full max-w-[820px] flex-col overflow-hidden rounded-[var(--ax-work-panel-radius)] border border-[var(--ax-work-line)] bg-[var(--ax-surface)] shadow-[0_28px_90px_rgb(15_23_42_/_0.17)]">
                <header className="flex items-start justify-between gap-5 border-b border-[var(--ax-work-line)] px-5 py-4 sm:px-6">
                    <div>
                        <div className="ax-work-kicker">{copy.kicker}</div>
                        <h2 id="writer-template-title" className="mt-1.5 font-serif text-[28px] font-medium tracking-[-0.045em] text-[var(--ax-text)]">{copy.title}</h2>
                        <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[var(--ax-text-soft)]">{copy.description}</p>
                    </div>
                    <button onClick={onClose} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--ax-work-control-radius)] text-[var(--ax-text-faint)] hover:bg-[var(--ax-work-surface-muted)] hover:text-[var(--ax-text)]" type="button" aria-label={copy.close}>
                        <X className="h-4 w-4" />
                    </button>
                </header>

                <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_250px]">
                    <div className="min-h-0 overflow-y-auto p-4 sm:p-5">
                        <div className="mb-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">
                            <span>{copy.templates}</span><span>{writerTemplates.length}</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {writerTemplates.map((template) => {
                                const Icon = iconMap[template.icon];
                                const selected = template.id === selectedTemplate.id;
                                const label = localizedTemplate(template, locale);
                                return (
                                    <button
                                        key={template.id}
                                        type="button"
                                        onClick={() => setSelectedTemplateId(template.id)}
                                        className={`flex min-h-[94px] w-full items-start gap-3 rounded-[var(--ax-work-control-radius)] border p-3 text-left transition-colors ${selected ? "border-[var(--ax-accent)]/55 bg-[var(--ax-work-surface-muted)]" : "border-[var(--ax-work-line)] hover:bg-[var(--ax-work-surface-muted)]"}`}
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--ax-work-line)] text-[var(--ax-accent)]"><Icon className="h-3.5 w-3.5" /></span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2"><span className="truncate text-[12px] font-semibold text-[var(--ax-text)]">{label.title}</span>{selected ? <Check className="h-3.5 w-3.5 shrink-0 text-[var(--ax-accent)]" /> : null}</span>
                                            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">{templateCategoryLabel(template.category, locale)}</span>
                                            <span className="mt-2 block text-[10px] leading-4 text-[var(--ax-text-soft)]">{label.summary}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="flex min-h-0 flex-col border-t border-[var(--ax-work-line)] p-5 sm:p-6 lg:border-l lg:border-t-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ax-work-line)] bg-[var(--ax-surface)] text-[var(--ax-accent)]"><SelectedIcon className="h-[18px] w-[18px]" /></div>
                            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">{templateCategoryLabel(selectedTemplate.category, locale)}</span>
                        </div>

                        <div className="mt-6 ax-work-kicker text-[var(--ax-text-faint)]">{copy.selected}</div>
                        <h3 className="mt-2 font-serif text-[25px] font-medium tracking-[-0.04em] text-[var(--ax-text)]">{selectedTemplateLabel.title}</h3>
                        <p className="mt-3 text-[11px] leading-5 text-[var(--ax-text-soft)]">{selectedTemplateLabel.summary}</p>
                        <button type="button" onClick={() => openDraftWithTemplate(selectedTemplate.id)} className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-[var(--ax-work-control-radius)] bg-[var(--ax-accent-strong)] px-4 text-[11px] font-semibold text-white hover:bg-[var(--ax-accent)]">
                            {copy.start} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </aside>
                </div>
            </div>
        </div>
    );
}
