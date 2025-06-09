import React, { useState, useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import Button from '~/components/Shared/Button';
import Input from '~/components/Shared/Input';
import Modal from '~/components/Shared/Modal';
import { ARABIC_STRINGS } from '~/constants';
import { addTrainingVideo, validateYouTubeUrl } from '~/services/storageService';

interface TrainingVideo {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'storage';
  trainerId: string;
  createdAt: Date;
}

export default function TrainingVideoManagement() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'youtube' | 'file'>('youtube');

  // تحميل الفيديوهات عند تحميل المكون
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const validateYoutubeInput = (url: string): boolean => {
    if (!url) return false;
    return validateYouTubeUrl(url).valid;
  };

  const handleUpload = async () => {
    if (!newVideoTitle.trim()) {
      setError(ARABIC_STRINGS.fillAllFields);
      return;
    }

    if (uploadType === 'youtube' && !validateYoutubeInput(youtubeUrl)) {
      setError(ARABIC_STRINGS.invalidYoutubeUrl);
      return;
    }

    if (uploadType === 'file' && !selectedFile) {
      setError(ARABIC_STRINGS.selectVideoFile);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await addTrainingVideo(
        newVideoTitle,
        uploadType === 'youtube' ? youtubeUrl : undefined,
        uploadType === 'file' ? selectedFile || undefined : undefined
      );

      if (!result.success || !result.url) {
        throw new Error(result.error || ARABIC_STRINGS.errorUploadingVideo);
      }

      // حفظ معلومات الفيديو في قاعدة البيانات
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newVideoTitle,
          url: result.url,
          type: result.type
        }),
      });

      if (!response.ok) {
        throw new Error(ARABIC_STRINGS.errorSavingVideo);
      }

      // تحديث قائمة الفيديوهات
      await fetchVideos();

      // إغلاق النافذة وإعادة تعيين الحقول
      setIsModalOpen(false);
      setNewVideoTitle('');
      setYoutubeUrl('');
      setSelectedFile(null);
      setUploadType('youtube');
    } catch (err) {
      setError(err instanceof Error ? err.message : ARABIC_STRINGS.errorUploadingVideo);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{ARABIC_STRINGS.trainingVideos}</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          {ARABIC_STRINGS.addNewVideo}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={ARABIC_STRINGS.addNewVideo}
      >
        <div className="space-y-4">
          <Input
            label={ARABIC_STRINGS.videoTitle}
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            required
          />

          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="youtube"
                  checked={uploadType === 'youtube'}
                  onChange={(e) => setUploadType(e.target.value as 'youtube' | 'file')}
                  className="ml-2"
                />
                {ARABIC_STRINGS.youtubeVideo}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="file"
                  checked={uploadType === 'file'}
                  onChange={(e) => setUploadType(e.target.value as 'youtube' | 'file')}
                  className="ml-2"
                />
                {ARABIC_STRINGS.uploadVideo}
              </label>
            </div>

            {uploadType === 'youtube' ? (
              <Input
                label={ARABIC_STRINGS.youtubeUrl}
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">
                  {ARABIC_STRINGS.videoFile}
                </label>
                <input
                  type="file"
                  accept="video/*"
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

      {/* عرض قائمة الفيديوهات */}
      <div className="grid gap-4 mt-4">
        {videos.map((video: TrainingVideo) => (
          <div key={video.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            {video.type === 'youtube' ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              </div>
            ) : (
              <video
                src={video.url}
                controls
                className="w-full rounded"
                title={video.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}