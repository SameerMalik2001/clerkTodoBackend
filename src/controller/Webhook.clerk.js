import { Webhook } from "svix";
import { addUser, deleteUser, updateUser } from "./user.controller.js";

const USER_UPDATE = "user.updated";
const USER_DELETE = "user.deleted";
const USER_CREATE = "user.created";

async function retryOperation(evt, maxRetries = 3) {
  let attempts = 0;
  while (attempts < maxRetries) {
      try {
        const {id, username, email_addresses, first_name, last_name, image_url,phone_numbers } = evt.data;
        let Emails = []
        email_addresses?.map((item) => {
          Emails.push(item.email_address)
        })
        let Numbers = []
        phone_numbers?.map((item) => {
          Numbers.push(item.phone_number)
        })
        console.log(evt.type, id);
        if(evt.type === USER_UPDATE) {
          await updateUser(id, first_name, last_name, Numbers, Emails, image_url, username)
        } else if(evt.type === USER_DELETE) {
          await deleteUser(id)
        } else if(evt.type === USER_CREATE) {
          await addUser(username, first_name, last_name, Numbers, Emails, image_url, id)
        }
        return
      } catch (error) {
          attempts++;
          console.error(`Attempt ${attempts} failed: ${error.message}`);
          if (attempts === maxRetries) throw error;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Retry after 2 sec
      }
  }
}

export const actionByWebhook = async (req, res) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    console.error("❌ Error: Missing SIGNING_SECRET in .env");
    return res.status(500).json({ success: false, message: "Server misconfiguration" });
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headers = req.headers;
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Error: Missing Svix headers");
    return res.status(400).json({ success: false, message: "Missing webhook headers" });
  }

  let evt;
  try {
    evt = wh.verify(JSON.stringify(req.body), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ success: false, message: "Invalid webhook signature" });
  }
  
  try {
    await retryOperation(evt)
  } catch (error) {
    console.error("❌ Webhook processing failed after retries:", err.message);
    return res.status(500).json({ success: false, message: "Webhook processing failed" }); // Clerk will retry
  }
  
  return res.status(200).json({ success: true, message: "Webhook processed" });
}