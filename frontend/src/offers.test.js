import test from 'node:test'
import assert from 'node:assert/strict'
import { loadOffers, samples, validateOffer, STORAGE_KEY } from './offers.js'
test('required fields reject whitespace and invalid level', () => {
  assert.deepEqual(Object.keys(validateOffer({title:'  ',description:'\n',must:'\n ',nice:'',level:'Lead'})).sort(), ['description','level','must','title'])
})
test('optional requirements may be empty', () => assert.deepEqual(validateOffer({...samples[0],nice:''}), {}))
test('empty saved list stays empty after deleting all offers', () => assert.deepEqual(loadOffers({getItem: () => '[]'}).offers, []))
test('saved offers survive a storage round trip', () => {
  const data = new Map([[STORAGE_KEY, JSON.stringify([{...samples[0],title:'Zmieniona oferta'}])]])
  assert.equal(loadOffers({getItem: k => data.get(k)}).offers[0].title, 'Zmieniona oferta')
})
for (const raw of ['{broken', '{}', '[null]', JSON.stringify([{...samples[0],title:42}]), JSON.stringify([samples[0],samples[0]])]) {
  test(`invalid stored data recovers safely: ${raw.slice(0,30)}`, () => { const result = loadOffers({getItem: () => raw}); assert.ok(result.warning); assert.equal(result.offers.length,3) })
}
test('blocked storage does not crash the app', () => assert.ok(loadOffers({getItem(){throw Error('Denied')}}).warning))
