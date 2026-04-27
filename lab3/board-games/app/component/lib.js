let gamesCache = null;

export async function getAllGames() {
    try {
        if (gamesCache !== null) {
            return gamesCache;
        }

        const res = await fetch('https://szandala.github.io/piwo-api/board-games.json');
        if (!res.ok) throw new Error('Błąd pobierania danych');
        
        const data = await res.json();
        let result = [];

        if (Array.isArray(data)) {
            result = data;
        } else if (data && typeof data === 'object') {
            const key = Object.keys(data).find(k => Array.isArray(data[k]));
            result = key ? data[key] : [];
        }
        gamesCache = result;
        return gamesCache;

    } catch (error) {
        console.error("Błąd pobierania:", error);
        return gamesCache || []; 
    }
}

export async function getGameById(id) {
    const games = await getAllGames();
    return games.find(g => g.id.toString() === id);
}


export async function updateGame(id, updatedData) {
    const games = await getAllGames();
    const index = games.findIndex(g => g.id.toString() === id);
    
    if (index !== -1) {
        // Łączymy stare dane z nowymi
        games[index] = { ...games[index], ...updatedData };
        gamesCache = games; // Aktualizujemy nasz "cache"
        return true;
    }
    return false;
}