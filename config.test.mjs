import test from 'node:test';
import assert from 'node:assert/strict';
import {validateMapping} from './config.mjs';
test('empty configuration is silent and needs no personal defaults',()=>assert.equal(Object.keys(validateMapping({})).length,0));
test('imports arbitrary card counts and strips unrelated data',()=>{
  const result=validateMapping({example:{remId:'example-rem',question:'https://example.com/q.mp3',answer:'https://example.com/a.mp3',extra:'ignored'}});
  assert.equal(result.example.extra,undefined); assert.equal(result.example.remId,'example-rem');
});
test('rejects invalid configuration and unsafe media schemes',()=>{
  for(const value of [null,[],{example:{}},{example:{remId:'r',question:'javascript:alert(1)',answer:'https://example.com/a'}}]) assert.throws(()=>validateMapping(value));
});
