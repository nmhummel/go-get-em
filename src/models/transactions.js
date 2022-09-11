import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { faker } from "@faker-js/faker";

const transactionSchema = new Schema({
  payerCompany: { type: String, required: true },
  points: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Transaction = model("transaction", transactionSchema);

// const startingTransactions = {};

let fakePayerCompanyName = faker.company.name({ format: String });
let fakePoints = faker.datatype.number({ min: 0, max: 10000, precision: 0 });
let fakeTimestamp = faker.date.between(
  "2022-01-01T00:00:00.000Z",
  "2022-09-01T00:00:00.000Z"
);

const createStartingTransactions = () => {
  for (let transaction = 0; transaction < 7; transaction++) {
    // Runs 5 times, with values of transaction 0 through 4.
    new Transaction({
      payerCompany: fakePayerCompanyName,
      points: fakePoints,
      timestamp: fakeTimestamp,
    });
  }
};

createStartingTransactions();

export default Transaction;
