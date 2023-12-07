import React, { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './index.css'

const cn = bem('ItemInfo');

const ItemInfo = (props) => {
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <section className={cn()}>
      <p className={cn(`description`)}>{props.item.description}</p>
      <p className={cn(`country`)}>
        Страна производитель: {`${props.item.madeIn.title} (${props.item.madeIn.code})`}
      </p>
      <p className={cn(`category`)}>
        Категория: {props.item.category.title}
      </p>
      <p className={cn(`year`)}>
        Год выпуска: {props.item.edition}
      </p>
      <p className={cn(`price`)}>
        Цена:  {numberFormat(props.item.price)} ₽
      </p>
      <button
        className={cn(`button`)}
        onClick={callbacks.onAdd}
      >Добавить</button>
    </section>
  )
}

export default memo(ItemInfo)