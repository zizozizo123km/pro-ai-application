import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Image,
  Video,
  Smile,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Plus,
  Compass,
  Briefcase,
  Users as GroupIcon,
} from 'lucide-react';
import { fetchFeed, createPost } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Mock Data for User Profile and Suggestions
const currentUser = {
  id: 1,
  name: 'أحمد السالم',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const trendingTopics = [
  { id: 1, title: 'الرياضة اليوم', count: '15.4K' },
  { id: 2, title: 'البرمجة بلغة React', count: '8.2K' },
  { id: 3, title: 'أخبار الطقس في المنطقة', count: '5.1K' },
];

const friendsSuggestions = [
  { id: 1, name: 'سارة محمد', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 2, name: 'علي خالد', avatar: 'https://i.pravatar.cc/150?img=3' },
];

// Helper Components
const StoryCard = ({ user }) => (
  <div className="flex-shrink-0 w-28 h-48 bg-gray-200 rounded-lg overflow-hidden relative shadow-md cursor-pointer hover:shadow-lg transition-shadow">
    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
      <span className="text-white text-xs font-semibold">{user.name.split(' ')[0]}</span>
    </div>
  </div>
);

const PostHeader = ({ post }) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center">
      <img
        src={post.user.avatar}
        alt={post.user.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
      />
      <div className="mr-3 text-right">
        <p className="font-bold text-sm text-gray-800">{post.user.name}</p>
        <p className="text-xs text-gray-500">{post.time}</p>
      </div>
    </div>
    <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
  </div>
);

const PostContent = ({ post }) => (
  <div className="px-4 text-right">
    <p className="text-gray-800 mb-3">{post.text}</p>
    {post.imageUrl && (
      <img src={post.imageUrl} alt="Post Content" className="w-full max-h-96 object-cover rounded-lg mb-3" />
    )}
  </div>
);

const PostActions = ({ post }) => (
  <div className="p-4 border-t border-gray-200">
    <div className="flex justify-around text-gray-600 text-sm font-semibold">
      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
        <ThumbsUp className="w-5 h-5" />
        <span className="ml-1">{post.likes} إعجاب</span>
      </div>
      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
        <MessageCircle className="w-5 h-5" />
        <span className="ml-1">{post.comments} تعليق</span>
      </div>
      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
        <Share2 className="w-5 h-5" />
        <span className="ml-1">{post.shares} مشاركة</span>
      </div>
    </div>
  </div>
);

const PostItem = ({ post }) => (
  <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-100">
    <PostHeader post={post} />
    <PostContent post={post} />
    <PostActions post={post} />
  </div>
);

const CreatePostBox = ({ onCreate }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newPost = await createPost({ text: content, userId: currentUser.id });
      onCreate(newPost);
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
      <div className="flex items-start pb-3 border-b border-gray-200">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <form className="flex-grow mr-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`ماذا يجول في خاطرك يا ${currentUser.name.split(' ')[0]}؟`}
            className="w-full p-2 bg-gray-100 rounded-full focus:outline-none text-right placeholder-gray-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </div>

      <div className="flex justify-around pt-3 text-gray-600 text-sm font-semibold">
        <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Video className="w-5 h-5 text-red-500 ml-1" />
          فيديو مباشر
        </button>
        <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Image className="w-5 h-5 text-green-500 ml-1" />
          صورة/فيديو
        </button>
        <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Smile className="w-5 h-5 text-yellow-500 ml-1" />
          الشعور/النشاط
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchFeed();
        setFeed(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feed:', error);
        setLoading(false);
        // Fallback to mock data if API fails
        setFeed([
          {
            id: 1,
            user: { name: 'فاطمة الزهراء', avatar: 'https://i.pravatar.cc/150?img=4' },
            text: 'يا له من يوم جميل! أتمنى للجميع عطلة نهاية أسبوع سعيدة ومليئة بالإنجازات.',
            imageUrl: 'https://images.unsplash.com/photo-1542435503-921d7bda8a9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            time: 'منذ 3 ساعات',
            likes: 154,
            comments: 23,
            shares: 5,
          },
          {
            id: 2,
            user: { name: 'خالد المنصور', avatar: 'https://i.pravatar.cc/150?img=5' },
            text: 'أنهيت للتو مشروع React الجديد! الشعور بالإنجاز لا يُقدر بثمن. هل من نصائح حول تحسين الأداء؟ #ReactJS #برمجة',
            imageUrl: null,
            time: 'منذ يوم',
            likes: 98,
            comments: 15,
            shares: 3,
          },
        ]);
      }
    };
    loadFeed();
  }, []);

  const handleNewPost = (newPost) => {
    // Assuming newPost structure matches existing posts (for display purposes)
    const formattedPost = {
      id: Date.now(),
      user: currentUser,
      text: newPost.text,
      imageUrl: null, // Customize if image upload is supported
      time: 'الآن',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setFeed([formattedPost, ...feed]);
  };

  const trendingBox = (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 sticky top-20">
      <h3 className="font-bold text-lg text-gray-800 mb-3 text-right">المواضيع الرائجة</h3>
      <ul className="space-y-3">
        {trendingTopics.map((topic) => (
          <li key={topic.id} className="text-right cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors">
            <p className="text-sm font-semibold text-gray-700">#{topic.title}</p>
            <p className="text-xs text-gray-500">{topic.count} مشاركة</p>
          </li>
        ))}
      </ul>
      <button className="w-full mt-4 text-blue-500 font-semibold text-sm hover:underline text-right">
        شاهد المزيد
      </button>
    </div>
  );

  const friendsBox = (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-6 sticky top-96">
      <h3 className="font-bold text-lg text-gray-800 mb-4 text-right">قد تعرفهم</h3>
      <ul className="space-y-3">
        {friendsSuggestions.map((friend) => (
          <li key={friend.id} className="flex items-center justify-end text-right">
            <div className="flex-grow mr-3">
              <p className="font-semibold text-sm">{friend.name}</p>
              <p className="text-xs text-gray-500">2 صديق مشترك</p>
            </div>
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mr-3 hover:bg-blue-200 transition-colors">
              إضافة
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar (Right side in RTL) */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content (Feed) */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6">
          {/* Stories Section */}
          <section className="mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex flex-row-reverse space-x-3 space-x-reverse">
            {/* Create Story */}
            <div className="flex-shrink-0 w-28 h-48 bg-white rounded-xl overflow-hidden relative shadow-md cursor-pointer border border-gray-200 flex flex-col items-center justify-end p-2 pb-4 hover:bg-gray-50 transition-colors">
              <div className="bg-blue-600 rounded-full p-2 absolute top-1/3 transform -translate-y-1/2">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold mt-8 text-gray-700">إنشاء قصة</span>
            </div>

            {/* Mock Stories */}
            {[currentUser, friendsSuggestions[0], friendsSuggestions[1], { name: 'مروان', avatar: 'https://i.pravatar.cc/150?img=6' }].map((user, index) => (
              <StoryCard key={index} user={user} />
            ))}
          </section>

          {/* Create Post Box */}
          <CreatePostBox onCreate={handleNewPost} />

          {/* Feed */}
          {loading ? (
            <div className="text-center p-8 text-gray-600">جاري تحميل المنشورات...</div>
          ) : (
            <section className="space-y-6">
              {feed.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
              {feed.length === 0 && (
                <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-500">
                  لا توجد منشورات حالياً في خلاصتك. ابدأ بنشر شيء ما!
                </div>
              )}
            </section>
          )}
        </main>

        {/* Right Sidebar (Left side in RTL) - Widgets */}
        <div className="hidden xl:block w-72 flex-shrink-0 px-4 py-6 space-y-6">
          {trendingBox}
          {friendsBox}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;