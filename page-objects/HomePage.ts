import { ContactPage } from "@page-objects/ContactPage"
import { EsgKpiEnginePage } from "@page-objects/EsgKpiEnginePage"
import { type Locator, type Page, expect } from "@playwright/test"

export class HomePage {
  public readonly page: Page
  public readonly isMobile: boolean | undefined
  public readonly topMenu: Locator
  public readonly getInTouchButton: Locator
  public readonly cookiesInfo: Locator
  public readonly acceptCookiesButton: Locator
  public readonly hamburgerMenuIcon: Locator

  public constructor(page: Page, isMobile?: boolean) {
    this.page = page
    this.isMobile = isMobile
    this.topMenu = page.locator("#header")
    this.getInTouchButton = page.locator("a[href='/contact']")
    this.cookiesInfo = page.locator(".flatsome-cookies")
    this.acceptCookiesButton = page.locator(".flatsome-cookies").getByRole("link", { name: "Accept" })
    this.hamburgerMenuIcon = page.locator(".icon-menu")
  }

  public async goTo(): Promise<void> {
    await this.page.goto("/")
  }

  public async verifyContactButtonColor(): Promise<void> {
    const buttons = await this.page.getByRole("link", { name: "Get in touch" }).all()
    for (const button of buttons) {
      await expect(button).toHaveCSS("background-color", "rgb(255, 212, 60)")
    }
    if (this.isMobile) {
      return await this.verifyContactButtonMobile()
    }
  }

  private async verifyContactButtonMobile(): Promise<void> {
    await this.hamburgerMenuIcon.click()
    const sidebarButton = this.page.locator("#main-menu").getByRole("link", { name: "Get in touch" })
    await expect(sidebarButton).toHaveCSS("background-color", "rgb(255, 212, 60)")
  }

  public async goToFinancePage(): Promise<EsgKpiEnginePage> {
    if (this.isMobile) {
      await this.hamburgerMenuIcon.click()
      await this.page.locator("#main-menu").getByRole("link", { name: "Finance & ESG" }).first().click()
    } else {
      await this.page.locator(".header-nav").getByRole("link", { name: "Finance & ESG" }).hover()
    }
    await this.page.getByRole("link", { name: "ESG KPI Engine" }).click()
    return new EsgKpiEnginePage(this.page)
  }

  public async goToContactPage(): Promise<ContactPage> {
    await this.getInTouchButton.click()
    return new ContactPage(this.page)
  }

  public async acceptCookies(): Promise<void> {
    await this.acceptCookiesButton.click()
    await expect(this.cookiesInfo).toHaveClass(/flatsome-cookies--inactive/)
  }
}
