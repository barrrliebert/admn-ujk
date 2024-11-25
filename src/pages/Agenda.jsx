import React, { useState, useEffect } from 'react';
import ApiService from '../utils/apiService';
import { useNavigate } from 'react-router-dom';

function Agenda() {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    status: '',
    search: '',
    page: 1,
    limit: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendas();
  }, [filter]);

  const fetchAgendas = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filter,
        sort: 'desc'
      }).toString();

      console.log('Fetching agendas with params:', queryParams);
      const response = await ApiService.get(`/api/v1/agenda?${queryParams}`);
      console.log('Agenda response:', response);
      
      if (response?.result_code === 0) {
        setAgendas(response.result);
      }
    } catch (err) {
      console.error('Error fetching agendas:', err);
      setError(err?.message || 'Failed to fetch agendas');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type, value) => {
    console.log(`Changing ${type} filter to:`, value);
    setFilter(prev => ({
      ...prev,
      [type]: value,
      page: 1 // Reset page when filter changes
    }));
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

  const categories = [
    { value: '', label: 'Semua Kategori' },
    { value: 'academic', label: 'Akademik' },
    { value: 'organization', label: 'Organisasi' },
    { value: 'competition', label: 'Kompetisi' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'other', label: 'Lainnya' }
  ];

  const statuses = [
    { value: '', label: 'Semua Status' },
    { value: 'upcoming', label: 'Akan Datang' },
    { value: 'ongoing', label: 'Sedang Berlangsung' },
    { value: 'expired', label: 'Selesai' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          
          {/* Search and Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Cari agenda..."
              value={filter.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={filter.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(filter.category || filter.status || filter.search) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filter.search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                  Pencarian: {filter.search}
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filter.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                  Kategori: {categories.find(c => c.value === filter.category)?.label}
                  <button
                    onClick={() => handleFilterChange('category', '')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filter.status && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                  Status: {statuses.find(s => s.value === filter.status)?.label}
                  <button
                    onClick={() => handleFilterChange('status', '')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {(filter.category || filter.status || filter.search) && (
                <button
                  onClick={() => setFilter({
                    category: '',
                    status: '',
                    search: '',
                    page: 1,
                    limit: 10
                  })}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset semua filter
                </button>
              )}
            </div>
          )}
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
            {/* Agenda Cards */}
            {agendas?.data?.rows?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada agenda yang ditemukan</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {agendas?.data?.rows?.map((agenda) => (
                  <div 
                    key={agenda._id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/agenda/${agenda._id}`)}
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(agenda.category)}`}>
                          {getCategoryLabel(agenda.category)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agenda.status)}`}>
                          {getStatusLabel(agenda.status)}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {agenda.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {agenda.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-500">
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Mulai: {new Date(agenda.start_time).toLocaleString('id-ID')}
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Selesai: {new Date(agenda.end_time).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {agenda.created_by?.fullName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {agenda.created_by?.fullName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {agendas?.data?.total_page > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilter(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filter.page === 1}
                    className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50"
                  >
                    Sebelumnya
                  </button>
                  {[...Array(agendas.data.total_page)].map((_, i) => (
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
                    disabled={filter.page === agendas.data.total_page}
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

export default Agenda; 