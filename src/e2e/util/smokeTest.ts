import { faker } from '@faker-js/faker';
import test, { Page } from '@playwright/test';
import { loadTool } from '../setup.js';

export default async function runSmokeTestForTool(page: Page, toolName: string) {
  const tool = await loadTool(page, toolName);

  await test.step('Fill in required fields', async () => {
    const requiredProperties = (tool.inputSchema.required as string[]) ?? [];
    console.log('requiredProperties', requiredProperties);
    for (let property of Object.entries(tool.inputSchema.properties ?? {}).filter(([name]) =>
      requiredProperties.includes(name)
    )) {
      const [name, config] = property as any;

      const input = page.getByPlaceholder(config.description);

      switch (config.type as unknown as string) {
        case 'string':
          if (config.enum) {
            // If it's an enum, select a random value from the enum array
            await input.fill(faker.helpers.arrayElement(config.enum));
          } else if (name.toLowerCase().includes('id')) {
            // Generate a realistic-looking ID
            await input.fill(faker.string.alphanumeric(10));
          } else if (name.toLowerCase().includes('email')) {
            // Generate email if the field name suggests it's an email
            await input.fill(faker.internet.email());
          } else if (name.toLowerCase().includes('date') || name.toLowerCase().includes('time')) {
            // Generate date string if the field name suggests it's a date
            await input.fill(faker.date.recent().toISOString());
          } else if (name.toLowerCase().includes('color')) {
            // Generate color hex code
            await input.fill(faker.color.rgb({ format: 'hex' }));
          } else if (name.toLowerCase().includes('url') || name.toLowerCase().includes('link')) {
            // Generate URL
            await input.fill(faker.internet.url());
          } else {
            // For general string fields
            await input.fill(faker.lorem.sentence());
          }
          break;
        case 'number':
          await input.fill(faker.number.int({ min: 1, max: 100 }).toString());
          break;
        case 'boolean':
          // For boolean inputs, let's use random true/false
          await input.fill(faker.datatype.boolean().toString());
          break;
        case 'array':
          // For array inputs, we'll generate a JSON string with a few items
          const arrayItems = [];
          // Look at array item type and generate appropriate fake data
          if (config.items?.type === 'string') {
            for (let i = 0; i < 3; i++) {
              arrayItems.push(faker.lorem.word());
            }
          } else if (config.items?.type === 'number') {
            for (let i = 0; i < 3; i++) {
              arrayItems.push(faker.number.int(100));
            }
          }
          await input.fill(JSON.stringify(arrayItems));
          break;
        case 'object':
          // For object inputs, generate a simple object with some properties
          const fakeObject = {
            prop1: faker.lorem.word(),
            prop2: faker.number.int(100),
            prop3: faker.datatype.boolean(),
          };
          await input.fill(JSON.stringify(fakeObject));
          break;
        default:
          // For unhandled types, generate a basic string
          await input.fill(faker.lorem.word());
          break;
      }
    }
  });

  await test.step('Execute the tool', async () => {
    await page.getByRole('button', { name: 'Run Tool' }).click();
    await page.getByRole('heading', { name: 'Tool Result: Success' }).isVisible();
    await page.getByRole('heading', { name: 'Error output from MCP server' }).isHidden();
    await page.waitForTimeout(100);
  });
}
