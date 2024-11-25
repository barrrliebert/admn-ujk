import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useFetchData from '../hooks/useFetchData';

function KompetensiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, , siteSettings] = useFetchData('/api/v1/site-settings');

  if (isLoading) return null;

  const kompetensi = siteSettings?.data?.competencies.find(k => k._id === id);

  if (!kompetensi) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <button 
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Kembali</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 p-8 flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md">
                  <img 
                    className="w-full h-auto object-contain rounded-xl shadow-md" 
                    src={kompetensi.image} 
                    alt={kompetensi.name} 
                  />
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:pl-12">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    {kompetensi.name}
                  </h1>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {kompetensi.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Informasi Tambahan
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Program Keahlian {siteSettings?.data?.school_name}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Program Pembelajaran 3 Tahun
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default KompetensiDetail; 