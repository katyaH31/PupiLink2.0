import { Box } from "@mui/material";
import React from "react";
import Pupi_card_grid from "../components/Pupi_card_grid";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const LodgingMap: React.FC = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pupi_card_grid columnsPerRow={2} />
      </Box>
      <Box
        component="div"
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
        }}
      >
        <MapContainer
          center={[13.794185, -88.89653]}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </Box>
    </Box>
  );
};
export default LodgingMap;
