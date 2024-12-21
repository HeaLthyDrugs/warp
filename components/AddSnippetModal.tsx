"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languageConfig, type LanguageKey } from '@/utils/languages';
import React from 'react';

interface AddSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (snippet: { title: string; code: string; language: string }) => void;
}

const LANGUAGES = Object.keys(languageConfig) as LanguageKey[];

export function AddSnippetModal({ isOpen, onClose, onSubmit }: AddSnippetModalProps) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = () => {
    onSubmit({ title, code, language });
    setTitle('');
    setCode('');
    setLanguage('javascript');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
      <DialogTitle>Add New Snippet</DialogTitle>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Snippet Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {LANGUAGES.map((lang) => (
                  <SelectItem 
                    key={lang} 
                    value={lang} 
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="flex items-center justify-center w-4 h-4">
                        {React.createElement(languageConfig[lang].icon, {
                          style: { color: languageConfig[lang].color }
                        })}
                      </span>
                      <span className="flex-1">
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-[200px] font-mono"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Snippet</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 