"use client";
import { handleGameForm } from '../actions';

export default function GameForm({ game = {} }) {
  // Przekształcamy tablicę opisu na tekst z nowymi liniami dla textarea
  const descriptionText = Array.isArray(game.description) 
    ? game.description.join('\n') 
    : game.description || '';

  return (
    <section className="szczegoly-produktu">
      <h2 style={{ color: '#66c0f4', marginBottom: '20px', textShadow: '2px 2px #2a475e' }}>
        {game.id ? `Edycja: ${game.title}` : "Dodaj nową grę"}
      </h2>
      <form action={handleGameForm} className="form-edycja" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {game.id && <input type="hidden" name="id" value={game.id} />}
        <input 
          type="hidden" 
          name="current_images" 
          value={JSON.stringify(game.images || ["img/placeholder.webp"])} 
        />
        <div className="filter">
          <label>Tytuł gry:</label>
          <input name="title" type="text" defaultValue={game.title} required placeholder="np. Gloomhaven" />
        </div>
        <div className="form-grid">
          <div className="filter">
            <label>Cena (PLN):</label>
            <input name="price_pln" type="number" step="0.01" defaultValue={game.price_pln} required />
          </div>
          <div className="filter">
            <label>Typ/Kategoria:</label>
            <input name="type" type="text" defaultValue={game.type} placeholder="np. przygodowa" />
          </div>
        </div>
        <div className="filter">
          <label>Wydawnictwo:</label>
          <input name="publisher" type="text" defaultValue={game.publisher} placeholder="Nazwa wydawcy" />
        </div>
        <div className="filter">
          <label>Opis (każde zdanie w nowej linii):</label>
          <textarea 
            name="description" 
            rows="6"
            defaultValue={descriptionText}
            placeholder="Wpisz opis gry..."
          />
        </div>
        <div className="form-grid">
          <div className="filter">
            <label>Min. graczy:</label>
            <input name="min_players" type="number" defaultValue={game.min_players} />
          </div>
          <div className="filter">
            <label>Max. graczy:</label>
            <input name="max_players" type="number" defaultValue={game.max_players} />
          </div>
          <div className="filter">
            <label>Czas gry (min):</label>
            <input name="avg_play_time_minutes" type="number" defaultValue={game.avg_play_time_minutes} />
          </div>
        </div>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            name="is_expansion" 
            id="is_expansion"
            defaultChecked={game.is_expansion} 
          />
          <label htmlFor="is_expansion" style={{ margin: 0, cursor: 'pointer', color: '#9ebbd1' }}>
            To jest dodatek (Expansion)
          </label>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', gap: '15px' }}>
          <button type="submit" className="btn-submit" style={{ flex: 2 }}>
            {game.id ? "Zapisz zmiany" : "Dodaj grę do bazy"}
          </button>
          
          <button 
            type="button" 
            onClick={() => window.history.back()} 
            className="nav-button"
            style={{ flex: 1, cursor: 'pointer' }}
          >
            Anuluj
          </button>
        </div>
      </form>
    </section>
  );
}