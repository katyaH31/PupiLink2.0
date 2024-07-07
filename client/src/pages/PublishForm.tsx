import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChairIcon from "@mui/icons-material/Chair";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import PetsIcon from "@mui/icons-material/Pets";
import SecurityIcon from "@mui/icons-material/Security";
import TvIcon from "@mui/icons-material/Tv";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import addImageIcon from "../assets/addImage.svg";
import SprayBottleIcon from "../assets/sprayBottle.svg";
import ToiletIcon from "../assets/toilet.svg";
import LodgingStatus from "../enums/LodgingStatus";
import LodgingType from "../enums/LodgingType";

const formTitleStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  mt: 1,
  fontSize: "1.25rem",
  fontWeight: "500",
  color: "#686D76",
};

const formDescriptionStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  mt: 1,
  fontSize: "1rem",
  fontWeight: "400",
  color: "#686D76",
};

const extraTitleStyle: SxProps = {
  fontFamily: "Barlow Condensed, Arial",
  fontSize: "1rem",
  fontWeight: "400",
  color: "#686D76",
  ml: "5px",
};

const extraParentBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
};

const extraChildBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #865DFF",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  bgcolor: "#ffffff",
  minWidth: "15vw",
  maxWidth: "200px",
  mr: 5,
};

const extraCheckoutStyle: SxProps = {
  color: "#865DFF",
  "&.Mui-checked": {
    color: "#571FFF",
  },
};

const groupBoxStatusStyle: SxProps = {
  "& label > span": {
    fontFamily: "Barlow Condensed, Arial",
    fontSize: "0.85rem !important",
    color: "#686D76",
    fontWeight: "400",
    paddingInline: "0px !important",
    paddingLeft: "1px !important",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  "& .MuiFormControlLabel-label": {
    fontSize: "0.85rem !important",
  },
};

const PublishForm = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the
    console.log("acceptedFiles", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    //Grid father:
    <Grid sx={{ bgcolor: "#F5F5F5" }} container spacing={1}>
      {/*Grid child 1:*/}
      <Grid item xs={6}>
        <Stack>
          <Typography
            variant="h1"
            sx={{
              mt: 1,
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#686D76",
            }}
          >
            Formulario para agregar una nueva propiedad
          </Typography>
          <Typography sx={formTitleStyle}>Titulo</Typography>
          <Typography sx={formDescriptionStyle}>
            Agrega un título corto a tu publicación para que sea fácil de leer
            para los interesados
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ bgcolor: "#dcdce8", fontFamily: "Barlow Condensed, Arial" }}
            inputProps={{
              style: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
            }}
          />
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Descripción</Typography>
          <Typography sx={formDescriptionStyle}>
            Agrega una descripción conciza del espacio que estas dando en
            alquiler
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            multiline
            maxRows={5}
            sx={{ bgcolor: "#dcdce8", fontFamily: "Barlow Condensed, Arial" }}
            inputProps={{
              style: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
            }}
          />
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Tipo</Typography>
          <Typography sx={formDescriptionStyle}>
            Selecciona el tipo de lugar según nuestras categorias ya
            establecidas
          </Typography>
          <RadioGroup row sx={groupBoxStatusStyle}>
            <FormControlLabel
              value={LodgingType.APARTMENT}
              control={<Radio />}
              label="Apartamento"
            />
            <FormControlLabel
              value={LodgingType.STUDIO}
              control={<Radio />}
              label="Estudio"
            />
            <FormControlLabel
              value={LodgingType.HOUSE}
              control={<Radio />}
              label="Casa"
            />
            <FormControlLabel
              value={LodgingType.ROOM}
              control={<Radio />}
              label="Habitación"
            />
            <FormControlLabel
              value={LodgingType.STUDENT_RESIDENCE}
              control={<Radio />}
              label="Residencial Estudiantil"
            />
          </RadioGroup>
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Estado</Typography>
          <Typography sx={formDescriptionStyle}>
            Selecciona el estado de disponibilidad con el que cuenta actualmente
            el lugar que estas dando en alquiler
          </Typography>
          <RadioGroup row sx={groupBoxStatusStyle}>
            <FormControlLabel
              value={LodgingStatus.AVAILABLE}
              control={<Radio />}
              label="Disponible"
            />
            <FormControlLabel
              value={LodgingStatus.BOOKED}
              control={<Radio />}
              label="Reservado"
            />
            <FormControlLabel
              value={LodgingStatus.RENTED}
              control={<Radio />}
              label="Alquilado"
            />
            <FormControlLabel
              value={LodgingStatus.UNAVAILABLE}
              control={<Radio />}
              label="No Disponible"
            />
            <FormControlLabel
              value={LodgingStatus.UNDER_MAINTENANCE}
              control={<Radio />}
              label="En Mantenimiento"
            />
          </RadioGroup>
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Precio</Typography>
          <Typography sx={formDescriptionStyle}>
            Indica el precio por el cual vas a alquilar el lugar
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              sx={{
                bgcolor: "#dcdce8",
                fontFamily: "Barlow Condensed, Arial",
                "& > *": { paddingLeft: "0px !important" },
              }}
              inputProps={{
                sx: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
              }}
              InputProps={{
                type: "number",
                startAdornment: (
                  <InputAdornment
                    sx={{ color: "#865DFF", paddingLeft: "0.5rem !important" }}
                    position="start"
                  >
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Fecha de disponibilidad</Typography>
          <Typography sx={formDescriptionStyle}>
            Indica la fecha en que estara disponible el lugar que daras en
            alquiler
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DatePicker
              slots={{
                openPickerIcon: () => (
                  <CalendarMonthIcon
                    sx={{ color: "#865DFF", "&:hover": { color: "#571FFF" } }}
                  />
                ),
              }}
              slotProps={{
                inputAdornment: {
                  position: "start",
                },
                textField: {
                  size: "small",
                  sx: {
                    "& *": {
                      fontSize: "0.88rem !important",
                      paddingBlock: "0rem !important",
                    },
                    bgcolor: "#dcdce8",
                    fontFamily: "Barlow Condensed, Arial",
                    "& > *": {
                      paddingBlock: "0.25rem !important",
                    },
                  },
                },
              }}
            />
          </Box>
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Reglas de convivencia</Typography>
          <Typography sx={formDescriptionStyle}>
            En este apartado puedes indicar de manera textual algunas reglas o
            normas que quieras que los inquilinos sepan si es que desean mudarse
            al lugar que estas dando en alquiler
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            multiline
            maxRows={5}
            sx={{ bgcolor: "#dcdce8", fontFamily: "Barlow Condensed, Arial" }}
            inputProps={{
              style: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
            }}
          />
        </Stack>
        <Stack>
          <Typography sx={formTitleStyle}>Dirección</Typography>
          <Typography sx={formDescriptionStyle}>
            En la siguiente seccion coloque la dirección exacta del lugar que
            esta dando en alquiler
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            multiline
            maxRows={5}
            sx={{ bgcolor: "#dcdce8", fontFamily: "Barlow Condensed, Arial" }}
            inputProps={{
              style: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
            }}
          />
        </Stack>
      </Grid>
      {/*Grid child 2:*/}
      <Grid item xs={6}>
        <Box sx={{ display: "flex", gap: 1, height: "100%" }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              border: "1px solid #686D76",
              height: "100% !important",
              marginBlock: "auto",
            }}
          />

          {/*Extras:*/}
          <Stack>
            <Typography sx={formTitleStyle}>Extras</Typography>
            <Typography sx={formDescriptionStyle}>
              A continuación se presentan una lista de servicios básicos con los
              que se espera que cuente el lugar que esta dando en alquiler,
              marca las casillas correspondientes a los servicios con los que
              cuenta tu lugar
            </Typography>
            <Box display={"flex"} flexWrap={"wrap"}>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <PetsIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>Mascotas</Typography>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <ChairIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>Sala Compartida</Typography>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <LocalFloristIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>Jardín</Typography>
                </Box>
                <Box sx={extraParentBoxStyle}>
                  <Checkbox sx={extraCheckoutStyle} />
                  <Box sx={extraChildBoxStyle}>
                    <Box
                      component={"img"}
                      src={SprayBottleIcon}
                      alt="toilet icon"
                      sx={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <Typography sx={extraTitleStyle}>
                      Servicio de limpieza
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <TvIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>TV Satelital</Typography>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <LocalLaundryServiceIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>Lavanderia</Typography>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <DirectionsCarIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>Estacionamiento</Typography>
                </Box>
              </Box>
              <Box sx={extraParentBoxStyle}>
                <Checkbox sx={extraCheckoutStyle} />
                <Box sx={extraChildBoxStyle}>
                  <SecurityIcon sx={{ color: "#865DFF" }} />
                  <Typography sx={extraTitleStyle}>
                    Seguridad Privada
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Stack>
              {/* Numeric extras: */}
              <Stack>
                <Typography sx={formTitleStyle}>
                  Velocidad de internet
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      bgcolor: "#dcdce8",
                      fontFamily: "Barlow Condensed, Arial",
                      "& > *": { paddingLeft: "0px !important" },
                    }}
                    inputProps={{
                      sx: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
                    }}
                    InputProps={{
                      type: "number",
                      startAdornment: (
                        <InputAdornment
                          sx={{
                            color: "#865DFF",
                            paddingLeft: "0.5rem !important",
                          }}
                          position="start"
                        >
                          <WifiOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>
              <Stack>
                <Typography sx={formTitleStyle}>
                  Cantidad de habitaciones
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      bgcolor: "#dcdce8",
                      fontFamily: "Barlow Condensed, Arial",
                      "& > *": { paddingLeft: "0px !important" },
                    }}
                    inputProps={{
                      sx: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
                    }}
                    InputProps={{
                      type: "number",
                      startAdornment: (
                        <InputAdornment
                          sx={{
                            color: "#865DFF",
                            paddingLeft: "0.5rem !important",
                          }}
                          position="start"
                        >
                          <HotelIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>
              <Stack>
                <Typography sx={formTitleStyle}>Cantidad de baños</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      bgcolor: "#dcdce8",
                      fontFamily: "Barlow Condensed, Arial",
                      "& > *": { paddingLeft: "0px !important" },
                    }}
                    inputProps={{
                      sx: { fontSize: "0.88rem", paddingBlock: "0.25rem" },
                    }}
                    InputProps={{
                      type: "number",
                      startAdornment: (
                        <InputAdornment
                          sx={{
                            color: "#865DFF",
                            paddingLeft: "0.5rem !important",
                          }}
                          position="start"
                        >
                          <Box
                            component={"img"}
                            src={ToiletIcon}
                            alt="Toilet icon"
                            sx={{ width: "18px", height: "18px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
            <Stack>
              <Typography sx={formTitleStyle}>Fotografia del lugar</Typography>
              <Typography sx={formDescriptionStyle}>
                Coloca una fotografía que muestre el mejor ángulo y capte lo
                mejor del lugar que deseas anunciar en nuestra aplicación
              </Typography>
              <Box
                {...getRootProps()}
                sx={{
                  bgcolor: "#D9D9D9",
                  width: "100px",
                  minWidth: "480px !important",
                  minHeight: "330px",
                  borderRadius: "10px",
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input {...getInputProps()} />
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Box
                    component={"img"}
                    src={addImageIcon}
                    alt="add image"
                    sx={{ width: "100px", height: "100px" }}
                  />
                  <Typography
                    sx={{ ...formDescriptionStyle, fontSize: "0.75rem" }}
                  >
                    Arrastre o suba aqui la fotografia de su espacio , formatos
                    permitidos PNG,JPG
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Grid>

      {/*Grid child 3:*/}
      <Grid item xs={12}>
        <Stack>
          <Typography sx={formDescriptionStyle}>
            En el siguiente visor de mapa le pedimos que marque de la manera más
            certera posible la localización del lugar que desea publicar
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PublishForm;
