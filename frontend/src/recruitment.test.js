import test from 'node:test'
import assert from 'node:assert/strict'
import {validateFile,MAX_FILE_SIZE,seedApplications,readApplications,withStatus,defaultQuestions,validApplication,CANDIDATE_ID} from './recruitment.js'
test('CV validation rejects missing, empty, wrong type and oversized files',()=>{
  for(const file of [null,{name:'a.pdf',size:0},{name:'a.exe',size:5},{name:'a.pdf',size:MAX_FILE_SIZE+1}])assert.ok(validateFile(file))
  assert.equal(validateFile({name:'a.PDF',size:MAX_FILE_SIZE}),'')
  assert.equal(validateFile({name:'a.docx',size:123}),'')
})
test('eight initial questions cover three categories',()=>{const q=defaultQuestions();assert.equal(q.length,8);assert.equal(new Set(q.map(x=>x.category)).size,3)})
test('status change appends history without mutating original',()=>{const a=seedApplications()[0];const b=withStatus(a,'do rozmowy','2026-10-21T12:00:00Z');assert.equal(a.history.length,0);assert.deepEqual(b.history,[{status:'do rozmowy',at:'2026-10-21T12:00:00Z'}]);assert.equal(withStatus(b,'do rozmowy'),b);assert.throws(()=>withStatus(b,'unknown'))})
test('stored questions, notes and history roundtrip',()=>{const a=withStatus(seedApplications()[0],'odrzucona');a.notes='Test';a.questions[0].text='Zmienione pytanie';assert.deepEqual(readApplications({getItem:()=>JSON.stringify([a])}).items,[a])})
test('seed profiles are valid and do not belong to candidate demo',()=>{for(const a of seedApplications()){assert.ok(validApplication(a));assert.notEqual(a.candidateId,CANDIDATE_ID)}})
test('empty list stays empty and corrupt data shows warning',()=>{assert.deepEqual(readApplications({getItem:()=> '[]'}).items,[]);for(const raw of ['bad','[null]',JSON.stringify([{...seedApplications()[0],skills:['bad']}])])assert.ok(readApplications({getItem:()=>raw}).warning)})
