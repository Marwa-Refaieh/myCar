import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, History, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'dreamCarSearchHistory';

const NavbarSearch = () => {
    const { t, i18n } = useTranslation('home');
    const [term, setTerm] = useState('');
    const [history, setHistory] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const popoverRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target) &&
                popoverRef.current &&
                !popoverRef.current.contains(e.target)
            ) {
                setShowPopover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearchApi = (query) => {
        return axios.get(`/api/search?q=${encodeURIComponent(query)}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Search API error:', error);
                return null;
            });
    };

    const handleSearch = (value) => {
        const query = value.trim();
        if (!query) return;

        const newHistory = [query, ...history.filter((h) => h !== query)].slice(0, 5);
        setHistory(newHistory);

        performSearchApi(query).then(() => {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        });

        setShowPopover(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(term);
            setTerm("")
        }
    };

    const handleRemove = (e, item) => {
        e.stopPropagation();
        setHistory((prev) => prev.filter((h) => h !== item));
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTerm(value);

        const filtered = history.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
        );

        if (value.length > 0 && filtered.length > 0) {
            setShowPopover(true);
        } else {
            setShowPopover(false);
        }

        if (value.length === 0) {
            setShowPopover(false);
        }
    };

    const filteredHistory = history.filter((item) =>
        item.toLowerCase().includes(term.toLowerCase())
    );

    return (
        <div className="w-full flex justify-center items-center ">
            <div className="relative w-full max-w-xl flex items-center" ref={popoverRef}>
                <Search className={`absolute text-gray-400 ${i18n.language === 'ar' ? 'right-3' : 'left-3'}`} size={18} />
                <input
                    type="text"
                    value={term}
                    ref={inputRef}
                    placeholder={t('search')}
                    className={`w-full py-2 pl-10 pr-10 bg-transparent text-white placeholder:text-gray-400 border-none outline-none 
                    ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (term.length > 0 && filteredHistory.length > 0) setShowPopover(true);
                    }}
                />


                {filteredHistory.length > 0 && (
                    <>
                        <button
                            className={`absolute text-gray-400 hover:text-white 
                            ${i18n.language === 'ar' ? 'left-2' : 'right-3'}`}
                            onClick={() => setShowPopover(!showPopover)}
                        >
                            <History size={18} />
                        </button>

                        {showPopover && (
                            <div className="absolute top-full mt-2 w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg shadow-lg z-10">
                                <div className="flex items-center justify-between p-4 text-sm text-gray-400 ">
                                    <span>{t('Search History')}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setHistory([])}
                                        className="text-blue-400 hover:text-blue-300 px-2 h-auto hover:bg-transparent"
                                    >
                                        {t('Clear All')}
                                    </Button>
                                </div>
                                <Separator className="bg-zinc-700" />
                                <ul className="py-2 max-h-60 overflow-y-auto sidebar-scroll">
                                    {filteredHistory.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => handleSearch(item)}
                                            className={`flex justify-between items-center mx-4 py-3 cursor-pointer ${idx !== filteredHistory.length - 1 ? 'border-b border-white/25' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <History size={16} className="text-gray-400" />
                                                <span>{item}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => handleRemove(e, item)}
                                                className="p-1 h-auto hover:bg-transparent hover:text-white/50"
                                            >
                                                <X size={16} className="text-gray-400 hover:text-white" />
                                            </Button>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NavbarSearch;
