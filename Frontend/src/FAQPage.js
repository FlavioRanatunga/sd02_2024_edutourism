import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import FAQData from './FAQData'; // This should be the updated list of FAQs
import './FAQ.css'; // Assuming you have a stylesheet for additional styling

function FAQ() {
  return (
    <div>
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to the most commonly asked questions below.</p>
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {FAQData.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Videos Section */}
      <section className="help-videos">
        <div className="container">
          <div className="help-header">
            <h2>Help Videos</h2>
            <p>Watch our step-by-step tutorials to get the most out of our platform.</p>
          </div>

          {/* Video Thumbnails */}
          <div className="video-list">
            <div className="video-item">
              <iframe
                width="300"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Help Video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h4>Getting Started with Courses</h4>
            </div>

            <div className="video-item">
              <iframe
                width="300"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Help Video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h4>How to Book a Course</h4>
            </div>

            <div className="video-item">
              <iframe
                width="300"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Help Video 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h4>Managing Your Itinerary</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="related-resources">
        <div className="container">
          <div className="resources-header">
            <h2>Related Resources</h2>
            <p>Explore more helpful content for a better user experience.</p>
          </div>

          <div className="resource-links">
            <ul>
              <li><Link to="home" smooth={true} duration={1500}>User Guide</Link></li>
              <li><Link to="blog" smooth={true} duration={1500}>Explore Blog</Link></li>
              <li><Link to="contact" smooth={true} duration={1500}>Contact Support</Link></li>
              <li><Link to="courses" smooth={true} duration={1500}>Browse Courses</Link></li>
              <li><Link to="map" smooth={true} duration={1500}>Customize Map</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
