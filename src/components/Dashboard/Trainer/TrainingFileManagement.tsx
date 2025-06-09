import React, { useState, useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import Button from '~/components/Shared/Button';
import Input from '~/components/Shared/Input';
import Modal from '~/components/Shared/Modal';
import { ARABIC_STRINGS } from '~/constants';
import { addTrainingFile, validateGoogleDriveUrl } from '~/services/storageService';

interface TrainingFile {
  id: string;
  title: string;
  url: string;
  type: 'drive' | 'storage';
  trainerId: string;
  createdAt: Date;
}

export default function TrainingFileManagement() {
  const { user } = useAuth();
  const [files, setFiles] = useState<TrainingFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFileTitle, setNewFileTitle] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'drive' | 'file'>('drive');

  // تحميل الملفات عند تحميل المكون
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/training-files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const validateDriveInput = (url: string): boolean => {
    if (!url) return false;
    return validateGoogleDriveUrl(url);
  };

  const handleUpload = async () => {
    if (!newFileTitle.trim()) {
      setError(ARABIC_STRINGS.fillAllFields);
      return;
    }

    if (uploadType === 'drive' && !validateDriveInput(driveUrl)) {
      setError(ARABIC_STRINGS.invalidDriveUrl);
      return;
    }

    if (uploadType === 'file' && !selectedFile) {
      setError(ARABIC_STRINGS.selectFile);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await addTrainingFile(
        newFileTitle,
        uploadType === 'drive' ? driveUrl : undefined,
        uploadType === 'file' ? selectedFile || undefined : undefined
      );

      if (!result.success || !result.url) {
        throw new Error(result.error || ARABIC_STRINGS.errorUploadingFile);
      }

      // حفظ معلومات الملف في قاعدة البيانات
      const response = await fetch('/api/training-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newFileTitle,
          url: result.url,
          type: result.type
        }),
      });

      if (!response.ok) {
        throw new Error(ARABIC_STRINGS.errorSavingFile);
      }

      // تحديث قائمة الملفات
      await fetchFiles();

      // إغلاق النافذة وإعادة تعيين الحقول
      setIsModalOpen(false);
      setNewFileTitle('');
      setDriveUrl('');
      setSelectedFile(null);
      setUploadType('drive');
    } catch (err) {
      setError(err instanceof Error ? err.message : ARABIC_STRINGS.errorUploadingFile);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{ARABIC_STRINGS.trainingFiles}</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          {ARABIC_STRINGS.addNewFile}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={ARABIC_STRINGS.addNewFile}
      >
        <div className="space-y-4">
          <Input
            label={ARABIC_STRINGS.fileTitle}
            value={newFileTitle}
            onChange={(e) => setNewFileTitle(e.target.value)}
            required
          />

          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="drive"
                  checked={uploadType === 'drive'}
                  onChange={(e) => setUploadType(e.target.value as 'drive' | 'file')}
                  className="ml-2"
                />
                {ARABIC_STRINGS.googleDriveFile}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="file"
                  checked={uploadType === 'file'}
                  onChange={(e) => setUploadType(e.target.value as 'drive' | 'file')}
                  className="ml-2"
                />
                {ARABIC_STRINGS.uploadFile}
              </label>
            </div>

            {uploadType === 'drive' ? (
              <Input
                label={ARABIC_STRINGS.driveUrl}
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">
                  {ARABIC_STRINGS.file}
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="w-full"
                  required
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? ARABIC_STRINGS.uploading : ARABIC_STRINGS.upload}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="secondary"
              disabled={isUploading}
            >
              {ARABIC_STRINGS.cancel}
            </Button>
          </div>
        </div>
      </Modal>

      {/* عرض قائمة الملفات */}
      <div className="grid gap-4 mt-4">
        {files.map((file: TrainingFile) => (
          <div key={file.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{file.title}</h3>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {ARABIC_STRINGS.viewOrDownload}
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {file.type === 'drive' ? ARABIC_STRINGS.googleDriveFile : ARABIC_STRINGS.uploadedFile}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 