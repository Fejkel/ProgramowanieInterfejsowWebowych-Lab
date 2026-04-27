import { getAllGames } from './component/lib';
import Filters from './component/Filters'; 
import Link from 'next/link';

export default async function HomePage({ searchParams }) {
  const allGames = await getAllGames();
  const s = await searchParams;
  const uniqueTypes = [...new Set(allGames.map(game => game.type))].filter(Boolean);
 
  const filteredGames = allGames.filter(game => {
    // Cena
    const cenaOd = parseFloat(s['cena-od']) || 0;
    const cenaDo = parseFloat(s['cena-do']) || 9999;
    if (game.price_pln < cenaOd || game.price_pln > cenaDo) return false;

    // Gracze
    const minG = parseInt(s['liczba-gracz-min']) || 0;
    if (game.min_players < minG) return false;

    // Rodzaj (Type)
    const rodzaj = s['rodzaj'];
    if (rodzaj && rodzaj !== 'all-games' && game.type !== rodzaj) return false;
    // Wydawnictwo (Publisher)
    
    // Szukaj w opisie/tytule
    const query = s['wyszukaj-opis']?.toLowerCase();
    if (query) {
      const desc = Array.isArray(game.description) ? game.description.join(' ') : game.description;
      if (!game.title.toLowerCase().includes(query) && !desc.toLowerCase().includes(query)) return false;
    }

    // Jeśli przeszedł wszystkie testy
    return true;
  });

  return (
    <main>
      <Filters 
        initialFilters={s} 
        types={uniqueTypes} 
      />
      <section className="wyniki">
        <h2>Lista gier</h2>
        <div className="lista-gier">
          {filteredGames.map((game) => (
            <article key={game.id} className="karta-gry">

              <img src={game.images[0] || '/img/placeholder.png'} alt={game.title} />
              <div className="karta-gry-body">
                <h3 className="karta-gry-tytul">{game.title}</h3>
                <p className="karta-gry-opis">{game.description}</p>

                <ul className="karta-gry-detale">
                  <li><strong>Cena:</strong> {game.price_pln} zł</li>
                  <li><strong>Gracze:</strong> {game.min_players}-{game.max_players}</li>
                  <li><strong>Czas:</strong> {game.avg_play_time_minutes} min</li>
                </ul>

                <Link href={`/games/${game.id}`} className="btn-koszyk">
                  Szczegóły
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}