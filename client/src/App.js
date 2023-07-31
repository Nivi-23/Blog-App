import React, { useContext } from 'react'

import './App.css';
import { AuthContext, ContextProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider, Outlet, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import WritePost from './pages/WritePost';
import Profile from './pages/Profile';

const Layout = () => {
  return (<>
    <NavBar />
    <Outlet />
    {/* <Footer /> */}
  </>)
}

const router = (user) => createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<SinglePost />} />
        <Route path="/writePost" element={user ? <WritePost /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />

      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
    </>
  )
);

function App() {
  const { user } = useContext(AuthContext)

  return (
    <ContextProvider>
      <RouterProvider router={router(user)} />
    </ContextProvider>

  );
}

export default App;
