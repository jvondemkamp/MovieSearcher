import express from 'express'
import cors from 'cors'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'saved-movies.json')
const PORT = 3001

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

async function readData() {
  if (!existsSync(DATA_FILE)) return []
  try {
    return JSON.parse(await readFile(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

app.get('/api/saved', async (req, res) => {
  const movies = await readData()
  res.json(movies)
})

app.post('/api/saved', async (req, res) => {
  const { movie, note } = req.body
  if (!movie || !movie.imdbID) {
    return res.status(400).json({ error: 'Invalid movie data.' })
  }
  const movies = await readData()
  if (movies.some(m => m.imdbID === movie.imdbID)) {
    return res.status(409).json({ error: 'Movie already saved.' })
  }
  const entry = { ...movie, note: note || '', savedAt: new Date().toISOString() }
  movies.push(entry)
  await writeData(movies)
  res.status(201).json(entry)
})

app.delete('/api/saved/:imdbID', async (req, res) => {
  const { imdbID } = req.params
  const movies = await readData()
  await writeData(movies.filter(m => m.imdbID !== imdbID))
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
