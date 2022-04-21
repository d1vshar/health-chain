import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  Stack,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "../../assets/jss/formStyles";

type IRegistrationFormValues = {
  name: string;
  dob: Date;
  dod: Date;
  gender: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  bloodGroup: string | null;
};

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IRegistrationFormValues>();

  const [valueOfDOB, setValueOfDOB] = React.useState<Date | null>(null);
  const [valueOfDOD, setValueOfDOD] = React.useState<Date | null>(null);
  const onSubmit: SubmitHandler<IRegistrationFormValues> = (data) =>
    console.log(data);

  return (
    <Box my={3}>
      <div style={{ margin: "0px 0px 22px" }}>
        <Typography variant="h4" sx={styles.welcomeBackText}>
          Registration Form
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          // container
          direction="column"
          justifyContent="center"
          alignItems="start"
        >
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Name
              </Typography>
              <TextField
                type="text"
                placeholder="Enter name"
                variant="outlined"
                size="small"
                {...register("name")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Date of birth
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={valueOfDOB}
                  onChange={(newValue) => {
                    setValueOfDOB(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} {...register("dob")} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Date of death
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={valueOfDOD}
                  onChange={(newValue) => {
                    setValueOfDOD(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} {...register("dod")} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Gender
              </Typography>
              <TextField
                id="gender"
                placeholder="Gender"
                type="text"
                variant="outlined"
                size="small"
                {...register("gender")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Email
              </Typography>
              <TextField
                id="email"
                placeholder="Email"
                type="text"
                variant="outlined"
                size="small"
                {...register("email")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Phone Number
              </Typography>
              <TextField
                id="phone"
                placeholder="Phone"
                type="text"
                variant="outlined"
                size="small"
                {...register("phone")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Address
              </Typography>
              <TextField
                id="address"
                placeholder="Address"
                type="text"
                variant="outlined"
                size="small"
                {...register("address")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Blood Group
              </Typography>
              <TextField
                id="bloodGroup"
                placeholder="Blood Group"
                type="text"
                variant="outlined"
                size="small"
                {...register("bloodGroup")}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              sx={styles.secondaryButton}
              variant="contained"
              color="primary"
              type="submit"
              // fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistrationForm;
