"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Sigma } from "lucide-react";

import { WriterHeroScene } from "@/components/home/writer-hero-scene";
import { AxionMark } from "@/components/axion";
import { useLocale } from "@/components/locale-provider";

const writerLandingCopy = {
  en: {
    nav: ["Product", "Workflow", "Ecosystem"], brandLine: "Scientific publishing", documents: "Documents", open: "Open Writer", explore: "Explore the product", heroKicker: "Axion Writer · scientific publishing", heroTitle: ["Research,", "ready to", "publish."], heroLead: "Write papers, reports and books while keeping equations, figures and scientific results connected to the Project they came from.",
    promises: [["Write", "A quiet manuscript-first environment for papers, reports and long-form scientific work."], ["Evidence", "Bring equations, figures and saved results from the Project without rebuilding them."], ["Publish", "Keep structure, provenance and export quality ready for review and final publication."]],
    productKicker: "The product", productTitle: "A publication workspace built around the manuscript.", productCopy: "Writer keeps the page quiet while scientific evidence remains one click away. The document reads like a manuscript, not an admin dashboard.",
    workflowKicker: "Publication workflow", workflowTitle: "From evidence to a document people can trust.", workflowCopy: "The scientific chain stays intact while the writing becomes cleaner. Evidence informs the manuscript without dominating it.", workflow: [["01", "Evidence", "Start from the scientific objects, figures and equations that belong in the document."], ["02", "Structure", "Shape the manuscript with sections that stay readable and publication-oriented."], ["03", "Write", "Keep prose primary while equations, figures and citations sit exactly where they are needed."], ["04", "Review", "Inspect linked sources, revisions and document status without cluttering the manuscript."], ["05", "Publish", "Export a document that is clean for readers and traceable for researchers."]],
    ecosystemKicker: "One research trail", ecosystemTitle: "Publication is the last handoff, not a restart.", ecosystemCopy: "Math creates the result. Notebook preserves the reasoning. Writer turns both into a document without breaking the scientific context.", ecosystemItems: [["Math", "Create the calculation, plot and reusable scientific result."], ["Notebook", "Capture interpretation, observations and findings."], ["Writer", "Use the same evidence in the final manuscript."]],
    finalTitle: ["The paper should feel finished before you", "export it."], finalCopy: "Write in a publication-first environment where scientific evidence stays connected and the page stays quiet.",
    preview: { figureLabel: "Fig 01 · Scientific manuscript", linked: "Evidence linked", document: "Document", sections: ["Abstract", "Introduction", "Methods", "Results", "Discussion", "References"], footer: ["Paper · r4", "3 linked objects", "Draft"], article: "Research article", title: "Diffusion in bounded media", author: "A. Researcher · Axion Science Project", results: "Results", resultCopy: "The dominant spatial mode decays exponentially while preserving the expected symmetry of the boundary-constrained solution.", equation: "This behavior agrees with the analytical form and the linked numerical result.", figure: "Figure 4", source: "Source · Math", revision: "Revision · pinned r4", project: "Project · Thermal transport" },
  },
  uz: {
    nav: ["Mahsulot", "Jarayon", "Ekotizim"], brandLine: "Ilmiy nashr", documents: "Hujjatlar", open: "Writerni ochish", explore: "Mahsulotni ko‘rish", heroKicker: "Axion Writer · ilmiy nashr", heroTitle: ["Tadqiqot", "nashrga", "tayyor."], heroLead: "Maqolalar, hisobotlar va kitoblarni yozing; formulalar, grafiklar va ilmiy natijalar kelgan Loyiha bilan bog‘liq qoladi.",
    promises: [["Yozing", "Maqola, hisobot va katta ilmiy ishlar uchun sokin, qo‘lyozmaga yo‘naltirilgan muhit."], ["Dalil", "Tenglama, grafik va saqlangan natijalarni qayta yaratmasdan Loyihadan olib keling."], ["Nashr", "Tuzilma, provenance va eksport sifatini ko‘rib chiqish hamda nashrga tayyor saqlang."]],
    productKicker: "Mahsulot", productTitle: "Qo‘lyozma atrofida qurilgan nashr ish maydoni.", productCopy: "Writer sahifani sokin saqlaydi, ilmiy dalillar esa bir bosish narida turadi. Hujjat admin paneli emas, qo‘lyozmadek o‘qiladi.",
    workflowKicker: "Nashr jarayoni", workflowTitle: "Dalildan ishonchli hujjatgacha.", workflowCopy: "Yozuv tozalanayotganda ilmiy zanjir saqlanadi. Dalil qo‘lyozmani boshqaradi, lekin uni bosib ketmaydi.", workflow: [["01", "Dalil", "Hujjatga tegishli ilmiy obyektlar, grafiklar va tenglamalardan boshlang."], ["02", "Tuzilma", "Qo‘lyozmani o‘qilishi oson va nashrga yo‘naltirilgan bo‘limlarga ajrating."], ["03", "Yozuv", "Proza asosiy bo‘lsin, tenglama, grafik va iqtiboslar kerakli joyda tursin."], ["04", "Ko‘rib chiqish", "Bog‘langan manbalar, revision va hujjat holatini ortiqcha shovqinsiz tekshiring."], ["05", "Nashr", "O‘quvchi uchun toza va tadqiqotchi uchun kuzatiladigan hujjatni eksport qiling."]],
    ecosystemKicker: "Bitta tadqiqot izi", ecosystemTitle: "Nashr qayta boshlash emas, so‘nggi uzatish.", ecosystemCopy: "Math natijani yaratadi. Notebook fikrlashni saqlaydi. Writer ikkalasini ilmiy kontekstni buzmagan holda hujjatga aylantiradi.", ecosystemItems: [["Math", "Hisoblash, grafik va qayta ishlatiladigan natijani yarating."], ["Notebook", "Talqin, kuzatuv va xulosalarni saqlang."], ["Writer", "O‘sha dalillardan yakuniy qo‘lyozmada foydalaning."]],
    finalTitle: ["Eksport qilishdan oldin maqola", "tayyor bo‘lsin."], finalCopy: "Ilmiy dalillar bog‘langan, sahifa esa sokin qoladigan nashrga yo‘naltirilgan muhitda yozing.",
    preview: { figureLabel: "01-rasm · Ilmiy qo‘lyozma", linked: "Dalil bog‘langan", document: "Hujjat", sections: ["Annotatsiya", "Kirish", "Metodlar", "Natijalar", "Muhokama", "Adabiyotlar"], footer: ["Maqola · r4", "3 ta bog‘langan obyekt", "Qoralama"], article: "Ilmiy maqola", title: "Chegaralangan muhitda diffuziya", author: "A. Tadqiqotchi · Axion Science loyihasi", results: "Natijalar", resultCopy: "Asosiy fazoviy mod eksponensial kamayadi va chegaraviy shartlar bergan kutilgan simmetriyani saqlaydi.", equation: "Bu xatti-harakat analitik shakl va bog‘langan sonli natijaga mos keladi.", figure: "4-grafik", source: "Manba · Math", revision: "Revision · mahkamlangan r4", project: "Loyiha · Issiqlik transporti" },
  },
} as const;

type WriterLandingCopy = (typeof writerLandingCopy)[keyof typeof writerLandingCopy];

function ManuscriptPreview({ copy }: { copy: WriterLandingCopy }) {
  return (
    <div className="ax-product-frame">
      <div className="flex h-11 items-center justify-between border-b border-[var(--ax-line)] px-5"><span className="ax-figure-label">{copy.preview.figureLabel}</span><span className="text-[10px] font-semibold text-[var(--ax-accent)]">{copy.preview.linked}</span></div>
      <div className="grid min-h-[570px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="ax-figure-label">{copy.preview.document}</div>
          <div className="mt-6 space-y-1.5 text-[11px] font-semibold text-[var(--ax-text-soft)]">{copy.preview.sections.map((item,index)=><div key={item} className={`rounded-[7px] px-3 py-2.5 ${index===3?'bg-white text-[var(--ax-text)] shadow-[var(--ax-shadow-subtle)]':''}`}>{item}</div>)}</div>
          <div className="mt-9 border-t border-[var(--ax-line)] pt-5 text-[10px] leading-5 text-[var(--ax-text-faint)]">{copy.preview.footer.map((item) => <span key={item} className="block">{item}</span>)}</div>
        </aside>
        <div className="bg-[var(--ax-canvas)] p-5 sm:p-8 lg:p-10">
          <article className="mx-auto min-h-[470px] max-w-[820px] border border-[var(--ax-line)] bg-white px-7 py-10 shadow-[var(--ax-shadow-subtle)] sm:px-12 lg:px-14">
            <p className="text-center text-[9px] uppercase tracking-[.16em] text-[var(--ax-text-faint)]">{copy.preview.article}</p>
            <h3 className="mx-auto mt-4 max-w-[620px] text-center font-serif text-[clamp(30px,4vw,48px)] leading-[1.02] tracking-[-.045em]">{copy.preview.title}</h3>
            <p className="mt-3 text-center text-[10px] text-[var(--ax-text-faint)]">{copy.preview.author}</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
              <div>
                <p className="ax-figure-label">{copy.preview.results}</p>
                <p className="mt-3 text-[13px] leading-7 text-[var(--ax-text-soft)]">{copy.preview.resultCopy}</p>
                <div className="mt-6 rounded-[12px] border border-[var(--ax-line)] bg-[var(--ax-surface-soft)] px-5 py-4 text-center font-serif text-[25px]">u(x,t) = e<sup>−αt</sup> sin(x)</div>
                <p className="mt-5 text-[12px] leading-6 text-[var(--ax-text-soft)]">{copy.preview.equation}</p>
              </div>
              <div className="rounded-[12px] border border-[var(--ax-line)] p-5">
                <div className="flex items-center justify-between"><span className="ax-figure-label">{copy.preview.figure}</span><span className="text-[9px] font-semibold text-[var(--ax-accent)]">{copy.preview.linked}</span></div>
                <svg viewBox="0 0 320 190" className="mt-4 h-[190px] w-full" aria-hidden="true"><path d="M18 95H302M160 18V174" stroke="#d9e1eb" strokeWidth="1"/><path d="M18 95 C48 48 77 48 105 95 C134 142 161 142 190 95 C219 48 248 48 302 95" fill="none" stroke="#2f6fbe" strokeWidth="2.2"/><path d="M18 95 C60 70 88 70 126 95 C163 120 190 120 227 95 C264 70 286 76 302 95" fill="none" stroke="#93b3dd" strokeWidth="1.2" opacity=".72"/></svg>
                <div className="mt-4 border-t border-[var(--ax-line)] pt-4 text-[10px] leading-5 text-[var(--ax-text-faint)]"><span className="block">{copy.preview.source}</span><span className="block">{copy.preview.revision}</span><span className="block">{copy.preview.project}</span></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function WriterHomePage() {
  const { locale } = useLocale();
  const copy = writerLandingCopy[locale];
  return (
    <div className="ax-landing min-h-[calc(100vh-32px)]">
      <header className="ax-premium-nav">
        <div className="ax-landing-container ax-premium-nav-inner">
          <Link href="/" className="flex min-w-0 items-center gap-3.5"><AxionMark className="h-9 w-9 text-[var(--ax-accent)]"/><span className="min-w-0 leading-none"><span className="block truncate font-serif text-[22px] font-medium tracking-[-0.035em]">Axion Writer</span><span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.25em] text-[var(--ax-text-faint)]">{copy.brandLine}</span></span></Link>
          <nav className="hidden items-center gap-1 xl:flex"><Link href="#product" className="ax-premium-nav-link">{copy.nav[0]}</Link><Link href="#workflow" className="ax-premium-nav-link">{copy.nav[1]}</Link><Link href="#ecosystem" className="ax-premium-nav-link">{copy.nav[2]}</Link></nav>
          <div className="flex items-center gap-1.5"><Link href="/documents" className="ax-premium-secondary hidden sm:inline-flex">{copy.documents}</Link><Link href="/documents" className="ax-premium-primary">{copy.open} <span aria-hidden="true">→</span></Link></div>
        </div>
      </header>

      <main>
        <div className="ax-landing-container"><section className="ax-landing-hero"><div className="ax-hero-copy"><p className="ax-landing-kicker">{copy.heroKicker}</p><h1 className="ax-landing-display">{copy.heroTitle[0]}<br/>{copy.heroTitle[1]} <span className="italic">{copy.heroTitle[2]}</span></h1><div className="ax-signature-rule" aria-hidden="true"/><p className="ax-landing-lead">{copy.heroLead}</p><div className="mt-8 flex flex-wrap gap-2"><Link href="/documents" className="ax-premium-primary">{copy.open} <ArrowRight className="h-4 w-4"/></Link><Link href="#product" className="ax-premium-secondary">{copy.explore} <ArrowRight className="h-3.5 w-3.5 text-[var(--ax-text-faint)]"/></Link></div></div><div className="ax-hero-visual"><WriterHeroScene/></div></section></div>

        <section className="ax-promise-strip"><div className="ax-landing-container ax-promise-grid">{copy.promises.map(([title, text])=><div key={title} className="ax-promise-item"><div className="ax-promise-title">{title}</div><p className="ax-promise-copy">{text}</p></div>)}</div></section>

        <section id="product" className="ax-landing-section"><div className="ax-landing-container"><div className="ax-section-head"><div><p className="ax-landing-kicker">{copy.productKicker}</p><h2 className="ax-section-title">{copy.productTitle}</h2></div><p className="ax-section-copy">{copy.productCopy}</p></div><ManuscriptPreview copy={copy}/></div></section>

        <section id="workflow" className="ax-landing-section ax-landing-section-alt"><div className="ax-landing-container"><div className="ax-section-head"><div><p className="ax-landing-kicker">{copy.workflowKicker}</p><h2 className="ax-section-title">{copy.workflowTitle}</h2></div><p className="ax-section-copy">{copy.workflowCopy}</p></div><div className="ax-editorial-list">{copy.workflow.map(([index,title, text])=><div key={index} className="ax-editorial-row"><div className="ax-editorial-index">{index}</div><div className="ax-editorial-title">{title}</div><p className="ax-editorial-copy">{text}</p></div>)}</div></div></section>

        <section id="ecosystem" className="ax-landing-section ax-landing-section-alt"><div className="ax-landing-container"><div className="ax-section-head"><div><p className="ax-landing-kicker">{copy.ecosystemKicker}</p><h2 className="ax-section-title">{copy.ecosystemTitle}</h2></div><p className="ax-section-copy">{copy.ecosystemCopy}</p></div><div className="mt-14 grid gap-3 lg:grid-cols-3">{[Sigma, BookOpen, FileText].map((Icon,index)=><div key={copy.ecosystemItems[index][0]} className="relative border-t border-[var(--ax-line)] py-7 lg:px-7 lg:first:pl-0"><div className="flex items-center gap-3"><Icon className="h-4 w-4 text-[var(--ax-accent)]"/><span className="font-serif text-[25px]">{copy.ecosystemItems[index][0]}</span></div><p className="mt-3 max-w-sm text-[13px] leading-6 text-[var(--ax-text-soft)]">{copy.ecosystemItems[index][1]}</p>{index<2?<ArrowRight className="absolute right-2 top-9 hidden h-4 w-4 text-[var(--ax-text-faint)] lg:block"/>:null}</div>)}</div></div></section>

        <section className="ax-final-cta"><div className="ax-landing-container"><h2 className="ax-final-title">{copy.finalTitle[0]} <span className="italic">{copy.finalTitle[1]}</span></h2><p className="ax-final-copy">{copy.finalCopy}</p><Link href="/documents" className="ax-premium-primary mt-8">{copy.open} <ArrowRight className="h-4 w-4"/></Link></div></section>
      </main>

      <footer className="border-t border-[var(--ax-line)] bg-white"><div className="ax-landing-container flex flex-col justify-between gap-5 py-9 text-[11px] text-[var(--ax-text-faint)] sm:flex-row sm:items-center"><span>Axion Writer · {locale === "uz" ? "Axion Science tarkibida" : "part of Axion Science"}</span><div className="flex gap-6"><Link href="/documents">{copy.documents}</Link><Link href="#product">{copy.nav[0]}</Link><Link href="#ecosystem">{copy.nav[2]}</Link></div></div></footer>
    </div>
  );
}
