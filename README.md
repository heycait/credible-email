# Credible code-challenge

Please organize, design, test, document and deploy your code as if it were
going into production, then send us a link to the hosted repository (e.g.
Github, Bitbucket...).

Functional spec
---------------

Prototype an email service.

The UX/UI is totally up to you. If you like, get creative and add additional
features a user might find useful!

### Email Service

Create a service that accepts the necessary information and sends emails. It
should provide an abstraction between two different email service providers.
If one of the services goes down, your service can quickly failover to
a different provider without affecting your customers.

Email Providers:

* [SendGrid](https://sendgrid.com/user/signup) - [Simple Send Documentation](https://sendgrid.com/docs/API_Reference/Web_API/mail.html)
* [Mandrill](https://mandrillapp.com) - [Simple Send Documentation](https://mandrillapp.com/api/docs/messages.JSON.html#method-send)



Technical spec
--------------

The architecture will be split between a back-end and a web front-end, for
instance providing a JSON in/out RESTful API. Feel free to use any other
technologies provided that the general client/service architecture is
respected.

Choose **one** of the following technical tracks that best suits your skillset:

1. **Full-stack**: include both front-end and back-end.
2. **Back-end track**: include a minimal front-end (e.g. a static view or API
   docs). Write, document and test your API as if it will be used by other
   services.
3. **Front-end track**: include a minimal back-end, or use the data service
   directly. Focus on making the interface as polished as possible.

### Back-end

We believe there is no one-size-fits-all technology. Good engineering is about
using the right tool for the right job, and constantly learning about them.
Therefore, feel free to mention in your `README` how much experience you have
with the technical stack you choose, we will take note of that when reviewing
your challenge.

Here are some technologies we are most familiar with:

* JavaScript
* Ruby / Rails

You are also free to use any web framework. If you choose to use a framework
that results in boilerplate code in the repository, please detail in your
README which code was written by you (as opposed to generated code).

### Front-end

The front-end should ideally be a single page app with a single `index.html`
linking to external JS/CSS/etc. You may take this opportunity to demonstrate
your CSS3 or HTML5 knowledge.

We recommend using [Backbone.js](http://documentcloud.github.com/backbone/) for
front-end MVC, and recommend against using heavier front-end frameworks (like
Angular, for example). That way we can get better insight into your thought
process and your understanding of the framework itself.

Host it!
--------

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google
AppEngine, etc.).


<!-- Keep solution as simple as possible
Clean UI
make app work correctly
detailed thought process
last one is *document thought process -->

User Flow:
User 'logs in' using their email address in an initial 'Welcome to Credible Email. Please enter your email address.' Store this in sessionStorage or localStorage
Page 'swipes' to the side to reveal the email form requiring recipient email addresses, subject, and body
User either trashes the email, saves a draft, or sends it.
Trashing email results in an alert to confirm and completely clearing the form.
Drafting saves the input to localStorage and will repopulate the form when the same email address 'logs in'
Sending involves a new page showing the sent email then a button to go back to email form
maybe have a section under the email form that shows their 5 most recently sent emails?
'logging out' removes the user's email from sessionStorage.
validations for all email input as well as ensuring all fields in form are filled out

Pure JS:
Use localStorage to save drafts of messages
Use localStorage to store copies of sent messages

Backbone
Use for saving drafts on change?
Use for viewing sent messages that are stored in localStorage


Thought I needed to use Backbone since the directions recommended using it for frontend MVC. I chose to do the email client which doesn't necessarily require any additional library of functionality such as data-binding. Decided to create an app using pure JavaScript combined with jQuery and Ajax.

Then I remembered the reason I was considering a frontend framework in the first place. Automatic drafting and allow the users to see messages they already sent (this would be stored in the browser's localStorage as this seems to be a more difficult task using the APIs itself or require writing my own backend to gather this specific information for each user based on their entered email address). Not sure if this is even possible using SendGrid though.