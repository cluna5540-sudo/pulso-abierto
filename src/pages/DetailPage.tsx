
import { Link, useParams } from "react-router-dom";
import type { CryptoId } from "../types/crypto";
import { useFavoriteStore } from "../store/favoriteStore";

const cryptos = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    description: "Bitcoin es una moneda digital descentralizada.",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    description: "Ethereum es una plataforma basada en tecnología blockchain.",
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    description: "Solana es una red blockchain diseñada para transacciones rápidas.",
  },
};

function DetailPage() {
  const { id } = useParams();
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoriteStore(
  (state) => state.toggleFavorite
);
  const isValidId = id && Object.hasOwn(cryptos, id);

  if (!isValidId) {
    return (
      <main className="container">
        <h1>Criptomoneda no encontrada</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  const crypto = cryptos[id as CryptoId];
  const isFavorite = favoriteIds.includes(id as CryptoId);
  return (
    <main className="container">
      <h1>{crypto.name}</h1>
      <p>Símbolo: {crypto.symbol}</p>
      <p>{crypto.description}</p>
      <button
  type="button"
  aria-pressed={isFavorite}
  onClick={() => toggleFavorite(id as CryptoId)}
>
  {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
</button>
      <Link to="/">Volver a las cotizaciones</Link>
    </main>
  );
}

export default DetailPage;
