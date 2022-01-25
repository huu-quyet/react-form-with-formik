import { TextField } from '@mui/material';
import { ErrorMessage } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/styles';

const CustomSelect = styled(DatePicker)({});

interface Props {
  value: any;
  index: number;
  name: string;
  label: string;
}

const DateTravel = (props: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomSelect
        label={props.label}
        views={['day']}
        value={
          props.label === 'Departure Date'
            ? props.value.values.travel[props.index].departureDate
            : props.value.values.travel[props.index].immigrationDate
        }
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

export default DateTravel;
