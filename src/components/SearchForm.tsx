
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import type { CryptoFilter } from "../types/crypto";

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, "Ingresá al menos 2 caracteres."),
    crypto: z.enum(["all", "favorites", "bitcoin", "ethereum", "solana"], {
    error: "Seleccioná una opción válida.",
  }),
});


interface SearchFormProps {
  onSearch: (query: string, crypto: CryptoFilter) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [crypto, setCrypto] = useState<CryptoFilter>("all");
  const [errors, setErrors] = useState<{
    query?: string;
    crypto?: string;
  }>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = searchSchema.safeParse({ query, crypto });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        query: fieldErrors.query?.[0],
        crypto: fieldErrors.crypto?.[0],
      });

      return;
    }

    setErrors({});
    onSearch(result.data.query, result.data.crypto);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="crypto-search">Buscar criptomoneda</label>
        <input
          id="crypto-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ejemplo: Bitcoin"
          aria-invalid={Boolean(errors.query)}
          aria-describedby={errors.query ? "query-error" : undefined}
        />
        {errors.query && (
          <p id="query-error" role="alert">{errors.query}</p>
        )}
      </div>

      <div>
        <label htmlFor="crypto-filter">Filtrar por criptomoneda</label>
        <select
          id="crypto-filter"
          value={crypto}
          onChange={(event) => setCrypto(event.target.value as CryptoFilter)}
          aria-invalid={Boolean(errors.crypto)}
          aria-describedby={errors.crypto ? "crypto-error" : undefined}
        >
          <option value="all">Todas</option>
          <option value="favorites">Favoritos</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>
        {errors.crypto && (
          <p id="crypto-error" role="alert">{errors.crypto}</p>
        )}
      </div>

      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;
