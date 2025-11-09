import "./App.css";
import HeroSection from "./landingPage";
import QRGenerator from "./QRGenerator";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00416A] to-[#0f9b8e] p-4">
        <HeroSection />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00416A] to-[#0f9b8e] p-4">
        <QRGenerator />
      </div>
    </>
  );
}

export default App;
