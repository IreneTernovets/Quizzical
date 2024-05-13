import React from 'react'
import image1 from '../img/image1.svg'
import image2 from '../img/image2.svg'

const Background = ({ children }) => {
  return (
    <div className="background-container">
      <img src={image1} alt="Background Image" className="image1-style" />
      <img src={image2} alt="Background Image" className="image2-style" />
      {children}
    </div>
  )
}

export default Background