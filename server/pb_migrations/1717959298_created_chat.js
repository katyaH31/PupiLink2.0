/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5h1djtqhrfa1mmc",
    "created": "2024-06-09 18:54:58.624Z",
    "updated": "2024-06-09 18:54:58.624Z",
    "name": "chat",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d7fcxp4d",
        "name": "participants",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "p9kg5co0",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5h1djtqhrfa1mmc");

  return dao.deleteCollection(collection);
})
