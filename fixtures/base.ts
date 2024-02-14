import { test as base } from "@playwright/test"
import { HomePage } from "@page-objects/HomePage"

type Fixtures = {
  homePage: HomePage
}
export const test = base.extend<Fixtures>({
  homePage: async ({ page, isMobile }, use) => {
    const homePage = new HomePage(page, isMobile)
    await homePage.goTo()
    await homePage.acceptCookies()
    await use(homePage)
  },
})
