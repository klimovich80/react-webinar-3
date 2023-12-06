import React, { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './index.css'

const Navigation = () => {

  const cn = bem('Navigation')
  return (
    <ul className={cn('items')}>
      <li className={cn('item')}>
        <Link className={cn('link')} to='/'>1</Link>
      </li>
      <li className={cn('item')}>
        <Link className={cn('link')} to='/'>2</Link>
      </li>
      <li className={cn('item')}>
        <Link className={cn('link')} to='/'>3</Link>
      </li>
    </ul>
  )
}

export default memo(Navigation);