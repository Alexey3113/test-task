import React from "react"
type TypeStock = "Российская" | "Иностранная"
type TypeWallet = "$" | "P"


export interface IStock {
    id: number,
    title: string,
    logo: any,
    profitability: number,
    wallet: TypeWallet,
    price: number,
    typeStock: TypeStock
}