import { faker } from "@faker-js/faker"

export interface UserIncorrectEmail {
  email: string
}

export const userIncorrectEmail = (): UserIncorrectEmail => {
  return {
    email: faker.string.alphanumeric(10),
  }
}
