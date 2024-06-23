import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";

const product = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: '2', title: 'куртка', price: 6000, description: 'Красного цвета, прямые'},
    {id: '3', title: 'штаны', price: 7000, description: 'Синего цвета, прямые'},
    {id: '4', title: 'кофта', price: 3000, description: 'Синего цвета, прямые'},
    {id: '5', title: 'сапоги', price: 2000, description: 'Синего цвета, прямые'},
    {id: '6', title: 'шапка', price: 1000, description: 'Синего цвета, прямые'},
    {id: '7', title: 'варежки', price: 2500, description: 'Синего цвета, прямые'},
    {id: '8', title: 'перчатки', price: 5300, description: 'Синего цвета, прямые'},
    {id: '9', title: 'носки', price: 5100, description: 'Синего цвета, прямые'},
    {id: '10', title: 'трусы', price: 5900, description: 'Синего цвета, прямые'},
    {id: '11', title: 'очки', price: 5800, description: 'Синего цвета, прямые'},
    {id: '12', title: 'чемодан', price: 4700, description: 'Синего цвета, прямые'},
    {id: '13', title: 'лыжи', price: 3600, description: 'Синего цвета, прямые'},
    {id: '14', title: 'маска', price: 1100, description: 'Синего цвета, прямые'},
    {id: '15', title: 'боты', price: 1300, description: 'Синего цвета, прямые'},
    {id: '16', title: 'кросы', price: 1800, description: 'Синего цвета, прямые'},
    {id: '17', title: 'балакалава', price: 2300, description: 'Синего цвета, прямые'},
    {id: '18', title: 'термуха', price: 2500, description: 'Синего цвета, прямые'},
    {id: '19', title: 'подштанники', price: 4400, description: 'Синего цвета, прямые'},
    {id: '20', title: 'стельки', price: 1111, description: 'оранжевые цвета, прямые'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch ('http://95.213.248.252:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems)

        if (newItems.lenght === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Купить $' + getTotalPrice(newItems)
            });
        }
    }
    return (
        <div className={'list'}>
            {product.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;