import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import AuthPage from "./pages/authPage"
import { selectUserToken } from "./redux/user/user.selector";


const App = () => {
  const token = useSelector(selectUserToken);
return (
    <>
      <Routes>
        <Route path="/" element={!token? <Home /> :<div>No post found</div>} />
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App