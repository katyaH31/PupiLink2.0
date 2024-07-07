import { Checkbox, SxProps, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormUtils from "../../utils/FormUtils";

const extraCheckoutStyle: SxProps = {
  color: "#865DFF",
  "&.Mui-checked": {
    color: "#571FFF",
  },
};

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const CheckboxInput = <T extends FieldValues>(props: Props<T>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, formState: { errors } }) => {
        const formError = FormUtils.getFormError(props.name, errors);
        return (
          <Checkbox {...field} sx={{ ...extraCheckoutStyle, color: formError ? "red" : "#865DFF" }} />
        )
      }
      }
    />
  );
}

export default CheckboxInput;