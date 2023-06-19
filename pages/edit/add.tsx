// pages/edit/add.tsx

import { useState, useEffect } from 'react'
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore'
import { initializeApp,FirebaseApp } from 'firebase/app'
import MemoForm from '../../components/MemoForm'
import { Memo } from '../../types/memo'



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


  const addMemo = async (text: string) => {
    try {
      const formattedText = text.replace(/\n/g, '<br>')
      await addDoc(collection(db, 'memos'), {
        text: formattedText,
        date: new Date().getTime(),
      })
    } catch (error) {
      console.error('Error adding memo:', error)
    }
  }



  return (
    <div className='bg-gray-100 py-4 min-h-screen'>

      <div className='max-w-screen-md rounded-xl bg-white w-[96%] m-[auto] block px-4 py-8 font-medium text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
        <MemoForm addMemo={addMemo} />
      </div>
    </div>
  )
}

export default App;