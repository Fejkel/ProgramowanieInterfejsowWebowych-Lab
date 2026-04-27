import { getGameById } from '../../component/lib';
import GameForm from '../../component/GameForm';

export default async function EditGamePage({ params }) {
  const { id } = await params;
  const game = await getGameById(id);

  return (
    <main style={{ padding: '20px' }}>
      <GameForm game={game} />
    </main>
  );
}