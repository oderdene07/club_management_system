import { useAuth } from "@/contexts/auth-context";
import { Layout as AuthLayout } from "@/layouts/auth/layout";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { LoadingButton } from "@mui/lab";
import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      first_name: Yup.string().max(255).required("First name is required"),
      last_name: Yup.string().max(255).required("Last name is required"),
      password: Yup.string()
        .min(6, "Password is too short at least 6 characters")
        .max(255)
        .required("Password is required"),
      password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      try {
        await auth.signUp(values.email, values.first_name, values.last_name, values.password);
        setIsLoading(false);
        router.query.email = values.email;
        router.push(`/verify?email=${values.email}`);
      } catch (err) {
        setIsLoading(false);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.first_name && formik.errors.first_name)}
                  fullWidth
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                <TextField
                  error={!!(formik.touched.last_name && formik.errors.last_name)}
                  fullWidth
                  helperText={formik.touched.last_name && formik.errors.last_name}
                  label="Last Name"
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  autoComplete="off"
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  autoComplete="off"
                  error={!!(formik.touched.password_confirm && formik.errors.password_confirm)}
                  fullWidth
                  helperText={formik.touched.password_confirm && formik.errors.password_confirm}
                  label="Confirm Password"
                  name="password_confirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password_confirm}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<ArrowLeftOnRectangleIcon width={24} />}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </LoadingButton>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
