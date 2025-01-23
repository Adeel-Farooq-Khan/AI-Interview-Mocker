"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

function RecordAnsSection({ MockInterviewQuestion, activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState("");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);; // Replace with your actual API key
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prev) => prev + result.transcript);
    });
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving your answer, Please record again");
        return;
      }

      const feedbackPrompt =
        "Question:" +
        MockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for given interview questions" +
        "please give us rating for answer and feeedback as area of improvement if any" +
        "in just 3 to 5 lines to improve in JSON format with rating field and feedback field";

      try {
        const result = await model.generateContent(feedbackPrompt);
        const response = await result.response;
        const mockJsonResp = response.text().replace("```json", "").replace("```", "");
        console.log(mockJsonResp);
      } catch (err) {
        console.error("Error sending feedback prompt:", err);
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex mt-20 flex-col justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/3617090.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={SaveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnsSection;