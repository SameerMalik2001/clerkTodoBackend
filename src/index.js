import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/DB_Connect.js";
import { GraphResolver } from "./resolver/Resolver.js";
import { GraphSchema } from "./schema/Schema.js";
import { actionByWebhook } from "./controller/Webhook.clerk.js";

dotenv.config({ path: "./env" });
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Apollo Server
const server = new ApolloServer({
	typeDefs: GraphSchema,
	resolvers: GraphResolver,
});

// Start Apollo Server
async function startServer() {
	await server.start(); // Start Apollo Server first

	// Apply Apollo Middleware to Express
	app.use("/graphql", express.json(), expressMiddleware(server));

	// Webhook endpoint
	app.post("/api/webhooks", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    await actionByWebhook(req, res);
  });

	// Start Express Server
	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
		console.log(`⚙️  Server listening on ${PORT}`);
		console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
	});
}

startServer().catch((err) => console.error("Error starting server:", err));



let a = {
  backup_code_enabled: false,
  banned: false,
  create_organization_enabled: true,
  created_at: 1741944058307,
  delete_self_enabled: true,
  email_addresses: [
    {
      created_at: 1741945019849,
      email_address: 'sameer.malik@xcelore.com',
      id: 'idn_2uInaae9ehRiSIoM8PDThe7a8uQ',
      linked_to: [],
      matches_sso_connection: false,
      object: 'email_address',
      reserved: false,
      updated_at: 1741945069645,
      verification: [Object]
    },
    {
      created_at: 1741944016311,
      email_address: 'sameer7417277576@gmail.com',
      id: 'idn_2uIlYVgb7IXmcs5nvkKHjempUWi',
      linked_to: [Array],
      matches_sso_connection: false,
      object: 'email_address',
      reserved: false,
      updated_at: 1741944058329,
      verification: [Object]
    }
  ],
  enterprise_accounts: [],
  external_accounts: [
    {
      approved_scopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
      avatar_url: 'https://lh3.googleusercontent.com/a/ACg8ocIKpvgYxsFH2HO-wAbKn4TiAcK6Xz25ByxhmocArnDUTCr_feq8=s1000-c',
      created_at: 1741944016303,
      email_address: 'sameer7417277576@gmail.com',
      external_account_id: 'eac_2uIlYWw1iWSXzXBM4sqOIjugpcu',
      family_name: 'Malik',
      first_name: 'Sameer',
      given_name: 'Sameer',
      google_id: '112908434364651353512',
      id: 'idn_2uIlYVkCJIz9YbwxLABBuXXyGAw',
      identification_id: 'idn_2uIlYVkCJIz9YbwxLABBuXXyGAw',
      image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJS3B2Z1l4c0ZIMkhPLXdBYktuNFRpQWNLNlh6MjVCeXhobW9jQXJuRFVUQ3JfZmVxOD1zMTAwMC1jIiwicyI6Imk2OFhtTThKaWI1ZXhqZmM3UWgzTlNWZ0tOVG1RN2NCRG5UaVZJZmFIQW8ifQ',
      label: null,
      last_name: 'Malik',
      object: 'google_account',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocIKpvgYxsFH2HO-wAbKn4TiAcK6Xz25ByxhmocArnDUTCr_feq8=s1000-c',
      provider: 'oauth_google',
      provider_user_id: '112908434364651353512',
      public_metadata: {},
      updated_at: 1741944016303,
      username: null,
      verification: [Object]
    }
  ],
  external_id: null,
  first_name: 'Sameer',
  has_image: true,
  id: 'user_2uIldlr4NELXt8gFGOOWt9t0f3M',
  image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydUlsZGs0WHhKY1Y5VGVXdVl1T29XZEhoNTkifQ',
  last_active_at: 1741944058306,
  last_name: 'Malik',
  last_sign_in_at: 1741944058312,
  legal_accepted_at: null,
  locked: false,
  lockout_expires_in_seconds: null,
  mfa_disabled_at: null,
  mfa_enabled_at: null,
  object: 'user',
  passkeys: [],
  password_enabled: false,
  phone_numbers: [
    {
      backup_codes: null,
      created_at: 1741944042768,
      default_second_factor: false,
      id: 'idn_2uIlbk3MDKo1dJQSV9dpwBzMRxB',
      linked_to: [],
      object: 'phone_number',
      phone_number: '+918126172481',
      reserved: false,
      reserved_for_second_factor: false,
      updated_at: 1741944058332,
      verification: [Object]
    }
  ],
  primary_email_address_id: 'idn_2uInaae9ehRiSIoM8PDThe7a8uQ',
  primary_phone_number_id: 'idn_2uIlbk3MDKo1dJQSV9dpwBzMRxB',
  primary_web3_wallet_id: null,
  private_metadata: {},
  profile_image_url: 'https://images.clerk.dev/oauth_google/img_2uIldk4XxJcV9TeWuYuOoWdHh59',
  public_metadata: {},
  saml_accounts: [],
  totp_enabled: false,
  two_factor_enabled: false,
  unsafe_metadata: {},
  updated_at: 1741945143873,
  username: 'samir09',
  verification_attempts_remaining: 100,
  web3_wallets: []
}

// a = {
//   backup_code_enabled: false,
//   banned: false,
//   create_organization_enabled: true,
//   created_at: 1741945797880,
//   delete_self_enabled: true,
//   email_addresses: [
//     {
//       created_at: 1741945756890,
//       email_address: 'sameer.malik@xcelore.com',
//       id: 'idn_2uIp58GETrHNmDcdKhcO5WbbSFJ',
//       linked_to: [],
//       matches_sso_connection: false,
//       object: 'email_address',
//       reserved: false,
//       updated_at: 1741945797888,
//       verification: [Object]
//     }
//   ],
//   enterprise_accounts: [],
//   external_accounts: [],
//   external_id: null,
//   first_name: null,
//   has_image: false,
//   id: 'user_2uIpAMN0wMTG1OHRBC9zDeDh5BE',
//   image_url: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ydE8yT3dNYjJHcWdSZkdUZjJoclhjT0RJREgiLCJyaWQiOiJ1c2VyXzJ1SXBBTU4wd01URzFPSFJCQzl6RGVEaDVCRSJ9',
//   last_active_at: 1741945797879,
//   last_name: null,
//   last_sign_in_at: null,
//   legal_accepted_at: null,
//   locked: false,
//   lockout_expires_in_seconds: null,
//   mfa_disabled_at: null,
//   mfa_enabled_at: null,
//   object: 'user',
//   passkeys: [],
//   password_enabled: true,
//   phone_numbers: [
//     {
//       backup_codes: null,
//       created_at: 1741945756893,
//       default_second_factor: false,
//       id: 'idn_2uIp58ozDQZcJf55HXCGeGE5Mu1',
//       linked_to: [],
//       object: 'phone_number',
//       phone_number: '+918126172481',
//       reserved: false,
//       reserved_for_second_factor: false,
//       updated_at: 1741945797891,
//       verification: [Object]
//     }
//   ],
//   primary_email_address_id: 'idn_2uIp58GETrHNmDcdKhcO5WbbSFJ',
//   primary_phone_number_id: 'idn_2uIp58ozDQZcJf55HXCGeGE5Mu1',
//   primary_web3_wallet_id: null,
//   private_metadata: {},
//   profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
//   public_metadata: {},
//   saml_accounts: [],
//   totp_enabled: false,
//   two_factor_enabled: false,
//   unsafe_metadata: {},
//   updated_at: 1741945797902,
//   username: 'samir0901',
//   verification_attempts_remaining: 100,
//   web3_wallets: []
// }

console.log(a.id, a.username, a.email_addresses[0].email_address, a.first_name, a.last_name, a.image_url, a.phone_numbers[0].phone_number, a.external_accounts?.length);