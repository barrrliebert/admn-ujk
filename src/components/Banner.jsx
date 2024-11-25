import React from 'react';
import useFetchData from '../hooks/useFetchData';

function Banner() {
  const [isLoading, , siteSettings] = useFetchData('/api/v1/site-settings');

  if (isLoading) return null;

  return (
    <div className="relative w-full h-screen">
      <img
        src={siteSettings?.data?.banner_image || '/default-banner.jpg'}
        alt="School Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 flex flex-col items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Selamat Datang di {siteSettings?.data?.school_name}
          </h1>
          {siteSettings?.data?.tagline && (
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {siteSettings.data.tagline}
            </p>
          )}
          <div 
            className="mt-12"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <a 
              href="#about"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 font-medium shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Selengkapnya</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner; 