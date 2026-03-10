import React from 'react'
import { assets } from '../assets/assets'


const Logo = ({x,y}) => {
  return (
    <img src={assets.logo} alt="LogO" height={x || 28} width={y || 28} />
    
)
}

export default Logo