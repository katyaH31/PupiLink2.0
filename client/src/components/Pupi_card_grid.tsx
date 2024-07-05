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

export default function Pupi_card_grid() {
  const [lodgings, setLodgings] = useState<Lodging[]>([]);
  const [locations, setLocations] = useState<{ [key: string]: Location }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        if (!pb.authStore.isValid) {
          throw new Error('User not authenticated');
        }

        const records = await pb.collection('lodging').getFullList<Lodging>({
          sort: '-created',
          $autoCancel: false, 
        });

        
        console.log('Lodgings fetched:', records);

     
        const locationIds = [...new Set(records.map(lodging => lodging.location).filter(id => id))];
        console.log('Unique location IDs:', locationIds);

     
        const locationData = await Promise.all(locationIds.map(id => {
          console.log('Fetching location ID:', id);
          return pb.collection('location').getOne<Location>(id, { $autoCancel: false });
        }));

        
        const locationDict: { [key: string]: Location } = {};
        locationData.forEach(location => {
          locationDict[location.id] = location;
        });

        setLocations(locationDict);
        setLodgings(records);
      } catch (error: unknown) {
        console.error('Error fetching lodgings or locations:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchLodgings();
  }, []);

  return (
    <Box sx={{ display: "flex", width: '100%', padding: 3 }}>
      {error && <p>Error: {error}</p>}
      <Grid container spacing={3}>
        {lodgings.map((lodging) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={lodging.id}>
            <Pupi_Card lodging={lodging} location={locations[lodging.location]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}