import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  try {
    // Conectamos el cliente
    await client.connect();

    // Si en la URI no viene nombre de BD, usa DB_NAME, si no, usa el de la URI
    const uriDB = client.db().databaseName || process.env.DB_NAME;
    db = client.db(uriDB);

    console.log(`✅ MongoDB On Fire 🔥: ${db.databaseName}`);
    return db;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("La base de datos no está conectada. Llama a connectDB() primero.");
  }
  return db;
}
