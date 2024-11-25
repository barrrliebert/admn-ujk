import { useEffect } from 'react';
import ApiService from '../utils/apiService';

const useFavicon = () => {
  useEffect(() => {
    const setFavicon = async () => {
      try {
        const response = await ApiService.get('/api/v1/site-settings');
        if (response?.result?.data?.favicon) {
          // Hapus semua favicon yang ada
          const faviconLinks = document.querySelectorAll("link[rel*='icon']");
          faviconLinks.forEach(link => link.remove());

          // Buat link baru untuk favicon
          const link = document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'icon';
          link.href = response.result.data.favicon;
          document.head.appendChild(link);

          // Tambahkan juga untuk apple-touch-icon
          const appleIcon = document.createElement('link');
          appleIcon.rel = 'apple-touch-icon';
          appleIcon.href = response.result.data.favicon;
          document.head.appendChild(appleIcon);
        }
      } catch (error) {
        console.error('Error setting favicon:', error);
      }
    };

    setFavicon();

    // Cleanup function
    return () => {
      const faviconLinks = document.querySelectorAll("link[rel*='icon']");
      faviconLinks.forEach(link => link.remove());
    };
  }, []);
};

export default useFavicon; 