/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6w7usau6mnnp4hn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trkfal1m",
    "name": "read",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6w7usau6mnnp4hn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trkfal1m",
    "name": "readed",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
