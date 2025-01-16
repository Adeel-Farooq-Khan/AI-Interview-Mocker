import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";

function RecordAnsSection() {
  return (
    <div className="flex my-20 flex-col justify-center items-center  rounded-lg p-5" >
      <Image src={'/3617090.png'} width={200} height={200} className="absolute"/>
      {/* <Webcam /> */}
    </div>
  );
}

export default RecordAnsSection;
