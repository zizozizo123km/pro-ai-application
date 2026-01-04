import React from 'react';
import {
  Rss,
  Video,
  Image,
  Tag,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Plus,
  Settings,
} from 'lucide-react';

// Assuming Sidebar exists in src/components/
import Sidebar from '../components/Sidebar'; 

// --- Mock Data ---

const mockPosts = [
  { id: 1, user: "أحمد محمد", avatar: "https://i.pravatar.cc/150?img=1", time: "10 دقائق مضت", content: "يا له من يوم جميل! قمت ببرمجة ميزة جديدة اليوم وأنا متحمس جداً لمشاركتها معكم. #React #Coding", likes: 45, comments: 12, shares: 3, type: 'text' },
  { id: 2, user: "فاطمة الزهراء", avatar: "https://i.pravatar.cc/150?img=2", time: "ساعة مضت", content: "تذكروا دائماً، أن القهوة والبرمجة هما أفضل مزيج. ما هو مشروبكم المفضل أثناء العمل؟", likes: 120, comments: 35, shares: 8, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1541701490236-4074c76b1f2e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, user: "علي ياسين", avatar: "https://i.pravatar.cc/150?img=3", time: "يوم مضى", content: "هل جربتم تحديث Vite الأخير؟ الأداء أصبح مذهلاً!", likes: 200, comments: 50, shares: 10, type: 'text' },
];

const mockStories = [
    { id: 1, user: "أنت", avatar: "https://i.pravatar.cc/150?img=4", isCreate: true },
    { id: 2, user: "سارة خالد", avatar: "https://i.pravatar.cc/150?img=5", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, user: "خالد وائل", avatar: "https://i.pravatar.cc/150?img=6", image: "https://images.unsplash.com/photo-1499955085876-0f39da49e17b?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, user: "ليلى حسن", avatar: "https://i.pravatar.cc/150?img=7", image: "https://images.unsplash.com/photo-1517404215738-15152b9b7e8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const mockContacts = [
    { id: 1, name: "عمران فهد", online: true, avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 2, name: "نورة علي", online: true, avatar: "https://i.pravatar.cc/150?img=9" },
    { id: 3, name: "يوسف خالد", online: false, avatar: "https://i.pravatar.cc/150?img=10" },
    { id: 4, name: "ماجد سعيد", online: true, avatar: "https://i.pravatar.cc/150?img=11" },
];


// --- Helper Components ---

const StoryCard = ({ story }) => {
    if (story.isCreate) {
        return (
            <div className="flex flex-col items-center cursor-pointer w-[110px] bg-white rounded-xl overflow-hidden shadow-md transition duration-200 hover:shadow-lg hover:scale-[1.02]">
                <div className="h-3/4 w-full relative bg-gray-100">
                    <img src={story.avatar} alt={story.user} className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="bg-blue-500 rounded-full p-2 border-4 border-white">
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
                <div className="p-2 text-center text-sm font-medium text-blue-500 w-full bg-white h-1/4 flex items-center justify-center">
                    إنشاء قصة
                </div>
            </div>
        );
    }
    return (
        <div className="relative w-[110px] h-[180px] rounded-xl overflow-hidden shadow-lg cursor-pointer transition duration-200 hover:shadow-xl hover:scale-[1.02] group flex-shrink-0">
            <img src={story.image} alt={story.user} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition"></div>
            
            <div className="absolute top-2 right-2 border-4 border-blue-500 rounded-full w-10 h-10 overflow-hidden z-10">
                <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
            </div>
            
            <span className="absolute bottom-2 right-2 text-white font-semibold text-xs text-right drop-shadow-lg z-10">
                {story.user}
            </span>
        </div>
    );
};

const CreatePostBox = () => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        <div className="flex items-center border-b pb-3 mb-3">
            <img src="https://i.pravatar.cc/150?img=4" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <input 
                type="text" 
                placeholder="بماذا تفكر يا أحمد؟" 
                className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none placeholder-gray-500 text-right"
            />
        </div>
        
        <div className="flex justify-around pt-2">
            <button className="flex items-center text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                <Video className="w-6 h-6 ml-2" />
                <span className="font-semibold text-sm hidden sm:inline">بث مباشر</span>
            </button>
            <button className="flex items-center text-green-500 hover:bg-green-50 p-2 rounded-lg transition">
                <Image className="w-6 h-6 ml-2" />
                <span className="font-semibold text-sm hidden sm:inline">صورة / فيديو</span>
            </button>
            <button className="flex items-center text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition">
                <Tag className="w-6 h-6 ml-2" />
                <span className="font-semibold text-sm hidden sm:inline">شعور / نشاط</span>
            </button>
        </div>
    </div>
);

const PostComponent = ({ post }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-3">
            <button className="text-gray-500 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="w-5 h-5" />
            </button>
            <div className="flex items-center">
                <div className="text-right ml-3">
                    <p className="font-bold text-sm text-gray-900">{post.user}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
            </div>
        </div>

        {/* Post Content */}
        <div className="text-right text-gray-800 mb-3 whitespace-pre-wrap">
            <p className="leading-relaxed">{post.content}</p>
        </div>

        {/* Media */}
        {post.type === 'image' && (
            <div className="mb-3 rounded-lg overflow-hidden border border-gray-100">
                <img src={post.imageUrl} alt="Post Media" className="w-full object-cover max-h-96" />
            </div>
        )}

        {/* Reactions Summary */}
        <div className="flex justify-between items-center border-b pb-2 mb-2 text-sm text-gray-500">
            <div className="flex items-center">
                <span>{post.shares} مشاركة</span>
                <span className="mr-3">{post.comments} تعليق</span>
            </div>
            <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 text-blue-500 fill-blue-500 ml-1" />
                <span className="ml-1">{post.likes}</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around">
            <button className="flex items-center text-gray-600 font-semibold hover:bg-gray-100 p-2 rounded-lg w-full justify-center transition">
                <span>إعجاب</span>
                <ThumbsUp className="w-5 h-5 mr-2" />
            </button>
            <button className="flex items-center text-gray-600 font-semibold hover:bg-gray-100 p-2 rounded-lg w-full justify-center transition">
                <span>تعليق</span>
                <MessageCircle className="w-5 h-5 mr-2" />
            </button>
            <button className="flex items-center text-gray-600 font-semibold hover:bg-gray-100 p-2 rounded-lg w-full justify-center transition">
                <span>مشاركة</span>
                <Share2 className="w-5 h-5 mr-2" />
            </button>
        </div>
    </div>
);

// --- Home Page Main Component ---

const RightWidgets = () => (
    <div className="sticky top-20 hidden lg:block pr-4 h-[calc(100vh-80px)] overflow-y-auto">
        
        {/* Contacts Header */}
        <div className="flex justify-between items-center mb-4 pt-4">
            <span className="text-sm font-semibold text-gray-500">جهات الاتصال</span>
            <div className="flex space-x-2 rtl:space-x-reverse text-gray-500">
                <Video className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                <Settings className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-700" />
            </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-2">
            {mockContacts.map(contact => (
                <div key={contact.id} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <div className="relative w-8 h-8 ml-3">
                        <img src={contact.avatar} alt={contact.name} className="w-full h-full rounded-full object-cover" />
                        {contact.online && (
                            <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-gray-100"></span>
                        )}
                    </div>
                    <span className="font-medium text-sm text-gray-700">{contact.name}</span>
                </div>
            ))}
        </div>

        <hr className="my-4" />

        {/* Sponsored/Events Placeholder */}
        <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">رعايات</h3>
            <div className="bg-white p-3 rounded-lg shadow text-center text-gray-600 cursor-pointer hover:bg-gray-50">
                <p className="text-xs font-bold text-blue-600 mb-1">تعلم React بسهولة!</p>
                <p className='text-xs'>منصة كودرز للتدريب.</p>
            </div>
        </div>
        
    </div>
);


const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-4">
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-4">

                {/* Left Sidebar (Column 1 - Sticky, Hidden on small screens) */}
                <div className="hidden xl:block xl:col-span-1">
                    <Sidebar />
                </div>

                {/* Main Feed Content (Column 2/3 - Central area) */}
                <div className="col-span-1 lg:col-span-3 xl:col-span-3 order-2 lg:order-1 max-w-lg md:max-w-xl lg:max-w-none mx-auto w-full">
                    
                    {/* 1. Stories Container */}
                    <div className="flex overflow-x-auto space-x-3 pb-3 mb-5 border-b border-gray-200 justify-start rtl:space-x-reverse">
                        {mockStories.map(story => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>

                    {/* 2. Create Post Section */}
                    <CreatePostBox />

                    {/* 3. Feed Posts */}
                    {mockPosts.map(post => (
                        <PostComponent key={post.id} post={post} />
                    ))}
                    
                    {/* End of Feed Placeholder */}
                    <div className="text-center text-gray-500 p-8">
                        <Rss className="w-6 h-6 mx-auto mb-2" />
                        <p>انتهى آخر الأخبار.</p>
                    </div>

                </div>

                {/* Right Widgets (Column 4/5 - Sticky, Hidden on small screens) */}
                <div className="hidden lg:block lg:col-span-1 order-3 w-full">
                    <RightWidgets />
                </div>
            </div>
        </div>
    );
};

export default Home;