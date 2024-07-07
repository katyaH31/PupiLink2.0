import {
  Box,
  Button,
  Divider,
  Grid,
  sliderClasses,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import Lodging from "../models/Lodging";
import LodgingType from "../enums/LodgingType";
import LodgingStatus from "../enums/LodgingStatus";
import { useEffect, useState } from "react";
import LodgingExtraList from "../components/LodgingExtraList";
import ContractExample from "../assets/ejemplo_contrato.svg";
import ReservationIcon from "../assets/reservation.svg";
import LodgingService from "../services/LodgingService";
import { useParams } from "react-router-dom";

const MOCK: Lodging = {
  id: "1",
  created: new Date(),
  updated: new Date(),
  title: "Habitacion Estudiantil",
  description:
    "Amplia habitacion de 12 m2 equipada con cama nueva la de la foto no actualizada, mesita de noche, escritorio, silla y armario. La habitacion tiene un balcon de 2 m2 con una vista muy bonita desde el octavo piso. Tambien cuenta con ventanas nuevas de doble acristalamiento y puertas nuevas que no se muestran en las fotos.",
  type: LodgingType.ROOM,
  status: LodgingStatus.AVAILABLE,
  price: 10,
  available: new Date(),
  coexistenceRules:
    "1. Prohibido lastimar a otros \n2. Prohibido fumar \n3.Recoge las necesidades de tu mascota \n4.No traigas pareja pasadas las 11pm \n5.No se permiten fiestas ",
  image:
    "https://www.build-review.com/wp-content/uploads/2023/10/Simple-and-bright-room-for-a-student-in-a-student-dormitory-1568x882.jpg",
  expand: {
    extras: {
      id: "2",
      created: new Date(),
      updated: new Date(),
      internet: 80,
      rooms: 1,
      bathrooms: 1,
      satelliteTV: true,
      cleaningService: true,
      laundryService: true,
      privateSecurity: true,
      commonAreas: true,
      yard: true,
      parkingLot: true,
      petFriendly: true,
    },
  },
};

const titleStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  mt: 1,
  fontSize: "1.25rem",
  fontWeight: "500",
  color: "#686D76",
};

const descriptionStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  fontSize: "1rem",
  fontWeight: "400",
  color: "#686D76",
};

const dividerStyle: SxProps = {
  border: "1px solid #686D76",
  width: "100%",
};

const LodgingDetails = () => {
  const { id } = useParams();

  const [lodging, setLodging] = useState(MOCK);
  useEffect(() => {
    if (id) {
      LodgingService.getLodging(id).then((lodging) => setLodging(lodging));
    }
  }, [id]);
  return (
    <Grid sx={{ bgcolor: "#F5F5F5" }} container spacing={1}>
      <Grid item xs={5} sx={{maxHeight: "30rem"}}>
        <Box
          component={"img"}
          alt="lodging image"
          sx={{
            width: "95%",
            height: "95%",
            borderRadius: "10px",
            objectFit: "cover",
            marginInline: "auto",
            mt: "1.25rem",
          }}
          src={lodging.image}
        />
      </Grid>
      <Grid item xs={7} sx={{maxHeight: "30rem"}}>
        <Typography
          sx={{
            fontFamily: "Barlow Condensed, Arial",
            mt: 1,
            fontSize: "2rem",
            fontWeight: "500",
            color: "#686D76",
          }}
        >
          {lodging.title}
        </Typography>
        <Stack
          sx={{
            bgcolor: "#dcdce8",
            borderRadius: "10px",
            width: "95%",
            p: 2,
            pt: 0,
            minHeight: "26rem",
          }}
        >
          <Stack>
            <Typography sx={titleStyle}>Descripción</Typography>
            <Divider sx={dividerStyle} />
            <Typography sx={descriptionStyle}>{lodging.description}</Typography>
          </Stack>
          <Stack>
            <Typography sx={titleStyle}>Extras incluidos</Typography>
            <Divider sx={dividerStyle} />
            {lodging.expand?.extras && (
              <LodgingExtraList extras={lodging.expand!.extras!} />
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <Typography
            sx={{
              fontFamily: "Barlow Condensed, Arial",
              mt: 1,
              fontSize: "2rem",
              fontWeight: "500",
              color: "#686D76",
              marginLeft: "1%",
            }}
          >
            Reglas de Convivencia
          </Typography>
          <Stack
            sx={{
              bgcolor: "#dcdce8",
              borderRadius: "10px",
              width: "96.5%",
              height: "auto",
              p: 2,
              marginLeft: "1%",
            }}
          >
            <Box component={"pre"}>
              <Typography sx={descriptionStyle}>
                {lodging.coexistenceRules}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontFamily: "Barlow Condensed, Arial",
            mt: 1,
            fontSize: "2rem",
            fontWeight: "500",
            color: "#686D76",
            marginLeft: "1%",
          }}
        >
          Sobre Contrato
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            bgcolor: "#dcdce8",
            borderRadius: "10px",
            width: "96.5%",
            height: "auto",
            p: 2,
            marginLeft: "1%",
            justifyContent: "space-between",
          }}
        >
          <Stack sx={{ width: "45%" }}>
            <Typography sx={titleStyle}>Mensual</Typography>
            <Typography sx={descriptionStyle}>
              Para poder realizar cualquier acción en el lugar, es necesario
              haber cancelado la cuota mensual correspondiente y acordado
              previamente una fecha de mudanza. Es importante tener en cuenta
              que el contrato se renueva de manera mensual y, por lo tanto, se
              requiere el cumplimiento de estos dos requisitos antes de proceder
              con cualquier actividad en el lugar. Esto garantiza una gestión
              adecuada y la transparencia en las relaciones contractuales,
              asegurando que ambas partes cumplan con sus compromisos acordados.
            </Typography>
          </Stack>
          <Stack sx={{ width: "40%" }}>
            <Typography sx={titleStyle}>Ejemplos</Typography>
            <Box display={"flex"} flexWrap={"wrap"}>
              <Box>
                <Typography sx={descriptionStyle}>
                  Si la mudanza acordada es el día 20
                </Typography>
                <Typography sx={descriptionStyle}>
                  El contrato inicia ese mismo día
                </Typography>
              </Box>
              <Box sx={{ ml: "2rem" }}>
                <Typography sx={descriptionStyle}>
                  Si la mudanza acordada es el día 15
                </Typography>
                <Typography sx={descriptionStyle}>
                  El contrato finaliza el día 15 del siguiente mes
                </Typography>
              </Box>
            </Box>
            <Box
              component={"img"}
              alt="contract example"
              src={ContractExample}
              sx={{ width: "90%", height: "auto", mt: 1 }}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          sx={{
            background: "#865DFF",
            borderRadius: "5rem",
            width: "20rem",
            fontSize: "20px",
            "&:hover": { bgcolor: "#571FFF" },
            my: 5,
          }}
          startIcon={
            <Box
              component={"img"}
              src={ReservationIcon}
              alt="reservation icon"
              sx={{ width: "1.5rem", height: "auto" }}
            />
          }
          type="submit"
        >
          Solicitar Reserva
        </Button>
      </Grid>
    </Grid>
  );
};

export default LodgingDetails;
