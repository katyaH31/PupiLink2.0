import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, CardActionArea } from "@mui/material";
export default function Pupi_Cards() {
  return (
    <Card sx={{ maxWidth: 310 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://cdn-static-new.uniplaces.com/property-photos/6b632e978454153a2a9790862f8e0af166ef9f7098c04181682f996027e67d7d/x-large.jpg"
          alt="image"
        />
        <CardContent>
          <Box sx={{ display:"flex", alignItems:"center"}}>
            <HomeIcon   sx={{fontSize:"20px"}} />
            <Typography
                sx={{ fontSize: "18px",
                    fontFamily:"Barlow Condensed", 
                    fontWeight: "bold",
                    textAlign:"left", 
                    marginInlineStart:"0.5rem",
                    color:"#686D76"}}
            >
              Habitación
            </Typography>
          </Box>

          <Box sx={{display:"flex", alignItems:"center"}}>
            <LocationOnIcon sx={{fontSize:"20px"}} />
            <Typography
                 sx={{ fontSize: "18px",
                    fontFamily:"Barlow Condensed", 
                    fontWeight: "bold",
                    textAlign:"left", 
                    marginInlineStart:"0.5rem",
                    color:"#686D76"}}
            >
              Colonia Loma Linda, Santa Tecla, La Libertad
            </Typography>
          </Box>

          <Box sx={{display:"flex", alignItems:"center"}}>
            <AttachMoneyIcon sx={{fontSize:"30px"}} />
            <Typography
                 sx={{ fontSize: "20px",
                    fontFamily:"Barlow Condensed", 
                    fontWeight: "bold",
                    textAlign:"left", 
                    marginInlineStart:"0.5rem",
                    color:"#686D76"}}
            >
              325
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}