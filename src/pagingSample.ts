import FarmBeats, { paginate, FarmersList200Response } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farming = FarmBeats(endpoint, new DefaultAzureCredential());
  const response = await farming.path("/farmers").get();

  if (response.status !== "200") {
    throw response.body.error || new Error(`Unexpected status code ${response.status}`);
  }


  const x: FarmersList200Response = response;

  const farmers = paginate(farming, response);

  // Lof each farmer id
  for await (const farmer of farmers) {
    console.log(farmer.id);
  }
}

main().catch(console.error);
