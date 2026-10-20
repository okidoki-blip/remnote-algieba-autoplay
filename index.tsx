import {declareIndexPlugin, WidgetLocation} from '@remnote/plugin-sdk';
import reviewCSS from './snippet.css';
declareIndexPlugin(async plugin => {
  await plugin.app.registerCSS('compact-review-audio', reviewCSS);
  await plugin.app.registerWidget('playback', WidgetLocation.FlashcardUnder, {dimensions:{height:48,width:'100%'}});
}, async () => {});
