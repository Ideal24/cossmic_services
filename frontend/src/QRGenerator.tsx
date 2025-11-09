import { useState } from "react";

interface QRResponse {
  tiny_url: string;
  qr_code: string;
  file_name: string;
}

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [employee, setEmployee] = useState("");
  const [qrData, setQrData] = useState<QRResponse | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/shorten", {
        method: "POST",
        headers: {"accept":"application/json","Content-Type": "application/json" },
        body: JSON.stringify({ employee_name: employee, target_url: url }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setQrData(data);
    } catch (err) {
      console.error("Error fetching QR:", err);
    }
  };

  const downloadQR = () => {
    if (!qrData) return;
    const link = document.createElement("a");
    link.href = qrData.qr_code;
    link.download = qrData.file_name || "qr_code.png";
    link.click();
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate QR
      </button>

      {qrData && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p>
            Tiny URL:{" "}
            <a href={qrData?.tiny_url} target="_blank" className="underline">
              {qrData?.tiny_url}
            </a>
          </p>
          <img
            src={qrData.qr_code}
            alt="QR Code"
            className="w-48 h-48 border p-2"
          />
          <button
            onClick={downloadQR}
            className="bg-red-600 text-white px-4 py-2 rounded mt-2"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
