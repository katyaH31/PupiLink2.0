import pb from "../server/Connection";
import { Box, CardMedia, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Pupi_card_map_select({ lodging, location }) {
  const imageUrl = pb.files.getUrl(lodging, lodging.image);

  return (
    <Box component="div" sx={{ minWidth: 230 }}>
      <CardMedia
        component="img"
        sx={{
          height: "auto", 
          maxWidth: "100%", 
          width: 1600,  
          maxHeight: 1060, 
          objectFit: "cover" 
        }}
        image={imageUrl}
        alt="image"
      />
      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: "Barlow Condensed",
          fontWeight: "bold",
          textAlign: "left",
          color: "#686D76",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HomeIcon
          sx={{ fontSize: "25px", marginBottom: "3px", marginRight: "5px" }}
        />
        {lodging.title}
      </Typography>

      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: "Barlow Condensed",
          fontWeight: "bold",
          textAlign: "left",
          color: "#686D76",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LocationOnIcon
          sx={{ fontSize: "25px", marginBottom: "3px", marginRight: "5px" }}
        />
        {location?.description || "Ubicación desconocida"}
      </Typography>

      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: "Barlow Condensed",
          fontWeight: "bold",
          textAlign: "left",
          color: "#686D76",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AttachMoneyIcon
          sx={{ fontSize: "25px", marginBottom: "3px", marginRight: "5px" }}
        />
        {lodging.price}
      </Typography>
    </Box>
  );
}
