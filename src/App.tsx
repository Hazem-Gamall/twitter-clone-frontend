import { useContext } from "react";
import "./App.css";
import { Main } from "./pages/Main";
import AuthContext from "./context/AuthProvider";
import { AnonHome } from "./pages/AnonHome";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Messages } from "./components/Messages";

function App() {
  useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<AnonHome />} />
        <Route element={<RequireAuth />}>
          <Route path="/messages/*" element={<Messages />} />
          <Route path="/*" element={<Main />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
