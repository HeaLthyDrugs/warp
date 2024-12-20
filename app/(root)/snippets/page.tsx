"use client"

import { useState } from 'react';
import { 
  Search, 
  Code2, 
  Plus,
  Download,
  Upload,
  Brain,
  Tag,
  Copy,
  Star,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
}

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: '1',
      title: 'React useState Hook Example',
      code: 'const [state, setState] = useState(initialState);',
      language: 'typescript',
      tags: ['React', 'Hooks'],
      isFavorite: true,
      createdAt: new Date(),
    },
    // Add more sample snippets
  ]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-26 font-semibold text-gray-500">Manage your snippets</h2>
      </div>


      {/* Search and Actions Bar */}
      <Card className="mb-4 sm:mb-6 rounded-xl shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search snippets..." 
                className="pl-9 bg-white border-none w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-[#9f7aea] hover:bg-[#8b5cf6] text-white">
                <Plus className="w-4 h-4 mr-2" /> New Snippet
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories and Snippets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <Card className="lg:col-span-1 rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f0e6ff] text-[#9f7aea] font-medium">
                All Snippets
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f0e6ff]">
                JavaScript
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f0e6ff]">
                TypeScript
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f0e6ff]">
                React
              </button>
              {/* Add more categories */}
            </div>
          </CardContent>
        </Card>

        {/* Snippets List */}
        <div className="lg:col-span-3 space-y-4">
          {snippets.map((snippet) => (
            <Card key={snippet.id} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f0e6ff] p-2 rounded-full">
                      <Code2 className="w-4 h-4 text-[#9f7aea]" />
                    </div>
                    <div>
                      <h3 className="font-medium">{snippet.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {snippet.tags.map((tag, index) => (
                          <Badge 
                            key={index}
                            className="bg-[#e6f0ff] text-[#4a90e2] text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground">
                          {new Date(snippet.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={snippet.isFavorite ? 'text-[#f6ad55]' : ''}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Copy className="w-4 h-4" />
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
              {/* AI Suggestions */}
              <CardFooter className="p-4 bg-[#f0e6ff] bg-opacity-50">
                <div className="flex items-start gap-3">
                  <Brain className="w-4 h-4 mt-1 text-[#9f7aea]" />
                  <div>
                    <p className="text-sm font-medium text-[#9f7aea]">AI Suggestion</p>
                    <p className="text-sm text-muted-foreground">
                      Consider using optional chaining for better null handling.
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetsPage;