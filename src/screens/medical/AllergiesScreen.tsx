import React from 'react';
import MedicalEmptyScreen from './MedicalEmptyScreen';

export default function AllergiesScreen({ navigation }: { navigation: any }) {
  return (
    <MedicalEmptyScreen
      navigation={navigation}
      title="Allergies"
      icon="alert-circle-outline"
      buttonLabel="ADD ALLERGIES"
      description="Add your allergies to help us better understand your health profile and provide personalized insights."
    />
  );
}
