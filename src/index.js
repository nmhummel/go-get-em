import Fastify from "fastify";
import cors from "@fastify/cors";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transactionRoutes";

const app = Fastify({ logger: true });

// handle CORS

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
});

//Parse Content-Type
app.addContentTypeParser("*", (request, payload, done) => {
  let data = "";
  payload.on("data", (chunk) => {
    data += chunk;
  });
  payload.on("end", () => {
    done(null, data);
  });
});

//connect fastify to mongoose
try {
  mongoose.connect("mongodb://localhost:27017/fetch_db");
} catch (e) {
  console.error(e);
}

transactionRoutes(app);

//set application listening on port 3000 of localhost
app
  .listen({ port: 3000 })
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.log("Error starting server:", err);
    process.exit(1);
  });
