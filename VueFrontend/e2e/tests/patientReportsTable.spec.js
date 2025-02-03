import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173';

test.describe('Patient Reports Table Component Tests', () => {
    // Currently each test is running 3 times
    
    test('should display patient report header correctly', async ({ page }) => {
        await page.goto(URL);

        await expect(page.locator('table.reports-table')).toBeVisible();

        const firstRow = page.locator('thead tr').first();
        await expect(firstRow).toContainText('Report ID');
    });

    test('should show ALERT for risky reports', async ({ page }) => {
        await page.goto(URL);

        const alertSpans = await page.locator('span.alert-span').all();

        for (const alert of alertSpans) {
            await expect(alert).toBeVisible();         
            await expect(alert).toHaveText('ALERT'); 
        }
    });
});

