/* ------------------------------------------------------------------
   The Event XChange Show — shared podcast data for the Episodes,
   Episode, Be a Guest and Subscribe pages.

   Developers:
   - Replace the placeholder guest details and set `audio` to each
     episode's real MP3 URL. Without it the player uses preview audio.
   - Set `formEndpoint` / `newsletterEndpoint` to deliver submissions.
     While they are empty, forms run in preview mode (nothing is sent).
------------------------------------------------------------------- */

export type Chapter = { time: string; title: string };
export type TranscriptLine = { speaker: string; line: string };

export type Guest = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type Episode = {
  id: string;
  number: number;
  /** Release date, YYYY-MM-DD */
  date: string;
  /** Minutes */
  duration: number;
  format: string;
  topics: string[];
  title: string;
  summary: string;
  image: string;
  guest: Guest;
  takeaway: string;
  notes: string[];
  chapters: Chapter[];
  quote: string;
  transcript: TranscriptLine[];
  /** Real MP3 URL; empty = preview audio */
  audio: string;
};

export const PODCAST_CONFIG = {
  formEndpoint: "", // e.g. Formspree / an API route for the guest forms
  newsletterEndpoint: "", // e.g. your email provider's subscribe endpoint
  contactEmail: "hello@eventxchangeshow.com", // TODO: confirm the show's inbox with the client
  previewAudio: "/audio/sample-audio.mp3",
  platforms: {
    apple: "https://podcasts.apple.com",
    spotify: "https://spotify.com",
    youtube: "https://youtube.com",
    amazon: "https://music.amazon.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export const HOSTS = [
  { id: "ace", name: "Ace Johnson", role: "Co-host · Producer · CEO", image: "/images/home/conversation/ace.png" },
  { id: "suley", name: "Suley Usman", role: "Co-host · Producer · CEO", image: "/images/home/conversation/usman.png" },
] as const;

/** "Which best describes you?" options (agreed in the client meeting). */
export const GUEST_PROFILES = [
  "Event planner",
  "Event marketer",
  "Event agency",
  "Production company",
  "AV company",
  "Venue / CVB",
  "Other",
] as const;

export const HEARD_ABOUT_OPTIONS = [
  "Listened to an episode",
  "LinkedIn",
  "A colleague",
  "An industry event",
  "Other",
] as const;

/**
 * Topic categories for the pitch and suggest-a-guest forms.
 * PLACEHOLDER: the final list (4 categories, ~23 topics) comes from the client.
 */
export const TOPIC_CATEGORIES: { name: string; topics: string[] }[] = [
  {
    name: "Venue & site selection",
    topics: ["In-house AV", "Contracts & negotiation", "RFPs & proposals", "Destinations & CVBs"],
  },
  {
    name: "Show flow & production",
    topics: ["Run of show", "Show calling", "Rehearsals", "Green rooms", "Hybrid & virtual"],
  },
  {
    name: "Business",
    topics: ["Budgets", "Measurement & ROI", "Stakeholders", "Leadership", "Careers"],
  },
  {
    name: "Content & audience",
    topics: ["Speakers & content", "Engagement", "Design & creative", "Attendee experience"],
  },
];

export const EPISODES: Episode[] = [
  {
    "id": "ep-01",
    "number": 1,
    "date": "2026-11-04",
    "duration": 32,
    "format": "Interview",
    "topics": [
      "Stakeholders",
      "Leadership"
    ],
    "title": "Building buy-in across stakeholders",
    "summary": "How to bring the right people together, navigate competing priorities and move an event forward.",
    "image": "/images/home/podcast/featured.png",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest01.jpg",
      "bio": "A corporate events lead who has spent a decade getting finance, marketing and the C-suite to agree on one program."
    },
    "takeaway": "Before the first planning meeting, write down what each stakeholder needs to be able to say afterward. Design the agenda around those sentences.",
    "notes": [
      "Every event has more owners than it has budget lines. In our first episode we sit down with a planner who has learned to treat stakeholder alignment as a design problem, not a politics problem.",
      "We talk about the kickoff meeting that sets the tone, how to spot the quiet decision-maker in the room, and what to do when two executives want opposite things from the same general session."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Welcome to the show"
      },
      {
        "time": "02:40",
        "title": "Who really owns an event?"
      },
      {
        "time": "09:15",
        "title": "The kickoff meeting that sets the tone"
      },
      {
        "time": "16:30",
        "title": "When two executives disagree"
      },
      {
        "time": "24:05",
        "title": "Saying no without losing the room"
      },
      {
        "time": "29:40",
        "title": "One thing to take back"
      }
    ],
    "quote": "Alignment isn't a meeting. It's a habit you build one conversation at a time.",
    "transcript": [
      {
        "speaker": "Ace",
        "line": "Let's start with the obvious question: who actually owns an event inside a company?"
      },
      {
        "speaker": "Guest",
        "line": "Honestly? Everyone thinks they do. Marketing owns the message, finance owns the money, sales owns the pipeline, and the planner owns the consequences."
      },
      {
        "speaker": "Suley",
        "line": "That's the line of the episode already."
      },
      {
        "speaker": "Guest",
        "line": "The shift for me was realising my job wasn't to make everyone happy. It was to make sure everyone could explain why the event mattered in one sentence."
      },
      {
        "speaker": "Ace",
        "line": "So how do you get that sentence out of people?"
      },
      {
        "speaker": "Guest",
        "line": "I ask it directly at kickoff. 'When this is over, what do you need to be able to tell your boss?' Then I write every answer on the wall."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-02",
    "number": 2,
    "date": "2026-11-04",
    "duration": 38,
    "format": "Interview",
    "topics": [
      "Creative",
      "Production"
    ],
    "title": "From idea to an incredible event",
    "summary": "The decisions, collaboration and creative thinking behind memorable live experiences.",
    "image": "/images/home/podcast/ep2.png",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest02.jpg",
      "bio": "An experience designer who moves between agency creative rooms and the production floor."
    },
    "takeaway": "Protect one bold idea per event and let everything else be practical. Programs that try to be bold everywhere end up memorable nowhere.",
    "notes": [
      "Where do great event ideas actually come from, and how do they survive procurement, legal and a venue walk-through?",
      "Our guest walks us through a recent program from the first napkin sketch to show day, including the idea they had to kill and the one they fought to keep."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "03:10",
        "title": "The napkin sketch"
      },
      {
        "time": "11:20",
        "title": "Briefing production early"
      },
      {
        "time": "19:45",
        "title": "The idea we had to kill"
      },
      {
        "time": "27:30",
        "title": "Show day surprises"
      },
      {
        "time": "34:50",
        "title": "One thing to take back"
      }
    ],
    "quote": "The best creative brief is a problem the audience actually has.",
    "transcript": [
      {
        "speaker": "Suley",
        "line": "Take us back to the very first moment of that program."
      },
      {
        "speaker": "Guest",
        "line": "It started with a complaint, not an idea. Attendees said the previous year felt like watching TV in a ballroom."
      },
      {
        "speaker": "Ace",
        "line": "That's painfully familiar."
      },
      {
        "speaker": "Guest",
        "line": "So the brief became: make 3,000 people feel like participants. Everything else followed from that one sentence."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-03",
    "number": 3,
    "date": "2026-11-04",
    "duration": 29,
    "format": "Interview",
    "topics": [
      "Career",
      "Lessons learned"
    ],
    "title": "What I wish I knew at the start.",
    "summary": "A planner looks back on the first conference that went sideways, the moment that changed everything.",
    "image": "/images/home/podcast/ep3.png",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest03.jpg",
      "bio": "An association planner who started as a registration temp and now runs a 6,000-person annual meeting."
    },
    "takeaway": "Write the 'what went wrong' notes within 48 hours, while it still stings. That document will teach you more than any certification.",
    "notes": [
      "Everyone has a first conference that went sideways. Our guest's involved a double-booked ballroom, a keynote stuck at the airport, and a lesson about asking for help early.",
      "A candid, often funny conversation for early-career planners and a useful reminder for the veterans."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "02:05",
        "title": "The registration desk years"
      },
      {
        "time": "08:40",
        "title": "The conference that went sideways"
      },
      {
        "time": "15:55",
        "title": "Asking for help early"
      },
      {
        "time": "22:10",
        "title": "Advice for year one"
      },
      {
        "time": "26:30",
        "title": "One thing to take back"
      }
    ],
    "quote": "Nobody remembers that something broke. They remember how calm you were when it did.",
    "transcript": [
      {
        "speaker": "Ace",
        "line": "So what happened that morning?"
      },
      {
        "speaker": "Guest",
        "line": "I walked into the ballroom at 6 a.m. and there was a wedding brunch being set up. In our room. For our general session."
      },
      {
        "speaker": "Suley",
        "line": "Oh no."
      },
      {
        "speaker": "Guest",
        "line": "Oh yes. And the thing I wish I'd known is that the hotel wanted to fix it as badly as I did. I didn't need to fight. I needed to ask."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-04",
    "number": 4,
    "date": "2026-11-11",
    "duration": 34,
    "format": "Case study",
    "topics": [
      "Budget",
      "Stakeholders"
    ],
    "title": "When the budget gets cut in week six",
    "summary": "A mid-planning budget cut, the trade-offs that followed and how the event came out better for it.",
    "image": "/images/episodes/ep04.jpg",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest04.jpg",
      "bio": "A procurement-savvy planner who has rebuilt more than one program around a smaller number."
    },
    "takeaway": "Keep a ranked 'cut list' from day one. When the budget changes, you make decisions from a plan instead of from panic.",
    "notes": [
      "Six weeks into planning, finance takes 30% off the top. What do you protect, what do you renegotiate and how do you tell your stakeholders?",
      "A practical case study with real numbers, real vendor conversations and a surprisingly positive ending."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "03:30",
        "title": "The email from finance"
      },
      {
        "time": "10:05",
        "title": "Building the cut list"
      },
      {
        "time": "17:40",
        "title": "Renegotiating with vendors"
      },
      {
        "time": "25:15",
        "title": "Telling stakeholders"
      },
      {
        "time": "31:00",
        "title": "One thing to take back"
      }
    ],
    "quote": "A smaller budget forces you to decide what the event is really for.",
    "transcript": [
      {
        "speaker": "Suley",
        "line": "How did you find out?"
      },
      {
        "speaker": "Guest",
        "line": "A calendar invite titled 'quick sync'. Nothing good has ever come from a 'quick sync'."
      },
      {
        "speaker": "Ace",
        "line": "Universal truth."
      },
      {
        "speaker": "Guest",
        "line": "But because we'd ranked our line items in week one, the conversation took twenty minutes instead of two weeks."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-05",
    "number": 5,
    "date": "2026-11-18",
    "duration": 41,
    "format": "Roundtable",
    "topics": [
      "Production",
      "Collaboration"
    ],
    "title": "Planner and producer: speaking the same language",
    "summary": "Why planners and production teams talk past each other, and the shared vocabulary that fixes it.",
    "image": "/images/episodes/ep05.jpg",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest05.jpg",
      "bio": "A technical director and a meeting planner who have worked together on the same program for eight years."
    },
    "takeaway": "Share the run of show draft before it's finished. Production can solve problems in week four that cost a fortune in week twelve.",
    "notes": [
      "A roundtable with a planner and the technical director they trust most. We dig into show calls, run-of-show documents and what 'just a simple stage' really costs.",
      "If you have ever been surprised by a production quote, start here."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "04:00",
        "title": "'Just a simple stage'"
      },
      {
        "time": "12:30",
        "title": "The run of show as a shared document"
      },
      {
        "time": "21:10",
        "title": "Show calling, demystified"
      },
      {
        "time": "30:45",
        "title": "Where the money really goes"
      },
      {
        "time": "37:20",
        "title": "One thing to take back"
      }
    ],
    "quote": "If production hears about it on site, it's already expensive.",
    "transcript": [
      {
        "speaker": "Ace",
        "line": "Twenty-five years in production and I still hear 'just a simple stage' every month."
      },
      {
        "speaker": "Guest",
        "line": "And I used to say it! I genuinely didn't know what I was asking for."
      },
      {
        "speaker": "Suley",
        "line": "So what changed?"
      },
      {
        "speaker": "Guest",
        "line": "We started building the run of show together, in the same doc, from week four."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-06",
    "number": 6,
    "date": "2026-11-25",
    "duration": 30,
    "format": "Interview",
    "topics": [
      "Attendee experience",
      "Creative"
    ],
    "title": "Designing for the attendee who doesn't want to be there",
    "summary": "Mandatory meetings, skeptical audiences and the small design choices that win people over.",
    "image": "/images/episodes/ep06.jpg",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest06.jpg",
      "bio": "An internal events lead who plans the meetings employees are required to attend."
    },
    "takeaway": "Give reluctant attendees one moment of genuine choice in the first hour. It changes how they experience the rest of the day.",
    "notes": [
      "Not every attendee bought a ticket. We talk about sales kickoffs, all-hands meetings and how to design for an audience that would rather be at their desks.",
      "Expect practical ideas on agenda pacing, seating, breaks and the opening five minutes."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "02:50",
        "title": "The mandatory meeting problem"
      },
      {
        "time": "10:20",
        "title": "The first five minutes"
      },
      {
        "time": "18:00",
        "title": "Pacing and breaks"
      },
      {
        "time": "24:30",
        "title": "Measuring the mood"
      },
      {
        "time": "28:10",
        "title": "One thing to take back"
      }
    ],
    "quote": "Respect their time first. Engagement follows.",
    "transcript": [
      {
        "speaker": "Suley",
        "line": "How do you open a meeting nobody chose to attend?"
      },
      {
        "speaker": "Guest",
        "line": "You acknowledge it. Out loud. The moment you admit it's a Tuesday and they have inboxes, the room relaxes."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-07",
    "number": 7,
    "date": "2026-12-02",
    "duration": 36,
    "format": "Interview",
    "topics": [
      "Measurement",
      "Leadership"
    ],
    "title": "Measuring what matters after the applause",
    "summary": "Moving past attendance counts to the outcomes leadership actually cares about.",
    "image": "/images/episodes/ep07.jpg",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest07.jpg",
      "bio": "A strategist who helps event teams report results in the language of the business."
    },
    "takeaway": "Agree on the one number that defines success before you sign the venue contract, and report it first.",
    "notes": [
      "Surveys, scans and session counts are easy to collect and easy to ignore. We talk about outcomes, storytelling with data and the post-event report leadership will actually read."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "03:15",
        "title": "Why attendance isn't the point"
      },
      {
        "time": "11:40",
        "title": "Choosing the one number"
      },
      {
        "time": "20:20",
        "title": "The report people read"
      },
      {
        "time": "30:05",
        "title": "One thing to take back"
      }
    ],
    "quote": "A good report answers the question leadership was too busy to ask.",
    "transcript": [
      {
        "speaker": "Ace",
        "line": "What's the first thing you look at after an event?"
      },
      {
        "speaker": "Guest",
        "line": "Whatever we promised before it. If we didn't promise anything, that's the real problem."
      }
    ],
    "audio": ""
  },
  {
    "id": "ep-08",
    "number": 8,
    "date": "2026-12-09",
    "duration": 33,
    "format": "Roundtable",
    "topics": [
      "Crisis",
      "Production"
    ],
    "title": "The general session that almost didn't happen",
    "summary": "A power outage, a missing keynote and forty minutes to save the morning. Told by the people in the room.",
    "image": "/images/episodes/ep08.jpg",
    "guest": {
      "name": "[Guest Name]",
      "role": "[Role / Organization]",
      "image": "/images/guests/guest08.jpg",
      "bio": "A planner, a stage manager and a venue director retell one very long morning."
    },
    "takeaway": "Run a 'what if the keynote doesn't show' drill for every general session. You will use it more often than you think.",
    "notes": [
      "Three people, one morning and every contingency plan tested at once. A play-by-play of how a general session was saved, and what the team changed afterward."
    ],
    "chapters": [
      {
        "time": "00:00",
        "title": "Intro"
      },
      {
        "time": "02:30",
        "title": "6:40 a.m.: the lights go out"
      },
      {
        "time": "09:50",
        "title": "The keynote is still at the airport"
      },
      {
        "time": "18:15",
        "title": "Forty minutes to fill"
      },
      {
        "time": "26:40",
        "title": "What we changed afterward"
      },
      {
        "time": "30:20",
        "title": "One thing to take back"
      }
    ],
    "quote": "Your contingency plan is only real if the whole crew has read it.",
    "transcript": [
      {
        "speaker": "Suley",
        "line": "Where were you when the power went?"
      },
      {
        "speaker": "Guest",
        "line": "Holding two coffees and a clicker. I put down the coffees."
      }
    ],
    "audio": ""
  }
];

/* ---------------- Helpers ---------------- */

const parseDate = (d: string) => {
  const [y, m, dd] = d.split("-").map(Number);
  return new Date(y, m - 1, dd);
};

/** True once the episode's release date has arrived. */
export const isReleased = (ep: Episode, today: Date = new Date()) => {
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return parseDate(ep.date) <= t;
};

export const formatDate = (d: string, withYear = true) =>
  parseDate(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });

export const episodeNumber = (n: number) => "EP " + String(n).padStart(2, "0");

export const episodeUrl = (ep: Pick<Episode, "id">) => `/episodes/${ep.id}`;

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);

/** "00:12:30" / "12:30" → seconds */
export const toSeconds = (t: string) => t.split(":").reduce((a, v) => a * 60 + Number(v), 0);
