export default function convertBytesToMbps(bytes: number) {
  const mbps = (bytes * 8) / 1000000; // Convert bytes to bits, then to Mbps
  return mbps.toFixed(2);
}
