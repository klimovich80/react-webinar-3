import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

import { cn as bem } from '@bem-react/classname';
const cn = bem('Controls');

function Controls({ onAdd }) {
  return (
    <div className={cn()}>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default memo(Controls);
