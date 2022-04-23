// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // endpoint: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyDP4C4jNSGTIHl5xPzR64qTYVS14ADb8WI",
    authDomain: "order-acacia.firebaseapp.com",
    projectId: "order-acacia",
    storageBucket: "order-acacia.appspot.com",
    messagingSenderId: "1095926620164",
    appId: "1:1095926620164:web:6a3517347668dbcb845551"
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
