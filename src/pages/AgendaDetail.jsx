import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import Navbar from '../components/Navbar';

function AgendaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, error, agenda] = useFetchData(`/api/v1/agenda/${id}`);

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

  if (error || !agenda?.data) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Agenda tidak ditemukan
              </h2>
              <button
                onClick={() => navigate('/agenda')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Kembali ke daftar agenda
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const info = agenda.data;

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'academic': return 'Akademik';
      case 'organization': return 'Organisasi';
      case 'competition': return 'Kompetisi';
      case 'seminar': return 'Seminar';
      case 'workshop': return 'Workshop';
      default: return 'Lainnya';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'expired': return 'Selesai';
      default: return status;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'organization': return 'bg-green-100 text-green-800';
      case 'competition': return 'bg-red-100 text-red-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
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
            onClick={() => navigate('/agenda')}
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
              {/* Category and Status */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(info.category)}`}>
                  {getCategoryLabel(info.category)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(info.status)}`}>
                  {getStatusLabel(info.status)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {info.title}
              </h1>

              {/* Time Info */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Mulai: {new Date(info.start_time).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Selesai: {new Date(info.end_time).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {info.description}
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
                    <p className="text-sm text-gray-500">
                      Dibuat pada {new Date(info.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
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

export default AgendaDetail; 