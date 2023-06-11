import { ComposeClient } from "@composedb/client";
import {definition} from "./compiled/runtime-composite.js";

const compose = new ComposeClient({ceramic: "http://localhost:7007", definition});

await compose.executeQuery(`
    mutation CreateNewUser($i: UserInput!) {
       createUser(input: $i) {
        name
        creator
       }
    }
    {
        "i":{
            "name":"TejG",
            "creator":true
        }
    } 
`)

compose.setDID(session.did)