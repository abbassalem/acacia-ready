const admin = require('firebase-admin');
const serviceAccount = require("./serviceKey.json");

const json = require("./categories.json");
const data =  JSON.parse(JSON.stringify(json));
const db = process.env.databaseURL;

// console.dir(data);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: db
  });

  
data && Object.keys(data).forEach(key => {
    const parentContent = data[key];
    console.log('Parent Collection to be created:' +key);
    if(Array.isArray(parentContent)) {
        for(i=0; i<parentContent.length;i++){
            let subcontent = parentContent[i];            
            let id = ""+(i+1)+"";
            admin.firestore()
                .collection(key)
                .doc(id).set(subcontent)
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    } else if (typeof parentContent === "object") {
        Object.keys(parentContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(parentContent[docTitle])
                .then((res) => {
                    console.log("success with object");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    } 
});