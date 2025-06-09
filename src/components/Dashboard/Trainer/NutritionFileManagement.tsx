import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { NutritionFile, User } from '~/types';
import Button from '~/components/Shared/Button';
import Input from '~/components/Shared/Input';
import Select from '~/components/Shared/Select';
import Modal from '~/components/Shared/Modal';
import { ARABIC_STRINGS } from '~/constants';
import { useToast } from '~/hooks/useToast';

interface NutritionFileManagementProps {
  traineeOptions: { value: string; label: string }[];
}

const NutritionFileManagement: React.FC<NutritionFileManagementProps> = ({ traineeOptions: initialTraineeOptions }) => {
  const { user, users, nutritionFiles, addNutritionFile, deleteNutritionFile, fetchNutritionFiles: fetchNutritionFilesFromAuth, actionLoading } = useAuth();
  const { showToast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState(''); 
  const [selectedTraineeId, setSelectedTraineeId] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<NutritionFile[]>([]);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNutritionFilesFromAuth({ uploadedById: user.id });
    }
  }, [user, fetchNutritionFilesFromAuth]);

  const myTrainees = users.filter((u: User) => u.trainerId === user?.id);
  const traineeOptions: { value: string; label: string }[] = [
    { value: '', label: "عام (لجميع متدربيك)"},
    ...myTrainees.map((t: User) => ({ value: t.id, label: t.name || t.email || t.phoneNumber || '' }))
  ];

  const handleAddFileSubmit = async () => {
    if (!newFileName || !newFileUrl || !user) {
      alert("يرجى إدخال اسم للملف ورابط الملف.");
      return;
    }
    try {
        new URL(newFileUrl);
    } catch (_) {
        alert("الرجاء إدخال رابط URL صالح.");
        return;
    }

    const fileData: Partial<NutritionFile> = {
        name: newFileName,
        fileUrl: newFileUrl,
        traineeId: selectedTraineeId || undefined, 
    };

    const result = await addNutritionFile(fileData);
    if (result) {
        setIsModalOpen(false);
        setNewFileName('');
        setNewFileUrl('');
        setSelectedTraineeId(undefined);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if(window.confirm("هل أنت متأكد أنك تريد حذف هذا الملف؟")) {
        await deleteNutritionFile(fileId);
    }
  }

  const fetchLocalNutritionFiles = async () => {
    try {
      const response = await fetch('/api/nutrition-files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      showToast(ARABIC_STRINGS.error, 'error');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title) {
      showToast(ARABIC_STRINGS.required, 'error');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    if (selectedTraineeId) {
      formData.append('traineeId', selectedTraineeId);
    }

    try {
      const response = await fetch('/api/nutrition-files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        showToast(ARABIC_STRINGS.success, 'success');
        setTitle('');
        setSelectedFile(null);
        setSelectedTraineeId('');
        fetchLocalNutritionFiles();
      } else {
        showToast(ARABIC_STRINGS.error, 'error');
      }
    } catch (error) {
      showToast(ARABIC_STRINGS.error, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      const response = await fetch(`/api/nutrition-files/${fileId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast(ARABIC_STRINGS.success, 'success');
        fetchLocalNutritionFiles();
      } else {
        showToast(ARABIC_STRINGS.error, 'error');
      }
    } catch (error) {
      showToast(ARABIC_STRINGS.error, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">{ARABIC_STRINGS.nutritionFiles}</h2>
          <Button onClick={() => setIsModalOpen(true)} variant="success" disabled={actionLoading}>
             <i className="fas fa-plus me-2"></i> إضافة ملف تغذية
          </Button>
        </div>
        
        {actionLoading && nutritionFiles.length === 0 && <p className="text-blue-300">جاري تحميل الملفات...</p>}
        {!actionLoading && nutritionFiles.length === 0 && (
          <p className="text-gray-400">{ARABIC_STRINGS.noDataAvailable} لم تقم بإضافة أي ملفات تغذية بعد.</p>
        )}

        {nutritionFiles.length > 0 && (
          <ul className="space-y-3 mt-4">
            {nutritionFiles.map(file => (
              <li key={file.id} className="bg-gray-700 p-3 rounded-md shadow-sm flex justify-between items-center">
                <div>
                  <i className="fas fa-file-alt text-blue-400 me-2"></i>
                  <span className="text-gray-200">{file.name}</span>
                  {file.traineeId && <span className="text-xs text-gray-400 ms-2">(خاص بـ: {users.find(u=>u.id === file.traineeId)?.name || 'متدرب'})</span>}
                </div>
                <div className="flex items-center space-s-2">
                  <a 
                    href={file.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="فتح الملف في تبويب جديد"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                  <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteFile(file.id)}
                      disabled={actionLoading}
                      aria-label="Delete file"
                  >
                      <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة ملف تغذية جديد">
        <div className="space-y-4">
          <Input 
            type="text"
            label={ARABIC_STRINGS.fileName} 
            value={newFileName} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFileName(e.target.value)} 
            required 
          />
          <Input 
            label="رابط الملف (مثل Google Drive, Dropbox)" 
            type="url"
            value={newFileUrl} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFileUrl(e.target.value)} 
            placeholder="https://docs.google.com/document/d/..."
            required 
          />
          <Select 
            label="تخصيص لمتدرب (اختياري)"
            value={selectedTraineeId || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedTraineeId(e.target.value || undefined)}
            options={traineeOptions}
          />
        </div>
        <div className="mt-6 flex justify-end space-s-4">
          <Button onClick={() => setIsModalOpen(false)} variant="secondary" disabled={actionLoading}>
            {ARABIC_STRINGS.cancel}
          </Button>
          <Button onClick={handleAddFileSubmit} variant="primary" disabled={actionLoading}>
            {actionLoading ? ARABIC_STRINGS.loading : ARABIC_STRINGS.add}
          </Button>
        </div>
      </Modal>

      <form onSubmit={handleFileUpload} className="space-y-4">
        <Input
          type="text"
          label={ARABIC_STRINGS.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="file"
          label={ARABIC_STRINGS.videoFile}
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          required
        />
        <Input
          type="select"
          label={ARABIC_STRINGS.selectUser}
          value={selectedTraineeId || ''}
          onChange={(e) => setSelectedTraineeId(e.target.value || undefined)}
          options={traineeOptions}
        />
        <Button type="submit" isLoading={isUploading}>
          {ARABIC_STRINGS.upload}
        </Button>
      </form>

      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="bg-secondary p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{file.name}</h3>
              {file.traineeId && (
                <p className="text-sm text-gray-400">
                  {ARABIC_STRINGS.trainee}: {traineeOptions.find(t => t.value === file.traineeId)?.label}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="link"
                onClick={() => window.open(file.fileUrl, '_blank')}
              >
                <i className="fas fa-download" />
              </Button>
              <Button variant="danger" onClick={() => handleFileDelete(file.id)}>
                <i className="fas fa-trash" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionFileManagement;