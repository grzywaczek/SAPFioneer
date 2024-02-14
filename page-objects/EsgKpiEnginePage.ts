import { type Locator, Page } from "@playwright/test"

export class EsgKpiEnginePage {
  public readonly page: Page
  public readonly header: Locator

  public constructor(page: Page) {
    this.page = page
    this.header = page.locator("h1")
  }
}
