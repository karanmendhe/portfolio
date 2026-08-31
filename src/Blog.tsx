import React, { useState, useEffect } from "react";
import { navigate, goBack, onRouteChange } from "./router";

type BlogProps = {
  onBack?: () => void;
};

type BlogPost = {
  id: string;
  number: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  content: {
    sections: Array<{
      heading: string;
      paragraphs: string[];
      quote?: string;
      image?: {
        path: string;
        alt: string;
      };
    }>;
    footer: string;
  };
};

type CategoryInfo = {
  id: string;
  name: string;
  description: string;
};

const CATEGORIES: CategoryInfo[] = [
  {
    id: "personal",
    name: "Personal",
    description:
      "Stories, experiences, memories, and moments from my personal journey."
  },
  {
    id: "technical",
    name: "Technical",
    description:
      "Engineering projects, electronics, power systems, embedded systems, experiments, and technical lessons."
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description:
      "Thoughts, beliefs, perspectives, lessons, and ideas about life and growth."
  },
  {
    id: "observations",
    name: "Observations & Stories",
    description:
      "Things I notice, interesting experiences, stories, people, and observations from everyday life."
  }
];

const SIH_BLOG_IMG = "/assets/Blog_Images/SIH blog img/SIH_BLOG_Part_1_images";
const SIH_BLOG_IMG_2 = "/assets/Blog_Images/SIH blog img/SIH_BLOG_Part_2_images";
const SOLAR_BLOG_IMG = "/assets/Blog_Images/Solar_technical";

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-01",
    number: "01",
    title: "The Road I Didn't Plan",
    excerpt:
      "Sometimes a closed door isn't a failure. Sometimes it's just an entrance to a road you hadn't considered.",
    category: "Personal",
    date: "August 2026",
    readingTime: "8 min read",
    content: {
      sections: [
        {
          heading: "I Never Imagined I'd Become an Engineer",
          paragraphs: [
            "Sometimes a closed door isn't a failure. Sometimes it's just an entrance to a road you hadn't considered.",
            "I never imagined I'd become an engineer.",
            "For almost three years, I was preparing to become a doctor.",
            "I grew up around Kasturba Health Society, Sevagram. My father's work was in the Engineering Maintenance department there, and the hospital was practically part of my everyday surroundings. I would visit the hospital, see doctors treating people, see patients and their families, and slowly, almost naturally, I became interested in medicine.",
            "But looking back, I don't think it was really about becoming a doctor.",
            "It was about people.",
            "I saw people come into the hospital suffering, and I wanted to become someone who could do something about it. Being a doctor seemed like the most direct way to do that. I imagined a stable life close to my family, helping people, being useful, and doing something that mattered.",
            "So I made up my mind.",
            "I was going to become a doctor.",
            "And I took it seriously."
          ]
        },
        {
          heading: "Three Years Preparing for NEET",
          paragraphs: [
            "I enjoyed biology. By the time I reached 11th and 12th, it had become one of my strongest subjects. I scored 99 in Biology in my 12th board examination.",
            "I spent three years preparing for NEET—11th, 12th, and one repeated year—including time away from home in a hostel.",
            "That hostel life taught me something else too.",
            "Most of my friends were preparing for JEE. In our circle, engineering and medicine were almost like two different worlds, but we were all chasing something together. We studied together, pushed each other, joked around, struggled together and, eventually, became something closer to a family."
          ],
          image: {
            path: "/assets/Blog_Images/Personal_B/neet preparation.png",
            alt: "A study setup from my NEET preparation years"
          }
        },
        {
          heading: "The Road Changed",
          paragraphs: [
            "Then came my first NEET attempt.",
            "My score wasn't enough.",
            "I was disappointed. Quiet. Confused.",
            "My parents, however, didn't make me feel like I had failed them.",
            "They simply said:",
            "We're with you. If you want to try again, try again. If you want to choose something else, we'll support you.",
            "They left the decision with me—whether I wanted to try NEET again or explore another path like BMS, BDS, BAMS, BHMS, or something else.",
            "And I chose to try again.",
            "So I went to Nanded and started preparing for NEET once more."
          ]
        },
        {
          heading: "Then Came 2023",
          paragraphs: [
            "The paper was different from what I expected. Biology, the subject I had always been strongest in, was lengthy and difficult.",
            "When I came outside the examination hall, my father was waiting.",
            "He asked, 'How was the exam?'",
            "I just told him:",
            "It wasn't what I thought it was going to be.",
            "I don't express disappointment in the usual way. I don't necessarily cry or say much.",
            "I just think.",
            "I imagine.",
            "I replay everything in my head.",
            "And at that point, the thought that kept coming back was:",
            "What am I going to do now?",
            "For a while, I genuinely felt like I had let everyone down.",
            "My family had given me their time, support, money, and everything they could. And I couldn't even achieve the one thing I had decided I would do.",
            "But again, my parents didn't make it heavier.",
            "They told me the same thing.",
            "It's okay. Whatever you decide, we're with you."
          ]
        },
        {
          heading: "An Unexpected Possibility",
          paragraphs: [
            "So this time, I had to think differently.",
            "I had studied PCMB, so I had another possibility.",
            "Some of my friends suggested:",
            "Why don't you try JEE and MHT-CET too? Just give it a shot.",
            "My reaction?",
            "😂",
            "Sure. Let's see.",
            "And then something unexpected happened.",
            "I discovered that my PCM wasn't bad either.",
            "I scored well enough to get into good colleges in places like Nagpur and Pune.",
            "Suddenly, engineering wasn't just some backup plan anymore.",
            "It was a possibility."
          ]
        },
        {
          heading: "Why Electrical Engineering?",
          paragraphs: [
            "At first, I was honestly thinking about Computer Science. It was the obvious choice. It was popular, everyone was talking about it, and I thought maybe I should just follow the trend and build a career around it.",
            "But then I started looking at what was actually around me.",
            "My father's professional environment had always been filled with electrical engineers. I knew them. They knew me. I started talking to more of them.",
            "And I noticed something.",
            "They were genuinely happy with what they had chosen.",
            "They weren't just doing a job.",
            "I watched how they worked, how they treated people, how they interacted with juniors and colleagues.",
            "They were engineers, but more importantly, they were people I respected.",
            "And slowly, Electrical Engineering started making sense to me.",
            "I don't have some dramatic story about the exact moment I chose Electrical.",
            "I just remember thinking:",
            "Maybe this is something I can do."
          ]
        },
        {
          heading: "Choosing Where to Study",
          paragraphs: [
            "And then came another decision.",
            "Where should I study?",
            "Pune?",
            "Nagpur?",
            "Somewhere else?",
            "Everyone had an opinion.",
            "Some said I had the marks to go to a reputed college in Pune. Others suggested Nagpur.",
            "My closest friend, who had been with me since school and had also gone through the hostel journey with me, told me something much simpler:",
            "Why don't you stay nearby? Stay close to your family. Eat home food. Get your degree. You don't have to go far just because everyone else does.",
            "😂",
            "Honestly, that sounded pretty good.",
            "So I joined Bajaj Institute of Technology, Wardha.",
            "And that's where the next chapter began."
          ]
        },
        {
          heading: "When Engineering Started Feeling Different",
          paragraphs: [
            "But I wasn't an engineer yet.",
            "In first year, I was okay with engineering.",
            "That's it.",
            "I wasn't deeply connected to it.",
            "A part of me was still wondering what life would have been like if I had tried one more time for medicine.",
            "But I never really compared myself with people who had chosen different paths.",
            "I don't see people as competition.",
            "I see them as people.",
            "And slowly, something changed.",
            "In my second year, our department started combining second- and third-year students into project groups.",
            "I was introduced to a world I hadn't really understood before.",
            "Projects.",
            "Prototypes.",
            "Circuits.",
            "People spending hours trying to make something work.",
            "And what caught my attention wasn't even the project itself.",
            "It was the people building it."
          ]
        },
        {
          heading: "The First Project That Changed Something",
          paragraphs: [
            "I watched seniors working on their projects and thought:",
            "Wait... I can actually do this too.",
            "My first serious project was a DC-DC converter.",
            "I didn't know nearly as much as I know today.",
            "But I was interested.",
            "I wanted to understand what was happening.",
            "I wanted to build."
          ]
        },
        {
          heading: "When the Project Failed",
          paragraphs: [
            "And then came the moment that probably changed my relationship with engineering more than any lecture could have.",
            "Our project didn't work properly at the exhibition.",
            "😂",
            "I was angry, disappointed, embarrassed and confused.",
            "My brain was basically going:",
            "We literally failed. How are all of you people so normal right now?",
            "And my teammates were just like:",
            "Bro, chill. It's nothing.",
            "Then I looked around.",
            "Other teams had projects that worked.",
            "Some didn't.",
            "Some were impressive.",
            "Some were barely holding together.",
            "But everyone was smiling.",
            "Everyone was proud of how far they had come.",
            "Nobody was standing there thinking their entire journey was worthless because a prototype didn't work on one particular day.",
            "Even our teachers weren't there to scold us.",
            "They were happy just seeing students build something, experiment, fail, learn and try.",
            "And somewhere in that moment, I understood something."
          ],
          image: {
            path: "/assets/Blog_Images/Personal_B/engineering group for blog.jpeg",
            alt: "My engineering project team working together"
          },
          quote:
            "Engineering isn't about getting everything right the first time. It's about being curious enough to try, stubborn enough to keep going, and humble enough to learn when something doesn't work."
        },
        {
          heading: "Looking Back",
          paragraphs: [
            "That was probably the point where engineering stopped being just my degree.",
            "It started becoming my thing.",
            "Today, I'm in my final year of Electrical Engineering.",
            "Somewhere along the way, I went from studying the human body to studying electrical systems.",
            "From biology books to circuits.",
            "From syringes to soldering.",
            "From thinking about how the human body works to building things that can help people.",
            "And honestly?",
            "I'm still surprised by how different the road turned out to be.",
            "But I'm happy with where it brought me."
          ]
        },
        {
          heading: "Maybe I Didn't Lose the Dream",
          paragraphs: [
            "Because looking back, I don't think I lost my original dream.",
            "The reason I wanted to become a doctor was to help people.",
            "Today, I just see another way of doing that.",
            "Through engineering.",
            "Through technology.",
            "Through building things that can make someone's life a little easier."
          ]
        },
        {
          heading: "Take the Road You Didn't Plan",
          paragraphs: [
            "And maybe that's what I learned from the biggest decision I've made so far:",
            "Sometimes you make a decision because the road you wanted is no longer available.",
            "That doesn't mean you've lost.",
            "Maybe another door has opened.",
            "Maybe the road behind that door will be better.",
            "Maybe it will be harder.",
            "Maybe you'll fail again.",
            "You don't know.",
            "But you might eventually find something you never knew you were looking for.",
            "So if you're standing at a point in your life where something you desperately wanted didn't work out, don't immediately call it a failure.",
            "Give yourself another chance.",
            "Try something else.",
            "Explore.",
            "Take the road you didn't plan.",
            "And if nothing else—",
            "remember who the hell you are. 😂",
            "You might be surprised where you end up."
          ]
        }
      ],
      footer: "The road I didn't plan turned out to be mine.\n\n— Karan Mendhe"
    }
  },
  {
    id: "post-02",
    number: "02",
    title: "Team Dexterist — Part I: The Project We Almost Didn't Build",
    excerpt:
      "Two failed projects, a team built on trust instead of hierarchy, and a rehabilitation device that started as a competition entry and slowly became something more.",
    category: "Observations & Stories",
    date: "August 2026",
    readingTime: "14 min read",
    content: {
      sections: [
        {
          heading: "Part I — The Project We Almost Didn't Build",
          paragraphs: [
            "I didn't start my Smart India Hackathon journey with a big project.",
            "I didn't start with a perfect team.",
            "And I definitely didn't start with a plan to reach the national stage.",
            "It started with something much simpler.",
            "I was in my first year of college when I first noticed students around me talking about Smart India Hackathon.",
            "It was a national-level competition where students were building solutions to real-world problems and representing their colleges.",
            "But what caught my attention wasn't just the competition.",
            "It was the way those students were appreciated.",
            "Our principal would talk about them. Teachers would appreciate their work. Other students looked up to them.",
            "I remember thinking:"
          ],
          quote: "I want to experience this someday.",
          image: {
            path: `${SIH_BLOG_IMG}/SIH_Inspiratiojn.png`,
            alt: "The spark that made me want to experience Smart India Hackathon"
          }
        },
        {
          heading: "My First Attempt",
          paragraphs: [
            "In my second year, I finally got my first opportunity.",
            "We formed a team and started working on a railway-safety-related problem.",
            "The idea was to develop a system that could help detect cracks or obstacles on railway tracks and potentially provide an early warning to reduce the chances of accidents."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Railway_track_idea.png`,
            alt: "Early concept for the railway track safety detection idea"
          }
        },
        {
          heading: "My First Attempt (continued)",
          paragraphs: [
            "I was genuinely interested in the problem.",
            "One of my friends was too.",
            "For the first time, SIH didn't feel like something I was watching other students do.",
            "It felt like something I was actually doing.",
            "We discussed the idea, thought about how the system could work, and started moving toward the competition.",
            "But there was one problem.",
            "The team wasn't equally interested.",
            "Some members weren't ready to put in the work required to take the idea forward. Slowly, the discussions became less frequent, the enthusiasm disappeared, and the project started losing momentum.",
            "Within roughly a week, the entire plan was dropped.",
            "Just like that.",
            "My first SIH attempt was over before it had really begun.",
            "It was disappointing.",
            "But strangely, I didn't feel like giving up.",
            "I remember thinking:"
          ],
          quote: "Okay. Next year."
        },
        {
          heading: "Finding the Right People",
          paragraphs: [
            "After that attempt, I started paying more attention to the people around me.",
            "During the later part of my second year, especially after the mini-modeling activities, I got to know some genuinely talented people in my class.",
            "Four of us gradually became close friends.",
            "We talked about projects, competitions, ideas, and the things we wanted to build someday.",
            "At some point, one of those conversations became more serious.",
            "We decided that when the right opportunity came, the four of us would build something together.",
            "There wasn't a big meeting.",
            "There wasn't a formal team-building process.",
            "It was just four friends deciding:"
          ],
          quote: "Let's actually do something together.",
          image: {
            path: `${SIH_BLOG_IMG}/Boysgroup_sih.jpeg`,
            alt: "The four of us who decided to build something together"
          }
        },
        {
          heading: "Finding the Right People (continued)",
          paragraphs: [
            "Then third year came.",
            "Our college was encouraging students to work on SIH problem statements, and when the new problems were announced, we knew this was the opportunity we had been waiting for.",
            "The four of us formed our team.",
            "Soon after, a fifth teammate joined us, bringing strong marketing, camera, and video-editing skills to the group.",
            "And that became the core of our team.",
            "At that point, we still didn't have a presenter.",
            "We figured we'd find one when the time came.",
            "Little did we know how important that decision would become later."
          ]
        },
        {
          heading: "We Were a Team Before We Were a Competition Team",
          paragraphs: [
            "One thing I think made our team special was the way we worked with each other.",
            "There was no feeling that one person had to control everyone else.",
            "Everyone had their own opinions.",
            "Everyone brought something different to the table.",
            "Some of us were stronger technically. Some were better with communication. Some were better with documentation, presentation, organization, or handling people.",
            "Most of us naturally had some leadership qualities.",
            "When it came to choosing our team leader, we looked at what the team actually needed.",
            "We chose the person who was good at communicating with faculty, comfortable talking with people, friendly and approachable, and capable of handling documentation and coordination.",
            "He had the qualities we felt were important for representing the team and keeping things organized.",
            "And once we chose him, we respected that responsibility.",
            "But that didn't mean everyone else stopped having a voice.",
            "If someone had an idea, we discussed it.",
            "If someone had a different opinion, we listened.",
            "If someone had to take responsibility for something, they did it.",
            "Nobody needed to constantly tell someone else what to do.",
            "We trusted each other enough to manage our own responsibilities.",
            "Looking back, I think that became one of the strongest parts of Team Dexterist."
          ],
          quote:
            "We weren't six people waiting for one person to tell us what to do. We were six people trying to make the same idea work."
        },
        {
          heading: "Our First Project Wasn't Dextra",
          paragraphs: [
            "Our first problem statement that year was an Onion Storage System.",
            "This time, we started seriously.",
            "We designed the concept.",
            "We worked on the circuit.",
            "We simulated it.",
            "The simulation worked."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Onionstorage_system.png`,
            alt: "Our Onion Storage System concept, circuit, and simulation"
          }
        },
        {
          heading: "Our First Project Wasn't Dextra (continued)",
          paragraphs: [
            "For the first time, I could feel that this wasn't just another discussion.",
            "We were actually building something.",
            "We were ready to move toward hardware.",
            "Then we discovered something we hadn't expected.",
            "Another group, mainly mechanical students, had already been working on almost the same problem for around two to three years.",
            "They already had hardware.",
            "They already had experience.",
            "They already had a huge head start.",
            "And suddenly we had to ask ourselves: was this the right battle for us?",
            "It wasn't that our idea was bad.",
            "We simply realized that entering an internal competition against a team that had been working on the same problem for years would make things unnecessarily difficult.",
            "So we dropped it.",
            "Again.",
            "For the second time in my SIH journey, I watched a project disappear after putting time and effort into it.",
            "But something was different this time.",
            "The team didn't fall apart.",
            "Nobody said:"
          ],
          quote: "Let's forget SIH."
        },
        {
          heading: "Then We Found Dextra",
          paragraphs: [
            "We simply waited for another opportunity. And it came.",
            "SIH released another set of problem statements.",
            "There were several problems around MedTech, healthcare, and renewable energy.",
            "One of the healthcare problems caught our attention.",
            "It involved rehabilitation for people who had difficulty moving their hands and fingers because of conditions affecting wrist and hand function.",
            "We read it. Discussed it. Looked at each other.",
            "And somehow, the decision was almost immediate:"
          ],
          quote: "Let's do this."
        },
        {
          heading: "Then We Found Dextra (continued)",
          paragraphs: [
            "That was the beginning of Dextra.",
            "At the time, we didn't know how far that decision would take us.",
            "We only knew that the problem felt meaningful.",
            "We started thinking about how a wearable rehabilitation device could assist hand movement while remaining simple and affordable.",
            "We took the idea to our mentor.",
            "Instead of simply telling us whether it was good or bad, our mentor started asking questions.",
            "What would the patient actually need? How could we make it practical? What could we realistically build? What would make our solution different?",
            "Those questions made the idea feel much more real.",
            "We started believing that maybe we could actually make it.",
            "We also started researching online, reading about the condition, existing rehabilitation methods, and the solutions already available.",
            "But we were still looking at the problem mostly from outside.",
            "That was about to change."
          ]
        },
        {
          heading: "The Departmental Hackathon",
          paragraphs: [
            "The departmental hackathon was almost there.",
            "We had only recently found Dextra.",
            "We had research. We had a concept. We had simulations.",
            "But we didn't have months to prepare.",
            "We had to explain a completely new idea almost immediately.",
            "Our mentor helped us understand possible approaches and suggested ways we could move forward.",
            "Our leader and hardware-focused teammate worked incredibly hard to explain the concept and model to the faculty.",
            "We managed to show that Dextra wasn't simply something we had written on a presentation slide.",
            "We had actually thought about how we could build it.",
            "The judges listened. They asked questions.",
            "And then came one sentence that gave the entire team a huge boost:"
          ],
          quote:
            "If you can build this, I can guarantee you can reach the SIH finale."
        },
        {
          heading: "A Direction",
          paragraphs: [
            "That sentence stayed with us.",
            "For a team that had already abandoned one project that year, it felt like someone had finally told us to keep going, that this one might actually work.",
            "But the departmental round also gave us something else.",
            "A direction.",
            "Our HOD and the faculty pushed us to take the project outside the classroom.",
            "They told us, in essence, that if we really wanted to build a healthcare solution, we needed to go and talk to the people who actually deal with the problem.",
            "And we listened."
          ]
        },
        {
          heading: "We Left the Classroom",
          paragraphs: [
            "This time, we went to hospitals."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Hospital_visit_for_data.png`,
            alt: "Visiting the hospital to understand the problem firsthand"
          }
        },
        {
          heading: "We Left the Classroom (continued)",
          paragraphs: [
            "We spoke with technicians.",
            "We spoke with physiotherapists.",
            "We spoke with medical professionals who understood the problem far better than we did.",
            "The technicians showed us the kinds of equipment already being used.",
            "The physiotherapist explained what rehabilitation looked like from a practical perspective.",
            "We also spoke with a neurological specialist who helped us understand the medical side of the problem — what was involved, why the problem occurred, what rehabilitation looked like, and what patients actually went through.",
            "Some of these conversations were long. Very long.",
            "We recorded them so we could go back, understand what we had learned, and explain it to the rest of our team.",
            "A lot of the terminology was completely new to us.",
            "But slowly, the problem started becoming more than just words written in an SIH document.",
            "We started seeing the people behind it.",
            "And then we discovered something that made the problem even more important.",
            "Some of the equipment used in clinical environments could cost around ₹2 lakh or more.",
            "Some personal rehabilitation devices we found were around ₹50,000 or more.",
            "Meanwhile, our goal was to build something that could work in the range of a few thousand rupees.",
            "Our prototype eventually came to around ₹2,200.",
            "The difference was huge.",
            "For us, this was one of the moments when Dextra stopped feeling like just a competition project.",
            "There was a real affordability gap.",
            "And suddenly, our question changed. It wasn't only whether we could win SIH. It became:"
          ],
          quote: "Can we actually build something that could help someone?"
        },
        {
          heading: "Then Everything Changed",
          paragraphs: [
            "That question stayed with us.",
            "Just when things were finally starting to move in the right direction, we faced another problem.",
            "Our female team member had to leave the team because of personal and family circumstances."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Team_Breaking_girl_leaves.png`,
            alt: "The team during a moment of change"
          }
        },
        {
          heading: "Then Everything Changed (continued)",
          paragraphs: [
            "There wasn't much time to process it.",
            "The institutional hackathon was approaching.",
            "We needed a presenter. And we needed one quickly.",
            "So I asked one of my teammates, who was good at communicating with juniors and seniors, to spread the message that we were looking for someone with good presentation skills.",
            "The search started.",
            "And somehow, by the next morning, we had found someone.",
            "The timing was almost ridiculous.",
            "She had joined the team and immediately had to understand a project that the rest of us had already been working on.",
            "She had roughly one to two days to prepare.",
            "We sat with her. Explained Dextra. Explained the problem. Explained what we had researched. Explained what we wanted the presentation to communicate.",
            "We gave her a script.",
            "But what surprised me was that she didn't simply memorize it.",
            "She understood it.",
            "Then she started making the words her own.",
            "And when she finally presented it, it was far better than we expected.",
            "For someone who had joined the team practically overnight, she adapted incredibly quickly.",
            "That was one of those moments where you realize:"
          ],
          quote:
            "Sometimes teamwork isn't about having the perfect team from day one. Sometimes it's about finding the right person when everything suddenly goes wrong."
        },
        {
          heading: "The Institutional Hackathon",
          paragraphs: [
            "And she became the sixth and final member of Team Dexterist.",
            "Now came the institutional-level hackathon.",
            "Our faculty had already told us that hardware would make a difference.",
            "If we could show something physically working, it would strengthen our chances.",
            "So we tried.",
            "We got the motors running. We tested different parts. We worked on the mechanism.",
            "But the complete hand-mounted prototype still wasn't ready.",
            "We were somewhere between an idea and a real product.",
            "Then came presentation day.",
            "Our new presenter had done an incredible job preparing in almost no time, but she couldn't confidently complete every slide.",
            "So I stepped in.",
            "I took over the remaining slides and continued explaining the project.",
            "The presentation moved forward.",
            "Then came the questions.",
            "Our leader handled his part. Our software teammate handled his. I handled mine.",
            "Everyone contributed.",
            "The judges asked questions, and our team answered them together."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Institute_round_presentation.png`,
            alt: "Presenting together at the institutional hackathon"
          }
        },
        {
          heading: "The Institutional Hackathon (continued)",
          paragraphs: [
            "Our faculty members also supported us by explaining our planning and development process to the principal.",
            "And then we walked out of the room.",
            "For once, nobody was saying we should have done this differently.",
            "We felt good.",
            "We felt like we had genuinely given it everything we had.",
            "That evening, we even had a small celebration.",
            "Nothing huge. Just our team enjoying the moment.",
            "Because after everything that had happened — the failed first attempt, the Onion Storage project, finding Dextra, the research, losing a team member, and finding a new one almost overnight — we finally had something to celebrate.",
            "Then came the result.",
            "We opened the list.",
            "And there it was.",
            "Team Dexterist. Selected."
          ],
          image: {
            path: `${SIH_BLOG_IMG}/Final_group.jpeg`,
            alt: "Team Dexterist after being selected"
          }
        },
        {
          heading: "The Institutional Hackathon — The Result",
          paragraphs: [
            "For the first time, the dream that had started back in my first year didn't feel imaginary anymore.",
            "The competition I had watched other students participate in during my first year was now becoming real for me.",
            "But there was an important difference:"
          ],
          quote: "We hadn't reached the SIH Grand Finale yet."
        },
        {
          heading: "The Real Journey Was About to Begin",
          paragraphs: [
            "We had earned the opportunity to represent our college at the next stage.",
            "Now we had to prepare the final presentation, document our work, improve the project, and submit everything through the official Smart India Hackathon portal.",
            "We had roughly a month to prove that Dextra wasn't just a good idea on a presentation slide.",
            "We had to build it. We had to make it work.",
            "And we had to convince people beyond our college that this project deserved to move forward.",
            "The real SIH journey was about to begin."
          ]
        }
      ],
      footer:
        "This is Part I of the Dextra story — how Team Dexterist came together. Part II, the road to the SIH Grand Finale and everywhere Dextra went after, is up next.\n\n— Karan Mendhe"
    }
  },
  {
    id: "post-03",
    number: "03",
    title: "Team Dexterist — Part II: From Selection to the National Stage",
    excerpt:
      "Fifteen days to prove Dextra deserved to go further, a phone call on a bike ride that changed everything, and a national stage that taught us more than any trophy could.",
    category: "Observations & Stories",
    date: "August 2026",
    readingTime: "18 min read",
    content: {
      sections: [
        {
          heading: "The Celebration That Didn't Last",
          paragraphs: [
            "The institutional selection felt like a victory.",
            "And for a little while, we treated it like one.",
            "After the results were announced, we went to the college canteen, had some breakfast and brunch together, laughed, talked, and enjoyed the moment.",
            "Nothing too serious.",
            "Just six people who had been through a lot in a short amount of time, finally getting a chance to breathe.",
            "But the celebration didn't last long.",
            "Because now came the part that actually mattered.",
            "Now we had to prove that Dextra deserved to go further."
          ]
        },
        {
          heading: "Fifteen Days to Prove It",
          paragraphs: [
            "We had roughly 15 days to prepare our official SIH submission.",
            "And suddenly, every day mattered.",
            "We had to improve the prototype. Refine the concept. Prepare the PPT. Document our work.",
            "And somehow, make the judges believe that Dextra wasn't just an idea sitting inside a presentation.",
            "Our mentor gave us another suggestion.",
            "Make a proper video. Show the presentation. Show the prototype. Show it actually working. Put the video link into the submission.",
            "Simple enough. Right?",
            "Not exactly."
          ]
        },
        {
          heading: "Seven Minutes, Four Hours",
          paragraphs: [
            "One of our teammates had excellent camera, marketing, and editing skills, so he took charge of recording.",
            "Our presenter handled the presentation. I handled the narration for the prototype demonstration.",
            "And then we started recording.",
            "The final video was supposed to be around seven minutes.",
            "Seven minutes. It sounds easy. It wasn't. 😂",
            "One line went wrong. Again. Someone missed a point. Again. The camera angle wasn't right. Again. The timing wasn't natural. Again.",
            "And somehow, those seven minutes took us almost four hours to record properly.",
            "But our teammate behind the camera didn't give up. He handled the recording and editing, including the glove demonstration.",
            "I narrated the working portion. Our presenter carried the main presentation.",
            "And eventually, the final video was ready.",
            "Four hours for seven minutes. Worth it.",
            "We submitted the PPT, the videos, and everything else required for the SIH submission.",
            "Now we had to wait."
          ],
          quote: "One more take."
        },
        {
          heading: "Meanwhile, Dextra Was Already Moving",
          paragraphs: [
            "While the SIH submission was being processed, another competition was happening.",
            "Avishkar.",
            "At the college level, only two technical projects were selected to move forward to the district level. Dextra was one of them.",
            "Our presenter took the project forward, accompanied by two supporters, including our hardware teammate.",
            "Then came the district-level competition.",
            "And we came back with something we weren't expecting.",
            "Second prize. A silver medal in the technical round.",
            "And that result qualified the project for the university level.",
            "It was another strange feeling. The project that had started as one SIH problem statement was now travelling through another competition too.",
            "And we were beginning to realize that Dextra had become bigger than one competition."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Avishkar_District_win.jpeg`,
            alt: "Second prize at the Avishkar district-level competition"
          }
        },
        {
          heading: "Then the Call Came",
          paragraphs: [
            "Around this same time, we were still working and waiting for the SIH result.",
            "One evening, it was around 7:30 PM.",
            "I had finished the day's work. I dropped my hardware teammate at his home and started riding toward mine.",
            "Then my phone rang. It was him. I picked up.",
            "And the first thing he said was:"
          ],
          quote: "Bro... we got selected."
        },
        {
          heading: "Then the Call Came (continued)",
          paragraphs: [
            "I was literally riding my bike.",
            "For a second, I didn't process it. Then it hit me.",
            "Dextra had been selected for the Smart India Hackathon Grand Finale.",
            "The competition I had wanted to experience since first year. The competition I had failed to reach in second year. The project we had almost abandoned.",
            "We were going to the national stage.",
            "When I reached home, I checked my phone. Our mentor was already celebrating in the group. Messages were coming in. Everyone was congratulating us.",
            "And the next morning, when we came back to college, the atmosphere was completely different.",
            "We had done it."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_Sortlisted.png`,
            alt: "The SIH sortlist showing Team Dexterist selected for the Grand Finale"
          }
        },
        {
          heading: "This Time, We Celebrated Properly",
          paragraphs: [
            "The institutional selection had given us a small canteen treat.",
            "But this was different. This was SIH national-level selection.",
            "So this time, we went out properly. We went to a hotel. Had a full meal together. And cut a cake.",
            "For a few hours, there were no circuits. No PPT. No deadlines. No judges.",
            "Just six people sitting together and celebrating something we had been chasing for years.",
            "It felt amazing.",
            "But once again, the celebration had an expiry date. Because now we had to prepare for the biggest stage yet."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Party_after_Sih_selection.jpeg`,
            alt: "Celebrating the SIH Grand Finale selection with a proper team dinner and cake"
          }
        },
        {
          heading: "And Then I Had an Idea",
          paragraphs: [
            "About a week later, another competition was approaching.",
            "Mini Modeling.",
            "And on the morning of the competition, I was looking at our Dextra prototype.",
            "The basic system worked. But I started thinking:",
            "Why can't we control this through a mobile phone?",
            "Then another thought came. Why not add voice control too?",
            "I immediately discussed the idea with our hardware and software teammates. They liked it. We took the idea to our mentor.",
            "Even he was surprised by the direction. He liked the idea.",
            "But then came the practical part. We were already close to the competition. So he told us not to risk the working prototype just to add something new.",
            "We could present what we already had. Then we could develop the mobile and voice-control system further for SIH.",
            "And that was exactly what we decided to do.",
            "Sometimes engineering isn't about adding more. Sometimes it's about knowing when to stop changing something that already works."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/mobile_application_dextra.jpeg`,
            alt: "Early look at the Dextra mobile application concept"
          }
        },
        {
          heading: "Mini Modeling",
          paragraphs: [
            "The Mini Modeling presentation went smoothly.",
            "Our presenter handled the main explanation. But once the technical questions started, the situation changed.",
            "Questions like: 'Why did you use this motor?' 'Why this mechanism?' 'Why not another one?'",
            "This was the kind of questioning I had prepared for. So I took over the technical round.",
            "One question. Answer. Another question. Answer. And the questions kept coming.",
            "Eventually, one of the judges shook my hand. He told us that it was one of the best projects he had seen and that he genuinely wanted to see Dextra move toward the market level.",
            "That moment meant a lot. Because someone outside our team was looking at what we had built and saying:"
          ],
          quote: "Take this further."
        },
        {
          heading: "We Won Mini Modeling",
          paragraphs: [
            "By then, Dextra had already been through several competitions.",
            "And Mini Modeling became another successful chapter.",
            "We won the first prize.",
            "Another result. Another little boost.",
            "But this time, something felt different.",
            "Because SIH was no longer a dream. It was coming."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Winning_mini_modelling.jpeg`,
            alt: "Team Dexterist after winning first prize at Mini Modeling"
          }
        },
        {
          heading: "Now We Were Going to the National Stage",
          paragraphs: [
            "After Mini Modeling, our focus shifted completely. SIH.",
            "Our mentor continued guiding us. There were preparation sessions and technical classes, including sessions around ESP32 and other technologies that could help teams strengthen their prototypes.",
            "For us, there was a funny little advantage. We already knew ESP32.",
            "So while some people were learning the basics, we were sitting there thinking: 'Okay... this part we already know.' 😂",
            "But we attended everything. Because knowing something already doesn't mean there isn't something else to learn."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Mentoring_Support.jpeg`,
            alt: "Mentoring sessions ahead of the SIH Grand Finale"
          }
        },
        {
          heading: "The Component List",
          paragraphs: [
            "Our seniors gave us another important piece of advice.",
            "Don't go to the national stage with old or unreliable components. Make a proper list. Ask for new components. Build the prototype properly.",
            "So we prepared our component list. Electronics. Mechanical components. Everything we thought we needed.",
            "We also started working on the problems we had already discovered.",
            "Heating issues. Power requirements. Connections. Protection. The mechanism. The casing.",
            "Everything slowly started becoming more serious."
          ]
        },
        {
          heading: "The Team Uniform",
          paragraphs: [
            "Then came another extremely important engineering task.",
            "T-shirts. 😂",
            "We went for printing. And because it was going to be cold in Delhi, we thought: why stop at T-shirts? Let's make hoodies too.",
            "So now we had: Team Dexterist T-shirts. Team Dexterist hoodies. A national-level problem statement. A prototype.",
            "And absolutely no idea what was waiting for us.",
            "But at least we looked like a proper team. That counts for something."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Tshirt_printings.jpeg`,
            alt: "Getting the Team Dexterist T-shirts and hoodies printed"
          }
        },
        {
          heading: "Booking the Tickets",
          paragraphs: [
            "Then came the tickets.",
            "We had to travel from Wardha to Delhi, and then from Delhi toward the actual SIH venue at Galgotias University.",
            "We went through the booking process. Checking availability. Finding seats. Booking the return journey. Making sure all six of us could travel.",
            "It sounds like a small thing. But standing there and booking those tickets felt different.",
            "Because suddenly the thought became real:",
            "We're actually going."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_before_train_img.jpeg`,
            alt: "Getting ready to leave for Delhi"
          }
        },
        {
          heading: "Delhi",
          paragraphs: [
            "Eventually, we reached Delhi.",
            "For some of us, it was our first time there.",
            "So before going to the actual hackathon, we had to explore a little.",
            "We went to India Gate. Took photos. Looked around. Enjoyed the moment.",
            "And then came the obvious conclusion: 'Okay boys, enough sightseeing. We have a hackathon to attend.' 😂",
            "So we moved on."
          ],
          image: {
  path: `${SIH_BLOG_IMG_2}/Group_explore_india_gate.png`,
  alt: "Exploring India Gate before the hackathon began"
}
        },
        {
          heading: "Gautam Buddha University",
          paragraphs: [
            "Our accommodation was at Gautam Buddha University.",
            "And honestly, it surprised us. It was one of the nicest accommodations I had experienced during a competition. It almost felt like a proper hotel-level setup.",
            "But the most interesting part wasn't even the accommodation. It was the people.",
            "The moment we entered, we could feel the pressure. Everyone was talking about their projects. Their prototypes. Their presentations. Their strategies.",
            "Nobody was there casually. Everyone had come from somewhere in India with the same goal.",
            "And suddenly, the scale of the competition became real."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Gautam_buddha_university_guesthouse.jpg`,
            alt: "Our accommodation at Gautam Buddha University during SIH"
          }
        },
        {
          heading: "One Last Normal Night",
          paragraphs: [
            "That night, we had another small cultural difference.",
            "We were from Maharashtra. The food was different from what we were used to.",
            "So eventually, we ordered Domino's. We sat together. Ate. Talked. Laughed. And enjoyed the night.",
            "Because somewhere inside, we knew:",
            "Tomorrow everything was going to change."
          ]
        },
        {
          heading: "Welcome to SIH",
          paragraphs: [
            "The next morning, we reached the venue.",
            "Registration. Checking in. Finding our table. Getting everything arranged.",
            "Then came the inauguration ceremony. We sat down and watched the ceremony before the actual competition began.",
            "After the inauguration and breakfast, the atmosphere changed completely.",
            "Laptops opened. Components came out. Mentors started moving around. Teams took their positions.",
            "And then it started.",
            "The Smart India Hackathon Grand Finale."
          ],
          image: {
  path: `${SIH_BLOG_IMG_2}/Galgotias_university_image.jpg`,
  alt: "The Smart India Hackathon Grand Finale venue at Galgotias University"
}
        },
        {
          heading: "Day One — Our First Mistake",
          paragraphs: [
            "Before the first round, we had spoken with some seniors. They gave us advice: don't reveal everything immediately. Build gradually. Show progress as the days go on.",
            "At the time, it sounded logical. So we followed it.",
            "During the first mentoring round, we explained our concept. The judges were interested. But we held back from showing everything we had.",
            "And honestly? That was one of our biggest mistakes.",
            "Our presenter was nervous. The stage was completely different. The judges were different. The pressure was different.",
            "And our first presentation didn't go the way we wanted.",
            "We walked away knowing: we could have done better.",
            "But the competition wasn't over. So we regrouped."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_mentoring_rounds_img.jpeg`,
            alt: "The first mentoring round at the SIH Grand Finale"
          }
        },
        {
          heading: "Everyone Had a Role",
          paragraphs: [
            "After the first round, I stepped in and made sure everyone knew what they had to do.",
            "I gave the team their roles. The hardware work had to move faster. The software side had to continue the control system. The presenter had to prepare for the next presentation. The prototype had to keep improving.",
            "And I kept moving between the concept, hardware, presentation, and whatever needed attention.",
            "Everyone had their own responsibility.",
            "From that point forward, the message was simple:"
          ],
          quote: "Build faster. Show more. Know your role. Don't wait for someone else.",
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_mentoring_rounds_img2.jpeg`,
            alt: "Regrouping and assigning roles after the first round"
          }
        },
        {
          heading: "The Second Round — When I Lost My Temper",
          paragraphs: [
            "The next presentation didn't go the way we expected either.",
            "Our presenter was nervous again, and the presentation started falling apart.",
            "I was frustrated. Very frustrated.",
            "And in that moment, I lost my temper. I shouted at one of my teammates.",
            "Looking back now, honestly, I regret that moment.",
            "It wasn't fair. It was their first experience at a stage like this too. They were young. They were nervous. And everyone was under pressure.",
            "At that moment, I was thinking only about getting the presentation right.",
            "But today, I understand that pressure isn't an excuse to take it out on someone else.",
            "We moved forward. And I made sure I didn't repeat that mistake."
          ]
        },
        {
          heading: "The Days Started Blurring Together",
          paragraphs: [
            "From Day Two onward, there was a routine.",
            "Morning yoga. Breakfast. Mentoring. Building. Testing. Presentation. Questions. More building. And then more building.",
            "At night, there were also jamming sessions. There was a small window of free time late at night.",
            "But many people weren't sleeping. Especially us. 😂",
            "We had come there to compete. And the atmosphere made it difficult to simply switch off."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_working_together_img1.jpeg`,
            alt: "The team working together during the SIH Grand Finale"
          }
        },
        {
          heading: "Building Under Pressure",
          paragraphs: [
            "We developed the prototype further. We got our components. We worked on the mechanism. We designed the casing. We started integrating everything.",
            "At one point, we even decided to make a PCB.",
            "Looking back... we probably shouldn't have. 😂",
            "The breadboard system already worked. We knew the circuit. But we wanted the prototype to look more complete.",
            "So we started soldering. Testing. Connecting. Troubleshooting.",
            "And suddenly, we had created another problem for ourselves. It took time. It added complexity. And it distracted us from the bigger goal.",
            "That became another lesson:"
          ],
          quote: "A better prototype isn't always the more complicated prototype.",
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_working_together_img2.jpeg`,
            alt: "Building and troubleshooting the prototype under pressure"
          }
        },
        {
          heading: "The Market Strategy Problem",
          paragraphs: [
            "Another important mistake came during one of the judging rounds.",
            "The judges asked about our market strategy. We actually had the research. We had the information. We had another PPT with the details.",
            "But there was one small problem. That PPT was on another laptop. And that laptop wasn't with us at the right moment.",
            "By the time we tried to show it, the time was already almost over.",
            "The judges understood that we had the information. But they made something very clear:"
          ],
          quote: "Having the information isn't enough. You have to show it when it matters.",
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_mentoring_rounds_img3.jpeg`,
            alt: "Another judging round at the SIH Grand Finale"
          }
        },
        {
          heading: "Make It Look Like Something We Can Buy",
          paragraphs: [
            "As the final stages approached, the judges wanted more.",
            "They didn't just want electronics. They wanted a prototype that looked closer to an actual product.",
            "So we went into full build mode. 3D printing. Casing. Assembly. Testing. Integration.",
            "The pressure became intense.",
            "The three of us who were working closely on the hardware, presentation, and final prototype were constantly around the project.",
            "We worked in shifts. Three people would work. Then another three would take over.",
            "And somehow, that cycle kept the project moving."
          ]
        },
        {
          heading: "The Fourth Night",
          paragraphs: [
            "By the fourth night, we were exhausted. But we were close.",
            "The prototype was finally coming together. We reached a point where we could say: 'Okay. This is working.'",
            "And then we made a decision. We could continue working through the night. Or we could sleep.",
            "Me and my hardware teammate looked at each other. And chose sleep. 😂",
            "We went to sleep properly. Not because we didn't care. Because we wanted to wake up fresh.",
            "The final day was coming. And we wanted to be ready."
          ]
        },
        {
          heading: "Final Day",
          paragraphs: [
            "We woke up. Got ready. Put on our official SIH T-shirts.",
            "The prototype was ready. The mobile application was ready. The voice module was ready. The switches were ready.",
            "Everyone knew their role. For a moment, we felt ready to shine.",
            "After everything we had gone through, this was the moment.",
            "The final judging began. Our presenter started. The judges were interested. The presentation was moving well.",
            "Then, somewhere in the middle, her voice started fumbling.",
            "We looked at each other. And we knew.",
            "It was time to take over.",
            "I stepped in. I explained Dextra. The problem. The solution. The prototype. The mobile application. The voice module. The working.",
            "Then another teammate joined in. Our hardware teammate was wearing the prototype.",
            "The judges tested it. They gave him an object. They asked him to hold it. The mechanism responded. The hand responded.",
            "The prototype worked.",
            "For those few minutes, everything we had built came together.",
            "We answered their questions. We demonstrated the system.",
            "And eventually... it was over."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_finale_img1.jpeg`,
            alt: "Demonstrating the Dextra prototype to the judges on the final day"
          }
        },
        {
          heading: "The Result",
          paragraphs: [
            "We walked away from the final judging.",
            "Nobody said it immediately. But somewhere inside, I think we all knew.",
            "We had done well. But we also knew something was missing.",
            "This wasn't a normal college competition. We had seen teams from across India. Different ideas. Different approaches. Different levels of presentation. Different ways of selling a solution.",
            "One team even approached the judges with something as simple as a leaflet.",
            "And that made us realize something: the competition wasn't only about how much you had built. It was about how clearly you could communicate the value of what you had built.",
            "We had built. We had demonstrated. We had tried our best.",
            "But maybe we hadn't completely sold the idea.",
            "And that difference mattered."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_finale_img2.jpeg`,
            alt: "Final round moments at the SIH Grand Finale"
          }
        },
        {
          heading: "The Name That Never Came",
          paragraphs: [
            "Then came the result announcement.",
            "We knew there were two prizes for each problem statement. So naturally, there was still hope.",
            "Maybe. Just maybe. Our name would come.",
            "The announcements started. One team. Then another.",
            "We waited. And waited.",
            "But our name wasn't called.",
            "Team Dexterist didn't win.",
            "For a few minutes, it hurt. Of course it did.",
            "We had spent so much time on Dextra. We had travelled all the way to the national stage. We had stayed awake. Built. Failed. Fixed. Presented. And hoped.",
            "So walking away without the trophy wasn't easy.",
            "But the competition had given us something that a trophy couldn't."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_group_holding_certi.jpeg`,
            alt: "Team Dexterist with their SIH Grand Finale certificate"
          }
        },
        {
          heading: "The Night After SIH",
          paragraphs: [
            "After the competition ended, we went back to our rooms.",
            "I was frustrated. My roommate was frustrated too.",
            "We were probably among the people who had convinced ourselves the most that we were going to win. Because we had given the project so much of ourselves.",
            "But that night, something interesting happened.",
            "We didn't talk about the project. We didn't analyze the judges. We didn't discuss what went wrong.",
            "We just sat together. Had some food. Talked about each other. Shared stories. Laughed.",
            "And for the first time in days, we weren't Team Dexterist working on Dextra.",
            "We were just six friends.",
            "And honestly, that night is one of the memories I remember most."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_happy_glimps.jpeg`,
            alt: "Six friends together after the competition ended"
          }
        },
        {
          heading: "Leaving Delhi",
          paragraphs: [
            "The next morning was our final day in Delhi.",
            "Our train was in the afternoon. So before leaving, we did some shopping. Took photos. Walked around. And enjoyed the remaining time together.",
            "Because photos are one of the few things that stay with us long after the moment itself is gone.",
            "Then we boarded the train.",
            "Delhi slowly disappeared behind us. And we headed home."
          ]
        },
        {
          heading: "Back to College",
          paragraphs: [
            "The next day, we returned to college.",
            "And this time, it wasn't silent. Everyone wanted to know what happened.",
            "People asked: 'How was it?' 'How was the final?' 'Did you enjoy Delhi?' 'How was the hackathon?'",
            "People wanted to hear everything. They had seen us leave. Now they wanted to know what it felt like to actually be there.",
            "And honestly, that felt good. Because even though we hadn't won, we had something to tell them.",
            "We had experienced something most of us had only seen from outside. We had gone to the national stage. We had competed. We had built. We had learned. And we had come back with stories.",
            "Our HOD also encouraged us not to stop there.",
            "The message was simple: even if SIH didn't end with a trophy, Dextra could still go further.",
            "And it did."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/After_sih_meeting_HOD.jpeg`,
            alt: "Meeting our HOD after returning from the SIH Grand Finale"
          }
        },
        {
          heading: "The Story Didn't End With SIH",
          paragraphs: [
            "The Avishkar journey continued.",
            "Dextra went on to the university level, where it won a gold trophy."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Avishkar_uni_win.png`,
            alt: "Dextra's gold trophy at the Avishkar university-level competition"
          }
        },
        {
          heading: "The Story Didn't End With SIH (continued)",
          paragraphs: [
            "Our presenter later represented the project at the state level of Avishkar. We didn't win at the state level. But reaching that stage itself was something we were proud of.",
            "The same project that had started in our classroom had travelled that far.",
            "We also presented Dextra at DIPEX, reaching the regional level.",
            "We took the same problem statement to the Wardha Innovation competition, where we finished as runner-up.",
            "And I also had the opportunity to receive the PhyTech International Award of Creativity for my contribution and work around the project.",
            "Different competitions. Different stages. Different results.",
            "But the same Dextra. The same journey."
          ],
        },
        {
          heading: "What We Actually Won",
          paragraphs: [
            "When I think about SIH now, I don't think about the result first.",
            "I think about the journey.",
            "The four friends who decided to build something together. The fifth teammate who joined. The sixth member who came into the team when we suddenly needed a new presenter.",
            "The teammate who spent four hours turning seven minutes of footage into one final video. The hardware teammate who stayed close to the prototype. The presenter who joined with almost no preparation time and somehow made the presentation her own.",
            "And all the small moments in between.",
            "The canteen treat. The hotel celebration. The cake. The T-shirts. The hoodies. The ticket booking. The journey from Wardha to Delhi. Exploring Delhi. India Gate. The accommodation. The Domino's night. The morning yoga. The late-night jamming sessions. The engineers from different parts of India somehow communicating in English. 😂",
            "The nervous presentations. The moment I lost my temper and later regretted it. The PCB we probably shouldn't have made. The market presentation stuck on another laptop. The four-hour video.",
            "The bike ride where I heard: 'Bro... we got selected.'",
            "The final prototype. The final judging. The result. And then the train ride home.",
            "We didn't win the Smart India Hackathon. But we gained something that stayed with us.",
            "Friendships. Experience. Confidence. Connections.",
            "And a completely different understanding of what it means to build something with other people."
          ],
          image: {
            path: `${SIH_BLOG_IMG_2}/Sih_happy_group_glimps.jpeg`,
            alt: "Team Dexterist together after the SIH Grand Finale"
          }
        },
        {
          heading: "The Project That Became a Memory",
          paragraphs: [
            "Dextra started as a problem statement.",
            "Then it became an idea. Then a prototype. Then a competition project. Then a project that travelled through multiple competitions and multiple levels.",
            "And somewhere along the way... it became a part of our story.",
            "We still remember that we lost SIH. Of course we do.",
            "But when I think about those days now, the first thing that comes to my mind isn't the result.",
            "It's the happiness. The jokes. The late nights. The friendships. The people we met. The things we learned. And the feeling of building something together.",
            "Because sometimes, you don't get the trophy you wanted.",
            "But you get something that lasts much longer."
          ],
          quote: "We didn't win the national trophy. But we definitely won a story worth remembering."
        }
      ],
      footer:
        "This is Part II of the Dextra story — the road from selection to the SIH Grand Finale, and everywhere Dextra went after.\n\n— Karan Mendhe"
    }
  },
  {
    id: "post-04",
    number: "04",
    title: "The Solar Shift: From Electricity Consumers to Energy Producers",
    excerpt:
      "Rooftop solar is moving from an alternative power source toward a complete household energy system involving generation, storage, smart management, maintenance and the grid.",
    category: "Technical",
    date: "August 2026",
    readingTime: "10 min read",
    content: {
      sections: [
        {
          heading: "From Electricity Consumers to Energy Producers",
          paragraphs: [
            "For decades, the electricity system around an Indian household has been relatively simple: Power plant → Grid → House → Electricity Bill.",
            "We consume electricity, the grid supplies it, and at the end of the month we pay for what we used.",
            "But that model is changing.",
            "In my own surroundings, I can roughly observe five to seven out of ten houses moving towards solar or already using it. That is not a national statistic — it is simply my personal observation. What made me interested was not just the number of rooftops, but what happens when electricity consumption keeps increasing and households start producing part of their own power.",
            "My view is that the next stage of rooftop solar will not be only about adding more panels. It will be about batteries, inverters, smart meters, monitoring, automation, maintenance, grid integration and eventually microgrids."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/rooftop_solar.jpg`,
            alt: "Rooftop solar panels installed on a residential building"
          }
        },
        {
          heading: "India's Solar Transition Is Already Happening",
          paragraphs: [
            "This is not only a future prediction. According to the Ministry of New and Renewable Energy, India's installed solar capacity reached 164.59 GW as of July 31, 2026, including 30.74 GW of grid-connected rooftop solar.",
            "The government is also encouraging residential adoption through PM Surya Ghar: Muft Bijli Yojana. Under the current central subsidy structure, residential consumers receive ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW, with the central subsidy capped at ₹78,000.",
            "For many families, the important question is therefore not whether solar works, but whether the initial investment is affordable. Subsidies, financing options and local installers are making that decision easier for more households."
          ]
        },
        {
          heading: "Why I Think Rooftop Solar Will Keep Growing",
          paragraphs: [
            "My five-year thinking is not that every Indian house will become completely independent from the grid. It is based on a simpler trend: electricity consumption is increasing.",
            "A typical middle-class household can have an air conditioner, refrigerator, television, fans, lighting, washing machine, induction cooktop, water heater, water purifier, computer, smartphones and chargers. As more appliances enter a household, the electricity requirement naturally increases.",
            "From my own observation, an electricity-intensive middle-class household in my surroundings can see a monthly bill of roughly ₹4,000–₹4,500. That is my local observation, not a national average.",
            "As consumption rises, generating at least part of that electricity locally becomes increasingly attractive. That is why I see rooftop solar becoming part of the infrastructure of a house rather than simply another appliance."
          ]
        },
        {
          heading: "A 3 kW Rooftop System",
          paragraphs: [
            "The 3 kW residential system is particularly interesting because it fits into the current subsidy structure. The exact number of panels depends on their individual rating.",
            "For example, 3,000 W ÷ 550 W ≈ 5.45, so a 3 kW system using 550 W modules would require approximately six panels.",
            "A 550 W module can occupy roughly 2.6 square metres, so six panels alone can require around 15–16 square metres of panel area. The actual roof requirement is higher because mounting structures, spacing, access and maintenance clearance also need to be considered.",
            "For a household with limited roof space, higher-efficiency modules can therefore be valuable because they can produce more electricity from approximately the same area."
          ]
        },
        {
          heading: "Solar Is an Energy System, Not Just a Panel",
          paragraphs: [
            "A rooftop installation is more than photovoltaic modules. The panels generate DC electricity, the inverter converts it into usable AC electricity, and the system then manages that electricity between household loads, storage and the grid.",
            "In Maharashtra, rooftop systems can interact with the distribution network through MSEDCL's rooftop-solar and net-metering framework. When a grid-connected system produces more electricity than the household is using, surplus electricity can be exported to the grid under the applicable metering and billing rules. When household demand is higher than solar generation, electricity can be imported from the grid.",
            "In simple terms: solar generation minus household consumption determines whether electricity is available for storage or export, while the grid provides the balancing supply when solar is insufficient."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/Solar_block_diagram_inverter_battery.png`,
            alt: "Solar rooftop system block diagram showing panels, inverter, battery, house and grid"
          }
        },
        {
          heading: "Why I Would Still Keep the Grid Today",
          paragraphs: [
            "If I had ₹2 lakh available today, I would personally consider investing it in a rooftop solar system. But I would probably not add a large battery immediately.",
            "For today's situation, I would rather use a grid-connected system where solar supplies the house and excess electricity interacts with the grid. Solar generation changes with weather and time of day, while the grid remains available when generation is low.",
            "So I do not see the future as eliminating the grid. I see it as reducing our dependence on the grid while making the household capable of generating and managing more of its own electricity."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/solar_grid.jpg`,
            alt: "Solar energy system connected with the electricity grid"
          }
        },
        {
          heading: "The Future: Solar + Battery + Grid",
          paragraphs: [
            "Over the next five to ten years, I expect batteries to become increasingly important. A future household could use solar generation for its immediate loads, charge a battery with excess daytime energy, and export remaining surplus to the grid.",
            "After sunset, the battery could supply household loads. During a power cut, it could also provide backup. If the battery becomes insufficient, the grid can take over.",
            "That gives the battery three practical roles: storing excess daytime solar, supplying electricity after sunset, and providing backup during outages.",
            "Lithium-ion batteries dominate today's market. Within lithium-ion technologies, LFP (lithium iron phosphate) is increasingly important for stationary storage because it generally offers strong cycle life and thermal stability, although it has lower energy density than chemistries such as NMC. For a stationary home battery, safety, lifetime and cost can matter more than maximum energy density.",
            "The future battery does not necessarily have to be a larger version of today's battery. It could become cheaper, safer, longer-lasting and more specifically designed for stationary energy storage."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/solar_battery_inverter.jpg`,
            alt: "Residential solar battery and inverter energy storage system"
          }
        },
        {
          heading: "The Grid Will Have to Change Too",
          paragraphs: [
            "If millions of homes generate solar electricity, the grid will experience a different pattern of demand. During sunny afternoons, solar generation can be high while household demand is moderate. Around sunset, solar generation falls while household demand can rise as people return home, switch on lights, use fans and air conditioners, cook and potentially charge electric vehicles.",
            "This creates the familiar duck-curve or net-load challenge associated with high solar penetration.",
            "The answer is not necessarily to reduce solar generation. Excess electricity can instead be stored, exported, used for flexible daytime loads, used to charge batteries or EVs, supported by stronger transmission and managed through smarter grid systems.",
            "To me, this is an important shift in thinking: excess solar is not automatically a failure of solar. It is a signal that storage, transmission and grid management need to become smarter."
          ]
        },
        {
          heading: "Solar Efficiency Is Still Moving Forward",
          paragraphs: [
            "One correction to my earlier understanding is that modern photovoltaic modules should not simply be described as a 15% efficient technology. Commercial modules today are commonly in the high-teens to low-twenties in module efficiency, depending on the technology and product.",
            "NREL research also shows that photovoltaic modules gradually lose performance as they age. A commonly used planning range for degradation is around 0.5–1% per year, although actual degradation depends on module technology, environment and operating conditions.",
            "That means a panel's 25-year life does not mean it produces exactly the same amount of electricity for 25 years. What matters is the useful energy output across its operating life and how well the system is maintained.",
            "At the same time, technologies such as TOPCon, silicon heterojunction, IBC and tandem cells are pushing photovoltaic efficiency higher. NREL technology and cost modelling has considered module efficiencies approaching 25%, while research and industry roadmaps explore even higher values for advanced architectures.",
            "So my expectation that future rooftop systems could reach around 25% module efficiency is consistent with the direction of current photovoltaic research. If better panels become affordable, the same rooftop area could potentially produce substantially more electricity."
          ]
        },
        {
          heading: "Maintenance and Monitoring Could Become Smarter",
          paragraphs: [
            "Solar panels can operate for decades, but they cannot simply be installed and forgotten. Dust, heat, weather exposure and component ageing can reduce performance.",
            "Today, cleaning can involve manual work or relatively simple water-based systems. In the future, I can see automated water-spraying systems becoming more common for households, while large solar farms could increasingly use robotic or automated cleaning systems.",
            "Monitoring is another major opportunity. A homeowner should eventually be able to see, in near real time, how much solar energy was generated, how much was consumed, how much went into the battery, how much was exported and how much was imported.",
            "That would turn solar from a passive generator into an intelligent energy-management system."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/solar_manual_cleaning.jpg`,
            alt: "Manual cleaning and maintenance of rooftop solar panels"
          }
        },
        {
          heading: "From Rooftops to Microgrids",
          paragraphs: [
            "Solar does not have to stop at individual houses. A community can also generate and manage electricity locally.",
            "One documented example is the Lakshmipura-Jharla solar microgrid project in Rajasthan, which demonstrates how local solar generation can be combined with local electricity distribution and energy-efficient appliances for rural households.",
            "At a completely different scale, Bhadla Solar Park in Rajasthan represents large-scale solar generation feeding the wider electricity system. Its arid location and very large installed capacity make it one of India's best-known solar developments.",
            "These examples show two different directions: a microgrid focuses on local generation, local distribution and local control, while a solar park focuses on large-scale generation connected to the wider power system.",
            "The common idea is that electricity generation is becoming increasingly renewable and, in some applications, increasingly distributed."
          ],
          image: {
            path: `${SOLAR_BLOG_IMG}/rajasthan_solar_park_example.jpg`,
            alt: "Large-scale solar development in Rajasthan, representing India's solar expansion"
          }
        },
        {
          heading: "What Happens to Coal and Other Energy Sources?",
          paragraphs: [
            "If solar and other renewable sources continue to expand, the role of coal in electricity generation can gradually decline. That does not mean coal plants disappear immediately. India's electricity demand is still growing, and reliable power is still required.",
            "However, every additional unit of electricity generated from renewable sources can reduce the amount of fossil fuel generation required elsewhere in the system, depending on grid conditions and demand.",
            "I also do not see the future as Solar versus Everything Else. A more realistic energy system is likely to combine solar, wind, hydro, nuclear, storage, transmission and smart-grid technologies."
          ]
        },
        {
          heading: "EVs Will Become Part of This Energy System Too",
          paragraphs: [
            "Electric vehicles are another piece of the future energy system. There is growing interest in using EV batteries for grid-support applications such as vehicle-to-grid operation.",
            "But battery degradation needs to be considered. An EV battery has a finite degradation profile, and additional cycling for grid services could affect long-term battery health. That does not make vehicle-to-grid technology a bad idea; it means the economics need to answer an important question: who pays for the additional battery degradation?",
            "If that problem is solved properly, EVs could eventually become another distributed storage resource alongside stationary batteries."
          ]
        },
        {
          heading: "Solar Will Create More Than Electricity",
          paragraphs: [
            "A large-scale transition will also create work across the energy ecosystem. Installation technicians, electrical engineers, battery specialists, inverter technicians, monitoring specialists, maintenance workers, cleaning services, recycling professionals, software developers, grid-integration engineers and manufacturing workers will all have roles to play.",
            "Local installers are especially important because they turn national policy into an actual working system on an ordinary person's rooftop.",
            "As adoption grows, I expect the scope of these jobs to expand from installation into monitoring, maintenance, automation, storage and grid management."
          ]
        },
        {
          heading: "What I Think the Future Household Will Look Like",
          paragraphs: [
            "I do not imagine every Indian house disconnecting from the grid. I imagine something more practical: Rooftop Solar + Smart Inverter + Battery + Smart Meter + Grid Connection.",
            "The system could automatically route electricity between generation, storage, consumption and the grid based on real-time conditions instead of requiring the homeowner to make every decision manually.",
            "The household would no longer simply buy electricity. It would generate, store, manage, consume and potentially export electricity."
          ]
        },
        {
          heading: "The Biggest Change Isn't the Solar Panel",
          paragraphs: [
            "For me, the biggest change solar energy can bring to an ordinary Indian household is not simply a lower electricity bill. It is reduced dependence on externally generated electricity.",
            "Saving money will probably remain the first reason many people install solar. But over the long run, I do not think the value should be measured only in rupees.",
            "A rooftop system can operate for decades. During that time, electricity demand will change, battery technology will evolve, photovoltaic efficiency will improve, and the grid will become smarter.",
            "That is why I see solar less as a short-term investment and more as an adaptation to the way the energy system is changing."
          ]
        },
        {
          heading: "Conclusion",
          paragraphs: [
            "The traditional electricity model was simple: Generate → Transmit → Consume.",
            "The emerging model is more complicated: Generate → Store → Manage → Consume → Export.",
            "And I think that is the real solar shift.",
            "The solar panel is only the beginning. Better batteries, smarter inverters, intelligent monitoring, automated maintenance, stronger grid integration, microgrids, EVs and advanced storage are all pieces of the same energy system.",
            "There will be battery costs, maintenance requirements, grid-management problems, recycling questions and technology replacement. I do not see those challenges as reasons to slow the transition. I see them as engineering problems waiting to be solved.",
            "The Sun is not going anywhere. Our demand for electricity is not going anywhere either. So the real question is not whether solar energy has a future. The real question is how intelligently we build that future."
          ],
          quote: "Generate → Store → Manage → Consume → Export",
        }
      ],
      footer:
               "This is my technical overview of where I think solar energy is heading — from rooftop generation and grid-connected systems toward smarter, more distributed and better-managed energy systems. — Karan Mendhe"
    }
  },
];

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync selectedCategory/selectedPostId with the URL. Runs once on mount
  // (so a direct link or a refresh on /blog/category/:id or
  // /blog/post/:id lands on the right view) and again on every popstate
  // (native back/forward, or a programmatic navigate() elsewhere).
  useEffect(() => {
    const applyRouteFromUrl = () => {
      const path = window.location.pathname;

      const postMatch = path.match(/^\/blog\/post\/([^/]+)\/?$/);
      if (postMatch) {
        const post = BLOG_POSTS.find((p) => p.id === postMatch[1]);
        setSelectedPostId(post ? post.id : null);
        setSelectedCategory(post ? post.category : null);
        return;
      }

      const categoryMatch = path.match(/^\/blog\/category\/([^/]+)\/?$/);
      if (categoryMatch) {
        const cat = CATEGORIES.find((c) => c.id === categoryMatch[1]);
        setSelectedPostId(null);
        setSelectedCategory(cat ? cat.name : null);
        return;
      }

      setSelectedPostId(null);
      setSelectedCategory(null);
    };

    applyRouteFromUrl();
    return onRouteChange(applyRouteFromUrl);
  }, []);

  const selectedPost = selectedPostId
    ? BLOG_POSTS.find((post) => post.id === selectedPostId)
    : null;

  const filteredPosts = selectedCategory
    ? BLOG_POSTS.filter((post) => post.category === selectedCategory)
    : [];

  const categoryInfo = selectedCategory
    ? CATEGORIES.find((cat) => cat.name === selectedCategory)
    : null;

  return (
    <div className="blog-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .blog-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 80% 10%, rgba(37, 99, 235, 0.12), transparent 30%),
            radial-gradient(circle at 10% 40%, rgba(14, 165, 233, 0.08), transparent 28%),
            #070b12;
          color: #f8fafc;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding-bottom: 80px;
        }

        .blog-container {
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto;
        }

        .blog-nav {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        .blog-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .blog-brand-mark {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(135deg, #38bdf8, #2563eb);
          color: white;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.25);
        }

        .back-button {
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: rgba(15, 23, 42, 0.55);
          color: #cbd5e1;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.25s ease;
        }

        .back-button:hover {
          color: white;
          border-color: rgba(56, 189, 248, 0.5);
          transform: translateY(-2px);
          background: rgba(30, 41, 59, 0.8);
        }

        .blog-hero {
          padding: 90px 0 55px;
          max-width: 850px;
        }

        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #38bdf8;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .blog-eyebrow::before {
          content: "";
          width: 28px;
          height: 1px;
          background: #38bdf8;
        }

        .blog-title {
          margin: 0;
          font-size: clamp(42px, 7vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 800;
        }

        .blog-title span {
          background: linear-gradient(90deg, #f8fafc, #60a5fa, #38bdf8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .blog-subtitle {
          margin: 25px 0 0;
          color: #94a3b8;
          font-size: 18px;
          line-height: 1.75;
          max-width: 720px;
        }
          .blog-schedule {
  display: inline-flex;
  align-items: center;
  margin-top: 18px;
  padding: 8px 14px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
  color: #7dd3fc;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          margin-top: 60px;
        }

        .category-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
          padding: 40px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 240px;
          justify-content: space-between;
        }

        .category-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #38bdf8,
            #2563eb,
            transparent
          );
        }

        .category-card:hover {
          border-color: rgba(56, 189, 248, 0.3);
          background: rgba(15, 23, 42, 0.7);
          box-shadow: 0 25px 80px rgba(37, 99, 235, 0.15);
          transform: translateY(-5px);
        }

        .category-card-title {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.3;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #f8fafc;
        }

        .category-card-description {
          margin: 0;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.7;
        }

        .category-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
          margin-top: 20px;
          transition: gap 0.2s ease;
        }

        .category-card:hover .category-card-arrow {
          gap: 12px;
        }

        .category-card-arrow svg {
          width: 17px;
          height: 17px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          margin-top: 48px;
        }

        .blog-post-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
          padding: 32px;
          display: flex;
          flex-direction: column;
          min-height: 390px;
          transition: all 0.3s ease;
        }

        .blog-post-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #38bdf8,
            #2563eb,
            transparent
          );
        }

        .blog-post-card:hover {
          border-color: rgba(56, 189, 248, 0.3);
          background: rgba(15, 23, 42, 0.7);
          box-shadow: 0 25px 80px rgba(37, 99, 235, 0.15);
          transform: translateY(-5px);
        }

        .blog-post-number {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 16px;
          font-family: "Courier New", monospace;
        }

        .blog-post-title {
          margin: 0 0 16px;
          font-size: 24px;
          line-height: 1.3;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #f8fafc;
        }

        .blog-post-excerpt {
          margin: 0 0 24px;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.7;
          flex-grow: 1;
        }

        .blog-post-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 16px;
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          font-size: 12px;
        }

        .blog-post-category {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: 600;
        }

        .blog-post-date,
        .blog-post-time {
          color: #64748b;
          font-size: 12px;
        }

        .blog-post-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .blog-post-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #38bdf8;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .blog-post-link:hover {
          gap: 11px;
          color: #7dd3fc;
        }

        .blog-post-link svg {
          width: 17px;
          height: 17px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        .empty-category-wrap {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        .empty-category-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
          padding: 48px 44px;
          max-width: 420px;
          width: 100%;
          text-align: center;
        }

        .empty-category-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #38bdf8,
            #2563eb,
            transparent
          );
        }

        .empty-category-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 14px;
          font-family: "Courier New", monospace;
        }

        .empty-category-title {
          margin: 0 0 14px;
          font-size: 24px;
          line-height: 1.3;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #f8fafc;
        }

        .empty-category-text {
          margin: 0;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.7;
        }

        .back-to-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          margin: 55px 0 28px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
        }

        .back-to-button:hover {
          gap: 12px;
          color: #7dd3fc;
        }

        .back-to-button svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        .category-header {
          padding: 55px 0 0;
          max-width: 850px;
        }

        .category-title {
          margin: 0;
          font-size: clamp(38px, 7vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.055em;
          font-weight: 800;
          color: #f8fafc;
        }

        .category-description {
          margin: 20px 0 0;
          color: #94a3b8;
          font-size: 16px;
          line-height: 1.7;
          max-width: 700px;
        }

        .article-card {
          position: relative;
          overflow: hidden;
          margin-top: 0;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
        }

        .article-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #38bdf8,
            #2563eb,
            transparent
          );
        }

        .article-header {
          padding: 48px 52px 34px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          color: #64748b;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .article-meta strong {
          color: #38bdf8;
          font-weight: 600;
        }

        .article-heading {
          margin: 0;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.04em;
        }

        .article-intro {
          margin: 22px 0 0;
          color: #94a3b8;
          font-size: 18px;
          line-height: 1.8;
          max-width: 800px;
        }

        .article-body {
          padding: 46px 52px 58px;
          max-width: 920px;
        }

        .article-body h2 {
          margin: 42px 0 16px;
          font-size: 27px;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }

        .article-body h2:first-child {
          margin-top: 0;
        }

        .article-body p {
          margin: 0 0 21px;
          color: #cbd5e1;
          font-size: 16px;
          line-height: 1.95;
        }

        .article-body .quote {
          margin: 32px 0;
          padding: 24px 26px;
          border-left: 3px solid #38bdf8;
          border-radius: 0 14px 14px 0;
          background: rgba(30, 41, 59, 0.55);
          color: #e2e8f0;
          font-size: 18px;
          line-height: 1.75;
          font-style: italic;
        }

        .article-image {
          margin: 32px 0;
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          overflow: hidden;
        }

        .article-image img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          background: rgba(15, 23, 42, 0.55);
        }

        .article-footer {
          margin-top: 36px;
          padding-top: 26px;
          border-top: 1px solid rgba(148, 163, 184, 0.12);
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.8;
          white-space: pre-line;
        }

        .blog-footer {
          text-align: center;
          color: #475569;
          font-size: 13px;
          margin-top: 60px;
        }

        @media (max-width: 900px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 50px;
          }

          .category-card {
            min-height: 180px;
            padding: 32px;
          }

          .blog-posts-grid {
            grid-template-columns: 1fr;
          }

          .blog-post-card {
            min-height: auto;
          }
        }

        @media (max-width: 700px) {
          .blog-container {
            width: min(100% - 24px, 1100px);
          }

          .blog-nav {
            height: 70px;
          }

          .blog-brand {
            font-size: 16px;
          }

          .blog-brand-mark {
            width: 34px;
            height: 34px;
          }

          .back-button {
            padding: 8px 12px;
            font-size: 13px;
          }

          .blog-hero {
            padding: 60px 0 35px;
          }

          .blog-title {
            font-size: clamp(38px, 12vw, 58px);
          }

          .blog-subtitle {
            font-size: 16px;
            line-height: 1.7;
          }
            .blog-schedule {
  margin-top: 14px;
  padding: 7px 12px;
  font-size: 12px;
}

          .category-grid {
            gap: 16px;
            margin-top: 40px;
          }

          .category-card {
            padding: 28px;
            min-height: 160px;
            border-radius: 20px;
          }

          .category-card-title {
            font-size: 22px;
          }

          .category-card-description {
            font-size: 14px;
          }

          .blog-posts-grid {
            gap: 16px;
            margin-top: 35px;
          }

          .blog-post-card {
            padding: 25px;
            border-radius: 20px;
          }

          .blog-post-title {
            font-size: 22px;
          }

          .empty-category-card {
            padding: 36px 26px;
            border-radius: 20px;
          }

          .empty-category-title {
            font-size: 21px;
          }

          .empty-category-text {
            font-size: 14px;
          }

          .article-card {
            border-radius: 18px;
          }

          .article-header,
          .article-body {
            padding-left: 22px;
            padding-right: 22px;
          }

          .article-header {
            padding-top: 30px;
            padding-bottom: 25px;
          }

          .article-body {
            padding-top: 32px;
          }

          .article-heading {
            font-size: 34px;
          }

          .article-intro {
            font-size: 16px;
          }

          .article-body h2 {
            font-size: 23px;
          }

          .article-body p {
            font-size: 15px;
            line-height: 1.85;
          }

          .article-body .quote {
            font-size: 16px;
            padding: 20px;
          }

          .article-image {
            margin: 24px 0;
            border-radius: 14px;
          }

          .article-footer {
            font-size: 13px;
          }

          .back-to-button {
            margin-top: 35px;
          }

          .category-header {
            padding-top: 45px;
          }

          .category-title {
            font-size: 32px;
          }

          .category-description {
            font-size: 15px;
          }
        }

        @media (max-width: 430px) {
          .blog-brand span {
            font-size: 15px;
          }

          .back-button {
            padding: 8px 10px;
          }

          .blog-title {
            font-size: 38px;
          }

          .blog-post-card {
            padding: 22px;
          }

          .article-heading {
            font-size: 30px;
          }

          .category-card {
            padding: 24px;
            min-height: 150px;
          }

          .category-card-title {
            font-size: 20px;
          }

          .category-card-description {
            font-size: 13px;
            line-height: 1.6;
          }

          .category-title {
            font-size: 28px;
          }

          .article-body h2 {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="blog-container">
        <nav className="blog-nav">
          <div className="blog-brand">
            <div className="blog-brand-mark">KM</div>
            <span>Karan Mendhe</span>
          </div>

          <button
            className="back-button"
            onClick={onBack || (() => window.history.back())}
          >
            ← Back to Portfolio
          </button>
        </nav>

        {!selectedPost ? (
          <>
            {!selectedCategory ? (
              <>
                <header className="blog-hero">
                  <div className="blog-eyebrow">Karan's Blog</div>

                  <h1 className="blog-title">
                    Thoughts, <span>Experiences</span> &amp; The Journey
                  </h1>

                  <p className="blog-subtitle">
                    A place where I document the experiences, lessons, projects,
                    experiments and thoughts that shape my journey as an engineer.
                  </p>
                  <div className="blog-schedule">
  New blog every Sunday
</div>
                </header>

                <main>
                  <div className="category-grid">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        className="category-card"
                        onClick={() => navigate(`/blog/category/${category.id}`)}
                      >
                        <div>
                          <h3 className="category-card-title">
                            {category.name}
                          </h3>
                          <p className="category-card-description">
                            {category.description}
                          </p>
                        </div>
                        <div className="category-card-arrow">
                          Explore
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </main>
              </>
            ) : (
              <>
                <button
                  className="back-to-button"
                  onClick={() => {
                    goBack();
                    window.scrollTo(0, 0);
                  }}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                  Back to Categories
                </button>

                <header className="category-header">
                  <h2 className="category-title">
                    {selectedCategory}
                  </h2>
                  <p className="category-description">
                    {categoryInfo?.description}
                  </p>
                </header>

                <main>
                  {filteredPosts.length > 0 ? (
                    <div className="blog-posts-grid">
                      {filteredPosts.map((post) => (
                        <article className="blog-post-card" key={post.id}>
                          <div className="blog-post-number">
                            Post {post.number}
                          </div>

                          <h3 className="blog-post-title">
                            {post.title}
                          </h3>

                          <p className="blog-post-excerpt">
                            {post.excerpt}
                          </p>

                          <div className="blog-post-meta">
                            <span className="blog-post-category">
                              {post.category}
                            </span>

                            <span className="blog-post-date">
                              {post.date}
                            </span>

                            <span className="blog-post-time">
                              {post.readingTime}
                            </span>
                          </div>

                          <div className="blog-post-footer">
                            <button
                              className="blog-post-link"
                              onClick={() => {
                                navigate(`/blog/post/${post.id}`);
                                window.scrollTo(0, 0);
                              }}
                            >
                              Read Article

                              <svg viewBox="0 0 24 24">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                              </svg>
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-category-wrap">
                      <div className="empty-category-card">
                        <div className="empty-category-eyebrow">
                          Coming Soon
                        </div>
                        <h3 className="empty-category-title">
                          {selectedCategory}
                        </h3>
                        <p className="empty-category-text">
                          New stories are being written. Check back soon.
                        </p>
                      </div>
                    </div>
                  )}
                </main>
              </>
            )}
          </>
        ) : (
          <>
            <button
              className="back-to-button"
              onClick={() => {
                goBack();
                window.scrollTo(0, 0);
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to Posts
            </button>

            <article className="article-card">
              <header className="article-header">
                <div className="article-meta">
                  <span>
                    <strong>{selectedPost.category}</strong>
                  </span>

                  <span>{selectedPost.date}</span>

                  <span>•</span>

                  <span>{selectedPost.readingTime}</span>
                </div>

                <h2 className="article-heading">
                  {selectedPost.title}
                </h2>

                <p className="article-intro">
                  {selectedPost.excerpt}
                </p>
              </header>

              <div className="article-body">
                {selectedPost.content.sections.map((section, idx) => (
  <div key={idx}>
    {!section.heading.includes("(continued)") && (
      <h2>{section.heading}</h2>
    )}

                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>
                        {paragraph}
                      </p>
                    ))}

                    {section.quote && (
                      <div className="quote">
                        "{section.quote}"
                      </div>
                    )}

                    {section.image && (
                      <div className="article-image">
                        <img
                          src={section.image.path}
                          alt={section.image.alt}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="article-footer">
                  {selectedPost.content.footer}
                </div>
              </div>
            </article>
          </>
        )}

        <footer className="blog-footer">
          © 2026 Karan Mendhe · Electrical Engineering · Building,
          learning, and documenting the journey.
        </footer>
      </div>
    </div>
  );
};

export default Blog;