import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../state'
import Home from '../Pages/home'
import Expenses from '../Pages/expenses'
import Reports from '../Pages/reports'


const Landing = () => {
    const [page] =  useRecoilState(pageState)
    if(page === "home") return <Home />
    if(page === "Expenses") return <Expenses />
    if(page === "Reports") return <Reports/>
  return (
    <Home />
  )
}

export default Landing;