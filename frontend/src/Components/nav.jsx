import "./nav.css"
import { useRecoilState } from "recoil";
import { pageState } from "../../state";

export default function Navbar() {
    const [page,setPage] = useRecoilState(pageState)
    return(
        <>
        <div className="navbar">
            <div className="logo">
                <h1>BudgetBuddy</h1>
            </div>
            <div >
              <ul>
            <li  onClick={()=>setPage("home")}>
            Home
        </li>
        <li 
         onClick={()=>setPage("expenses")}>
            Expenses
        </li>
        <li
        onClick={()=>setPage("reports")}>
            Reports
        </li>
        <li>
            Settings
        </li>
      </ul>
            </div>
            <div className="logout_btn">
                <button>
                    Log out
                </button>
            </div>
        </div>
        </>
    );
}


