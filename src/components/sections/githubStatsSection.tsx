import { getLocale, getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import Image from "next/image";
import {
  CodeIcon,
  CalendarIcon,
  GitBranchIcon,
  ArrowSquareOutIcon,
  UsersIcon,
  BookOpenIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string | null;
  followers: number;
  public_repos: number;
}

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
  avatarUrl: "https://avatars.githubusercontent.com/u/81804245?v=4",
  name: "Guilherme Bustamante",
  login: "gui-bus",
  bio: "Desenvolvedor Full Stack com foco em React, Next.js e TypeScript.",
  followers: 16,
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
    const userRes = await fetch("https://api.github.com/users/gui-bus", {
      next: { revalidate: 3600 }
    });
    
    const reposRes = await fetch("https://api.github.com/users/gui-bus/repos?per_page=100", {
      next: { revalidate: 3600 }
    });

    if (!userRes.ok || !reposRes.ok) {
      return { ...fallbackStats, recentCommits: getDefaultCommits() };
    }

    const user: GitHubUser = await userRes.json();
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
      avatarUrl: user.avatar_url || fallbackStats.avatarUrl,
      name: user.name || fallbackStats.name,
      login: user.login || fallbackStats.login,
      bio: user.bio || fallbackStats.bio,
      followers: user.followers || fallbackStats.followers,
      publicRepos: user.public_repos || repos.length || fallbackStats.publicRepos,
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
      next: { revalidate: 600 }
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
            {/* Column 1: GitHub Profile Badge */}
            <div className="lg:col-span-4 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300 relative group">
              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border dark:border-white/10 mb-4">
                  <Image
                    src={stats.avatarUrl}
                    alt={stats.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                  {stats.name}
                </h3>
                <span className="text-xs font-mono text-muted-foreground/60 block mb-4">
                  @{stats.login}
                </span>
                <p className="text-xs font-light text-muted-foreground leading-relaxed max-w-[240px] min-h-[40px]">
                  {stats.bio}
                </p>
              </div>

              {/* Profile stats row */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-border dark:border-white/5 py-4 my-6 text-center">
                <div>
                  <span className="text-lg font-black text-foreground block">
                    {stats.publicRepos}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase flex items-center justify-center gap-1">
                    <BookOpenIcon size={10} /> Repos
                  </span>
                </div>
                <div>
                  <span className="text-lg font-black text-foreground block">
                    {stats.totalStars}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase flex items-center justify-center gap-1">
                    <StarIcon size={10} /> Stars
                  </span>
                </div>
                <div>
                  <span className="text-lg font-black text-foreground block">
                    {stats.followers}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase flex items-center justify-center gap-1">
                    <UsersIcon size={10} /> Followers
                  </span>
                </div>
              </div>

              {/* Follow Button */}
              <a
                href={`https://github.com/${stats.login}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-foreground dark:bg-white text-background dark:text-black hover:bg-yellow-600 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-black text-[10px] font-mono uppercase tracking-[0.2em] font-black text-center transition-colors flex items-center justify-center gap-2"
              >
                Seguir no GitHub
                <ArrowSquareOutIcon size={12} weight="bold" />
              </a>
            </div>

            {/* Column 2: Top Languages with Horizontal Segment Bar */}
            <div className="lg:col-span-4 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  Linguagens mais utilizadas
                </span>
                <CodeIcon size={18} className="text-yellow-600 dark:text-yellow-500" />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {/* Horizontal Segmented Bar */}
                <div className="h-3 w-full flex bg-zinc-200 dark:bg-zinc-800 rounded-none overflow-hidden mb-8">
                  {stats.topLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      className={`${lang.color} h-full`}
                      style={{ width: `${lang.percent}%` }}
                      title={`${lang.name}: ${lang.percent}%`}
                    />
                  ))}
                </div>

                {/* Languages List with Color Dots */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {stats.topLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 shrink-0 ${lang.color}`} />
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-foreground">
                          {lang.name}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground/80">
                          {lang.percent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
