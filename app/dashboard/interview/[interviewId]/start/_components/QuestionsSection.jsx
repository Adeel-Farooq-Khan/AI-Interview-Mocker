import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ MockInterviewQuestion,activeQuestionIndex }) {

  const textToSpeach=(text)=>{
    if('speechSynthesis' in window  ){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)

    }
    else{
      alert('Sorry, Your browser does not support text to speach')
    }
  }
  return MockInterviewQuestion&&(
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  ">
        {MockInterviewQuestion &&
          MockInterviewQuestion.map((question, index) => (
            <h2
              className={`p-2 bg-secondary  rounded-full text-xs md:text-sm  cursor-pointer text-center ${activeQuestionIndex==index&&' '}  bg-blue-700 `}
         
            >
              Question #{index + 1}
            </h2>
          ))}

      </div>
          <h2 className="my-5 text-md md:text-lg">{MockInterviewQuestion[activeQuestionIndex]?.question}</h2>
          <Volume2 className="cursor-pointer" onClick={()=>textToSpeach(MockInterviewQuestion[activeQuestionIndex]?.question)}/>
          <div className="border rounded-lg p-5 bg-blue-100 mt-10">
            <h2 className="flex gap-2 items-center text-blue-700">
                <Lightbulb />
                    <strong>Note: </strong>
                
            </h2>
            <h2 className="text-sm  text-primary my-2">{process.env.NEXT_PUBLIC_NOTE}</h2>;
          </div>
    </div>
  );
}

export default QuestionsSection;
