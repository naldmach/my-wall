'use client';

import { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react';
import { supabase } from './supabaseClient';

interface Post {
  id: number;
  author: string;
  content: string;
  created_at: string;
  photo_url?: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const maxChars = 280;
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch posts from Supabase on mount
  useEffect(() => {
    fetchPosts();
    // Test Supabase connection
    async function testConnection() {
      const { error } = await supabase.from('posts').select('id').limit(1);
      if (error) {
        console.error('Supabase connection failed:', error.message);
      } else {
        console.log('Supabase connection successful!');
      }
    }
    testConnection();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    let photo_url = null;
    if (photo) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wall-photos')
        .upload(fileName, photo, { upsert: false });
      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from('wall-photos')
          .getPublicUrl(uploadData.path);
        photo_url = publicUrlData.publicUrl;
      }
    }
    const { error } = await supabase.from('posts').insert([
      {
        author: name.trim(),
        content: content.trim(),
        photo_url,
      },
    ]);
    if (!error) {
      setContent('');
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchPosts();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-blue-500 text-white text-lg font-bold px-8 py-3 shadow">
        wall
      </header>
      <div className="flex max-w-5xl mx-auto mt-8 gap-10">
        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-2xl shadow p-8 flex flex-col items-center">
          <img
            src="/donald.jpg"
            alt="Donald Machon"
            className="w-72 h-80 rounded-none object-cover mb-6 shadow-lg border-4 border-white"
          />
          <h1 className="text-2xl font-bold mb-1 text-gray-900 text-center w-full">Donald Machon</h1>
          <div className="text-gray-500 mb-4 text-center w-full">wall</div>
          <div className="w-full">
            <div className="border rounded-xl p-4 mb-2 bg-gray-50">
              <div className="font-semibold text-gray-700 mb-2">Information</div>
              <div className="text-sm text-gray-600 mb-2">
                <span className="block font-medium">Networks</span>
                AISAT Alum
              </div>
              <div className="text-sm text-gray-600">
                <span className="block font-medium">Current City</span>
                Angeles City, Pampanga
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          {/* Input Box */}
          <form className="bg-white rounded-2xl shadow p-6 mb-8 border border-gray-200" onSubmit={handleSubmit}>
            <input
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 mb-3 focus:outline-blue-400 text-base"
              type="text"
              placeholder="Your name"
              value={name}
              maxLength={40}
              onChange={e => setName(e.target.value)}
              required
            />
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 resize-none focus:outline-blue-400 text-base"
              rows={3}
              maxLength={maxChars}
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <div className="mt-3 mb-2">
              <label
                htmlFor="photo-upload"
                className="inline-block cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-lg border border-blue-300 hover:bg-blue-200 transition"
              >
                Click to Add Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]);
                  } else {
                    setPhoto(null);
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{maxChars - content.length} characters remaining</span>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
                disabled={!content.trim() || !name.trim() || loading}
              >
                {loading ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </form>
          {/* Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 text-base">{post.author}</span>
                  <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-line text-base mt-1">{post.content}</div>
                {post.photo_url && (
                  <img
                    src={post.photo_url}
                    alt="Post photo"
                    className="mt-3 max-w-full max-h-80 rounded-lg border"
                  />
                )}
              </div>
            ))}
            {posts.length === 0 && !loading && (
              <div className="text-center text-gray-400">No posts yet.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
