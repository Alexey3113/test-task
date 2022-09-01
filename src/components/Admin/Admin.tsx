import React, { useState, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { IStock } from "../../types/types";

import s from "../Main/main.module.scss";

import "./admin.scss";

import staticPhoto from "../../assets/icons/staticIcon.svg";
import { Dropdown } from "../Dropdown/Dropdown";
import { AdminItem } from "./AdminItem";
import { actionsStocks } from "../../redux/reducers/stocksSlice";

export const Admin: React.FC = () => {
    const { stocks } = useAppSelector((state: RootState) => state.stocks);

    const [stocksArray, setStocksArray] = useState<IStock[]>([]);
    const dispatch = useAppDispatch()

    const saveChanges = () => {
        dispatch(actionsStocks.changeStock(stocksArray))
    }

    useEffect(() => {
        setStocksArray(stocks)
      }, [])
      

    return (
        <div className={s.Stocks}>
            <div className="btn" onClick={saveChanges}>Сохранить все изменения</div>
            {stocksArray && stocksArray.map((el: IStock) => (
                <div key={el.id} className={s.StockItem}>
                    <AdminItem stocksArray={stocksArray} setStocksArray={setStocksArray} el={el} />
                </div>
            ))}
        </div>
    );
};
