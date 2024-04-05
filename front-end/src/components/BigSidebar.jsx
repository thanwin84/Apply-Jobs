import React, { useEffect } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import {NavLinks, Logo} from '../components'

export default function BigSidebar({className}){
    const {showSidebar, toggleSidebar} = useDashboardContext()

    useEffect(()=>{
        // It sets showSidebar to true, cause in big side bar we wanna show this by default
        toggleSidebar()
    }, [])

    return (
        <div className="">
        {showSidebar && <SideBar className={className}/> }
        </div>
    )
}

function SideBar({className}){
    return (
        <section className={`p-4 border-r h-screen  ${className}`}>
            <Logo className="w-52 pb-14 pt-4" />
            <NavLinks className="" />
        </section>
    )
}