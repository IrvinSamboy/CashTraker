import dotenv from 'dotenv'

dotenv.config()

const config = {
    setupConfig: {
        PORT: process.env.PORT || 3000,
        DB_URL: process.env.DB_URL || ''
    }
}

export default config