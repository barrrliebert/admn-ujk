import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import Navbar from '../components/Navbar';

function InformationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('Fetching information with ID:', id);

  const [loading, error, information] = useFetchData(`/api/v1/information/${id}`);

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Information:', information);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !information?.data) {
    console.error('Error or no data:', error, information);
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Informasi tidak ditemukan
              </h2>
              <button
                onClick={() => navigate('/informasi')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Kembali ke daftar informasi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const info = information.data;

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'announcement': return 'Pengumuman';
      case 'news': return 'Berita';
      case 'event': return 'Acara';
      case 'academic': return 'Akademik';
      case 'organization': return 'Organisasi';
      default: return 'Lainnya';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'announcement': return 'bg-red-100 text-red-800';
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-purple-100 text-purple-800';
      case 'organization': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/informasi')}
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

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Category and Date */}
              <div className="flex flex-wrap items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(info.category)}`}>
                  {getCategoryLabel(info.category)}
                </span>
                <span className="text-sm text-gray-500 mt-2 sm:mt-0">
                  {new Date(info.createdAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {info.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {info.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {info.created_by?.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {info.created_by?.fullName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationDetail; 