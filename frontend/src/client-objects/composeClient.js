import { ComposeClient } from "@composedb/client";
import { definition } from "../../../backend/compiled/runtime-composite"
export const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition });
