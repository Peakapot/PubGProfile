import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-3 rounded-full border border-pubgGold/30 bg-pubgGold/10 px-4 py-1 text-sm font-medium uppercase tracking-widest text-pubgGold">
        BATTLE ROYALE STATS
      </p>
      <h1 className="text-4xl font-black uppercase tracking-wide sm:text-6xl">PUBG Profile Finder</h1>
      <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
        Drop in and search for any player name to view recent match data from the in-app API route.
      </p>

      <form action="/results" method="get" className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="name"
          required
          placeholder="Enter PUBG player name"
          className="h-14 flex-1 rounded-md border border-pubgAsh/50 bg-black/40 px-4 text-lg outline-none ring-pubgGold transition focus:ring-2"
        />
        <button
          type="submit"
          className="h-14 rounded-md bg-pubgGold px-8 font-bold uppercase tracking-wide text-black transition hover:brightness-110"
        >
          Search
        </button>
      </form>

      <Link href="/results?name=Shroud" className="mt-4 text-sm text-slate-400 underline hover:text-white">
        Try a sample player
      </Link>
    </main>
  );
}
