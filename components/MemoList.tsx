// // components/MemoList.tsx

import { Memo } from '../types/memo'

import { useState } from 'react'

interface MemoListProps {
  memos: Memo[];
  deleteMemo: (id: string) => void;
  editMemo: (id: string, text: string) => void; // 追加
}

const MemoList: React.FC<MemoListProps> = ({ memos, deleteMemo, editMemo }) => {
  const [editText, setEditText] = useState('')
  const [editId, setEditId] = useState('')

  const handleEdit = (id: string, text: string) => {
    setEditId(id)
    setEditText(text.replace(/<br>/g, '\n'))
  }

  const handleCancelEdit = () => {
    setEditId('')
    setEditText('')
  }

  const handleSaveEdit = async (id: string) => {
    try {
      // 改行コードを<br>タグに変換して保存
      const editedText = editText.replace(/\n/g, '<br>')
      await editMemo(id, editedText)
      setEditId('')
      setEditText('')
    } catch (error) {
      console.error('Error editing memo:', error)
    }
  }

  return (
    <ul className='mt-[10%] '>
      {memos.map((memo: Memo) => (
        <li key={memo.id} className='leading-6 mt-8'>
          {editId === memo.id ? (
            <>
              <textarea
                className='border-1 border-slate-500 leading-6 text-neutral-600 mb-4 w-[100%]'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={editText.split('\n').length}
              />
            <ul className='flex w-full'>
              <li className='w-3/12 mr-4'><button className='items-center justify-center w-full py-4 text-base font-medium text-center transition duration-500 ease-in-out transform bg-gray-100 rounded-xl hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={() => handleSaveEdit(memo.id)}>Save</button></li>
              <li className='w-3/12 mr-4'><button className='items-center justify-center w-full py-4 text-base font-medium text-center transition duration-500 ease-in-out transform bg-gray-100 rounded-xl hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={handleCancelEdit}>Cancel</button></li>
              <li className='w-3/12'><button className='items-center justify-center w-full py-4 text-base font-medium text-center transition duration-500 ease-in-out transform bg-gray-100 rounded-xl hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={() => deleteMemo(memo.id)}>Delete</button></li>
            </ul>
            </>
          ) : (
            <>
              <div className='mb-4 text-neutral-600 leading-6' dangerouslySetInnerHTML={{ __html: memo.text }} />

              <button className='items-center justify-center px-10 py-4 text-base font-medium text-center transition duration-500 ease-in-out transform bg-gray-100 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={() => handleEdit(memo.id, memo.text)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MemoList;

