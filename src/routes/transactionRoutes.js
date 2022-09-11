import Transaction from "../models/transaction";

const getAllTransactions = async (request, reply) => {
  try {
    const transactions = await Transaction.find({});
    reply.code(200).send(transactions);
  } catch (e) {
    reply.code(500).send(e);
  }
};

const createTransaction = async (request, reply) => {
  try {
    const transaction = request.body;
    const newTransaction = await Transaction.create(transaction);
    reply.setHeader("Content-Type", "application/json");
    reply.code(201).send(newTransaction);
  } catch (e) {
    reply.code(500).send(e);
  }
};

export default (app) => {
  app.get("/", (request, reply) => {
    try {
      reply.send("Hello world!");
    } catch (e) {
      console.error(e);
    }
  });

  // create a transaction
  app.post("/api/transactions", createTransaction);

  // get the list of transactions
  app.get("/api/transactions", getAllTransactions);
};

// app.get('/', (request, reply) => {
//   try{
//     reply.send("Hello world!");
//   } catch(e) {
//     console.error(e);
//   }
// })

// export async function get(request, reply) { }
// export async function update(request, reply) { }
// export async function remove(request, reply) { }

// get a single transaction
// app.get('/api/transactions/:id', (request, reply) => {});

// update a transaction
// app.put('/api/transactions/:id', (request, reply) => {});

// delete a transaction
// app.remove('/api/transactions/:id', (request, reply) => {});
