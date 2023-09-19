import { useState } from 'react'
import FAB from './components/FAB'
import TransactionsList from './features/transactions/TransactionsList'
import Modal from './components/Modal'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string>()

  const openModal = (id?: string) => {
    setEditId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='container mx-auto flex-1'>
      <TransactionsList openModal={openModal} />
      <FAB openModal={openModal} />
      {isModalOpen && <Modal editId={editId} closeModal={closeModal} />}
    </div>
  )
}
