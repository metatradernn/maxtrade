import { cn } from "@/lib/utils";

type AssetBankCardProps = {
  name: string;
  tone?: "indigo" | "teal" | "amber" | "rose" | "slate";
  className?: string;
};

const tones: Record<NonNullable<AssetBankCardProps["tone"]>, string> = {
  indigo:
    "border-primary/20 bg-primary/5 text-foreground shadow-[0_10px_30px_-18px] shadow-primary/35",
  teal: "border-emerald-500/20 bg-emerald-500/5 text-foreground shadow-[0_10px_30px_-18px] shadow-emerald-500/35",
  amber:
    "border-amber-500/20 bg-amber-500/5 text-foreground shadow-[0_10px_30px_-18px] shadow-amber-500/35",
  rose: "border-rose-500/20 bg-rose-500/5 text-foreground shadow-[0_10px_30px_-18px] shadow-rose-500/35",
  slate:
    "border-border/70 bg-background/40 text-foreground shadow-[0_10px_30px_-22px] shadow-black/20",
};

export default function AssetBankCard({
  name,
  tone = "slate",
  className,
}: AssetBankCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border p-4 sm:p-5",
        "backdrop-blur supports-[backdrop-filter]:bg-background/35",
        "transition-transform duration-200 hover:-translate-y-0.5",
        tones[tone],
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-foreground/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-foreground/5 blur-2xl" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Asset
          </p>
          <p className="mt-2 text-base font-semibold leading-tight tracking-tight sm:text-[17px]">
            {name}
          </p>
        </div>

        <div className="relative grid h-10 w-14 place-items-center rounded-2xl border border-foreground/10 bg-foreground/5">
          <div className="h-6 w-10 rounded-xl bg-foreground/10" />
          <div className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-foreground/10" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-foreground/20" />
          <div className="h-2 w-2 rounded-full bg-foreground/20" />
          <div className="h-2 w-2 rounded-full bg-foreground/20" />
          <div className="h-2 w-2 rounded-full bg-foreground/20" />
        </div>

        <p className="text-xs font-medium text-muted-foreground">OTC</p>
      </div>
    </div>
  );
}