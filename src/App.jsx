import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/auth/*' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
