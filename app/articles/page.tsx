import Link from 'next/link';

type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

type Article = {
  title: string;
  date: string;
  tags: string[];
  description: string;
  sections: ArticleSection[];
};

const articles: Article[] = [
  {
    title: 'KHVIII - a deepdive on my experience',
    date: 'Oct 2025',
    tags: ['blog'],
    description: 'in this post, i share my experiences while building ZPM-TUNA, winning pheratechs challenge, everything.',
    sections: [
      {
        heading: 'starting ZPM-TUNA',
        paragraphs: [
          'ZPM-tuna started about a month ago when i saw pheratech was having a challenge and really wanted to do something unique and innovative that hasnt been done before. i shot a few ideas around and landed on ZPM-TUNA, autonomous drones that can find safe exits for building evacuation.',
        ],
      },
      {
        heading: 'team problems',
        paragraphs: [
          'one of the issues i had during this event was finding teammates, god damn that shit is so hard. at first i had 2 teammates pretty much right when the project started, i found a fourth and thought things were good to go, without about a week and a half left before KH, my teammates dropped. boom that sucked, i scrambled to find a team, i actually almost abandoned ZPM for a different team but i loved my project too much just to drop it. interview after interview, if professional gaming taught me anything, it was to pick up people with little to no hack experience and a whole lot of potential and thats pretty much what my philosophy for building a team. people who have no experience in something but are taking initiative to start something are way more hungry. I dont want established people that cause they already went through the trials and tribulations. i need my team to fucking want that shit as much as i do, and thats what i did.',
        ],
      },
      {
        heading: 'prehack prep and getting sick',
        paragraphs: [
          'i got fucking sick... so bad like two weeks before the event, it actually put me out for a WHOLE WEEK. the worst part is i had 3 midterms and interviews, and there was just so much going on i was putting in 12-14 hours a day once i felt better to get my research, studying, and interviews in alongside my tutoring business and all the other stuff. it was alittle chaotic but for me i like it like that, why work if your comfortable all the time? thats no fun i need some opportunity to fail in my life.',
        ],
      },
      {
        heading: 'the plan...',
        paragraphs: [
          'the plan was simple, two robots, they will have basic arduino motor functions and sensor readings and then ros2 will handle the learning and pathfinding. i knew phera was big on decentralization and creating modular robots that work solo and with eachother and the same time but also at the same time i have 36 hours and about 200 dollars to spend. sooo.. the ros system is gonna have to handle most of it... but the way it works is a hierachel system where each robot has its own node for pathfinding and logic with a controller node that manages their messages and gives priority to what they should be doing at any given moment, eg an obstacle is found in a hallway like a fire, then the controller node will tell that drone to prioritize using another drones path to find the exit instead.. a good balance of modularity, learning, and pathfinding while keeping the power constraints (and money) in mind. that wouldve probably been pretty cool but my next section is where i almost combusted',
        ],
      },
      {
        heading: 'OH GOD THE ROBOTS ARE BRICKED',
        paragraphs: [
          'i want to preface with in our team dynamic i would solely be working on ROS2 and the hardware so thats why i reference everything in i and not us',
          'when i tell you i put so much time into planning, i really mean it, i mean i have a notion that is so long, and being someone that doesnt have the most experience in embedded and geniunely no experience into ROS2 i had alot of work if my first project is going to be autonomous vehicles that also act in swarm. so you can imagine my brain when hack started and my arduino code was setup i was pumped, like holy shit were gonna do this its gonna go great wow. then i tried connecting the ros2 integration node i made to the robots using their built in ESP32 module. everything from this point was when it went to shit. the esp32 wifi module was soldered onto a shield which was connected to the uno r3. this was a robot kit i bought. i still dont exactly know the exact cause to why i couldnt send data from the node to ros because i could connect to the wifi, but my guess is the firmware they flashed is specific to their app that they want their customers to use. but i couldnt flash it without unsoldering it from the board. so i was up until around 9am trying to figure out a work around. to the point where i was wiresharking the received packets from the wifi to see if i can find a special port or some miracle. i couldnt explain in words the feeling i felt as i watched my project get bricked right before my eyes',
        ],
      },
      {
        heading: 'sometimes life throws some shit at your face, maybe its three kilos of elephant shit, but that wont kill you',
        paragraphs: [
          'i was down in the dumps, my team counted on me, i felt like i let them down, i was like fuck am i really going to go out like that? so i left my setup and walked from BA2 to the dunkin next to the bounce house. good thing its a long walk cause i had plenty to think about. i didnt know anything, except one thing, i was not going to let my team down. when i got the dunkin i finally thought of a pivot. lets just do a 3d sim on gazebo, fuck it what else am i gonna do. play with networks for 36 hours? hell no. i walked back to BA2 to tell my team my updates as they were waking up',
        ],
      },
      {
        heading: 'oh nice phera dinner',
        paragraphs: [
          'fast forward a 2 hour nap and some final attempts at the robots. phera had an RSVP dinner event, funnily enough it was chikfila and i cant even eat chikfila (peanuts dammit). but i sat there, my mentor, carlos, was next to me and i swear if those guys walked in a room you could not tell they were the heads of phera. i mean you couldve told me they were hackers and i wouldve believed you. after everyone left we chatted abit about their company culture and internships, and worklife at phera. and every company says what they said but this is the only time ive ever believed it first impression. i mean they were the most chill people ive ever met in their position. so i pitched ZPM, explained our issues, and immediately they seemed extremely intrigued, they asked questions, gave feedback, i told them my pivot and how i was actually really interested in the project and want to make a working physical copy. they were really intrigued and it did just feel like having a chat with my friends. that was super cool honestly and gave me even more determination then my already inflamed ego has',
        ],
      },
      {
        heading: 'its time to pivot',
        paragraphs: [
          'i went back to my team who left early after pheras dinner and told them dude my surface pro CANNOT do all that gazebo stuff. im gonna go to my home system and work there. they trusted me and i went back home to my apartment, i remember sitting down and being like damn this is probably gonna take a second, and boy it did.. from 8pm to 6-7am (HAHAHAHAHDAHHAHSHa) i worked, i built a working 3d gazebo sim that implemented pretty much everything i wanted too, i also translated it to a tkinter 2d model so that it could run on our flutter app (that gazebo shit is expensive as hell boy...). gazebo WSL were all pains in the ass. so much i installed ubuntu on my laptop today actually while i write this. By 7 i was done, i can hype it up by saying my nose was bleeding and i was fucking beat. i laid in my bed for about 15 minutes and got up because i couldnt stop thinking of changes and optimizations but around 9am i stopped working',
        ],
      },
      {
        heading: 'DEMOOOOO',
        paragraphs: [
          "i woke up at like 11 to a call from my teammate that judging was starting early so had to rush over there. we demo'd with MLH first and honestly so much went wrong, it was a whatever demo.. but i knew deep down my real hitter was pheras demo, it had to go good, we had to talk good, we had to be those guys. so we walked in and my mentor was there as the general judge. we demo'd our project and then question time hit. they asked ALOT of questions about the intricacies of my ros2 stuff, the bots themselves, the pivot. i mean they covered everything. not only that, imagine answering those questions on 4 hours of sleep in 36 hours. i was a drone, but my mom always said im too stubborn, so i knew it wasnt over till the bell rang. after my mentor said i spoke amazingly and that it really brought to life the passion behind ZPM and i agree. i think the question part went better for us then the actual demo",
        ],
      },
      {
        heading: 'takeaways',
        paragraphs: [
          'i think not only from a technical aspect did i learn alot about networking (for some reason), ros2, hardware and abunch of other random shit. but i think my main takeaway is that this hack resolidified the idea in my head that i may not be the greatest programmer in the world, shit im probably not even in the top 100 here at UCF. but what makes me special is three things: when shit hits the fan, im your guy, thats my thing, ive never been a big planner, this was actually the first time i planned so extensively anything, shit hitting the fan i know for me makes me hit a different mode of person. i may be a programmer but i think my strongest aspect is the way i convey stuff im passionate about. when i want something i want it, and BAD and i will never let anything or anyone get in the way of anything i want to do or be.',
        ],
      },
      {
        heading: 'whats next for zpm-tuna',
        paragraphs: [
          'i have grown infatuated with the project, so much so that i want to continue it and actually build working prototypes during winter break, i think i will take a week break and get back to planning, if i can hold myself away for a week, this time i will go completely custom hardware, test all my code in gazebo and then work out kinks and all that stuff before i go physical. i am super excited and i think as someone who is constantly looking to create and try new things this is something that is so interesting and different that it will keep me infatuated for a while, atleast i hope so',
        ],
      },
      {
        paragraphs: ['and thats the end. thanks for reading people. from kwaii'],
      },
    ],
  },
  {
    title: 'Becoming Treasurer of Knight Hacks',
    date: 'Feb 2026',
    tags: ['blog'],
    description: "in this post i'll be talking about my time in knight hacks to present",
    sections: [
      {
        heading: 'in the begning',
        paragraphs: [
          "When i came to UCF last fall (2025), I was admitdly alittle bummed that I didnt end up liking GT and didnt get into UF. It kinda seemed like my whole plans were thrown out the window, I didnt really know what to expect from UCF. It wasnt my plan, but i have learned in my life that sometimes things are just meant to be. My first couple weeks were just getting accustomed, my plan regardless of where i went was really just to spend my first semester getting into social circles. I realized on my summer before transferring that the whole point of going to uni was for the connections you'd make there, so i knew that i had to make it worth it. one of my friends from highschool showed me knightconnect and knight hacks was one of the first to pop up, i think i joined the discord and kinda just didnt do anything at first.",
        ],
      },
      {
        heading: 'the first GBM',
        paragraphs: [
          'My first event i attended was the first GBM, i took one of my roomates. honestly not much came out of it, i actually remember the people i talked to though, kat, the design director at the time actually came up to me and we spoke briefly, and the GDK club was sitting at my table so i talked to them, now that i think about it Alejandro, was actually there right next to me and now were on the same team for 2026, thats pretty cool. The only big thing to come up was i saw a qr code for kickstart, the mentorship program they run in the spring. I used it as a way of making friends, i think this is where it all started right here.',
        ],
      },
      {
        heading: 'Kickstart Team Matching',
        paragraphs: [
          'after the gbm i applied and got accepted, the first meet was a team matching day where everyone shows up and the mentors kinda just walk around and you talk and find your mentor, i remember talking to adrian, dylan, jeff, lowkey looking back at it they were hella performative LOL. As the event was coming to an end i was kinda thinking like damn i dont think i really got anyone, im just gonna get random team matched. thats when i talked to sam, sam wouldnt end up being my mentor but we talked about my experience in minecraft and he pointed me to carlos, carlos also spent alot of time in minecraft pvp so we talked and it was chill, i remember seeing him just sitting on a chair in the middle of the atrium on his phone... maybe not even an hour after that event he dms me on discord asking if i wanted to be his mentee',
          'took it, the whole mentor thing started off pretty structured, he showed us a flowchart of what he wanted us to do, resume update, portfolio (this one right here), as time continued i ended up being more accustomed to my group, adan and carlos were the two i kept in touch with the most. I spent alot of time kinda just coasting at this point KH wise handling other things. I wasnt too active in the discord, it was also interview season, then came shell...',
        ],
      },
      {
        heading: 'Shell 2025',
        paragraphs: [
          'shell hacks was the first hack i ever went too, i went with adan and some of his friends and we made some shitty chrome extension, i knew knight hacks was coming up so i focused more on just understanding what the hell a hackathon really is and what i can take into knight hacks. When your stuck in a room for 3 days with no sleep with all of knight hacks you get more accustomed to them naturally. some of the people i remember are arthur, he came up and asked us what were doing because hes friends wiht adan. I also explicitly remember leo coming up to me at like 3am saturday asking me what were doing.. everything was broken at that point (still got a demo out tho) and i was just like bro leave me ALONE.',
        ],
      },
      {
        heading: 'the first kickback',
        paragraphs: [
          'when i think about everything that happened and how i got treasurer, i think this is where i really first started to shine LOL. im not gonna get into specifics for EVERYONEs sake but lets just say it was a great time at the pool and bbq and me and the past board got into a good chat about some KH lore. carlos didnt find it to appeasing though apparently as he fell asleep midway...',
        ],
      },
      {
        heading: 'Knight Hacks 8',
        paragraphs: [
          'there is literally a whole other page worth of words if you want the details, but i think some smaller stuff that happened was randomly helping mark, one of the sponsors and ex-kh, he was cool and we talked abit while helping him, also being the only non-team person to actually talk to the pheratech people in their private lunch meant for talking to them.. i was so surprised watching everyone just like sit on the ends of the tables and keeping to themselves while theres 7 people who run a startup your competitng for sitting there chilling, these are also like some of the most approachable people ive ever met. blah blah blah though i won knight hacks 8 super champion i already went over that',
        ],
      },
      {
        heading: 'pre and post kickback 2',
        paragraphs: [
          'the win at knight hacks 8 was a big help as after i was alot more intune with the club, i couldve done it differently but honestly im just not a big talker in discords, kickback 2 was chill just alot more people knew me and i knew them now after being pretty active in the club since august',
        ],
      },
      {
        heading: 'the banquet',
        paragraphs: [
          'i remember like early december right before finals i was telling carlos i was gonna run for treasurer, adrian was extremely on board with the idea and they were running together. honestly i got maybe alittle too confident, or maybe just the right amount as i like to say. I said i was going to start my propaganda campaign after finals and i did.. NOT do that at all, something i do want to note though is that after KH8 they threw a KH banquet for all members apart of the actual KH team, this was late november i think? Carlos calls me panicking about food or something and i actually didnt end up needed to pick up the food, but i did end up just sneaking into the banquet for free. who cares its just jason... I actually remember leaving the banquet and i walk up to brian who was making it very well known hes running for treasurer, dudes always so professional hes like shaking my hand i ask if hes running (i knew) and hes like yea can i count on you for my vote? sorry bro i told him i might be running who knows..',
        ],
      },
      {
        heading: 'pre Elections',
        paragraphs: [
          'yea so i spent my whole christmas break absolutely chillin, so what.. no propoganda, most in the election room barely even knew me. but i knew i had the experience and whoever i was going to run against i knew i would beat them one on one no externals. so odds were in my favor. what i did expect was bryans amazing campaign efforts, i knew he was going to have a group showing out, so i just needed to beat him and the rest of the votes are still in my favor in that case. i actually came in last for primaries, i had some backing from the board but not too much. even carlos was like man i dont want to vote you i might vote someone else.. honestly tho, i was not worried at all walking in',
        ],
      },
      {
        heading: 'Election day',
        paragraphs: [
          'so yea there was actually like 5 people running for treasurer, nat now secretary, dhruv, nicole, bryan, and me. Odds may be stacked but the house never reveals the actual line. my responses were great, i wont lie, i used jargon and big numbers so that the current treasurer adrian would react, not rigged he didnt know i was gonna do that, and when all the other people saw the guy they call the money guy react all crazy i knew it was gonna be easy. it ended up in a perfect tie against me and bryan but i know that my responses were better as i had more natural on the spot voting, so i felt extremely confident when they announced there was a tie.',
        ],
      },
      {
        heading: 'Post Election',
        paragraphs: [
          'long story short, im the treasurer now. awesome... if anyone reading this has their named mention, you guys are all cool. i am just competitive, my bad... long live knight hacks',
        ],
      },
    ],
  },
  {title: 'spring recap',
    date: 'may 2026',
    tags: ['blog'],
    description: 'in this, i share a recap of spring semester and my summer goals',
    sections: [
      {
        heading: 'general recap',
        paragraphs: [
          'helo crew.. semester is over and wow this just flew by, i swear it was feburary like 2 days ago but i guess its may now. anywho. this is all that happened and what ill be talking about: knight hacks, hacking, research, other activites, and my plans for summer',
        ],
      },
      {
        heading: 'knight hacks',
        paragraphs: [
          'holy fuck so much happened.. jeez idk what i can even talk about. in my linkedin post i wrapped it up pretty well but general overview and stuff i couldnt fit in there: gbms 1,2,3,4: I was definitely my standout it was so packed to the point where people were outside the door. hype and aura moments... then sno tea was great. it was just a great start to the semester, 2 and 3 were forgettable but 4 was cool because apparently it was the first time weve had a sponsored gbm. so shoutout us? it was something that we really wanted to do and lowk jacked from gwc but were gonna keep that up. alot of my phiolosophy when it comes to leading is building a team that wants to do the job and that was a big part of this, bryan did all the communication and did his job great there. field day was tuff. we won kickball and had bum energy out. oh the RSO ceremony, that was okay. honestly alittle larpy but we did win and we got nominated for 11 different things so we were just standouts, i think it was really cool when people would walk up to us and be like oh i saw your reel or oh i like what you guys are doing that was so awesome. we dropped merch ($6500) that was super expensive. but it was definitely worth it and i would totally pay more. i saw the shirt in publix yesterday and that says enough LOL. pl was great too this year, we gave a budget for prizes at 2k and probably costed us maybe 2500 total completely worth we killed that and daniel did great, whole thing was smooth albiet one small challenge for the expo no leaks... ummm what else intern fair and team pictures i lowk have nothing to say about them i havent said i dont even remember the intern fair like that ngl LOL it FLEW by for me. the team pictures was chill tho alot it was hot as hell that day. ive never been to lake eola or downtown in general so it was nice to see its actually pretty chill.'
        ],
      },
      {
        heading: 'hacking',
        paragraphs: [
          'lowk insane sem.. we went to hacklytics first where we WON that was hype and aura moments. we actually had this dude who wore a treehacks shirt with the same name as our project and we saw him take a picture infront of our win LOL. no hate to him but i just thought it was funny. i definitely want to go to more prestigious school hacks i thought it was so funny watching knight hacks win like 6 times it has to be ragebait, i will say TS was expensive the food options were so expensive since they didnt serve SHIT i could eat, such a problem with these hacks i always have to order food. i feel like its not that hard to either accomodate or avoid nuts and seafood. also feed ur hackers, like food people be hella hungry. but i love them they were so nice to us and ex-kh so its ok. then we went to hackusf, where we won 10 out of 15 challenges... we wont most innovative which is basically 4th place. honestly i felt the anger of the crowd during closing when no usfers were winning, it was kinda sad ngl i hoped for more balanced winning but im NGL i was looking at the projects our teams were putting out and i was like wtf yall never do ts. THEY ALWAYS TROLLING BUT FOR SOME REASON THEY ALL BROUGHT OUT SOME INSANE SHIT. i feel like we wouldve won general if the floor wasnt carpet but maybe that just me... that was it for me but our teams went to LAHacks won, shoutout lewin and honoray kh jhoon.. they went to hackabull and won but not much i think. thats all'
        ]
      },
      {
        heading: 'research & academics',
        paragraphs:[
          'i was a terrible student this semester. i definitely want to try more to be a better student because it really isnt all that hard. its unnessecary pressure i could fix with like 2 extra hours a week LOL. the classes are so easy right now that it is almost too easy to procrastinate. its weird because i go through phases with academia. in highschool i was more like how i am now, then in community college i was so dialed i had a 4.0, now im back to late assignments sometimes and not really putting my best foot forward in that aspect. i think its temporary as last semester i was able to lock in for finals. but thats definitely in my plans going into fall. TO BE FAIR, i am a busy guy. but nothing some better planning cant fix which is great optics. lowk not too much to say cause its part of my summer plans but everythings going very smoothly, got some cool stuff lined up and i want to spend some summer expanding on it by making it tangible'
        ]
      },
      {
        heading: 'random activities',
        paragraphs: [
          'hmm, well my birthday and party passed, oh jeez.. IM SORRY FOR THE CHAOS to everyone involved.. we also went to disney for spring break, we made great food holy fuh. me so hungry.. that was a chill ahh break, think it was like me dylan fern carlos bryan leo kylie bowen. hopefully i didnt miss anyone but it was great that was honestly top 3 moments i needed that. then yesterday we had our team event which was chill, honestly those grills are fucking terrible. erm yea thats pretty much all. oh wait i hit emerald in siege LOL'
        ]
      },
      {
        heading: 'da future',
        paragraphs: [
          'well i dont like to plan with my internship, i do have to do that and ill be fulltime while im there, but i like having other objectives throughout the summer as extra bonus points. i think my list is pretty extensive and all over the place but i plan on refining it over the week, i have about two weeks until the fe and thats when everything starts again so thats good time to chill. for personal stuff: i want to spend more time with my family and friends, i think this semester especially ive really thought about how much i take them for granted sometimes. my family is extremely supportive and i tend to get caught up with all the stuff that happens, i want to be there for them too as i sometimes havent been so i will be going between home and palm bay alittle especially on weekends just to make some more time. as well as my friends, they are there for me through anything, even if i make dumb desicions they are still there, even when i dont message for weeks because im caught up in everything going on they are still there, and that speaks alot onto them and the people i surround myself by. im so grateful for them all and want to be there for them more. no more sentimental stuff tho. we signed up for premier on valorant, itll be my first playing "competively" in over 2 years LOL so that will be for the fun. I ALSO want to grind siege and get champion. idk i think itll be fun and siege has been the first game ive enjoyed in such a long time. in terms of work stuff i want to make sure im good for the FE so will be grinding that abit, want to crush out some projects (cant leak i dont want people jacking my ideas) but i got some REALLY cool stuff, ontop of that i want to talk more about the actual work in research esque stuff on here and resources, what i do isnt really well documented sometimes so i want to contribute in that aspect. me patrick and bryan potentially have a project that is also honestly super cool and we want to sell it so theres that. i want to contribute to oss, definitely ROS2 because im pretty familar at this point. and also some deep tech stuff like nix. wat else.. i wanna go to buccees. and then towards the end of summer ill start locking back in for season.. i wanna land a robotics unicorn next summer that i can go to for new grad after hopefully. this summer will determine alot of if i do or not. good internship i got for it, better projects, oss and showcasing of understanding i think will be a big. ive never been one to not dream big so lets see what i can cook up here. think thats pretty much it. oh also for personal i want to rennovate my time management systems they are outdated... which maybe ill make another post on. okay bai'
        ]
      }
  ],
}
];


export default function ArticlesPage() {
  return (
    <main id="articles" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../home
        </Link>

        <h1 className="mt-10 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">articles</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">
          stuff ive learned or blog
        </p>

        <section className="mt-10 border-t border-[#415a77]/45 pt-6">
          <div className="space-y-12">
            {articles.map((article) => (
              <article key={article.title} className="text-sm leading-7">
                <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                  <p className="font-mono text-[#778da9]">{article.date}</p>
                  <div>
                    <h2 className="text-xl font-medium leading-7 text-[#f0ebd8]">{article.title}</h2>
                    <p className="mt-2 break-words text-[#e0e1dd]/70">{article.description}</p>
                    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">
                      {article.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </p>
                  </div>
                </div>

                <details className="group mt-5 sm:ml-[7rem]">
                  <summary className="cursor-pointer list-none font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
                    <span className="group-open:hidden">read article</span>
                    <span className="hidden group-open:inline">close article</span>
                  </summary>

                  <div className="mt-6 space-y-8">
                    {article.sections.map((section, sectionIndex) => (
                      <section key={`${article.title}-${section.heading ?? sectionIndex}`}>
                        {section.heading && (
                          <h3 className="font-mono text-sm text-[#778da9]">{section.heading}</h3>
                        )}
                        <div className="mt-3 space-y-4 text-[#e0e1dd]/75">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="break-words">{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
