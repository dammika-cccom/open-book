export function highlightText(html: string, keyword: string) {
  if (!keyword || keyword.length < 2) return html;
  
  // Case-insensitive regex that avoids matching text inside HTML tags
  const regex = new RegExp(`(?![^<]*>)${keyword}`, 'gi');
  return html.replace(regex, (match) => `<mark class="bg-gold/40 text-white rounded px-0.5">${match}</mark>`);
}