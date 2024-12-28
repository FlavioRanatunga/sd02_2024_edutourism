import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function HowItWorks() {
  const [openDialog, setOpenDialog] = useState({
    chooseLearn: false,
    findTravel: false,
    explorePlaces: false,
  });

  const handleClickOpen = (dialogName) => {
    setOpenDialog({ ...openDialog, [dialogName]: true });
  };

  const handleClose = (dialogName) => {
    setOpenDialog({ ...openDialog, [dialogName]: false });
  };

  return (
    <>
      <section id="works" className="works">
        <div className="container">
          <div className="section-header">
            <h2>how it works</h2>
            <p>Learn More about how our website works</p>
          </div>
          <div className="works-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-lightbulb-idea"></i>
                  </div>
                  <h2>Choose <span> what to</span> Learn</h2>

                  <p>
                  <br></br>
                    We believe that learning should be an adventure. Whether you're a curious traveler, a lifelong learner, or someone looking to combine exploration with education, you've come to the right place. Here, you have the power to tailor your educational journey to your interests and passions.
                  </p>
                  <p>
                      <br></br>
                  </p>
                  <button className="welcome-hero-btn how-work-btn" onClick={() => handleClickOpen('chooseLearn')}>
                    Read More
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-networking"></i>
                  </div>
                  <h2>Find <span> places to travel</span></h2>
                  <p>
                  <br></br>
                    Your gateway to exploring destinations that offer unique learning experiences. Whether you're interested in historical landmarks, vibrant cultural hubs, natural wonders, or cutting-edge innovation centers, we have curated a selection of places that promise both adventure and education.
                  </p>
                  <p>
                      <br></br>
                  </p>

                  <button className="welcome-hero-btn how-work-btn" onClick={() => handleClickOpen('findTravel')}>
                  Read More
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-location-on-road"></i>
                  </div>
                  <h2>Explore <span> amazing</span> places while learning</h2>
                  <p>
                  <br></br>
                    We have a curated selection of destinations where you can delve into new subjects, engage with local cultures, and gain hands-on knowledge. Whether you're captivated by ancient ruins, fascinated by wildlife, intrigued by art and architecture, or eager to understand global sustainability efforts, we've got you covered.
                  </p>
                  <button className="welcome-hero-btn how-work-btn" onClick={() => handleClickOpen('explorePlaces')}>
                  Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <Dialog open={openDialog.chooseLearn} onClose={() => handleClose('chooseLearn')}>
        <DialogTitle>Choose What to Learn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p></p>
          <p>In the vast landscape of education, the freedom to choose what you learn is the key to unlocking your true potential. Our EduTourism platform is designed to provide you with a wide array of learning opportunities tailored to your interests, needs, and goals. Whether you’re passionate about exploring the rich history of ancient civilizations, mastering a new language, diving into the complexities of environmental science, or honing your creative skills in arts and crafts, we offer a diverse selection of courses and programs curated by leading experts and institutions worldwide.
          </p>
          <p>Our approach to learning is holistic, integrating both academic rigor and experiential education. You have the flexibility to choose not only the subject matter but also the format that suits you best—whether it's online courses, in-person workshops, or immersive field experiences. We understand that learning is a lifelong journey, and our platform is built to support continuous growth. Each program is designed to provide you with practical knowledge and skills that you can apply in real-world scenarios, enhancing both your personal and professional life. With our easy-to-navigate platform, you can browse through various educational categories, read reviews from other learners, and select programs that align with your aspirations. Choose what to learn and embark on an educational journey that’s as unique as you are.
          </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('chooseLearn')} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={openDialog.findTravel} onClose={() => handleClose('findTravel')}>
        <DialogTitle>Find Places to Travel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p></p>
          <p>Travel is more than just visiting new places; it's about connecting with the world on a deeper level, discovering the stories behind the landscapes, and immersing yourself in the cultures that define them. Our EduTourism platform is your gateway to finding travel destinations that offer both adventure and education. We believe that every journey should be an opportunity to learn, and that’s why we carefully select travel experiences that go beyond the ordinary, offering you the chance to engage with the world in meaningful ways.
          </p>
          <p>Whether you’re drawn to the ancient wonders of the Mediterranean, the biodiversity of tropical rainforests, or the artistic heritage of European capitals, our platform helps you find the perfect place to travel that aligns with your learning interests. Imagine exploring the ruins of a forgotten civilization with a seasoned archaeologist as your guide, or studying marine life in pristine coral reefs with a team of marine biologists. Perhaps you want to learn about sustainable agriculture on a working farm, or delve into the art of winemaking in a historic vineyard. Whatever your interest, we offer a range of destinations that provide rich, immersive experiences designed to educate and inspire.
          </p>
            <p>Each destination is accompanied by detailed information, including the educational focus, the experts you’ll learn from, and the unique experiences you can expect. We also provide practical travel advice, from the best times to visit to tips on how to prepare for your educational journey. With our platform, finding places to travel isn’t just about choosing a destination; it’s about selecting an experience that will enrich your understanding of the world and leave you with memories and knowledge that last a lifetime.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('findTravel')} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={openDialog.explorePlaces} onClose={() => handleClose('explorePlaces')}>
        <DialogTitle>Explore Amazing Places</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p></p>
              <p>Why settle for ordinary travel when you can transform your journey into an educational adventure? Our EduTourism platform is dedicated to offering you the best of both worlds—exploration and education. We believe that travel should be more than just sightseeing; it should be an opportunity to delve deep into the culture, history, and natural wonders of the places you visit. With our carefully curated experiences, you can explore amazing places while learning, ensuring that your travels are not only enjoyable but also intellectually rewarding.
              </p>
                <p>Imagine trekking through the jungles of the Amazon while learning about the incredible biodiversity that thrives there, or wandering through the streets of a historic European city with a local historian who brings the past to life with stories and insights. Perhaps you want to immerse yourself in the daily life of a rural village, learning traditional crafts from artisans who have passed their skills down through generations. Or maybe you’re intrigued by the geological wonders of a volcanic island, where you can study the forces that shape our planet. Our platform offers a wide range of educational travel experiences that cater to all interests and levels of expertise.
                </p>
                  <p>We collaborate with renowned experts, local guides, and educational institutions to ensure that each experience is both informative and engaging. Our programs are designed to provide you with hands-on learning opportunities, allowing you to gain practical knowledge while exploring some of the world’s most stunning locations. Whether you’re traveling solo, with family, or as part of a group, our EduTourism experiences are tailored to provide you with a deeper understanding of the places you visit. From the moment you arrive until the time you leave, you’ll be immersed in a rich learning environment that enhances your appreciation of the world around you. Explore amazing places while learning, and return home with not only memories but also a wealth of knowledge that will stay with you forever.
                  </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('explorePlaces')} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HowItWorks;
