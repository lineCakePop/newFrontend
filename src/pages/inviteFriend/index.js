import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import loadingGif from "../../icons/cakeGif.gif";

import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import liff from "@line/liff";

import { ReactComponent as Hand } from "../../icons/hand.svg";

import { LOADING, SUCCESS } from "../../utils/const";

function InviteFriend() {
  const { idToken, alreadyFriend } = useContext(AuthContext);

  const { inviteCode } = useParams();

  const [status, setStatus] = useState(LOADING);
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    if (idToken !== "" && inviteCode !== "" && alreadyFriend === SUCCESS) {
      sendInvite();
    }
  }, [idToken, inviteCode, alreadyFriend]);

  const sendInvite = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/user/inviteFriend`,
        {
          inviteCode: inviteCode,
          tokenId: idToken,
        },
      );
      setFriendName(response.data.friendDisplayName);
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
        <div className="w-[251px] h-[138px] flex flex-col items-center">
          <Hand />
          <p className="mt-[32px] text-[18px] font-medium">You’ve become </p>
          <div className="flex text-[18px] font-medium">
            <span className="font-bold">{friendName}</span>
            ’s friend in LINE Birthday
          </div>
        </div>
      )}
    </div>
  );
}

export default InviteFriend;
