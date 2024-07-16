import { ReactNode, useState } from "react";
import DetalhesDeConexao from "./components/DetalhesDeConexao";

function App() {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [isp, setIsp] = useState("");
  const [serverName, setServerName] = useState("");
  const [serverLocation, setServerLocation] = useState("");
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
      setServerLocation(data.server.location);
      setResultUrl(data.result.url);
    } catch (error) {
      console.error("Speed test error:", error);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setPing(0);
      setIsp("");
      setServerName("");
      setServerLocation("");
      setResultUrl("");
    } finally {
      setTesting(false);
    }
  };

  const handleCleanState = () => {
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setIsp("");
    setServerName("");
    setServerLocation("");
    setResultUrl("");
  };
  return (
    <Container>
      <Card>
        <Title
          text={downloadSpeed ? "Resultado" : "Teste de Velocidade de Internet"}
        />
        <DetalhesDeConexao
          {...{
            downloadSpeed,
            isp,
            ping,
            resultUrl,
            serverLocation,
            serverName,
            uploadSpeed,
          }}
        />
        <TestButton loading={testing} onClick={handleTest} />
        {!!downloadSpeed && (
          <CleanStateButton loading={testing} onClick={handleCleanState} />
        )}
      </Card>
    </Container>
  );
}

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white w-screen flex items-center justify-center">
      {children}
    </div>
  );
};
const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-lg mx-auto bg-gray-800 shadow-lg rounded-lg p-8 space-y-4">
      {children}
    </div>
  );
};
const Title = ({ text }: { text: string }) => {
  return <h1 className="text-2xl font-bold text-center mb-10">{text}</h1>;
};
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
const TestButton = ({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`w-full bg-emerald-600 text-white text-center text-sm uppercase border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-emerald-600 ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-emerald-700 hover:border-emerald-600 active:border-emerald-600 hover:outline-emerald-900"
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <div className="flex justify-center items-center">
        {loading && <Loading />}
        {loading ? "" : "Testar"}
      </div>
    </button>
  );
};
const CleanStateButton = ({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`w-full bg-sky-600 text-white text-sm uppercase border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-sky-600 ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-sky-700 hover:border-sky-600 active:border-sky-600"
      }`}
      onClick={onClick}
      disabled={loading}
    >
      Limpar resultado
    </button>
  );
};
export default App;
