import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FormStepOne from './components/FormStepOne';
import FormStepTwo from './components/FormStepTwo';
import FormStepThree from './components/FormStepThree';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const saveFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsModalVisible(false);
  };

  const handleComplete = () => {
    setIsModalVisible(true); 
  };

  let content;
  switch (currentStep) {
    case 1:
      content = <FormStepOne onSave={saveFormData} onNext={goToNextStep} initialValues={{ emailId: formData.emailId || '', password: formData.password || ''}}  />;
      break;
    case 2:
      content = <FormStepTwo onSave={saveFormData} onNext={goToNextStep} onBack={goToPrevStep} initialValues={{ firstName: formData.firstName || '', lastName: formData.lastName || '', address: formData.address || ''}} />;
      break;
    case 3:
      content = <FormStepThree onSave={saveFormData} onBack={goToPrevStep} onComplete={handleComplete} formData={formData} initialValues={{ countryCode: formData.countryCode || '', phoneNumber: formData.phoneNumber || ''}} />;
      break;
    default:
      content = <View style={styles.summaryContainer}><Text>Submission Complete</Text></View>;
      break;
  }

  return (
    <PaperProvider>
      {content}
      <Modal
        visible={isModalVisible} 
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Review your Details</Text>
          <Text>{JSON.stringify(formData, null, 2)}</Text>
          <Text onPress={handleSubmit} style={styles.modalButton}>
            Confirm and Submit
          </Text>
        </View>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },  
  modalButton: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
