import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App'

test('constructor', () => {
  expect.assertions(2)
  
  const app = new App()

  expect(app instanceof App).toBe(true)
  expect(app instanceof FinderApp).toBe(true)
})