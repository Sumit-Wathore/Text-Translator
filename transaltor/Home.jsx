import { useState } from 'react';

function Home() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ur', name: 'Urdu' },
    { code: 'te', name: 'Telugu' }
  ];

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLanguage}`;
      const response = await fetch(url);
      
      const data = await response.json();
      
      if (data.responseData) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError('Translation failed. Please try again.');
        setTranslatedText('');
      }
    } catch (err) {
      setError('Translation service unavailable. Please try again.');
      setTranslatedText('');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === targetLanguage)?.name || 'Hindi';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Translate English Text</h1>
        <p className="text-gray-600 text-lg">Instantly translate English to Indian languages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              English Text
            </label>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Enter English text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="text-right mt-2 text-sm text-gray-500">
              {inputText.length} characters
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              Translate to
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={translateText}
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
            <button
              onClick={handleClear}
              className="py-3 px-6 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Translation Result</h2>
              <p className="text-gray-600">Translated to {getCurrentLanguage()}</p>
            </div>
          </div>

          <div className="h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
            {translatedText ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Original Text</h3>
                  <p className="text-gray-700 bg-white p-3 rounded border">{inputText}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-600 mb-1">Translated Text</h3>
                  <p className="text-gray-900 text-lg p-3 bg-green-50 rounded border border-green-100">{translatedText}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                  </svg>
                  <p>Translation will appear here</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-4">Available Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-3 rounded-lg border ${targetLanguage === lang.code ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}`}
                >
                  <div className="font-medium text-gray-800">{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-medium text-blue-900 mb-2">How to use:</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-2">
          <li>Enter English text in the left box</li>
          <li>Select target language from dropdown</li>
          <li>Click Translate button</li>
          <li>View translation in the right box</li>
        </ol>
      </div>
    </div>
  );
}

export default Home;