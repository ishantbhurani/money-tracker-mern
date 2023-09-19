import FAB from './components/FAB'
import TransactionsList from './features/transactions/TransactionsList'

export default function App() {
  return (
    <div className='container mx-auto flex-1'>
      <TransactionsList />
      <FAB />
    </div>
  )
}
