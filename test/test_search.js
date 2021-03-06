import { OfflineSearch } from '../lib/offline_search.js';
import '../build/offline_search_wasm.js';

// Search object for this test.
let offlineSearch;

/**
 * Function to initiate and validate a search result.
 */
async function testSearch(mod, term, amount) {
  var result = await mod.search(term);
  console.log(result);
  assert.equal(amount, result.length);
}

// Root hook that returns a promise for initialization.
before(() => {
  offlineSearch = new OfflineSearch(Module());
  return offlineSearch.init();
});

// Async test suite that returns search promises.
describe('OfflineSearch', () => {

  describe('correctly search for a word', () => {
    it('passes', async () => {
      return testSearch(offlineSearch, 'endpoint', 2);
    });
  });

  describe('correctly filters stop words', () => {
    it('passes', async () => {
      return testSearch(offlineSearch, 'the', 0);
    });
  });

  describe('correctly search for a word + stop word', () => {
    it('passes', async () => {
      return testSearch(offlineSearch, 'endpoint the', 2);
    });
  });

  describe('', () => {
    it('frees the data structure without errors', async () => {
      return offlineSearch.free();
    });
  });
    
});
