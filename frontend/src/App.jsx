import { BrowserRouter, Routes, Route } from "react-router-dom";
import {RecoilRoot} from "recoil"
import Navbar from "./Components/nav";
import Landing from "./modal/Landing";
import Home from "./Pages/home";
import Expenses from "./Pages/expenses";
import Reports from "./Pages/reports";



export default function App() {
  return (
    <>
    <RecoilRoot>
      <Navbar/>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  );
}