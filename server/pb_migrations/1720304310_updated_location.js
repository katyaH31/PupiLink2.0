/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8d8xckyxnhflkg")

  collection.listRule = "    @request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8d8xckyxnhflkg")

  collection.listRule = null

  return dao.saveCollection(collection)
})
