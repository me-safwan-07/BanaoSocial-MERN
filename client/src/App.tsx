import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AuthPage from "./pages/authPage"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App