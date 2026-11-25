import CryptoList from "../components/CryptoList";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Cryptocurrency, CryptoPriceResponse, RequestStatus } from "../types/crypto";
import { getCryptoPrices } from "../services/cryptoService";
import SearchForm from "../components/SearchForm";
import StatusMessage from "../components/StatusMessage";
import { useFavoriteStore } from "../store/favoriteStore";
import type { CryptoFilter } from "../types/crypto";
const cryptocurrencies: Cryptocurrency[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
  { id: "ethereum", name: "Ethereum", symbol: "eth" },
  { id: "solana", name: "Solana", symbol: "sol" },
];

function HomePage() {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  
  const [prices, setPrices] = useState<CryptoPriceResponse>({});
  const [status, setStatus] = useState<RequestStatus>("initial");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CryptoFilter>("all");

  const loadPrices = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const data = await getCryptoPrices();
      setPrices(data);
      setStatus(Object.keys(data).length > 0 ? "success" : "empty");
    } catch {
      setError("No pudimos obtener las cotizaciones. Revisá tu conexión e intentá nuevamente.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadPrices();
  }, [loadPrices]);

  function handleSearch(searchQuery: string, cryptoFilter: CryptoFilter) {
    setQuery(searchQuery);
    setFilter(cryptoFilter);
  }



  const visibleCryptos = useMemo(() => {
    return cryptocurrencies.filter((crypto) => {
      const matchesQuery =
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
  filter === "all" ||
  filter === "favorites" ||
  crypto.id === filter;

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

const availableCryptos = visibleCryptos.filter((crypto) => {
  const hasValidPrice =
    typeof prices[crypto.id]?.usd === "number";

  const matchesFavoriteFilter =
    filter !== "favorites" || favoriteIds.includes(crypto.id);

  return hasValidPrice && matchesFavoriteFilter;
});
  const resultCount = availableCryptos.length;

  return (
    <main className="container">
      <header className="page-header">
        <h1>Pulso Abierto</h1>
        <p>Consultá las cotizaciones de las principales criptomonedas.</p>
      </header>

      <SearchForm onSearch={handleSearch} />

      <section aria-labelledby="results-title">
        <h2 id="results-title">Cotizaciones en tiempo real</h2>

        <StatusMessage
          status={status === "success" && resultCount === 0 ? "empty" : status}
          message={error}
          onRetry={loadPrices}
        />

        {status === "success" && resultCount > 0 && (
          <>
            <p aria-live="polite">
              Resultados encontrados: {resultCount}
            </p>

            <CryptoList
  cryptos={availableCryptos}
  prices={prices}
/>
          </>
        )}
      </section>
    </main>
  );
}

export default HomePage;
