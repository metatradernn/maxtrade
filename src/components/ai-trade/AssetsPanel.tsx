import * as React from "react";
import AssetBankCard from "@/components/ai-trade/AssetBankCard";
import { tradingAssetGroups, type TradingAssetCategory } from "@/lib/trading-assets";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Coins, Globe2, Layers3, TrendingUp } from "lucide-react";

const categoryMeta: Record<
  TradingAssetCategory,
  {
    icon: React.ComponentType<{ className?: string }>;
    tone: Parameters<typeof AssetBankCard>[0]["tone"];
    label: string;
  }
> = {
  "Валютные пары": { icon: Globe2, tone: "indigo", label: "Валюты" },
  "Криптовалюты": { icon: Coins, tone: "teal", label: "Криптовалюты" },
  "Сырьевые товары": { icon: Layers3, tone: "amber", label: "Сырьевые товары" },
  "Акции": { icon: TrendingUp, tone: "rose", label: "Акции" },
  "Индексы": { icon: BarChart3, tone: "slate", label: "Индексы" },
};

const categoryOrder: TradingAssetCategory[] = [
  "Валютные пары",
  "Криптовалюты",
  "Сырьевые товары",
  "Акции",
  "Индексы",
];

export default function AssetsPanel() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<TradingAssetCategory>("Валютные пары");

  return (
    <Tabs
      value={activeCategory}
      onValueChange={(value) => setActiveCategory(value as TradingAssetCategory)}
      className="space-y-5"
    >
      <div className="rounded-3xl border border-border/70 bg-card/50 p-3 shadow-[0_18px_60px_-40px] shadow-black/25 backdrop-blur">
        <TabsList
          className={cn(
            "h-auto w-full bg-transparent p-0",
            "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-between",
          )}
        >
          {categoryOrder.map((category) => {
            const group = tradingAssetGroups.find((g) => g.title === category);
            const meta = categoryMeta[category];
            const Icon = meta.icon;

            return (
              <TabsTrigger
                key={category}
                value={category}
                className={cn(
                  "h-auto rounded-2xl px-3 py-2.5 text-left",
                  "border border-transparent data-[state=active]:border-border/70",
                  "bg-background/40 data-[state=active]:bg-background/70",
                  "shadow-none data-[state=active]:shadow-[0_14px_40px_-28px] data-[state=active]:shadow-black/35",
                  "transition-all",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-2xl border border-border/70 bg-card/60">
                    <Icon className="h-[18px] w-[18px] text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold tracking-tight">
                      {meta.label}
                    </div>
                    <div className="text-[11px] font-medium text-muted-foreground">
                      {group?.items.length ?? 0} активов
                    </div>
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {categoryOrder.map((category) => {
        const group = tradingAssetGroups.find((g) => g.title === category);
        if (!group) return null;

        const meta = categoryMeta[category];
        const Icon = meta.icon;

        return (
          <TabsContent key={category} value={category} className="m-0 space-y-3">
            <section className="space-y-3">
              <div className="flex items-end justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-2xl border border-border bg-card/60">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                      {meta.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {group.items.length} активов
                    </p>
                  </div>
                </div>
              </div>

              <div className={cn("grid gap-3", "sm:grid-cols-2 lg:grid-cols-3")}>
                {group.items.map((name) => {
                  const key = `${group.title}:${name}`;
                  return (
                    <AssetBankCard
                      key={key}
                      name={name}
                      tone={meta.tone}
                      selected={selected === key}
                      onSelect={() => setSelected(key)}
                    />
                  );
                })}
              </div>
            </section>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}