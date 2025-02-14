import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import AuthPage from "./pages/authPage"
import { selectUserToken } from "./redux/user/user.selector";
import Post from "./pages/PostPage";
import Main from "./components/Main";


const App = () => {
  const token = useSelector(selectUserToken);
return (
    <>
      <Routes>
        <Route path="/" element={!token? <Home /> : <Post />}>
          <Route index element={<Main />} />
        {/* <Route path="my-posts" element={<MyPosts />} /> */}
        </Route>
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App