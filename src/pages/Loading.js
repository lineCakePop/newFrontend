import React from "react";

import loadingGif from "../icons/cakeGif.gif";

const Loading = () => {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <img src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loading;
