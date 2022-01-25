import { TextField } from '@mui/material';
import { ErrorMessage } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/styles';

const CustomSelect = styled(DatePicker)({});

interface Props {
  value: any;
  name: string;
  label: string;
}

const FormikDate = (props: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomSelect
        label={props.label}
        value={props.value.values.birth}
        onChange={(value) => {
          props.value.setFieldValue(props.name, value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={<ErrorMessage name={props.name} />}
          />
        )}
      ></CustomSelect>
    </LocalizationProvider>
  );
};

export default FormikDate;
