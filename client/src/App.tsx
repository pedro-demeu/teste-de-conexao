import { useState } from "react";

function App() {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [isp, setIsp] = useState("");
  const [serverName, setServerName] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);

    try {
      const response = await fetch("http://localhost:3000/teste-de-conexao");
      if (!response.ok) {
        throw new Error("Failed to fetch speed test.");
      }

      const data = await response.json();
      setDownloadSpeed(data.download.bandwidth);
      setUploadSpeed(data.upload.bandwidth);
      setPing(data.ping.latency);
      setIsp(data.isp);
      setServerName(data.server.name);
      setServerAddress(data.server.location);
      setResultUrl(data.result.url);
    } catch (error) {
      console.error("Speed test error:", error);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setPing(0);
      setIsp("");
      setServerName("");
      setServerAddress("");
      setResultUrl("");
    } finally {
      setTesting(false);
    }
  };

  const convertBytesToMbps = (bytes: number) => {
    const mbps = (bytes * 8) / 1000000; // Convert bytes to bits, then to Mbps
    return mbps.toFixed(2);
  };

  const handleTestAgain = () => {
    // Limpar os estados para realizar um novo teste
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setIsp("");
    setServerName("");
    setServerAddress("");
    setResultUrl("");

    // Chamar a função de teste novamente
    handleTest();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white w-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto bg-gray-800 shadow-lg rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-10">
          {downloadSpeed ? "Resultado" : "Teste de Velocidade de Internet"}
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="py-2 px-4 font-semibold">
                  Velocidade de Download:
                </td>
                <td className="py-2 px-4">
                  {downloadSpeed !== 0
                    ? `${convertBytesToMbps(downloadSpeed)} Mbps`
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold">
                  Velocidade de Upload:
                </td>
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
                <td className="py-2 px-4 font-semibold">
                  Provedor de Internet:
                </td>
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
                <td className="py-2 px-4">{serverAddress || "-"}</td>
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
        <button
          className={`w-full bg-emerald-600 text-white text-center text-sm uppercase border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-emerald-600 ${
            testing
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-emerald-700 hover:border-emerald-600 active:border-emerald-600 hover:outline-emerald-900"
          }`}
          onClick={handleTestAgain}
          disabled={testing}
        >
          <div className="flex justify-center items-center">
            {testing && <Loading />}
            {testing ? "" : "Testar"}
          </div>
        </button>

        {!!downloadSpeed && (
          <button
            className={`w-full bg-sky-600 text-white text-sm uppercase border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-sky-600 ${
              testing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-700 hover:border-sky-600 active:border-sky-600"
            }`}
            onClick={() => {
              setDownloadSpeed(0);
              setUploadSpeed(0);
              setPing(0);
              setIsp("");
              setServerName("");
              setServerAddress("");
              setResultUrl("");
            }}
            disabled={testing}
          >
            Limpar resultado
          </button>
        )}
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 "
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
export default App;
