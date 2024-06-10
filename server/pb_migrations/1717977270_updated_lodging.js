/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzpljhqlvnpc3k0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9cqmiyky",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "APARTMENT",
        "STUDIO",
        "HOUSE",
        "ROOM",
        "STUDENT_RESIDENCE"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzpljhqlvnpc3k0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9cqmiyky",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "APARTMENT",
        "STUDIO",
        "HOUSE",
        "ROOM",
        "STUDENT_RESIDANCE"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
