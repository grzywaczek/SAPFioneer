import { test } from "@fixtures/base"

test.describe("QA Automation Challenge - recruitment tasks", () => {
  test(`Contact Button is yellow`, async ({ homePage }) => {
    await homePage.verifyContactButtonColor()
  })
})
