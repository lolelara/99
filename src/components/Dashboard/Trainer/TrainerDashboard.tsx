import React from 'react';
import { ARABIC_STRINGS } from '~/constants';
import MyTraineesList from '~/components/Dashboard/Trainer/MyTraineesList';
import TrainingVideoManagement from '~/components/Dashboard/Trainer/TrainingVideoManagement';
import NutritionFileManagement from '~/components/Dashboard/Trainer/NutritionFileManagement';
import TraineeScheduleManagement from '~/components/Dashboard/Trainer/TraineeScheduleManagement'; // Import new component
// import ChatWithTrainees from './ChatWithTrainees'; // If implementing chat

interface TrainerDashboardProps {
  activeTab?: string;
}

const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ activeTab = 'dashboard' }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return <TrainingVideoManagement />;
      case 'nutrition':
        return <NutritionFileManagement />;
      case 'manage-schedules': // New case for managing schedules
        return <TraineeScheduleManagement />;
      // case 'chat':
      //   return <ChatWithTrainees />;
      case 'my-trainees':
      default:
        return <MyTraineesList />;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">لوحة تحكم المدرب</h2>
      {/* محتوى لوحة التحكم سيتم إضافته لاحقاً */}
      {renderContent()}
    </div>
  );
};

export default TrainerDashboard;