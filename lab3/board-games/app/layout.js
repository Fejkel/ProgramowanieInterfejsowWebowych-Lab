import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <header>
          <h1><Link href="/">DiceParadise</Link></h1>
          <nav>
            <button className="nav-button">Logowanie</button>
            <button className="nav-button">Koszyk</button>
            <Link href="/add" className="nav-button">Dodaj grę</Link>
          </nav> 
        </header>
        
        <main>{children}</main>

        <footer>
          <p>2026 DiceParadise</p>
          <p>Autor: Kacper Mikosiński 280985</p>
        </footer>
      </body>
    </html>
  );
}