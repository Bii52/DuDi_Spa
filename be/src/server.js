import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routers from './routes/index.js'
dotenv.config()


const app = express()
app.use(cors())
app.use(json())

app.use('/api', routers)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err))

const PORT = process.env.PORT || 5000
const HOST = 'localhost'
app.listen(PORT, () => console.log(`Server running on port http://${HOST}:${PORT}`))
