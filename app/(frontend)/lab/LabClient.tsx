"use client";

import React, { useRef, useState } from "react";
import PixelField from "@/app/components/ui/PixelField";
import PixelPortrait from "@/app/components/ui/PixelPortrait";
import {
  FIELD_DEFAULTS,
  PORTRAIT_DEFAULTS,
  type FieldSettings,
  type PixelPalette,
  type PortraitMode,
  type PortraitSettings,
} from "@/app/lib/pixelSettings";

interface LabClientProps {
  photo: string;
  name: string;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="flex justify-between gap-4">
        <span>{label}</span>
        <span className="tabular-nums text-foreground/70">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`border px-3 py-1.5 text-sm transition-colors duration-150 ${
              value === option.value
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/40 hover:border-accent hover:text-accent"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const PALETTES: { value: PixelPalette; label: string }[] = [
  { value: "cereza", label: "Cereza" },
  { value: "cereza-suave", label: "Cereza suave" },
  { value: "tinta", label: "Tinta" },
];

export default function LabClient({ photo, name }: LabClientProps) {
  const [field, setField] = useState<FieldSettings>(FIELD_DEFAULTS);
  const [portrait, setPortrait] = useState<PortraitSettings>(PORTRAIT_DEFAULTS);
  const [fieldKey, setFieldKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const setF = <K extends keyof FieldSettings>(key: K, value: FieldSettings[K]) =>
    setField((prev) => ({ ...prev, [key]: value }));
  const setP = <K extends keyof PortraitSettings>(key: K, value: PortraitSettings[K]) =>
    setPortrait((prev) => ({ ...prev, [key]: value }));

  const json = JSON.stringify({ field, portrait }, null, 2);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* el JSON también se ve abajo para copiarlo a mano */
    }
  };

  return (
    <div className="px-4 pb-24 pt-28 font-sans sm:px-8 lg:px-14">
      <header className="flex flex-col gap-3 border-t border-foreground pt-6">
        <h1
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em]"
          style={{ fontStretch: "112%" }}
        >
          Laboratorio de píxeles
        </h1>
        <p className="max-w-[60ch] text-foreground/70">
          Solo en desarrollo. Mueve los controles y mira el efecto en vivo; cuando algo te guste,
          copia los ajustes y pásamelos para dejarlos como valores por defecto.
        </p>
      </header>

      {/* ---- Campo ---- */}
      <section className="mt-12 grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Campo del hero</h2>
          <Slider label="Tamaño de celda (0 = auto)" value={field.cell} min={0} max={32} step={2} onChange={(v) => setF("cell", v)} />
          <Slider label="Flujo de fondo" value={field.drift} min={0} max={4} step={0.1} onChange={(v) => setF("drift", v)} />
          <Slider label="Centelleo" value={field.shimmer} min={0} max={1} step={0.05} onChange={(v) => setF("shimmer", v)} />
          <Slider label="Barrido diagonal" value={field.scan} min={0} max={1} step={0.05} onChange={(v) => setF("scan", v)} />
          <Slider label="Ondas espontáneas" value={field.ripples} min={0} max={2} step={0.05} onChange={(v) => setF("ripples", v)} />
          <Slider label="Estela del cursor" value={field.trail} min={0} max={1} step={0.05} onChange={(v) => setF("trail", v)} />
          <Slider label="Radio del cursor (celdas)" value={field.pointerRadius} min={1} max={12} step={0.5} onChange={(v) => setF("pointerRadius", v)} />
          <Slider label="Fotogramas por segundo" value={field.fps} min={10} max={60} step={5} onChange={(v) => setF("fps", v)} />
          <Choice label="Paleta" value={field.palette} options={PALETTES} onChange={(v) => setF("palette", v)} />
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.intro}
                onChange={(e) => setF("intro", e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Entrada en ola al cargar
            </label>
            <button
              type="button"
              onClick={() => setFieldKey((k) => k + 1)}
              className="border border-foreground/40 px-3 py-1.5 text-sm transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div className="relative isolate h-[28rem] overflow-hidden border border-foreground/25">
          <PixelField key={fieldKey} avoidRef={textRef} settings={field} />
          <div ref={textRef} className="relative z-10 p-6">
            <p
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]"
              style={{ fontStretch: "112%" }}
            >
              {name.split(" ")[0]}
              <br />
              Texto
            </p>
            <p className="mt-3 text-foreground/80">El campo deja libre este recuadro.</p>
          </div>
        </div>
      </section>

      {/* ---- Retrato ---- */}
      <section className="mt-16 grid gap-8 border-t border-foreground/25 pt-12 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Retrato</h2>
          <Choice<PortraitMode>
            label="Modo"
            value={portrait.mode}
            options={[
              { value: "focus", label: "Ventana nítida" },
              { value: "pixel", label: "Todo pixelado" },
              { value: "photo", label: "Solo foto" },
            ]}
            onChange={(v) => setP("mode", v)}
          />
          <Slider label="Tamaño de celda (0 = auto)" value={portrait.cell} min={0} max={16} step={1} onChange={(v) => setP("cell", v)} />
          <Slider label="Fuerza del tramado" value={portrait.dither} min={0} max={1.4} step={0.05} onChange={(v) => setP("dither", v)} />
          <Slider label="Tramado que hierve" value={portrait.boil} min={0} max={1} step={0.05} onChange={(v) => setP("boil", v)} />
          <Slider label="Tamaño de la ventana nítida" value={portrait.focusSize} min={0.05} max={0.4} step={0.01} onChange={(v) => setP("focusSize", v)} />
          <Slider label="Recorrido en reposo" value={portrait.idle} min={0} max={3} step={0.1} onChange={(v) => setP("idle", v)} />
          <Choice label="Paleta" value={portrait.palette} options={PALETTES} onChange={(v) => setP("palette", v)} />
        </div>

        <div className="w-full max-w-[22rem]">
          <PixelPortrait src={photo} alt={`Retrato de ${name}`} settings={portrait} />
        </div>
      </section>

      {/* ---- Salida ---- */}
      <section className="mt-16 flex flex-col gap-4 border-t border-foreground/25 pt-12">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Ajustes actuales</h2>
          <button
            type="button"
            onClick={copy}
            className="border border-foreground bg-foreground px-3 py-1.5 text-sm text-background transition-colors duration-150 hover:border-accent hover:bg-accent"
          >
            {copied ? "Copiado" : "Copiar JSON"}
          </button>
        </div>
        <pre className="overflow-x-auto border border-foreground/25 p-4 text-sm">{json}</pre>
      </section>
    </div>
  );
}
