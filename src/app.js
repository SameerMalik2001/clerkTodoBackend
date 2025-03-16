import express from "express";
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb", extended:true}))
app.use(express.static("public"))



export {app}