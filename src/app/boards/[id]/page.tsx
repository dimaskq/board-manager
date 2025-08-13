'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Board, Contact } from '@/types';
import { getBoard, addContact, updateContact, deleteContact } from '@/lib/localStorage';
import ContactCard from '@/components/ContactCard';
import ContactForm from '@/components/ContactForm';
import { Plus, ArrowLeft, Users, Building, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function BoardDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = params.id as string;
  
  const [board, setBoard] = useState<Board | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boardData = getBoard(boardId);
    if (!boardData) {
      router.push('/boards');
      return;
    }
    setBoard(boardData);
    setIsLoading(false);
  }, [boardId, router]);

  const refreshBoard = () => {
    const boardData = getBoard(boardId);
    if (boardData) {
      setBoard(boardData);
    }
  };

  const handleAddContact = (contactData: Omit<Contact, 'id'>) => {
    try {
      addContact(boardId, contactData);
      refreshBoard();
      setShowContactForm(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const handleUpdateContact = (contactData: Omit<Contact, 'id'>) => {
    if (editingContact) {
      try {
        updateContact(boardId, editingContact.id, contactData);
        refreshBoard();
        setShowContactForm(false);
        setEditingContact(null);
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    }
  };

  const handleDeleteContact = (contactId: string) => {
    try {
      deleteContact(boardId, contactId);
      refreshBoard();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleCancelForm = () => {
    setShowContactForm(false);
    setEditingContact(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-white/80">Loading board...</p>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Board not found</h2>
          <p className="text-white/80 mb-6">The board you're looking for doesn't exist.</p>
          <Link
            href="/boards"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Boards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/boards"
          className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-4 transition-all duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Boards
        </Link>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{board.name}</h1>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-indigo-300" />
              <span>{board.contacts.length} contact{board.contacts.length !== 1 ? 's' : ''}</span>
            </div>
            {board.contacts.length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-emerald-300" />
                  <span>{new Set(board.contacts.map(c => c.company)).size} companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-300" />
                  <span>{new Set(board.contacts.map(c => c.location)).size} locations</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Contact Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Manage Contacts</h2>
          <button
            onClick={() => setShowContactForm(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 w-full sm:w-auto shadow-lg"
          >
            <Plus size={16} className="mr-2" />
            Add Contact
          </button>
        </div>
        
        <p className="text-white/80">
          Add new contacts to this board or manage existing ones. Each contact can include their name, 
          position, company, location, and professional interests.
        </p>
      </div>

      {/* Contacts Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contacts</h2>
        {board.contacts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <Users className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-white/60 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No contacts yet</h3>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-md mx-auto px-4">
              Start building your network by adding your first contact to this board. 
              You can add contacts from events, meetings, or professional introductions.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
            >
              <Plus size={18} className="mr-2" />
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {board.contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        contact={editingContact}
        onSubmit={editingContact ? handleUpdateContact : handleAddContact}
        onCancel={handleCancelForm}
        isOpen={showContactForm}
      />
    </div>
  );
}
