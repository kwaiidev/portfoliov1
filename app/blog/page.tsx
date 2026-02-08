'use client';
import CSSWaves from '../components/CSSWaves';
import TextContentCard from '../components/TextContentCard';

export default function Blog() {
  return (
    <CSSWaves className="relative min-h-screen">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-8">
            blog
          </h1>
          <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            a VERY casual place where i share the insider scoop on my life
          </p>
        </div>

        <div className="space-y-8">
          {/* Blog Post 1 */}
          <TextContentCard
            title="KHVIII - a deepdive on my experience"
            date="Oct 2025"
            tags={["hack", "from pov"]}
            description="in this post, i share my experiences while building ZPM-TUNA, winning pheratechs challenge, everything."
            expandedDescription={
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">starting ZPM-TUNA</h3>
                  <p className="mb-4">
                    ZPM-tuna started about a month ago when i saw pheratech was having a challenge and really wanted to do something unique and innovative that hasnt been done before. i shot a few ideas around and landed on ZPM-TUNA, autonomous drones that can find safe exits for building evacuation.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">team problems</h3>
                  <p className="mb-4">
                    one of the issues i had during this event was finding teammates, god damn that shit is so hard. at first i had 2 teammates pretty much right when the project started, i found a fourth and thought things were good to go, without about a week and a half left before KH, my teammates dropped. boom that sucked, i scrambled to find a team, i actually almost abandoned ZPM for a different team but i loved my project too much just to drop it. interview after interview, if professional gaming taught me anything, it was to pick up people with little to no hack experience and a whole lot of potential and thats pretty much what my philosophy for building a team. people who have no experience in something but are taking initiative to start something are way more hungry. I dont want established people that cause they already went through the trials and tribulations. i need my team to fucking want that shit as much as i do, and thats what i did.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">prehack prep and getting sick</h3>
                  <p className="mb-4">
                    i got fucking sick... so bad like two weeks before the event, it actually put me out for a WHOLE WEEK. the worst part is i had 3 midterms and interviews, and there was just so much going on i was putting in 12-14 hours a day once i felt better to get my research, studying, and interviews in alongside my tutoring business and all the other stuff. it was alittle chaotic but for me i like it like that, why work if your comfortable all the time? thats no fun i need some opportunity to fail in my life.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">the plan...</h3>
                  <p className="mb-4">
                    the plan was simple, two robots, they will have basic arduino motor functions and sensor readings and then ros2 will handle the learning and pathfinding. i knew phera was big on decentralization and creating modular robots that work solo and with eachother and the same time but also at the same time i have 36 hours and about 200 dollars to spend. sooo.. the ros system is gonna have to handle most of it... but the way it works is a hierachel system where each robot has its own node for pathfinding and logic with a controller node that manages their messages and gives priority to what they should be doing at any given moment, eg an obstacle is found in a hallway like a fire, then the controller node will tell that drone to prioritize using another drones path to find the exit instead.. a good balance of modularity, learning, and pathfinding while keeping the power constraints (and money) in mind. that wouldve probably been pretty cool but my next section is where i almost combusted
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">OH GOD THE ROBOTS ARE BRICKED</h3>
                  <p className="mb-4">
                    i want to preface with in our team dynamic i would solely be working on ROS2 and the hardware so thats why i reference everything in i and not us
                  </p>
                  <p className="mb-4">
                    when i tell you i put so much time into planning, i really mean it, i mean i have a notion that is so long, and being someone that doesnt have the most experience in embedded and geniunely no experience into ROS2 i had alot of work if my first project is going to be autonomous vehicles that also act in swarm. so you can imagine my brain when hack started and my arduino code was setup i was pumped, like holy shit were gonna do this its gonna go great wow. then i tried connecting the ros2 integration node i made to the robots using their built in ESP32 module. everything from this point was when it went to shit. the esp32 wifi module was soldered onto a shield which was connected to the uno r3. this was a robot kit i bought. i still dont exactly know the exact cause to why i couldnt send data from the node to ros because i could connect to the wifi, but my guess is the firmware they flashed is specific to their app that they want their customers to use. but i couldnt flash it without unsoldering it from the board. so i was up until around 9am trying to figure out a work around. to the point where i was wiresharking the received packets from the wifi to see if i can find a special port or some miracle. i couldnt explain in words the feeling i felt as i watched my project get bricked right before my eyes
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">sometimes life throws some shit at your face, maybe its three kilos of elephant shit, but that wont kill you</h3>
                  <p className="mb-4">
                    i was down in the dumps, my team counted on me, i felt like i let them down, i was like fuck am i really going to go out like that? so i left my setup and walked from BA2 to the dunkin next to the bounce house. good thing its a long walk cause i had plenty to think about. i didnt know anything, except one thing, i was not going to let my team down. when i got the dunkin i finally thought of a pivot. lets just do a 3d sim on gazebo, fuck it what else am i gonna do. play with networks for 36 hours? hell no. i walked back to BA2 to tell my team my updates as they were waking up
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">oh nice phera dinner</h3>
                  <p className="mb-4">
                    fast forward a 2 hour nap and some final attempts at the robots. phera had an RSVP dinner event, funnily enough it was chikfila and i cant even eat chikfila (peanuts dammit). but i sat there, my mentor, carlos, was next to me and i swear if those guys walked in a room you could not tell they were the heads of phera. i mean you couldve told me they were hackers and i wouldve believed you. after everyone left we chatted abit about their company culture and internships, and worklife at phera. and every company says what they said but this is the only time ive ever believed it first impression. i mean they were the most chill people ive ever met in their position. so i pitched ZPM, explained our issues, and immediately they seemed extremely intrigued, they asked questions, gave feedback, i told them my pivot and how i was actually really interested in the project and want to make a working physical copy. they were really intrigued and it did just feel like having a chat with my friends. that was super cool honestly and gave me even more determination then my already inflamed ego has
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">its time to pivot</h3>
                  <p className="mb-4">
                    i went back to my team who left early after pheras dinner and told them dude my surface pro CANNOT do all that gazebo stuff. im gonna go to my home system and work there. they trusted me and i went back home to my apartment, i remember sitting down and being like damn this is probably gonna take a second, and boy it did.. from 8pm to 6-7am (HAHAHAHAHDAHHAHSHa) i worked, i built a working 3d gazebo sim that implemented pretty much everything i wanted too, i also translated it to a tkinter 2d model so that it could run on our flutter app (that gazebo shit is expensive as hell boy...). gazebo WSL were all pains in the ass. so much i installed ubuntu on my laptop today actually while i write this. By 7 i was done, i can hype it up by saying my nose was bleeding and i was fucking beat. i laid in my bed for about 15 minutes and got up because i couldnt stop thinking of changes and optimizations but around 9am i stopped working
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">DEMOOOOO</h3>
                  <p className="mb-4">
                    i woke up at like 11 to a call from my teammate that judging was starting early so had to rush over there. we demo&#39;d with MLH first and honestly so much went wrong, it was a whatever demo.. but i knew deep down my real hitter was pheras demo, it had to go good, we had to talk good, we had to be those guys. so we walked in and my mentor was there as the general judge. we demo&#39;d our project and then question time hit. they asked ALOT of questions about the intricacies of my ros2 stuff, the bots themselves, the pivot. i mean they covered everything. not only that, imagine answering those questions on 4 hours of sleep in 36 hours. i was a drone, but my mom always said im too stubborn, so i knew it wasnt over till the bell rang. after my mentor said i spoke amazingly and that it really brought to life the passion behind ZPM and i agree. i think the question part went better for us then the actual demo
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">takeaways</h3>
                  <p className="mb-4">
                    i think not only from a technical aspect did i learn alot about networking (for some reason), ros2, hardware and abunch of other random shit. but i think my main takeaway is that this hack resolidified the idea in my head that i may not be the greatest programmer in the world, shit im probably not even in the top 100 here at UCF. but what makes me special is three things: when shit hits the fan, im your guy, thats my thing, ive never been a big planner, this was actually the first time i planned so extensively anything, shit hitting the fan i know for me makes me hit a different mode of person. i may be a programmer but i think my strongest aspect is the way i convey stuff im passionate about. when i want something i want it, and BAD and i will never let anything or anyone get in the way of anything i want to do or be.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">whats next for zpm-tuna</h3>
                  <p className="mb-4">
                    i have grown infatuated with the project, so much so that i want to continue it and actually build working prototypes during winter break, i think i will take a week break and get back to planning, if i can hold myself away for a week, this time i will go completely custom hardware, test all my code in gazebo and then work out kinks and all that stuff before i go physical. i am super excited and i think as someone who is constantly looking to create and try new things this is something that is so interesting and different that it will keep me infatuated for a while, atleast i hope so
                  </p>
                </section>

                <section>
                  <p className="mb-4 italic text-[#e0e1dd]/80">
                    and thats the end. thanks for reading people. from kwaii
                  </p>
                </section>
              </div>
            }
            expandable={true}
          />
          <TextContentCard
            title="Becoming Treasurer of Knight Hacks"
            date="Feb 2026"
            tags={["UCF", "Knight Hacks", "RSOs"]}
            description="in this post i'll be talking about my time in knight hacks to present"
            expandedDescription={
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">in the begning</h3>
                  <p className="mb-4">
                    When i came to UCF last fall (2025), I was admitdly alittle bummed that I didnt end up liking GT and didnt get into UF. It kinda seemed like my whole plans were thrown out the window, I didnt really know what to expect from UCF. It wasnt my plan, but i have learned in my life that sometimes things are just meant to be. My first couple weeks were just getting accustomed, my plan regardless of where i went was really just to spend my first semester getting into social circles. I realized on my summer before transferring that the whole point of going to uni was for the connections you&apos;d make there, so i knew that i had to make it worth it. one of my friends from highschool showed me knightconnect and knight hacks was one of the first to pop up, i think i joined the discord and kinda just didnt do anything at first.   
                  </p>
                  <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">the first GBM</h3>
                  <p className="mb-4">My first event i attended was the first GBM, i took one of my roomates. honestly not much came out of it, i actually remember the people i talked to though, kat, the design director at the time actually came up to me and we spoke briefly, and the GDK club was sitting at my table so i talked to them, now that i think about it Alejandro, was actually there right next to me and now were on the same team for 2026, thats pretty cool. The only big thing to come up was i saw a qr code for kickstart, the mentorship program they run in the spring. I used it as a way of making friends, i think this is where it all started right here.</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">Kickstart Team Matching</h3>
                <p className="mb-4">after the gbm i applied and got accepted, the first meet was a team matching day where everyone shows up and the mentors kinda just walk around and you talk and find your mentor, i remember talking to adrian, dylan, jeff, lowkey looking back at it they were hella performative LOL. As the event was coming to an end i was kinda thinking like damn i dont think i really got anyone, im just gonna get random team matched. thats when i talked to sam, sam wouldnt end up being my mentor but we talked about my experience in minecraft and he pointed me to carlos, carlos also spent alot of time in minecraft pvp so we talked and it was chill, i remember seeing him just sitting on a chair in the middle of the atrium on his phone... maybe not even an hour after that event he dms me on discord asking if i wanted to be his mentee</p>
                <p className="mb-4">took it, the whole mentor thing started off pretty structured, he showed us a flowchart of what he wanted us to do, resume update, portfolio (this one right here), as time continued i ended up being more accustomed to my group, adan and carlos were the two i kept in touch with the most. I spent alot of time kinda just coasting at this point KH wise handling other things. I wasnt too active in the discord, it was also interview season, then came shell...</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">Shell 2025</h3>
                <p className="mb-4">shell hacks was the first hack i ever went too, i went with adan and some of his friends and we made some shitty chrome extension, i knew knight hacks was coming up so i focused more on just understanding what the hell a hackathon really is and what i can take into knight hacks. When your stuck in a room for 3 days with no sleep with all of knight hacks you get more accustomed to them naturally. some of the people i remember are arthur, he came up and asked us what were doing because hes friends wiht adan. I also explicitly remember leo coming up to me at like 3am saturday asking me what were doing.. everything was broken at that point (still got a demo out tho) and i was just like bro leave me ALONE.</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">the first kickback</h3>
                <p className="mb-4">when i think about everything that happened and how i got treasurer, i think this is where i really first started to shine LOL. im not gonna get into specifics for EVERYONEs sake but lets just say it was a great time at the pool and bbq and me and the past board got into a good chat about some KH lore. carlos didnt find it to appeasing though apparently as he fell asleep midway...</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">Knight Hacks 8</h3>
                <p className="mb-4">there is literally a whole other page worth of words if you want the details, but i think some smaller stuff that happened was randomly helping mark, one of the sponsors and ex-kh, he was cool and we talked abit while helping him, also being the only non-team person to actually talk to the pheratech people in their private lunch meant for talking to them.. i was so surprised watching everyone just like sit on the ends of the tables and keeping to themselves while theres 7 people who run a startup your competitng for sitting there chilling, these are also like some of the most approachable people ive ever met. blah blah blah though i won knight hacks 8 super champion i already went over that</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">pre and post kickback 2</h3>
                <p className="mb-4"> the win at knight hacks 8 was a big help as after i was alot more intune with the club, i couldve done it differently but honestly im just not a big talker in discords, kickback 2 was chill just alot more people knew me and i knew them now after being pretty active in the club since august</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">the banquet</h3>
                <p className="mb-4">i remember like early december right before finals i was telling carlos i was gonna run for treasurer, adrian was extremely on board with the idea and they were running together. honestly i got maybe alittle too confident, or maybe just the right amount as i like to say. I said i was going to start my propaganda campaign after finals and i did.. NOT do that at all, something i do want to note though is that after KH8 they threw a KH banquet for all members apart of the actual KH team, this was late november i think? Carlos calls me panicking about food or something and i actually didnt end up needed to pick up the food, but i did end up just sneaking into the banquet for free. who cares its just jason... I actually remember leaving the banquet and i walk up to brian who was making it very well known hes running for treasurer, dudes always so professional hes like shaking my hand i ask if hes running (i knew) and hes like yea can i count on you for my vote? sorry bro i told him i might be running who knows..</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">pre Elections</h3>
                <p className="mb-4">yea so i spent my whole christmas break absolutely chillin, so what.. no propoganda, most in the election room barely even knew me. but i knew i had the experience and whoever i was going to run against i knew i would beat them one on one no externals. so odds were in my favor. what i did expect was bryans amazing campaign efforts, i knew he was going to have a group showing out, so i just needed to beat him and the rest of the votes are still in my favor in that case. i actually came in last for primaries, i had some backing from the board but not too much. even carlos was like man i dont want to vote you i might vote someone else.. honestly tho, i was not worried at all walking in</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">Election day</h3>
                <p className="mb-4">so yea there was actually like 5 people running for treasurer, nat now secretary, dhruv, nicole, bryan, and me. Odds may be stacked but the house never reveals the actual line. my responses were great, i wont lie, i used jargon and big numbers so that the current treasurer adrian would react, not rigged he didnt know i was gonna do that, and when all the other people saw the guy they call the money guy react all crazy i knew it was gonna be easy. it ended up in a perfect tie against me and bryan but i know that my responses were better as i had more natural on the spot voting, so i felt extremely confident when they announced there was a tie.</p>
                <h3 className="font-bold text-xl text-[#e0e1dd] mb-3">Post Election</h3>
                <p className="mb-4">long story short, im the treasurer now. awesome... if anyone reading this has their named mention, you guys are all cool. i am just competitive, my bad... long live knight hacks</p>
                </section>
              </div>
            }
            expandable={true}
          />
        </div>
        </div>
      </div>
    </CSSWaves>
  );
}
