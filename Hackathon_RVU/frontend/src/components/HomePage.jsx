
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./Navbar";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/landing"); // Navigate to the landing page when "Get Started" is clicked
  };

  return (
    <div className="homepage">
      {/* Uncomment and use Navbar if needed */}
      <Navbar />
   
   
      {/* Hero Section */}
      <section className="hero">
        <h1>Empowering Innovation Through Collaboration</h1>
        <p>
          Join thousands of students and educators sharing projects, solving
          queries, and building ideas together.
        </p>
        <button className="hero-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Join EduConnect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Collaborate on Projects</h3>
            <p>
              Find peers with similar interests and work on exciting projects
              together.
            </p>
          </div>
          <div className="feature-card">
            <h3>Academic QnA</h3>
            <p>
              Post your academic questions and get answers from a community of
              experts.
            </p>
          </div>
          <div className="feature-card">
            <h3>Showcase Innovations</h3>
            <p>
              Publish your projects, research, and ideas to gain visibility and
              feedback.
            </p>
          </div>
          <div className="feature-card">
            <h3>Build Your Network</h3>
            <p>
              Connect with future collaborators, mentors, and academic leaders.
            </p>
          </div>
          {/* New Features */}
          <div className="feature-card">
            <h3>Connect with NGOs</h3>
            <p>Explore opportunities to work on social projects from NGOs.</p>
          </div>
          <div className="feature-card">
            <h3>Get Spotted</h3>
            <p>
              Get recognized by businesses who might be interested in your
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About EduConnect</h2>
        <p>
          EduConnect bridges the gap between ideas and execution. Whether you
          are a student brimming with creativity or an educator wanting to guide
          young minds, EduConnect is your one-stop platform to collaborate,
          learn, share, and grow.
        </p>
        <p>
          Designed to foster innovation and academic excellence, EduConnect
          connects users across institutions, disciplines, and regions.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "Through EduConnect, I found my dream project partner and we won a
              national hackathon!"
            </p>
            <h4>- Riya S., IIT Delhi</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "The Academic QnA helped me crack my final year exams with flying
              colors."
            </p>
            <h4>- Aditya M., NIT Trichy</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "I connected with a professor here who later became my research
              mentor. Amazing platform!"
            </p>
            <h4>- Priya T., BITS Pilani</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 EduConnect. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
