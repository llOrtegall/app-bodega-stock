import bcrypt from 'bcryptjs'

const BCRYPT_SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
  return hashedPassword
}

export async function comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
  const isValid = await bcrypt.compare(inputPassword, hashedPassword)
  return isValid
}