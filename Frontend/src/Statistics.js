import React, { useState, useEffect, useRef } from 'react';
import './statistics.css';

export default function MainHeader() {
  const [counts, setCounts] = useState({
    listings: 0,
    tours: 0,
    visitors: 0,
    clients: 0,
  });

  const counterRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    const animateCount = (target, key) => {
      let start = 0;
      const end = target;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCounts((prevCounts) => ({
          ...prevCounts,
          [key]: start,
        }));
        if (start === end) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        animateCount(90, 'listings');
        animateCount(40, 'tours');
        animateCount(65, 'visitors');
        animateCount(50, 'clients');
        if (observer.current) {
          observer.current.disconnect();
        }
      }
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (counterRef.current) {
      observer.current.observe(counterRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="statistics" className="statistics" ref={counterRef}>
      <div className="container">
        <div className="statistics-counter">
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{counts.listings}</div> <span>K+</span>
              </div>
              <h3>listings</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{counts.tours}</div> <span>K+</span>
              </div>
              <h3>Total tours</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{counts.visitors}</div> <span>K+</span>
              </div>
              <h3>visitors</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{counts.clients}</div> <span>K+</span>
              </div>
              <h3>happy clients</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
