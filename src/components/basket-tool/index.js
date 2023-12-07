import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({ sum, amount, onOpen, onBackToMain }) {

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <nav className={cn('navigation')}>
        <Link
          className={cn('link')}
          to='/'
          onClick={onBackToMain}
        >Главная</Link>
      </nav>
      <div className={cn('container')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${numberFormat(sum)} ₽`
            : `пусто`
          }
        </span>
        <button className={cn(`button`)} onClick={onOpen}>Перейти</button>
      </div>
    </div >
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onBackToMain: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
