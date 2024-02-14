import { test } from "@fixtures/base"
import { expect } from "@playwright/test"

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
})
