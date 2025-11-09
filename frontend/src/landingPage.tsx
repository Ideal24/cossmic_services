
const HeroSection = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-[#00416A] to-[#0f9b8e] flex flex-col items-center justify-center text-white">
    <div className="w-screen h-screen bg-gradient-to-b from-[#00416A] to-[#0f9b8e] flex flex-col items-center justify-center text-white">

      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl w-full ">
        
        {/* Left - Shorten URL Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-gray-200 text-gray-800">
          {/* Title */}
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            🌐 Shorten a long URL
          </h2>

          {/* Long URL Input */}
          <input
            type="text"
            placeholder="Enter long link here"
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
            <input
              type="text"
              placeholder="Enter alias"
              className="border border-gray-300 rounded-md p-3 w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button className="bg-[#2d8659] hover:bg-[#23794d] text-white font-medium py-3 rounded-md w-full transition-all">
            Shorten URL
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            By clicking Shorten URL, I agree to the{" "}
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

        {/* Right - Info Section */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            The Original URL Shortener
          </h1>
          <p className="text-lg mb-6 leading-relaxed text-gray-100">
            Create shorter URLs with COSSMIC_SERVICES. Track analytics, use branded
            domains, and manage links with premium plans.
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
        © {new Date().getFullYear()} COSSMIC_SERVICES  | Terms • Privacy Policy
      </footer>
    </div>
  );
};

export default HeroSection;
