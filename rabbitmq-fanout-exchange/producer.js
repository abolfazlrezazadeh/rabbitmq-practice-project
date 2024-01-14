const amqp = require("amqplib");
const exchangeName = "logs";

async function sendMessage() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    channel.publish(
      exchangeName,
      /* routing key is generating random auto */
      "",
      Buffer.from("data from fanout type")
    );
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}
sendMessage();
