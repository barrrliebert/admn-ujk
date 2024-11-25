import React, { useState, useEffect } from 'react';
import ApiService from '../utils/apiService';
import { useNavigate } from 'react-router-dom';

function Information() {
  const [informations, setInformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    search: '',
    page: 1,
    limit: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchInformations();
  }, [filter]);

  const fetchInformations = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filter,
        sort: 'desc'
      }).toString();

      const response = await ApiService.get(`/api/v1/information?${queryParams}`);
      
      if (response?.result_code === 0) {
        setInformations(response.result);
      }
    } catch (err) {
      setError(err?.message || 'Failed to fetch information');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'announcement':
        return 'bg-red-100 text-red-800';
      case 'news':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'academic':
        return 'bg-purple-100 text-purple-800';
      case 'organization':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Informasi</h1>
          
          {/* Search and Filter */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Cari informasi..."
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value, page: 1 }))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value, page: 1 }))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Kategori</option>
              <option value="announcement">Pengumuman</option>
              <option value="news">Berita</option>
              <option value="event">Acara</option>
              <option value="academic">Akademik</option>
              <option value="organization">Organisasi</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Information Cards */}
            {informations?.data?.rows?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada informasi yang ditemukan</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {informations?.data?.rows?.map((info) => (
                  <div 
                    key={info._id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => {
                      console.log('Clicking info with ID:', info._id);
                      navigate(`/informasi/${info._id}`);
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(info.category)}`}>
                          {info.category === 'announcement' ? 'Pengumuman' :
                           info.category === 'news' ? 'Berita' :
                           info.category === 'event' ? 'Acara' :
                           info.category === 'academic' ? 'Akademik' :
                           info.category === 'organization' ? 'Organisasi' : 'Lainnya'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(info.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{info.content}</p>
                      
                      {/* Author Info */}
                      <div className="flex items-center pt-4 border-t">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{info.created_by?.fullName}</p>
                          <p className="text-xs text-gray-500">{info.created_by?.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {informations?.data?.total_page > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilter(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filter.page === 1}
                    className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50"
                  >
                    Sebelumnya
                  </button>
                  {[...Array(informations.data.total_page)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setFilter(prev => ({ ...prev, page: i + 1 }))}
                      className={`px-3 py-1 rounded-md ${
                        filter.page === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setFilter(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={filter.page === informations.data.total_page}
                    className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50"
                  >
                    Selanjutnya
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Information; 