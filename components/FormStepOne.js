import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  emailId: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .matches(/(?=.*[a-z]){2,}/, 'Password must contain at least 2 lowercase letters')
    .matches(/(?=.*[A-Z]){2,}/, 'Password must contain at least 2 uppercase letters')
    .matches(/(?=.*[0-9]){2,}/, 'Password must contain at least 2 numbers')
    .matches(/(?=.*[!@#$%^&*]){2,}/, 'Password must contain at least 2 special characters')
    .required('Password is required'),
});

const FormStepOne = ({ onSave, onNext, initialValues }) => {
  const handleSaveOnly = (values, actions) => {
    onSave(values);
    actions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSaveOnly(values, actions);
          onNext();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange('emailId')}
              onBlur={handleBlur('emailId')}
              value={values.emailId}
              error={touched.emailId && errors.emailId}
            />
            {touched.emailId && errors.emailId && <Text style={styles.errorText}>{errors.emailId}</Text>}

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.buttonContainer}>

              <Button mode="outlined" disabled style={styles.button}>
                Back
              </Button>


              <Button
                mode="outlined"
                onPress={() => handleSaveOnly(values, { setSubmitting: () => { } })}
                style={styles.button}
              >
                Save
              </Button>


              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
              >
                Save and Next
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  button: {
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default FormStepOne;
