// File: CarouselSlider.tsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const items: CarouselItem[] = [
  {
    id: 1,
    title: "Slide 1",
    description: "This is the first slide",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 2,
    title: "Slide 2",
    description: "This is the second slide",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 3,
    title: "Slide 3",
    description: "This is the third slide",
    image: "https://via.placeholder.com/800x400",
  },
];

const CarouselSlider: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Container >
      <Typography variant="h4" align="center" gutterBottom>
        MUI Carousel Slider
      </Typography>
      <Slider {...settings}>
        {items.map((item) => (
          <Box key={item.id} sx={{ textAlign: "center", padding: 2 }}>
            {/* <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
            /> */}
            <Typography variant="h5" mt={2}>
              {item.title}
            </Typography>
            <Typography variant="body1" mt={1}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default CarouselSlider;
