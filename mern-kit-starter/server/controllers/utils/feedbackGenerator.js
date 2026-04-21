import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const feedbackGenerator = async (domain, skills, company, questionsAnswers) => {
    const prompt = `
    You are an experienced HR professional providing feedback on real-time interviews.
    I have a set of answers from an interview in the ${domain} domain requiring ${skills} skills for ${company}.
    Please evaluate the answers based on the following categories and provide detailed feedback:
    
    Categories:
    - Preparation and Knowledge
    - Answer Structure
    - Technical Skills
    - Communication and Presentation
    - Behavioral Responses
    - Time Management
    - Overall Feedback
    - Marks out of 10

    Here are the answers:
    ${questionsAnswers}

    ### Expected Output:
    - Provide the response as a valid JSON string.
    - Format:
    {
      "feedback": {
        "preparationAndKnowledge": "Feedback here accroding to user_answers to the question",
        "answerStructure": "Feedback here accroding to user_answers to the question",
        "technicalSkills": "Feedback here accroding to user_answers to the question",
        "communicationAndPresentation": "Feedback here accroding to user_answers to the question",
        "behavioralResponses": "Feedback here accroding to user_answers to the question",
        "timeManagement": "Feedback here accroding to user_answers to the question",
        "overallFeedback": "Feedback here accroding to user_answers to the question",
        "marksOutOf10": "marks accroding to user_answers to the question"
      }
    }
  `;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",

            messages: [
                {
                    role: "system",
                    content: " You are an experienced HR professional providing feedback on real-time interviews."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            temperature:0.2
        });

        // Parse and return the generated questions
        const feedback = response.choices[0].message.content;
        console.log('sdafsdfsdf')
        console.log(feedback)
        console.log('sdafsdfsdf')
        return feedback;
    } catch (error) {
        console.error("Error generating feedback:", error.message);
        return { error: error.message };
    }
};

export default feedbackGenerator;
