import React from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

function Footer() {
  const [isLoading, , siteSettings] = useFetchData('/api/v1/site-settings');

  if (isLoading) return null;

  return (
    <footer className="bg-gray-900 text-white">
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            ©2024 {siteSettings?.data?.school_name} — Developed By{' '}
            <a
              href="https://portfolio-akbrr.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Akbar-ID (Johan)
            </a>
          </p>
        </div>
    </footer>
  );
}

export default Footer; 