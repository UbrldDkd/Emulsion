import { useState, useEffect } from 'react';
import { Keys } from '../../Keys.js';


export function useFetchSearch({searchTerm}) {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const { Urls } = Keys;
const { baseUrl, search } = Urls;

useEffect(() => {
    // Debounce timer
    const delayTimer = setTimeout(() => {
        const fetchSearch = async () => {
            if (!searchTerm || searchTerm.trim().length < 2) {
                setData(null);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const searchRes = await fetch(`${baseUrl}${search}?q=${encodeURIComponent(searchTerm)}&hasImages=true`);
                if (!searchRes.ok) throw new Error('Search request failed');

                const searchData = await searchRes.json();

                console.log('Search API Response:', searchData);
                
                if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
                    setData([]);
                    return;
                }

                const objects = await Promise.all(
                    searchData.objectIDs.slice(0, 5).map(async (id) => {
                        const objRes = await fetch(`${baseUrl}/objects/${id}`);
                        return await objRes.json();
                    })
                );

                if (!objects) throw new Error('Failed to fetch object details');
                
                setData(objects);
                

            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSearch();
    }, 300); // 300ms debounce delay

    // Cleanup function to clear the timeout
    return () => clearTimeout(delayTimer);


}, [ searchTerm ]);

return { data, loading, error };
    
}