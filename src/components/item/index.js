import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{
        props.item.code
      }</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {Intl.NumberFormat("ru-RU", {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
        }).format(props.item.price)}
      </div>
      {
        props.isCartItem
          ? <p>{props.item.quantity} шт</p>
          : ``
      }
      <div className='Item-actions'>
        <button onClick={
          props.isCartItem
            ? callbacks.onDelete
            : callbacks.onAdd
        }>
          {
            props.isCartItem
              ? 'Удалить'
              : 'Добавить'
          }
        </button>
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  }
}

export default React.memo(Item);
