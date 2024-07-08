import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Pupi_card_grid from '../components/home/Pupi_card_grid';
import Filter_bar from '../components/home/Filter_bar';
import { Box, Typography } from "@mui/material";
import Navbar from '../components/Navbar';

interface Filters {
  city: string;
  minPrice: number | null;
  maxPrice: number | null;
  type: string;
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    city: '',
    minPrice: null,
    maxPrice: null,
    type: ''
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full">
      <Navbar />
      <div className="text-center flex flex-col items-center w-full max-w-screen-lg">
        <Box sx={{ marginTop: 8, marginBottom: 4, width: '100%' }}>
          <Typography sx={{ fontSize: { xs: "24px", md: "30px" }, fontFamily: "Barlow Condensed", fontWeight: "bold", color: '#686D76' }}>
            ¿Buscas pupilaje? <span style={{ color: "#724DFF", fontWeight: "bold" }}>¡cuenta con nosotros!</span>
          </Typography>
        </Box>
        <Filter_bar onFilterChange={handleFilterChange} />
        <Pupi_card_grid filters={filters} />
      </div>
      <ChatWindow />
    </div>
  );
};

export default Home;














