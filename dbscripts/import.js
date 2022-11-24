const CATALOGUE_BE_OLD = 'http://catalogueapp:31086'
const RAPP_BE_OLD = 'http://172.28.3.242:2626'
const TRANSLATOR_BE_OLD = 'http://translator:31090/sol006-tmf'
const SM_BE_OLD = 'http://172.28.3.15:32135'
const OSM_BE_OLD = 'https://172.28.3.65:9999'

const CATALOGUE_KEY = '3a18caa4-c41b-4ef4-8cb6-cbcd3845565d'
const RAPP_KEY = 'e5ea7a26-783a-4550-870a-721ea06e5288'
const TRANSLATOR_KEY = 'e7320e4d-c2e8-4a81-93c8-2b1e64bcc2b0'
const SM_KEY = '8ad5ddf8-cfe7-4a22-93cd-1b0c265f3fbc'
const OSM_KEY = 'cf9618f9-658e-49bc-b2da-ef49531e0920'

conn = new Mongo(connStr)
db = conn.getDB('gravitee')
print(JSON.stringify(db))
db.keys.update({key: CATALOGUE_KEY}, {$set: {key: XRM_DISCOVERY_API_KEY}})
db.keys.update({key: RAPP_KEY}, {$set: {key: RAPP_DISCOVERY_API_KEY}})
db.keys.update({key: TRANSLATOR_KEY}, {$set: {key: XRM_TRANSLATOR_API_KEY}})
db.keys.update({key: SM_KEY}, {$set: {key: SLICE_DISCOVERY_API_KEY}})
db.keys.update({key: OSM_KEY}, {$set: {key: OSM_API_KEY}})

db.apis.find({name:'5G-CatalogueAPI'}).forEach(function(obj) {obj.definition = obj.definition.replace(CATALOGUE_BE_OLD, CATALOGUE_BE); db.apis.save(obj)})
db.apis.find({name:'osmAPI'}).forEach(function(obj) {obj.definition = obj.definition.replace(OSM_BE_OLD, OSM_BE); db.apis.save(obj)})
db.apis.find({name:'rAPP-API'}).forEach(function(obj) {obj.definition = obj.definition.replace(RAPP_BE_OLD, RAPP_BE); db.apis.save(obj)})
db.apis.find({name:'sliceManagerAPI'}).forEach(function(obj) {obj.definition = obj.definition.replace(SM_BE_OLD, SM_BE); db.apis.save(obj)})
db.apis.find({name:'TranslatorAPI'}).forEach(function(obj) {obj.definition = obj.definition.replace(TRANSLATOR_BE_OLD, TRANSLATOR_BE); db.apis.save(obj)})
