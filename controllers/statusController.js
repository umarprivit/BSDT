import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const numbers = [
  "+923190288063",
  // "+923077620176"
];

export async function UpdateStatus(req, res) {
  const { status, number } = req.body;
  const apiKey = process.env.VEEVOTECH_API_KEY;
  const senderNum = "Default";

  if (number) {
    //check for regex that it should must have +92 in start
    const regex = /^\+92\d{10}$/;
    if (!regex.test(number)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }
  }

  // Send SMS to multiple numbers and it can change depending on APIs we are going to use this free API doesnt bulk messaging so thats why i just used one meesage at one time 
  try {
    await Promise.all(
      numbers.map((num) =>
        axios.post("https://api.veevotech.com/v3/sendsms", {
          hash: apiKey,
          receivernum: number || num,
          sendernum: senderNum,
          textmessage: `Status updated: ${status}, Now the Updated Status is ${status}
          `,
        })
      )
    );
    res.status(200).json({ message: "Status updated and SMS sent." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send SMS.", details: error.message });
  }
}
