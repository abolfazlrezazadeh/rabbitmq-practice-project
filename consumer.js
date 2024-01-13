const amqp = require("amqplib")

async function receiveFromProducer(){
    const queueName = 'service1'
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName,{durable : true})
    channel.consume(queueName,message => console.log(message.content.toString()))
}

receiveFromProducer()