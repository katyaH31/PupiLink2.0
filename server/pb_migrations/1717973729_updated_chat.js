/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5h1djtqhrfa1mmc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a7r04b7o",
    "name": "messages",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6w7usau6mnnp4hn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5h1djtqhrfa1mmc")

  // remove
  collection.schema.removeField("a7r04b7o")

  return dao.saveCollection(collection)
})
