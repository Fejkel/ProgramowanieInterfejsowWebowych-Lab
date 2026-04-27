"use client";

export default function Filters({ initialFilters = {}, types = []}) {
  return (
    <section className="filtry">
      <h2>Filtry</h2>
      <form method="GET">
        <div className="filter">
          <label>Cena:</label>
          <input name="cena-od" type="number" placeholder="Od" defaultValue={initialFilters?.['cena-od'] || ''} />
          <input name="cena-do" type="number" placeholder="Do" defaultValue={initialFilters?.['cena-do'] || ''} />
        </div>

        <div className="filter">
          <label>Liczba graczy:</label>
          <input name="liczba-gracz-min" type="number" placeholder="Min" defaultValue={initialFilters?.['liczba-gracz-min'] || ''} />
          <input name="liczba-gracz-max" type="number" placeholder="Max" defaultValue={initialFilters?.['liczba-gracz-max'] || ''} />
        </div>

        <div className="filter">
          <label htmlFor="rodzaj">Rodzaj:</label>
          <select id="rodzaj" name="rodzaj" defaultValue={initialFilters?.['rodzaj'] || 'all-games'}>
            <option value="all-games">Wszystkie rodzaje</option>
            {types.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="wyszukaj-opis">Szukaj:</label>
          <input 
            name="wyszukaj-opis" 
            type="text" 
            placeholder="Szukaj..."
            defaultValue={initialFilters?.['wyszukaj-opis'] || ''} 
          />
        </div>

        <div className="filter">
          <label>Czas gry (min):</label>
          <input name="czas-gry-od" type="number" placeholder="Od" defaultValue={initialFilters?.['czas-gry-od'] || ''} />
          <input name="czas-gry-do" type="number" placeholder="Do" defaultValue={initialFilters?.['czas-gry-do'] || ''} />
        </div>

        <button type="submit">Filtruj</button>
        <button type="button" onClick={() => window.location.href = '/'}>Wyczyść</button>
      </form>
    </section>
  );
}