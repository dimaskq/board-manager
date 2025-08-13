'use client';

import { useState, useEffect } from 'react';
import { Board } from '@/types';
import { getBoards, addBoard, deleteBoard } from '@/lib/localStorage';
import BoardCard from '@/components/BoardCard';
import { Plus, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setBoards(getBoards());
  }, []);

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      const newBoard = addBoard(newBoardName.trim());
      setBoards(getBoards());
      setNewBoardName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteBoard = (id: string) => {
    deleteBoard(id);
    setBoards(getBoards());
  };

  const totalContacts = boards.reduce((sum, board) => sum + board.contacts.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-4 transition-all duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">All Boards</h1>
        <p className="text-white/80">
          Manage your professional networking boards and contacts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-indigo-500/30 rounded-lg">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-300" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-white/70">Total Boards</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{boards.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-emerald-500/30 rounded-lg">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-300" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-white/70">Total Contacts</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{totalContacts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Board Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Create New Board</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 w-full sm:w-auto shadow-lg"
          >
            <Plus size={16} className="mr-2" />
            {showAddForm ? 'Cancel' : 'Add Board'}
          </button>
        </div>

        {showAddForm && (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name (e.g., Tech Conference 2025)"
              className="flex-1 px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-white bg-white/10 placeholder-white/50"
              onKeyPress={(e) => e.key === 'Enter' && handleAddBoard()}
            />
            <button
              onClick={handleAddBoard}
              disabled={!newBoardName.trim()}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto shadow-lg"
            >
              Create Board
            </button>
          </div>
        )}
      </div>

      {/* Boards List */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Your Boards</h2>
        {boards.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <Users className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-white/60 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No boards yet</h3>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-md mx-auto px-4">
              Create your first board to start organizing your professional contacts. 
              Boards help you group contacts by events, companies, or any other criteria.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
            >
              <Plus size={18} className="mr-2" />
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={handleDeleteBoard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
