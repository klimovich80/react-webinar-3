import React, { memo } from 'react'
import './index.css'
import { cn as bem } from '@bem-react/classname';

const cn = bem('Loader')

const Loader = () => {
  return (
    <div className={cn()}>
      <div className={cn('element')}></div>
    </div>
  )
}

export default memo(Loader)