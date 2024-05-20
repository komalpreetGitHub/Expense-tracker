import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil"
import Navbar from "./Components/nav";
import Landing from "./modal/Landing";
// import Home from "./Pages/home";
// import Expenses from "./Pages/expenses";
// import Reports from "./Pages/reports";
import Signup from "./Pages/signup";
import Signin from "./Pages/signin";
import Email from "./Forgot/email";
import Otp from "./Forgot/otp";
import Resetpass from "./Forgot/resetpass";
// import Home from "./Pages/home";



export default function App() {
  return (
    <>
      <RecoilRoot>
       
        <BrowserRouter>
        {/* <Navbar /> */}
          <Routes>
            <Route path="/landing" element={<Landing />}></Route>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Signin />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/otp" element={<Otp />}></Route>
            <Route path="/resetpass" element={<Resetpass />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}