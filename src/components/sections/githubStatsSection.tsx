import { getLocale, getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import Image from "next/image";
import {
  CodeIcon,
  StarIcon,
  FolderIcon,
  CalendarIcon,
  GitBranchIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react/dist/ssr";

interface GitHubRepo {
  stargazers_count: number;
  language: string | null;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
  created_at: string;
}

const fallbackStats = {
  publicRepos: 42,
  totalStars: 28,
  topLanguages: [
    { name: "TypeScript", count: 24, percent: 55, color: "bg-blue-500" },
    { name: "JavaScript", count: 12, percent: 27, color: "bg-yellow-500" },
    { name: "HTML / CSS", count: 4, percent: 10, color: "bg-orange-500" },
    { name: "Shell / Config", count: 2, percent: 8, color: "bg-emerald-500" },
  ]
};

async function getGitHubStats() {
  try {
    const reposRes = await fetch("https://api.github.com/users/gui-bus/repos?per_page=100", {
      next: { revalidate: 3600 }
    });

    if (!reposRes.ok) return { ...fallbackStats, recentCommits: getDefaultCommits() };

    const repos: GitHubRepo[] = await reposRes.json();
    
    let totalStars = 0;
    const languagesMap: Record<string, number> = {};
    
    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
      }
    });

    const totalLangsCount = Object.values(languagesMap).reduce((a, b) => a + b, 0) || 1;
    
    const colorMap: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      HTML: "bg-orange-500",
      CSS: "bg-indigo-500",
      SCSS: "bg-pink-500",
      Shell: "bg-emerald-500",
      Vue: "bg-emerald-600",
    };

    const topLanguages = Object.entries(languagesMap)
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / totalLangsCount) * 100),
        color: colorMap[name] || "bg-zinc-500"
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    const recentCommits = await getRecentCommits();
      
    return {
      publicRepos: repos.length || fallbackStats.publicRepos,
      totalStars: totalStars || fallbackStats.totalStars,
      topLanguages: topLanguages.length ? topLanguages : fallbackStats.topLanguages,
      recentCommits
    };
  } catch (error) {
    console.error("Error fetching GitHub stats, using fallback:", error);
    return { ...fallbackStats, recentCommits: getDefaultCommits() };
  }
}

function getDefaultCommits() {
  return [
    { repo: "Portfolio", message: "feat: standardise section entrance animations", date: new Date().toISOString() },
    { repo: "Portfolio", message: "feat: clean obsolete translation keys", date: new Date(Date.now() - 3600000).toISOString() },
    { repo: "lume", message: "refactor: optimize PDF export layout", date: new Date(Date.now() - 86400000).toISOString() }
  ];
}

async function getRecentCommits() {
  try {
    const eventsRes = await fetch("https://api.github.com/users/gui-bus/events/public", {
      next: { revalidate: 600 } // cache 10m
    });
    if (!eventsRes.ok) return getDefaultCommits();

    const events: GitHubEvent[] = await eventsRes.json();
    const pushEvents = events.filter(e => e.type === "PushEvent" && e.payload.commits && e.payload.commits.length > 0);
    
    if (pushEvents.length > 0) {
      return pushEvents.slice(0, 3).map(e => ({
        repo: e.repo.name.replace("gui-bus/", ""),
        message: e.payload.commits![0].message,
        date: e.created_at
      }));
    }
  } catch (err) {
    console.error("Error fetching events:", err);
  }
  return getDefaultCommits();
}

export async function GithubStatsSection() {
  const t = await getTranslations("GithubStats");
  const locale = await getLocale();
  const stats = await getGitHubStats();

  const metrics = [
    {
      label: "Repositórios",
      value: stats.publicRepos,
      icon: FolderIcon,
      desc: "Repositórios públicos ativos"
    },
    {
      label: "Stars",
      value: stats.totalStars,
      icon: StarIcon,
      desc: "Reconhecimento em projetos"
    }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short"
    });
  };

  return (
    <section
      id="github-activity"
      className="relative py-44 bg-background text-foreground overflow-hidden transition-colors duration-500 grid-approach border-b border-border dark:border-white/5"
    >
      <div className="max-w-400 mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <SectionAnimationWrapper className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow-600 dark:bg-yellow-500" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-yellow-600 dark:text-yellow-500 font-black">
                {t("tag")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-foreground">
              {t("title_top")} <br />
              <span className="outline-text-global italic">
                {t("title_bottom")}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 border-l border-border pl-8 pb-2">
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </SectionAnimationWrapper>

        {/* Stats Grid */}
        <div className="space-y-8">
          <SectionAnimationWrapper className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Metrics */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex-1 flex flex-col justify-between p-8 border border-border dark:border-white/5 bg-muted/5 relative group hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                        {metric.label}
                      </span>
                      <Icon size={18} className="text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div>
                      <span className="text-5xl font-black tracking-tight text-foreground block mb-2">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-light text-muted-foreground leading-normal">
                        {metric.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2: Languages */}
            <div className="lg:col-span-4 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  Linguagens mais utilizadas
                </span>
                <CodeIcon size={18} className="text-yellow-600 dark:text-yellow-500" />
              </div>

              <div className="space-y-6">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-medium text-foreground">{lang.name}</span>
                      <span className="font-mono text-muted-foreground">{lang.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-none overflow-hidden">
                      <div
                        className={`h-full ${lang.color} transition-all duration-500`}
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Live Activity Feed */}
            <div className="lg:col-span-4 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  Atividade Recente
                </span>
                <GitBranchIcon size={18} className="text-yellow-600 dark:text-yellow-500" />
              </div>

              <div className="space-y-5 flex-1 flex flex-col justify-center">
                {stats.recentCommits.map((commit, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1.5 pb-4 border-b border-border dark:border-white/5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={`https://github.com/gui-bus/${commit.repo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-500 dark:hover:text-yellow-400 uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        {commit.repo}
                        <ArrowSquareOutIcon size={10} weight="bold" />
                      </a>
                      <span className="text-[9px] font-mono text-muted-foreground/60">
                        {formatDate(commit.date)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground font-light line-clamp-1">
                      {commit.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionAnimationWrapper>

          {/* Contributions Calendar Row */}
          <SectionAnimationWrapper className="p-8 border border-border dark:border-white/5 bg-muted/5 hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                Histórico de Contribuições
              </span>
              <CalendarIcon size={18} className="text-yellow-600 dark:text-yellow-500" />
            </div>

            {/* Contribution chart container (scroller for small devices) */}
            <div className="w-full overflow-x-auto py-2 scrollbar-thin">
              <div className="min-w-[1100px] flex justify-center py-4 bg-transparent dark:bg-transparent rounded">
                {/* Dark mode chart */}
                <Image
                  src="https://ghchart.rshah.org/216e39/gui-bus"
                  alt="gui-bus GitHub Contributions Graph"
                  width={1100}
                  height={165}
                  className="hidden dark:block select-none opacity-85 hover:opacity-100 transition-opacity duration-300 object-contain w-full"
                  unoptimized
                />
                {/* Light mode chart */}
                <Image
                  src="https://ghchart.rshah.org/216e39/gui-bus"
                  alt="gui-bus GitHub Contributions Graph"
                  width={1100}
                  height={165}
                  className="block dark:hidden select-none opacity-85 hover:opacity-100 transition-opacity duration-300 object-contain w-full"
                  unoptimized
                />
              </div>
            </div>
          </SectionAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
