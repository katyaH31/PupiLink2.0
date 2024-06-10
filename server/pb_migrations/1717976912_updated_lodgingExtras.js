/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lstqsbg8wmoensu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8idmnfvl",
    "name": "satelliteTV",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lstqsbg8wmoensu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8idmnfvl",
    "name": "satellitalTV",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
