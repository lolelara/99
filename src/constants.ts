import { ActivityLevel, CalorieGoal, UserRole, AccountStatus } from '~/types'; // UserRole and AccountStatus are used here

export const APP_NAME = 'FitRyne';

// MOCKED_PLANS has been removed. Plans will be fetched from the database.
// export const MOCKED_PLANS: TrainingPlan[] = [
//   { id: 'plan1', name: 'خطة المبتدئين', description: 'خطة شاملة للمبتدئين لبناء الأساس.', price: 50, durationMonths: 1 },
//   { id: 'plan2', name: 'خطة متوسطة', description: 'للمستوى المتوسط لزيادة القوة والتحمل.', price: 75, durationMonths: 2 },
//   { id: 'plan3', name: 'خطة متقدمة', description: 'للمتقدمين لتحقيق أقصى أداء.', price: 100, durationMonths: 3 },
// ];

export const ARABIC_STRINGS = {
  // General
  appName: APP_NAME,
  loading: 'جاري التحميل...',
  error: 'حدث خطأ',
  success: 'تمت العملية بنجاح',
  save: 'حفظ',
  cancel: 'إلغاء',
  delete: 'حذف',
  edit: 'تعديل',
  add: 'إضافة',
  search: 'بحث',
  filter: 'تصفية',
  all: 'الكل',
  yes: 'نعم',
  no: 'لا',
  confirm: 'تأكيد',
  back: 'رجوع',
  next: 'التالي',
  submit: 'إرسال',
  upload: 'رفع',

  // Auth
  login: 'تسجيل الدخول',
  signup: 'إنشاء حساب',
  logout: 'تسجيل الخروج',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  confirmPassword: 'تأكيد كلمة المرور',
  phoneNumber: 'رقم الهاتف',
  country: 'الدولة',
  name: 'الاسم',

  // User Roles
  [UserRole.ADMIN]: 'مدير',
  [UserRole.TRAINER]: 'مدرب',
  [UserRole.TRAINEE]: 'متدرب',
  trainee: 'متدرب',
  trainer: 'مدرب',
  admin: 'مدير',

  // Account Status
  [AccountStatus.PENDING]: 'قيد المراجعة',
  [AccountStatus.ACTIVE]: 'نشط',
  [AccountStatus.SUSPENDED]: 'معلق',
  [AccountStatus.REJECTED]: 'مرفوض',
  pending: 'قيد المراجعة',
  active: 'نشط',
  suspended: 'معلق',
  rejected: 'مرفوض',

  // Activity Levels
  activityLevels: {
    [ActivityLevel.SEDENTARY]: 'قليل الحركة',
    [ActivityLevel.LIGHT]: 'نشاط خفيف',
    [ActivityLevel.MODERATE]: 'نشاط متوسط',
    [ActivityLevel.ACTIVE]: 'نشاط عالي',
    [ActivityLevel.EXTRA_ACTIVE]: 'نشاط مكثف'
  },

  // Calorie Goals
  calorieGoals: {
    [CalorieGoal.LOSE_WEIGHT]: 'إنقاص الوزن',
    [CalorieGoal.MAINTAIN_WEIGHT]: 'الحفاظ على الوزن',
    [CalorieGoal.GAIN_WEIGHT]: 'زيادة الوزن'
  },

  // Dashboard
  dashboard: 'لوحة التحكم',
  profile: 'الملف الشخصي',
  notifications: 'الإشعارات',
  settings: 'الإعدادات',
  
  // Admin Dashboard
  adminDashboard: 'لوحة تحكم المدير',
  userManagement: 'إدارة المستخدمين',
  planManagement: 'إدارة الخطط',
  users: 'المستخدمين',
  plans: 'الخطط التدريبية',
  statistics: 'الإحصائيات',
  
  // Trainer Dashboard
  trainerDashboard: 'لوحة تحكم المدرب',
  myTrainees: 'المتدربين',
  trainingVideos: 'فيديوهات التدريب',
  nutritionFiles: 'ملفات التغذية',
  schedule: 'الجدول',
  
  // Trainee Dashboard
  traineeDashboard: 'لوحة تحكم المتدرب',
  myTrainer: 'المدرب',
  myPlan: 'خطتي التدريبية',
  myProgress: 'تقدمي',
  mySchedule: 'جدولي التدريبي',
  
  // Calorie Calculator
  calorieCalculator: 'حاسبة السعرات الحرارية',
  age: 'العمر',
  gender: 'الجنس',
  male: 'ذكر',
  female: 'أنثى',
  weight: 'الوزن',
  height: 'الطول',
  activityLevel: 'مستوى النشاط',
  goal: 'الهدف',
  calculate: 'حساب',
  result: 'النتيجة',
  
  // Messages
  messages: 'الرسائل',
  send: 'إرسال',
  reply: 'رد',
  
  // Ratings
  rating: 'التقييم',
  ratings: 'التقييمات',
  comment: 'تعليق',
  comments: 'تعليقات',
  stars: 'نجوم',
  ratePlan: 'تقييم الخطة',
  rateTrainer: 'تقييم المدرب',
  submitRating: 'إرسال التقييم',
  
  // Errors
  required: 'هذا الحقل مطلوب',
  invalidEmail: 'البريد الإلكتروني غير صحيح',
  invalidPhone: 'رقم الهاتف غير صحيح',
  passwordMismatch: 'كلمة المرور غير متطابقة',
  invalidPassword: 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
  unauthorized: 'غير مصرح لك بالوصول',
  notFound: 'غير موجود',
  serverError: 'حدث خطأ في الخادم',

  // Additional strings
  selectPlan: 'اختر خطة تدريبية',
  trainers: 'المدربون',
  trainees: 'المتدربون',
  dailyCalories: 'السعرات الحرارية اليومية المقدرة:',
  approve: 'موافقة',
  reject: 'رفض',
  planPrice: 'سعر الخطة (بالعملة المحلية)',
  planDuration: 'مدة الخطة (أشهر)',
  sendNotification: 'إرسال إشعار',
  recipient: 'المستلم',
  title: 'العنوان',
  message: 'الرسالة',
  allUsers: 'جميع المستخدمين',
  allTrainers: 'جميع المدربين',
  allTrainees: 'جميع المتدربين',
  confirmAction: 'تأكيد الإجراء',
  areYouSure: 'هل أنت متأكد أنك تريد المتابعة؟',
  selectUser: 'اختر مستخدم',
  selectTrainer: 'اختر مدرب',
  linkTraineeToTrainer: 'ربط متدرب بمدرب',
  noDataAvailable: 'لا توجد بيانات',
  status: 'الحالة',
  actions: 'الإجراءات',
  assignAsTrainer: 'تعيين كمدرب',
  viewProfile: 'عرض الملف الشخصي',
  chatWithTrainer: 'محادثة مع المدرب',
  viewDetails: 'عرض التفاصيل',
  filterByStatus: 'تصفية حسب الحالة',
  planName: 'اسم الخطة',
  planDescription: 'وصف الخطة',
  addPlan: 'إضافة خطة',
  editPlan: 'تعديل خطة',
  deletePlan: 'حذف خطة',
  videoTitle: 'عنوان الفيديو',
  videoFile: 'ملف الفيديو',
  fileName: 'اسم الملف',
  orContinueWith: 'أو المتابعة باستخدام',
  
  // أزرار وعناوين رفع الفيديو
  addNewVideo: 'إضافة فيديو جديد',
  uploading: 'جاري الرفع...',
  upload: 'رفع',
  
  // رسائل الخطأ
  errorUploadingVideo: 'حدث خطأ أثناء رفع الفيديو',
  errorDeletingVideo: 'حدث خطأ أثناء حذف الفيديو',
  fillAllFields: 'يرجى تعبئة جميع الحقول المطلوبة',
  
  // نصوص الفيديوهات
  youtubeVideo: 'فيديو يوتيوب',
  uploadVideo: 'رفع فيديو',
  youtubeUrl: 'رابط اليوتيوب',
  invalidYoutubeUrl: 'رابط يوتيوب غير صالح',
  selectVideoFile: 'يرجى اختيار ملف فيديو',
  errorSavingVideo: 'فشل حفظ معلومات الفيديو',
  
  // نصوص الملفات
  trainingFiles: 'الملفات التدريبية',
  addNewFile: 'إضافة ملف جديد',
  fileTitle: 'عنوان الملف',
  file: 'الملف',
  googleDriveFile: 'ملف جوجل درايف',
  uploadFile: 'رفع ملف',
  driveUrl: 'رابط جوجل درايف',
  invalidDriveUrl: 'رابط جوجل درايف غير صالح',
  selectFile: 'يرجى اختيار ملف',
  errorUploadingFile: 'حدث خطأ أثناء رفع الملف',
  errorSavingFile: 'فشل حفظ معلومات الملف',
  uploadedFile: 'ملف مرفوع',
  viewOrDownload: 'عرض / تحميل',
  
  // نصوص المصادقة
  signIn: 'تسجيل الدخول',
  signingIn: 'جاري تسجيل الدخول...',
  forgotPassword: 'نسيت كلمة المرور؟',
  sendResetLink: 'إرسال رابط إعادة التعيين',
  enterEmailForReset: 'يرجى إدخال البريد الإلكتروني لإعادة تعيين كلمة المرور',
  resetPasswordEmailSent: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
};

export const DEFAULT_COUNTRY_OPTIONS = [
  { value: 'SA', label: 'السعودية' },
  { value: 'AE', label: 'الإمارات' },
  { value: 'KW', label: 'الكويت' },
  { value: 'BH', label: 'البحرين' },
  { value: 'QA', label: 'قطر' },
  { value: 'OM', label: 'عمان' },
  { value: 'YE', label: 'اليمن' },
  { value: 'EG', label: 'مصر' },
  { value: 'SD', label: 'السودان' },
  { value: 'IQ', label: 'العراق' },
  { value: 'SY', label: 'سوريا' },
  { value: 'LB', label: 'لبنان' },
  { value: 'JO', label: 'الأردن' },
  { value: 'PS', label: 'فلسطين' },
  { value: 'LY', label: 'ليبيا' },
  { value: 'TN', label: 'تونس' },
  { value: 'DZ', label: 'الجزائر' },
  { value: 'MA', label: 'المغرب' },
  { value: 'MR', label: 'موريتانيا' }
];

// Placeholder API Key for Gemini. In a real app, this MUST come from process.env.API_KEY
// For the purpose of this generated code, we assume process.env.API_KEY is set in the environment.
// const GEMINI_API_KEY = process.env.API_KEY; 
// if (!GEMINI_API_KEY) {
//  console.warn("API_KEY environment variable is not set. Gemini API calls will fail.");
// }
// No explicit declaration of process.env here. It's assumed to be available.