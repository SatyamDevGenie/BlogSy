// 📦 Imports
import dotenv from 'dotenv'
import express from 'express'
import chalk from 'chalk'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

// 🛣️ Routes
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// ⚙️ Environment Setup
dotenv.config()
connectDB()

const app = express()

// 🛠️ Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// ✅ Serve uploads folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// ✅ API Routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  )
}

// ❌ Error handling
app.use(notFound)
app.use(errorHandler)

// ✅ API Check
app.get('/', (req, res) => {
  res.send('✅ API is running...')
})

// 🚀 Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    chalk.yellowBright(
      `📡 Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
    )
  )
})
