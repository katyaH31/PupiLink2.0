import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, SxProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormUtils from "../../utils/FormUtils";

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

export interface RadioGroupType<T> {
  name: string;
  value: T;
}

interface Props<T extends FieldValues, R> {
  name: Path<T>;
  control: Control<T>;
  options: RadioGroupType<R>[];
}

const RadioGroupInput = <T extends FieldValues, R>(props: Props<T, R>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, formState: { errors } }) => {
        const formError = FormUtils.getFormError(props.name, errors);
        return (
          <FormControl {...field} error={!!formError}>
            <RadioGroup row sx={groupBoxStatusStyle}>
              {props.options.map((option) => (
                <FormControlLabel
                  key={`${option.value}`}
                  value={option.value}
                  control={<Radio />}
                  label={option.name}
                />
              ))}
              {formError && <FormHelperText>{formError}</FormHelperText>}
            </RadioGroup>
          </FormControl>
        )
      }
      }
    />
  );
}

export default RadioGroupInput;