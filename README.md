Edgevanta's Super Very Difficult Expert Level Take Home Problem

Before you begin, you will need to create two free accounts:  
- Create a free Convex account - [https://www.convex.dev/](https://www.convex.dev/)  
- Create a free Vercel account - [https://vercel.com/edgevanta](https://vercel.com/edgevanta)

Now we can get started with the fun stuff. You will be creating a crude messaging app using Convex and Next.js. Here are the directions:

- Begin by creating a Next.13 (or later) app using the App Router.  
- Create two routes, one for “alice” and one for “bob” and link to them from the home page.  
- Create a new component called MessageTerminal that contains a textarea input and a submit button.  
- In your convex dashboard ([https://dashboard.convex.dev/](https://dashboard.convex.dev/)) create a convex table for storing messages (as well as the message’s sender).  
- Create a convex function for submitting messages to the table.  
- Update the MessageTerminal component so that a user can type a message and submit it to convex.  
- Add the MessageTerminal component to the Alice and Bob routes.  
- Update the component so that the user’s name (”bob” or “alice”) is submitted and stored along with the message.  
- Write a convex function for retrieving the most recent 10 messages and update the MessageTerminal component to display these messages (as well as the user that sent it).  
- Deploy your app to Vercel and check that it is working as expected.  
- Contact Slack and Discord and let them know that they have a new competitor.

Bonus points: Use Tailwind anywhere to make it look pretty!

Helpful links:  
- Convex Quickstart - [https://docs.convex.dev/quickstart/nextjs](https://docs.convex.dev/quickstart/nextjs)