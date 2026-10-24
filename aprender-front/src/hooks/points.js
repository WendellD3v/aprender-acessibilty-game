const ranking = [
    { id: "user-1", name: "Ana", points: 250, avatar: "👧" },
    { id: "user-2", name: "Lucas", points: 180, avatar: "👦" },
    { id: "user-3", name: "Sofia", points: 120, avatar: "👧" },
    { id: "user-4", name: "Miguel", points: 60, avatar: "👦" },
    { id: "current-user", name: "Wendell_D3v", points: 0, avatar: "⭐" },
];

export function getGeralRanking(){
    return [...ranking].sort((a, b) => b.points - a.points);
};

export function getPlayerPoints() {
    return ranking.find((player) => player.id === 'current-user')?.points ?? null;
};

export function givePlayerPoints(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return false;

    const player = ranking.find((player) => player.id === 'current-user');

    if (!player) return false;

    player.points += amount;

    return player.points
};

export function getPlayer(){
    return ranking.find((player) => player.id === 'current-user') ?? false;
};