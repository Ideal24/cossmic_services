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
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
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
    <div className="w-screen h-screen bg-gradient-to-b from-[#00416A] to-[#0f9b8e] flex flex-col items-center justify-center text-white">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl w-full ">
        {/* Left - Shorten URL Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-gray-200 text-gray-800">
          {/* Title */}

          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            🌐 Employee name
          </h2>
          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            🌐 URL shortener and QR generator
          </h2>

          <input
            type="text"
            placeholder="Enter long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Customize */}
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            ⚙️ Customize your link
          </h3>

          <div className="flex gap-2 mb-6">
            <select className="border border-gray-300 rounded-md p-3 w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>cossmic.com</option>
              <option>tiny.one</option>
              <option>short.ly</option>
            </select>
        </div>
            <button
              onClick={handleSubmit}
              className="bg-[#2d8659] hover:bg-[#23794d] text-white font-medium py-3 rounded-md w-full transition-all"
            >
              Generate QR
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              By clicking Generate QR, I agree to the{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {qrData && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p>
                Tiny URL:{" "}
                <a
                  href={qrData?.tiny_url}
                  target="_blank"
                  className="underline"
                >
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

          {/* Right - Info Section */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              The Original URL Shortener
            </h1>
            <p className="text-lg mb-6 leading-relaxed text-gray-100">
              Create shorter URLs with COSSMIC_SERVICES. Track analytics, use
              branded domains, and manage links with premium plans.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
              <button className="bg-transparent border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[#00416A] transition-all">
                View Plans
              </button>
              <button className="bg-white text-[#00416A] px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                Create Free Account
              </button>
            </div>

            <ul className="space-y-2 text-sm text-gray-100">
              <li>✅ Detailed Link Analytics</li>
              <li>✅ Fully Branded Domains</li>
              <li>✅ Bulk Short URLs</li>
              <li>✅ Link Management Features</li>
            </ul>
          </div>
        

      </div>
        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} COSSMIC_SERVICES | Terms • Privacy Policy
        </footer>
    </div>
  );
};

export default QRGenerator;
