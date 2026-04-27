import { getGameById } from '../../component/lib';
import Link from 'next/link';
import GameGallery from '../../component/GameGallery';

export default async function GameDetailsPage({ params }) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Nie znaleziono gry!</h2>
        <Link href="/">Wróć do listy gier</Link>
      </div>
    );
  }

  return (
    <main className="strona-produktu">
        <section className="zdjecie-produktu">
            <GameGallery images={game.images} title={game.title} />
        </section>
        
        <section className="szczegoly-produktu">
            <h2>{game.title}</h2>
            <p className="opis-produktu">
                {game.description}
            </p>
            <ul className="informacje-o-produkcie">
                <li><strong>Gracze:</strong> {game.min_players} - {game.max_players}</li>
                <li><strong>Czas gry:</strong> {game.avg_play_time_minutes} min</li>
                <li><strong>Wydawnictwo:</strong> {game.publisher}</li>
                <li><strong>Kategoria:</strong> {game.type}</li>
            </ul>
        </section>

        <aside className="cena-produktu">
            <h3>Cena</h3>
            <p name="cena">{game.price_pln} zł</p>
            <button className="przycisk-kup">Dodaj do koszyka</button>
            <Link 
                href={`/edit/${id}`} 
                className="nav-button" 
                style={{ width: '100%', marginTop: '10px', display: 'flex' }}
            >
                Edytuj grę
            </Link>
        </aside>
    </main>
  );
}