import { MongoClient } from "mongodb";

async function handler(req, res) {
    if(req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://luidimso:El_Loco-13@cluster0.okownu3.mongodb.net/?retryWrites=true&w=majority");

        const db = client.db();

        const collection = db.collection("resenha");

        const result = await collection.insertOne(data)

        console.log(result);

        client.close();

        res.status(201).json({
            message: "Resenha inserted"
        });
    }
}

export default handler;