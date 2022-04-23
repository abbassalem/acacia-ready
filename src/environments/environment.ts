// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // endpoint: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyAkhZZSPNGgb-a1o3pWGE0Bi7vLLk35VHM",
    authDomain: "acacia-ready.firebaseapp.com",
    projectId: "acacia-ready",
    storageBucket: "acacia-ready.appspot.com",
    messagingSenderId: "465010542685",
    appId: "1:465010542685:web:f0df541e998ef0dd8c25b4",
    measurementId: "G-TXRLTZ4K9F",
    databaseURL: "https://acacia-ready-default-rtdb.europe-west1.firebasedatabase.app/"
  },


    "deliveryTimes": [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00"
    ],
    "addresses": [
      {
        "name": "Marie-Christine",
        "street": "Rue Marie-Christine 201",
        "postCode": "1020",
        "city": "Brussels"
      },
      {
        "name": "Roi Boudouin",
        "street": "Rue des citronniers",
        "postCode": "1020",
        "city": "Brussels"
      }
    ]  
};



/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
