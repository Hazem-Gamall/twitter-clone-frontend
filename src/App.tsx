import { useContext } from "react";
import "./App.css";
import { Main } from "./components/Main";
import AuthContext from "./context/AuthProvider";
import { AnonHome } from "./pages/AnonHome";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<AnonHome />} />
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Main />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
