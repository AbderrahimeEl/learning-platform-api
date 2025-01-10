// // Question: Pourquoi créer des services séparés ?
// // Réponse: 

const { connectMongo, getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

async function findOneById(collectionName, id) {
  await connectMongo();
  const db = getDb();
  return db.collection(collectionName).findOne({ _id: new ObjectId(id) });
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
    return result;
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
}

async function updateOneById(collectionName, id, updates) {
  await connectMongo();
  const db = getDb();
  return await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
}

async function deleteOneById(collection, id) {
  await connectMongo();
  const db = getDb();
  if (!id) {
    throw new Error('Invalid ID');
  }
  return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  findOneById,
  findAll,
  insertOne,
  updateOneById,
  deleteOneById,
};