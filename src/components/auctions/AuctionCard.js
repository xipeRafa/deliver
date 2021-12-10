import React, { useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useItems } from "../../hooks/useItems";

export const AuctionCard = ({ orden }) => {

   const { currentUser, bidAuction, UStock, UTaken} = useContext(AuthContext); 

  const { items } = useItems("items");

 console.log(orden)

   let entregado = orden.entregado ? 'entregando...' : 'Apartar para Entregar'

  let img
  const hora = orden.date.toDate().toLocaleTimeString() /* hora, min, sec */

  const fullDate = orden.date.toDate().toLocaleDateString("es-CL", {
      weekday: "long", // narrow, short
      year: "numeric", // 2-digit
      month: "short", // numeric, 2-digit, narrow, long
      day: "numeric" // 2-digit
 });

 const [selectState, setSelectState] = useState('');

 const handleSelect = (e) => {
   setSelectState(e.target.value);
 }

 let qty 
 let IdP
 let prevStock
 let global

 let cseri 
 let quiroga
 let perisur
 let progreso


 orden.items.map((el) => {
      qty = el.qty
      IdP = el.id
      prevStock = el[selectState]
      global = el.stock

      cseri = el.cseri
      quiroga = el.quiroga
      perisur = el.perisur
      progreso = el.progreso
 })

 const handleUStock =()=>{
     UStock(IdP, qty, selectState, prevStock, global) 
     UTaken(orden.id, true)
 }

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

                    {orden.items.map((el, i) => (
                        <div key={i}>
                    <h6>Id-producto: <span className="text-muted">{el.id}</span> </h6>
                         <p><span className='text-muted'>producto:</span>  {el.item}</p>
                         <p><span className='text-muted'>precio:</span>  {el.price}</p>
                         <p><span className='text-muted'>cantidad:</span>  {el.qty}</p>
                         <div>
                              <p>
                                  <span className='text-muted'> C Seri </span>{cseri}
                                  <span className='text-muted'> Quiroga</span> {quiroga}
                                  <span className='text-muted'> Perisur</span> {perisur}
                                  <span className='text-muted'> Progreso</span> {progreso}
                              </p>
                         </div>
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
                        className={orden.entregado ? 'd-none' : 'btn btn-danger w-100'}>{entregado}</button>

                    <div className={!orden.entregado ? 'd-none': 'mt-1'}>
                        <select className="w-100 btn btn-outline-primary" onChange={handleSelect} value={selectState} disabled={orden.taken}>
                            <option value="" disabled selected>Elija una Sucursal por Produco a Recoger</option>
                            <option value="cseri">Camino del Seri</option>
                            <option value="quiroga">Quiroga</option>
                            <option value="perisur">Perisur</option>
                            <option value="progreso">Progreso</option>
                            <option value="navojoa">Navojoa</option>
                        </select>
                    </div>

                    <button onClick={handleUStock}
                        className={orden.entregado ? selectState !== 'mt-3' ? 'form-control mt-3' : 'd-none' : 'd-none'} disabled={orden.taken}>
                             Marcar para Recoger en Sucursal { orden.taken ? '✓' : ' '}
                    </button>
               </div>
          )}
          </div>
    );
  };

