import React, { useContext, useEffect } from "react";

import axios from "axios";

import loadingGif from "../../icons/cakeGif.gif";

import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import liff from "@line/liff";

function InviteFriend() {
  const { idToken } = useContext(AuthContext);

  const { inviteCode } = useParams();

  useEffect(() => {
    if (idToken !== "" && inviteCode !== "") {
      sendInvite();
    }
  }, [idToken, inviteCode]);

  console.log(inviteCode);

  const sendInvite = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/user/inviteFriend`,
        {
          inviteCode: inviteCode,
          tokenId: idToken,
        }
      );
      liff.closeWindow();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <img src={loadingGif} alt="loading" />
    </div>
  );
}

export default InviteFriend;
