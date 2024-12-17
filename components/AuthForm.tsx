'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
// import { createOAuth2Session } from '@/lib/actions/user.actions';
import { FaGithub } from "react-icons/fa";

const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGitHubSignIn = async () => {

  };

  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              Welcome to Horizon
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Sign in with GitHub to continue
            </p>
          </div>
      </header>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          variant="outline"
          type="button"
          onClick={handleGitHubSignIn}
          disabled={isLoading}
          className="flex items-center gap-2 w-full"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <FaGithub className="h-5 w-5" />
              Continue with GitHub
            </>
          )}
        </Button>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </section>
  )
}

export default AuthForm