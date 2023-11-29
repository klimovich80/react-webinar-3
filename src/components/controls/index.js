import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onCartOpen }) {
  return (
    <div className='Controls'>
      <button onClick={() => onCartOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default React.memo(Controls);
