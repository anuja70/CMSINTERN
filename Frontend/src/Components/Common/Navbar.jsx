import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Check scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { path: '/services', label: 'Services', icon: '🩺' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  // Services dropdown items
  const services = [
    { 
      path: '/services/cardiology', 
      label: 'Cardiology', 
      icon: '❤️',
      description: 'Heart care and treatment'
    },
    { 
      path: '/services/dermatology', 
      label: 'Dermatology', 
      icon: '🧴',
      description: 'Skin care and treatment'
    },
    { 
      path: '/services/neurology', 
      label: 'Neurology', 
      icon: '🧠',
      description: 'Brain and nervous system'
    },
    { 
      path: '/services/pediatrics', 
      label: 'Pediatrics', 
      icon: '👶',
      description: 'Child healthcare'
    },
    { 
      path: '/services/orthopedics', 
      label: 'Orthopedics', 
      icon: '🦴',
      description: 'Bone and joint care'
    },
    { 
      path: '/services/gynecology', 
      label: 'Gynecology', 
      icon: '🌸',
      description: 'Women\'s health'
    },
    { 
      path: '/services/ophthalmology', 
      label: 'Ophthalmology', 
      icon: '👁️',
      description: 'Eye care and surgery'
    },
    { 
      path: '/services/ent', 
      label: 'ENT', 
      icon: '👂',
      description: 'Ear, nose, throat care'
    },
    { 
      path: '/services/psychiatry', 
      label: 'Psychiatry', 
      icon: '🧘',
      description: 'Mental health services'
    },
    { 
      path: '/services/dentistry', 
      label: 'Dentistry', 
      icon: '🦷',
      description: 'Dental care and treatment'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServicesDropdownOpen && !event.target.closest('.services-dropdown')) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen]);

  return (
    <header 
      className={`site-header border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-slate-200/70 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-900/85' 
          : 'border-transparent bg-white/90 dark:bg-slate-900/90'
      }`}
    >
      <div className="container-custom">
        <div className="flex-between py-3.5 sm:py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-2xl text-white shadow-lg shadow-primary-500/20 transition-transform duration-300 group-hover:scale-105">
              🏥
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-white">
              Clinic<span className="ml-1 text-primary-600">MS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/70 p-1 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/70">
            {navLinks.map((link) => {
              // Special handling for Services link with dropdown
              if (link.path === '/services') {
                return (
                  <div key={link.path} className="relative services-dropdown">
                    <button
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      onMouseEnter={() => setIsServicesDropdownOpen(true)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        location.pathname.startsWith('/services')
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-primary-400'
                      }`}
                      aria-expanded={isServicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                      <span className={`ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    {/* Services Dropdown */}
                    {isServicesDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-down"
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                      >
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            All Services
                          </p>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {services.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              <span className="text-2xl flex-shrink-0 mt-0.5">
                                {service.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {service.label}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {service.description}
                                </p>
                              </div>
                              <span className="text-gray-400 text-xs">→</span>
                            </Link>
                          ))}
                        </div>
                        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            to="/services"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                            onClick={() => {
                              setIsServicesDropdownOpen(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Regular links
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-primary-400'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-500 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="danger" size="sm" className="rounded-full" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="rounded-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-sm transition-all duration-200 hover:border-primary-200 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-500 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Menu Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-primary-200 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-primary-500 dark:hover:bg-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="animate-slide-down border-t border-slate-200/80 bg-white/95 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur md:hidden dark:border-slate-700/80 dark:bg-slate-900/95">
            <div className="space-y-2 px-1 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services Sub-menu */}
              <div className="rounded-2xl bg-slate-50/80 px-4 py-3 dark:bg-slate-800/50">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Our Services
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {services.slice(0, 8).map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-white hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{service.icon}</span>
                      {service.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="mt-2 block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View All Services →
                </Link>
              </div>

              {/* Mobile Auth Actions */}
              <div className="space-y-2 border-t border-slate-200/80 px-1 pt-4 dark:border-slate-700/80">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">📊</span>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-danger transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <span className="text-xl">🚪</span>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                    >
                      <span className="text-xl">🔑</span>
                      Login
                    </button>
                    <Link
                      to="/register"
                      className="flex w-full items-center gap-3 rounded-2xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">📝</span>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;