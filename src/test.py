from playwright.async_api import async_playwright
import asyncio


async def aadhar():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto('https://myaadhaar.uidai.gov.in/check-aadhaar-validity')
        await page.wait_for_timeout(1000)
        # await page.type('//*[@id="APjFqb"]', 'hoooo')
        # await page.click('//html/body/div[1]/div[3]/form/div[1]/div[1]/div[4]/center/input[1]')
        await page.type('//*[@id="root"]/div/div[3]/div/div/div[1]/div/form/div/div[1]/div/div[1]/div/input', '955427899478')

        cap = input('enter captcha')
        await page.type('//*[@id="root"]/div/div[3]/div/div/div[1]/div/form/div/div[2]/div[1]/div/div/div/input', cap)
        await page.wait_for_timeout(1000)

        await page.click('//*[@id="root"]/div/div[3]/div/div/div[1]/div/form/div/div[3]/div/button')
        await page.wait_for_timeout(100000)

        await browser.close()
