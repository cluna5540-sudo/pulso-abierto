export type CryptoId = "bitcoin" | "ethereum" | "solana";

export type Currency = "usd" | "ars" | "eur";

export interface Cryptocurrency {
  id: CryptoId;
  name: string;
  symbol: string;
}

export interface CryptoPrice {
  [currency: string]: number;
}

export interface CryptoPriceResponse {
  [cryptoId: string]: CryptoPrice;
}

export type RequestStatus =
  | "initial"
  | "loading"
  | "success"
  | "empty"
  | "error";
  export type CryptoFilter = "all" | "favorites" | CryptoId;