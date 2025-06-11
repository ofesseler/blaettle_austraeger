import { test, expect } from "@playwright/test";
import 'dotenv/config'


test("download blaettle from lokalmatador", async ({ page }) => {
  await page.goto(
    "https://www.nussbaum.de/kiosk/mitteilungsblaetter/amtsblatt-renningen",
  );
  await page.getByTestId("uc-deny-all-button").click();
  await page.getByTestId("web-issue-download-button").click();
  await page.getByRole('button', { name: 'Anmelden oder Konto erstellen' }).click();
  await page.getByPlaceholder("E-Mail-Adresse").fill(process.env.USERNAME as string);
  await page.getByPlaceholder("Passwort").fill(process.env.PASSWORD as string);
  await page.getByRole("button", { name: "Einloggen" }).click();
  await page.getByTestId("ConfirmLocationChangeModal-Component-ignoreButton").click();
  await page.getByTestId('web-issue-download-button').click();

  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("approve-disclaimer-button").click();
  const download = await downloadPromise;
  const dateOfPublication = page.getByText('vom 05. Juni')
  await download.saveAs("./downloads/Mitteilungsblatt " + await dateOfPublication.textContent() + ".pdf");

  await page.close();
});
