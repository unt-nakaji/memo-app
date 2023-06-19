// components/MemoForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

interface MemoFormProps {
  addMemo: (text: string) => void;
}

const MemoForm: React.FC<MemoFormProps> = ({ addMemo }) => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === '') {
      setErrorMessage('テキストを入力してください');
      return;
    }

    addMemo(text);
    setText('');
    setErrorMessage('');
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className='w-[96%] m-[auto] [border-bottom:2px_solid_#ccc]'>

    <textarea rows={10} className='block w-full px-5 py-3 my-4 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300' placeholder="テキストを入力してください" value={text} onChange={handleInputChange} />

      <div className='flex items-end'>
      {errorMessage && <p className='message'>{errorMessage}</p>}
      <button className="ml-[auto] px-10 py-4 mb-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Add Memo</button>
      </div>
    </form>
  );
};

export default MemoForm;

