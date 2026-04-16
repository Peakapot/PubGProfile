"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface PlayerResponse {
  name: string;
  level: number;
  kd: number;
  wins: number;
  matches: number;
  rank: string;
}

const mockPlayers: Record<string, Omit<PlayerResponse, "name">> = {
  shroud: { level: 421, kd: 3.8, wins: 119, matches: 840, rank: "Diamond I" },
  drdisrespect: { level: 388, kd: 2.4, wins: 75, matches: 690, rank: "Platinum II" },
  playerunknown: { level: 500, kd: 4.1, wins: 202, matches: 1044, rank: "Master" }
};

function getPlayer(name: string): PlayerResponse | null {
  const normalizedName = name.toLowerCase();
  const playerData = mockPlayers[normalizedName];

  if (!playerData) {
    return null;
  }

  return {
    name,
    ...playerData
  };
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsMessage title="Loading player..." description="Fetching profile details." />}>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")?.trim() ?? "";

  const player = useMemo(() => {
    if (!name) {
      return null;
    }

    return getPlayer(name);
  }, [name]);

  if (!name) {
    return <ResultsMessage title="No player selected" description="Go back and enter a PUBG player name to search." />;
  }

  if (!player) {
    return <ResultsMessage title="Player not found" description={`No profile data was returned for “${name}”.`} />;
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

function ResultsMessage({ title, description }: { title: string; description: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-300">{description}</p>
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
