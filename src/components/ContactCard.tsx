'use client';

import { useState } from 'react';
import { Contact } from '@/types';
import { Edit2, Trash2, MapPin, Building, User, Briefcase, Heart } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1 truncate group-hover:text-indigo-200 transition-colors duration-200">
            {contact.name}
          </h3>
          <p className="text-indigo-300 font-medium text-sm mb-2 truncate">
            {contact.position}
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-white/60 hover:text-indigo-300 hover:bg-indigo-500/20 rounded-lg transition-all duration-200 group/btn"
            title="Edit contact"
          >
            <Edit2 size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-white/60 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 group/btn"
            title="Delete contact"
          >
            <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Building size={16} className="text-emerald-300 flex-shrink-0" />
          <span className="truncate">{contact.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-white/80">
          <MapPin size={16} className="text-purple-300 flex-shrink-0" />
          <span className="truncate">{contact.location}</span>
        </div>

        {contact.interests && (
          <div className="pt-2">
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Heart size={16} className="text-pink-300 flex-shrink-0" />
              <span className="font-medium">Interests</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
              {contact.interests}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
