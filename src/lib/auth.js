import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Drivefleet_car_rental");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  secret: process.env.BETTER_AUTH_SECRET ,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
   socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
     cookieCache:{
       enabled: true,
       strategy: "jwt",
       //max 7days
       maxAge: 7 * 24 * 60 * 60,
     }
  },

   plugins: [
        jwt(), 
    ]

});