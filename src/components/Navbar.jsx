import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetchData from '../hooks/useFetchData';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, , siteSettings] = useFetchData('/api/v1/site-settings');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) return null;

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img
              src={siteSettings?.data?.school_logo || '/default-logo.png'}
              alt="School Logo"
              className="h-12 w-12 mr-3 object-contain p-1 bg-white rounded-lg shadow-sm"
            />
            <div>
              <div className="text-xl font-bold text-blue-700 leading-tight">
                {siteSettings?.data?.school_name || 'School Name'}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/informasi" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Informasi
            </Link>
            <Link 
              to="/agenda" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Agenda
            </Link>
            <Link 
              to="/album" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Gallery
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 hidden sm:block">{user.fullName}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium truncate">{user.fullName}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 