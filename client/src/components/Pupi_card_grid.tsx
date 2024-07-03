import { Box, Grid} from "@mui/material";
import Pupi_Cards from "./Pupi_Card";

export default function Pupi_card_grid() {
    const numberOfCards = 12; //Define de number of cards
  return (
    <Box sx={{display:"flex", width: '100%', padding: 3}}>
      <Grid container spacing={3}>
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Pupi_Cards/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}