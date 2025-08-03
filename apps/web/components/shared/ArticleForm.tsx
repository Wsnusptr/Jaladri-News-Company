"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  type: 'STANDARD' | 'VIDEO' | 'NETWORK' | 'LIFESTYLE' | 'FEATURED_STRIP' | 'JALADRI_NETWORK';
}

interface ArticleFormProps {
  onSubmit: (data: ArticleFormData, file?: File) => Promise<void>;
  initialData?: Partial<ArticleFormData>;
  buttonText?: string;
}

export function ArticleForm({ onSubmit, initialData = {}, buttonText = "Submit" }: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData.title || '',
    content: initialData.content || '',
    category: initialData.category || '',
    imageUrl: initialData.imageUrl || '',
    type: initialData.type || 'JALADRI_NETWORK',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Detect if running in CMS (port 3001) and use proxy
        const isCMS = window.location.port === '3001' || window.location.hostname.includes('cms');
        const categoriesUrl = isCMS ? '/api/proxy/categories' : '/api/categories';
        
        const response = await fetch(categoriesUrl);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setError('Failed to load categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData.imageUrl) {
      setPreviewUrl(initialData.imageUrl);
    }
    // Cleanup for object URLs
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [initialData.imageUrl, previewUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isVideo = formData.type === 'VIDEO';
    const isImage = ['STANDARD', 'LIFESTYLE', 'JALADRI_NETWORK'].includes(formData.type);

    if (isVideo && !file.type.startsWith('video/')) {
      setError('Please upload a video file.');
      return;
    }

    if (isImage && !file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // Upload file to server
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      // Detect if running in CMS and use proxy
      const isCMS = window.location.port === '3001' || window.location.hostname.includes('cms');
      const uploadUrl = isCMS ? '/api/proxy/upload' : '/api/upload';
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const uploadResult = await uploadResponse.json();

      // Update form data with uploaded file URL
      setFormData(prev => ({ ...prev, imageUrl: uploadResult.url }));

      // Create preview URL for immediate display
      const objectUrl = URL.createObjectURL(file);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(objectUrl);
      setSelectedFile(file);

    } catch (error: any) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!formData.imageUrl) {
      setError('Please upload an image or video file.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit(formData);

      // Reset form after successful submission
      setFormData({
        title: '',
        content: '',
        category: '',
        imageUrl: '',
        type: 'JALADRI_NETWORK',
      });
      setSelectedFile(null);
      setPreviewUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg text-sm mb-6 border border-red-200 dark:border-red-700">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Judul Artikel
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
            required
            placeholder="Masukkan judul artikel yang menarik..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Konten Artikel
          </label>
          <textarea
            name="content"
            id="content"
            rows={12}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200 resize-none"
            required
            placeholder="Tulis konten artikel Anda di sini..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Kategori
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
              required
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories ? 'Memuat kategori...' : 'Pilih kategori'}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Jenis Konten
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
            >
              <option value="STANDARD">Standard</option>
              <option value="VIDEO">Video</option>
              <option value="NETWORK">Network</option>
              <option value="LIFESTYLE">Lifestyle</option>
              <option value="FEATURED_STRIP">Featured Strip</option>
              <option value="JALADRI_NETWORK">Jaladri Network</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Upload {formData.type === 'VIDEO' ? 'Video' : 'Gambar'}
          </label>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengupload...
                </div>
              ) : (
                `Pilih ${formData.type === 'VIDEO' ? 'Video' : 'Gambar'}`
              )}
            </button>

            {selectedFile && (
              <span className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {selectedFile.name}
              </span>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={formData.type === 'VIDEO' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Preview:</p>
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative h-48 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                  {formData.type === 'VIDEO' ? (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      controls
                      onError={() => {
                        setError('Error loading video preview');
                      }}
                    />
                  ) : (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={() => {
                        setError('Error loading image preview');
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-600">
          <button
            type="submit"
            disabled={isLoading || isUploading || !formData.imageUrl}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </div>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>
    </div>
  );
}