
import { Link } from "react-router-dom";
import type { Cryptocurrency } from "../types/crypto";
import { useFavoriteStore } from "../store/favoriteStore";

interface CryptoCardProps {
  crypto: Cryptocurrency;
  price: number;
}

function CryptoCard({ crypto, price }: CryptoCardProps) {
  const isFavorite = useFavoriteStore((state) =>
    state.favoriteIds.includes(crypto.id)
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <article className="crypto-card">
      <h2>{crypto.name}</h2>
      <p>{crypto.symbol.toUpperCase()}</p>

      <p className="crypto-price">{formattedPrice}</p>

      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(crypto.id)}
      >
        {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      </button>

      <Link to={`/criptomonedas/${crypto.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}

export default CryptoCard;
