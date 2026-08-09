import React, { useState } from "react";

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
   }
];

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
                </header>

                <main>
                  <div className="category-grid">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        className="category-card"
                        onClick={() => setSelectedCategory(category.name)}
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
                    setSelectedCategory(null);
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
                                setSelectedPostId(post.id);
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
                setSelectedPostId(null);
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
                    <h2>{section.heading}</h2>

                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>
                        {paragraph}
                      </p>
                    ))}

                    {section.image && (
                      <div className="article-image">
                        <img
                          src={section.image.path}
                          alt={section.image.alt}
                        />
                      </div>
                    )}

                    {section.quote && (
                      <div className="quote">
                        "{section.quote}"
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