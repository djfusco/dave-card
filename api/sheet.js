import { google } from 'googleapis';

//json schema validator
import Ajv from "ajv";
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"},
  },
  required: ["foo"],
  additionalProperties: false,
} 

const data = {
//  foo: 1,
  foo: "1",
  bar: "abc",
}

const validate = ajv.compile(schema)
const valid = validate(data)
///console.log(valid);
///if (!valid) console.log(validate.errors)

  //sample xapi statement
  var objectStatement = {
    "actor": {
        "mbox": "mailto:dave@gmail.com",
        "name": "Dave Fusco",
        "objectType": "Agent"
    },
    "verb": {
        "id": "http://adlnet.gov/expapi/verbs/answered",
        "display": {
            "en-US": "answered"
        }
    },
    "object": {
        "id": "http://adlnet.gov/expapi/activities/example",
        "definition": {
            "name": {
                "en-US": "Example Activity"
            },
            "description": {
                "en-US": "Example activity description"
            }
        },
        "objectType": "Activity"
    }
  };
//end of json schema validator


//Orig - good start here
const auth = new google.auth.GoogleAuth();

const secretKey = {
  "private_key": process.env.private_key.split(String.raw`\n`).join('\n'),
  "client_email": process.env.client_email
}

const jwtClient = new google.auth.JWT(
  secretKey.client_email, null,
  secretKey.private_key,  ['https://www.googleapis.com/auth/spreadsheets']);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    //console.log("Successfully connected!");
  }
 });

const sheets = google.sheets('v4');

export default async function handler(req, res) {
  const search = req.query.search || '';
  let spreadsheetId = '1xjwk2jZZ02eISlckO7NDvNSf4LXPOgPI80OsqP30qtY';
  
  if (search == "display") {
    let sheetRange = 'Sheet1!2:10';
    let results = [];

    sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: sheetRange
    }, function (err, response) {
      if (err) {
          console.log('The API returned an error: ' + err);
      }
      else {
        for (let row of response.data.values) {
          results.push({
            ///"text": row[0],
            ///"modelsrc": row[1],
            ///"image": row[2],
            ///"poster": row[3]
            "xAPIstatement": row[0],
          });
        }
      }
      res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
      res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
      res.json(results);
    });
  }
  else if (search == "insert") {
    sheets.spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      ///range: "Sheet1!A:B", 
      range: "Sheet1!A:B", 
      valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
      resource: {
          ///values: [["Git followers tutorial", "Mia Roberts"]],
          values: [[JSON.stringify(objectStatement)]],
        },
    }, function (err, response) {
      if (err) {
          console.log('The API returned an error: ' + err);
      }
      else {
        //placeholder
      }
      res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
      res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
      res.json(objectStatement);
    });
  }

}