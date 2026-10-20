import test from 'node:test';
import assert from 'node:assert/strict';
import {PlaybackController} from './controller.mjs';
const mapping={card1:{remId:'rem1',question:'q1',answer:'a1'},card2:{remId:'rem2',question:'q2',answer:'a2'}};
function fixture(blocked=false){
  const log=[], statuses=[];
  const player=new PlaybackController(mapping,url=>({url,currentTime:0,pause(){log.push(['stop',url]);},async play(){log.push(['play',url]);if(blocked)throw Object.assign(new Error(),{name:'NotAllowedError'});}}),s=>statuses.push(s));
  return {player,log,statuses};
}
test('plays once per side, stops question on reveal, stops answer on next card',async()=>{
  const {player,log}=fixture();const front={cardId:'card1',remId:'rem1',revealed:false};
  await player.update(front,{_id:'card1'});await player.update(front,{_id:'card1'});
  await player.update({...front,revealed:true},{_id:'card1'});
  await player.update({cardId:'card2',remId:'rem2',revealed:false},{_id:'card2'});
  assert.deepEqual(log,[['play','q1'],['stop','q1'],['play','a1'],['stop','a1'],['play','q2']]);
});
test('unrelated cards and stale cluster context cannot speak',async()=>{
  const {player,log}=fixture();
  await player.update({cardId:'card1',remId:'rem1',revealed:false},{_id:'card2'});
  await player.update({cardId:'other',remId:'rem1',revealed:true},{_id:'other'});
  await player.update({cardId:'card1',remId:'wrong',revealed:true},{_id:'card1'});
  assert.deepEqual(log,[]);
});
test('blocked autoplay offers user gesture instead of repeatedly retrying',async()=>{
  const {player,log,statuses}=fixture(true);const front={cardId:'card1',remId:'rem1',revealed:false};
  await player.update(front,{_id:'card1'});await player.update(front,{_id:'card1'});
  assert.deepEqual(log,[['play','q1']]);assert.equal(statuses.at(-1),'Click to enable audio');
});
test('exit or unrelated card stops playing audio',async()=>{
  const {player,log}=fixture();
  await player.update({cardId:'card1',remId:'rem1',revealed:false},{_id:'card1'});
  await player.update(undefined,undefined);
  assert.deepEqual(log,[['play','q1'],['stop','q1']]);
});
