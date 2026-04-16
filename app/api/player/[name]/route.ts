import { NextResponse } from "next/server";

const mockPlayers: Record<string, { level: number; kd: number; wins: number; matches: number; rank: string }> = {
  shroud: { level: 421, kd: 3.8, wins: 119, matches: 840, rank: "Diamond I" },
  drdisrespect: { level: 388, kd: 2.4, wins: 75, matches: 690, rank: "Platinum II" },
  playerunknown: { level: 500, kd: 4.1, wins: 202, matches: 1044, rank: "Master" }
};

export async function GET(_: Request, { params }: { params: { name: string } }) {
  const normalizedName = params.name.toLowerCase();
  const playerData = mockPlayers[normalizedName];

  if (!playerData) {
    return NextResponse.json({ message: "Player not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: params.name,
    ...playerData
  });
}
