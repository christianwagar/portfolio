"""Build src/data/growth-signals.json: for each demo account and bucket, the real field
that scored best (lowest band) and its actual value from the agps demo CSV. No invented numbers.
Usage: python3 scripts/build-signals.py /path/to/agps"""
import sys, json, csv
AGPS = sys.argv[1]; sys.path.insert(0, AGPS + "/src")
from agps import engine
cfg = json.load(open(AGPS + "/config/agps.v1-compat.json"))
rows = list(csv.DictReader(l for l in open(AGPS + "/examples/demo_accounts.csv") if not l.startswith("#")))
scored = engine.score_rows(cfg, [dict(r) for r in rows], "quartile")
B = {"gtm_propensity": "gtm", "marketing_programmatic_engagement": "mkt", "post_sales": "post", "product": "prod", "down_and_distance": "dd"}
# label, formatter. Fields not listed are never shown (free text, ARR, raw dollars that repeat ARR).
def pct(v): return f"{round(float(v))}%"
def yes(lbl): return lambda v: lbl if str(v).lower() == "true" else None
F = {
 "nrr": lambda v: f"NRR {pct(v)}",
 "attach_rate": lambda v: f"Attach rate {pct(v)}",
 "pct_opps_closed_won": lambda v: f"Win rate {pct(v)}",
 "account_team_activity_count": lambda v: f"{int(float(v))} account-team touches",
 "event_attendance_count": lambda v: f"{int(float(v))} events attended",
 "webinar_nps": lambda v: f"Webinar NPS {round(float(v))}",
 "newsletter_opens": lambda v: f"{int(float(v))} newsletter opens",
 "advocate_champion": yes("Named advocate"),
 "success_story_published": yes("Published success story"),
 "premium_success_plan": yes("Premium success plan"),
 "csqls_generated": lambda v: f"{int(float(v))} CSQLs",
 "csql_win_rate": lambda v: f"CSQL win rate {pct(v)}",
 "adoption_achieved": yes("Adoption goals met"),
 "value_realized": yes("Value realized"),
 "csm_pulse_rag": lambda v: f"CSM pulse {v}",
 "sla_breaches": lambda v: f"{int(float(v))} SLA breaches",
 "avg_days_to_resolve": lambda v: f"Cases resolved in {float(v):g} days",
 "feature_requests_count": lambda v: f"{int(float(v))} feature requests",
 "key_stakeholder_alignment": lambda v: f"Stakeholder alignment {v}",
 "years_as_customer": lambda v: f"{float(v):g} years as a customer",
 "tenk_signal": lambda v: f"10-K signal: {v}",
 "customer_sentiment": lambda v: f"Sentiment {v}",
}
order = list(F)
out = {}
for raw, s in zip(rows, scored):
    acc = {}
    for bk, key in B.items():
        cands = []
        for f, spec in cfg["fields"].items():
            if spec.get("bucket") != bk or f not in F or raw.get(f, "") == "": continue
            sc = s["_fields"].get(f)
            if not isinstance(sc, (int, float)): continue
            txt = F[f](raw[f])
            if txt: cands.append((sc, order.index(f), f, txt))
        if cands:
            cands.sort(); sc, _, f, txt = cands[0]
            # second-best adds context when it ties on score
            two = [c for c in cands[1:] if c[0] == sc][:1]
            t2 = two[0][3] if two else ""
            if t2 and len(t2) > 1 and t2[1].islower(): t2 = t2[0].lower() + t2[1:]
            acc[key] = {"field": f, "score": sc, "text": txt + (", " + t2 if t2 else "")}
    out[raw["account_name"]] = acc
json.dump(out, open(sys.argv[2] if len(sys.argv) > 2 else "src/data/growth-signals.json", "w"), indent=1)

# v9: newspaper-style headline per bucket, built only from the real values above.
def n(v): return int(round(float(v)))
H = {
 "nrr": lambda v: f"Spend up {n(v)-100}%" if float(v) >= 101 else f"NRR holds at {n(v)}%",
 "pct_opps_closed_won": lambda v: (f"Win rate hits {n(v)}%" if n(v) >= 50 else f"Win rate at {n(v)}%"),
 "attach_rate": lambda v: f"Attach rate at {n(v)}%",
 "account_team_activity_count": lambda v: (f"{n(v)} account-team touches keep deals moving" if n(v) >= 20 else f"{n(v)} account-team touches"),
 "event_attendance_count": lambda v: (f"{n(v)} events attended show real engagement" if n(v) >= 6 else f"{n(v)} events attended"),
 "webinar_nps": lambda v: (f"Webinar NPS hits {n(v)}" if n(v) >= 70 else f"Webinar NPS at {n(v)}"),
 "newsletter_opens": lambda v: (f"{n(v)} newsletter opens keep the brand top of mind" if n(v) >= 10 else f"{n(v)} newsletter opens"),
 "advocate_champion": lambda v: "Named advocate in the account",
 "success_story_published": lambda v: "Public success story on the record",
 "premium_success_plan": lambda v: "Premium success plan in place",
 "csqls_generated": lambda v: f"{n(v)} CSQLs from the success team",
 "csql_win_rate": lambda v: (f"CSQL win rate hits {n(v)}%" if n(v) >= 50 else f"CSQL win rate at {n(v)}%"),
 "adoption_achieved": lambda v: "Adoption goals met",
 "value_realized": lambda v: "Value realized",
 "csm_pulse_rag": lambda v: f"CSM pulse {str(v).lower()}",
 "sla_breaches": lambda v: "Zero SLA breaches" if n(v) == 0 else f"{n(v)} SLA breaches",
 "avg_days_to_resolve": lambda v: f"Cases closed in {float(v):g} days",
 "feature_requests_count": lambda v: (f"{n(v)} feature requests signal expansion appetite" if n(v) >= 8 else ("No open feature requests" if n(v) == 0 else f"{n(v)} feature request{'s' if n(v) != 1 else ''} on file")),
 "key_stakeholder_alignment": lambda v: f"Stakeholder alignment {str(v).lower()}",
 "years_as_customer": lambda v: f"{float(v):g}-year customer",
 "tenk_signal": lambda v: f"10-K signal {str(v).lower()}",
 "customer_sentiment": lambda v: "Sentiment strong" if str(v).lower() == "positive" else f"Sentiment {str(v).lower()}",
}
SH = {"feature_requests_count": lambda v: f"{n(v)} feature requests", "event_attendance_count": lambda v: f"{n(v)} events attended", "account_team_activity_count": lambda v: f"{n(v)} account-team touches", "newsletter_opens": lambda v: f"{n(v)} newsletter opens", "csqls_generated": lambda v: f"{n(v)} CSQLs", "premium_success_plan": lambda v: "premium success plan", "advocate_champion": lambda v: "named advocate", "success_story_published": lambda v: "public success story", "years_as_customer": lambda v: f"{float(v):g} years in"}
def low(s): return s if (len(s) > 1 and s[1].isupper()) or s[:3] in ("CSM", "NRR", "CSQ", "SLA") else s[0].lower() + s[1:]
for raw in rows:
    acc = out[raw["account_name"]]
    for bk, key in B.items():
        if key not in acc: continue
        f = acc[key]["field"]; h = H[f](raw[f])
        # one more real fact: tied second field, or renewal timing for the stakeholder bucket
        extra = None
        if key == "dd" and raw.get("days_to_next_renewal") and float(raw["days_to_next_renewal"]) <= 120:
            h = f"Renewal in {n(raw['days_to_next_renewal'])} days, " + low(H[f](raw[f]).replace("Stakeholder alignment strong", "stakeholders aligned"))
        else:
            for c in [x for x in cfg["fields"] if cfg["fields"][x].get("bucket") == bk and x in H and x != f and raw.get(x, "") != ""]:
                sc = scored[rows.index(raw)]["_fields"].get(c)
                if sc == acc[key]["score"] and F[c](raw[c]):
                    e = SH.get(c, H[c])(raw[c])
                    if len(h) + len(e) < 58: extra = e; break
            if extra: h = f"{h}; {low(extra)}"
        acc[key]["headline"] = h
json.dump(out, open(sys.argv[2] if len(sys.argv) > 2 else "src/data/growth-signals.json", "w"), indent=1)
