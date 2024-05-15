const prisma = require("./connection.cjs");

async function main() {
  // Location
  await prisma.location.create({
    data: {
      city: "Washington DC",
      state: "District of Columbia",
    }
  })

  // User
  const users = [
    // Alexander
    {
      username: "zander",
      email: "zandervon24@gmail.com",
      firstName: "Alexander",
      lastName: "Linse",
      bio: "I am not a lizard person."
    },
    // Nick
    {
      username: "nico",
      email: "lopez4163@gmail.com",
      firstName: "Nicholas",
      lastName: "Lopez",
      bio: "im a human"
    },
    // Jim
    {
      username: "jimr",
      email: "jim.reinert.ii@gmail.com",
      firstName: "Jim",
      lastName: "Reinert",
      bio: "human enough"
    },
    // Yash
    {
      username: "yashp01",
      email: "steadygaming01@gmail.com",
      firstName: "Yash",
      lastName: "Patel",
      bio: "I drink water lol"
    },
    // Rando
    {
      username: "justAUser",
      email: "idkman@gmail.com",
      firstName: "Jon",
      lastName: "Doe",
      bio: "nothing to see here"
    },
  ]
  let uid = 0; // TODO: use firebase
  for (const user of users) {
    user.isAdmin = true;
    user.uid = ++uid;
    user.location_id = 1;
    await prisma.user.create({ data: user });
  }

  // Review
  for (let c = 1; c <= users.length; c++) {
    for (let f = 1; f <= users.length - 1; f++) {
      if (c === f) continue;
      await prisma.review.create({
        data: {
          star_review: 5,
          client_id: c,
          freelancer_id: f,
        }
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
    services[i].freelancer_id = i + 1;
    await prisma.service.create({ data: services[i] });
  }

  // Availability
  for (let i = 0; i < services.length; i++) {
    await prisma.availability.create({
      data: {
        when_start: new Date(),
        duration_min: 30,
        isRecurring: false,
        service_id: i + 1,
      }
    });
  }

  // Session
  for (let i = 0; i < services.length; i++) {
    await prisma.session.create({
      data: {
        description: `This is session ${i}`,
        when_start: new Date(),
        duration_min: 30,
        status: "active",
        capacity: i + 1,
        service_id: i + 1,
      }
    });
  }

  // Reservation
  for (let i = 0; i < services.length; i++) {
    for (let j = 0; j <= i; j++) {
      await prisma.reservation.create({
        data: {
          status: "joined",
          session_id: i + 1,
          client_id: j + 1,
        }
      });
    }
  }
}

// Checks if file is being run directly vs exported as a module
if (require.main === module) {
  main()
    .then(async () => await prisma.$disconnect())
    .catch(async (error) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    });
}