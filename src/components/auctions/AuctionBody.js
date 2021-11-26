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

  console.log(docs);

  /*let user = currentUser ? currentUser.email : false

 let docss

 if(user){
  docss = docs.filter(el => el.email === currentUser.email)
}else{
  docss = []
} */

  return (
    <div className="">
      {auction && <ProgressBar auction={auction} setAuction={setAuction} />}

      <div
        style={{ zIndex: "9999999" }}
        className="text-center w-50 position-fixed top-10 start-50 translate-middle"
      >
        {globalMsg && <Alert variant="danger">{globalMsg}</Alert>}
      </div>

      {docs && (
        <div className="container-fluid">
          <div className="">
            {docs.map((doc, i) => {
              return <AuctionCard orden={doc} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
