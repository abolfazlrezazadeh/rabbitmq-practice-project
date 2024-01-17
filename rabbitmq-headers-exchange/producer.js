const amqp = require("amqplib");
const exchangeName = "headersMessage";
async function sendMessage() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers" /*,{durable : true}*/);
  channel.publish(exchangeName, "", Buffer.from("any message"), {
    headers: {
      author: "abolfazl",
      product: "node.js",
      price: "123456",
      count: "123456",
    },
  });
  setTimeout(() => {
    process.exit(0);
  });
}

sendMessage();
