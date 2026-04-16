interface ResultsPageProps {
  searchParams: {
    name?: string;
  };
}

interface PlayerResponse {
  name: string;
  level: number;
  kd: number;
  wins: number;
  matches: number;
  rank: string;
}

async function getPlayer(name: string): Promise<PlayerResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/player/${encodeURIComponent(name)}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const name = searchParams.name?.trim();

  if (!name) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">No player selected</h1>
        <p className="mt-3 text-slate-300">Go back and enter a PUBG player name to search.</p>
      </main>
    );
  }

  const player = await getPlayer(name);

  if (!player) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">Player not found</h1>
        <p className="mt-3 text-slate-300">No profile data was returned for “{name}”.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm uppercase tracking-widest text-pubgGold">Result</p>
      <h1 className="mt-2 text-4xl font-black uppercase">{player.name}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat label="Rank" value={player.rank} />
        <Stat label="Level" value={String(player.level)} />
        <Stat label="K/D" value={player.kd.toFixed(2)} />
        <Stat label="Wins" value={String(player.wins)} />
        <Stat label="Matches" value={String(player.matches)} />
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
