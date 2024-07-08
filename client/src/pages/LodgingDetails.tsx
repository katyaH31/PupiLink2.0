import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LuggageIcon from "@mui/icons-material/Luggage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReservationIcon from "../assets/reservation.svg";
import LodgingExtraList from "../components/LodgingExtraList";
import LodgingStatus from "../enums/LodgingStatus";
import LodgingType from "../enums/LodgingType";
import PupilinkRoutes from "../enums/PupilinkRoutes";
import Lodging from "../models/Lodging";
import LodginRequestService from "../services/LodgingRequestService";
import LodgingService from "../services/LodgingService";
import LodgingUtils from "../utils/LodgingUtils";
import moment from "moment";
import "moment/locale/es";
import { toast } from "react-toastify";
import NavbarUser from "../components/NavbarUser";

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
  fontSize: { xs: "1rem", md: "1.25rem" },
  fontWeight: "500",
  color: "#686D76",
};

const descriptionStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  fontSize: { xs: "0.875rem", md: "1rem" },
  fontWeight: "400",
  color: "#686D76",
};

const dividerStyle: SxProps = {
  border: "1px solid #686D76",
  width: "100%",
};

moment.locale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

const LodgingDetails = () => {
  const [lodging, setLodging] = useState(MOCK);
  const [proposedPrice, setProposedPrice] = useState<number | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReservation = async () => {
    if (!proposedPrice) {
      toast("Por favor, proporcione un precio");
      return;
    }

    LodginRequestService.requestLodging({
      proposedPrice: proposedPrice!,
      lodging: id!,
    })
      .then(() => {
        toast("Solicitud realizada con éxito");
        navigate(PupilinkRoutes.ROOT);
      })
      .catch(() => {
        toast("No puede solicitar una reserva más de una vez");
      });
  };

  useEffect(() => {
    if (id) {
      LodgingService.getLodging(id).then((lodging) => setLodging(lodging));
    }
  }, [id]);

  useEffect(() => {
    setProposedPrice(lodging.price);
  }, [lodging]);

  return (
    <>
      <Grid container spacing={2} sx={{ bgcolor: "#F5F5F5", pt: { xs: 8, md: 10 } }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            maxHeight: "30rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            alt="lodging image"
            sx={{
              width: { xs: "80%", md: "80%" },
              height: { xs: "auto", md: "80%" },
              borderRadius: "10px",
              objectFit: "cover",
              marginInline: "auto",
              mt: { xs: 2, md: "1.25rem" },
              maxHeight: "31rem",
            }}
            src={lodging.image}
          />
        </Grid>
        <Grid item xs={12} md={7} sx={{ maxHeight: "40rem", p: { xs: 2, md: 0 } }}>
          <Typography
            sx={{
              fontFamily: "Barlow Condensed, Arial",
              mt: 1,
              fontSize: { xs: "1.5rem", md: "2rem" },
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
              width: "100%",
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
            <Stack>
              <Typography sx={titleStyle}>Sobre el arrendamiento</Typography>
              <Divider sx={dividerStyle} />
              <Box display={"flex"} sx={{ mt: "5px" }}>
                <HomeIcon sx={{ color: "#686D76", mr: 1 }} />
                <Typography sx={descriptionStyle}>
                  {LodgingUtils.getReadableType(lodging.type)}
                </Typography>
              </Box>
              <Box display={"flex"}>
                <PlaceIcon sx={{ color: "#686D76", mr: 1 }} />
                <Typography sx={descriptionStyle}>
                  {lodging.expand?.location?.description}
                </Typography>
              </Box>
            </Stack>
            <Stack>
              <Typography sx={titleStyle}>Detalles de precio</Typography>
              <Divider sx={dividerStyle} />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                minWidth={"300px"}
              >
                <Stack>
                  <Typography sx={{ ...descriptionStyle, fontWeight: "700" }}>
                    Precio de alquiler
                  </Typography>
                  <Typography sx={descriptionStyle}>Pago por mes</Typography>
                </Stack>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{ minWidth: "7rem", my: 1 }}
                >
                  <AttachMoneyIcon
                    sx={{ color: "#686D76", width: "1.25rem", ml: "0.25rem" }}
                  />
                  <Typography
                    sx={{
                      ...descriptionStyle,
                      mr: "0.25rem",
                      fontWeight: "700",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    {lodging.price}
                  </Typography>
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} my={1}>
                <Typography sx={{ ...descriptionStyle, fontWeight: "700" }}>
                  Proponé una oferta
                </Typography>
                <TextField
                  error={!proposedPrice}
                  helperText={!proposedPrice ? "Debes hacer una oferta" : ""}
                  sx={{
                    fontFamily: "Barlow Condensed, Arial",
                    maxWidth: "7rem",
                    "& *": {
                      border: "none !important",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingLeft: "0.25rem !important",
                      border: "none !important",
                      bgcolor: "#cecee4",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontFamily: "Barlow Condensed, Arial",
                      textAlign: "right",
                      color: "#686D76",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      fontWeight: "500",
                      pr: "0.25rem",
                      bgcolor: "#cecee4",
                    },
                  }}
                  inputProps={{
                    sx: {
                      fontSize: "0.88rem",
                      paddingBlock: "0.25rem",
                      bgcolor: "#dcdce8",
                    },
                  }}
                  InputProps={{
                    type: "number",
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon
                          sx={{ height: "1.75rem", width: "auto" }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button ":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    },
                  }}
                  value={proposedPrice}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setProposedPrice(null);
                      return;
                    }

                    if (!isNaN(Number(e.target.value))) {
                      setProposedPrice(Number(e.target.value));
                    }
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Stack>
            <Typography
              sx={{
                fontFamily: "Barlow Condensed, Arial",
                mt: 1,
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: "500",
                color: "#686D76",
              }}
            >
              Reglas de Convivencia
            </Typography>
            <Stack
              sx={{
                bgcolor: "#dcdce8",
                borderRadius: "10px",
                width: "100%",
                height: "auto",
                p: 2,
              }}
            >
              <Box component={"pre"}>
                <Typography sx={{ ...descriptionStyle, ml: "1.5rem" }}>
                  {lodging.coexistenceRules}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Typography
            sx={{
              fontFamily: "Barlow Condensed, Arial",
              mt: 1,
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "500",
              color: "#686D76",
            }}
          >
            Reserva
          </Typography>
          <Stack
            sx={{
              border: "1px solid #865DFF",
              borderRadius: "10px",
              width: "100%",
              p: 2,
            }}
          >
            <Typography sx={{ ...titleStyle, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              Próximos pasos
            </Typography>
            <Divider sx={{ border: "1px solid #6B7280", width: "100%", my: 2 }} />
            {/* DESPUES DE ENVIAR SOLICITUD */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, md: 0 }}
            >
              <AccessTimeIcon
                sx={{
                  color: "#865DFF",
                  width: "4rem",
                  height: "4rem",
                  ml: "2.5rem",
                }}
              />
              <Stack width={{ xs: "100%", md: "20%" }}>
                <Typography
                  sx={{
                    ...descriptionStyle,
                    fontWeight: "600",
                    color: "#865DFF",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    ml: "10px",
                  }}
                >
                  1. Después de enviar la solicitud
                </Typography>
                <Typography
                  sx={{ ...descriptionStyle, fontSize: { xs: "1rem", md: "1.25rem" }, ml: "10px" }}
                >
                  ¿Qué pasa después?
                </Typography>
              </Stack>
              <Typography
                sx={{
                  ...descriptionStyle,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: { xs: "100%", md: "60%" },
                }}
              >
                Se habilitará un chat con el propietario para que puedan llegar a
                un acuerdo. El arrendador responderá en un lapso de 72 horas. Una
                vez aceptada la solicitud, puedes empezar a habitar el lugar.
              </Typography>
            </Stack>
            <Divider sx={{ border: "1px solid #6B7280", width: "100%", my: 2 }} />
            {/* AL MUDARTE */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, md: 0 }}
            >
              <LuggageIcon
                sx={{
                  color: "#865DFF",
                  width: "4rem",
                  height: "4rem",
                  ml: "2.5rem",
                }}
              />
              <Stack width={{ xs: "100%", md: "20%" }}>
                <Typography
                  sx={{
                    ...descriptionStyle,
                    fontWeight: "600",
                    color: "#865DFF",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    ml: "10px",
                  }}
                >
                  2. Al mudarte
                </Typography>
                <Typography
                  sx={{ ...descriptionStyle, fontSize: { xs: "1rem", md: "1.25rem" }, ml: "10px" }}
                >
                  {moment(lodging.available).format("Do MMM YY")}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  ...descriptionStyle,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: { xs: "100%", md: "60%" },
                }}
              >
                Tendrás 24 horas hábiles para reportar cualquier problema con el
                lugar. Te recomendamos tomar fotografías del lugar para evitar
                malentendidos y verificar que la propiedad cuente con los
                servicios acordados.
              </Typography>
            </Stack>
            <Divider sx={{ border: "1px solid #6B7280", width: "100%", my: 2 }} />
            {/* AL TERMINAR TU ESTANCIA */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, md: 0 }}
            >
              <ExitToAppIcon
                sx={{
                  color: "#865DFF",
                  width: "4rem",
                  height: "4rem",
                  ml: "2.5rem",
                }}
              />
              <Stack width={{ xs: "100%", md: "20%" }}>
                <Typography
                  sx={{
                    ...descriptionStyle,
                    fontWeight: "600",
                    color: "#865DFF",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    ml: "10px",
                  }}
                >
                  3. Al terminar tu estancia
                </Typography>
                <Typography
                  sx={{ ...descriptionStyle, fontSize: { xs: "1rem", md: "1.25rem" }, ml: "10px" }}
                >
                  {moment(lodging.available).add(1, "month").format("Do MMM YY")}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  ...descriptionStyle,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: { xs: "100%", md: "60%" },
                }}
              >
                Mantén el lugar en perfectas condiciones y respeta el tiempo de
                estancia acordado, para evitar incumplir los términos establecidos
                en la plataforma.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              background: "#865DFF",
              borderRadius: "5rem",
              width: { xs: "15rem", md: "20rem" },
              fontSize: { xs: "16px", md: "20px" },
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
            onClick={handleReservation}
          >
            Solicitar Reserva
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LodgingDetails;

