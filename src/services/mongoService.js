// // Question: Pourquoi créer des services séparés ?
// // Réponse: 

const { connectMongo, getDb } = require('../config/db');


async function findOneById(collectionName, id) {
  await connectMongo();
  const db = getDb();
  return db.collection(collectionName).findOne({ _id: id });
}

async function findAll(collectionName) {
  await connectMongo();
  const db = getDb();
  return db.collection(collectionName).find({}).toArray();
}

async function insertOne(collectionName, document) {
  try {
    await connectMongo();
    const db = getDb();
    const result = await db.collection(collectionName).insertOne(document);
    
    console.log('Insert Result:', result); 
    return result;
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error; 
  }
}



module.exports = {
  findOneById,
  findAll,
  insertOne,
};