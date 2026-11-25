
import type { RequestStatus } from "../types/crypto";

interface StatusMessageProps {
  status: RequestStatus;
  message?: string;
  onRetry: () => void;
}

function StatusMessage({
  status,
  message,
  onRetry,
}: StatusMessageProps) {
  if (status === "initial") {
    return <p>Ingresá una búsqueda para consultar las criptomonedas.</p>;
  }

  if (status === "loading") {
    return <p role="status">Cargando cotizaciones...</p>;
  }

  if (status === "empty") {
    return <p role="status">No se encontraron resultados.</p>;
  }

  if (status === "error") {
    return (
      <div role="alert">
        <p>{message ?? "Ocurrió un error al consultar los precios."}</p>
        <button type="button" onClick={onRetry}>
          Volver a intentar
        </button>
      </div>
    );
  }

  return null;
}

export default StatusMessage;
