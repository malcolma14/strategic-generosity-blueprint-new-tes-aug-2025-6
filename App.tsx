import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import {
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Users,
  Shield,
  BarChart3,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tone = "reassuring" | "educational" | "celebratory";

interface GeneratedComm {
  delegator: string;
  validator: string;
  collaborator: string;
}

// ─── Generation Logic ─────────────────────────────────────────────────────────

function generateCommunications(
  event: string,
  tone: Tone,
  includeCTA: boolean
): GeneratedComm {
  const eventLower = event.toLowerCase().trim();

  const isMarketDrop =
    /drop|fell|down|decline|dip|loss|lost|crash|correction|sold off/i.test(eventLower);
  const isMarketGain =
    /gain|rose|up|rally|surged|climb|record|high|positive/i.test(eventLower);
  const isInterestRate =
    /rate|interest|bank of canada|boc|monetary|policy/i.test(eventLower);
  const isInflation = /inflation|cpi|cost of living|price/i.test(eventLower);
  const isTax = /tax|rrsp|tfsa|resp|capital gain|cra|budget/i.test(eventLower);

  const toneOpeners: Record<Tone, { d: string; v: string; c: string }> = {
    reassuring: {
      d: "I want to reach out personally to let you know: you are in good hands.",
      v: "I know moments like this can feel unsettling — and that's completely normal.",
      c: "Let's look at this clearly, with data in hand, so we can move forward with confidence.",
    },
    educational: {
      d: "A quick note to keep you informed about something relevant to your financial picture.",
      v: "I want to share some context so this news makes sense for your situation.",
      c: "There's a lot of noise in the market right now — here's how to read the signal.",
    },
    celebratory: {
      d: "I have some genuinely good news to share with you today.",
      v: "There's a real bright spot in the current financial picture, and I wanted you to be among the first to hear about it.",
      c: "The numbers are looking favourable — and I think this is worth digging into together.",
    },
  };

  const buildContext = () => {
    if (isMarketDrop)
      return `We've seen some turbulence — ${event}. This kind of movement is a normal part of how markets cycle, and it's something your plan is already prepared for.`;
    if (isMarketGain)
      return `Markets have moved in our favour recently — ${event}. This is the kind of progress your long-term plan is designed to capture.`;
    if (isInterestRate)
      return `The Bank of Canada has made a move that affects borrowing costs and savings rates — ${event}. Here's what that means for Canadians like you.`;
    if (isInflation)
      return `Inflation continues to shape the cost of everyday life — ${event}. Understanding its impact helps us make smarter decisions with your money.`;
    if (isTax)
      return `There's an important tax and planning consideration on the table — ${event}. This is exactly the kind of moment your Strategic Generosity Blueprint™ was built for.`;
    return `Something worth noting has come up in the financial world — ${event}. I always want to make sure you hear it from me first, in plain language.`;
  };

  const context = buildContext();

  const ctaDelegator = includeCTA
    ? "\n\nNo action needed on your end right now — but I'm always here if you'd like to connect. Reach out whenever you're ready."
    : "\n\nNo action required from you at this time.";

  const ctaValidator = includeCTA
    ? "\n\nWhenever you're ready, let's find a time to talk it through — I'd love to hear how you're feeling."
    : "";

  const ctaCollaborator = includeCTA
    ? "\n\nI'd love to get 30 minutes on the calendar to walk through this together — bring your questions and let's dig in."
    : "\n\nFeel free to come prepared with questions for our next conversation.";

  const historyNote = isMarketDrop
    ? "Canadian equities have recovered from every correction in the past 40 years. Diversified, long-term investors who stayed the course came out ahead."
    : isMarketGain
    ? "Investors who stayed disciplined through previous uncertainty are seeing real rewards right now. Your plan was built for moments exactly like this."
    : isInterestRate
    ? "Rate changes affect everything from mortgage costs to savings returns. The key is knowing how your specific situation is positioned — and we've planned for this."
    : isInflation
    ? "Inflation is one of the biggest long-term risks to purchasing power. A well-structured investment plan is one of the most effective tools to stay ahead of it."
    : isTax
    ? "Tax-efficient planning is one of the highest-value things we do together. Small moves at the right time can make a meaningful difference to your long-term wealth."
    : "Short-term market events rarely change long-term outcomes for disciplined investors with a clear plan — and you have one.";

  const dataContext = isInterestRate
    ? "monetary policy and its ripple effects across borrowing costs, fixed income, and real estate"
    : isInflation
    ? "purchasing power, cost pressures, and the real return on your investments"
    : isTax
    ? "the Canadian tax and planning landscape, including opportunities specific to your Blueprint"
    : "market sentiment, economic conditions, and how they connect to your long-term goals";

  // ── DELEGATOR ──────────────────────────────────────────────────────────────
  const delegator = `${toneOpeners[tone].d}

${context}

Your plan — your Strategic Generosity Blueprint™ — is built to weather exactly this kind of moment. The work we've done together accounts for short-term fluctuations so your long-term goals stay firmly on track. You don't need to do anything differently right now.
${ctaDelegator}

Warmly,
[Your Name]`;

  // ── VALIDATOR / AVOIDANT ───────────────────────────────────────────────────
  const validator = `${toneOpeners[tone].v}

${context}

Here's what matters most for you right now:

1. Your financial plan already has this kind of moment built in — you are not starting from zero.
2. One small step worth considering: let's check in to confirm your approach still reflects what matters most to you.

Your Strategic Generosity Blueprint™ exists precisely for times like this — to keep your values at the centre of every financial decision, even when the news feels noisy.
${ctaValidator}

With care,
[Your Name]`;

  // ── COLLABORATOR ───────────────────────────────────────────────────────────
  const collaborator = `${toneOpeners[tone].c}

${context}

Here's a breakdown of what this means — and how it connects to your bigger picture:

**What's happening:** ${event}. This reflects broader shifts in ${dataContext} that we've been tracking closely.

**What the data tells us:** ${historyNote}

**What this means for your Strategic Generosity Blueprint™:**
- Your philanthropic giving timeline remains intact
- Your core portfolio positioning is designed to absorb this kind of movement
- There may be a tactical opportunity here worth exploring together

**Meeting prep — come ready to discuss:**
- Your current asset allocation and whether anything feels misaligned
- Any changes in your personal priorities, timeline, or financial goals
- Specific questions about individual holdings or accounts

I believe in transparent, values-aligned advice — and that means walking through both the data and the human side of what's happening together.
${ctaCollaborator}

Looking forward to our conversation,
[Your Name]`;

  return { delegator, validator, collaborator };
}

// ─── Archetype Config ─────────────────────────────────────────────────────────

const ARCHETYPES = [
  {
    key: "delegator" as const,
    label: "Delegators",
    tagline: "Concise · Reassuring · Minimal action",
    icon: Shield,
    accent: "#0072CE",
    bg: "#F0F8FD",
    border: "#D9EBF6",
    description:
      "Clients who trust you fully and want the bottom line — no fluff, just calm reassurance.",
  },
  {
    key: "validator" as const,
    label: "Validators / Avoidants",
    tagline: "Warm · Short · 1–2 clear steps",
    icon: Users,
    accent: "#2D7D46",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    description:
      "Clients who need validation and gentle guidance — keep it simple, warm, and actionable.",
  },
  {
    key: "collaborator" as const,
    label: "Collaborators",
    tagline: "Detailed · Data-rich · Meeting prep",
    icon: BarChart3,
    accent: "#001E60",
    bg: "#F8F9FF",
    border: "#C7D2FE",
    description:
      "Clients who love the details — give them data, analysis, and something to prepare.",
  },
];

// ─── CommCard ─────────────────────────────────────────────────────────────────

function CommCard({
  archetype,
  text,
}: {
  archetype: (typeof ARCHETYPES)[0];
  text: string;
}) {
  const [copied, setCopied] = useState(false);
  const Icon = archetype.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, i: number) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className="font-semibold mt-4 mb-1 text-sm" style={{ color: archetype.accent }}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (/\*\*/.test(line)) {
      const parts = line.split(/\*\*/);
      return (
        <p key={i} className="mb-1.5 text-sm leading-relaxed">
          {parts.map((part, pi) =>
            pi % 2 === 1 ? (
              <strong key={pi} style={{ color: archetype.accent }}>
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-5 mb-1 text-sm list-disc leading-relaxed">
          {line.slice(2)}
        </li>
      );
    }
    if (/^\d+\./.test(line)) {
      const num = line[0];
      const content = line.slice(2).trim();
      return (
        <div key={i} className="flex items-start gap-2.5 mb-2">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white flex-shrink-0 mt-0.5"
            style={{ backgroundColor: archetype.accent }}
          >
            {num}
          </span>
          <span className="text-sm leading-relaxed">{content}</span>
        </div>
      );
    }
    if (line === "") return <div key={i} className="h-2" />;
    return (
      <p key={i} className="mb-1.5 text-sm leading-relaxed">
        {line}
      </p>
    );
  };

  return (
    <div
      className="flex flex-col rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderColor: archetype.border }}
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3"
        style={{ backgroundColor: archetype.bg, borderBottom: `1px solid ${archetype.border}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: archetype.accent }}
          >
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[#001E60] text-sm leading-tight">
              {archetype.label}
            </h3>
            <p className="text-xs text-[#767676] mt-0.5">{archetype.tagline}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex-shrink-0"
          style={{
            borderColor: copied ? archetype.accent : archetype.border,
            color: copied ? archetype.accent : "#767676",
            backgroundColor: copied ? archetype.bg : "white",
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Card body */}
      <div className="flex-1 p-5 bg-white text-[#2D2D2F]">
        {text.split("\n").map((line, i) => renderLine(line, i))}
      </div>
    </div>
  );
}

// ─── Tone Options ─────────────────────────────────────────────────────────────

const TONES: { value: Tone; label: string; desc: string; emoji: string }[] = [
  { value: "reassuring", label: "Reassuring", desc: "Calm, steady, confident", emoji: "🤝" },
  { value: "educational", label: "Educational", desc: "Informed, clear, empowering", emoji: "💡" },
  { value: "celebratory", label: "Celebratory", desc: "Upbeat, warm, energising", emoji: "🎉" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [event, setEvent] = useState("");
  const [tone, setTone] = useState<Tone>("reassuring");
  const [includeCTA, setIncludeCTA] = useState(true);
  const [comms, setComms] = useState<GeneratedComm | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!event.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setComms(generateCommunications(event.trim(), tone, includeCTA));
      setIsGenerating(false);
    }, 600);
  };

  const handleReset = () => {
    setComms(null);
    setEvent("");
    setTone("reassuring");
    setIncludeCTA(true);
  };

  const examples = [
    "TSX dropped 4% this week",
    "Bank of Canada cut rates by 0.25%",
    "Inflation held at 2.9% in January",
    "RRSP deadline is next week",
    "Markets rallied to new highs this month",
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F0F8FD", fontFamily: "'Nunito Sans', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{ backgroundColor: "#001E60", borderColor: "#0072CE22" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0072CE" }}
            >
              <MessageSquare size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm tracking-tight">
                Strategic Generosity Blueprint™
              </div>
              <div className="text-blue-300 text-xs hidden sm:block">
                Client Communication Generator
              </div>
            </div>
          </div>
          <Badge className="text-xs bg-blue-900 text-blue-200 border-blue-800 hidden sm:flex">
            Bay Street · Built with Heart
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 text-xs text-blue-700 font-medium mb-4 shadow-sm">
            <Sparkles size={12} />
            Three archetypes · Canadian spelling · Active voice · No jargon
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#001E60] leading-tight mb-3">
            Turn market moments into<br />
            <span style={{ color: "#0072CE" }}>meaningful client conversations</span>
          </h1>
          <p className="text-sm text-[#767676] leading-relaxed">
            Enter any financial event or topic, choose your tone, and get three tailored
            communications — one for each client archetype — ready to paste into email or LinkedIn.
          </p>
        </div>

        {/* ── Input card ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 max-w-3xl mx-auto">
          <div className="space-y-5">
            {/* Event textarea */}
            <div>
              <Label className="text-sm font-semibold text-[#001E60] mb-2 block">
                Market event or financial topic
              </Label>
              <textarea
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="e.g. TSX dropped 4% this week due to trade uncertainty…"
                rows={3}
                className="w-full text-sm rounded-xl border px-4 py-3 outline-none resize-none transition-colors"
                style={{
                  borderColor: "#DFE3EB",
                  backgroundColor: "#F0F8FD",
                  color: "#2D2D2F",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0072CE")}
                onBlur={(e) => (e.target.style.borderColor = "#DFE3EB")}
              />
              {/* Quick-fill chips */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setEvent(ex)}
                    className="text-xs px-2.5 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone + CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Tone buttons */}
              <div className="flex-1">
                <Label className="text-sm font-semibold text-[#001E60] mb-2 block">Tone</Label>
                <div className="flex gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className="flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer"
                      style={{
                        borderColor: tone === t.value ? "#0072CE" : "#DFE3EB",
                        backgroundColor: tone === t.value ? "#F0F8FD" : "white",
                        color: tone === t.value ? "#001E60" : "#767676",
                        boxShadow: tone === t.value ? "0 0 0 2px #0072CE28" : "none",
                      }}
                    >
                      <span className="text-lg leading-none">{t.emoji}</span>
                      <span className="font-semibold">{t.label}</span>
                      <span className="text-[10px] opacity-70 hidden sm:block">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA toggle */}
              <div className="flex sm:flex-col justify-end">
                <button
                  onClick={() => setIncludeCTA(!includeCTA)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer text-left"
                  style={{
                    borderColor: includeCTA ? "#0072CE" : "#DFE3EB",
                    backgroundColor: includeCTA ? "#F0F8FD" : "white",
                    boxShadow: includeCTA ? "0 0 0 2px #0072CE28" : "none",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      borderColor: includeCTA ? "#0072CE" : "#DFE3EB",
                      backgroundColor: includeCTA ? "#0072CE" : "white",
                    }}
                  >
                    {includeCTA && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#001E60]">Include soft CTA</div>
                    <div className="text-xs text-[#767676]">Invitational, ~10 words</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={!event.trim() || isGenerating}
                className="flex-1 h-11 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#0072CE" }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Generate Client Communications
                    <ChevronRight size={15} />
                  </>
                )}
              </button>
              {comms && (
                <button
                  onClick={handleReset}
                  className="h-11 px-4 rounded-xl text-sm font-semibold border transition-colors cursor-pointer flex items-center gap-2"
                  style={{ borderColor: "#DFE3EB", color: "#767676" }}
                >
                  <RefreshCw size={15} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Output ─────────────────────────────────────────────────────────── */}
        {comms && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: "#0072CE" }} />
                <h2 className="text-base font-bold text-[#001E60]">
                  Ready-to-send communications
                </h2>
              </div>
              <p className="text-xs text-[#767676]">Click Copy on any card</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {ARCHETYPES.map((a) => (
                <CommCard key={a.key} archetype={a} text={comms[a.key]} />
              ))}
            </div>

            {/* Archetype reference */}
            <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
              <h3 className="text-sm font-bold text-[#001E60] mb-3">Archetype guide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ARCHETYPES.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.key}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: a.bg }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: a.accent }}
                      >
                        <Icon size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: a.accent }}>
                          {a.label}
                        </p>
                        <p className="text-xs text-[#767676] mt-0.5 leading-snug">
                          {a.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Empty state ─────────────────────────────────────────────────────── */}
        {!comms && (
          <div className="text-center py-14">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#D9EBF6" }}
            >
              <MessageSquare size={28} style={{ color: "#0072CE" }} />
            </div>
            <p className="text-sm font-semibold text-[#001E60]">
              Your three tailored communications will appear here
            </p>
            <p className="text-xs text-[#767676] mt-1">
              Enter a topic above and click Generate to get started
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="mt-8 border-t py-6" style={{ borderColor: "#DFE3EB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#767676]">
            Strategic Generosity Blueprint™ · Client Communication Generator
          </p>
          <p className="text-xs text-[#767676]">
            Built for advisors who believe good finance and good values go hand in hand.
          </p>
        </div>
      </footer>
    </div>
  );
}
