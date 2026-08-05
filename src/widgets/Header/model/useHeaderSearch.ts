import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

import type { Tab, TabId } from './useTabs';

export function useHeaderSearch(
  tabs: Tab[],
  onTabChange: (tabId: TabId) => void
) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTabs = useMemo(() => {
    if (!normalizedQuery) return tabs;

    return tabs.filter((tab) =>
      [tab.id, tab.label, tab.title]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery, tabs]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !searchAreaRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const clear = () => {
    setQuery('');
    setIsOpen(false);
    searchInputRef.current?.focus();
  };

  const selectResult = (tabId: TabId) => {
    onTabChange(tabId);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      clear();
      event.currentTarget.blur();
      return;
    }

    if (event.key === 'Enter' && normalizedQuery && filteredTabs.length === 1) {
      event.preventDefault();
      selectResult(filteredTabs[0].id);
    }
  };

  return {
    filteredTabs,
    query,
    searchAreaRef,
    searchInputRef,
    shouldShowDropdown: isOpen && normalizedQuery.length > 0,
    onClear: clear,
    onFocus: () => normalizedQuery && setIsOpen(true),
    onKeyDown: handleKeyDown,
    onQueryChange: (value: string) => {
      setQuery(value);
      setIsOpen(true);
    },
    onSelectResult: selectResult,
  };
}
