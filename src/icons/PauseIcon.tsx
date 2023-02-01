import React, { FC } from 'react';
import { IIconProps } from './IIconProps';

export const PauseIcon: FC<IIconProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} fill="transparent" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  )
}
