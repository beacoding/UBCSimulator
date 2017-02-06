module.exports = {
    0: {
      prompt: 'You just started the school year with a 2.50 GPA',
      img: 'tanya',
      choices: [{
        reply: 'Awesome',
        val: [0, 0],
      }, {
        reply: 'Sweet',
        val: [0, 0]
      }]
    },
    1: {
      prompt: "Should you get health insurance? You'll have to miss school for 5 days to pay for it",
      img: 'roySales',
      choices: [{
        reply: 'Yes',
        val: [-15, 10],
        consequence: 'You ran out of money cause insurance cost too much and you missed school'
      }, {
        reply: 'No',
        val: [0, -50],
        consequence: 'You missed 3 days of school due to pneumonia.'
      }]
    },
    3: {
      prompt: 'You cannot get into a course. Should you use AnEyeOut?',
      img: 'designer01',
      choices:
        [{
          reply: 'Yes',
          val: [30, 30],
          prompt: 'AnEyeout got into your Course!',
          img: 'designer01',
          choices: [{
            reply: 'Awesome',
            val: [50, 20]
          }]
        },
        {
          reply: 'No',
          val: [10, -50],
          consequence: "Woops. You couldn't get into your course. So you now have to drop out of school"
        }]
    },
    4: {
      prompt: 'Do you think Chris is buff?',
      img: 'rapper02',
      choices:
        [{
          reply: 'Eh I guess',
          val: [-10, -5],
          consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
        },
        {
          reply: 'Damn Right',
          val: [-10, -5],
          consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
        }
        ]
    },
    5: {
        prompt: 'Gregor caught you talking in class.',
        img: 'designer02',
        choices:
          [{
            reply: "It wasn't me",
            val: [-40, -5],
            consequence: 'Gregor calls you out in class and stares you down that you never want to go to school again'
          },
          {
            reply: 'Slide down your desk',
            val: [-40, -5],
            consequence: 'Gregor still caught you'
          }
          ]
    },
    6: {
      prompt: 'Gateman asks you to buy his textbook',
      img: 'roySales',
      choices:
        [{
          reply: 'Cave in',
          val: [20, -10],
          consequence: 'You ran out of money.',
          prompt: "You found a golden ticket in Gateman's textbook!",
          img: 'roySales',
          choices: [{
            reply: 'Awesome',
            val: [50, 20]
          },{
            reply: 'Quit School',
            val: [-100, -20],
            consequence: 'You dropped out of school.',
            prompt: ["You founded a successful company"],
            img: 'roySales',
            choices: [{
              reply: 'Awesome',
              val: [0, 100]
            }]
          }]
        },
        {
          reply: 'Torrent it',
          val: [0, 0]
        }]
    },
    7: {
      prompt: 'A Sauder student comes by to pitch you an idea for a new startup that is like yelp but for dating',
      img: 'rapper02',
      choices:
      [{
        reply: "Keep on walking and pretend you didn't hear",
        val: [20, -40],
        consequence: "The Sauder kid ran a marketing campaign to defame you"
      }, {
        reply: 'When do we start?',
        consequence: "Yelp but for Dating was a disaster",
        val: [-30, -10]
      }]
    },
    8: {
      prompt: "You have a study break and you want to go out for lunch. Who do you ask?",
      img: 'rapper02',
      choices:
      [{
        reply: "The hottest person in your class",
        val: [0, 40],
        img: 'designer01',
        prompt: 'The hottest person in your class accepted your date',
        choices: [{
          reply: "Skip studying for your midterm",
          val: [0, 50],
          img: 'designer01',
          prompt: "You failed your midterm",
          choices: [{
            reply: "Cry",
            val: [-50, -10]
          }]
        }, {
          reply: "School is lyf",
          consequence: "You have no more friends",
          val: [50, -20]
        }]
      }, {
        reply: "No one because you have no friends",
        consequence: "You have no more friends",
        val: [0, -10],
      }]
    },
    9: {
      prompt: "You are running late for class but you catch a dying squirrel in the corner of your eye",
      img: 'assistant',
      choices:
      [{
        reply: "Survival of the fittest and walk away",
        val: [0, -30],
        prompt: "Turned out that squirrel survived and attacks you for abandoning it",
        img: 'assistant',
        choices: [{
          reply: "Beg for forgiveness",
          val: [0, 5]
        }, {
          reply: "Kick it",
          val: [0, 10]
        }]
      }, {
        reply: "Take it out of its misery",
        val: [-20, -20],
        prompt: "The Ubyssey ran an article branding you a squirrel murderer",
        img: 'assistant',
        choices: [{
          reply: "Wasn't me",
          consequence: "The mass mob murdered you",
          val: [-10, -40]
        }, {
          reply: "Write a facebook post and apologize",
          consequence: "You spent too much time writing your facebook post and ignored your grades",
          val: [-30, 5]
        }
        ]
      }]
    },
    10: {
      prompt: "Everybody is trying to recruit you to their sorority and fraternities",
      img: 'roySales',
      choices:
      [{
        reply: 'Alpha Phi is for me',
        val: [10, 20],
      }, {
        reply: 'Are there any LAN parties?',
        val: [20, 10],
      }]
    },
    11: {
      prompt: "You decide to line up at Tim Hortons at 3:50 PM",
      img: 'rapper03',
      choices:
      [{
        reply: 'Waste my time 2017',
        consequence: "You wasted your time now 2017 is over.",
        val: [-70, -5]
      }]
    },
    12: {
      prompt: "The UBC mascot resigned and we desperately need one for the pep rally tonight",
      img: 'productManager',
      choices:
      [{
        reply: 'Let me in coach',
        consequence: "You attempted to do a double back flip and spent the school year in the hospital",
        val: [15, -20]
      }, {
        reply: 'Umm...I need to...be...somewhere...bye.',
        consequence: "Coach pulled some strings to get you kicked out of school",
        val: [0,-10]
      }] 
    },
    13: {
      prompt: "You walk in on your best friend and partner getting it on",
      img: 'rapper02',
      choices: [{
        reply: 'Chase them around with a baseball bat',
        consequence: "Your best friend retaliates and murders you",
        val: [-40, 10],
      }, {
        reply: 'Join them',
        val: [10, 20],
      }]
    },
    14: {
      prompt: "Your prof cancelled your midterm and gave everybody bonus marks",
      img: 'backenddev01',
      choices: [{
        reply: 'Woooaow',
        val: [40, 0],
        img: 'backenddev01',
        prompt: 'Everybody did too well in the class so your prof scaled down',
        choices: [{
          reply: ':(',
          val: [-35, 0],
          consequence: 'You failed your midterm and got kicked out of school'
        }]
      }]
    },
    15: {
      prompt: "Your lab partner is cute",
      img: 'rapper02',
      immediate: true,
      choices: [{
        reply: 'I think we should do it',
        val: [0, 0],
        prompt: 'Your lab partner thinks you should just stay friends',
        img: 'rapper02',
        choices: [{
          reply: 'Oh...',
          val: [-10, -20],
          consequence: 'Your lab partner broke your heart'
        }]
      },{
        reply: 'I think we should do our lab',
        val: [20, -5],
        prompt: 'Your lab partner wants to take it to the next level',
        img: 'rapper02',
        choices: [{
          reply: 'I think we should do it',
          val: [20, 10]
        }, {
          reply: 'I think we should do our lab',
          val: [-40, -10],
          consequence: "Your lab partner started a rumor that you're a Trump supporter"
        }]
      }]
    },
    16: {
      prompt: "You found a UBC ID on the ground",
      img: 'designer01',
      choices: [{
        reply: "Look for the owner",
        consequence: "You spent too much time trying to look for the owner",
        val: [-20, 0],
        prompt: "You found the owner of the UBC id! Ask for a favor?",
        img: 'designer01',
        choices: [{
          reply: "Please take my midterm tomorrow",
          val: [0, 10],
          prompt: "You managed to avoid getting caught cheating and got a 100% on your midterm!",
          img: 'designer01',
          choices: [{
            reply: "Awesome",
            val: [40, 0]
          }]
        }, {
          reply: "Have a nice day!",
          val: [0, 30]
        }]
      }]
    },
    17: {
      prompt: "Someone wrote a post about you on UBC Crushes",
      img: 'productManager',
      choices: [{
        reply: "Ayyyyy",
        val: [0, 10]
      }]
    },
    18: {
      prompt: "15000 Courses have been signed up to AnEyeOut Free! Should you use Premium which only tracks 85 courses?",
      img: 'backenddev01',
      choices: [{
        reply: "Yes",
        val: [20, 20]
      }, {
        reply: "Free is good",
        val: [10, 20]
      }]
    },
    19: {
      prompt: "You come back from a trip to find your roommate's breakfast from a week ago still on the countertop",
      img: 'rapper02',
      choices: [{
        reply: 'Kick him',
        val: [-20, -15],
        consequence: "Your roommate sued you and you can't afford tuition anymore"
      }, {
        reply: 'Ignore it',
        val: [-40, 5],
        consequence: "You died from inhaling toxic fumes from your roommate's breakfast"
      }]
    },
    20: {
      prompt: "You forgot your iClicker",
      img: 'rapper02',
      choices: [{
        reply: "It's just for bonus marks anyway",
        val: [-30, 0]
      }, {
        reply: "Call your best friend to bring their ass down to DMP 310",
        val: [10, 0]
      }]
    },
    21: {
      prompt: "You have to take an elective",
      img: 'cfo',
      immediate: true,
      choices: [{
        reply: 'FNH 330 - Intro to Wine Science',
        val: [20, 5],
        prompt: 'You got totally wasted',
        img: 'cfo',
        choices: [{
          reply: 'It is what it is. Round 2?',
          val: [-20, 10]
        }]
      }, {
        reply: 'FIPR 131 – Intro to Screen Acting',
        val: [20, 5],
        prompt: "You got offered a role to be an extra for Fifty Shades of Grey",
        img: 'tanya',
        choices: [{
          reply: "Ditch all your friends because you're a superstar now",
          val: [-10, -30]
        }, {
          reply: "Fifty Shades of Nay",
          val: [50, 0]
        }]
      }]
    },
    22: {
      prompt: 
    }
}
