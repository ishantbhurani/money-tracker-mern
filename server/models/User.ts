import type { Model } from 'mongoose'
import { model, Schema } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'

interface UserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>
}

type UserModel = Model<UserType, {}, UserMethods>

const userSchema = new Schema<UserType, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
}

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

export default model<UserType, UserModel>('User', userSchema)
