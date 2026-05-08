'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';

const isValidBCLiquorProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    // console.log('hostname:', hostname);

    if (
      hostname.includes('bcliquorstores.com')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidBCLiquorProductURL(searchPrompt);

    if (!isValidLink) {
      setError('Please provide a valid bcliquorstores.com product link');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-1 mt-6'>
      <form className='flex flex-wrap gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
            if (error) setError('');
          }}
          placeholder='Enter product link'
          className='searchbar-input'
        />

        <button
          type='submit'
          className='searchbar-btn'
          disabled={searchPrompt === ''}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <p className='text-red-500 text-sm min-h-[20px]'>{error}</p>
    </div>
  );
};

export default Searchbar;
