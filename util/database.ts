import { MongoClient } from 'mongodb'
const url = process.env.NEXTAUTH_DB

let connectDB: Promise<MongoClient>

if (url != null) {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            global._mongoClientPromise = new MongoClient(url).connect()
        }
        connectDB = global._mongoClientPromise
    } else {
        connectDB = new MongoClient(url).connect()
    }
}

export { connectDB }