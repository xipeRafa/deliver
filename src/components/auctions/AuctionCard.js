import React, { useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from "../../hooks/useFirestore";
import { useItems } from "../../hooks/useItems";

export const AuctionCard = ({ orden }) => {

   const { currentUser, bidAuction} = useContext(AuthContext); 

  const { docs } = useFirestore("orders");
  const { items } = useItems("items");
  console.log('docs:', docs)
   console.log('items:', items) 

   let entregado = orden.entregado ? 'entregando...' : 'Apartar para Entregar'

  let img
  const hora = orden.date.toDate().toLocaleTimeString() /* hora, min, sec */

  const fullDate = orden.date.toDate().toLocaleDateString("es-CL", {
      weekday: "long", // narrow, short
      year: "numeric", // 2-digit
      month: "short", // numeric, 2-digit, narrow, long
      day: "numeric" // 2-digit
 });

    return (
            

          <div>
          {currentUser && (
            <div className=" pl-5 col-sm-4 m-1 p-3 my-3 bg-white mt-5 ">
                    <h6>Id-Orden: <span className="text-muted">{orden.id}</span>  </h6>

                    <p> <span className='text-muted'>comprador:</span> {orden.buyer.name} </p>
                    <p><span className='text-muted'>correo:</span>  {orden.buyer.email} </p>
                    <p><span className='text-muted'>telefono:</span> {orden.buyer.phone} </p>
                    <p><span className='text-muted'>fecha:</span>  {fullDate}, {hora}</p>
                    <p><span className='text-muted'>direccion:</span>  {orden.buyer.adress}</p>
                    <br/>

                    {orden.items.map((el, i) => (
                        <div key={i}>
                    <h6>Id-producto: <span className="text-muted">{el.id}</span> </h6>
                         <p><span className='text-muted'>producto:</span>  {el.item}</p>
                         <p><span className='text-muted'>precio:</span>  {el.price}</p>
                         <p><span className='text-muted'>cantidad:</span>  {el.qty}</p>
                        {
                            items.map(item => (
                                 console.log(item.id === el.id ? img = item.pictureUrl[0] : null)
                            ))
                       }  
                        <img className="col-4 mb-1" src={img} alt="" /> 
                         </div>
                    ))}
                     <br/>
                    <p className="border text-center">
                      Total a Pagar: $ 
                      <span className="text-white bg-dark fs-4 py-1 px-2 ">{orden.total}</span>
                    </p>

                        <button onClick={() => bidAuction(orden.id, currentUser.email)}
                        className={orden.entregado ? 'btn btn-primary w-100' : 'btn btn-danger w-100'}>{entregado}</button>

                       </div>
     
          )}
           </div>
    );
  };

