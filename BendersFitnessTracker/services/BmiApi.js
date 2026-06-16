import { calculateBmi, getBmiCategory } from "./BmiCalculator";

export async function getBmiResult(weightLbs, heightCm) {
  const bmi = calculateBmi(weightLbs, heightCm);
  const category = getBmiCategory(bmi);

  return {
    bmi,
    category,
  };
}
