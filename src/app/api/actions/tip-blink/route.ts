import { ActionGetResponse, ActionPostResponse } from "@solana/actions";
import { serialize } from "wagmi";
import { parseEther } from "viem";

// CAIP-2 format for the current chain
const blockchain = `eip155:${process.env.NEXT_PUBLIC_CHAIN_ID}`;

// Wallet address that will receive the tips
const donationWallet = process.env.NEXT_PUBLIC_DONATION_WALLET!;

// Create headers with CAIP blockchain ID
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-blockchain-ids, x-action-version",
  "Access-Control-Expose-Headers": "x-blockchain-ids, x-action-version",
  "Content-Type": "application/json",
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

// OPTIONS endpoint is required for CORS preflight requests
// Your Blink won't render if you don't add this
export const OPTIONS = async () => {
  return new Response(null, { headers });
};

// GET endpoint returns the Blink metadata (JSON) and UI configuration
export const GET = async (req: Request) => {
  const tokenSymbol = process.env.NEXT_PUBLIC_TOKEN_SYMBOL!;
  const chainDisplayName = process.env.NEXT_PUBLIC_CHAIN_DISPLAY_NAME!;

  // This JSON is used to render the Blink UI
  const response: ActionGetResponse = {
    type: "action",
    icon: `${new URL(`/blink-image.png`, req.url).toString()}`,
    label: `1 ${tokenSymbol}`,
    title: `Tip $${tokenSymbol}, support Open Source`,
    description:
      `Support wevm, creators of wagmi and viem, by tipping them $${tokenSymbol} on the ${chainDisplayName}. Choose recommended amount, or provide a custom amount.`,
    // Links is used if you have multiple actions or if you need more than one params
    links: {
      actions: [
        {
          // Defines this as a blockchain transaction
          type: "transaction",
          label: `0.01 ${tokenSymbol}`,
          // This is the endpoint for the POST request
          href: `/api/actions/tip-blink?amount=0.01`,
        },
        {
          type: "transaction",
          label: `0.05 ${tokenSymbol}`,
          href: `/api/actions/tip-blink?amount=0.05`,
        },
        {
          type: "transaction",
          label: `0.1 ${tokenSymbol}`,
          href: `/api/actions/tip-blink?amount=0.1`,
        },
        {
          // Example for a custom input field
          type: "transaction",
          href: `/api/actions/tip-blink?amount={amount}`,
          label: "Donate",
          parameters: [
            {
              name: "amount",
              label: `Enter a custom ${tokenSymbol} amount`,
              type: "number",
            },
          ],
        },
      ],
    },
  };

  // Return the response with proper headers
  return new Response(JSON.stringify(response), {
    status: 200,
    headers,
  });
};

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // Extract amount from URL
    const url = new URL(req.url);
    const amount = url.searchParams.get("amount");

    if (!amount) {
      throw new Error("Amount is required");
    }

    // Build the transaction
    const transaction = {
      to: donationWallet,
      value: parseEther(amount).toString(),
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
    };

    const transactionJson = serialize(transaction);

    // Build ActionPostResponse
    const response: ActionPostResponse = {
      type: "transaction",
      transaction: transactionJson,
      message: "Your tip has been sent!",
    };

    // Return the response with proper headers
    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};