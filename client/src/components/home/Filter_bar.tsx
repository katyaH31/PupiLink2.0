import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    city: string;
    minPrice: number | null;
    maxPrice: number | null;
    type: string;
  }) => void;
}

const Filter_bar: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [city, setCity] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [type, setType] = useState<string>("");

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
        display: "flex",
        flexDirection: "column",
        marginBlockStart: "1.5rem",
        gap: 2,
        alignItems: "center",
      }}
      onSubmit={handleFilterChange}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormControl sx={{ minWidth: { xs: 200, md: 300 }, flex: 1 }}>
          <TextField
            label="Precio Mínimo"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <AttachMoneyIcon sx={{ mr: 1, color: "#686D76" }} />
              ),
            }}
            value={minPrice !== null ? minPrice : ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseInt(e.target.value) : null)
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: { xs: 200, md: 300 }, flex: 1 }}>
          <TextField
            label="Precio Máximo"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <AttachMoneyIcon sx={{ mr: 1, color: "#686D76" }} />
              ),
            }}
            value={maxPrice !== null ? maxPrice : ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value) : null)
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: { xs: 200, md: 300 }, flex: 1 }}>
          <InputLabel id="type-select-label">Tipo de lugar</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            label="Tipo de lugar"
            value={type}
            onChange={(e) => setType(e.target.value)}
            startAdornment={<HomeIcon sx={{ mr: 1, color: "#686D76" }} />}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="APARTMENT">Apartamento</MenuItem>
            <MenuItem value="STUDIO">Estudio</MenuItem>
            <MenuItem value="HOUSE">Casa</MenuItem>
            <MenuItem value="ROOM">Habitación</MenuItem>
            <MenuItem value="STUDENT_RESIDENCE">Residencia estudiantil</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        sx={{
          background: "#865DFF",
          borderRadius: "5rem",
          width: { xs: "15rem", md: "20rem" },
          fontSize: { xs: "16px", md: "20px" },
          "&:hover": { bgcolor: "#571FFF" },
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
