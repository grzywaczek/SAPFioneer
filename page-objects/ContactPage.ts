import { type Locator, Page, expect } from "@playwright/test"

export class ContactPage {
  public readonly page: Page
  public readonly emailInput: Locator
  public readonly submitButton: Locator
  public readonly errorMessage: Locator

  public constructor(page: Page) {
    this.page = page
    this.emailInput = page.frameLocator('iframe[title="Form 0"]').getByLabel("Work email*")
    this.submitButton = page.frameLocator('iframe[title="Form 0"]').getByRole("button", { name: "Submit" })
    this.errorMessage = page.frameLocator('iframe[title="Form 0"]').locator(".hs-error-msg")
  }

  public async typeEmail(email: string): Promise<void> {
    await this.emailInput.fill(email)
  }

  public async verifyErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(text)
  }
}
