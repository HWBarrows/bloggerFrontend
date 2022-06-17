# Code Challenge from Hallie Barrows

Goal: Construct a fullstack app using Typescript, EsLinter, Prettier, and my choice of API validator that allowed the user to create, read, update, and delete to a public API

Result: Mission accomplished =) 
___

## Decision Making Process
I decided to create a small blog since that is a format that many users are familiar with, judging by the popularity of websites such a Reddit and Buzzfeed. In a larger application, there would be functions for users to login & register, with only read privileges to documents that they do not own, and limited writing, updating, and deleting privileges for documents they do own. I initially wanted to create a login function that would save hashed passwords and limited such editing rights to register users. I abandoned that plan and went with a simpler option due to the difficulties I faced with Typescript. Due to the time spent learning Typescript, I did not have the time to also learn Jest, which I have 0 experience with. Research shows that it is very user friendly and I'm confident I will be able to learn it quickly given the opportunity.

The tools and libraries I used were chosen because of my familiarity and confidence in using them. These include Mongoose to create a BSON Schema in my MongoDB database & express-validator for API validation.

#### Challenges
1. Typescript As I mentioned during the initial interview, I have limited experience in Typescript, which prior to this challenge was only a half-day workshop. Much time was spent learning the required syntax, types, and declarations. I am very thankful for Google and even wrote a thank you message to one developer whose clearly written articles are largely why I was able to complete the task. 
2. Setup of ESLint with Prettier. Since both tools work to enforce styling, it was very important to set them up correctly to prevent conflicts. Once installed as dev dependencies, it was much easier to write clearer code and I will definitely use these tools going forward.  
3. My experience with Docker is just as limited as my experience with Typescript and unfortunately, I was not able to create a working container (or related containers) for my app. I left the original code in my file, so reviewers can see my attempts. I could either have a working server OR working frontend, but not both. I would like to address this knowledge gap in the future. 

### Successes
1. My app is deployed and working, which is why I consider this a success. I do not know Docker, but I do know Heroku and decided to deploy my backend on a hobby dyno and the frontend on a free dyno. Because free dynos "sleep", using one for a server just is not advisable. However, in the time it takes for the frontend to start, the server is already up and waiting. Additionally, deployment meets the stated requirements of being able to run on all systems, regardless of the user's operating system. 
2. I am now much more comfortable with Typescript. Many advertised positions explicitly ask for experience with this particular tool and I look forward to working with it more in the future. 

## Going Forward
I would like to conquer Docker. 


the live app can be found at https://blogger-barrows.herokuapp.com/. The git repository for the backend is located at https://github.com/HWBarrows/bloggerBackend
