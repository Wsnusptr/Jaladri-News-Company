"use client";

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Send, Trash2, MessageCircle, Shield } from 'lucide-react';

interface LiveTVComment {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    role: 'USER' | 'ADMIN';
  };
}

interface LiveTVCommentsProps {
  liveTVId: string;
  isAdmin?: boolean;
}

export function LiveTVComments({ liveTVId, isAdmin = false }: LiveTVCommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<LiveTVComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new comments arrive
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load comments
  const loadComments = async () => {
    try {
      const response = await fetch(`/api/live-tv/${liveTVId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session?.user?.id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/live-tv/${liveTVId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newComment.trim() }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prev => [newCommentData, ...prev]);
        setNewComment('');
        setTimeout(scrollToBottom, 100);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to send comment');
      }
    } catch (error) {
      console.error('Error sending comment:', error);
      alert('Failed to send comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete comment
  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/live-tv/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(prev => prev.filter(c => c.id !== commentId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  // Real-time polling for new comments
  useEffect(() => {
    loadComments();
    
    // Poll for new comments every 3 seconds
    const interval = setInterval(loadComments, 3000);
    
    return () => clearInterval(interval);
  }, [liveTVId]);

  // Auto scroll when comments change
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isAdmin ? 'h-96' : 'h-80'} flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Live Chat {isAdmin && <span className="text-sm text-red-600">(Admin View)</span>}
          </h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </div>
      </div>

      {/* Comments Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No comments yet. Be the first to chat!</p>
            </div>
          </div>
        ) : (
          <>
            {comments.slice().reverse().map((comment) => (
              <div key={comment.id} className="flex space-x-3 group">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {comment.user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {comment.user.name || 'Anonymous'}
                      {comment.user.role === 'ADMIN' && (
                        <Shield className="w-4 h-4 text-red-600 ml-1" />
                      )}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {(session?.user?.id === comment.user.id || (session?.user as any)?.role === 'ADMIN') && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </>
        )}
      </div>

      {/* Comment Input */}
      {session?.user ? (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAdmin ? "Chat with viewers..." : "Join the conversation..."}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {newComment.length}/500
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/login" className="text-red-600 hover:text-red-700 font-medium">
              Login
            </a> to join the conversation
          </p>
        </div>
      )}
    </div>
  );
}
