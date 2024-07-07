import { Button, ButtonProps } from "@mui/material";

interface Props {
}

const PupilinkButton = (props: Props & ButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        background: "#865DFF",
        borderRadius: "5rem",
        width: "20rem",
        fontSize: "20px",
        "&:hover": { bgcolor: "#571FFF" },
      }}
      {...props}
    >
      { }
    </Button>
  );
}

export default PupilinkButton;