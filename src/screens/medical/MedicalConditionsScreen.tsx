import React from 'react';
import MedicalEmptyScreen from './MedicalEmptyScreen';

export default function MedicalConditionsScreen({ navigation }: { navigation: any }) {
  return (
    <MedicalEmptyScreen
      navigation={navigation}
      title="Medical Conditions"
      icon="heart-outline"
      buttonLabel="ADD MEDICAL CONDITIONS"
      description="This will help in keeping track of your ongoing health journey and ensure precision in your digital observatory."
    />
  );
}
