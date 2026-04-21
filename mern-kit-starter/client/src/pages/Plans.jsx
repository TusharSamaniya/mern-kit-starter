import React from "react";

const Plans = () => {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            description: "Great for small projects and personal use.",
            features: ["1 Form", "Basic Analytics", "Email Notifications"],
            cta: "Get Started",
        },
        {
            name: "Pro",
            price: "$9/month",
            description: "Ideal for growing businesses.",
            features: [
                "Up to 10 Forms",
                "Advanced Analytics",
                "Custom Branding",
                "Priority Support",
            ],
            cta: "Upgrade Now",
        },
        {
            name: "Enterprise",
            price: "Contact Us",
            description: "Tailored solutions for large organizations.",
            features: [
                "Unlimited Forms",
                "Team Collaboration",
                "Dedicated Support",
                "Custom Integrations",
            ],
            cta: "Contact Sales",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Our Pricing Plans</h1>
                    <p className="text-gray-600 mt-4">
                        Choose a plan that fits your needs and scale your forms effortlessly.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
                            <p className="text-3xl font-semibold text-gray-800 mt-4">
                                {plan.price}
                            </p>
                            <p className="text-gray-600 mt-2">{plan.description}</p>
                            <ul className="mt-6 space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="text-green-500 mr-2">
                                            <i className="fas fa-check-circle"></i>
                                        </span>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
