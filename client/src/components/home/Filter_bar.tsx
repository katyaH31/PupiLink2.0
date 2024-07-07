import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';

interface FilterProps {
  onFilterChange: (filters: {
    city: string;
    minPrice: number | null;
    maxPrice: number | null;
    type: string;
  }) => void;
}

const Filter_bar: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [city, setCity] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [type, setType] = useState<string>('');

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      city,
      minPrice,
      maxPrice,
      type,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '2rem',
        gap: 2,
        alignItems: 'center',
      }}
      onSubmit={handleFilterChange}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel
            id="city-select-label"
            sx={{ fontFamily: 'Barlow Condensed', fontSize: '20px' }}
          >
            Ciudad
          </InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            label="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            startAdornment={<LocationCityIcon sx={{ mr: 1, color: '#686D76' }} />}
          >
            <MenuItem value="La Libertad">La Libertad</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Precio Mínimo"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: '#686D76' }} />,
          }}
          value={minPrice !== null ? minPrice : ''}
          onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : null)}
        />
        <TextField
          label="Precio Máximo"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: '#686D76' }} />,
          }}
          value={maxPrice !== null ? maxPrice : ''}
          onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : null)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="type-select-label">Tipo de lugar</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            label="Tipo de lugar"
            value={type}
            onChange={(e) => setType(e.target.value)}
            startAdornment={<HomeIcon sx={{ mr: 1, color: '#686D76' }} />}
          >
            <MenuItem value="APARTMENT">APARTMENT</MenuItem>
            <MenuItem value="STUDIO">STUDIO</MenuItem>
            <MenuItem value="HOUSE">HOUSE</MenuItem>
            <MenuItem value="ROOM">ROOM</MenuItem>
            <MenuItem value="STUDENT_RESIDENCE">STUDENT_RESIDENCE</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        sx={{
          background: '#865DFF',
          borderRadius: '5rem',
          width: '20rem',
          fontSize: '20px',
          '&:hover': { bgcolor: '#571FFF' },
        }}
        startIcon={<ScreenSearchDesktopIcon />}
        type="submit"
      >
        Buscar pupilajes
      </Button>
    </Box>
  );
};

export default Filter_bar;

