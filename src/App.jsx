import { useState, useEffect, useRef } from "react";
import "./App.css";


import acService1 from "./assets/acservice.png";
import ref1 from "./inside/ref1.jpg";
import main2 from "./staticimage/main2.jpg";
import w1 from "./assets/w1.mp4";
import w2 from "./assets/w2.mp4";
import w3 from "./assets/w3.mp4";
import w4 from "./assets/w4.mp4";
import p1 from "./assets/p1.jpeg";
import p2 from "./assets/p2.jpeg";
import p3 from "./assets/p3.jpeg";
import p4 from "./assets/p4.jpeg";
import p6 from "./assets/p6.jpeg";
import p7 from "./assets/p7.jpeg";
//import p8 from "./assets/p8.jpeg";
import p9 from "./assets/p9.jpeg";
//import p10 from "./assets/p10.jpeg";
import p11 from "./assets/p11.jpeg";
import p12 from "./assets/p12.jpeg";
import p13 from "./assets/p13.jpeg";
// import logo from "./inside/log-jpg"

export default function App() {
  const PHONE_NUMBER = "+91 9176508072";

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [videoAutoPlay, setVideoAutoPlay] = useState(true);
  const [fullImage, setFullImage] = useState(null);
  const [fullVideo, setFullVideo] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('images');
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const slideTimer = useRef(null);
  const videoTimer = useRef(null);
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    // Set the page title
    document.title = "Best AC Repair & Service in Coimbatore | Quick Response";

    // Add or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Professional AC repair, installation & maintenance services in Coimbatore. 5+ years experience, same-day service, affordable prices. Call +91 9176508072 now!";

    // Add or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "AC repair Coimbatore, AC service Coimbatore, AC installation, AC maintenance, best AC repair near me, emergency AC service Coimbatore";
  }, []);

  // Default AC service images - ALL VISITORS SEE THESE
  const defaultAcImages = [

    p1, p2, p3, p4, p6, p7, p9, p11, p12, p13 // p10 ,p8,
  ];

  // Static images for before contact section
  const staticContactImages = [main2];

  // Sample videos - ALL VISITORS SEE THESE
  const sampleVideos = [w1, w2, w3, w4];

  // Initialize with DEFAULT images only (no localStorage)
  useEffect(() => {
    const loadStaticData = () => {
      try {
        setImages(defaultAcImages);
        setVideos(sampleVideos);
      } catch (error) {
        console.error("Error loading data:", error);
        setImages(defaultAcImages);
        setVideos(sampleVideos);
      } finally {
        setLoading(false);
        setVideoLoading(false);
      }
    };

    // Simulate loading delay for better UX
    setTimeout(() => {
      loadStaticData();
    }, 500);
  }, []);

  // Scroll detection for header visibility
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // If scrolling down, hide header
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowHeader(false);
        }
        // If scrolling up, show header
        else if (currentScrollY < lastScrollY) {
          setShowHeader(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  const scrollToSection = (ref) => {
    setShowDropdown(false);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-play effect for images
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [autoPlay, images.length]);

  // Auto-play effect for videos
  useEffect(() => {
    if (videoAutoPlay && videos.length > 1) {
      startVideoAutoPlay();
    } else {
      stopVideoAutoPlay();
    }

    return () => stopVideoAutoPlay();
  }, [videoAutoPlay, videos.length]);

  const startAutoPlay = () => {
    stopAutoPlay();
    slideTimer.current = setInterval(() => {
      setIndex(i => images.length ? (i + 1) % images.length : 0);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (slideTimer.current) {
      clearInterval(slideTimer.current);
      slideTimer.current = null;
    }
  };

  const startVideoAutoPlay = () => {
    stopVideoAutoPlay();
    videoTimer.current = setInterval(() => {
      setVideoIndex(i => videos.length ? (i + 1) % videos.length : 0);
    }, 8000);
  };

  const stopVideoAutoPlay = () => {
    if (videoTimer.current) {
      clearInterval(videoTimer.current);
      videoTimer.current = null;
    }
  };

  const prev = () => {
    stopAutoPlay();
    setIndex(i => images.length ? (i - 1 + images.length) % images.length : 0);
  };

  const next = () => {
    stopAutoPlay();
    setIndex(i => images.length ? (i + 1) % images.length : 0);
  };

  const prevVideo = () => {
    stopVideoAutoPlay();
    setVideoIndex(i => videos.length ? (i - 1 + videos.length) % videos.length : 0);
  };

  const nextVideo = () => {
    stopVideoAutoPlay();
    setVideoIndex(i => videos.length ? (i + 1) % videos.length : 0);
  };

  // Services list
  const services = [
    "AC General Service",
    "AC Deep Cleaning",
    "Gas Filling / Gas Top-Up",
    "Water Leakage Fix",
    "Noisy AC Repair",
    "AC Installation and Dismantling",
    "All Brand Refrigerator Service"
  ];

  // Features list
  const features = [
    "5+ Years of Experience",
    "Fast Same-Day Service",
    "Affordable Pricing",
    "Professional Technicians",
    "Service for All AC Brands",
    "100% Customer Satisfaction"
  ];

  // Why Choose Us detailed points
  const whyChooseUsPoints = [
    {
      icon: "🕒",
      title: "24/7 Emergency Service",
      description: "We're available round the clock for emergency AC repairs"
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      description: "We offer the most competitive prices in Coimbatore"
    },
    {
      icon: "🎓",
      title: "Certified Technicians",
      description: "All our technicians are certified and trained regularly"
    },
    {
      icon: "🔧",
      title: "Genuine Spares",
      description: "We use only genuine spare parts from authorized dealers"
    }
  ];

  return (
    <div className="bg-blue-50 text-gray-800 min-h-screen">
      {/* Header with show/hide animation */}
      <header
        className={`shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="max-w-6xl mx-auto px-3 py-3 flex flex-row items-center gap-3 justify-between relative">
          <div style={{display:"flex",flexDirection:"row",gap:"12px",alignItems:"center"}}> 
            {/* <img src="/log-jpg.jpg" alt="Logo" height={70} width={70} style={{ borderRadius: "50%",marginLeft:"20px" }}/> */}
            <h1 className="text-xl sm:text-5xl text-white font-bold text-center sm:text-left">Ak Chillcool</h1>
          </div>

          <div className="flex gap-3 relative">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="px-4 py-3 sm:px-7 sm:py-5 bg-green-600 text-sm sm:text-base
           no-underline text-white hover:text-white visited:text-white
           rounded-lg shadow-md hover:bg-green-500
           transition-all duration-300 flex items-center gap-2"

            >
              {/* <span>📞</span>  */}
              Call Now
            </a>


            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-4 py-3 sm:px-7 sm:py-5 bg-blue-600 text-sm sm:text-base
           text-white rounded-lg shadow-md hover:bg-blue-500 transition-all"
            >
              Menu
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl z-50 p-3 text-gray-800 border">
                <h3
                  className="font-semibold cursor-pointer p-3 hover:bg-blue-50 rounded transition-colors border-b"
                  onClick={() => scrollToSection(aboutRef)}
                >
                  👥 About Us
                </h3>

                <h3
                  className="font-semibold cursor-pointer p-3 hover:bg-blue-50 rounded transition-colors border-b"
                  onClick={() => scrollToSection(whyRef)}
                >
                  ⭐ Why Choose Us
                </h3>

                <h3
                  className="font-semibold cursor-pointer p-3 hover:bg-blue-50 rounded transition-colors"
                  onClick={() => scrollToSection(addressRef)}
                >
                  📍 Contact Us
                </h3>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Add padding-top to account for fixed header */}
      {/* <div className="pt-24 bg-blue-100 sm:pt-32"> */}



      {/* <main className="max-w-6xl bg-gray-300 mx-auto px-4 py-8"> */}
      <main className="max-w-6xl bg-gray-200 mx-auto px-4 pt-28 pb-8">

        <div className="text-center   pb-4 p-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
            Professional AC Repair & Installation Services in Coimbatore
          </h1>

          <p className="text-lg mt-2 text-gray-900">
            Serving Coimbatore with 5+ years of trusted AC service
          </p>
        </div>
        {/* Static Images Section */}
        <section className="mb-12">
          <div className="bg-blue-200 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl text-gray-900 text-b text-center mb-8 max-w-3xl mx-auto">
              See how we transform AC units with our professional service. From installation to maintenance,
              we ensure every job is done to perfection.
            </h3>

            <div className="space-y-8">
              {staticContactImages.map((src, index) => (
                <div key={index} className="relative group w-full max-w-5xl mx-auto">
                  <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={src}
                      alt="AC installation service in Coimbatore - professional AC work"
                      className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <p className="text-sm opacity-90">Professional AC Work</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={whyRef} className="mb-12">
          <div className="bg-purple-300 rounded-2xl shadow-lg p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Premium AC Services</h3>
                <ul className="space-y-4">
                  {services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg bg-white p-4 rounded-xl shadow-sm">
                      <span className="text-yellow-500 text-2xl">⭐</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={acService1}
                  alt="AC Service Professional in Coimbatore - certified technician"
                  className="w-full h-96 object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Detailed Section */}
        <section className="mb-12">
          <div className="bg-emerald-100 rounded-2xl shadow-lg p-6 sm:p-10">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Our Service?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {whyChooseUsPoints.map((point, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h4>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-10 mt-8">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <img
                    src={ref1}
                    alt="Professional AC Technician in Coimbatore repairing air conditioner"
                    className="w-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Excellence</h4>
                <div className="space-y-5">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                      <span className="text-green-600 text-2xl mt-1">✓</span>
                      <div>
                        <p className="text-lg font-medium text-gray-800">{feature}</p>
                        <p className="text-gray-600 text-sm mt-1">Expert AC service guaranteed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section ref={aboutRef} className="mb-12">
          <div className="bg-orange-200 rounded-2xl shadow-lg p-6 sm:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About AC Service</h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-xl shadow-sm">
                With over <strong className="text-blue-600">5+ years of dedicated experience</strong>, we have established ourselves as Coimbatore's most trusted AC service provider. Our commitment to excellence ensures every home and business enjoys optimal cooling comfort year-round.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-xl shadow-sm">
                Our team comprises <strong className="text-blue-600">certified AC technicians</strong> who undergo regular training to stay updated with the latest AC technologies. From complex installations to routine maintenance, we handle every job with precision and professionalism.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <h4 className="font-bold text-lg mb-2">Transparent Pricing</h4>
                  <p className="text-gray-600">No hidden charges, upfront quotes for all AC services</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold text-lg mb-2">Same-Day Service</h4>
                  <p className="text-gray-600">Quick response, immediate AC solutions</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="font-bold text-lg mb-2">Service Warranty</h4>
                  <p className="text-gray-600">90-day warranty on all AC repairs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATIC Media Gallery with Tabs */}
        <section className="mb-12">
          <div className="bg-green-200 border-b rounded-xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 text-lg font-medium ${activeTab === 'images' ? 'bg-blue-400 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('images')}
              >
                📸 Service Gallery
              </button>
              <button
                className={`flex-1 py-2 text-lg font-medium ${activeTab === 'videos' ? 'bg-blue-400 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('videos')}
              >
                🎥 Service Videos
              </button>
            </div>

            {/* Images Tab Content - STATIC */}
            {activeTab === 'images' && (
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our AC Service Work Gallery</h3>

                {/* Image Slider - STATIC */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 border-4 border-white">
                  <div className="w-full h-64 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-300 relative">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p>Loading AC service images...</p>
                      </div>
                    ) : (
                      <>
                        {images.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`AC Service Work ${i + 1} - Professional AC repair in Coimbatore`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 cursor-pointer ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                              }`}
                            onClick={() => setFullImage(src)}
                            loading="lazy"
                          />
                        ))}

                        {images.length > 1 && (
                          <>
                            <button
                              onClick={prev}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all shadow-lg hover:scale-110"
                            >
                              ‹
                            </button>
                            <button
                              onClick={next}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all shadow-lg hover:scale-110"
                            >
                              ›
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                              {images.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setIndex(i)}
                                  className={`w-3 h-3 rounded-full transition-all shadow ${i === index ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                                    }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Static Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {images.map((src, i) => (
                    <div key={i} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img
                          src={src}
                          alt={`AC Service Example ${i + 1} - Coimbatore AC repair work`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={() => setFullImage(src)}
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Work #{i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Static Call to Action */}
                <div className="flex flex-col items-center justify-center bg-blue-50 p-6 rounded-xl shadow-sm mt-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Want to see more of our work?</h4>
                  <p className="text-gray-700 mb-4 text-center">
                    Call us to schedule a service or ask about our recent projects!
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="px-7 py-5 bg-green-600 no-underline text-white 
             hover:text-white visited:text-white focus:text-white active:text-white
             rounded-lg shadow-md hover:bg-green-500 
             transition-all duration-300 transform hover:scale-105 
             flex items-center gap-2"                    >
                    📞 Call Now: +91 91765 08072
                  </a>
                </div>
              </div>
            )}

            {/* Videos Tab Content - STATIC */}
            {activeTab === 'videos' && (
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AC Service Videos</h3>

                {/* Video Player - STATIC */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 border-4 border-white">
                  <div className="w-full h-64 sm:h-[500px] bg-black relative">
                    {videoLoading ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p>Loading AC service videos...</p>
                      </div>
                    ) : (
                      <>
                        {videos.map((src, i) => (
                          <div
                            key={i}
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ${i === videoIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                              }`}
                          >
                            <video
                              src={src}
                              className="w-full h-full object-contain"
                              controls
                              autoPlay={i === videoIndex}
                              muted
                              loop
                              playsInline
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ))}

                        {videos.length > 1 && (
                          <>
                            <button
                              onClick={prevVideo}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 text-white p-3 rounded-full hover:bg-black/80 transition-all shadow-lg hover:scale-110"
                            >
                              ‹
                            </button>
                            <button
                              onClick={nextVideo}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 text-white p-3 rounded-full hover:bg-black/80 transition-all shadow-lg hover:scale-110"
                            >
                              ›
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                              {videos.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setVideoIndex(i)}
                                  className={`w-3 h-3 rounded-full transition-all shadow ${i === videoIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                                    }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Video Thumbnails - STATIC */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {videos.map((src, i) => (
                    <div key={i} className="relative group">
                      <div className="aspect-video overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
                          <video
                            src={src}
                            className="w-full h-full object-cover opacity-70"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <span className="text-3xl text-white">▶</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Video #{i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Video Controls - STATIC */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-600">
                    Showing {videos.length} service videos
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setVideoAutoPlay(!videoAutoPlay)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${videoAutoPlay ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white shadow`}
                    >
                      {videoAutoPlay ? "⏸️ Pause" : "▶️ Play"} Autoplay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Full Image Modal */}
      {fullImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setFullImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={fullImage}
              alt="Full size AC service image - professional AC repair in Coimbatore"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setFullImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Full Video Modal */}
      {fullVideo && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setFullVideo(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <video
              src={fullVideo}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              controls
              autoPlay
              muted
            >
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setFullVideo(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {showAll && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAll(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">All AC Service Photos ({images.length})</h2>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                onClick={() => setShowAll(false)}
              >
                Close
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg shadow hover:shadow-xl transition-all">
                      <img
                        src={src}
                        alt="AC service in Coimbatore - professional air conditioner repair and maintenance"
                        className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setFullImage(src)}
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Gallery Modal */}
      {showAllVideos && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAllVideos(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">All AC Service Videos ({videos.length})</h2>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                onClick={() => setShowAllVideos(false)}
              >
                Close
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((src, i) => (
                  <div key={i} className="relative group">
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                      <video
                        src={src}
                        className="w-full h-64 object-cover"
                        controls
                        muted
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Video #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        ref={addressRef}
        className="bg-gradient-to-r from-gray-900 to-black text-white py-12"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us Today</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              {/* <div className="text-4xl mb-4">📞</div> */}
              <h3 className="text-xl font-bold mb-2">Call Now</h3>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors"
              >
                +91 91765 08072
              </a>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              {/* <div className="text-4xl mb-4">✉️</div> */}
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <a
                href="mailto:Adaikalarajadaikkan@gmail.com"
                className="text-xl text-green-400 hover:text-green-300 transition-colors break-all"
              >
                Adaikalarajadaikkan@gmail.com
              </a>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              {/* <div className="text-4xl mb-4">📍</div> */}
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-green-400 hover:text-green-300 text-base sm:text-xl leading-relaxed">
                Karavali Salai, Malayamman Nagar<br />
                Pallapalayam Road, Coimbatore<br />
                Pincode: 642112
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Ak Chillcool AC Service. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Professional AC Repair & Installation Services | 5+ Years of Excellence
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}