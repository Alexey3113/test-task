import React, { useState, useEffect } from "react";
import { RootState, useAppSelector } from "../../redux/store";
import { IStock } from "../../types/types";
import s from "./main.module.scss";

import staticPhoto from "../../assets/icons/staticIcon.svg";
import { Dropdown } from "../Dropdown/Dropdown";

export const Main: React.FC = () => {
    const { stocks } = useAppSelector((state: RootState) => state.stocks);

    const [stocksArray, setStocksArray] = useState<IStock[]>([]);
    const [checkUp, setCheckUp] = useState<boolean>(false)
    const [checkDown, setCheckDown] = useState<boolean>(true)
    const [priceFrom, setPriceFrom] = useState<number>(0)
    const [priceTo, setPriceTo] = useState<number>(6000)

    const optionsFields = [
        "Название",
        "Доходность",
        "Валюта",
        "Цена",
        "Тип акций",
    ];
    const [byField, setByField] = useState("");
    const optionsTypesWallets = ["$", "P"];
    const [typeWallet, setTypeWallet] = useState<string>("");
    const optionsTypeStock = ["Российская", "Иностранная"];
    const [typeStock, setTypeStock] = useState<string>("");
    const [needSort, setNeedSort] = useState<boolean>(false)

    const objFields = {
        "Название": "title",
        "Доходность": "profitability",
        "Валюта": "wallet",
        "Цена": "price",
        "Тип акций": "typeStock",
    };

    const sortArrayByTypeField = (
        option: "Название" | "Доходность" | "Валюта" | "Цена" | "Тип акций"
    ) => {
        setByField(option);
        const arr = [...stocksArray];
        const typeSort: string = objFields[option];
        if(checkDown === true){
            arr.sort((prev: any, next: any) => prev[typeSort] < next[typeSort] ? 1 : -1)
        } else {
            arr.sort((prev: any, next: any) => prev[typeSort] > next[typeSort] ? 1 : -1)
        }
        setStocksArray(arr)
    };

    const filterByTypeWallet = (option: "$" | "P", arr?: IStock[]) => {
        setTypeWallet(option);
        filterArray(stocks, typeStock, priceFrom, priceTo, option)
    };
    const filterByTypeStock = (option: "Российская" | "Иностранная", newArr?: IStock[]) => {
        setTypeStock(option);
        filterArray(stocks, option, priceFrom, priceTo, typeWallet)
    };

    const handleChangeCheck = () => {
        if(byField){
            setStocksArray(stocksArray.reverse())
        }
        setCheckDown(prev => !prev)
        setCheckUp(prev => !prev)
    }

    const clearFilters = () => {
        setByField("")
        setStocksArray(stocks)
        setTypeStock("")
        setTypeWallet("")
        setCheckDown(true)
        setCheckUp(false)
        setPriceTo(6000)
        setPriceFrom(0)
    }

    const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)

        if(value >= 0){
            setPriceFrom(value)
            filterArray(stocks, typeStock, value, priceTo, typeWallet)
        }
    }

    const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)

        if(value >= 0){
            setPriceTo(value)
            filterArray(stocks, typeStock, priceFrom, value, typeWallet)

        }
    }

    const filterArray = (arr: IStock[], typeSt: string, priceFr: number, priceT: number, typeW: string) => {
        arr = arr.filter((el: IStock) => {
            return (typeW ? (el.wallet === typeW ? true : false ) : true) && (typeSt ? (el.typeStock === typeSt ? true : false ) : true) && (el.price >= priceFr && el.price <= priceT) 
        })
        setStocksArray(arr)
        setNeedSort(!needSort)
    }

    useEffect(() => {
        setStocksArray(stocks);
    }, []);

    useEffect(() => {
        if(byField === "Название" || byField === "Доходность" || byField ===  "Валюта" || byField ===  "Цена" || byField ===  "Тип акций"){
            sortArrayByTypeField(byField)
        }
    }, [needSort]);

    return (
        <>
            <div className={s.Sort}>
                <div className={s.SortTitle}>Сортировка по:</div>
                <div>
                    <Dropdown
                        options={optionsFields}
                        selected={byField}
                        setSelected={sortArrayByTypeField}
                    />
                    <section>
                        По возрастанию: <input type="checkbox" checked={checkUp} onChange={handleChangeCheck} />
                        По убыванию: <input type="checkbox" checked={checkDown} onChange={handleChangeCheck} />
                    </section>
                </div>
            </div>
            <div className={s.Filter}>
                <div className={s.FilterTitle}>Фильтрация по:</div>
                <div>
                    Валюта
                    <Dropdown
                        options={optionsTypesWallets}
                        selected={typeWallet}
                        setSelected={filterByTypeWallet}
                    />
                </div>
                <div>
                    Тип акции
                    <Dropdown
                        options={optionsTypeStock}
                        selected={typeStock}
                        setSelected={filterByTypeStock}
                    />
                </div>
                <div>
                    Цена
                    от <input type="number" value={priceFrom} onChange={handleChangePriceFrom} /> 
                    до <input type="number" value={priceTo} onChange={handleChangePriceTo} />
                </div>
            </div>
            <div className="btn filter" onClick={clearFilters}>
                Очистить все фильтры
            </div>
            <div className={s.Stocks}>
                {stocksArray.map((el: IStock) => (
                    <div key={el.id} className={s.StockItem}>
                        <div className={s.StockItemFirstBlock}>
                            <div className={s.StockItemLogo}>
                                <img src={el.logo ? el.logo : staticPhoto} alt="staticPhoto" />
                            </div>
                            <div className={s.StockItemInfo}>
                                <div className={s.StockItemInfoTitle}>
                                    {el.title}
                                </div>
                                <div className={s.StockItemInfoTypeStock}>
                                    Type: {el.typeStock}
                                </div>
                            </div>
                        </div>
                        <div className={s.StockItemSecondBlock}>
                            <div className={s.StockItemPrice}>
                                Цена: {el.price} <span>{el.wallet}</span>
                            </div>
                            <div className={s.StockItemProfitability}>
                                Доходность: + {el.profitability}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
