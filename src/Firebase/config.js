const admin = require("firebase-admin")
//make sure you kept serviceAccountKey.json
const serviceAccount = require("./serviceAccountKey.json")

const Firebase = {
  initializeDB: () => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://fir-todos-4f7c6.firebaseio.com"
    })
  },
  db: () => {
    return admin.database();
  }
}

module.exports = Firebase