import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './index.css'
const cn = bem('ItemInfo');

const ItemInfo = (props) => {

  const params = useParams();

  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [category, setCategory] = useState('');
  const [edition, setEdition] = useState(1900);
  const [price, setPrice] = useState(0);


  useEffect(() => {
    props.store.actions.catalog.loadItem(params.id)
      .then(res => {
        console.log(res);
        setDescription(res.description)
        setCountry(res.madeIn.title)
        setCountryCode(res.madeIn.code)
        setCategory(res.category.title)
        setEdition(res.edition)
        setPrice(res.price)
      })
      .catch(err => console.log(err))
  }, [])

  const callbacks = {
    onAdd: (e) => props.onAdd(itemInfo._id)
  }

  return (
    <section className={cn()}>
      <p className={cn(`description paragraph`)}>{description}</p>
      <p className={cn(`country paragraph`)}>
        Страна производитель: <span className={cn('span')}>{`${country} (${countryCode})`}</span>
      </p>
      <p className={cn(`category paragraph`)}>
        Категория: <span className={cn('span')}>{category}</span>
      </p>
      <p className={cn(`year paragraph`)}>
        Год выпуска: <span className={cn('span')}>{edition}</span>
      </p>
      <p className={cn(`price paragraph`)}>
        Цена:  {numberFormat(price)} ₽
      </p>
      <button
        className={cn(`button`)}
        onClick={callbacks.onAdd}
      >Добавить</button>
    </section>
  )
}

export default memo(ItemInfo)