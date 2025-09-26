import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log("📂 MONGO_URI desde .env:", uri);
console.log("📂 DB_NAME desde .env:", dbName);

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// ⚠️ Solo para pruebas, para ver si Vercel recibe las variables

let client;
let db;

export async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Conectado a MongoDB:", dbName);
    return db;
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error("La base de datos no está conectada");
  return db;
}
