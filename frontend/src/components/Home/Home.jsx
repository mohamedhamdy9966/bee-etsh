import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ExampleCarouselImage from '../../assets/images/carousel-1.jpg'; // Import the image
import ExampleCarouselImage2 from '../../assets/images/carousel-2.jpg'; // Import the image
import ExampleCarouselImage3 from '../../assets/images/carousel-3.jpg'; // Import the image
import EmailSubscribe from '../Email/EmailSubscribe';
import './Home.css'

const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          {/* Use the img tag to display the image */}
          <img
            className="d-block w-100"
            src={ExampleCarouselImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Biggest Pharmacy Exams Source</h3>
            <p>We Helped over +1000 Students through Years Pass The Prometric Exam</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ExampleCarouselImage2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Biggest Pharmaceutical Community In Middle East</h3>
            <p>Helping All Arab Pharmacists Communicating Around The World</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ExampleCarouselImage3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Your Way To Achieve Success</h3>
            <p>Join Hunderds Of Pharmacists , Register Now It's FREE !</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <EmailSubscribe/>
      <Carousel>
        <Carousel.Item>
        <div className="carousel-section">
    <h3>MALAZ AHMED</h3>
    <h6>Student</h6>
    <h4>SPLE</h4>
    <h6>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
    </h6>
    <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum necessitatibus eos aspernatur minima qui incidunt perspiciatis eius illo, eveniet saepe aliquid mollitia, beatae quidem voluptatibus suscipit quae amet obcaecati eaque?</h5>
  </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-section">
            <h3>SHERIF MADKOUR</h3>
            <h6>Doctor</h6>
            <h4>SPLE</h4>
            <h6>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
    </h6>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum necessitatibus eos aspernatur minima qui incidunt perspiciatis eius illo, eveniet saepe aliquid mollitia, beatae quidem voluptatibus suscipit quae amet obcaecati eaque?</h5>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-section">
            <h3>MOAAZ MOHAMED</h3>
            <h6>Student</h6>
            <h4>DHA</h4>
            <h6>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
    </h6>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum necessitatibus eos aspernatur minima qui incidunt perspiciatis eius illo, eveniet saepe aliquid mollitia, beatae quidem voluptatibus suscipit quae amet obcaecati eaque?</h5>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-section">
            <h3>MOHAMED EL HAWARY</h3>
            <h6>Doctor</h6>
            <h4>SPLE</h4>
            <h6>
  <i className="fas fa-star"></i>
  <i className="fas fa-star"></i>
  <i className="fas fa-star"></i>
  <i className="fas fa-star"></i>
  <i className="far fa-star"></i> {/* Empty star for 4 out of 5 */}
</h6>

            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum necessitatibus eos aspernatur minima qui incidunt perspiciatis eius illo, eveniet saepe aliquid mollitia, beatae quidem voluptatibus suscipit quae amet obcaecati eaque?</h5>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-section">
            <h3>SAAD EL BOUSHY</h3>
            <h6>Student</h6>
            <h4>KAPS</h4>
            <h6>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i> {/* Empty star for 4 out of 5 */}
              </h6>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum necessitatibus eos aspernatur minima qui incidunt perspiciatis eius illo, eveniet saepe aliquid mollitia, beatae quidem voluptatibus suscipit quae amet obcaecati eaque?</h5>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
