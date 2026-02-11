import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Plus, Trash2, Loader } from 'lucide-react';
import { postService } from '../src/services/api';
import { useToast } from '../components/ToastContext';
import { useAuth } from '../components/AuthContext';

export const Community: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await postService.getPosts();
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    try {
      const res = await postService.createPost({ content: newPost });
      setPosts([res.data, ...posts]);
      setNewPost('');
      addToast('Post created!', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to create post', 'error');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await postService.toggleLike(postId);
      setPosts(posts.map(p => p._id === postId ? { ...p, likes: res.data.likes } : p));
    } catch (error) {
      addToast('Failed to like post', 'error');
    }
  };

  const handleComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    try {
      const res = await postService.addComment(postId, { text });
      setPosts(posts.map(p => p._id === postId ? { ...p, comments: res.data } : p));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    } catch (error) {
      addToast('Failed to add comment', 'error');
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
      addToast('Post deleted', 'success');
    } catch (error) {
      addToast('Failed to delete post', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Community</h1>

      {/* Create Post */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
            {user?.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something with the community..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim() || posting}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {posting ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        posts.map(post => (
          <div key={post._id} className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold">
                {post.user?.avatar ? <img src={post.user.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : post.user?.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{post.user?.name}</p>
                <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              {post.user?._id === user?._id && (
                <button onClick={() => handleDelete(post._id)} className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {/* Content */}
            <p className="text-slate-200 mb-4">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 border-t border-slate-700 pt-3">
              <button
                onClick={() => handleLike(post._id)}
                className={`flex items-center gap-2 text-sm transition-colors ${post.likes?.includes(user?._id) ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
              >
                <Heart size={18} fill={post.likes?.includes(user?._id) ? 'currentColor' : 'none'} />
                {post.likes?.length || 0}
              </button>
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <MessageCircle size={18} />
                {post.comments?.length || 0}
              </span>
            </div>

            {/* Comments */}
            {post.comments?.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-slate-700 pt-3">
                {post.comments.slice(-3).map((comment: any, ci: number) => (
                  <div key={ci} className="flex gap-2 text-sm">
                    <span className="font-bold text-blue-400">{comment.user?.name || 'User'}</span>
                    <span className="text-slate-300">{comment.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={commentInputs[post._id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                placeholder="Write a comment..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button onClick={() => handleComment(post._id)} className="text-blue-400 hover:text-blue-300">
                <Send size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};