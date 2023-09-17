import { model, Schema, Types } from 'mongoose'

type TransactionWithUserType = TransactionType & {
  user: Types.ObjectId
}

export default model<TransactionWithUserType>(
  'Transaction',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      title: {
        type: String,
        required: true,
      },
      description: String,
      amount: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
)
