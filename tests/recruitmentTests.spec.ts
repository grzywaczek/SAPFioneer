import { test } from "@fixtures/base"
import { expect } from "@playwright/test"
import { userIncorrectEmail } from "@support/testData"

test.describe("QA Automation Challenge - recruitment tasks", () => {
  test(`Contact Button is yellow`, async ({ homePage }) => {
    await homePage.verifyContactButtonColor()
  })

  test(`Given user when click on 'ESG KPI Engine' then is redirected to page with info about project.`, async ({
    page,
    homePage,
  }) => {
    const financialPage = await homePage.goToFinancePage()
    await expect(page).toHaveURL("/finance-esg/esg-kpi-engine/")
    await expect(financialPage.header).toContainText("Master ESG KPI management")
  })

  test(`Given user when fill invalid email then validation message appear.`, async ({ homePage, page }) => {
    const { email } = userIncorrectEmail()

    const contactPage = await homePage.goToContactPage()
    await expect(page).toHaveURL("/contact/")
    await contactPage.typeEmail(email)
    await contactPage.verifyErrorMessage("Email must be formatted correctly.")
  })
})
