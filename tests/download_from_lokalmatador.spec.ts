import { test, expect } from "@playwright/test";
import 'dotenv/config'


test("download blaettle from lokalmatador", async ({ page }) => {
  await page.goto("https://www.lokalmatador.de/login/");
  await page.getByTestId("uc-more-button").click();
  await page.getByTestId("uc-save-button").click();
  await page.getByRole("link", { name: "Zum Login" }).click();
  await page.getByPlaceholder("E-Mail-Adresse").fill(process.env.USERNAME as string);
  await page.getByPlaceholder("Passwort").fill(process.env.PASSWORD as string);
  await page.getByRole("button", { name: "Einloggen" }).click();
  await page.goto(
    "https://www.lokalmatador.de/epaper/lokalzeitung/amtsblatt-renningen/",
  );
  await page.locator("#slot-1").click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download" }).click();
  const download = await downloadPromise;
  await download.saveAs("./downloads/" + download.suggestedFilename());

  await page.close();
});
