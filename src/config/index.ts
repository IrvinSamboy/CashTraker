import dotenv from 'dotenv'

dotenv.config()

const config = {
    setupConfig: {
        PORT: process.env.PORT
    }
}

export default config