import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormUtils from "../../utils/FormUtils";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  multiline?: boolean;
}

const TextInput = <T extends FieldValues>(props: Props<T>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, formState: { errors } }) => {
        const formError = FormUtils.getFormError(props.name, errors);
        return (
          <TextField
            {...field}
            error={!!formError}
            helperText={formError}
            size="small"
            maxRows={12}
            multiline={props.multiline}
            id="outlined-basic"
            variant="outlined"
            sx={{ fontFamily: "Barlow Condensed, Arial", maxWidth: props.multiline ? "100%" : '30rem', '& .MuiOutlinedInput-root': { bgcolor: "#dcdce8" } }}
            inputProps={{
              sx: { fontSize: "0.88rem", paddingBlock: "0.25rem", bgcolor: "#dcdce8", },
            }}
          />
        )
      }
      }
    />
  );
}

export default TextInput;