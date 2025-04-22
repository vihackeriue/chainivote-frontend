import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PollCard from './card/PollCard';

const mockData = [
  {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Introduction to webdesign",
    date: "Sunday, September 26th at 7:00 pm",
    desc: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "Marketing Strategies",
    date: "Sunday, November 15th at 7:00 pm",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam..."
  },
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Creative Thinking",
    date: "Sunday, December 5th at 6:00 pm",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
  }
  ,
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Creative Thinking",
    date: "Sunday, December 5th at 6:00 pm",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
  }
  ,
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Creative Thinking",
    date: "Sunday, December 5th at 6:00 pm",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
  }
  ,
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Creative Thinking",
    date: "Sunday, December 5th at 6:00 pm",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
  }
];



const PollListSections = ({ data }) => (
  <Row className="gy-4">
    {data.map((item, idx) => (
      <Col key={idx} lg={4} md={6}>
        <PollCard {...item} />
      </Col>
    ))}
  </Row>
);

export default PollListSections;
