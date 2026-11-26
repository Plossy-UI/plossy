// Kontrast tokenów kolorów: w każdym stylu i motywie tekst musi mieć co najmniej 4.5:1 do tła (WCAG AA).
// Sprawdza pary zmiennych CSS, więc łapie problem u źródła — zanim trafi do pojedynczych komponentów.
import { expect, test } from '@playwright/test';
import { STYLES, THEMES, open } from './helpers.mjs';

// [kolor tekstu, tło]
const PAIRS = [
  ['text', 'bg'],
  ['text-muted', 'bg'],
  ['text-muted', 'muted'],
  ['text-muted', 'muted-strong'],
  ['text-subtle', 'bg'],
  ['text-subtle', 'surface'],
  ['text-subtle', 'muted'],
  ['on-primary', 'primary'],
  ['primary-text', 'bg'],
  ['primary-text', 'surface'],
  ['primary-text', 'primary-soft'],
  ['on-success', 'success'],
  ['on-warning', 'warning'],
  ['on-danger', 'danger'],
  ['on-info', 'info'],
  ['success-text', 'surface'],
  ['warning-text', 'surface'],
  ['danger-text', 'surface'],
  ['info-text', 'surface'],
  ['success-text', 'success-soft'],
  ['warning-text', 'warning-soft'],
  ['danger-text', 'danger-soft'],
  ['info-text', 'info-soft'],
];

for (const style of STYLES) {
  for (const theme of THEMES) {
    test(`kontrast — ${style} / ${theme}`, async ({ page }) => {
      await open(page, '/docs/elements/leader/', { style, theme });
      const ratios = await page.evaluate((pairs) => {
        const canvas = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        // Kolor tokenu po nałożeniu na podane tło (tokeny bywają półprzezroczyste, np. w stylu glass).
        const paint = (token, under) => {
          const probe = document.createElement('div');
          probe.style.cssText = `position:fixed;background:var(--pl-${token})`;
          document.body.append(probe);
          const color = getComputedStyle(probe).backgroundColor;
          probe.remove();
          canvas.clearRect(0, 0, 1, 1);
          canvas.fillStyle = `rgb(${under.join(',')})`;
          canvas.fillRect(0, 0, 1, 1);
          canvas.fillStyle = color;
          canvas.fillRect(0, 0, 1, 1);
          return [...canvas.getImageData(0, 0, 1, 1).data].slice(0, 3);
        };
        const luminance = (rgb) => {
          const [r, g, b] = rgb.map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const page = paint('bg', [255, 255, 255]);
        return pairs.map(([text, ground]) => {
          const back = ground === 'bg' ? page : paint(ground, page);
          const a = luminance(paint(text, back));
          const b = luminance(back);
          return Number(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2));
        });
      }, PAIRS);
      const failing = PAIRS.map(([text, ground], i) => `${text} na ${ground}: ${ratios[i]}`).filter((_, i) => ratios[i] < 4.5);
      expect(failing, 'pary poniżej 4.5:1').toEqual([]);
    });
  }
}
