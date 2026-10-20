import React, {useEffect, useRef, useState} from 'react';
import {AppEvents, renderWidget, usePlugin, WidgetLocation} from '@remnote/plugin-sdk';
import {PlaybackController} from './controller.mjs';

function Playback() {
  const plugin = usePlugin();
  const [status, setStatus] = useState('');
  const controller = useRef<PlaybackController>();
  useEffect(() => {
    const player = new PlaybackController({}, (url: string) => new Audio(url), setStatus);
    controller.current = player;
    let disposed = false, running = false;
    const refresh = async () => {
      if (running || disposed) return;
      running = true;
      try {
        player.mapping = await plugin.storage.getSynced('trial-recordings') || {};
        // Match the SDK's active card ID to private, previously verified configuration.
        // No note-reading permission or public card IDs are needed for this trial.
        const widget = await plugin.widget.getWidgetContext<WidgetLocation.FlashcardUnder>();
        const record = player.mapping[widget?.cardId];
        const card = record ? {_id:widget.cardId,remId:record.remId} : undefined;
        const latest = await plugin.widget.getWidgetContext<WidgetLocation.FlashcardUnder>();
        if (widget?.cardId !== latest?.cardId || widget?.revealed !== latest?.revealed) return;
        const context = {cardId: widget?.cardId, remId: card?.remId, revealed: widget?.revealed};
        if (!disposed) await player.update(context, card);
      } catch { if (!disposed) {player.stop(); setStatus('Waiting for the active card');} }
      finally {running = false;}
    };
    const stop = () => {player.stop(); player.key = null; setStatus('');};
    // Public queue events handle card changes; polling also catches cluster transitions.
    plugin.event.addListener(AppEvents.QueueLoadCard, undefined, refresh);
    plugin.event.addListener(AppEvents.RevealAnswer, undefined, refresh);
    plugin.event.addListener(AppEvents.QueueExit, undefined, stop);
    const timer = setInterval(refresh, 300);
    void refresh();
    return () => {
      disposed = true; clearInterval(timer); player.stop();
      plugin.event.removeListener(AppEvents.QueueLoadCard, undefined, refresh);
      plugin.event.removeListener(AppEvents.RevealAnswer, undefined, refresh);
      plugin.event.removeListener(AppEvents.QueueExit, undefined, stop);
    };
  }, [plugin]);
  if (!status) return null;
  return <button onClick={() => void controller.current?.replay()}
    style={{border:'1px solid #c8ccd3',borderRadius:7,padding:'6px 12px',background:'transparent',color:'inherit',cursor:'pointer'}}>
    🔊 {status}
  </button>;
}
renderWidget(Playback);

