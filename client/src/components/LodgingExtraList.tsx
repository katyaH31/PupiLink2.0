import ChairIcon from "@mui/icons-material/Chair";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import PetsIcon from "@mui/icons-material/Pets";
import SecurityIcon from "@mui/icons-material/Security";
import TvIcon from "@mui/icons-material/Tv";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import { Box, SxProps, Typography } from "@mui/material";
import SprayBottleIcon from "../assets/sprayBottle.svg";
import ToiletIcon from "../assets/toilet.svg";
import LodgingExtras from "../models/LodgingExtras";

interface Props {
  extras: LodgingExtras;
}

const extraTitleStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  fontSize: "1.5rem",
  fontWeight: "500",
  color: "#686D76",
  ml: "5px",
};

const extraChildBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #865DFF",
  borderRadius: "0.5rem",
  padding: "0rem 0.5rem",
  bgcolor: "#ffffff",
  minWidth: "15vw",
};

const numericInputStyle: SxProps = {
  borderTopRightRadius: "0.5rem",
  borderLeft: "1px solid #865DFF",
  borderBottomRightRadius: "0.5rem",
  height: "100%",
  ml: "5px",
  fontFamily: "Barlow Condensed, Arial",
  fontSize: "1.5rem",
  fontWeight: "500",
  color: "#686D76",
  pl: "8px",
};

const LodgingExtraList = (props: Props) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} sx={{ gap: 1, mt: 1 }}>
      {!!props.extras.internet && (
        <Box sx={extraChildBoxStyle}>
          <WifiOutlinedIcon sx={{ color: "#865DFF" }} />
          <Typography sx={{ ...extraTitleStyle, flexGrow: 1 }}>Velocidad de internet</Typography>
          <Typography sx={numericInputStyle}>
            {props.extras.internet}
          </Typography>
        </Box>
      )}
      {!!props.extras.rooms && (
        <Box sx={extraChildBoxStyle}>
          <HotelIcon sx={{ color: "#865DFF" }} />
          <Typography sx={{ ...extraTitleStyle, flexGrow: 1 }}>Habitaciones</Typography>
          <Typography sx={numericInputStyle}>{props.extras.rooms}</Typography>
        </Box>
      )}
      {!!props.extras.bathrooms && (
        <Box sx={extraChildBoxStyle}>
          <Box
            component={"img"}
            src={ToiletIcon}
            alt="Toilet icon"
            sx={{ width: "18px", height: "18px" }}
          />
          <Typography sx={{ ...extraTitleStyle, flexGrow: 1 }}>
            Baños
          </Typography>
          <Typography sx={numericInputStyle}>
            {props.extras.bathrooms}
          </Typography>
        </Box>
      )}
      {props.extras.petFriendly && (
        <Box sx={extraChildBoxStyle}>
          <PetsIcon sx={{ color: "#865DFF" }} />
          <Typography sx={extraTitleStyle}>Mascotas</Typography>
        </Box>
      )}
      {props.extras.commonAreas && (
        <Box sx={extraChildBoxStyle}>
        <ChairIcon sx={{ color: "#865DFF" }} />
        <Typography sx={extraTitleStyle}>Sala Compartida</Typography>
      </Box>
      )}
      {props.extras.yard && (
        <Box sx={extraChildBoxStyle}>
        <LocalFloristIcon sx={{ color: "#865DFF" }} />
        <Typography sx={extraTitleStyle}>Jardín</Typography>
      </Box>
      )}
      {props.extras.cleaningService && (
        <Box sx={extraChildBoxStyle}>
        <Box
          component={"img"}
          src={SprayBottleIcon}
          alt="toilet icon"
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
        <Typography sx={extraTitleStyle}>Servicio de limpieza</Typography>
      </Box>
      )}
      {props.extras.satelliteTV && (
        <Box sx={extraChildBoxStyle}>
          <TvIcon sx={{ color: "#865DFF" }} />
          <Typography sx={extraTitleStyle}>TV Satelital</Typography>
        </Box>
      )}
      {props.extras.laundryService && (
        <Box sx={extraChildBoxStyle}>
        <LocalLaundryServiceIcon sx={{ color: "#865DFF" }} />
        <Typography sx={extraTitleStyle}>Lavandería</Typography>
      </Box>
      )}
      {props.extras.parkingLot && (
        <Box sx={extraChildBoxStyle}>
        <DirectionsCarIcon sx={{ color: "#865DFF" }} />
        <Typography sx={extraTitleStyle}>Estacionamiento</Typography>
      </Box>
      )}
      {props.extras.privateSecurity && (
        <Box sx={extraChildBoxStyle}>
        <SecurityIcon sx={{ color: "#865DFF" }} />
        <Typography sx={extraTitleStyle}>Seguridad privada</Typography>
      </Box>
      )}
    </Box>
  );
};

export default LodgingExtraList;
