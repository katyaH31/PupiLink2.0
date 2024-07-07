import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Pupi_Card from "./Pupi_Card";
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

interface Pupi_card_gridProps {
  filters: {
    city: string;
    minPrice: number | null;
    maxPrice: number | null;
    type: string;
  };
}

export default function Pupi_card_grid({ filters }: Pupi_card_gridProps) {
  const [lodgings, setLodgings] = useState<Lodging[]>([]);
  const [locations, setLocations] = useState<Record<string, Location>>({});

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        const records = await pb.collection('lodging').getFullList<Lodging>({
          sort: '-created',
        });
        setLodgings(records);
      } catch (error) {
        console.error('Error fetching lodgings:', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const locationRecords = await pb.collection('location').getFullList<Location>({
          sort: '-created',
        });
        const locationDict: Record<string, Location> = {};
        locationRecords.forEach(location => {
          locationDict[location.id] = location;
        });
        setLocations(locationDict);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLodgings();
    fetchLocations();
  }, []);

  const filteredLodgings = lodgings.filter(lodging => {
    if (filters.city && locations[lodging.location]?.name !== filters.city) {
      return false;
    }
    if (filters.minPrice !== null && lodging.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && lodging.price > filters.maxPrice) {
      return false;
    }
    if (filters.type && lodging.type !== filters.type) {
      return false;
    }
    return true;
  });

  return (
    <Box sx={{ display: "flex", width: '100%', padding: 3 }}>
      <Grid container spacing={3}>
        {filteredLodgings.map((lodging) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={lodging.id}>
            <Pupi_Card lodging={lodging} location={locations[lodging.location]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

