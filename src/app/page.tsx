'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Post {
  id: number;
  author: string;
  content: string;
  time: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const maxChars = 280;

  // Load name from sessionStorage and posts from localStorage on mount
  useEffect(() => {
    const savedName = sessionStorage.getItem('wall_name') || '';
    setName(savedName);
    const savedPosts = localStorage.getItem('wall_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wall_posts', JSON.stringify(posts));
  }, [posts]);

  // Save name to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('wall_name', name);
  }, [name]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: name.trim(),
      content: content.trim(),
      time: 'now',
    };
    setPosts([newPost, ...posts]);
    setContent('');
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
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{maxChars - content.length} characters remaining</span>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
                disabled={!content.trim() || !name.trim()}
              >
                Share
              </button>
            </div>
          </form>
          {/* Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 text-base">{post.author}</span>
                  <span className="text-xs text-gray-400">{post.time}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-line text-base mt-1">{post.content}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
