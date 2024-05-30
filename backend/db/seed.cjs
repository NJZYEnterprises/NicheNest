const { faker } = require("@faker-js/faker")
const prisma = require("./connection.cjs")

async function main() {
  // Location
  await prisma.location.create({
    data: {
      city: "Washington DC",
      state: "District of Columbia",
    },
  })

  // User
  const users = [
    
    // Alexander
    {
      uid: "h3NdGZvEXxUJfSNhXpWtEHiTljy2",
      username: "zander",
      email: "zandervon24@gmail.com",
      firstName: "Alexander",
      lastName: "Linse",
      bio: "I am not a lizard person.",
      phoneNumber: "7777777777"
    },
    // Nick
    {
      uid: "Qdwp8MT9cHXprHxoPJWs6Pa47mc2",
      username: "nico",
      email: "lopez4163@gmail.com",
      firstName: "Nicholas",
      lastName: "Lopez",
      bio: "im a human",
      phoneNumber: "7777777777"
    },
    // Jim
    {
      uid: "c1hY9HA290U51LVSaSjoTAJJbDH3",
      username: "jimr",
      email: "jim.reinert.ii@gmail.com",
      firstName: "Jim",
      lastName: "Reinert",
      bio: "human enough",
      phoneNumber: "7777777777"
    },
    // Yash
    {
      username: "yashp01",
      email: "steadygaming01@gmail.com",
      firstName: "Yash",
      lastName: "Patel",
      bio: "I drink water lol",
      phoneNumber: "7777777777"
    },
    // Rando
    {
      username: "justAUser",
      email: "idkman@gmail.com",
      firstName: "Jon",
      lastName: "Doe",
      bio: "nothing to see here",
      phoneNumber: "7777777777"
    },
    //many randos

  ]

  
  let randomUser = {}
  for (let i = 0; i < 10; i++) {
    randomUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      bio: faker.person.bio()
    }
    users.push(randomUser)
  }
  console.log(users)


  let uid = 0 // TODO: use firebase
  for (const user of users) {
    user.isAdmin = true
    if (!user.uid) user.uid = String(++uid);
    user.location_id = 1
    await prisma.user.create({ data: user })
  }

  // Review
  for (let c = 1; c <= users.length; c++) {
    for (let f = 1; f <= users.length - 1; f++) {
      if (c === f) continue
      const star_review = Math.floor(Math.random() * 3) + 3
      await prisma.review.create({
        data: {
          star_review: star_review,
          client_id: c,
          freelancer_id: f,
        },
      })
    }
  }

  // Service
  const services = [
    {
      name: "Dungeon Master",
      tags: "#dnd #ttrpg",
      rate: 40,
      rate_time: "session",
    },
    {
      name: "Lizard cleaner",
      tags: "#reptilian",
      rate: 0.25,
      rate_time: "scale",
    },
    {
      name: "Pet Marriage Counseling",
      tags: "#pet #love",
      rate: 30,
      rate_time: "hour",
    },
    {
      name: "Cat catcher",
      tags: "#pet #stray #animalcontrol",
      rate: 100,
      rate_time: "cat",
    },
  ]
  for (let i = 0; i < services.length; i++) {
    services[i].freelancer_id = i + 1
    await prisma.service.create({ data: services[i] })
  }

  // Availability
  for (let i = 0; i < services.length; i++) {
    await prisma.availability.create({
      data: {
        when_start: new Date(),
        duration_min: 30,
        isRecurring: false,
        service_id: i + 1,
      },
    })
  }

  // Session
  for (let i = 0; i < services.length; i++) {
    await prisma.session.create({
      data: {
        description: `This is session ${i}`,
        when_start: faker.date.between({
          from: "2024-07-01T00:00:00.000Z",
          to: "2025-01-01T00:00:00.000Z",
        }),
        duration_min: 30,
        status: "active",
        capacity: i + 1,
        service_id: i + 1,
      },
    })
  }

  // Reservation
  for (let i = 0; i < services.length; i++) {
    for (let j = 0; j <= i; j++) {
      await prisma.reservation.create({
        data: {
          status: "joined",
          session_id: i + 1,
          client_id: j + 1,
        },
      })
    }
  }

  // Images
  for (let i = 0; i < users.length; i++) {
    await prisma.user_image.create({
      data: {
        image_url: faker.image.urlLoremFlickr({category: "birds"}),
        description: "this is a profile picture",
        isProfile: true,
        when_added: new Date(),
        user_id: i + 1,
      },
    })
  }

  for (let i = 0; i < 3 * users.length; i++) {
    await prisma.user_image.create({
      data: {
        image_url: faker.image.urlLoremFlickr(),
        description: "this is a gallery picture",
        isProfile: false,
        when_added: new Date(),
        user_id: Math.floor(Math.random() * users.length) + 1,
      },
    })
  }
}

// Checks if file is being run directly vs exported as a module
if (require.main === module) {
  main()
    .then(async () => await prisma.$disconnect())
    .catch(async error => {
      console.error(error)
      await prisma.$disconnect()
      process.exit(1)
    })
}
