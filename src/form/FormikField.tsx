import { styled } from '@mui/styles';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
}

const CustomTextFiled = styled(TextField)({
  '& .MuiFormHelperText-root input': {
    color: 'red',
    fontSize: '1.6rem',
  },

  '& .MuiFormHelperText-root': {
    color: 'red',
    fontSize: '1.6rem',
  },

  '& .MuiInputLabel-root': {
    fontSize: '1.6rem',
  },

  '& input + fieldset': {
    fontSize: '1.6rem',
  },

  //   '& input:invalid + fieldset': {
  //     borderColor: 'red',
  //     borderWidth: 2,
  //   },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  label,
  type = 'text',
}) => {
  return (
    <Box sx={{ fontSize: '1.6rem' }}>
      <Field
        sx={{ '& input': { fontSize: '1.6rem' } }}
        size="small"
        variant="outlined"
        type={type}
        name={name}
        label={label}
        as={CustomTextFiled}
        required
        fullWidth
        autoComplete="off"
        helperText={<ErrorMessage name={name} />}
      />
    </Box>
  );
};

export default FormikField;
