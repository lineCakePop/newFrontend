import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { LOADING, SUCCESS } from "../../utils/const";

import Loading from "../Loading";
import PartyCard from "../../components/party/partyCard";
import ButtonCustom from "../../components/button";

import { useNavigate } from "react-router-dom";

const Party = () => {
  const { idToken } = useContext(AuthContext);
  const [status, setStatus] = useState(LOADING);

  const [parties, setParties] = useState([
    {
      memberPicture: [],
      partyDate: "",
      partyId: "",
      partyStatus: "",
      productName: "",
      productPicture: "",
      receiverName: "",
      receiverPicture: "",
      total: 0,
      variant: "",
    },
  ]);

  const getAllParty = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/party/AllParty`,
        {
          params: {
            id: idToken,
          },
        },
      );

      console.log("response.data", response.data);

      setParties(response.data);
      setStatus(SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const onClickCreateSharingParty = () => {
    navigate("/create-party-select-item");
  };

  // =============== useEffect ===============
  useEffect(() => {
    if (idToken !== "") {
      getAllParty();
    }
  }, [idToken]);

  if (status === LOADING) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col grow">
      <div className="grow overflow-y-scroll">
        {parties.map((party, index) => {
          return (
            <div key={index} className="mb-[8px]">
              <PartyCard
                receiverPicture={party.receiverPicture}
                receiverName={party.receiverName}
                partyDate={party.partyDate}
                partyStatus={party.partyStatus}
                productPicture={party.productPicture}
                productName={party.productName}
                total={party.total}
                variant={party.variant}
                memberPicture={party.memberPicture}
                partyId={party.partyId}
              />
            </div>
          );
        })}
      </div>
      <div className="h-[97px] p-[24px] flex justify-center">
        <ButtonCustom
          title="Create Sharing-Party"
          onClick={onClickCreateSharingParty}
        />
      </div>
    </div>
  );
};

export default Party;
