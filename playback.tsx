import React, {useEffect, useRef, useState} from 'react';
import {AppEvents, renderWidget, usePlugin, WidgetLocation} from '@remnote/plugin-sdk';
import {PlaybackController} from './controller.mjs';
import mapping from './trial-map.json';

function Playback() {
  const plugin = usePlugin();
  const [status, setStatus] = useState('');
  const controller = useRef<PlaybackController>();
  useEffect(() => {
    const player = new PlaybackController(mapping, (url: string) => new Audio(url), setStatus);
    controller.current = player;
    let disposed = false, running = false;
    const refresh = async () => {
      if (running || disposed) return;
      running = true;
      try {
        // Cluster widgets update cardId, but their remId and the general queue card
        // can still refer to the cluster's entry card. Resolve the widget card itself.
        const widget = await plugin.widget.getWidgetContext<WidgetLocation.FlashcardUnder>();
        const card = widget?.cardId ? await plugin.card.findOne(widget.cardId) : undefined;
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

