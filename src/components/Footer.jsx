const Footer = () => {
  const languages = [
    'العربية', 'English (US)', 'Français (France)', 'Español', 
    'Deutsch', 'Italiano', 'Português (Brasil)', '中文(简体)', 
    '日本語', '한국어', 'ภาษาไทย'
  ];

  const mainLinks = [
    'Sign Up', 'Log In', 'Messenger', 'Facebook Lite', 'Video', 'Places', 
    'Games', 'Marketplace', 'MetaPay', 'Meta Store', 'Meta Quest', 
    'Instagram', 'Threads', 'Fundraisers', 'Services', 'Voting Information Center', 
    'Privacy Policy', 'Privacy Center', 'Groups', 'About', 'Create Ad', 
    'Create Page', 'Developers', 'Careers', 'Cookies', 'Ad Choices', 
    'Terms', 'Help', 'Contact Uploading & Non-Users'
  ];

  return (
    <footer className="bg-white dark:bg-[#1c1e21] text-xs py-4 px-4 mt-6 border-t border-gray-200 dark:border-[#3a3a3a] text-[#737373] dark:text-[#b0b3b8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Language Section */}
        <div className="flex flex-wrap pb-2 border-b border-gray-200 dark:border-[#3a3a3a] mb-2">
          {languages.map((lang, index) => (
            <span key={index} className="mr-3 hover:underline cursor-pointer">
              {lang}
            </span>
          ))}
          <button className="h-5 w-7 bg-gray-100 dark:bg-[#3a3a3a] border border-gray-300 dark:border-[#525252] text-[#4b4f56] dark:text-[#b0b3b8] rounded-sm flex items-center justify-center text-sm font-bold hover:bg-gray-200 dark:hover:bg-[#4e4e4e]">
            +
          </button>
        </div>

        {/* Main Links Section */}
        <div className="flex flex-wrap pt-2 pb-2">
          {mainLinks.map((link, index) => (
            <span key={index} className={`mr-3 hover:underline cursor-pointer ${index > 0 ? 'mt-1' : ''}`}>
              {link}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-2 text-gray-500 dark:text-[#8a8d91]">
          <span>Meta © 2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;