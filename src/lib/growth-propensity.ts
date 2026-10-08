// Build-time growth propensity data for the True North note.
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

export const CLUSTER_META: Record<Cluster, { name: string; line: string }> = {
  P1: {
    name: "Expand now",
    line: "Best 25 percent. Multi-thread the account and turn the renewal into a growth deal.",
  },
  P2: {
    name: "Grow into it",
    line: "Second quartile. Land and expand with programs and advocacy.",
  },
  P3: {
    name: "Protect and re-ignite",
    line: "Third quartile. Fix health before chasing a new use case.",
  },
  P4: {
    name: "Scale and monitor",
    line: "Bottom quartile. Digital or pooled coverage. Watch for a real move.",
  },
};

export const FOCUS_RULE =
  "Rule: the three lowest overall scores among accounts renewing within 120 days. Ties break toward the sooner renewal. If fewer than three qualify, the next-soonest renewals fill the list.";

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

export type ChartDot = {
  account: Account;
  cx: number;
  cy: number;
  label: string;
};

export type ChartModel = {
  width: number;
  height: number;
  plot: { x: number; y: number; w: number; h: number };
  medianX: number;
  medianY: number;
  xMinLabel: string;
  xMaxLabel: string;
  yMinLabel: string;
  yMaxLabel: string;
  medianArrLabel: string;
  medianNrrLabel: string;
  dots: ChartDot[];
  quadrants: Array<{ x: number; y: number; anchor: "start" | "end"; text: string }>;
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
  return a.overall - b.overall || a.name.localeCompare(b.name);
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
  const compare = (a: Account, b: Account) =>
    a.overall - b.overall || a.renewal - b.renewal || a.name.localeCompare(b.name);
  const inWindow = accounts.filter((account) => account.renewal <= FOCUS_WINDOW_DAYS).sort(compare);
  if (inWindow.length >= count) return inWindow.slice(0, count);
  const later = accounts
    .filter((account) => account.renewal > FOCUS_WINDOW_DAYS)
    .sort((a, b) => a.renewal - b.renewal || compare(a, b));
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
  const overall = formatScore(account.overall);
  const nrr = formatNrr(account.nrr);
  const days = Math.round(account.renewal);

  const whyLead: Record<Cluster, string> = {
    P1: "P1 is the best quartile of overall score, the group to expand first.",
    P2: "P2 is the second quartile. The score says grow into it, not a full expansion push.",
    P3: "P3 is the third quartile. The score says protect the account before chasing new revenue.",
    P4: "P4 is the bottom quartile. The score says keep coverage light and wait for a real move.",
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
    why: `${whyLead[account.cluster]} The overall score is ${overall}. ${strongest.label} is the strongest bucket at ${strongScore}, and ${weakest.label} is the weakest at ${weakScore}.`,
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

export function buildChart(accounts: Account[]): ChartModel {
  const width = 640;
  const height = 420;
  const pad = { l: 72, r: 16, t: 20, b: 52 };
  const plot = { x: pad.l, y: pad.t, w: width - pad.l - pad.r, h: height - pad.t - pad.b };
  const arrs = accounts.map((account) => account.arr);
  const nrrs = accounts.map((account) => account.nrr);
  const xMin = Math.min(...arrs);
  const xMax = Math.max(...arrs);
  const yMin = Math.min(...nrrs);
  const yMax = Math.max(...nrrs);
  const xPad = (xMax - xMin) * 0.06 || 1;
  const yPad = (yMax - yMin) * 0.1 || 1;
  const x0 = Math.max(0, xMin - xPad);
  const x1 = xMax + xPad;
  const y0 = yMin - yPad;
  const y1 = yMax + yPad;
  const xScale = (value: number) => plot.x + ((value - x0) / (x1 - x0)) * plot.w;
  const yScale = (value: number) => plot.y + (1 - (value - y0) / (y1 - y0)) * plot.h;
  const xMed = median(arrs);
  const yMed = median(nrrs);

  return {
    width,
    height,
    plot,
    medianX: xScale(xMed),
    medianY: yScale(yMed),
    xMinLabel: formatArr(xMin),
    xMaxLabel: formatArr(xMax),
    yMinLabel: formatNrr(yMin),
    yMaxLabel: formatNrr(yMax),
    medianArrLabel: formatArr(xMed),
    medianNrrLabel: formatNrr(yMed),
    dots: accounts.map((account) => ({
      account,
      cx: xScale(account.arr),
      cy: yScale(account.nrr),
      label: `${account.name}, ${account.cluster}, ${formatArr(account.arr)} ARR, ${formatNrr(account.nrr)} NRR`,
    })),
    quadrants: [
      { x: plot.x + 8, y: plot.y + 16, anchor: "start", text: "Higher NRR, lower ARR" },
      { x: plot.x + plot.w - 8, y: plot.y + 16, anchor: "end", text: "Higher NRR, higher ARR" },
      { x: plot.x + 8, y: plot.y + plot.h - 10, anchor: "start", text: "Lower NRR, lower ARR" },
      { x: plot.x + plot.w - 8, y: plot.y + plot.h - 10, anchor: "end", text: "Lower NRR, higher ARR" },
    ],
  };
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
      return { accounts: fallback, source: "bundled JSON" };
    }

    const accounts = ((data ?? []) as ViewRow[])
      .map(viewAccount)
      .filter((account): account is Account => account !== null)
      .sort(byOverall);

    if (accounts.length === 0) {
      console.warn("[growth-propensity] Supabase fetch failed, using bundled JSON: no rows");
      return { accounts: fallback, source: "bundled JSON" };
    }

    console.info(`[growth-propensity] Loaded ${accounts.length} accounts from Supabase`);
    return { accounts, source: "Supabase" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.warn(`[growth-propensity] Supabase fetch failed, using bundled JSON: ${message}`);
    return { accounts: fallback, source: "bundled JSON" };
  }
}
