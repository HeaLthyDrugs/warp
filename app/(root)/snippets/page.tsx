"use client"

import { useEffect, useState } from 'react';
import { 
  Search, 
  Code2, 
  Plus,
  Download,
  Brain,
  Copy,
  Star,
  Trash2,
  Edit,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { snippetsService } from '@/services/snippets';
import { Snippet } from '@/types/snippet';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { AddSnippetModal } from '@/components/AddSnippetModal';
import { languageConfig, type LanguageKey } from '@/utils/languages';
import React from 'react';
import Image from 'next/image';
import Spinner from '@/components/ui/spinner';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSnippets = async () => {
    try {
      if (!user?.$id) return;
      setLoading(true);
      const snippets = await snippetsService.getUserSnippets(user.$id);
      setSnippets(snippets);
    } catch (error) {
      toast.error('Failed to fetch snippets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async ({ title, code, language }: { title: string; code: string; language: string }) => {
    try {
      if (!user?.$id) return;
      const newSnippet = {
        userId: user.$id,
        title,
        code,
        language,
        tags: [],
        isFavorite: false
      };
      
      const response = await snippetsService.createSnippet(newSnippet);
      setSnippets(prev => [response, ...prev]);
      toast.success('Snippet created successfully');
    } catch (error) {
      toast.error('Failed to create snippet');
      console.error(error);
    }
  };

  const handleCopyCode = async (code: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(snippetId);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleDownloadSnippet = (snippet: Snippet) => {
    const language = snippet.language as LanguageKey;
    const extension = languageConfig[language]?.extension || language;
    const element = document.createElement('a');
    const file = new Blob([snippet.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${snippet.title}.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      await snippetsService.deleteSnippet(snippetId);
      setSnippets(prev => prev.filter(s => s.$id !== snippetId));
      toast.success('Snippet deleted successfully');
    } catch (error) {
      toast.error('Failed to delete snippet');
    }
  };

  const filteredSnippets = snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user?.$id) {
      fetchSnippets();
    }
  }, [user?.$id]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">Code Snippets</h2>
        <Card className="rounded-xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search snippets..." 
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                className="bg-[#9f7aea] hover:bg-[#8b5cf6] text-white"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> New Snippet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Spinner />
          </div>
        ) : filteredSnippets.length === 0 ? (
          <div className="text-center py-10">
            {searchTerm ? 'No matching snippets found.' : 'No snippets found. Create your first snippet!'}
          </div>
        ) : (
          filteredSnippets.map((snippet) => (
            <Card key={snippet.$id} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f0e6ff] p-2 rounded-full">
                      <Code2 className="w-4 h-4 text-[#9f7aea]" />
                    </div>
                    <div>
                      <h3 className="font-medium">{snippet.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="flex items-center gap-2 px-2 py-1"
                        >
                          {snippet.language in languageConfig && (
                            <span className="flex items-center justify-center w-4 h-4">
                              {React.createElement(languageConfig[snippet.language as LanguageKey].icon, {
                                style: { color: languageConfig[snippet.language as LanguageKey].color }
                              })}
                            </span>
                          )}
                          <span>
                            {snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)}
                          </span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(snippet.$createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleCopyCode(snippet.code, snippet.$id)}
                      className="relative"
                    >
                      {copiedId === snippet.$id ? (
                        <Check className="w-4 h-4 text-green-500 animate-in fade-in-0 zoom-in-50 duration-300" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownloadSnippet(snippet)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteSnippet(snippet.$id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative rounded-lg overflow-hidden">
                  <SyntaxHighlighter 
                    language={snippet.language}
                    style={vs2015}
                    customStyle={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-[#f0e6ff] bg-opacity-50">
                <div className="flex items-start gap-3">
                  <Image src="/icons/S.png" alt="WARP AI" width={20} height={20} className="rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-[#9f7aea]">WARP AI Suggestions...</p>
                    <p className="text-sm text-muted-foreground text-gray-500">
                      Functionality adding soon...
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <AddSnippetModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateSnippet}
      />
    </div>
  );
};

export default SnippetsPage;