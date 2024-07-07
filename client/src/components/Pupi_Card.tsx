import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, CardActionArea, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PupilinkRoutes from "../enums/PupilinkRoutes";
import pb from "../server/Connection";

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
  const navigate = useNavigate();

  // Construye la URL completa de la imagen usando pb.files.getUrl
  const imageUrl = pb.files.getUrl(lodging, lodging.image);

  return (
    <Card
      sx={{ maxWidth: 310 }}
      onClick={() =>
        navigate(PupilinkRoutes.LODGING_DETAILS.replace(":id", lodging.id))
      }
    >
      <CardActionArea>
        <Box sx={{ height: 200, overflow: "hidden" }}>
          <CardMedia
            component="img"
            sx={{ height: "100%", width: "100%", objectFit: "cover" }}
            image={imageUrl}
            alt="image"
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HomeIcon sx={{ fontSize: "20px" }} />
            <Tooltip title={lodging.title}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "Barlow Condensed",
                  fontWeight: "bold",
                  textAlign: "left",
                  marginInlineStart: "0.5rem",
                  color: "#686D76",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "90%",
                }}
              >
                {lodging.title}
              </Typography>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            <Tooltip title={location?.name || "Ubicación desconocida"}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "Barlow Condensed",
                  fontWeight: "bold",
                  textAlign: "left",
                  marginInlineStart: "0.5rem",
                  color: "#686D76",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "90%",
                }}
              >
                {location?.name || "Ubicación desconocida"}
              </Typography>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon sx={{ fontSize: "25px" }} />
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "Barlow Condensed",
                fontWeight: "bold",
                textAlign: "left",
                marginInlineStart: "0.5rem",
                color: "#686D76",
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
