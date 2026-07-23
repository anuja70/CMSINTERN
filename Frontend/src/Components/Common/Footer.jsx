import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Send,
} from 'lucide-react';

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from '../ui/SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', Icon: Facebook, url: '#' },
    { name: 'Twitter', Icon: Twitter, url: '#' },
    { name: 'Instagram', Icon: Instagram, url: '#' },
    { name: 'LinkedIn', Icon: Linkedin, url: '#' },
    { name: 'YouTube', Icon: Youtube, url: '#' },
  ];

  const contactInfo = [
    { Icon: MapPin, text: 'Chabahil, Kathmandu, Nepal' },
    { Icon: Phone, text: '+977-1-444-5678' },
    { Icon: Mail, text: 'info@clinicms.com' },
    { Icon: Clock, text: 'Sun–Fri: 9:00 AM – 6:00 PM' },
  ];

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="container-custom pt-14 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <HeartPulse className="h-5 w-5" strokeWidth={2.4} />
              </span>

              <span className="text-lg font-bold text-white">
                Clinic<span className="text-primary-400">MS</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted healthcare partner in Nepal. Book verified doctors,
              track your live queue token, and pay online—quality care made
              effortless.
            </p>

            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ name, Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-primary-500 transition-transform group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Payment Methods
            </h4>

            <div className="flex flex-wrap gap-2">
              {['eSewa', 'Khalti'].map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300"
                >
                  {method}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

              <p className="text-xs leading-relaxed text-slate-400">
                Secure payments verified server-side with industry-standard
                encryption.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Contact Us
            </h4>

            <ul className="space-y-3">
              {contactInfo.map(({ Icon, text }, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-400"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </p>

              <p className="text-xs text-slate-400">
                Health tips and clinic updates straight to your inbox.
              </p>
            </div>

            <form
              className="flex w-full gap-2 md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="input input-sm flex-1 border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:border-primary-500 md:w-64"
              />

              <button
                type="submit"
                className="btn btn-primary btn-sm whitespace-nowrap flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-4">
          <div className="flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
            <p className="text-center text-slate-400 md:text-left">
              © {currentYear} Clinic Management System. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-slate-400">
              <Link to="/about" className="hover:text-white">
                Privacy
              </Link>

              <span className="h-4 w-px bg-slate-700" />

              <Link to="/about" className="hover:text-white">
                Terms
              </Link>

              <span className="h-4 w-px bg-slate-700" />

              <Link to="/contact" className="hover:text-white">
                Support
              </Link>
            </div>

            <p className="text-xs text-slate-500">
              Made with care in Nepal · v1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;