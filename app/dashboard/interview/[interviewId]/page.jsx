"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
 
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 flex flex-col items-center">
      {/* Heading */}
      <h2 className="font-bold text-3xl mb-10">Let's Get Started</h2>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
        {/* Job Information Section */}
        <div className="flex flex-col gap-5 p-5 rounded-lg border w-full md:w-1/2">
          <h2 className="text-lg">
            <strong>Job Role/Job Position: </strong>
            {interviewData?.jobPosition || "Loading..."}
          </h2>
          <h2 className="text-lg">
            <strong>Job Description: </strong>
            {interviewData?.jobDescription || "Loading..."}
          </h2>
          <h2 className="text-lg">
            <strong>Years of Experience: </strong>
            {interviewData?.jobExperience || "Loading..."}
          </h2>
        </div>

        {/* Information Section */}
        <div className="flex flex-col gap-2 p-5 rounded-lg border w-full md:w-1/2 border-yellow-300 bg-yellow-100">
          <h2 className="flex gap-2 items-center text-lg font-semibold text-yellow-500">
            <Lightbulb />
            Information
          </h2 >
          <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION || "No information available."}</h2>
        </div>
      </div>

      {/* Webcam Section */}
      <div className="flex flex-col items-center gap-5 mt-10 w-full md:w-1/2">
        {webCamEnabled ? (
          <Webcam
            audio={false}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            style={{
              height: 300,
              width: 300,
              borderRadius: "10px",
              border: "2px solid #ccc",
            }}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full p-20 rounded-lg border bg-secondary" />
            <Button 
            variant = "ghost"
              onClick={() => setWebCamEnabled(true)}
              className="bg-primary text-white py-2 px-5 rounded-lg"
            >
              Enable Web Cam and Microphone
            </Button>
          </>
        )}
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
      <Button>Start Interview</Button>
        </Link>
      </div>

    </div>
  );
}

export default Interview;
