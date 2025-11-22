import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChevronStepperProps {
  totalSteps: number;
  currentStep: number;
}

export default function ChevronStepper({ totalSteps, currentStep }: ChevronStepperProps) {
  const getStepColor = (step: number) => {
    if (step <= currentStep) return '#4CAF50'; // Xanh lá - Done
    return '#E0E0E0'; // Xám - Pending
  };

  const getTextColor = (step: number) => {
    if (step <= currentStep) return '#FFFFFF';
    return '#999999';
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const bgColor = getStepColor(step);
        const textColor = getTextColor(step);

        return (
          <View
            key={step}
            style={[
              styles.stepContainer,
              { 
                backgroundColor: bgColor,
                marginLeft: step > 1 ? -8 : 0,
                zIndex: totalSteps - step,
              },
            ]}
          >
            {/* Arrow tip bên phải */}
            {step < totalSteps && (
              <View
                style={[
                  styles.arrowTip,
                  { borderLeftColor: bgColor },
                ]}
              />
            )}
            
            <View style={styles.textContainer}>
              <Text style={[styles.stepText, { color: textColor }]}>
                Lần {step}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
  },
  stepContainer: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 12,
    paddingRight: 4,
  },
  arrowTip: {
    position: 'absolute',
    right: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 16,
    borderBottomWidth: 16,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    zIndex: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
