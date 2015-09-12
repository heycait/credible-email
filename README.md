# Credible Email
A single-page frontend email client using JavaScript, jQuery/AJAX, and Bootstrap. Built on top of the SendGrid and Mandrill APIs with abstraction between the two email service providers--if one service goes down, Credible Email quickly falls over to the other provider without affecting the user.

Email Providers:

* [SendGrid](https://sendgrid.com/user/signup) - [Simple Send Documentation](https://sendgrid.com/docs/API_Reference/Web_API/mail.html)
* [Mandrill](https://mandrillapp.com) - [Simple Send Documentation](https://mandrillapp.com/api/docs/messages.JSON.html#method-send)

## Features
Users can:

- [X] "Log in" using email address w/validation on keystroke
- [X] Discard email
- [X] Save drafts of unfinished emails
- [X] Come back later and have a populated form with saved draft
- [X] "Log out"
- [X] Send emails (to one or more recipients)

Stretch Goals
- [ ] Add proper validations to email form and multiple email recipients
- [ ] Allow users to see sent messages
- [ ] Migrate from vanilla JS to Backbone
- [ ] Switch over to SASS

<!-- Need to fix issue with popover showing up on valid input after entering invalid input -->
<!-- Need to fix issue of page refresh and clearing populated form -->

### Deployed Application
Credible Email can be accessed on Firebase at https://credible-email.firebaseapp.com.


## Plans && Thought Process
- User 'logs in' using their email address in an initial 'Welcome to Credible Email. Please enter your email address.' Store this in sessionStorage and localStorage
- Page 'swipes' to the side to reveal the email form requiring recipient email addresses, subject, and body
  - This was changed to using a modal for logging in instead
- User either trashes the email, saves a draft, or sends it
- Trashing email results in an alert to confirm and completely clear the form
- Drafting saves the input to localStorage and will repopulate the form when the same email address 'logs in'
- Sending involves a new page showing the sent email then a button to go back to email form
- Maybe have a section under the email form that shows their 5 most recently sent emails?
- 'Logging out' removes the user's email from sessionStorage
- Validations for email input as well as ensuring all fields in form are filled out

Pure JS:
- Use localStorage to save drafts of messages
- Use localStorage to store copies of the five most recently sent messages

Backbone:
- Use for saving drafts on change?
- Use for viewing sent messages that are stored in localStorage

Thought I needed to use Backbone since the instructions recommended using it for frontend MVC and spent some time looking into Backbone. I chose to do the email client which doesn't necessarily require any additional library or enhanced functionality so ended up deciding on an app using pure JavaScript combined with jQuery and Ajax.

Then I remembered the reason I was considering a frontend framework in the first place. Automatic drafting and allowing the users to see messages they already sent (this would be stored in the browser's localStorage as this seems to be a more difficult task using the APIs itself or require writing my own backend to gather this specific information for each user based on their entered email address). Not sure if this is even possible using SendGrid though.

While I understand the benefits of using Backbone and organizing the code into MVC, or MV in the case of the Backbone library, I'd need more time to learn it to migrate this over.
