'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const maxChars = 280;
  // Placeholder posts
  const posts = [
    {
      id: 1,
      author: "Donald Machon",
      content: "It worked!",
      time: 'now',
    },
    {
      id: 2,
      author: "Donald Machon",
      content: "Hello world! This is a live website.",
      time: 'now',
    },
    {
      id: 3,
      author: "Shannon",
      content: "Hey Donald, did you debug your coffee maker yet? Last cup tasted like JavaScript errors.",
      time: '2h',
    },
    {
      id: 4,
      author: "Airon",
      content: "Donald, saw your last coding session—pretty sure you broke Stack Overflow again! 🧯",
      time: '3h',
    },
    {
      id: 5,
      author: "Mark",
      content: "Donald, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?",
      time: '4h',
    },
    {
      id: 6,
      author: "Lana",
      content: "Donald, rumor has it your computer has more stickers than code running on it. Confirm?",
      time: '5h',
    },
    {
      id: 7,
      author: "Rhoda",
      content: "Yo Donald, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn't improve coding skills. Weird!",
      time: '6h',
    },
    {
      id: 8,
      author: "Nerissa",
      content: "Donald, when are we gonna deploy your latest dance moves to production? #AgileDancer",
      time: '8h',
    },
  ];

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
            className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg border-4 border-white"
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
          <form className="bg-white rounded-2xl shadow p-6 mb-8 border border-gray-200">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 resize-none focus:outline-blue-400 text-base"
              rows={3}
              maxLength={maxChars}
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{maxChars - content.length} characters remaining</span>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
                disabled={!content.trim()}
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
