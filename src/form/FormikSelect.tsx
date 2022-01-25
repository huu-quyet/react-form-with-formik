import { styled } from '@mui/styles';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { ReactNode } from 'react';

interface Props {
  name: string;
  label: string;
  items: any;
  type?: string;
  values?: string;
}

interface MaterialUISelectFieldProps {
  errorString?: string;
  value: string;
  label: string;
  name: string;
  children: ReactNode;
  onChange: any;
  onBlur: any;
}

const CustomSelect = styled(Select)({
  '& .MuiOutlinedInput-root + fieldset': {
    fontSize: '5rem',
  },
});

const MaterialUISelectField = (props: MaterialUISelectFieldProps) => {
  return (
    <FormControl
      fullWidth
      sx={{
        '& fieldset legend': {
          fontSize: '1.6rem',
        },
      }}
    >
      <InputLabel
        required
        sx={{
          fontSize: '1.6rem',
          top: '-0.8rem',
        }}
      >
        {props.label}
      </InputLabel>
      <CustomSelect
        label={props.label}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
        size="small"
        value={props.value}
        sx={{
          fontSize: '1.6rem',
        }}
      >
        {props.children}
      </CustomSelect>
      <FormHelperText sx={{ fontSize: '1.6rem', color: 'red' }}>
        {props.errorString}
      </FormHelperText>
    </FormControl>
  );
};

const FormikSelect: React.FC<Props> = ({
  name,
  label,
  items,
  type = 'text',
}) => {
  return (
    <Field
      as={MaterialUISelectField}
      name={name}
      label={label}
      required
      errorString={<ErrorMessage name={name} />}
    >
      {items.map((item: any) => {
        return (
          <MenuItem
            key={item.name ? item.name : item}
            value={item}
            sx={{ fontSize: '1.6rem' }}
          >
            {item.name ? item.name : item}
          </MenuItem>
        );
      })}
    </Field>
  );
};

export default FormikSelect;
