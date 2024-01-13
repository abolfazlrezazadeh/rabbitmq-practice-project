const amqp = require("amqplib")

async function connectToService1(){
    const queueName = 'service1'
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName,{durable : true})
    channel.sendToQueue(queueName,Buffer.from("hello rabbitMq"))
}

connectToService1()