import { useContext } from "react";
import "./App.css";
import { Main } from "./components/Main";
import AuthContext from "./context/AuthProvider";
import { AnonHome } from "./components/AnonHome";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<AnonHome />} />
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </>
  );
}

export default App;
