import React, { useCallback, useState, useEffect } from 'react'
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import './style.css';

const cn = bem('Cart')

const Cart = (props) => {

  const [list, setList] = useState([])

  useEffect(() => {
    setList(props.store.getState().list);
  })

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      props.store.deleteItem(code);
      setList(props.store.getState().list)
    }),
  }

  return (
    <div className={
      props.isCartOpen
        ? cn('visible')
        : cn()
    } >
      <div className={cn('layer')}>
        <div className={cn('container')}>
          <div className={cn('head')}>
            <h2 className={cn('title')}>Корзина</h2>
            <button
              className={`${cn('button')} button`}
              onClick={props.onCartClose}>
              Закрыть
            </button>
          </div>
          <List
            list={list}
            isCartItem={props.isCartItem}
            onDeleteItem={callbacks.onDeleteItem}
          />
          <div className={cn('total')}>
            <p className={cn('description')}>Итого:</p>
            <p className={cn('price')}>{
              Intl.NumberFormat("ru-RU", {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
              }).format(props.store.findTotal())};
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart