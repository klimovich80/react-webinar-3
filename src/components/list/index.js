import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('List')

function List({ list, onDeleteItem, isCartItem, onAdd }) {

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn(`item`)}>
          <Item
            item={item}
            onDelete={onDeleteItem}
            isCartItem={isCartItem}
            onAdd={onAdd}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  }
}

export default React.memo(List);
