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
    {
      uid: "WzsxSqOixobSlnpBQG5CIRf7lqE3",
      username: "zanderstest",
      email: "zanderstest551@gmail.com",
      firstName: "Zander",
      lastName: "Test",
      bio: "Gotta have a long bio here. Need to test longer strings in places where they will likely be longer. I shall be the guinea pig for the good of the website. How long do people usually make their bio's anyway? Beats me.",
      phoneNumber: "0123456789"
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
    // {
    //   username: "DBAquatics",
    //   email: "DBAquatics@gmail.com",
    //   firstName: "Duece",
    //   lastName: "Biggalow",
    //   bio: "I Enjoy cleaning and caring for aquatic life",
    //   phoneNumber: "6564568907"
    // },
    // {
    //   username: "FamiliaMechanics",
    //   email: "familiamotors@gmail.com",
    //   firstName: "Dominic",
    //   lastName: "DToretto",
    //   bio: "Small time familia owned car mechanic",
    //   phoneNumber: "3435672345"
    // },
    // {
    //   username: "Iron Seagale Martial Arts",
    //   email: "IronSeagale@gmail.com",
    //   firstName: "Steven",
    //   lastName: "Segaul",
    //   bio: "Black Belt In Akido and magical arts",
    //   phoneNumber: "7573456578"
    // },

    {
      uid: "6Uao652c9XULzRxPnp0kFrIs9cI2",
      username: "TylerWright Web Course",
      email: "tylerwright@fullstackademy.com",
      firstName: "Tyler",
      lastName: "Wright",
      bio: "Fullstack Academy Teacher - No one codes Pokemon better than me",
      phoneNumber: "1234567890"
    },

    {
      uid: "qlGdqJMmLLNnO7UARi0L7FosWOF3",
      username: "JonathanEleiott Web Course",
      email: "jonathaneleiott@fullstackacademy.com",
      firstName: "Jonathan",
      lastName: "Eleiott",
      bio: "Fullstack Academy Teacher - Building the future, one line of code at a time",
      phoneNumber: "0987654321"
    },

    {
      uid: "RU2Ra7dvMAc4ma4mowGioomadeY2",
      username: "Jayoma Law Firm",
      email: "jayomalawfirm@gmail.com",
      firstName: "Alain",
      lastName: "Jayoma",
      bio: "24/7 Criminal Defense Lawyer, 100% Legal, 100% Professional, Whatever the case maybe, I'll work it",
      phoneNumber: "1111111111",

    },

    {
      uid: "ptmbKaSTZrTi4EXyyjD4wRwsNeB2",
      username: "Jacob's Detailing Inc.",
      email: "jacobdetails@gmail.com",
      firstName: "Jacob",
      lastName: "Tate",
      bio: "Cleaning car is something I've always wanted to do. I'm a big fan of the Detailing industry.",
      phoneNumber: "7777777777",
    },

    {
      uid: "edSzxt8YQmXlGRA1zNFaB2QcHG93",
      username: "Gordon Ramsey",
      email: "gordonramsey@gmail.com",
      firstName: "Gordon",
      lastName: "Ramsey",
      bio: "Your favorite chef on duty.",
      phoneNumber: "7777777777",
    },

    {
      uid: "FTSrWY7oDoQWoiUq2ozPmG2fjPV2",
      username: "AptHero",
      email: "apthero@gmail.com",
      firstName: "Alex",
      lastName: "Miller",
      bio: "Finding your dream apartment just got easier! Let me handle the search, filtering options based on your needs and budget. Stress-free apartment hunting starts here!",
      phoneNumber: "555-111-2233"
    },

    {
      uid: "epXvuFvagjSReoPAJEKRv1EJerb2",
      username: "TaxWhiz",
      email: "taxwhiz@gmail.com",
      firstName: "Susan",
      lastName: "Chen",
      bio: "Certified Public Accountant (CPA) here to help you navigate taxes with ease. I offer tax preparation, filing, and consulting services for individuals and small businesses.",
      phoneNumber: "666-222-3344"
    },

    {
      uid: "Of0E1AAYF7SrqgDVOyQeSZEsEHH2",
      username: "Designify",
      email: "designify@gmail.com",
      firstName: "Michael",
      lastName: "Brown",
      bio: "Bringing your vision to life! I specialize in graphic design services including logo creation, branding materials, social media graphics, and website design.",
      phoneNumber: "777-333-4455"
    },

    {
      uid: "bXl65K2ttRTPAMhvJwwYVqPR2oS2",
      username: "ContentCreator extraordinaire",
      email: "contentcreator@gmail.com",
      firstName: "Emily",
      lastName: "Johnson",
      bio: "Skilled writer and content creator offering captivating blog posts, website content, and social media copy. Let me help you engage your audience and achieve your content marketing goals.",
      phoneNumber: "888-444-5566"
    },

    {
      uid: "sdsfsrFHehhNEqWpX9ROx5RRKEp1",
      username: "VirtualHandyman",
      email: "virtualhandyman@gmail.com",
      firstName: "David",
      lastName: "Garcia",
      bio: "Need help with small tasks around the house or office? I can assist with furniture assembly, handyman services, errands, and more! Free up your time and get things done efficiently.",
      phoneNumber: "999-555-6677"
    },

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
    const location = await prisma.location.create({
      data: {
        city: faker.location.city(),
        state: faker.location.state(),
        street_address: faker.location.streetAddress(),
        zip_code: faker.location.zipCode(),
      },
    })
    user.location_id = location.id;
    await prisma.user.create({ data: user })
  }

  // Review
  for (let c = 1; c <= users.length; c++) {
    // for (let f = 1; f <= users.length - 1; f++) {
    for (let r = 0; r < 3; r++) {
      const f = faker.number.int({max: users.length - 1});
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
      name: "Programming Tutor",
      tags: "#code #computerscience #softwaredeveloper",
      rate: 40,
      rate_time: "hour",
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
  for (let i = services.length; i < users.length; i++) {
    services.push({
      name: faker.word.noun() + " " + faker.word.verb(),
      tags: `#${faker.word.noun()} #${faker.word.noun()} #${faker.word.noun()+faker.word.noun()}"`,
      rate: faker.number.int({ min: 5, max: 300}),
      rate_time: ["minute", "hour", "session"].at(faker.number.int({ max: 2})),
    });
  }
  for (let i = 0; i < services.length; i++) {
    services[i].freelancer_id = i + 1
    await prisma.service.create({ data: services[i] })
  }

  // Availability
  // for (let i = 0; i < services.length; i++) {
  //   await prisma.availability.create({
  //     data: {
  //       when_start: new Date(),
  //       duration_min: 30,
  //       isRecurring: false,
  //       service_id: i + 1,
  //     },
  //   })
  // }

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
        image_url: faker.image.urlLoremFlickr({ category: "birds" }),
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
