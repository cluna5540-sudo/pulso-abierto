
import type {
  Cryptocurrency,
  CryptoPriceResponse,
} from "../types/crypto";
import CryptoCard from "./CryptoCard";

interface CryptoListProps {
  cryptos: Cryptocurrency[];
  prices: CryptoPriceResponse;
}

function CryptoList({ cryptos, prices }: CryptoListProps) {
  return (
    <div className="crypto-list">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          price={prices[crypto.id].usd}
        />
      ))}
    </div>
  );
}

export default CryptoList;
