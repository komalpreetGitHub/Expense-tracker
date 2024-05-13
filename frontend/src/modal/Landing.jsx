

import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../state'
import Home from '../Pages/home'
import Reports from '../Pages/reports'
import Expenses from '../Pages/expenseform'
import Navbar from '../Components/nav'


const Landing = () => {
    const [page] =  useRecoilState(pageState)
    if(page === "Home") return (<><Navbar /> <Home /> </>)
    if(page === "Expenses") return ( <><Navbar /> <Expenses/> </> )
    if(page === "Reports") return ( <> <Navbar /> <Reports/> </>)
  return (
    <>
    <Navbar/>
    <Home />
    </>
  )
}

export default Landing