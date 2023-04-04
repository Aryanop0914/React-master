import React from 'react'
import Form2 from './Form2'
import Ownercard from './Ownercard'
// import Contact from '../Components/Contact'

const Header2 = () => {
  return (
    
    <div className="header2">
     <div className="container">
        <div className="row">
            <div className="col">
                <div className="part1">
                    <Form2/>
                </div>
            </div>
            <div className="col">
                <div className="part2">
                  <Ownercard/>
                </div>
            </div>
        </div>
     </div>
    </div>
    
  )
}

export default Header2
