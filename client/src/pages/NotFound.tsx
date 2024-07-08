import { Box, Button, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useNavigate } from "react-router-dom";
import PupilinkRoutes from "../enums/PupilinkRoutes";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(PupilinkRoutes.ROOT);
  };

  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "4rem", sm: "5rem", md: "7rem" },
            fontWeight: "bold",
            color: "#865DFF",
          }}
        >
          4
        </Typography>
        <PlaceIcon
          sx={{
            width: { xs: "4rem", sm: "5rem", md: "7rem" },
            height: { xs: "4rem", sm: "5rem", md: "7rem" },
            color: "black",
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "4rem", sm: "5rem", md: "7rem" },
            fontWeight: "bold",
            color: "#865DFF",
          }}
        >
          4
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: "bold",
          color: "black",
          mt: 2,
        }}
      >
        Ooops! Página no encontrada
      </Typography>
      <Button
        onClick={goHome}
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          bgcolor: "#865DFF",
          '&:hover': { bgcolor: "#571FFF" },
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
        }}
      >
        Ir al inicio
      </Button>
    </Box>
  );
};

export default NotFound;