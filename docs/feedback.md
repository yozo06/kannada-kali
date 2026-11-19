# Feedback and bug reports

The app has no server, so a learner's message has to travel some other way.
**You → Send feedback**, or **Report a mistake here** on any answer, opens a short form inside the app:
what kind of message, a text box, and a line of technical details (app version, teaching language,
device type, browser, screen size, and the stop or card they were on). Nothing identifies the person.

Where it goes depends on `FEEDBACK_FORM` in `app/js/config.js`:

- **Not set (the default):** the message is copied so the learner can paste it to whoever shared the app,
  with a button to open a pre-filled GitHub issue for those who use GitHub.
- **Set to a Google Form:** the form opens with the message already filled in; the learner presses Submit.
  Answers collect in your Google Sheet. Your contact details never appear in the code.

## Setting up the Google Form

1. Create a form with three questions:
   - **Kind** (short answer)
   - **Message** (paragraph)
   - **Details** (paragraph)
   Leave "collect email addresses" off and do not require sign-in, so anyone can submit.
2. In the form's ⋮ menu choose **Get pre-filled link**. Type `KIND`, `MESSAGE`, `DETAILS` into the three
   answers and press **Get link**, then copy it. It looks like
   `https://docs.google.com/forms/d/e/…/viewform?usp=pp_url&entry.111=KIND&entry.222=MESSAGE&entry.333=DETAILS`.
3. Put the pieces into `app/js/config.js`:

   ```js
   export const FEEDBACK_FORM = {
     url: 'https://docs.google.com/forms/d/e/…/viewform?usp=pp_url',
     fields: { kind: 'entry.111', message: 'entry.222', details: 'entry.333' }
   };
   ```
4. `npm run sw`, commit, push.

A form with only one question also works: set just `fields.message` and leave the others `''`.
