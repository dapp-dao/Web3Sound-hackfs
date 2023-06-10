import { ComposeClient } from "@composedb/client";
import {definition} from "./compiled/runtime-composite.js";

const compose = new ComposeClient({ceramic: "http://localhost:7007", definition});