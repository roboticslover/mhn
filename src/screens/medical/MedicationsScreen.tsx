import React from 'react';
import MedicalEmptyScreen from './MedicalEmptyScreen';

export default function MedicationsScreen({ navigation }: { navigation: any }) {
  return (
    <MedicalEmptyScreen
      navigation={navigation}
      title="Medication"
      icon="flask-outline"
      buttonLabel="ADD DRUG"
      description="This will help in keeping track of your drugs and will be of help during emergencies."
    />
  );
}
