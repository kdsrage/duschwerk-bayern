require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { generalLimiter } = require('./middleware/rateLimiter')

const app = express()
const PORT = process.env.PORT || 3001

// --- CORS ---
// Erlaubt deinem Deploy-Now-Frontend den Zugriff auf dieses VPS-Backend
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())

app.use(cors({
  origin(origin, callback) {
    // Erlaubt Anfragen ohne Origin (z. B. Postman/Server-zu-Server) im Development-Modus
    if (!origin || process.env.NODE_ENV !== 'production') return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS policy: origin ${origin} not allowed`))
  },
  credentials: true,
}))

// --- Body parsing ---
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true, limit: '50kb' }))

// --- General rate limiting ---
// Schützt alle darauffolgenden /api Routen vor Spam
app.use('/api', generalLimiter)

// --- API-Routes ---
app.use('/api/contact', require('./routes/contact'))
app.use('/api/leads', require('./routes/leads'))
app.use('/api/configurations', require('./routes/configurations'))

// Health check (Wichtig für den Verbindungstest)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// --- 404 für unbekannte API-Routen ---
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route nicht gefunden.' })
})

// --- Catch-All für alle anderen Anfragen ---
// Da das Frontend auf Deploy Now liegt, fangen wir hier falsche Aufrufe auf dem VPS ab
app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Duschwerk Bayern API Server - Pfad nicht vorhanden.' })
})

// --- Global error handler ---
app.use((err, req, res, _next) => {
  console.error('[Server] Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Interner Serverfehler.' })
})

app.listen(PORT, () => {
  console.log(`\n✓ Duschwerk Bayern Backend läuft auf http://localhost:${PORT}`)
  console.log(`  Health: https://api.duschwerk-bayern.de/api/health`)
  console.log(`  Env: ${process.env.NODE_ENV || 'development'}\n`)
})

module.exports = app