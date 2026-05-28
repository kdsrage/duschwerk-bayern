const express = require('express')
const { body, validationResult } = require('express-validator')
const db = require('../models/db')
const { v4: uuidv4 } = require('crypto')

const router = express.Router()

// Generate session ID for anonymous users
function generateSessionId() {
    return `cfg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

// POST /api/configurations — Save a configuration
router.post(
    '/',
    [
        body('serie').isString().notEmpty().withMessage('Serie ist erforderlich'),
        body('einbausituation').isString().notEmpty().withMessage('Einbausituation ist erforderlich'),
        body('breite').isInt({ min: 50, max: 250 }).withMessage('Breite muss zwischen 50 und 250 cm liegen'),
        body('hoehe').isInt({ min: 100, max: 250 }).withMessage('Höhe muss zwischen 100 und 250 cm liegen'),
        body('glastyp').isString().notEmpty(),
        body('glasstaerke').isString().notEmpty(),
        body('profilfarbe').isString().notEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        const {
            serie, einbausituation, tuersystem, breite, hoehe,
            glastyp, glasstaerke, profilfarbe, rahmentyp, sessionId,
        } = req.body

        const sid = sessionId || generateSessionId()

        // Wir fügen dem JSON-Payload einen Zeitstempel und den Disclaimer-Status hinzu
        const enrichedPayload = {
            ...req.body,
            disclaimerAccepted: true,
            legalNotice: "Unverbindliches Modell. Technische Änderungen vorbehalten."
        }

        const stmt = db.prepare(`
      INSERT INTO configurations
        (session_id, serie, einbausituation, tuersystem, breite, hoehe,
         glastyp, glasstaerke, profilfarbe, rahmentyp, config_json, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'saved')
    `)

        const result = stmt.run(
            sid, serie, einbausituation, tuersystem || null,
            breite, hoehe, glastyp, glasstaerke, profilfarbe,
            rahmentyp || null, JSON.stringify(enrichedPayload) // Hier das angereicherte JSON rein
        )

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid,
            sessionId: sid,
            message: 'Konfiguration gespeichert.',
            // Der Text kann hier für das Frontend/E-Mail-System mitgeliefert werden:
            legalDisclaimer: 'Diese Konfiguration stellt ein unverbindliches Modell dar. Maße und Darstellungen sind ohne Gewähr.'
        })
    }
)

// GET /api/configurations/:id — Retrieve a configuration
router.get('/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM configurations WHERE id = ?').get(req.params.id)
    if (!row) {
        return res.status(404).json({ success: false, message: 'Konfiguration nicht gefunden.' })
    }
    res.json({ success: true, configuration: row })
})

module.exports = router