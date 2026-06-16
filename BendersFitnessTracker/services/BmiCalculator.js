export function calculateBmi(weightLbs, heightCm) {
  const weightKg = Number(weightLbs) * 0.45359237;
  const heightM = Number(heightCm) / 100;

  if (!weightKg || !heightM) return 0;

  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBmiCategory(bmi) {
  if (!bmi) return "Unknown";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateDailyGoals(weightLbs, caloriesOverride = null) {
  const weight = Number(weightLbs);
  const calories = caloriesOverride || Math.round(weight * 9);

  return {
    initial_calories: calories,
    maintain_calories: Math.round(weight * 12),
    initial_protein: Math.round(weight * 0.8),
    initial_fat: Math.round(weight * 0.3),
    initial_fiber: Math.round((calories / 1000) * 14),
    initial_carbs: Math.round((calories - weight * 6) / 4),
  };
}

export function calculateGoalText(initialWeight, targetWeight) {
  const diff = Number(initialWeight) - Number(targetWeight);

  if (diff > 0) return `Lose ${diff.toFixed(1)} lbs`;
  if (diff < 0) return `Gain ${Math.abs(diff).toFixed(1)} lbs`;
  return "Maintain current weight";
}
