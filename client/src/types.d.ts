type User = {
  id: string
  name: string
  email: string
}

type Transaction = {
  id: string
  user: string
  title: string
  description?: string
  amount: number
  createdAt: string
}
