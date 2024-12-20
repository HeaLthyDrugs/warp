import React from 'react'

const Header = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  // Get first name only
  const firstName = user?.split(' ')[0] || user;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="header-box">
      <h3 className="font-bold text-14 lg:text-20 text-gray-500">
        {getGreeting()},
      </h3>
      <h1 className="header-box-title font-bold text-32 lg:text-48 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        {firstName}
      </h1>
    </div>
  )
}

export default Header