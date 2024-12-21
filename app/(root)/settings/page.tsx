"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Mail, Github, Calendar, Shield, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getProviderDetailsAction } from '@/app/actions/auth';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const Settings = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [providerDetails, setProviderDetails] = useState<any>(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      const details = await getProviderDetailsAction();
      setProviderDetails(details);
    };
    fetchProviderDetails();
  }, []);

  const logOut = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Logout failed');
      router.refresh();
      router.push('/connect');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mx-auto px-2 sm:px-0 space-y-6"
      >
        {/* Profile Card */}
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
              <User className="w-6 h-6 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              <motion.div variants={item}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-base font-semibold">{user?.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/20">
                      <Mail className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-base font-semibold">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Github className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub ID</p>
                      <p className="text-base font-semibold">{user?.$id}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Session Security */}
            <motion.div 
              variants={item}
              className="mt-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-500">Session Security</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You can log out of your current session.
              </p>
              <Button 
                variant="destructive" 
                className="w-full flex items-center gap-2 bg-red-300/90 hover:bg-red-400"
                onClick={logOut}
              >
                <LogOut className="w-4 h-4" />
                Logout from Current Session
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;