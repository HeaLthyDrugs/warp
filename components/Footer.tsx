// import { logoutAccount } from '@/lib/actions/user.actions'
// import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const router = useRouter();

  // const handleLogOut = async () => {
  //   const loggedOut = await logoutAccount();

  //   if(loggedOut) router.push('/sign-in')
  // }


  return (
    <footer className="footer">
      <h1>Hello</h1>
    </footer>
  )
}

export default Footer