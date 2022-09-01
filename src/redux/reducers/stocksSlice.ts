import { ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStock } from "../../types/types";


interface IInitState {
    stocks: IStock[]
}

const initialState: IInitState = {
    stocks: [
        {
            id: 1,
            logo: "",
            price: 3600,
            profitability: 3500,
            title: "ABb Space Intertament",
            typeStock: "Российская",
            wallet: "P"
        },
        {
            id: 2,
            logo: "",
            price: 2500,
            profitability: 3300,
            title: "Web Space Intertament",
            typeStock: "Иностранная",
            wallet: "$"
        },
        {
            id: 3,
            logo: "",
            price: 3200,
            profitability: 3520,
            title: "Web Space AU Intertament",
            typeStock: "Российская",
            wallet: "$"
        },
        {
            id: 4,
            logo: "",
            price: 503,
            profitability: 3400,
            title: "AZb Space ZU Intertament",
            typeStock: "Иностранная",
            wallet: "$"
        },
        {
            id: 5,
            logo: "",
            price: 5700,
            profitability: 2900,
            title: "AZb Space BBU Intertament",
            typeStock: "Иностранная",
            wallet: "$"
        },
        {
            id: 6,
            logo: "",
            price: 5403,
            profitability: 2000,
            title: "International Space Intertament",
            typeStock: "Российская",
            wallet: "P"
        },
        {
            id: 7,
            logo: "",
            price: 896,
            profitability: 200,
            title: "BBBB Space Intertament",
            typeStock: "Российская",
            wallet: "P"
        },
        {
            id: 8,
            logo: "",
            price: 965,
            profitability: 6700,
            title: "Lokk Space Intertament",
            typeStock: "Иностранная",
            wallet: "$"
        },
        {
            id: 9,
            logo: "",
            price: 703,
            profitability: 1200,
            title: "Calender Force",
            typeStock: "Иностранная",
            wallet: "$"
        },
        {
            id: 10,
            logo: "",
            price: 1103,
            profitability: 500,
            title: "Departament AU",
            typeStock: "Российская",
            wallet: "$"
        },
    ]
}

interface IPayloadChangeStock {
    type: string,
    payload: IStock[]
}

export const stocksSlice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
        changeStock(state: IInitState, action: IPayloadChangeStock) {
            state.stocks = action.payload
            alert("Успешно применины изменения")
        }
    }
})

export const actionsStocks = stocksSlice.actions

export default stocksSlice.reducer
