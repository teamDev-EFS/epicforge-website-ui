import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';
import { Server as SocketIOServer } from 'socket.io';

import leadsRouter from './routes/leads.public.js';
import settingsPublicRouter from './routes/settings.public.js';

import adminRouter from './routes/admin/index.js';

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: function(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  // eslint-disable-next-line no-console
  console.error('MONGO_URI not set');
  process.exit(1);
}

mongoose.connect(mongoUri, { autoIndex: true }).then(() => {
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}).catch(err => {
  // eslint-disable-next-line no-console
  console.error('MongoDB connection error', err);
  process.exit(1);
});

// Rate limiters for public endpoints
const leadCaptureLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.LEAD_RATE_LIMIT || 30),
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/leads/capture', leadCaptureLimiter);

// Routers
app.use('/api/leads', leadsRouter);
app.use('/api/settings', settingsPublicRouter);
app.use('/api', adminRouter);

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: allowedOrigins.length ? allowedOrigins : '*' }
});

app.set('io', io);

io.on('connection', (socket) => {
  socket.emit('connected', { t: Date.now() });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`LeadOps server listening on :${port}`);
});


