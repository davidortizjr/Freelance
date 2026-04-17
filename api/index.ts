import cors from 'cors'
import express, { type Request, type Response } from 'express'

type IntakePayload = {
    name?: string
    email?: string
    projectType?: string
    budget?: string
    description?: string
}

type ContactPayload = {
    name?: string
    email?: string
    subject?: string
    message?: string
}

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ ok: true })
})

app.post('/api/intake', (req: Request<unknown, unknown, IntakePayload>, res: Response) => {
    const { name, email, projectType, budget, description } = req.body ?? {}

    if (!name || !email || !projectType || !budget || !description) {
        return res.status(400).json({
            ok: false,
            message: 'Missing required fields.',
        })
    }

    // Replace with database/email provider integration before production launch.
    return res.status(200).json({
        ok: true,
        message: 'Intake received successfully.',
        data: {
            name,
            email,
            projectType,
            budget,
            description,
            receivedAt: new Date().toISOString(),
        },
    })
})

app.post('/api/contact', (req: Request<unknown, unknown, ContactPayload>, res: Response) => {
    const { name, email, subject, message } = req.body ?? {}

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            ok: false,
            message: 'Missing required fields.',
        })
    }

    return res.status(200).json({
        ok: true,
        message: 'Contact request received successfully.',
        data: {
            name,
            email,
            subject,
            message,
            receivedAt: new Date().toISOString(),
        },
    })
})

app.use((_req: Request, res: Response) => {
    res.status(404).json({ ok: false, message: 'Not found' })
})

export default function handler(req: Request, res: Response) {
    return app(req, res)
}
