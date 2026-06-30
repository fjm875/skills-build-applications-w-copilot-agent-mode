const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');

const { createApp } = require('../dist/server.js');

function makeServer(overrides = {}) {
  const app = createApp({
    userModel: {
      find: async () => [{ id: 1, name: 'Ava Patel', email: 'ava@example.com', role: 'admin' }],
    },
    teamModel: {
      find: async () => [{ id: 1, name: 'Momentum Squad', members: 8, focus: 'Endurance' }],
    },
    activityModel: {
      find: async () => [{ id: 1, type: 'run', duration: 32, calories: 320 }],
    },
    leaderboardModel: {
      find: async () => [{ rank: 1, name: 'Ava Patel', points: 980 }],
    },
    workoutModel: {
      find: async () => [{ id: 1, title: 'Morning Mobility', difficulty: 'easy' }],
    },
    ...overrides,
  });

  return createServer(app);
}

async function withServer(server, fn) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    await fn(port);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test('GET /api/health returns the expected health payload', async () => {
  const server = makeServer();
  await withServer(server, async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`, { signal: AbortSignal.timeout(2000) });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(body.message, 'OctoFit Tracker API is running');
  });
});

test('GET /api/users returns seeded user data', async () => {
  const server = makeServer();
  await withServer(server, async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/api/users/`, { signal: AbortSignal.timeout(2000) });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body[0].name, 'Ava Patel');
    assert.equal(body[0].role, 'admin');
  });
});

test('GET /api/teams returns seeded team data', async () => {
  const server = makeServer();
  await withServer(server, async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/api/teams/`, { signal: AbortSignal.timeout(2000) });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body[0].name, 'Momentum Squad');
    assert.equal(body[0].focus, 'Endurance');
  });
});
