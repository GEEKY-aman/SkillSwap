<<<<<<< HEAD
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, Hash, TrendingUp } from 'lucide-react';

interface Post {
  id: number;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  liked?: boolean;
}

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: "Sarah Drasner", role: "Senior Developer Advocate", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=100&q=80" },
      content: "Just finished recording a new course on Advanced CSS Grid! It's amazing how much layout power we have in modern browsers now. Who's using Subgrid in production yet? 🎨 #CSS #WebDev",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&w=800&q=80",
      likes: 124,
      comments: 45,
      time: "2h ago",
      liked: true
    },
    {
      id: 2,
      user: { name: "Alex Johnson", role: "Frontend Developer", avatar: "https://picsum.photos/100/100" },
      content: "Looking for a mentor to help me understand React Server Components. Anyone available for a quick chat this weekend? I can trade knowledge on Tailwind CSS! 🔄",
      likes: 56,
      comments: 12,
      time: "4h ago"
    },
    {
      id: 3,
      user: { name: "David Kim", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=100&q=80" },
      content: "The new Figma update is a game changer for variables. Finally we can do proper theming without a million frame variants!",
      likes: 89,
      comments: 23,
      time: "5h ago"
    }
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      user: { name: "Alex Johnson", role: "Frontend Developer", avatar: "https://picsum.photos/100/100" },
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: "Just now"
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Main Feed */}
      <div className="flex-1 space-y-6">
        {/* Create Post */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex gap-4 mb-4">
            <img src="https://picsum.photos/100/100" className="w-10 h-10 rounded-full" alt="Me" />
            <textarea 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your knowledge, ask a question, or find a swap..." 
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 resize-none h-24"
            />
          </div>
          <div className="flex justify-between items-center px-2">
            <button className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-700">
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={handlePost}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newPostContent.trim()}
            >
              <Send size={16} /> Post
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
              <div className="p-4 flex gap-4">
                <img src={post.user.avatar} className="w-12 h-12 rounded-full object-cover" alt={post.user.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{post.user.name}</h3>
                      <p className="text-xs text-slate-400">{post.user.role} • {post.time}</p>
                    </div>
                    <button className="text-slate-500 hover:text-white">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <p className="text-slate-200 mt-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  {post.image && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <img src={post.image} alt="Post content" className="w-full object-cover max-h-96" />
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700/50">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.liked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                    >
                      <Heart size={18} fill={post.liked ? "currentColor" : "none"} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
                      <MessageCircle size={18} /> {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-green-400 transition-colors ml-auto">
                      <Share2 size={18} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
           <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
             <TrendingUp size={20} className="text-green-400" /> Trending Topics
           </h3>
           <div className="space-y-4">
             {[
               { tag: "ReactServerComponents", posts: "2.4k" },
               { tag: "AIArt", posts: "1.8k" },
               { tag: "WebAssembly", posts: "950" },
               { tag: "CareerAdvice", posts: "800" }
             ].map((topic, i) => (
               <div key={i} className="flex justify-between items-center group cursor-pointer">
                 <div>
                   <p className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">#{topic.tag}</p>
                   <p className="text-xs text-slate-500">{topic.posts} posts</p>
                 </div>
                 <MoreHorizontal size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
             ))}
           </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="font-bold text-lg mb-4">Suggested Mentors</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                 <img src={`https://picsum.photos/id/${i+40}/40/40`} className="w-10 h-10 rounded-full" alt="User" />
                 <div className="flex-1 min-w-0">
                   <h4 className="font-bold text-sm truncate">Jane Cooper</h4>
                   <p className="text-xs text-slate-400 truncate">Product Designer at Uber</p>
                 </div>
                 <button className="text-blue-400 p-2 hover:bg-blue-500/10 rounded-lg text-xs font-bold">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
=======
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
>>>>>>> 7fb58eb (Your commit message here)
    </div>
  );
};