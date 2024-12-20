import React from 'react'

const Header = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h3 className="font-light text-14 lg:text-30 text-gray-500">
        {title}&nbsp;
      </h3>
      <h1 className="font-bold text-24 lg:text-34 text-gray-900">
        {user}
      </h1>
    </div>
  )
}

export default Header