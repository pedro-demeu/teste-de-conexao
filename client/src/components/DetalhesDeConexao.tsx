import convertBytesToMbps from "../utils/convertBytesToMbps";

interface DetalhesDeConexaoProps {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  isp: string;
  serverName: string;
  serverLocation: string;
  resultUrl: string;
}
export default function DetalhesDeConexao({
  downloadSpeed,
  isp,
  ping,
  resultUrl,
  serverLocation,
  serverName,
  uploadSpeed,
}: DetalhesDeConexaoProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-semibold">Velocidade de Download:</td>
            <td className="py-2 px-4">
              {downloadSpeed !== 0
                ? `${convertBytesToMbps(downloadSpeed)} Mbps`
                : "-"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">Velocidade de Upload:</td>
            <td className="py-2 px-4">
              {uploadSpeed !== 0
                ? `${convertBytesToMbps(uploadSpeed)} Mbps`
                : "-"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">Ping:</td>
            <td className="py-2 px-4">
              {ping !== 0 ? `${Math.round(ping)} ms` : "-"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">Provedor de Internet:</td>
            <td className="py-2 px-4">{isp || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">Nome do Servidor:</td>
            <td className="py-2 px-4">{serverName || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">
              Localização do servidor:
            </td>
            <td className="py-2 px-4">{serverLocation || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-semibold">Resultado do Teste:</td>
            <td className="py-2 px-4">
              {resultUrl ? (
                <a
                  href={resultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Ver Resultado
                </a>
              ) : (
                "-"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
