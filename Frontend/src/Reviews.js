import React, { useState, useEffect, useRef } from 'react';
import './assets/css/style.css';
import './assets/css/slick.css';
import './assets/css/slick-theme.css';

const ClientBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const sliderRef = useRef(null);


  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews/reviews');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleWheel = (e) => {
      if (sliderRef.current) {
        e.preventDefault();
        sliderRef.current.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    if (sliderRef.current) {
      sliderRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);


  // Form submit handler to add a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name, rating, comment, location, image };
    
    // Send the new review to backend
    try {
      await fetch('/reviews/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

    // Update review list after submission
    const updatedReviews = await (await fetch('/reviews/reviews')).json();
    setReviews(updatedReviews);

    // Reset form
      setName('');
      setRating('');
      setComment('');
      setLocation('');
      setImage('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };


  // Dragging functionality
  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="reviews" className="reviews">
      <div className="section-header">
      <h2 className="section-title">Clients Reviews</h2>
      <p className="section-subtitle">What our clients say about us</p>
      </div>
      
      <div className="reviews-carousel-container">
        <div
          className="testimonial-carousel"
          style={{ width: "85%", overflow: "hidden", whiteSpace: "nowrap", margin: "auto", cursor: isDragging ? 'grabbing' : 'grab' }}
          ref={sliderRef}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onDragging}
        >
          {reviews.map((review) => (
            <div className="single-testimonial-box" key={review.id} style={{ display: "inline-block" }}>
              <div className="testimonial-content">
                <div className="testimonial-info">
                  <div className="testimonial-img">
                    <img src={review.image} alt="review" />
                  </div>
                  <div className="testimonial-details">
                    <h2 className="testimonial-name">{review.name}</h2>
                    <h4 className="testimonial-location">{review.location}</h4>
                    <div className="testimonial-rating">
                      {[...Array(review.rating)].map((star, index) => (
                        <i className="fa fa-star" key={index}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="testimonial-comment">
                  <p>{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form to submit new review */}
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="form-input"
          required
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          className="form-input"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="form-textarea"
          required
        ></textarea>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="form-input"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="form-input"
        />
        <button type="submit" className="form-submit-btn">Submit Review</button>
      </form>
    </section>
  );
};


export default ClientBar;
