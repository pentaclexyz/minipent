import React, {useEffect} from "react";
import {themeChange} from 'theme-change'
import Nav from "./nav";
import Footer from "./footer";

const Layout = ({children}) => {
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    return (
        <>
            <Nav/>
            <main className="mx-auto max-w-7xl p-4 md:px-6 lg:px-8">
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;
