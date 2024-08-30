import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/carousel-1.jpg'; // Import the image
import ExampleCarouselImage2 from '../../assets/images/carousel-2.jpg'; // Import the image
import ExampleCarouselImage3 from '../../assets/images/carousel-3.jpg'; // Import the image
import EmailSubscribe from '../Email/EmailSubscribe';

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
            <h3>Biggest Prometric Source</h3>
            <p>We Helped over 1000 Students through Years Pass The Prometric Exam</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ExampleCarouselImage2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ExampleCarouselImage3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <EmailSubscribe/>
    </div>
  );
}

export default Home;
