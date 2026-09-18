import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Copy,
  FileSearch,
  Home,
  Lightbulb,
  Link2,
  ListChecks,
  Mail,
  Menu,
  PencilLine,
  RotateCcw,
  ShieldAlert,
  Wand2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workmate AI — Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Plan work, draft professional emails, and turn research into clear next steps with a private frontend-only assistant.",
      },
      { property: "og:title", content: "Workmate AI — Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "A polished workspace for email drafting, task planning, and research synthesis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkmateApp,
});

type View = "dashboard" | "email" | "planner" | "research";
type Tone = "Formal" | "Friendly" | "Persuasive";
type Priority = "High" | "Medium" | "Low";
type PlanItem = { time: string; title: string; detail: string; priority: Priority };

const navigation = [
  { id: "dashboard" as const, label: "Overview", icon: Home },
  { id: "email" as const, label: "Email Generator", icon: Mail },
  { id: "planner" as const, label: "Task Planner", icon: CalendarDays },
  { id: "research" as const, label: "Research Assistant", icon: FileSearch },
];

const featureCards = [
  {
    id: "email" as const,
    title: "Write a polished email",
    description: "Turn a few talking points into a clear, professional message.",
    icon: Mail,
    meta: "3 tones",
  },
  {
    id: "planner" as const,
    title: "Plan your workload",
    description: "Shape priorities and deadlines into a practical schedule.",
    icon: ListChecks,
    meta: "Daily or weekly",
  },
  {
    id: "research" as const,
    title: "Make research useful",
    description: "Distil source material into insights and recommendations.",
    icon: FileSearch,
    meta: "3-part analysis",
  },
];

function WorkmateApp() {
  const [view, setView] = useState<View>("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = (next: View) => {
    setView(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        view={view}
        onNavigate={navigate}
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenu(true)}
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
            <div>
              <p className="text-sm font-semibold">
                {navigation.find((item) => item.id === view)?.label}
              </p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Private session · Nothing is saved
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-success" />
            Mock AI ready
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-8 md:py-9 lg:px-10">
          {view === "dashboard" && <Dashboard onNavigate={navigate} />}
          {view === "email" && <EmailGenerator />}
          {view === "planner" && <TaskPlanner />}
          {view === "research" && <ResearchAssistant />}
        </main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground shadow-brand">
        W
      </div>
      <div>
        <p className="font-semibold text-sidebar-foreground">
          Workmate <span className="text-sidebar-primary">AI</span>
        </p>
        <p className="text-[11px] text-sidebar-muted">Productivity assistant</p>
      </div>
    </div>
  );
}

function Sidebar({
  view,
  onNavigate,
  open,
  onClose,
}: {
  view: View;
  onNavigate: (view: View) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-overlay lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar p-4 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-12 items-center justify-between px-2">
          <Brand />
          <Button
            variant="sidebarGhost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>
        <nav className="mt-10 space-y-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <Button
                key={item.id}
                variant={active ? "sidebarActive" : "sidebarGhost"}
                className="w-full justify-start"
                onClick={() => onNavigate(item.id)}
              >
                <Icon />
                {item.label}
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-sidebar-border pt-5">
          <div className="rounded-md bg-sidebar-accent p-3.5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-sidebar-foreground">
              <ShieldAlert className="size-4 text-sidebar-primary" />
              Private by design
            </div>
            <p className="text-[11px] leading-5 text-sidebar-muted">
              Your entries stay in this session and disappear when you refresh.
            </p>
          </div>
          <p className="mt-4 px-1 text-[10px] text-sidebar-muted">WORKMATE AI · DEMO</p>
        </div>
      </aside>
    </>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="space-y-8">
      <section className="border-b border-border pb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Friday, 18 September
        </p>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
              Good morning, Ayanda. What will you move forward today?
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Draft, plan, and synthesise your work in one focused space.
            </p>
          </div>
          <Button size="lg" onClick={() => onNavigate("email")}>
            <Wand2 />
            Start creating
          </Button>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="section-kicker">Your toolkit</p>
            <h2 className="mt-1 text-xl font-semibold">Choose a place to begin</h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">3 focused tools</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.id}
                className="group flex min-h-56 flex-col rounded-md border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-11 place-items-center rounded-md bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-xs font-medium text-muted-foreground">{feature.meta}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onNavigate(feature.id)}
                    aria-label={`Open ${feature.title}`}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="section-kicker">Quick actions</p>
              <h2 className="mt-1 text-lg font-semibold">Pick up the pace</h2>
            </div>
          </div>
          <div className="divide-y divide-border rounded-md border border-border bg-card">
            <QuickAction
              icon={<Mail />}
              title="Draft a project update"
              subtitle="Create a clear stakeholder email"
              onClick={() => onNavigate("email")}
            />
            <QuickAction
              icon={<ClipboardCheck />}
              title="Organise today's priorities"
              subtitle="Turn your task list into time blocks"
              onClick={() => onNavigate("planner")}
            />
            <QuickAction
              icon={<Lightbulb />}
              title="Summarise an article"
              subtitle="Extract insights and next steps"
              onClick={() => onNavigate("research")}
            />
          </div>
        </section>
        <section>
          <div className="mb-4">
            <p className="section-kicker">Recent activity</p>
            <h2 className="mt-1 text-lg font-semibold">This session</h2>
          </div>
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex gap-3">
              <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-surface-soft text-muted-foreground">
                <Clock3 className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">No activity yet</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Generated items will appear here temporarily during this session.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Disclaimer />
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="row"
      className="h-auto w-full justify-between rounded-none px-4 py-4"
      onClick={onClick}
    >
      <span className="flex items-center gap-3 text-left">
        <span className="grid size-9 place-items-center rounded-md bg-surface-soft text-primary [&_svg]:size-4">
          {icon}
        </span>
        <span>
          <span className="block text-sm font-medium">{title}</span>
          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{subtitle}</span>
        </span>
      </span>
      <ChevronRight className="text-muted-foreground" />
    </Button>
  );
}

function ToolHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7">
      <p className="section-kicker">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function EmailGenerator() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const generate = () => {
    if (!recipient.trim() || !subject.trim() || !points.trim()) return;
    setLoading(true);
    timer.current = setTimeout(() => {
      const opening =
        tone === "Friendly"
          ? "I hope your week is going well."
          : tone === "Persuasive"
            ? "I’m reaching out with a timely opportunity for us to move this work forward."
            : "I hope this message finds you well.";
      const close =
        tone === "Friendly"
          ? "Thanks so much — I look forward to hearing your thoughts."
          : tone === "Persuasive"
            ? "I’d welcome the opportunity to align on this and agree the next step."
            : "Please let me know if you require any additional information.";
      setOutput(
        `Subject: ${subject}\n\nDear ${recipient},\n\n${opening}\n\n${points.trim()}\n\n${close}\n\nKind regards,\nAyanda`,
      );
      setLoading(false);
    }, 850);
  };
  const clear = () => {
    setRecipient("");
    setSubject("");
    setPoints("");
    setOutput("");
  };
  return (
    <div>
      <ToolHeader
        eyebrow="Communication"
        title="Smart Email Generator"
        description="Turn a few essentials into a polished message, then refine every word before you use it."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="tool-panel">
          <div className="panel-heading">
            <span className="step-number">1</span>
            <div>
              <h2>Brief your email</h2>
              <p>Add enough context to make the draft useful.</p>
            </div>
          </div>
          <div className="space-y-5">
            <Field label="Recipient or context" hint="Required">
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Thandi, our project sponsor"
              />
            </Field>
            <Field label="Subject" hint="Required">
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Q3 launch timeline update"
              />
            </Field>
            <Field label="Key points" hint="Required">
              <Textarea
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Include the message purpose, important details, and desired next step..."
                className="min-h-36"
              />
            </Field>
            <Field label="Tone">
              <div className="grid grid-cols-3 gap-2">
                {(["Formal", "Friendly", "Persuasive"] as Tone[]).map((item) => (
                  <Button
                    key={item}
                    variant={tone === item ? "choiceActive" : "choice"}
                    onClick={() => setTone(item)}
                  >
                    {tone === item && <Check />}
                    {item}
                  </Button>
                ))}
              </div>
            </Field>
            <Button
              className="w-full"
              size="lg"
              disabled={!recipient.trim() || !subject.trim() || !points.trim() || loading}
              onClick={generate}
            >
              <Wand2 />
              {loading ? "Composing..." : "Generate email"}
            </Button>
          </div>
        </section>
        <OutputPanel
          title="Your draft"
          empty={!output && !loading}
          loading={loading}
          actions={
            output && (
              <ActionButtons
                text={output}
                onCopied={setCopied}
                copied={copied}
                onClear={() => setOutput("")}
              />
            )
          }
        >
          {output && (
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[410px] resize-none border-0 bg-transparent p-0 text-sm leading-7 shadow-none focus-visible:ring-0"
              aria-label="Editable email draft"
            />
          )}
        </OutputPanel>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" onClick={clear}>
          <RotateCcw />
          Clear all
        </Button>
      </div>
      <Disclaimer />
    </div>
  );
}

function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("8");
  const [mode, setMode] = useState<"Daily" | "Weekly">("Daily");
  const [priority, setPriority] = useState<Priority>("High");
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const generate = () => {
    if (!tasks.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const names = tasks
        .split(/\n|,/)
        .map((t) => t.trim())
        .filter(Boolean);
      const fallback = [
        "Review project brief",
        "Complete priority deliverable",
        "Prepare stakeholder update",
      ];
      const items = (names.length ? names : fallback)
        .slice(0, mode === "Daily" ? 5 : 7)
        .map((title, index) => ({
          time:
            mode === "Daily"
              ? `${String(9 + index * 2).padStart(2, "0")}:00`
              : (["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Friday", "Friday"][
                  index
                ] ?? "Friday"),
          title,
          detail:
            index === 0
              ? "Start with focused work while energy is highest."
              : index % 2
                ? "Complete, review, and share the outcome."
                : "Progress this before the next commitment.",
          priority: index === 0 ? priority : index < 3 ? "Medium" : ("Low" as Priority),
        }));
      setPlan(items);
      setLoading(false);
    }, 850);
  };
  const planText = plan
    .map((item) => `${item.time} — ${item.title} (${item.priority})\n${item.detail}`)
    .join("\n\n");
  return (
    <div>
      <ToolHeader
        eyebrow="Planning"
        title="AI Task Planner"
        description="Convert a busy task list into a calm, realistic schedule built around time and priority."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="tool-panel">
          <div className="panel-heading">
            <span className="step-number">1</span>
            <div>
              <h2>Define your workload</h2>
              <p>One task per line works best.</p>
            </div>
          </div>
          <div className="space-y-5">
            <Field label="Tasks, deadlines, and notes" hint="Required">
              <Textarea
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder={
                  "Prepare client proposal — due 11:00\nReview campaign report — due today\nPlan next week's team meeting"
                }
                className="min-h-40"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Available hours">
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </Field>
              <Field label="Top priority">
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </Field>
            </div>
            <Field label="Planning horizon">
              <div className="grid grid-cols-2 gap-2">
                {(["Daily", "Weekly"] as const).map((item) => (
                  <Button
                    key={item}
                    variant={mode === item ? "choiceActive" : "choice"}
                    onClick={() => setMode(item)}
                  >
                    {item} plan
                  </Button>
                ))}
              </div>
            </Field>
            <Button
              className="w-full"
              size="lg"
              disabled={!tasks.trim() || loading}
              onClick={generate}
            >
              <Wand2 />
              {loading ? "Building your plan..." : `Create ${mode.toLowerCase()} plan`}
            </Button>
          </div>
        </section>
        <OutputPanel
          title={`${mode} schedule`}
          empty={!plan.length && !loading}
          loading={loading}
          actions={
            plan.length > 0 && (
              <ActionButtons
                text={planText}
                onCopied={setCopied}
                copied={copied}
                onClear={() => setPlan([])}
              />
            )
          }
        >
          {plan.length > 0 && (
            <div className="space-y-3">
              {plan.map((item, index) => (
                <div
                  key={`${item.time}-${index}`}
                  className="grid grid-cols-[64px_1fr] gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[88px_1fr_auto]"
                >
                  <div className="font-mono text-xs font-semibold text-primary">{item.time}</div>
                  <div>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        setPlan((current) =>
                          current.map((entry, i) =>
                            i === index ? { ...entry, title: e.target.value } : entry,
                          ),
                        )
                      }
                      className="h-auto border-0 p-0 font-medium shadow-none focus-visible:ring-0"
                    />
                    <Textarea
                      value={item.detail}
                      onChange={(e) =>
                        setPlan((current) =>
                          current.map((entry, i) =>
                            i === index ? { ...entry, detail: e.target.value } : entry,
                          ),
                        )
                      }
                      className="mt-1 min-h-10 resize-none border-0 p-0 text-xs leading-5 text-muted-foreground shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <PriorityBadge priority={item.priority} />
                </div>
              ))}
            </div>
          )}
        </OutputPanel>
      </div>
      <Disclaimer />
    </div>
  );
}

function ResearchAssistant() {
  const [inputMode, setInputMode] = useState<"Topic" | "Text" | "URL">("Topic");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ summary: "", insights: "", recommendations: "" });
  const [copied, setCopied] = useState(false);
  const generate = () => {
    if (!source.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const topic =
        inputMode === "URL"
          ? "the referenced webpage"
          : inputMode === "Text"
            ? "the supplied material"
            : source.trim();
      setResult({
        summary: `${topic} highlights a workplace shift toward more deliberate, outcome-focused ways of working. The central argument is that productivity improves when teams reduce fragmented attention, clarify ownership, and use technology to support—not replace—sound professional judgement.`,
        insights: `1. Focus is a capacity issue, not simply a time-management issue.\n\n2. Clear decision rights reduce duplicated effort and delays.\n\n3. Lightweight automation creates the most value when paired with human review.\n\n4. Teams benefit from measuring completed outcomes rather than visible activity.`,
        recommendations: `• Choose one recurring workflow to simplify this month.\n\n• Define a clear owner and success measure before work begins.\n\n• Create protected focus periods for high-value tasks.\n\n• Review AI-assisted work before sharing or making decisions.`,
      });
      setLoading(false);
    }, 900);
  };
  const clear = () => {
    setSource("");
    setResult({ summary: "", insights: "", recommendations: "" });
  };
  return (
    <div>
      <ToolHeader
        eyebrow="Research"
        title="AI Research Assistant"
        description="Turn a topic or source into a concise brief with useful insights and practical next steps."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="tool-panel">
          <div className="panel-heading">
            <span className="step-number">1</span>
            <div>
              <h2>Add your source</h2>
              <p>Choose one input type for this analysis.</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-2">
              {(["Topic", "Text", "URL"] as const).map((item) => (
                <Button
                  key={item}
                  variant={inputMode === item ? "choiceActive" : "choice"}
                  onClick={() => {
                    setInputMode(item);
                    setSource("");
                  }}
                >
                  <span className="hidden sm:inline">
                    {item === "URL" ? <Link2 /> : item === "Text" ? <FileSearch /> : <Lightbulb />}
                  </span>
                  {item}
                </Button>
              ))}
            </div>
            {inputMode === "Text" ? (
              <Field label="Article or source text" hint="Required">
                <Textarea
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Paste the text you want to analyse..."
                  className="min-h-52"
                />
              </Field>
            ) : (
              <Field label={inputMode === "URL" ? "Webpage URL" : "Research topic"} hint="Required">
                <Input
                  type={inputMode === "URL" ? "url" : "text"}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder={
                    inputMode === "URL"
                      ? "https://example.com/article"
                      : "e.g. The future of hybrid work"
                  }
                />
              </Field>
            )}
            {inputMode === "URL" && (
              <div className="rounded-md border border-info-border bg-info-soft p-3 text-xs leading-5 text-info">
                <strong>Demo mode:</strong> This frontend does not open or scrape links. A realistic
                sample analysis will be generated for the URL you enter.
              </div>
            )}
            <Button
              className="w-full"
              size="lg"
              disabled={!source.trim() || loading}
              onClick={generate}
            >
              <Wand2 />
              {loading ? "Analysing..." : "Generate research brief"}
            </Button>
          </div>
        </section>
        <OutputPanel
          title="Research brief"
          empty={!result.summary && !loading}
          loading={loading}
          actions={
            result.summary && (
              <ActionButtons
                text={`${result.summary}\n\n${result.insights}\n\n${result.recommendations}`}
                onCopied={setCopied}
                copied={copied}
                onClear={clear}
              />
            )
          }
        >
          {result.summary && (
            <Tabs defaultValue="summary">
              <TabsList className="mb-5 grid h-auto w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="insights">Key insights</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              {(["summary", "insights", "recommendations"] as const).map((key) => (
                <TabsContent key={key} value={key}>
                  <Textarea
                    value={result[key]}
                    onChange={(e) =>
                      setResult((current) => ({ ...current, [key]: e.target.value }))
                    }
                    className="min-h-[320px] resize-none border-0 bg-transparent p-0 text-sm leading-7 shadow-none focus-visible:ring-0"
                    aria-label={`Editable ${key}`}
                  />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </OutputPanel>
      </div>
      <Disclaimer />
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium">
        <span>{label}</span>
        {hint && (
          <span className="text-[10px] font-semibold uppercase text-muted-foreground">{hint}</span>
        )}
      </span>
      {children}
    </label>
  );
}

function OutputPanel({
  title,
  empty,
  loading,
  actions,
  children,
}: {
  title: string;
  empty: boolean;
  loading: boolean;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="tool-panel min-h-[520px]">
      <div className="mb-5 flex min-h-9 items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <span className="step-number">2</span>
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        {actions}
      </div>
      {loading ? (
        <div className="grid min-h-[400px] place-items-center text-center">
          <div>
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            <p className="text-sm font-medium">Creating your result</p>
            <p className="mt-1 text-xs text-muted-foreground">Using a realistic mock response</p>
          </div>
        </div>
      ) : empty ? (
        <div className="grid min-h-[400px] place-items-center text-center">
          <div className="max-w-xs">
            <div className="mx-auto mb-4 grid size-12 place-items-center rounded-md bg-surface-soft text-muted-foreground">
              <PencilLine />
            </div>
            <p className="text-sm font-medium">Your editable result will appear here</p>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Complete the fields and generate when you’re ready.
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </section>
  );
}

function ActionButtons({
  text,
  onCopied,
  copied,
  onClear,
}: {
  text: string;
  onCopied: (value: boolean) => void;
  copied: boolean;
  onClear: () => void;
}) {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    onCopied(true);
    setTimeout(() => onCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          document.querySelector<HTMLElement>('textarea[aria-label^="Editable"]')?.focus()
        }
      >
        <PencilLine />
        Edit
      </Button>
      <Button variant="ghost" size="sm" onClick={copy}>
        {copied ? <CheckCircle2 /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button variant="ghost" size="icon" onClick={onClear} aria-label="Clear result">
        <RotateCcw />
      </Button>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "h-fit rounded-full px-2 py-1 text-[10px] font-bold uppercase",
        priority === "High"
          ? "bg-priority-high text-priority-high-foreground"
          : priority === "Medium"
            ? "bg-priority-medium text-priority-medium-foreground"
            : "bg-priority-low text-priority-low-foreground",
      )}
    >
      {priority}
    </span>
  );
}

function Disclaimer() {
  return (
    <div className="mt-8 flex items-start gap-3 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>
        <strong className="font-semibold text-foreground">Responsible AI:</strong> AI-generated
        content may contain errors or omissions. Review and verify important information before
        using it. Do not enter confidential or sensitive workplace information.
      </p>
    </div>
  );
}
