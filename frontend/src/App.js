import { Footer } from "./component/Footer/Footer";
import { Header } from "./component/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";

import "./App.css";
import "./bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
