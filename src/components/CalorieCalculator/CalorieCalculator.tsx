import React, { useState } from 'react';
import { ARABIC_STRINGS } from '~/constants';
import { ActivityLevel, CalorieGoal, CalorieCalculatorResult } from '~/types';
import { Input } from '~/components/Shared/Input';
import { Button } from '~/components/Shared/Button';

interface FormData {
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
}

const CalorieCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: ActivityLevel.MODERATE,
    goal: CalorieGoal.MAINTAIN_WEIGHT
  });

  const [result, setResult] = useState<CalorieCalculatorResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCalories = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = formData.gender === 'male'
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    // Activity Level Multiplier
    const activityMultipliers = {
      [ActivityLevel.SEDENTARY]: 1.2,
      [ActivityLevel.LIGHT]: 1.375,
      [ActivityLevel.MODERATE]: 1.55,
      [ActivityLevel.ACTIVE]: 1.725,
      [ActivityLevel.EXTRA_ACTIVE]: 1.9
    };

    const tdee = bmr * activityMultipliers[formData.activityLevel];

    // Adjust calories based on goal
    let targetCalories = tdee;
    switch (formData.goal) {
      case CalorieGoal.LOSE_WEIGHT:
        targetCalories = tdee - 500;
        break;
      case CalorieGoal.GAIN_WEIGHT:
        targetCalories = tdee + 500;
        break;
    }

    // Calculate macros
    const protein = weight * 2; // 2g per kg of body weight
    const fats = (targetCalories * 0.25) / 9; // 25% of calories from fats
    const carbs = (targetCalories - (protein * 4) - (fats * 9)) / 4; // Remaining calories from carbs

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCalories();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
        {ARABIC_STRINGS.calorieCalculator}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          label={ARABIC_STRINGS.age}
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="15"
          max="100"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {ARABIC_STRINGS.gender}
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-300">{ARABIC_STRINGS.male}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="form-radio text-pink-500"
              />
              <span className="ml-2 text-gray-300">{ARABIC_STRINGS.female}</span>
            </label>
          </div>
        </div>

        <Input
          type="number"
          label={ARABIC_STRINGS.weight}
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          min="30"
          max="200"
        />

        <Input
          type="number"
          label={ARABIC_STRINGS.height}
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          min="100"
          max="250"
        />

        <Input
          type="select"
          label={ARABIC_STRINGS.activityLevel}
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          options={[
            { value: ActivityLevel.SEDENTARY, label: ARABIC_STRINGS.activityLevels[ActivityLevel.SEDENTARY] },
            { value: ActivityLevel.LIGHT, label: ARABIC_STRINGS.activityLevels[ActivityLevel.LIGHT] },
            { value: ActivityLevel.MODERATE, label: ARABIC_STRINGS.activityLevels[ActivityLevel.MODERATE] },
            { value: ActivityLevel.ACTIVE, label: ARABIC_STRINGS.activityLevels[ActivityLevel.ACTIVE] },
            { value: ActivityLevel.EXTRA_ACTIVE, label: ARABIC_STRINGS.activityLevels[ActivityLevel.EXTRA_ACTIVE] }
          ]}
          required
        />

        <Input
          type="select"
          label={ARABIC_STRINGS.goal}
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          options={[
            { value: CalorieGoal.LOSE_WEIGHT, label: ARABIC_STRINGS.calorieGoals[CalorieGoal.LOSE_WEIGHT] },
            { value: CalorieGoal.MAINTAIN_WEIGHT, label: ARABIC_STRINGS.calorieGoals[CalorieGoal.MAINTAIN_WEIGHT] },
            { value: CalorieGoal.GAIN_WEIGHT, label: ARABIC_STRINGS.calorieGoals[CalorieGoal.GAIN_WEIGHT] }
          ]}
          required
        />

        <Button type="submit" className="w-full">
          {ARABIC_STRINGS.calculate}
        </Button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            {ARABIC_STRINGS.result}
          </h3>
          <div className="space-y-2 text-gray-200">
            <p>BMR: {result.bmr} kcal</p>
            <p>TDEE: {result.tdee} kcal</p>
            <p>{ARABIC_STRINGS.dailyCalories} {result.targetCalories} kcal</p>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <h4 className="text-lg font-medium mb-2">المغذيات الكبرى المقترحة:</h4>
              <p>البروتين: {result.protein}g</p>
              <p>الكربوهيدرات: {result.carbs}g</p>
              <p>الدهون: {result.fats}g</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;