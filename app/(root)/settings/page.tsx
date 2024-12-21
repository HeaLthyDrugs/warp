"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Mail, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCurrentSession } from "@/appwrite/appwrite.client";
import { toast } from "sonner";

const Settings = () => {
  const { user } = useAuth();
  const router = useRouter();

  const logOut = async () => {
    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Logout failed');

        router.refresh();
        router.push('/connect');
    } catch (error) {
        console.error('Logout error:', error);
        toast.error("Logout failed. Please try again.");
    }
};



  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* User Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/50">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
                  <p className="text-sm sm:text-base font-medium">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/50">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <p className="text-sm sm:text-base font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/50">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">GitHub ID</p>
                  <p className="text-sm sm:text-base font-medium">{user?.$id}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4 sm:pt-6">
              <Button 
                variant="destructive" 
                className="w-full flex items-center gap-2 text-sm sm:text-base"
                onClick={logOut}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;