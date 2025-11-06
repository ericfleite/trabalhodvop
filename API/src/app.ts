import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { json } from 'express'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/users.routes'
import labsRoutes from './routes/labs.routes'
import reservationsRoutes from './routes/reservations.routes'
import { errorHandler } from './middlewares/error.middleware'

const app = express()
app.use(cors())
app.use(json())

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Laboratórios', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    },
    // 🔹 Removendo a exigência global de autenticação
    // security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

// 🔹 Permitir acesso público ao Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true, // mantém token entre testes, se quiser
  }
}))

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/labs', labsRoutes)
app.use('/api/reservations', reservationsRoutes)

app.use(errorHandler)

export default app
