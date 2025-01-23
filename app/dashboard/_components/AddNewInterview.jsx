"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import chatSession from "../../../utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!chatSession) {
      console.error("Error: Chat session is not available. Check API initialization.");
      setLoading(false);
      return;
    }
  
    try {
      const inputPrompt = `
        Job Position: ${jobPosition},
        Job Description: ${jobDesc},
        Years of Experience: ${jobExperience}.
        Provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions and answers in JSON format.
      `;
  
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      const cleanedText = responseText.replace("```json", "").replace("```", "");
      const parsedResponse = JSON.parse(cleanedText);
      setJsonResponse(parsedResponse);
  
      if (parsedResponse) {
        try {
          const newMockId = uuidv4();
          const insertResult = await db.insert(MockInterview).values({
            mockId: newMockId,
            jsonMockResp: JSON.stringify(parsedResponse),
            jobPosition: jobPosition,
            jobDescription: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
            creaatedAt: moment().format('DD-MM-YYYY') 
          });
  
          console.log("Inserted successfully:", newMockId);
          setOpenDialog(false);
          router.push(`/dashboard/interview/${newMockId}`);

        } catch (dbError) {
          console.error("Database insertion error:", dbError);
          throw dbError; // Re-throw to be caught by outer catch
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="w-96 p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job Description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex: Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex: React, Angular"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years Of Experience</label>
                    <Input
                      placeholder="Ex: 5"
                      type="number"
                      max="50"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;