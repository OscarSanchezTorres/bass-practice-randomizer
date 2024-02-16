import { Route, Routes, Navigate } from "react-router-dom";
//import "./App.css";
import About from "./pages/about";
import User from "./pages/user";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import Projects from "./pages/createProject"
import { Navigation } from "./components";
import AuthContext from "./context/auth";

function App() {
  const AuthenticatedRoutes = () => {
    return (
      <>
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  };

  const UnauthenticatedRoutes = () => {
    return (
      <>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/signIn" />} />
      </>
    );
  };
  //test navigation
  const { state } = AuthContext.useLogin();
  const authenticated = state.accessToken && true;

  console.log(`authContext: ${JSON.stringify(state)}`);
  console.log(`authenticated: ${authenticated}`);

  return (
    <>
      {authenticated && <Navigation />}
      <Routes>
        {authenticated ? AuthenticatedRoutes() : UnauthenticatedRoutes()}
      </Routes>
    </>
  );
}

export default App;
