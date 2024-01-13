const amqp = require("amqplib");

async function connectToService1() {
  const queueName = "service1";
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  channel.sendToQueue(
    queueName,
    Buffer.from("hello rabbitMq"),
    {
      persistent: true,
    } /* presistant = if server is down write the requjests in disk */
  );
  console.log("message send to consumer");
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

for (let index = 0; index < 20; index++) {
  connectToService1();
}
