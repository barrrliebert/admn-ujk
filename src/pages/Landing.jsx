import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import useFavicon from '../hooks/useFavicon';
import useFetchData from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

function Landing() {
  useFavicon();
  const [isLoading, , siteSettings] = useFetchData('/api/v1/site-settings');
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner dengan AOS */}
      <div data-aos="fade-up">
        <Banner />
      </div>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white mt-8" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Video */}
            <div className="w-full md:w-[55%]" data-aos="fade-right" data-aos-delay="200">
              <div className="w-full h-full">
                <iframe
                  src={`${siteSettings?.data?.school_video?.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${siteSettings?.data?.school_video?.split('v=')[1]}`}
                  title="School Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[350px] rounded-xl shadow-2xl"
                />
              </div>
            </div>
            {/* Text Content */}
            <div className="w-full md:w-[45%]" data-aos="fade-left" data-aos-delay="400">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {siteSettings?.data?.school_name}
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  {siteSettings?.data?.about_school}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8" data-aos="fade-up">
            Kepala Sekolah
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            {/* Principal Image */}
            <div className="w-full md:w-1/3" data-aos="fade-left" data-aos-delay="200">
              <div className="max-w-[300px] mx-auto">
                <img
                  src={siteSettings?.data?.principal_photo || '/default-principal.jpg'}
                  alt={siteSettings?.data?.principal_name}
                  className="w-full h-auto object-contain rounded-lg shadow-xl"
                />
              </div>
            </div>
            {/* Principal Info */}
            <div className="w-full md:w-2/3" data-aos="fade-right" data-aos-delay="400">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {siteSettings?.data?.principal_name}
              </h3>
              <div className="prose prose-lg max-w-none">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 whitespace-pre-line">
                    {siteSettings?.data?.principal_education}
                  </p>
                </div>
                <div className="p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{siteSettings?.data?.principal_message}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kompetensi Full Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kompetensi Keahlian
            </h2>
            <p className="text-gray-600 text-lg">
              Program keahlian yang tersedia di {siteSettings?.data?.school_name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {siteSettings?.data?.competencies.map((comp, index) => (
              <div 
                key={comp._id}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => navigate(`/kompetensi/${comp._id}`)}
              >
                <img
                  src={comp.image}
                  alt={comp.name}
                  className="h-36 w-36 mx-auto mb-4 object-contain"
                />
                <h3 className="text-base font-semibold text-gray-800">
                  {comp.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Visi & Misi
            </h2>
            <p className="text-gray-600 text-lg">
              Arah dan tujuan {siteSettings?.data?.school_name}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Visi */}
            <div className="w-full md:w-1/2" data-aos="fade-right" data-aos-delay="200">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Visi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {siteSettings?.data?.vision}
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="w-full md:w-1/2" data-aos="fade-left" data-aos-delay="400">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Misi
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-400 before:to-blue-300">
                  {siteSettings?.data?.mission?.map((item, index) => (
                    <div 
                      key={index}
                      className="relative flex items-start pl-8"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <span className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold shadow-lg">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1.5 ml-3">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section className="py-20" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Fasilitas Sekolah
            </h2>
            <p className="text-gray-600">
              Fasilitas yang mendukung kegiatan belajar mengajar di {siteSettings?.data?.school_name}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {siteSettings?.data?.facilities.map((facility, index) => (
              <div 
                key={facility._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-center text-gray-800">
                    {facility.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-6 mb-12 flex flex-wrap">
      <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Lokasi Sekolah
            </h2>
            <p className="text-gray-600">
              Temukan kami di lokasi strategis dan mudah dijangkau
            </p>
          </div>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto gradient w-64 my-0 py-0 rounded-t"></div>
      </div>

      {/* Denah */}
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="w-full md:w-1/2 p-6">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-4 text-center">
          Denah
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="aspect-w-16 aspect-h-12">
                <img 
                  src={siteSettings?.data?.school_map || '/default-map.jpg'}
                  alt="Denah Sekolah"
                  className="w-full h-full object-cover"
                />
              </div>
        </div>
      </div>

      {/* Lokasi Google Maps */}
      <div data-aos="fade-left" className="w-full md:w-1/2 p-6">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-4 text-center">
          Lokasi Kami
        </h1>
        <div className="aspect-w-16 aspect-h-12" 
                dangerouslySetInnerHTML={{ __html: siteSettings?.data?.school_location }} 
              />

        {/* Contact Information */}
        <section className="container mx-auto" data-aos="fade-up">
          <h1 className="text-4xl font-bold leading-tight text-center text-gray-900 mb-8">
            Contact Information
          </h1>
          <div className="grid grid-cols-1 gap-4" data-aos="fade-up">
            {/* Instagram Account */}
            {siteSettings?.data?.contacts?.instagram && (
              <div className="flex items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png" 
                    alt="Instagram Icon" 
                    className="h-8 w-8" 
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Instagram</h2>
                  <a 
                    href={`https://www.instagram.com/${siteSettings.data.contacts.instagram}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline hover:text-black"
                  >
                    @{siteSettings.data.contacts.instagram}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            {siteSettings?.data?.contacts?.email && (
              <div className="flex items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded">
                  <img 
                    src="https://ssl.gstatic.com/images/branding/product/2x/hh_gmail_96dp.png" 
                    alt="Email Icon" 
                    className="h-8 w-8" 
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                  <a 
                    href={`mailto:${siteSettings.data.contacts.email}`} 
                    className="text-gray-600 hover:underline hover:text-black"
                  >
                    {siteSettings.data.contacts.email}
                  </a>
                </div>
              </div>
            )}

            {/* Facebook */}
            {siteSettings?.data?.contacts?.facebook && (
              <div className="flex items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                    alt="Facebook Icon" 
                    className="h-8 w-8" 
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Facebook</h2>
                  <a 
                    href={`https://www.facebook.com/${siteSettings.data.contacts.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:underline hover:text-black"
                  >
                    {siteSettings.data.contacts.facebook}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing; 