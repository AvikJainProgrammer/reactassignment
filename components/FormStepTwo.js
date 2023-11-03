import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed for first name')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Only alphabets are allowed for last name')
    .nullable(),
  address: Yup.string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
});

const FormStepTwo = ({ onSave, onNext, onBack, initialValues }) => {
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
          onSave(values);
          onNext();
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              label="First Name"
              mode="outlined"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              error={touched.firstName && errors.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              label="Last Name"
              mode="outlined"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              error={touched.lastName && errors.lastName}
            />
            {values.lastName && touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              label="Address"
              mode="outlined"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              error={touched.address && errors.address}
            />
            {touched.address && errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={onBack} style={styles.button}>
                Back
              </Button>

              <Button
                mode="outlined"
                onPress={() => handleSaveOnly(values, { setSubmitting: () => {} })}
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
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    margin: 4,
    flex: 1, 
  },
});

export default FormStepTwo;
