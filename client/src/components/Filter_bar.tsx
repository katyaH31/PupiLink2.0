import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";

const Filter_bar: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "2rem",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel
            id="city-select-label"
            sx={{ fontFamily: "Barlow Condensed", fontSize: "20px" }}
          >
            Ciudad
          </InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            label="Ciudad"
            startAdornment={
              <LocationCityIcon sx={{ mr: 1, color: "#686D76" }} />
            }
          >
            <MenuItem> La Libertad</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Precio Mínimo"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            startAdornment: (
              <AttachMoneyIcon sx={{ mr: 1, color: "#686D76" }} />
            ),
          }}
        />
        <TextField
          label="Precio Máximo"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            startAdornment: (
              <AttachMoneyIcon sx={{ mr: 1, color: "#686D76" }} />
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="type-select-label">Tipo de lugar</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            label="Tipo de lugar"
            startAdornment={<HomeIcon sx={{ mr: 1, color: "#686D76" }} />}
          >
            <MenuItem>APARTMENT</MenuItem>
            <MenuItem>STUDIO</MenuItem>
            <MenuItem>HOUSE</MenuItem>
            <MenuItem>ROOM</MenuItem>
            <MenuItem>STUDENT_RESIDENCE</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        sx={{
          background: "#865DFF",
          borderRadius: "5rem",
          width: "20rem",
          fontSize: "20px",
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
