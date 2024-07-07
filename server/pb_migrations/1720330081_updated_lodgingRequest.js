/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltaxe6ifrwdgcop")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_qb9EnMk` ON `lodgingRequest` (\n  `applicant`,\n  `lodging`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltaxe6ifrwdgcop")

  collection.indexes = []

  return dao.saveCollection(collection)
})
