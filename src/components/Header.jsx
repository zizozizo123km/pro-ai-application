import React from 'react';
import { 
    Search, 
    Home, 
    Clapperboard, 
    Store, 
    Users, 
    Gamepad, 
    LayoutGrid, 
    MessageCircle, 
    Bell 
} from 'lucide-react';

// Helper component for primary navigation icons
const NavIcon = ({ Icon, isActive, title }) => (
    <div 
        className={`relative p-3 cursor-pointer transition-colors duration-200 group h-14 flex items-center justify-center flex-1 lg:min-w-[120px] 
            ${isActive 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-100 rounded-lg'}
            `}
        title={title}
    >
        <Icon className={`w-7 h-7 ${isActive ? 'text-blue-500' : 'group-hover:text-gray-700'}`} />
        {isActive && (
            <div className="absolute bottom-[-1px] h-0.5 w-full bg-blue-500"></div>
        )}
    </div>
);

// Helper component for utility icons
const UtilityIcon = ({ Icon, title }) => (
    <div 
        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition duration-150"
        title={title}
    >
        <Icon className="w-5 h-5 text-black" />
    </div>
);

const Header = () => {
    // Mock user data and active state
    const user = {
        name: "Ahmed",
        avatarUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=A", 
    };

    const activeTab = 'Home'; // Simulate active tab

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-1 h-[56px] flex items-center justify-between border-b border-gray-200">
            
            {/* Left Section (Logo & Search) */}
            <div className="flex items-center space-x-2 w-[30%] min-w-[200px]">
                {/* Facebook Logo SVG (Blue F) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                    className="w-10 h-10 cursor-pointer"
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.196v-7.989H4.27v-3.207h3.357V8.586c0-3.328 1.988-5.148 4.992-5.148 1.436 0 2.668.212 3.045.306v3.461h-2.191c-1.686 0-2.028.802-2.028 1.98v2.602h3.91l-.63 3.207h-3.28V23.196C19.837 21.426 24 17.084 24 12 24 5.373 18.627 0 12 0z"/>
                </svg>

                {/* Search Input */}
                <div className="relative flex items-center bg-gray-100 p-2 rounded-full hidden md:flex">
                    <Search className="w-5 h-5 text-gray-500 ml-1 mr-2 flex-shrink-0" />
                    <input 
                        type="text" 
                        placeholder="Search Facebook" 
                        className="bg-transparent focus:outline-none text-sm w-full min-w-[100px]"
                    />
                </div>
            </div>

            {/* Center Section (Navigation) */}
            <nav className="flex items-center justify-center flex-grow mx-4 max-w-2xl h-full">
                <NavIcon Icon={Home} isActive={activeTab === 'Home'} title="Home" />
                <NavIcon Icon={Clapperboard} isActive={activeTab === 'Watch'} title="Watch" />
                <NavIcon Icon={Store} isActive={activeTab === 'Marketplace'} title="Marketplace" />
                <NavIcon Icon={Users} isActive={activeTab === 'Groups'} title="Groups" />
                <NavIcon Icon={Gamepad} isActive={activeTab === 'Gaming'} title="Gaming" className="hidden lg:flex" />
            </nav>

            {/* Right Section (User & Utilities) */}
            <div className="flex items-center space-x-2 w-[30%] justify-end min-w-[150px]">
                
                {/* Profile Avatar Button */}
                <div className="flex items-center p-1 pr-3 rounded-full cursor-pointer hover:bg-gray-200 transition duration-150">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover" 
                    />
                    <span className="ml-2 text-sm font-semibold hidden lg:inline">{user.name}</span>
                </div>
                
                {/* Utility Icons */}
                <div className='hidden md:flex space-x-2'>
                    <UtilityIcon Icon={LayoutGrid} title="Menu" />
                    <UtilityIcon Icon={MessageCircle} title="Messenger" />
                    <UtilityIcon Icon={Bell} title="Notifications" />
                </div>
            </div>
        </header>
    );
};

export default Header;