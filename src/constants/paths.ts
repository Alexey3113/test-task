import React from "react"
import { Main } from './../components/Main/Main';
import MainPage from "../pages/main";

export const MAIN_ROUTE = '/'

interface Paths {
    path: string,
    element: React.ReactNode
}

// export const paths: Paths[] =[
//     {
//         element: <MainPage />,
//         path: "Test"
//     }
// ]