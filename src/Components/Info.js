import React from 'react'

export default function info() {
  return (
    <div className="info">
    <div className="container">
        <div className="row">
            <div className='col'>

               <div className="service-item">
                        <i className="fa-solid fa-2x fa-sack-dollar"></i>
                        {/* <img className="img" src="./images/IInfo/True_Values.png" alt=""/> */}
                        <h4><b>True Value</b></h4>
                        <p>We don't just offer great prices and good long term accommodation deals,
                             we provide true value for money by giving you a priceless authentic experience.</p>
                    </div>
           </div>
           <div className="col" >
               <div className="service-item">
                        <i className="fa-solid fa-2x fa-house"></i>
                        {/* <img className="img" src="./images/IInfo/Real_Homes.png" alt=""/> */}
                        <h4><b>Real Homes</b></h4>
                        <p>We will always offer rooms in real homes with local hosts.
                             Our accommodation is different because you stay with locals and become part of the local community.</p>
                    </div>
           </div>
           <div className="col" >
               <div className="service-item">
                        <i className="fa-solid fa-2x fa-people-roof"></i>
                        {/* <img className="img" src="./images/IInfo/Sustainable_tourism.png" alt=""/> */}
                        <h4><b>Sustainable Tourism</b></h4>
                        <p>We promote sustainable local tourism by ensuring you're spending stays
                             within local communities, minimising your environmental impact.</p>
                    </div> 

           </div>
        </div>
     
    </div>
    </div>
  )
}
