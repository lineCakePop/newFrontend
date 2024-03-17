import { useState } from "react";
import RecipientSelector from "../../components/createParty/recipientSelector";

const CreateParty = () => {
  const [recieverId, setRecieverId] = useState("");

  return (
    <div className="p-[16px] ">
      Create Party
      <RecipientSelector
        defaultReceiver={{
          receiverId: "65d5b262d2b63ba97f85446d",
          receiverName: "ไม้แก่น",
          receiverPicture:
            "https://sprofile.line-scdn.net/0hAn-QGdriHkEAKA2rPgFgPnB4HSsjWUdTJRpUJGF9RyJuHA1FKkwFc2UhFCRuTQkUf01VIzR6Q3IMO2knHn7idQcYQ3A8GlofLktToA",
        }}
        setRecipientId={setRecieverId}
      />
    </div>
  );
};

export default CreateParty;
