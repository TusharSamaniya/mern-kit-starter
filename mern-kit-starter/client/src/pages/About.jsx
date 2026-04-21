import React from 'react';

const About = () => {
    return (
        <>
            <div className="bg-white text-gray-800 pt-20">

                <div className="max-w-screen-xl mx-auto px-5 pt-2">

                    <h2 className='text-center text-3xl'>
                        The Mission
                    </h2>
                    <p className='text-center'>
                        My mission is to empower job seekers with the tools and confidence they need to succeed in any interview situation. By leveraging advanced AI technology, I provide a comprehensive and accessible platform for interview preparation.
                    </p>

                </div>
                <div className="flex items-center justify-center pt-5">

                    <iframe width="560" height="315" src="https://www.youtube.com/embed/TXKiJfhVcAk?si=HDK4y-x98hdzCo5Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

                <div className="max-w-screen-xl mx-auto px-5 min-h-screen bg-white text-gray-800">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold text-5xl mt-5 tracking-tight">
                            FAQ
                        </h2>
                        <p className="text-neutral-500 text-xl mt-3">
                            Frequently asked questions
                        </p>
                    </div>
                    <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                        {/* Cuvette Tech FAQs */}
                        {[
                            {
                                question: "What services does Cuvette Tech offer?",
                                answer: "Cuvette Tech offers a range of services, including AI-driven mock interviews, interview coaching, and personalized feedback to help job seekers enhance their interview skills."
                            },
                            {
                                question: "How can I benefit from using Cuvette Tech?",
                                answer: "Using Cuvette Tech can help you improve your interview performance by providing tailored practice sessions, insightful feedback, and resources to boost your confidence."
                            },
                            {
                                question: "Is there a subscription fee for Cuvette Tech?",
                                answer: "Cuvette Tech offers various pricing plans, including free trials and subscription-based options. Check our website for the latest pricing information."
                            },
                            {
                                question: "Can I customize the mock interview experience?",
                                answer: "Yes! Cuvette Tech allows you to customize the mock interview scenarios based on the job roles you are targeting, enabling a more relevant practice experience."
                            },
                            {
                                question: "What technology powers the mock interviews?",
                                answer: "Our platform leverages advanced AI algorithms to simulate realistic interview environments, providing feedback on your responses and presentation skills."
                            },
                            {
                                question: "How do I access my previous mock interviews?",
                                answer: "All your mock interview sessions are saved in your Cuvette Tech account. You can easily access and review them anytime to track your progress."
                            },
                            {
                                question: "What should I do if I encounter issues on the platform?",
                                answer: "If you encounter any issues, you can reach out to our support team through the contact form on our website or email support@cuvettetech.com."
                            },
                            {
                                question: "Is there a mobile app for Cuvette Tech?",
                                answer: "Yes! Cuvette Tech has a mobile app available for both iOS and Android, allowing you to practice interviews on the go."
                            }
                        ].map((item, index) => (
                            <div className="py-5" key={index}>
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                        <span>{item.question}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        {item.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
