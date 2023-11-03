import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Checkbox, Menu, Provider } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    countryCode: Yup.string()
        .oneOf(['+91', '+1'], 'Invalid country code')
        .required('Country code is required'),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    acceptTermsAndCondition: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
});

const FormStepThree = ({ onSave, onBack, onComplete, formData, initialValues }) => {
    const [visible, setVisible] = React.useState(false);

    const initialValuesSet = {
        countryCode: formData.countryCode || initialValues.countryCode,
        phoneNumber: formData.phoneNumber || initialValues.phoneNumber,
        acceptTermsAndCondition: formData.acceptTermsAndCondition || false,
    };

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSubmitForm = (values) => {
        const { acceptTermsAndCondition, ...submissionValues } = values;
        onSave(submissionValues);
        onComplete();
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Formik
                    initialValues={initialValuesSet}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitForm}
                >
                    {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => (
                        <View>

                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={
                                    <Button onPress={openMenu}>
                                        {values.countryCode || "Select Country Code"}
                                    </Button>
                                }
                            >
                                <Menu.Item onPress={() => setFieldValue('countryCode', '+91')} title="+91 India" />
                                <Menu.Item onPress={() => setFieldValue('countryCode', '+1')} title="+1 America" />
                            </Menu>

                            {errors.countryCode && touched.countryCode && (
                                <Text style={styles.errorText}>{errors.countryCode}</Text>
                            )}


                            <TextInput
                                label="Phone Number"
                                mode="outlined"
                                keyboardType="numeric"
                                onChangeText={handleChange('phoneNumber')}
                                value={values.phoneNumber}
                                error={touched.phoneNumber && !!errors.phoneNumber}
                            />

                            {errors.phoneNumber && touched.phoneNumber && (
                                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                            )}


                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={values.acceptTermsAndCondition ? 'checked' : 'unchecked'}
                                    onPress={() => setFieldValue('acceptTermsAndCondition', !values.acceptTermsAndCondition)}
                                />
                                <Text onPress={() => setFieldValue('acceptTermsAndCondition', !values.acceptTermsAndCondition)} style={styles.label}>
                                    Accept Terms and Conditions
                                </Text>
                            </View>

                            {errors.acceptTermsAndCondition && touched.acceptTermsAndCondition && (
                                <Text style={styles.errorText}>{errors.acceptTermsAndCondition}</Text>
                            )}


                            <View style={styles.buttonContainer}>
                                <Button mode="outlined" onPress={onBack} style={styles.button}>
                                    Back
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    Save
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={() => { }}
                                    style={[styles.button, styles.disabledButton]}
                                    disabled={true}
                                >
                                    Save and Next
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </Provider>
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
    disabledButton: {
        backgroundColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    label: {
        margin: 8,
    },
});

export default FormStepThree;
