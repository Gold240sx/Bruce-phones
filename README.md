# Always There Wireless

## What is this project for?
 This project is a website built for a client who wanted a landing page with web presence that incorporated an form application to retrieve information towards users seeking to get free mobile devices through a progam that they are a dealer with.  

 ## How does it accomplish that goal?
 Its intentionally simple, with the main goal for users to fill out the form, with enough of a web presence to ensure trust, but without anything unessessary, to facilitate that goal. It takes the user-submitted data and sends it to the clients email allowing him to see if the user qualifies for a device. Additionally, the data is sent to Google Firebase to, where it can be viewed on the backend of the application (dashboard) where once the client signs in, can then view edit and modify that data to their liking.

## Technology used in this application
- Google Firebase (Full CRUD)
    - user acounts
    - role-based authentication ( admin / user )
    - user database docs tied to docs
    - storage tied to users upon signup
- Admin dashboard w/ controls
- Additional Form Validation with Zod
- React-Hook-Form (Form State Manager)
- Next 13 app router
- React context api
- local storage
- Next routes api
- React-Email 
- Resend (api-based email api)
- Framer Motion (animations)
- input autocomplete
- multi-step-form
- Typescript
- Flowbase
- ShadCn
- Tailwind


### TODO list (More important)
- Main form validation, and zod form hookup w/ db and custom email
- document uploader ( both for submitting supporting docs as well as for resumes)

### Still needs work (less important)
- DOB Calendar form input doesn't allow direcly editing the value
- Add a support Requests page w/ dynamic page for viewing and marking the requests as viewed / complete
- add a scrollable notification banner and tie it to context and local storage
- double check and verify that the resend emails are sent to new subscribers from the new  domain name (waiting on domain purchase)
