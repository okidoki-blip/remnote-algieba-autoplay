export const CONFIG_KEY = 'audio-recordings-v1';
export function validateMapping(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Import a JSON object keyed by card ID.');
  const result = Object.create(null);
  for (const [cardId, record] of Object.entries(value)) {
    if (!cardId || !record || typeof record.remId !== 'string' || !record.remId.trim()) throw new Error('Each card needs a Rem ID.');
    const clean = {remId: record.remId};
    for (const side of ['question', 'answer']) {
      if (typeof record[side] !== 'string') throw new Error('Each card needs question and answer recording URLs.');
      const url = new URL(record[side]);
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use HTTPS recording URLs without embedded credentials.');
      clean[side] = url.href;
    }
    result[cardId] = clean;
  }
  return result;
}
