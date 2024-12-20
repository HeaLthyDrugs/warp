'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { signUpWithGithub } from '@/app/server/oauth';

const AuthForm = () => {
  const [oAuth2State, setOAuth2State] = useState({isLoading: false, isSuccess: false, isError: false});
  const { toast } = useToast();
  const router = useRouter();

  const handleGithubAuth = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      setOAuth2State({ isLoading: true, isSuccess: false, isError: false });
      await signUpWithGithub();
    } catch (error) {
      setOAuth2State({ isLoading: false, isSuccess: false, isError: true });
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Unable to connect with GitHub. Please try again.",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 ">
        <div className="text-center space-y-6">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <Image 
                src="/icons/S.png"
                width={40}
                height={40}
                alt="Horizon logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </Link>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Welcome to WARP
            </h2>
            <p className="text-sm text-gray-500">
              Your Productivity Dashboard.
            </p>
          </div>
        </div>

        {/* GitHub Button */}
        <Button
          variant="outline"
          disabled={oAuth2State.isLoading}
          className="w-full h-12 text-sm font-medium transition-all duration-200 
                     hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm
                     flex items-center justify-center gap-3"
          onClick={handleGithubAuth}
        >
          {oAuth2State.isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <FaGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </>
          )}
        </Button>

      </div>
    </section>
  )
}

export default AuthForm
