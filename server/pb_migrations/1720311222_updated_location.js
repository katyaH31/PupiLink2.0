/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8d8xckyxnhflkg")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8d8xckyxnhflkg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_mc0rf17` ON `location` (`zoneId`)"
  ]

  return dao.saveCollection(collection)
})
