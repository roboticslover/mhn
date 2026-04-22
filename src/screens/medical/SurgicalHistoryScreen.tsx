import React from 'react';
import MedicalEmptyScreen from './MedicalEmptyScreen';

export default function SurgicalHistoryScreen({ navigation }: { navigation: any }) {
  return (
    <MedicalEmptyScreen
      navigation={navigation}
      title="Surgical Record"
      icon="medkit-outline"
      buttonLabel="ADD SURGICAL RECORD"
      description="Your surgical history and recovery progress will appear here once added by you or your healthcare provider."
    />
  );
}
