'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/types';
import { X, User, Briefcase, Building, MapPin, Heart } from 'lucide-react';

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (contact: Omit<Contact, 'id'>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function ContactForm({ contact, onSubmit, onCancel, isOpen }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    location: '',
    interests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        position: contact.position,
        company: contact.company,
        location: contact.location,
        interests: contact.interests
      });
    } else {
      setFormData({
        name: '',
        position: '',
        company: '',
        location: '',
        interests: ''
      });
    }
    setErrors({});
  }, [contact]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        position: '',
        company: '',
        location: '',
        interests: ''
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {contact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              <User size={16} className="inline mr-2 text-indigo-300" />
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50 ${
                errors.name ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              <Briefcase size={16} className="inline mr-2 text-emerald-300" />
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50 ${
                errors.position ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="e.g., Software Engineer"
            />
            {errors.position && <p className="text-red-300 text-sm mt-1">{errors.position}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              <Building size={16} className="inline mr-2 text-purple-300" />
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50 ${
                errors.company ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Enter company name"
            />
            {errors.company && <p className="text-red-300 text-sm mt-1">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              <MapPin size={16} className="inline mr-2 text-pink-300" />
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50 ${
                errors.location ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="e.g., San Francisco, USA"
            />
            {errors.location && <p className="text-red-300 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              <Heart size={16} className="inline mr-2 text-rose-300" />
              Interests
            </label>
            <textarea
              value={formData.interests}
              onChange={(e) => handleChange('interests', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50"
              placeholder="e.g., AI, Machine Learning, Startups"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-white/30 text-white/90 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
            >
              {contact ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
