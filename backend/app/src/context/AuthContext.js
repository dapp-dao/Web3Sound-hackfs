import { createContext } from "react";
import {compose} from  '../client-objects/composeClient'
import {client} from '../client-objects/apolloClient'

export const AuthContext = createContext(null);