

// pages/index.tsx
import { useState, useEffect } from 'react'
import { getFirestore, collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import { initializeApp,FirebaseApp } from 'firebase/app'
import MemoList from '../components/MemoList'
// import MemoForm from '../components/MemoForm'
import { Memo } from './../types/memo'
import Link from 'next/link';


import './../src/app/globals.css';


const firebaseConfig = {
  apiKey: "AIzaSyD1KbcNu5pQMIlICYppKLzGzzfuIh3RJ-A",
  authDomain: "memo-app-3eddc.firebaseapp.com",
  projectId: "memo-app-3eddc",
  storageBucket: "memo-app-3eddc.appspot.com",
  messagingSenderId: "438516604676",
  appId: "1:438516604676:web:776755309ac7813b78fa51"
};


const app: FirebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(app)

const App = () => {

  const [memos, setMemos] = useState<Memo[]>([])

  useEffect(() => {
    const memosCollection = collection(db, 'memos')
    const memosQuery = query(memosCollection, orderBy('date', 'desc'))

    const unsubscribe = onSnapshot(memosQuery, (snapshot) => {
      const memosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Memo))
      setMemos(memosData)
    })

    return () => unsubscribe()
  }, [])


  // const addMemo = async (text: string) => {
  //   try {
  //     const formattedText = text.replace(/\n/g, '<br>')
  //     await addDoc(collection(db, 'memos'), {
  //       text: formattedText,
  //       date: new Date().getTime(),
  //     })
  //   } catch (error) {
  //     console.error('Error adding memo:', error)
  //   }
  // }

  const editMemo = async (id: string, text: string) => {
    try {
      const memoRef = doc(db, 'memos', id)
      await updateDoc(memoRef, { text: text })
    } catch (error) {
      console.error('Error editing memo:', error)
    }
  }

  const deleteMemo = async (id: string) => {
    try {
      const memoRef = doc(db, 'memos', id)
      await deleteDoc(memoRef)
    } catch (error) {
      console.error('Error deleting memo:', error)
    }
  }

  return (
    <div className='bg-gray-100 py-4 min-h-screen'>

      <div className='max-w-screen-md rounded-xl bg-white w-[96%] m-[auto] block px-4 py-8 font-medium text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
        {/* <MemoForm addMemo={addMemo} /> */}
        <Link href="/edit/add" className='items-center justify-center w-full px-4 py-4 text-base font-medium text-center transition duration-500 ease-in-out transform bg-gray-100 rounded-xl hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          Add Memo
        </Link>


        <MemoList memos={memos} editMemo={editMemo} deleteMemo={deleteMemo} />

      </div>
    </div>
  )
}

export default App;