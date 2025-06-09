import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// أنواع الملفات المسموح بها
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  type?: 'youtube' | 'drive' | 'storage';
}

/**
 * التحقق من صحة رابط YouTube
 * @param url الرابط المراد التحقق منه
 */
export function validateYouTubeUrl(url: string): { valid: boolean; videoId?: string } {
  try {
    const urlObj = new URL(url);
    let videoId = '';

    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      videoId = urlObj.searchParams.get('v') || '';
    }

    return {
      valid: videoId.length > 0,
      videoId
    };
  } catch {
    return { valid: false };
  }
}

/**
 * التحقق من صحة رابط Google Drive
 * @param url الرابط المراد التحقق منه
 */
export function validateGoogleDriveUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'drive.google.com' && 
           (url.includes('/file/d/') || url.includes('/view') || url.includes('/preview'));
  } catch {
    return false;
  }
}

/**
 * تحويل رابط Google Drive إلى رابط مباشر للتحميل
 * @param url رابط Google Drive
 */
export function getGoogleDriveDownloadUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const fileId = url.match(/\/file\/d\/([^/]+)/)?.[1] || 
                   urlObj.searchParams.get('id');
    
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return url;
  } catch {
    return url;
  }
}

/**
 * تحويل رابط YouTube إلى رابط التضمين
 * @param url رابط YouTube
 */
export function getYouTubeEmbedUrl(url: string): string {
  const { valid, videoId } = validateYouTubeUrl(url);
  if (valid && videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
}

/**
 * إضافة فيديو تدريبي جديد (يدعم روابط YouTube)
 * @param title عنوان الفيديو
 * @param url رابط الفيديو (YouTube أو ملف)
 * @param file الملف (اختياري)
 */
export async function addTrainingVideo(
  title: string,
  url?: string,
  file?: File
): Promise<UploadResult> {
  try {
    // التحقق من رابط YouTube
    if (url) {
      const youtubeValidation = validateYouTubeUrl(url);
      if (youtubeValidation.valid) {
        return {
          success: true,
          url: getYouTubeEmbedUrl(url),
          type: 'youtube'
        };
      }
    }

    // إذا تم تقديم ملف، قم برفعه إلى Firebase Storage
    if (file) {
      const videoPath = `training-videos/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, videoPath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      return {
        success: true,
        url: downloadUrl,
        type: 'storage'
      };
    }

    return {
      success: false,
      error: 'يرجى تقديم رابط YouTube صالح أو ملف فيديو'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة الفيديو'
    };
  }
}

/**
 * إضافة ملف تدريبي جديد (يدعم روابط Google Drive)
 * @param title عنوان الملف
 * @param url رابط الملف (Google Drive أو ملف)
 * @param file الملف (اختياري)
 */
export async function addTrainingFile(
  title: string,
  url?: string,
  file?: File
): Promise<UploadResult> {
  try {
    // التحقق من رابط Google Drive
    if (url && validateGoogleDriveUrl(url)) {
      return {
        success: true,
        url: getGoogleDriveDownloadUrl(url),
        type: 'drive'
      };
    }

    // إذا تم تقديم ملف، قم برفعه إلى Firebase Storage
    if (file) {
      const filePath = `training-files/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      return {
        success: true,
        url: downloadUrl,
        type: 'storage'
      };
    }

    return {
      success: false,
      error: 'يرجى تقديم رابط Google Drive صالح أو ملف'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة الملف'
    };
  }
}

/**
 * حذف ملف من Firebase Storage
 * @param path المسار في Storage
 */
export async function deleteFile(path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'حدث خطأ أثناء حذف الملف'
    };
  }
}

/**
 * الحصول على رابط التحميل للملف
 * @param path المسار في Storage
 */
export async function getFileUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
} 