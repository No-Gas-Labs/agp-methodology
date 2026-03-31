const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory state
const state = {
  agp: { status: 'IDLE', uptime: 0, segments: 0 },
  arena: { status: 'READY', consensus: 0, models: 4 },
  ninja: { status: 'IDLE', agents: 0, decisions: 0 },
  defi: { status: 'IDLE', profit: 0, fees: 0 },
};

const logs = [];

// GET status
app.get('/api/status', (req, res) => {
  res.json(state);
});

// POST control commands
app.post('/api/control/:system/:action', (req, res) => {
  const { system, action } = req.params;
  
  if (system === 'agp' && action === 'start') {
    state.agp.status = 'RECORDING';
    state.agp.uptime = 0;
    logs.unshift({ time: new Date().toISOString(), msg: 'AGP START', status: 'success' });
  } else if (system === 'agp' && action === 'stop') {
    state.agp.status = 'IDLE';
    logs.unshift({ time: new Date().toISOString(), msg: 'AGP STOP', status: 'success' });
  } else if (system === 'arena' && action === 'analyze') {
    state.arena.status = 'PROCESSING';
    state.arena.consensus = Math.random() * 0.3 + 0.7;
    logs.unshift({ time: new Date().toISOString(), msg: 'ARENA ANALYZE', status: 'success' });
    setTimeout(() => { state.arena.status = 'READY'; }, 3000);
  } else if (system === 'ninja' && action === 'execute') {
    state.ninja.status = 'EXECUTING';
    state.ninja.agents = Math.floor(Math.random() * 5) + 1;
    state.ninja.decisions = Math.floor(Math.random() * 10) + 1;
    logs.unshift({ time: new Date().toISOString(), msg: 'NINJA EXECUTE', status: 'success' });
    setTimeout(() => { state.ninja.status = 'IDLE'; }, 2000);
  } else if (system === 'defi' && action === 'trade') {
    state.defi.status = 'EXECUTING';
    state.defi.profit = Math.floor(Math.random() * 1000) + 100;
    state.defi.fees = Math.floor(Math.random() * 50) + 10;
    logs.unshift({ time: new Date().toISOString(), msg: 'DEFI TRADE', status: 'success' });
    setTimeout(() => { state.defi.status = 'IDLE'; }, 2000);
  }
  
  res.json({ success: true, state: state[system] });
});

// GET logs
app.get('/api/logs', (req, res) => {
  res.json(logs.slice(0, 50));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AGP Backend running on port ${PORT}`);
});
