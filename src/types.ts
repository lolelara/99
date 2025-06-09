export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  TRAINEE = 'TRAINEE'
}

export enum AccountStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED'
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  ACTIVE = 'ACTIVE',
  EXTRA_ACTIVE = 'EXTRA_ACTIVE'
}

export enum CalorieGoal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
  GAIN_WEIGHT = 'GAIN_WEIGHT'
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  status: AccountStatus;
  phoneNumber?: string;
  country?: string;
  trainerId?: string;
  selectedPlanId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  trainerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  recipientSpecifier: 'all' | 'trainers' | 'trainees';
  link?: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string;
  read: boolean;
}

export interface TrainingVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  traineeId?: string;
  uploadedBy: string;
  uploadedByName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionFile {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  traineeId?: string;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TraineeScheduleItem {
  id: string;
  traineeId: string;
  day: string;
  exercises: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: Date;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  userId: string;
  userName?: string;
  ratedItemId: string;
  ratedItemName?: string;
  ratedItemType: 'plan' | 'trainer';
  stars: number;
  comment?: string;
  ratingTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalorieFormData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface InfoItemProps {
  label: string;
  value: string;
  icon?: string;
}

export interface SelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface StarRatingProps {
  initialRating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

export interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'file' | 'select' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  name?: string;
  min?: string;
  max?: string;
}

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  strings: typeof import('./constants').ARABIC_STRINGS;
}

export interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string, receiverId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  clearChat: (userId: string) => Promise<void>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  filter?: Record<string, any>;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface CalorieCalculatorFormData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
}

export interface CalorieCalculatorResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  imageUrl?: string;
  sets: number;
  reps: number;
  restTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressRecord {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutPlanId: string;
  date: Date;
  duration: number;
  exercises: {
    exerciseId: string;
    sets: {
      weight: number;
      reps: number;
      completed: boolean;
    }[];
    notes?: string;
  }[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: Date;
  meals: {
    name: string;
    time: Date;
    foods: {
      name: string;
      servingSize: number;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    }[];
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled' | 'expired';
  paymentStatus: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name: string;
    size: number;
  }[];
  sentAt: Date;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showProgress: boolean;
    showWorkouts: boolean;
  };
  theme: {
    darkMode: boolean;
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  language: 'ar' | 'en';
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

export interface ValidationError extends ErrorResponse {
  errors: {
    field: string;
    message: string;
  }[];
}

export interface AuthError extends ErrorResponse {
  code: 'INVALID_CREDENTIALS' | 'TOKEN_EXPIRED' | 'UNAUTHORIZED' | 'FORBIDDEN';
}

export interface NetworkError extends ErrorResponse {
  code: 'NETWORK_ERROR' | 'TIMEOUT' | 'SERVER_ERROR';
}

export type AppError = ValidationError | AuthError | NetworkError;