import { ActivityLevel, CalorieGoal } from '../types';

export const ARABIC_STRINGS = {
  dashboard: 'لوحة التحكم',
  adminDashboard: 'لوحة تحكم المسؤول',
  trainerDashboard: 'لوحة تحكم المدرب',
  traineeDashboard: 'لوحة تحكم المتدرب',
  userManagement: 'إدارة المستخدمين',
  planManagement: 'إدارة الخطط',
  sendNotification: 'إرسال إشعار',
  myTrainees: 'المتدربين',
  trainingVideos: 'مقاطع الفيديو',
  nutritionFiles: 'ملفات التغذية',
  mySchedule: 'جدولي',
  chatWithTrainer: 'محادثة المدرب',
  ratePlan: 'تقييم الخطة',
  rateTrainer: 'تقييم المدرب',
  viewProfile: 'عرض الملف الشخصي',
  calorieCalculator: 'حاسبة السعرات',
  notifications: 'الإشعارات',
  male: 'ذكر',
  female: 'أنثى',
  activityLevels: {
    [ActivityLevel.SEDENTARY]: 'خامل',
    [ActivityLevel.LIGHT]: 'نشاط خفيف',
    [ActivityLevel.MODERATE]: 'نشاط متوسط',
    [ActivityLevel.ACTIVE]: 'نشاط عالي',
    [ActivityLevel.VERY_ACTIVE]: 'نشاط مكثف'
  },
  calorieGoals: {
    [CalorieGoal.LOSE_WEIGHT]: 'إنقاص الوزن',
    [CalorieGoal.MAINTAIN_WEIGHT]: 'الحفاظ على الوزن',
    [CalorieGoal.GAIN_WEIGHT]: 'زيادة الوزن'
  }
}; 