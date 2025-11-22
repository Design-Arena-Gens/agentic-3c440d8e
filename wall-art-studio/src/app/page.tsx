"use client";

import { useMemo, useState } from "react";
import { analyzeDescription, generatePosterSeries } from "@/lib/analyzer";
import { PosterCard } from "@/components/poster-card";

const presets = [
  "مقهى نباتي عصري يقدم ماتشا ومخبوزات صحية",
  "محل عطور راقٍ يمزج العود والعنبر مع ديكور فاخر",
  "مطعم برغر شبابي بإضاءة نيون وأجواء موسيقية",
  "مكتبة صغيرة ملهمة لعشاق القراءة والكتابة",
  "صالون تجميل نسائي يقدم جلسات عناية بالبشرة",
  "استوديو عمل مشترك لرواد الأعمال الشباب",
];

const chips = ["Flat", "Minimal", "Modern", "Organic", "Premium"];

export default function Home() {
  const [description, setDescription] = useState(presets[0]);

  const analysis = useMemo(() => analyzeDescription(description), [description]);
  const posters = useMemo(() => generatePosterSeries(analysis, 8), [analysis]);

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-56 -right-10 h-[640px] w-[640px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_rgba(15,23,42,0)_65%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-20 sm:px-10">
        <header className="flex flex-col gap-6 text-foreground">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60 backdrop-blur">
            <span>LAMINA</span>
            <span className="hidden sm:inline">WALL ART INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:max-w-3xl">
            مولد باقة اللوحات الجدارية العصرية — حول وصف محلك إلى سلسلة فنية متكاملة جاهزة للطباعة والتعليق.
          </h1>
          <p className="text-sm text-white/70 sm:text-base lg:max-w-2xl">
            اكتب وصفًا قصيرًا عن نوع محلك، الأجواء التي تريدها أو الجمهور المستهدف، ودع Lamina يبني لوحة هوية لونية، اتجاه فني، وسلسلة من اللوحات المتناسقة بأسلوب Flat / Minimal / Modern.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:grid-cols-[2fr,1fr] md:p-8">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-white/80" htmlFor="store-desc">
              وصف المحل أو المشروع
            </label>
            <textarea
              id="store-desc"
              className="min-h-[160px] resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-7 text-white outline-none ring-0 transition focus:border-sky-400/60 focus:bg-black/10 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
              placeholder="مثال: مقهى نباتي بإضاءة دافئة يقدم حلويات صحية ويستهدف جمهورًا عصريًا."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <aside className="flex flex-col gap-3 text-sm text-white/70">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              اقتراحات سريعة
            </span>
            <div className="flex flex-col gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDescription(preset)}
                  className="rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-right text-xs text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  {preset}
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">تحليل الهوية</h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <span className="text-white/40">نوع الهوية:</span> {analysis.storeType}
              </li>
              <li>
                <span className="text-white/40">الجو العام:</span> {analysis.mood}
              </li>
              <li>
                <span className="text-white/40">أسلوب التصميم:</span> {analysis.style}
              </li>
              <li>
                <span className="text-white/40">خط التايبوغرافي:</span> {analysis.typographyTone}
              </li>
            </ul>
            <div className="text-xs text-white/50">
              الكلمات المفتاحية المستخرجة: {analysis.keywords.slice(0, 8).join("، ") || "—"}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">الاتجاه الفني</h2>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              {analysis.artDirections.map((direction) => (
                <span
                  key={direction}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-1 text-xs"
                >
                  {direction}
                </span>
              ))}
            </div>
            <div className="text-sm text-white/70">
              لمسات إضافية: {analysis.textureHints.join(" • ")}
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">لوحة الألوان المختارة</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analysis.palette.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 p-4"
                style={{ backgroundColor: `${color}1A` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-12 w-12 rounded-full border border-white/40 shadow-inner"
                    style={{ background: color }}
                  />
                  <div className="flex flex-col text-xs font-semibold text-white">
                    <span>{color}</span>
                    <span className="text-white/50">
                      {index === 0
                        ? "لون أساسي"
                        : index === analysis.palette.length - 1
                        ? "لون داعم"
                        : "نغمة مكملة"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              الحزمة الفنية الجاهزة ({posters.length} لوحات)
            </h2>
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">
              flat · minimal · modern
            </span>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posters.map((poster) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

