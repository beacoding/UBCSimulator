module.exports = {
    0: {
      prompt: 'You just started the school year with a perfect 4.0 GPA',
      img: 'tanya',
      choices: [{
        reply: 'Awesome',
        val: [250, 50],
      }, {
        reply: 'Sweet',
        val: [250, 50]
      }]
    },
    1: {
      prompt: 'Should you get health insurance?',
      img: 'roySales',
      choices: [{
        reply: 'Yes',
        val: [-10, 10],
        consequence: 'You ran out of money cause insurance cost too much'
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
            val: [-50, -5],
            consequence: 'Gregor calls you out in class and stares you down that you never want to go to school again'
          },
          {
            reply: 'Slide down your desk',
            val: [-50, -5],
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
          val: [-80, 10],
          consequence: 'You ran out of money.',
          prompt: "You found a golden ticket in Gateman's textbook!",
          img: 'roySales',
          choices: [{
            reply: 'Awesome',
            val: [50, 20]
          },{
            reply: 'Quit School',
            val: [-1000, -1000],
            consequence: 'You dropped out of school.'
          }]
        },
        {
          reply: 'Torrent it',
          val: [0, 0]
        }]
    },
    7: {
      prompt: 'A Sauder student comes by to pitch you an idea for a new startup for a ',
      img: 'rapper02',
      choices:
      [{
        reply: "Keep on walking and pretend you didn't hear",
        val: [20, 20]
      }, {
        reply: 'When do we start?',
        val: [-20, -10]
      }]
    }
}
