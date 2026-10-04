// Non-translated extras for the About page. Text lives in messages/<locale>.json → about.

// Optional link per item, by section and item index. `null` hides the link.
export const aboutLinks: Partial<Record<'career' | 'education' | 'awards' | 'activities' | 'military', (string | null)[]>> = {
  activities: ['https://www.chosun.com/site/data/html_dir/2017/09/18/2017091802808.html'], // Chosun Ilbo column
};
