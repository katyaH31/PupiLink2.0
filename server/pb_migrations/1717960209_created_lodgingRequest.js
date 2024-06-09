/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ltaxe6ifrwdgcop",
    "created": "2024-06-09 19:10:09.741Z",
    "updated": "2024-06-09 19:10:09.741Z",
    "name": "lodgingRequest",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "deixbnxf",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "SENT",
            "ACCEPTED",
            "REJECTED",
            "ON_EVALUATION"
          ]
        }
      },
      {
        "system": false,
        "id": "dqw6h1iw",
        "name": "proposedPrice",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "kzacf29r",
        "name": "applicant",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "0ricpj4o",
        "name": "lodging",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "jzpljhqlvnpc3k0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("ltaxe6ifrwdgcop");

  return dao.deleteCollection(collection);
})
