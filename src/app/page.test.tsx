import Home from './page'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  }) as Promise<Response>
)

describe('Home Page', () => {
  it('should render without crashing', async () => {
    const jsx = await Home()
    expect(jsx).toBeDefined()
  })
})