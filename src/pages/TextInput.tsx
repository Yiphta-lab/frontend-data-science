import React, { useState } from 'react';

function TextInput() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null); // <-- ici
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.render.com/deploy/srv-cr45hirtq21c73dug6hg?key=5CnDnuUG8J0/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        setImage(imageUrl);
      } else {
        console.error('Failed to generate image');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <label htmlFor="textInput" className="block text-white mb-2">
        Enter text:
      </label>
      <input
        id="textInput"
        type="text"
        value={text}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Generate Image'}
      </button>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Generated" className="border border-gray-300 rounded" />
        </div>
      )}
    </div>
  );
}

export default TextInput;

