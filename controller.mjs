export class PlaybackController {
  /** @param {Record<string, {remId:string, question:string, answer:string}>} mapping
   * @param {(url:string)=>HTMLAudioElement} makeAudio
   * @param {(status:string)=>void} onStatus */
  constructor(mapping, makeAudio, onStatus = () => {}) {
    this.mapping = mapping; this.makeAudio = makeAudio; this.onStatus = onStatus;
    this.key = null; this.audio = null; this.generation = 0;
  }
  stop() {
    this.generation++; this.audio?.pause(); this.audio = null;
  }
  async update(context, activeCard) {
    const record = this.mapping[context?.cardId];
    if (!record || context.remId !== record.remId || activeCard?._id !== context.cardId) {
      if (this.key !== null) { this.stop(); this.key = null; this.onStatus(''); }
      return;
    }
    const side = context.revealed ? 'answer' : 'question';
    const key = `${context.cardId}:${side}`;
    if (key === this.key) return;
    this.stop(); this.key = key;
    const generation = this.generation;
    this.audio = this.makeAudio(record[side]);
    this.audio.preload = 'auto';
    try {
      await this.audio.play();
      if (generation === this.generation) this.onStatus(side === 'answer' ? 'Answer audio playing' : 'Question audio playing');
    } catch (error) {
      if (generation === this.generation) this.onStatus(error.name === 'NotAllowedError' ? 'Click to enable audio' : 'Audio unavailable — click to retry');
    }
  }
  async replay() {
    if (!this.audio) return;
    this.audio.currentTime = 0;
    try { await this.audio.play(); this.onStatus('Audio playing'); }
    catch { this.onStatus('Playback blocked — click again to enable audio'); }
  }
}
