import {declareIndexPlugin, WidgetLocation} from '@remnote/plugin-sdk';
import reviewCSS from './snippet.css';

declareIndexPlugin(async plugin => {
  await plugin.app.registerCSS('compact-review-audio', reviewCSS);
  await plugin.app.registerWidget('playback', WidgetLocation.FlashcardUnder, {dimensions:{height:48,width:'100%'}});
  await plugin.app.registerCommand({id:'configure-recordings', name:'Configure Algieba trial recordings', quickCode:'algieba', action:async()=>{await plugin.widget.openPopup('setup');}});
  if (!await plugin.storage.getSynced('trial-recordings')) await plugin.widget.openPopup('setup');
}, async () => {});
