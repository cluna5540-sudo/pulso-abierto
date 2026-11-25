import type { CryptoPriceResponse } from "../types/crypto";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

export async function getCryptoPrices(): Promise<CryptoPriceResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los precios de las criptomonedas.");
  }

  const data: CryptoPriceResponse = await response.json();

  return data;
}