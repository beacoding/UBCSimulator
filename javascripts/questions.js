var questions = {
    0: {
      prompt: 'You just started the school year with a perfect 4.0 GPA',
      choices: [{
        reply: 'Awesome',
        val: [250, 0.2],
      }, {
        reply: 'Sweet',
        val: [250, 0.2]
      }]
    },
    1: {
      prompt: 'Should you get health insurance?',
      choices: [{
        reply: 'Yes',
        val: [-100, 0.1],
        consequence: 'You ran out of money cause insurance cost too much'
      }, {
        reply: 'No',
        val: [0, -0.5],
        consequence: 'You missed 3 days of school due to pneumonia.'
      }]
    },
    3: {
      prompt: 'You cannot get into a course. Should you use AnEyeOut?',
      choices:
        [{
          reply: 'Yes',
          val: [300, 0.3],
          prompt: 'AnEyeout got into your Course!',
          choices: [{
            reply: 'Awesome',
            val: [500, 0.2]
          }]
        },
        {
          reply: 'No',
          val: [10, -0.4],
          consequence: "Woops. You couldn't get into your course. So you now have to drop out of school"
        }]
    },
    4: {
      prompt: 'Do you think Chris is buff?',
      choices:
        [{
          reply: 'Eh I guess',
          val: [-10, -0.1],
          consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
        },
        {
          reply: 'Damn Right',
          val: [-10, -0.1],
          consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
        }
        ]
    },
    5: {
        prompt: 'Gregor caught you talking in class.',
        choices:
          [{
            reply: "It wasn't me",
            val: [-50, -0.1],
            consequence: 'Gregor calls you out in class and stares you down that you never want to go to school again'
          },
          {
            reply: 'Slide down your desk',
            val: [-50, -0.1],
            consequence: 'Gregor still caught you'
          }
          ]
    },
    6: {
      prompt: 'Gateman asks you to buy his textbook',
      choices:
        [{
          reply: 'Cave in',
          val: [-80, 0.2],
          consequence: 'You ran out of money.',
          prompt: "You found a golden ticket in Gateman's textbook!",
          choices: [{
            reply: 'Awesome',
            val: [500, 0.2]
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
    }
}
