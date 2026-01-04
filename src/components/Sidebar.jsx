const sidebarItems = [
  { icon: 'Users', label: 'الأصدقاء', path: '/friends' },
  { icon: 'Clock', label: 'الذكريات', path: '/memories' },
  { icon: 'Save', label: 'المحفوظات', path: '/saved' },
  { icon: 'Users', label: 'المجموعات', path: '/groups' },
  { icon: 'ShoppingCart', label: 'Marketplace', path: '/marketplace' },
  { icon: 'Video', label: 'Watch', path: '/watch' },
  { icon: 'Calendar', label: 'الأحداث', path: '/events' },
  { icon: 'Flag', label: 'الصفحات', path: '/pages' },
  { icon: 'TrendingUp', label: 'الإعلانات', path: '/ads' },
];

const shortcutItems = [
  { img: 'https://placehold.co/32x32', label: 'React Developers', path: '/group/react' },
  { img: 'https://placehold.co/32x32', label: 'Tailwind CSS', path: '/page/tailwind' },
  { img: 'https://placehold.co/32x32', label: 'مجموعة الأكل', path: '/group/food' },
];

import React from 'react';
import { NavLink } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const SidebarItem = ({ icon, label, path, isShortcut = false, profileImage }) => {
  const IconComponent = LucideIcons[icon];
  
  const content = (
    <>
      {profileImage ? (
        <img 
          src={profileImage} 
          alt="Profile" 
          className="w-8 h-8 rounded-full object-cover ml-3"
        />
      ) : isShortcut ? (
        <img 
          src={icon} 
          alt={label} 
          className="w-8 h-8 rounded-lg object-cover ml-3"
        />
      ) : (
        IconComponent && <IconComponent className="w-6 h-6 ml-3 text-blue-500" />
      )}
      <span className="text-sm font-medium truncate">{label}</span>
    </>
  );

  return (
    <NavLink 
      to={path}
      className={({ isActive }) => 
        `flex items-center p-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 
         ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`
      }
    >
      {content}
    </NavLink>
  );
};

const Sidebar = () => {
  const [showMore, setShowMore] = React.useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const displayedSidebarItems = showMore ? sidebarItems : sidebarItems.slice(0, 7);

  // Placeholder for user data (should come from context/state)
  const userData = {
    name: "علي المحمد",
    profilePicture: "https://i.pravatar.cc/150?img=60", // Example profile picture
    path: "/profile/ali_mohammad"
  };

  if (!isLargeScreen) {
    // On mobile/tablet, the sidebar is usually a slide-out or hidden, 
    // but for the main left sidebar layout, we only render on large screens.
    return null; 
  }

  return (
    <div className="fixed top-14 right-0 w-60 xl:w-72 h-[calc(100vh-56px)] overflow-y-auto hidden lg:block bg-white dark:bg-gray-900 pr-2 pt-3 custom-scrollbar">
      <div className="p-2 space-y-2">
        {/* User Profile */}
        <SidebarItem
          profileImage={userData.profilePicture}
          label={userData.name}
          path={userData.path}
        />
        
        {/* Main Navigation Items */}
        {displayedSidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}

        {/* Show More/Less Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center w-full p-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 text-right"
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center ml-3">
            {showMore ? (
              <ChevronUp className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            )}
          </div>
          <span className="text-sm font-medium">{showMore ? 'عرض أقل' : 'عرض المزيد'}</span>
        </button>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 my-2 mx-2"></div>

      {/* Shortcuts Section */}
      <div className="p-2 space-y-2">
        <h3 className="text-md font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">اختصاراتك</h3>
        {shortcutItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.img}
            label={item.label}
            path={item.path}
            isShortcut={true}
          />
        ))}
      </div>
      
      {/* Footer Links (simplified) */}
      <div className="mt-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
        <a href="#" className="hover:underline ml-2">الخصوصية</a>
        <a href="#" className="hover:underline ml-2">الشروط</a>
        <a href="#" className="hover:underline ml-2">الإعلانات</a>
        <span className="block mt-1">Meta © 2024</span>
      </div>

      {/* Tailwind Scrollbar Fix (if needed, custom-scrollbar class handles it) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a0a0a0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;