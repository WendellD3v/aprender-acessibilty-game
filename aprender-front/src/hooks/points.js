const ranking = [
    { id: "user-1", name: "Ana", points: 250, avatar: '/avatars/1.png' },
    { id: "user-2", name: "Lucas", points: 180, avatar: '/avatars/11.png' },
    { id: "user-3", name: "Sofia", points: 120, avatar: '/avatars/2.png' },
    { id: "user-4", name: "Miguel", points: 60, avatar: '/avatars/12.png' },
    { id: "user-5", name: "Julia", points: 55, avatar: '/avatars/3.png' },
    { id: "user-6", name: "Pedro", points: 50, avatar: '/avatars/13.png' },
    { id: "user-7", name: "Laura", points: 45, avatar: '/avatars/4.png' },
    { id: "user-8", name: "Gabriel", points: 40, avatar: '/avatars/14.png' },
    { id: "user-9", name: "Beatriz", points: 35, avatar: '/avatars/5.png' },
    { id: "user-10", name: "Rafael", points: 30, avatar: '/avatars/15.png' },
    { id: "user-11", name: "Isabela", points: 28, avatar: '/avatars/6.png' },
    { id: "user-12", name: "Matheus", points: 25, avatar: '/avatars/16.png' },
    { id: "user-13", name: "Manuela", points: 22, avatar: '/avatars/7.png' },
    { id: "user-14", name: "Gustavo", points: 20, avatar: '/avatars/17.png' },
    { id: "user-15", name: "Valentina", points: 18, avatar: '/avatar/8.png' },
    { id: "user-16", name: "Felipe", points: 16, avatar: '/avatars/18.png' },
    { id: "user-17", name: "Helena", points: 14, avatar: '/avatars/9.png' },
    { id: "user-18", name: "Bruno", points: 12, avatar: '/avatars/19.png' },
    { id: "user-19", name: "Luiza", points: 10, avatar: '/avatars/10.png' },
    { id: "user-20", name: "Thiago", points: 8, avatar: '/avatars/20.png' },
    { id: "user-21", name: "Mariana", points: 7, avatar: '/avatars/1.png' },
    { id: "user-22", name: "Enzo", points: 6, avatar: '/avatars/11.png' },
    { id: "user-23", name: "Clara", points: 5, avatar: '/avatars/2.png' },
    { id: "user-24", name: "Davi", points: 4, avatar: '/avatars/12.png' },
    { id: "user-25", name: "Alice", points: 3, avatar: '/avatars/3.png' },
    { id: "user-26", name: "Samuel", points: 2, avatar: '/avatars/13.png' },
    { id: "user-27", name: "Lívia", points: 1, avatar: '/avatars/4.png' },
    { id: "user-28", name: "Caio", points: 0, avatar: '/avatars/14.png' },
    { id: "user-29", name: "Eduarda", points: 0, avatar: '/avatars/5.png' },
    { id: "current-user", name: "Wendell_D3v", points: 0, avatar: '/avatars/15.png' },
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