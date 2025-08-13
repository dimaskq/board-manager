'use client';

import { Board } from '@/types';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface BoardCardProps {
  board: Board;
  onDelete: (id: string) => void;
}

export default function BoardCard({ board, onDelete }: BoardCardProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${board.name}"?`)) {
      onDelete(board.id);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate group-hover:text-indigo-200 transition-colors duration-200">
            {board.name}
          </h3>
          <p className="text-white/70 text-sm">
            {board.contacts.length} contact{board.contacts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-white/60 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 flex-shrink-0 ml-2 group/btn"
          title="Delete board"
        >
          <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
        </button>
      </div>
      
      <Link
        href={`/boards/${board.id}`}
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 rounded-lg font-medium hover:from-indigo-500/30 hover:to-purple-500/30 hover:text-white transition-all duration-200 text-sm sm:text-base border border-white/20 hover:border-white/30"
      >
        View Contacts
      </Link>
    </div>
  );
}
