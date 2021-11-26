import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { useFirestore } from "../../hooks/useFirestore";

export const AuctionBody = () => {
  const [auction, setAuction] = useState(null);
  const { currentUser, globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore("orders");

  const [bool, setBool] = useState(false);

  let entregas = docs.filter((el) => el.deliver === currentUser?.email);
  let pedidos = docs.filter((el) => !el.entregado);

  return (
    <div className="border-transparent">
      {auction && <ProgressBar auction={auction} setAuction={setAuction} />}

      <div
        style={{ zIndex: "9999999" }}
        className="text-center w-50 position-fixed top-10 start-50 translate-middle"
      >
        {globalMsg && <Alert variant="danger">{globalMsg}</Alert>}
      </div>

      <div className="text-center mt-3">

        <button className={bool ? "btn btn-primary mx-1" : "btn btn-light mx-1"}
                onClick={(e) => setBool(true)}>
          Mis Entregas
        </button>

        <button className={bool ? "btn btn-light" : "btn btn-primary"}
                onClick={(e) => setBool(false)}>
          Los Pedidos
        </button>
      </div>

        {bool ? (
          <div className="container-fluid">
              {entregas.map((doc, i) => {
                return <AuctionCard orden={doc} key={i} />;
              })}
          </div>
        ) : (
          <div className="container-fluid">
              {pedidos.map((doc, i) => {
                return <AuctionCard orden={doc} key={i} />;
              })}
          </div>
        )}
      </div>
  
  );
};
