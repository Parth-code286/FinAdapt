import { API_PATHS } from './apiPath';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE_UPLOAD.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (!response.data.imageUrl && response.data.imagePath) {
      response.data.imageUrl = `${axiosInstance.defaults.baseURL}/${response.data.imagePath}`;
    }
    return response.data;
  } catch (error) {
    console.error('Image upload failed:', error?.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;