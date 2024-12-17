'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
// import { createOAuth2Session } from '@/lib/actions/user.actions';
import { FaGithub } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { RegisterFormType, signUpSchema } from '@/schema/signUpSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { signUpWithGithub } from '@/app/server/oauth';
import { ToastAction } from './ui/toast';

const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signUpState, setSignUpState] = useState({isLoading: false, isSuccess: false, isError: false});
  const [oAuth2State, setOAuth2State] = useState({isLoading: false, isSuccess: false, isError: false});
  const form = useForm<RegisterFormType>({ resolver: zodResolver(signUpSchema) });
  const { toast } = useToast();
  const params = useSearchParams();
  const router = useRouter();

  const onSubmit = async (values: RegisterFormType) => {
    setSignUpState({isLoading: true, isSuccess: false, isError: false});
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    
    switch (response.status) {
        case 201: {
            setSignUpState({isLoading: false, isSuccess: true, isError: false});
            toast({
                title: "Welcome aboard!",
                description: "🌸 Let's plant your first green companion.",
            });
            router.replace('/map');
            break;
        }

        case 409: {
            setSignUpState({isLoading: false, isSuccess: false, isError: true});
            toast({
                variant: "default",
                title: "Email is already registered",
                description: "🍂 Please check your info or try to login.",
            });
            break;
        }

        default: {
            setSignUpState({isLoading: false, isSuccess: false, isError: true});
            toast({
                variant: "destructive",
                title: "Something's off!",
                description: "🍂 Please check your info and sign up again.",
            });
            break;
        }
    }
}

const handleGithubAuth = async (event: React.MouseEvent<HTMLButtonElement>) => {
  try {
    event.preventDefault();
    setOAuth2State({ isLoading: true, isSuccess: false, isError: false });
    await signUpWithGithub();
  } catch (error) {
    setOAuth2State({ isLoading: false, isSuccess: false, isError: true });
    console.log("handle Github Auth error", error);
  }
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          variant="outline"
          disabled={oAuth2State.isLoading || signUpState.isLoading}
           className="w-full"
            onClick={handleGithubAuth}
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
        </form>
      </div>
    </section>
  )
}

export default AuthForm
