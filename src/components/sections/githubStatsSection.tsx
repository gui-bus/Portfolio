import {
  CodeIcon,
  CalendarIcon,
  ArrowSquareOutIcon,
  UsersIcon,
  BookOpenIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import Image from "next/image";

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

const fallbackStats = {
  avatarUrl: "https://avatars.githubusercontent.com/u/81804245?v=4",
  name: "Guilherme Bustamante",
  login: "gui-bus",
  bio: "Desenvolvedor Full Stack // Especialista em React, Next.js e TypeScript.",
  followers: 24,
  publicRepos: 11,
  totalStars: 16,
  topLanguages: [
    { name: "TypeScript", count: 8, percent: 62, color: "bg-blue-500" },
    { name: "JavaScript", count: 3, percent: 23, color: "bg-yellow-500" },
    { name: "HTML / CSS", count: 1, percent: 8, color: "bg-orange-500" },
    { name: "Shell / Config", count: 1, percent: 7, color: "bg-emerald-500" },
  ],
};

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      }
    : { Accept: "application/vnd.github+json" };
}

async function getGitHubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/gui-bus", {
        next: { revalidate: 3600 },
        headers: githubHeaders(),
      }),
      fetch("https://api.github.com/users/gui-bus/repos?per_page=100", {
        next: { revalidate: 3600 },
        headers: githubHeaders(),
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.error("User/Repos API error:", userRes.status, reposRes.status);
      return { ...fallbackStats };
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    let totalStars = 0;
    const languagesMap: Record<string, number> = {};

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
      }
    });

    const totalLangsCount =
      Object.values(languagesMap).reduce((a, b) => a + b, 0) || 1;

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
        color: colorMap[name] || "bg-zinc-500",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      avatarUrl: user.avatar_url || fallbackStats.avatarUrl,
      name: user.name || fallbackStats.name,
      login: user.login || fallbackStats.login,
      bio: user.bio || fallbackStats.bio,
      followers: user.followers || fallbackStats.followers,
      publicRepos:
        user.public_repos || repos.length || fallbackStats.publicRepos,
      totalStars: totalStars || fallbackStats.totalStars,
      topLanguages: topLanguages.length
        ? topLanguages
        : fallbackStats.topLanguages,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { ...fallbackStats };
  }
}

export async function GithubStatsSection() {
  const t = await getTranslations("GithubStats");
  const stats = await getGitHubStats();

  return (
    <section
      id="github-activity"
      className="relative py-44 bg-background text-foreground overflow-hidden transition-colors duration-500 grid-approach border-b border-border dark:border-white/5"
    >
      <div className="max-w-400 mx-auto px-6 relative z-10 w-full">
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

        <div className="space-y-8">
          <SectionAnimationWrapper className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-3 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
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

            <div className="lg:col-span-9 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  Histórico de Contribuições
                </span>
                <CalendarIcon
                  size={18}
                  className="text-yellow-600 dark:text-yellow-500"
                />
              </div>

              <div className="w-full overflow-x-auto py-2 scrollbar-thin">
                <div className="min-w-[1000px] flex justify-center py-4">
                  <Image
                    src="https://ghchart.rshah.org/216e39/gui-bus"
                    alt="gui-bus GitHub Contributions Graph"
                    width={1000}
                    height={165}
                    className="select-none opacity-85 hover:opacity-100 transition-opacity duration-300 object-contain w-full"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </SectionAnimationWrapper>

          <SectionAnimationWrapper>
            <div className="lg:col-span-4 p-8 border border-border dark:border-white/5 bg-muted/5 flex flex-col justify-between hover:border-yellow-600/50 dark:hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  Linguagens mais utilizadas
                </span>
                <CodeIcon
                  size={18}
                  className="text-yellow-600 dark:text-yellow-500"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
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
          </SectionAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
