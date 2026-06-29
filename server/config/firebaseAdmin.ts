// var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");

import * as admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin";
import serviceAccount from "./auth-project-2209-firebase-adminsdk-fbsvc-3fab15c57f.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export default admin;