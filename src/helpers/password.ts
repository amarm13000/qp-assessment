import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export const hashPassword = (password: string) => hashSync(password, genSaltSync())

export const verifyPassword = (password: string, hash: string) => compareSync(password, hash)
