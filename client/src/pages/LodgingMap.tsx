import { Box } from "@mui/material";
import React from "react";
import Pupi_card_grid from "../components/home/Pupi_card_grid";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import pb from "../server/Connection";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Pupi_card_map_select from "../components/Pupi_card_map_select";

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
  location: string;
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

const LodgingMap: React.FC = () => {
  const [lodgings, setLodgings] = useState<Lodging[]>([]);
  const [locations, setLocations] = useState<{ [key: string]: Location }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        if (!pb.authStore.isValid) {
          throw new Error("User not authenticated");
        }

        const records = await pb.collection("lodging").getFullList<Lodging>({
          sort: "-created",
          $autoCancel: false,
        });

        console.log("Lodgings fetched:", records);

        const locationIds = [
          ...new Set(
            records.map((lodging) => lodging.location).filter((id) => id)
          ),
        ];
        console.log("Unique location IDs:", locationIds);

        const locationData = await Promise.all(
          locationIds.map((id) => {
            console.log("Fetching location ID:", id);
            return pb
              .collection("location")
              .getOne<Location>(id, { $autoCancel: false });
          })
        );

        const locationDict: { [key: string]: Location } = {};
        locationData.forEach((location) => {
          locationDict[location.id] = location;
        });

        setLocations(locationDict);
        setLodgings(records);
      } catch (error: unknown) {
        console.error("Error fetching lodgings or locations:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchLodgings();
  }, []);

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
          {lodgings.map((lodging) => {
            const imageUrl = pb.files.getUrl(lodging, lodging.image);
            const location = locations[lodging.location];
            if (!location) return null;
            const position = [location.latitude, location.longitude];
            return (
              <Marker
                position={position}
                key={lodging.id}
                icon={L.icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowUrl: markerShadowPng,
                  shadowSize: [41, 41],
                })}
              >
                <Popup>
                  <Pupi_card_map_select
                    lodging={lodging}
                    location={locations[lodging.location]}
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};
export default LodgingMap;
