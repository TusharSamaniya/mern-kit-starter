import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const questionGenerator = async (domain, role, skills, experienceLevel, company, stage, numberOfQuestions) => {
    // Validate required fields
    const prompt = `
    I need you to generate ${numberOfQuestions} interview questions based on the following criteria:

            1. **Domain/Industry**: ${domain}
            2. **Role/Position**: ${role}
            3. **Skills/Technologies**: ${skills}
            4. **Experience Level**: ${experienceLevel}
            5. **Company Name**: ${company || "N/A"}
            6. **Interview Stage**: ${stage}

            ### Expected Output:
            - Provide the response as a valid JSON string.
            - Format:
              {
                  "questions": [
                      {
                          "question": "What is React?",
                          "answer": "React is a JavaScript library for building user interfaces."
                      },
                      {
                          "question": "Explain the difference between SQL and NoSQL databases.",
                          "answer": "SQL databases are relational, while NoSQL databases are non-relational and better suited for handling unstructured data."
                      }
                  ]
              }

            Now, generate questions for the scenario above.
        `;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",

            messages: [
                {
                    role: "system",
                    content: "You are an expert interviewer specializing in generating interview questions tailored to specific roles and industries."
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
        const generatedQuestions = JSON.parse(response.choices[0].message.content);
        console.log(generatedQuestions)
        return generatedQuestions;
    } catch (error) {
        throw new Error("Failed to generate questions. Please try again.");
    }
};

export default questionGenerator;
