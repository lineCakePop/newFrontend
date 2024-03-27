import { useContext, useEffect, useState } from "react";

import ModalCustom from "./modal";

import { AuthContext } from "../context/AuthContext";

import liff from "@line/liff";

const FriendCheck = ({ children }) => {
  const { idToken } = useContext(AuthContext);

  // ================= useState =================

  const [displayAddFriendModal, setDisplayAddFriendModal] = useState(false);

  // ================= useEffect =================

  useEffect(() => {
    if (idToken !== "") {
      checkFriendship();
    }
  }, [idToken]);

  // ================= function =================

  const checkFriendship = async () => {
    try {
      const response = await liff.getFriendship();
      if (!response.friendFlag) {
        setDisplayAddFriendModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickCancel = () => {
    liff.closeWindow();
  };
  const onClickConfirm = () => {
    window.location.href = "https://lin.ee/6J3Hnsr";
  };

  return (
    <>
      {displayAddFriendModal && (
        <ModalCustom
          handleCancel={onClickCancel}
          handleConfirm={onClickConfirm}
          title={<span>Add ‘Line Birthday’ as a friend? </span>}
          subTitle={
            <>
              <p>You have to become friend</p>
              <p> with Line Birthday before</p>
              <p>joining the sharing party</p>
            </>
          }
          confirmTitle="Add"
        />
      )}
      {children}
    </>
  );
};

export default FriendCheck;
