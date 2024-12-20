'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const integrations = [
  {
    name: 'Slack',
    icon: '/slack-icon.png',
    description: 'Connect your Slack workspace for real-time notifications',
    color: 'bg-[#ECF7FF]',
    textColor: 'text-[#36C5F0]'
  },
  {
    name: 'Jira',
    icon: '/jira-icon.png',
    description: 'Sync your Jira issues and track progress',
    color: 'bg-[#E6F0FF]',
    textColor: 'text-[#0052CC]'
  },
  {
    name: 'Trello',
    icon: '/trello-icon.png',
    description: 'Integrate with Trello boards for task management',
    color: 'bg-[#EBF6FF]',
    textColor: 'text-[#0079BF]'
  }
];

const IntegrationsPage = () => {
  return (
    <div className="relative min-h-screen bg-[#faf8f6] p-4 sm:p-6 md:p-8">
      {/* Main Content */}
      <div className="mb-6">
        <h2 className="text-26 font-semibold text-gray-500">Integrations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card
            key={integration.name}
            className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${integration.color} p-4 rounded-full mb-4`}>
                  <Image
                    src={integration.icon}
                    alt={integration.name}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${integration.textColor}`}>
                  {integration.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {integration.description}
                </p>
                <Button 
                  variant="outline" 
                  className={`w-full ${integration.textColor} border-current hover:bg-opacity-10 hover:bg-current`}
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blurred Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#9f7aea] mb-2">
            🚧Work in Progress🚧
            </h2>
            <p className="text-muted-foreground">
              currently setting up integrations. Check back soon!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntegrationsPage;