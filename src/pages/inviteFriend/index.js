import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import loadingGif from "../../icons/cakeGif.gif";

import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import liff from "@line/liff";

import { ReactComponent as Welcome } from "../../icons/welcome.svg";

import { LOADING, SUCCESS } from "../../utils/const";

function InviteFriend() {
  const { idToken } = useContext(AuthContext);

  const { inviteCode } = useParams();

  const [status, setStatus] = useState(LOADING);

  useEffect(() => {
    if (idToken !== "" && inviteCode !== "") {
      sendInvite();
    }
  }, [idToken, inviteCode]);

  const sendInvite = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_PROXY}/user/inviteFriend`, {
        inviteCode: inviteCode,
        tokenId: idToken,
      });
      setStatus(SUCCESS);
    } catch (err) {
      console.log(err);
      liff.closeWindow();
    }
  };

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      {status === LOADING ? (
        <img src={loadingGif} alt="loading" />
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default InviteFriend;
