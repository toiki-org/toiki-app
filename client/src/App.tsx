import { ArrowPathIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { isYoutubeOrSpotify } from './utils/isYoutubeOrSpotify';

export function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<null | {
    url: string;
    embedUrl: string;
  }>(null);
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.item(0) as HTMLInputElement;
    const formData = new FormData(form);
    const url = formData.get('url');

    if (!(url && typeof url === 'string')) {
      input.setCustomValidity('Invalid URL');
      return;
    }

    const match = isYoutubeOrSpotify(url);

    if (!match) {
      input.setCustomValidity('Invalid URL');
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/api/convert?url=' + url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = (await res.json()) as {
        data: { url: string; embedUrl: string };
      };
      setResult(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred, please try again.');
    }
  };

  return (
    <div className="h-[100vh] flex flex-col">
      <header className="bg-white">
        <nav
          className="mx-auto flex items-center justify-center p-6 lg:px-8 shadow"
          aria-label="Global"
        >
          <img
            className="h-8 w-auto rounded"
            src="/toiki_logo.webp"
            alt="Toiki Logo"
          />
          <span className="text-xl ml-4">Toiki</span>
        </nav>
      </header>
      <div className="flex flex-1 justify-center items-center flex-col">
        <form
          className="flex flex-col items-center w-full px-3"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="url"
            className="h-[50px] max-w-[500px] w-full border-2 rounded border-solid border-black p-2 invalid:border-red-500"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            required
            onChange={(e) => {
              const input = e.target;
              const value = input.value;
              const match = isYoutubeOrSpotify(value);
              if (!match) {
                input.setCustomValidity('Invalid URL');
              } else {
                input.setCustomValidity('');
              }
            }}
          />
          <div className="mt-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
            >
              <ArrowPathIcon
                className={`-ml-0.5 h-5 w-5 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              Convert
            </button>
          </div>
        </form>
        <div className="h-5 mt-5">
          {error && <p className="text-red-500">{error}</p>}
          {result && (
            <div className="flex flex-col items-center w-full">
              Your URL is ready!
              <div className="break-all">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  {result.url}
                </a>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    navigator.clipboard.writeText(result.url);
                  }}
                >
                  <ClipboardIcon
                    className="-ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Copy
                </button>
              </div>
              <iframe
                src={result.embedUrl}
                title="embed"
                className="mt-5 w-full max-w-[500px] h-[300px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
