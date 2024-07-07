import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, CardActionArea } from "@mui/material";
import pb from "../../server/Connection";

interface Lodging {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  available: string;
  coexistenceRules: string;
  owner: string;
  location: string; // this would be the id of the location
  extras: string[];
  image: string;
}

interface Location {
  id: string;
  name: string;
  zoneId: string;
  latitude: string;
  longitude: string;
  description: string;
}

interface Pupi_CardsProps {
  lodging: Lodging;
  location: Location;
}

export default function Pupi_Card({ lodging, location }: Pupi_CardsProps) {
  // Construye la URL completa de la imagen usando pb.files.getUrl
  const imageUrl = pb.files.getUrl(lodging, lodging.image);

  return (
    <Card sx={{ maxWidth: 310 }}>
      <CardActionArea>
        <Box sx={{ height: 200, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            image={imageUrl}
            alt="image"
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <HomeIcon sx={{ fontSize: "20px", marginRight: "0.5rem" }} />
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "Barlow Condensed",
                fontWeight: "bold",
                textAlign: "left",
                color: "#686D76"
              }}
            >
              {lodging.title}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <LocationOnIcon sx={{ fontSize: "20px", marginRight: "0.5rem" }} />
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "Barlow Condensed",
                fontWeight: "bold",
                textAlign: "left",
                color: "#686D76"
              }}
            >
              {location?.name || 'Ubicación desconocida'}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon sx={{ fontSize: "20px", marginRight: "0.5rem" }} />
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "Barlow Condensed",
                fontWeight: "bold",
                textAlign: "left",
                color: "#686D76"
              }}
            >
              {lodging.price}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
