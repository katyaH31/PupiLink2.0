import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Pupi_card_grid from '../components/home/Pupi_card_grid';
import Filter_bar from '../components/home/Filter_bar';
import { Box, Typography } from "@mui/material";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="text-center">
        <Box sx={{ marginBottom: 4 }}>
          <Typography sx={{ fontSize: "30px", fontFamily: "Barlow Condensed" }}>
            ¿Buscas pupilaje? <span style={{ color: "#724DFF", fontWeight: "bold" }}>cuenta con nosotros</span>
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










