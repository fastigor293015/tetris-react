import React, { FC } from 'react';
import { IIconProps } from './IIconProps';

export const ArrowUp: FC<IIconProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
    </svg>
  )
}
