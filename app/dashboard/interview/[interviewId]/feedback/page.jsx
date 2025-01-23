"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Feedback({ params }) {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError(err);
      setIsLoading(false);
    }
  };

  const calculateOverallRating = () => {
    if (feedbackList.length === 0) return "N/A";
    const avgRating = feedbackList.reduce((sum, item) => sum + parseFloat(item.rating || 0), 0) / feedbackList.length;
    return avgRating.toFixed(1) + "/10";
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading feedback...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error loading feedback: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Found</h2>
      ) : (
        <>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{calculateOverallRating()}</strong>
          </h2>
          <h2 className="text-sm text-gray-600">
            Find below interview questions with the correct answers, your answers, and feedback for improving.
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 flex justify-between bg-secondary gap-7 rounded-lg my-2 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-100 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-100 text-sm text-green-900">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-100 text-sm text-primary">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')} className="mt-4">Go Home</Button>
    </div>
  );
}