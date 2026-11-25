
import { describe, it, expect, vi, afterEach } from "vitest";
import { getCryptoPrices } from "../services/cryptoService";

describe("getCryptoPrices", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("devuelve los precios cuando la API responde correctamente", async () => {
    const mockPrices = {
      bitcoin: { usd: 60000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockPrices),
      }),
    );

    const result = await getCryptoPrices();

    expect(result).toEqual(mockPrices);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("lanza un error cuando la API responde con un fallo", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(getCryptoPrices()).rejects.toThrow(
      "No se pudieron obtener los precios de las criptomonedas.",
    );
  });
});
