import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./component/Footer/Footer";
import { Header } from "./component/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import "./App.css";
import "./bootstrap.min.css";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
