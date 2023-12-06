import React, { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { INITIAL_PAGE } from '../../constants';
import './index.css'

const Navigation = (props) => {

  const setLayout = (page) => {
    return (
      <li className={cn('item')} key={page}>
        <button
          className={
            props.recentPage === page
              ? cn('button active-button')
              : cn('button')
          }
          onClick={props.onSelectPage}
          value={page}
        >
          {page}
        </button>
      </li >
    )
  }

  const getContent = (count) => {

    let content = [];
    content.push(setLayout(INITIAL_PAGE))
    if (props.pages > 1) {
      for (let i = INITIAL_PAGE + 1; i < count; i++) {
        content.push(setLayout(i));
      }
      content.push(setLayout(count)
      )
    }
    return content;
  };

  const cn = bem('Navigation')
  return (
    <ul className={cn('items')}>
      {getContent(props.pages)}
    </ul>
  )
}

export default memo(Navigation);