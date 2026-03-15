// hooks/useSearch.ts
import { useState } from 'react';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Dispatch a custom event that other components can listen to
    const event = new CustomEvent('global-search', { detail: searchTerm });
    window.dispatchEvent(event);

    // Scroll to the AI assistant section if it exists
    const aiSection = document.getElementById('ai-assistant-section');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSearchTerm(prompt);

    // Dispatch the same event as above
    const event = new CustomEvent('global-search', { detail: prompt });
    window.dispatchEvent(event);

    // Scroll to AI assistant
    const aiSection = document.getElementById('ai-assistant-section');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handlePromptClick,
  };
}