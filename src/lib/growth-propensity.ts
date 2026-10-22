// Build-time growth propensity data for the A-GPS note.
// Reads the public view growth_accounts_public. The publishable key is a public
// client key. Never use a service_role key here.
import { createClient } from "@supabase/supabase-js";
import fallbackRows from "../data/growth-propensity.json";

export const CLUSTERS = ["P1", "P2", "P3", "P4"] as const;
export type Cluster = (typeof CLUSTERS)[number];

export type Account = {
  name: string;
  arr: number;
  nrr: number;
  renewal: number;
  gtm: number;
  mkt: number;
  post: number;
  prod: number;
  dd: number;
  overall: number;
  cluster: Cluster;
  growth?: number;
  watch?: boolean;
  indicator?: string;
  prevCluster?: Cluster;
  watchReason?: string;
};

export type ScoreKey = "gtm" | "mkt" | "post" | "prod" | "dd";

export const SCORE_FIELDS: ReadonlyArray<{
  key: ScoreKey;
  short: string;
  label: string;
  weight: string;
}> = [
  { key: "gtm", short: "GTM", label: "GTM propensity", weight: "0.30" },
  { key: "mkt", short: "Marketing", label: "Marketing and programmatic", weight: "0.10" },
  { key: "post", short: "Post-sales", label: "Post-sales", weight: "0.25" },
  { key: "prod", short: "Product", label: "Product", weight: "0.10" },
  { key: "dd", short: "Down & dist.", label: "Down and distance", weight: "0.25" },
];

export const WEIGHTS: ReadonlyArray<{ name: string; weight: string; fields: string; width: number }> = [
  {
    name: "GTM propensity",
    weight: "0.30",
    fields: "ARR, NRR, new business, attach rate, win rate, account team activity",
    width: 100,
  },
  {
    name: "Post-sales",
    weight: "0.25",
    fields: "Premium plan, CSQLs, onboarding, adoption, value realized, CSM pulse, support",
    width: 83,
  },
  {
    name: "Down and distance",
    weight: "0.25",
    fields: "Time to renewal, stakeholder alignment, years as a customer, 10-K signal, sentiment",
    width: 83,
  },
  {
    name: "Marketing and programmatic",
    weight: "0.10",
    fields: "Events, webinars, newsletter, advocacy, success stories",
    width: 33,
  },
  {
    name: "Product",
    weight: "0.10",
    fields: "Feature requests",
    width: 33,
  },
];

export const CLUSTER_META: Record<Cluster, { name: string; line: string; quad: string }> = {
  P1: { name: "Expand now", quad: "High growth, high spend", line: "Above-median growth and spend. Multi-thread the account and turn the renewal into a growth deal." },
  P2: { name: "Grow into it", quad: "High growth, moderate spend", line: "Above-median growth, below-median spend. Land and expand with programs and advocacy." },
  P3: { name: "Protect and re-ignite", quad: "Moderate growth, high spend", line: "Big spend, below-median growth. Fix health before chasing a new use case." },
  P4: { name: "Scale and monitor", quad: "Low growth, low spend", line: "Below median on both. Digital or pooled coverage. Watch for a real move." },
};

export const FOCUS_RULE =
  "Rule: P1 and P3 accounts renewing within 120 days, best growth score first. WATCH accounts only qualify from P3. If fewer than three qualify, the next-soonest P1 or P3 renewals fill the list.";

const FOCUS_WINDOW_DAYS = 120;

const DEFAULT_SUPABASE_URL = "https://zumyfivazhttxqavyxcy.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_2ALcutAtnSSNi4tl2nlaIQ_g_piFFyI";

const SELECT_COLUMNS =
  "account_name, arr, nrr, days_to_next_renewal, gtm_propensity_score, marketing_programmatic_engagement_score, post_sales_score, product_score, down_and_distance_score, overall_score, cluster";

type SnapshotRow = {
  name: string;
  arr: number;
  nrr: number;
  renewal: number;
  gtm: number;
  mkt: number;
  post: number;
  prod: number;
  dd: number;
  overall: number;
  cluster: string;
};

type ViewRow = {
  account_name: string;
  arr: number | string;
  nrr: number | string;
  days_to_next_renewal: number | string;
  gtm_propensity_score: number | string;
  marketing_programmatic_engagement_score: number | string;
  post_sales_score: number | string;
  product_score: number | string;
  down_and_distance_score: number | string;
  overall_score: number | string;
  cluster: string;
};

export type Brief = {
  why: string;
  plan: string;
  watch: string;
};

export type ClusterGroup = {
  cluster: Cluster;
  name: string;
  line: string;
  rows: Account[];
  count: number;
  arr: number;
};

function isCluster(value: string): value is Cluster {
  return (CLUSTERS as readonly string[]).includes(value);
}

function asNumber(value: number | string): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function snapshotAccount(row: SnapshotRow): Account | null {
  if (!isCluster(row.cluster)) return null;
  const arr = asNumber(row.arr);
  const nrr = asNumber(row.nrr);
  const renewal = asNumber(row.renewal);
  const gtm = asNumber(row.gtm);
  const mkt = asNumber(row.mkt);
  const post = asNumber(row.post);
  const prod = asNumber(row.prod);
  const dd = asNumber(row.dd);
  const overall = asNumber(row.overall);
  if (
    arr === null ||
    nrr === null ||
    renewal === null ||
    gtm === null ||
    mkt === null ||
    post === null ||
    prod === null ||
    dd === null ||
    overall === null ||
    typeof row.name !== "string"
  ) {
    return null;
  }
  return {
    name: row.name,
    arr,
    nrr,
    renewal,
    gtm,
    mkt,
    post,
    prod,
    dd,
    overall,
    cluster: row.cluster,
  };
}

function viewAccount(row: ViewRow): Account | null {
  if (typeof row.account_name !== "string" || !isCluster(row.cluster)) return null;
  return snapshotAccount({
    name: row.account_name,
    arr: Number(row.arr),
    nrr: Number(row.nrr),
    renewal: Number(row.days_to_next_renewal),
    gtm: Number(row.gtm_propensity_score),
    mkt: Number(row.marketing_programmatic_engagement_score),
    post: Number(row.post_sales_score),
    prod: Number(row.product_score),
    dd: Number(row.down_and_distance_score),
    overall: Number(row.overall_score),
    cluster: row.cluster,
  });
}

function byOverall(a: Account, b: Account): number {
  return (a.growth ?? a.overall) - (b.growth ?? b.overall) || a.name.localeCompare(b.name);
}

function readEnv(name: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function bundledAccounts(): Account[] {
  return (fallbackRows as SnapshotRow[])
    .map(snapshotAccount)
    .filter((account): account is Account => account !== null)
    .sort(byOverall);
}

export function formatArr(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const digits = millions >= 10 ? 1 : 2;
    return `$${millions.toFixed(digits)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${Math.round(value)}`;
}

export function formatScore(value: number): string {
  return value.toFixed(2);
}

export function formatNrr(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function sumArr(accounts: Account[]): number {
  return accounts.reduce((sum, account) => sum + account.arr, 0);
}

export function clusterGroups(accounts: Account[]): ClusterGroup[] {
  return CLUSTERS.map((cluster) => {
    const rows = accounts.filter((account) => account.cluster === cluster).sort(byOverall);
    return {
      cluster,
      name: CLUSTER_META[cluster].name,
      line: CLUSTER_META[cluster].line,
      rows,
      count: rows.length,
      arr: sumArr(rows),
    };
  });
}

export function focusAccounts(accounts: Account[], count = 3): Account[] {
  const g = (a: Account) => a.growth ?? a.overall;
  const pool = accounts.filter(
    (a) => (a.cluster === "P1" || a.cluster === "P3") && (!a.watch || a.cluster === "P3"),
  );
  const compare = (a: Account, b: Account) => g(a) - g(b) || a.renewal - b.renewal || a.name.localeCompare(b.name);
  const inWindow = pool.filter((a) => a.renewal <= FOCUS_WINDOW_DAYS).sort(compare);
  if (inWindow.length >= count) return inWindow.slice(0, count);
  const later = pool.filter((a) => a.renewal > FOCUS_WINDOW_DAYS).sort((a, b) => a.renewal - b.renewal || compare(a, b));
  return [...inWindow, ...later].slice(0, count);
}

function rankBuckets(account: Account) {
  return [...SCORE_FIELDS].sort((a, b) => {
    const diff = account[a.key] - account[b.key];
    if (Math.abs(diff) > 0.0001) return diff;
    return Number(b.weight) - Number(a.weight);
  });
}

export function accountBrief(account: Account): Brief {
  const ranked = rankBuckets(account);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];
  const strongScore = formatScore(account[strongest.key]);
  const weakScore = formatScore(account[weakest.key]);
  const overall = formatScore(account.growth ?? account.overall);
  const nrr = formatNrr(account.nrr);
  const days = Math.round(account.renewal);

  const whyLead: Record<Cluster, string> = {
    P1: "P1 means above-median growth potential and above-median spend, the group to expand first.",
    P2: "P2 means above-median growth potential on below-median spend. Grow into it, not a full expansion push.",
    P3: "P3 means above-median spend with below-median growth potential. Protect the account before chasing new revenue.",
    P4: "P4 means below median on both growth potential and spend. Keep coverage light and wait for a real move.",
  };

  const planLead: Record<Cluster, string> = {
    P1: `Open an expansion play from the ${strongest.label} strength. Pull in the account executive and a solutions engineer, and treat the renewal as a growth conversation.`,
    P2: `Use the ${strongest.label} strength for a land-and-expand motion. A qualified lead from the CSM, or an advocacy ask, fits better than a cold upsell.`,
    P3: `Protect the renewal before selling anything new. Put the next cycle into ${weakest.label}, then look for one new use case.`,
    P4: `Keep this on digital or pooled coverage. Step in only if ${weakest.label} improves or the renewal date gets close.`,
  };

  const renewal =
    days <= 90
      ? `Renewal is ${days} days out, so this belongs on the near-term list.`
      : days <= 180
        ? `Renewal is ${days} days out, so start the work this quarter.`
        : `Renewal is ${days} days out, so there is time to prepare before the contract date.`;

  const watchBits = [
    `${weakest.label} is the bucket to watch. It scores ${weakScore} and carries a ${weakest.weight} weight.`,
  ];
  if (account.nrr < 100) {
    watchBits.push(`NRR is ${nrr}, so revenue on this account is contracting.`);
  }
  if (days <= 120 && (account.cluster === "P3" || account.cluster === "P4")) {
    watchBits.push(
      `A renewal in ${days} days on a ${account.cluster} score is a churn risk if the stakeholder map is thin.`,
    );
  } else if (days <= 90 && account.cluster === "P1") {
    watchBits.push(
      "The renewal is close enough that the expansion talk has to share the meeting with the renewal itself.",
    );
  }
  if (account[weakest.key] >= 6) {
    watchBits.push(`A ${weakest.label} score that high is a real gap, not a rounding error.`);
  }

  return {
    why: `${whyLead[account.cluster]} The growth score (A-GPS without ARR) is ${overall}. ${strongest.label} is the strongest bucket at ${strongScore}, and ${weakest.label} is the weakest at ${weakScore}.`,
    plan: `${planLead[account.cluster]} ${renewal}`,
    watch: watchBits.slice(0, 2).join(" "),
  };
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return 0;
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export async function loadGrowthAccounts(): Promise<{
  accounts: Account[];
  source: "Supabase" | "bundled JSON";
}> {
  const fallback = bundledAccounts();
  const url = readEnv("PUBLIC_SUPABASE_URL") ?? DEFAULT_SUPABASE_URL;
  const key = readEnv("PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? DEFAULT_SUPABASE_KEY;

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("growth_accounts_public")
      .select(SELECT_COLUMNS)
      .order("overall_score", { ascending: true })
      .abortSignal(AbortSignal.timeout(12000));

    if (error) {
      console.warn(`[growth-propensity] Supabase fetch failed, using bundled JSON: ${error.message}`);
      return { accounts: applyQuadrants(fallback), source: "bundled JSON" };
    }

    const accounts = ((data ?? []) as ViewRow[])
      .map(viewAccount)
      .filter((account): account is Account => account !== null)
      .sort(byOverall);

    if (accounts.length === 0) {
      console.warn("[growth-propensity] Supabase fetch failed, using bundled JSON: no rows");
      return { accounts: applyQuadrants(fallback), source: "bundled JSON" };
    }

    console.info(`[growth-propensity] Loaded ${accounts.length} accounts from Supabase`);
    return { accounts: applyQuadrants(accounts), source: "Supabase" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.warn(`[growth-propensity] Supabase fetch failed, using bundled JSON: ${message}`);
    return { accounts: applyQuadrants(fallback), source: "bundled JSON" };
  }
}

// ---- PREVIEW: growth-vs-spend quadrant (ARR on X, growth score without ARR on Y) ----
// GTM holds 7 equally weighted fields, one of which is the ARR band. Public data carries
// only bucket averages, so GTM without ARR = (7 * gtm - arrBand) / 6.
const GTM_FIELD_COUNT = 7;
const ARR_BANDS: Array<[number, number]> = [
  [1_000_000, 1], [750_000, 2], [500_000, 3], [250_000, 4], [150_000, 5], [100_000, 6], [75_000, 7],
];
export function arrBand(arr: number): number {
  for (const [min, score] of ARR_BANDS) if (arr >= min) return score;
  return 8;
}
export type QuadAccount = Account & { growth: number; gtmEx: number; quad: Cluster; indicator: string; watch: boolean; best: string };
export const WATCH = { nrrBelow: 90, growthWorseThan: 6.0 }; // configurable guardrail

export function watchReason(a: { nrr: number; growth?: number }): string {
  const bits: string[] = [];
  if (a.nrr < WATCH.nrrBelow) bits.push(`NRR under ${WATCH.nrrBelow}%`);
  if ((a.growth ?? 0) > WATCH.growthWorseThan) bits.push(`Growth score worse than ${WATCH.growthWorseThan.toFixed(1)}`);
  return bits.join(" · ");
}

// DEMO overrides: invented, for layout only. Nobody made these calls.
export type Override = { account: string; date: string; cluster: Cluster; reason: string; note: string; demo?: boolean };
export const DEMO_OVERRIDES: Override[] = [
  { account: "Stripe", date: "2026-10-09", cluster: "P2", reason: "Budget freeze until Q2", note: "TL;DR: champion confirmed no new spend before April. Keep warm with programs; revisit after their planning cycle.", demo: true },
  { account: "GoPro", date: "2026-09-24", cluster: "P3", reason: "Exec sponsor left", note: "TL;DR: VP sponsor departed in September. Protect the renewal first and rebuild the stakeholder map.", demo: true },
  { account: "Delta", date: "2026-10-14", cluster: "P2", reason: "Procurement consolidation", note: "TL;DR: renewal moving under a central procurement review. Expansion talk waits until the contract is signed.", demo: true },
  { account: "Airbnb", date: "2026-08-28", cluster: "P4", reason: "Product overlap with in-house tool", note: "TL;DR: their platform team is building an internal alternative. Pooled coverage until usage data says otherwise.", demo: true },
  { account: "Apple", date: "2026-10-01", cluster: "P2", reason: "Spend split across business units", note: "TL;DR: ARR is spread over three BUs; only one is ready to grow. Treat as land-and-expand inside that BU.", demo: true },
];

const BEST: Record<ScoreKey, (a: Account) => string> = {
  gtm: (a) => (a.nrr >= 110 ? `spend up ${Math.round(a.nrr - 100)}% this year` : "sales activity and win rate"),
  post: () => "adoption and CSM pulse",
  dd: () => "stakeholders and renewal timing",
  mkt: () => "events and advocacy",
  prod: () => "product requests",
};
const INDICATOR: Record<ScoreKey, (a: Account) => string> = {
  gtm: (a) => (a.nrr >= 110 ? `Spend up ${Math.round(a.nrr - 100)}% this year` : "Strong sales activity and win rate"),
  post: () => "Strong adoption and CSM pulse",
  dd: () => "Aligned stakeholders, good renewal timing",
  mkt: () => "Shows up to events and advocates",
  prod: () => "Asking for more from the product",
};

export function quadrantAccounts(accounts: Account[]): { rows: QuadAccount[]; medArr: number; medGrowth: number } {
  const w: Record<ScoreKey, number> = { gtm: 0.3, mkt: 0.1, post: 0.25, prod: 0.1, dd: 0.25 };
  const base = accounts.map((a) => {
    const gtmEx = (GTM_FIELD_COUNT * a.gtm - arrBand(a.arr)) / (GTM_FIELD_COUNT - 1);
    const growth = gtmEx * w.gtm + a.mkt * w.mkt + a.post * w.post + a.prod * w.prod + a.dd * w.dd;
    const scores: Record<ScoreKey, number> = { gtm: gtmEx, mkt: a.mkt, post: a.post, prod: a.prod, dd: a.dd };
    const rank: Record<ScoreKey, number> = { gtm: 0, post: 0.05, dd: 0.1, mkt: 0.4, prod: 0.9 }; // product last
    const top = (Object.keys(w) as ScoreKey[]).sort((x, y) => scores[x] + rank[x] - (scores[y] + rank[y]))[0];
    return { ...a, gtmEx, growth: Math.round(growth * 1000) / 1000, indicator: INDICATOR[top](a), best: BEST[top](a) };
  });
  const medArr = median(base.map((a) => a.arr));
  const medGrowth = median(base.map((a) => a.growth));
  const rows = base.map((a) => {
    const g = a.growth <= medGrowth;
    const s = a.arr > medArr;
    const quad: Cluster = g ? (s ? "P1" : "P2") : s ? "P3" : "P4";
    const watch = a.nrr < WATCH.nrrBelow || a.growth > WATCH.growthWorseThan;
    const indicator = quad === "P4" || watch ? `Best signal: ${a.best}` : a.indicator;
    return { ...a, quad, watch, indicator, watchReason: watchReason(a) };
  });
  return { rows: rows.sort((a, b) => a.growth - b.growth), medArr, medGrowth };
}

// Piecewise scale: min->median fills one half, median->max the other, log within each half.
function halfLog(v: number, lo: number, mid: number, hi: number, log: boolean): number {
  const f = (x: number) => (log ? Math.log(Math.max(x, 1e-9)) : x);
  if (v <= mid) return mid === lo ? 0.5 : 0.5 * ((f(v) - f(lo)) / (f(mid) - f(lo)));
  return hi === mid ? 0.5 : 0.5 + 0.5 * ((f(v) - f(mid)) / (f(hi) - f(mid)));
}

export function buildQuadrant(accounts: Account[]) {
  const { rows, medArr, medGrowth } = quadrantAccounts(accounts);
  const width = 720, height = 520;
  const plot = { x: 64, y: 20, w: width - 64 - 16, h: height - 20 - 56 };
  const inset = 18;
  const arrs = rows.map((r) => r.arr), gs = rows.map((r) => r.growth);
  const aMin = Math.min(...arrs), aMax = Math.max(...arrs);
  const gMin = Math.min(...gs), gMax = Math.max(...gs);
  const xs = (v: number) => plot.x + inset + halfLog(v, aMin, medArr, aMax, true) * (plot.w - 2 * inset);
  // golf: lowest (best) growth at the top
  const yin = 34; // room for corner quadrant labels
  const ys = (v: number) => plot.y + yin + halfLog(v, gMin, medGrowth, gMax, false) * (plot.h - 2 * yin);
  const midX = plot.x + plot.w / 2, midY = plot.y + plot.h / 2;
  const pts = rows.map((r) => ({ r, cx: xs(r.arr), cy: ys(r.growth) }));
  // collision nudge: keep dots 14px apart, never across a median line or out of the plot
  const minD = 14;
  for (let it = 0; it < 80; it++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      let dx = b.cx - a.cx, dy = b.cy - a.cy;
      let d = Math.hypot(dx, dy);
      if (d >= minD) continue;
      if (d < 0.01) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 1; }
      const push = (minD - d) / 2;
      a.cx -= (dx / d) * push; a.cy -= (dy / d) * push;
      b.cx += (dx / d) * push; b.cy += (dy / d) * push;
      moved = true;
    }
    for (const p of pts) {
      const right = p.r.arr > medArr, top = p.r.growth <= medGrowth;
      p.cx = Math.min(right ? plot.x + plot.w - 8 : midX - 8, Math.max(right ? midX + 8 : plot.x + 8, p.cx));
      p.cy = Math.min(top ? midY - 8 : plot.y + plot.h - 24, Math.max(top ? plot.y + 26 : midY + 8, p.cy));
    }
    if (!moved) break;
  }
  return {
    width, height, plot, rows, medArr, medGrowth,
    medianX: midX, medianY: midY,
    xTicks: [
      { x: plot.x + inset, label: formatArr(aMin), a: "start" },
      { x: midX, label: `${formatArr(medArr)} median`, a: "middle" },
      { x: plot.x + plot.w - inset, label: formatArr(aMax), a: "end" },
    ],
    yTicks: [
      { y: plot.y + yin, label: formatScore(gMin) },
      { y: midY, label: formatScore(medGrowth) },
      { y: plot.y + plot.h - yin, label: formatScore(gMax) },
    ],
    dots: pts,
  };
}

// Quadrants are the clusters: the median split replaces the stored cluster label.
export function applyQuadrants(accounts: Account[]): Account[] {
  if (accounts.length === 0) return accounts;
  const { rows } = quadrantAccounts(accounts.map((a) => ({ ...a, prevCluster: a.prevCluster ?? a.cluster })));
  return rows.map((r) => ({ ...r, cluster: r.quad })).sort(byOverall);
}
