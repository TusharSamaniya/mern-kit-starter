import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Ace Your Next Interview</h1>
          <p className="text-lg mb-6 text-gray-600">
            Practice mock interviews with AI-powered feedback and real-time interaction.
          </p>
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">AI-Powered Feedback</h3>
              <p className="text-gray-600">Get instant, insightful feedback on your answers.</p>
            </div>
            <div className="text-center p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Real-Time Video</h3>
              <p className="text-gray-600">Simulate real interviews with live video interaction.</p>
            </div>
            <div className="text-center p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
              <p className="text-gray-600">Track your progress and improve over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MockInterviewPro is a platform designed to help candidates excel in their interviews. 
            From AI-powered feedback to live simulations, we provide everything you need to succeed.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Interview?</h2>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
};

export default LandingPage;
