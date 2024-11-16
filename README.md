This is a [useraccountdashboard Account Documentation](https://account.useraccountdashboard.com/) written out for internal use by the development team

## Getting Started

First, git clone this repository:

```bash
git clone  "the repo's url "
# then
npm install
# then
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More --Design & Architecture

To learn more about this project's Design & Architecture, take a look at the following resource:

- [server.account.useraccountdashboard.com README file](server.account.useraccountdashboard.com)

The Next.Js routing file system is the strategy used in this application to organize data
for server interaction. We will break down everything in subheadings to give more detail

## Root Route '/'

In order that the application can fetch data with server side rendering (SSR) capabilities
only the user id and a few more data is stored in the client.

When there is an '\_id' value in the 'user' object stored in localStorage, the app fetches the data on this route and virtually store it unknowed to the client side.

The requested url (endpint ) for fetching the user data is : [https://server.account.useraccountdashboard.com//fetch-single-data/_id_/actual_user_id]

## Home Route '/\_id/home'

This is the 'home' route that shows basic information.
It fetches the following basic information is retrieved from the basic key
of the user object:

```bash
_id ---------> user identification (the auto-assigned mongodb objectId)

image -------> user image (avatar)

username

email

```

Account specific recomendations (suggestions by the sytem to the user) are
also fetched on this route. They are retrieved from the server on the following
server endpoint:
[/data/\_id/actual_user_id/suggestions](https://server.account.useraccountdashboard.com/data/fetch-single-data-objects/_id/***id***/suggestions)

These are sometimes reffered to as recomentations

Security Information is also fetched on this route.
It is retrieved from the user object in the server under this key:
[/\_id/actual_user_id/security_info/](https://server.account.useraccountdashboard.com/fetch-single-data-objects/_id/***id***/security_info)

Permissions are also fetched on this route.
It is retrieved from the user object in the server under this key:
[/\_id/actual_user_id/permissions/](https://server.account.useraccountdashboard.com/fetch-single-data-objects/_id/***id***/permissions)

When Updating we have two fuctions, 1 for permissions and the other for security infor

Issues with the update of security info
--> when a the password key whose value is validated for strength by the server is invalid, an error is sent in response and somehow the value inserted in the server which will in turn be not encrpted.
---> this causes subsequent async responses like the {password,access_key,security_key,...otherData} || otherData to give a CORS error

Solution to this issue
----> prevent server from updating if there is an error in the data being updated
----> prevent the client from sending subsequent requests when there is an error prior expecution
