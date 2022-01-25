import { Button, Container, Grid, Typography } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import FormikField from './FormikField';
import * as Yup from 'yup';
import FormikSelect from './FormikSelect';
import { object, gender, country, provinceCountries } from '../data/config';
import FormikDate from './FormikDate';
import { makeStyles } from '@mui/styles';
import {
  formatDistrict,
  getDataUser,
  handleSubmitForm,
  upDataUser,
} from '../hook/customHook';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import DateTravel from './DateTravel';

type TravelType = {
  immigrationDate: string;
  departureDate: string;
  destination: string;
  departure: string;
};

export interface IFrom {
  name: string;
  object: string;
  birth: string;
  gender: string;
  nation: any;
  id: string;

  travel?: TravelType[];

  province: any;
  district: string;
  address: string;
  email: string;
  phone: string;
  radio?: string;
  checked?: string;
}

const initialTravel = {
  immigrationDate: '',
  departureDate: '',
  destination: '',
  departure: '',
};

let initialValue: IFrom = {
  name: '',
  object: '',
  birth: '',
  gender: '',
  nation: '',
  id: '',

  travel: [],

  province: '',
  district: '',
  address: '',
  email: '',
  phone: '',

  checked: '',
  radio: '',
};

const Label = makeStyles({
  label: {
    marginRight: '2rem',
    marginLeft: '4px',
  },
  link: {
    textDecoration: 'none',
  },
});

type Param = {
  id: string;
};

let dataEdit: IFrom[] = [];
let initialValues: IFrom;

const FormDeclaration = () => {
  const [district, setDistrict] = useState([]);
  const param: Param = useParams();
  const history = useHistory();
  const classes = Label();

  if (!param.id) {
    initialValues = initialValue;
  }

  if (param.id) {
    const fetchData = getDataUser();
    dataEdit = fetchData.filter((data: IFrom) => {
      return data.id === param.id;
    });
    if (dataEdit.length > 0) {
      initialValues = dataEdit[0];
      // const district = formatDistrict(dataEdit[0].province);
      // setDistrict(district);
    }
  }

  const cancelHandle = () => {
    window.confirm('Data will lost!!! Do you want to cancel? ');
  };

  const handleReset = (resetForm: any) => {
    if (window.confirm('Data will lost !!! Do you want to reset? ')) {
      resetForm();
    }
  };

  const submitForm = (values: IFrom, actions: any) => {
    const newData: any = handleSubmitForm(values);
    upDataUser(newData);
    actions.resetForm();
    history.replace('/table');
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    object: Yup.string().required('Object is required'),
    gender: Yup.string().required('Gender is required'),
    birth: Yup.date().required('Birth day is required'),
    nation: Yup.string().required('Nationality is required'),
    id: Yup.string().required('Nation ID or Passport ID is required'),
    province: Yup.string().required('Province is required'),
    district: Yup.string().required('District is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email not correct'),
    phone: Yup.string().required('Phone is required'),
  });

  const validate = (values: IFrom) => {
    if (values.province) {
      const district = formatDistrict(values.province);
      setDistrict(district);
    }
  };
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        m={'4rem 0'}
        color="#198754"
        textAlign={'center'}
        sx={{ textTransform: 'uppercase' }}
      >
        Medical Declaration Form For Foreign Entry
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
        validate={validate}
      >
        {(values) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={12} fontWeight={500} fontSize="2rem" mb="2rem">
                  Personal information:
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormikField name="name" label="Full name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormikSelect
                          name="object"
                          label="Object"
                          items={object}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormikDate
                          value={values}
                          name="birth"
                          label="Date Of Birth"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormikSelect
                          name="gender"
                          label="Gender"
                          items={gender}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormikSelect
                          name="nation"
                          label="Nationality"
                          items={country}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormikField
                          name="id"
                          label="Nation ID or Passport ID"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item fontWeight={500} xs={12} fontSize="2rem">
                    Travel:
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        Do you travel in the last 14 days?
                      </Grid>
                      <Grid item xs={12}>
                        <FieldArray
                          name="travel"
                          render={(arrayHelper) => {
                            return (
                              <div>
                                {values.values.travel?.map((val, index) => {
                                  return (
                                    <Grid key={index} container spacing={3}>
                                      <Grid xs={12} item>
                                        Travel {index + 1}
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} md={6}>
                                            <DateTravel
                                              value={values}
                                              index={index}
                                              name={`travel.${index}.departureDate`}
                                              label="Departure Date"
                                            />
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                            <DateTravel
                                              value={values}
                                              index={index}
                                              name={`travel.${index}.immigrationDate`}
                                              label="Immigration Date"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} md={6}>
                                            <FormikSelect
                                              items={country}
                                              name={`travel.${index}.departure`}
                                              label="Departure"
                                            />
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                            <FormikSelect
                                              items={country}
                                              name={`travel.${index}.destination`}
                                              label="Destination"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Button
                                          onClick={() => {
                                            arrayHelper.remove(index);
                                          }}
                                          sx={{ marginBottom: '2rem' }}
                                          color="error"
                                          variant="contained"
                                        >
                                          Delete
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  );
                                })}
                                <Grid item xs={6}>
                                  <Button
                                    onClick={() => {
                                      arrayHelper.push(initialTravel);
                                    }}
                                    sx={{ marginBottom: '2rem' }}
                                    color="warning"
                                    variant="contained"
                                  >
                                    Add more
                                  </Button>
                                </Grid>
                              </div>
                            );
                          }}
                        ></FieldArray>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item fontWeight={500} fontSize="2rem">
                    Contact:
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormikSelect
                          name="province"
                          label="Province"
                          items={provinceCountries}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormikSelect
                          name="district"
                          label="District"
                          items={district}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormikField name="address" label="Address" />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormikField name="email" label="Email" />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormikField name="phone" label="Mobile" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item fontWeight={500} fontSize="2rem" xs={12}>
                    Symptoms:
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        Which one would you like to symptoms?:
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field type="checkbox" name="checked" value="fiber" />
                        <label className={classes.label}>Fiber</label>
                        <Field type="checkbox" name="checked" value="fever" />
                        <label className={classes.label}>Fever</label>
                        <Field
                          type="checkbox"
                          name="checked"
                          value="soar throat"
                        />
                        <label className={classes.label}>Soar throat</label>
                        <Field type="checkbox" name="checked" value="diff" />
                        <label className={classes.label}>
                          Difficulty od breathing
                        </label>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item fontWeight={500} fontSize="2rem" xs={12}>
                      Vaccines:
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          Which one would you like to vaccinate?:
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <Field
                            checked
                            type="radio"
                            name="radio"
                            value="none"
                          />
                          <label className={classes.label}>None</label>
                          <Field type="radio" name="radio" value="astra" />
                          <label className={classes.label}>Astra Zenecca</label>
                          <Field type="radio" name="radio" value="pfizer" />
                          <label className={classes.label}>Pfizer</label>
                          <Field type="radio" name="radio" value="moderna" />
                          <label className={classes.label}>Moderna</label>
                          <Field type="radio" name="radio" value="sinopharm" />
                          <label className={classes.label}>Sinopharm</label>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
                <Link to="/table" className={classes.link}>
                  <Button
                    onClick={cancelHandle}
                    variant="contained"
                    color="error"
                    sx={{ margin: '0 2rem' }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  onClick={handleReset.bind(null, values.resetForm)}
                  variant="contained"
                  color="info"
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormDeclaration;
