import React, { useState, useRef } from "react";
import { IStock } from "../../types/types";

import s from "../Main/main.module.scss";

import "./admin.scss";

import staticPhoto from "../../assets/icons/staticIcon.svg";
import { Dropdown } from "../Dropdown/Dropdown";

interface IProps {
    stocksArray: IStock[];
    setStocksArray: (el: IStock[]) => void;
    el: IStock;
}

export const AdminItem: React.FC<IProps> = ({
    setStocksArray,
    stocksArray,
    el,
}) => {
    const optionsTypesWallets = ["$", "P"];
    const [typeWallet, setTypeWallet] = useState<string>(el.wallet);
    const optionsTypeStock = ["Российская", "Иностранная"];
    const [typeStock, setTypeStock] = useState<string>(el.typeStock);
    
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChangeTitle = (id: number, value: string) => {
        setStocksArray(
            stocksArray.map((elem: IStock) => 
                elem.id === id ? { ...el, title: value } : elem
            )
        );
    };
    const handleChangePrice = (id: number, value: string) => {
        if (+value > 0) {
            setStocksArray(
                stocksArray.map((elem: IStock) =>
                    elem.id === id ? { ...el, price: +value } : elem
                )
            );
        }
    };
    const handleChangeProfit = (id: number, value: string) => {
        if (+value > 0) {
            setStocksArray(
                stocksArray.map((elem: IStock) =>
                    elem.id === id ? { ...el, profitability: +value } : elem
                )
            );
        }
    };
    const handleChangeTypeStock = (option: "Российская" | "Иностранная" ) => {
        setTypeStock(option);
        setStocksArray(
            stocksArray.map((elem: IStock) =>
                elem.id === el.id ? { ...el, typeStock: option } : elem
            )
        );
    };
    const handleChangeTypeWallet = (option: "$" | "P") => {
        setTypeWallet(option)
        setStocksArray(
            stocksArray.map((elem: IStock) =>
                elem.id === el.id ? { ...el, wallet: option } : elem
            )
        );
        
    };


    const handleBtnFile = (e: React.ChangeEvent<HTMLInputElement>) => {
            if(e?.target.files) {
                const reader = new FileReader()
                reader.onloadend = () => {                    
                    setStocksArray(
                        stocksArray.map((elem: IStock) => 
                            elem.id === el.id ? { ...el, logo: reader.result } : elem 
                        )
                    );
                }
                reader.readAsDataURL(e.target.files[0])

            }
            
    }

    return (
        <div className={s.StockItemFirstBlock}>
            <div className={s.StockItemLogo}>                
                <img src={el.logo ? el.logo : staticPhoto} alt="staticPhoto" />
                <label className="dropArea__right">
                        Изменить Лого
                        <input ref={inputRef} onChange={handleBtnFile} type="file" style={{ display: 'none' }} />
                </label>
            </div>
            <div className={s.StockItemInfo}>
                <div className={`${s.StockItemInfoTitle} df`}>
                    <div className="m20">Название:</div>
                    <input
                        type="text"
                        className="input"
                        value={el.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeTitle(el.id, e.target.value)
                        }
                    />
                </div>
                <div className={`${s.StockItemInfoTitle} df`}>
                    <div className="m20">Тип акции:</div>
                    <Dropdown
                        options={optionsTypeStock}
                        selected={typeStock}
                        setSelected={handleChangeTypeStock}
                    />
                </div>
                <div className={`${s.StockItemPriceAdmin} df`}>
                    <div className="m20"> Цена:</div>
                    <input
                        type="number"
                        className="input"
                        value={el.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangePrice(el.id, e.target.value)
                        }
                    />
                </div>
                <div className={`${s.StockItemPriceAdmin} df`}>
                    <div className="m20">Валюта:</div>
                    <Dropdown
                        options={optionsTypesWallets}
                        selected={typeWallet}
                        setSelected={handleChangeTypeWallet}
                    />
                </div>
                <div className={`${s.StockItemProfitabilityAdmin} df`}>
                    <div className="m20">Доходность:</div>
                    <input
                        type="number"
                        className="input"
                        value={el.profitability}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeProfit(el.id, e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
