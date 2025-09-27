// src/db.js
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

export async function connectDB() {
  if (db) return db;

  if (!uri) throw new Error("MONGO_URI no está definido");
  if (!dbName) throw new Error("DB_NAME no está definido");

  client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 20000, // feedback más rápido
    retryWrites: true,
  });

  try {
    await client.connect();
    // ping rápido para confirmar conectividad TLS/DNS/auth
    await client.db("admin").command({ ping: 1 });
    db = client.db(dbName);
    console.log("✅ Conectado a MongoDB:", db.databaseName);
    return db;
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err?.message || err);
    throw err;
  }
}

export function getDB() {
  if (!db) throw new Error("La base de datos no está conectada");
  return db;
}
