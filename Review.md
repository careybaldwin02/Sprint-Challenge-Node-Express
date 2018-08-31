# Review Questions

## What is Node.js?
Node.js is essentially a tool that makes it possible to work with JavaScript outside of the browser. It is refered to in the industry as a runtime environment which is a program that can run other programs. Node.js is siginificant because it opens up possibilities for developers.  We can now use JavaScript to write command line utilities, native programs that run on different operating systems, networking software, web services, web applications and more.

## What is Express?
Express is a useful tool, or module, really, used to improve the funcitonality of Node.js.  Express can add routing and middleware support as well as simplify the API.  Although Node is exremely powerful, it uses a huge amount of code, even for simple tasks.  Express is able to compress that code and re-factor it in a distilled verson.  This often take the form of helper methods which can be identified with meaningful names such as findById().

## Mention two parts of Express that you learned about this week.
Two major parts of Express we learned about were Middleware and Routing.

## What is Middleware?
I think of middleware as a way to control the sequence of operations that happen in a web applications.  Because of the asynchronous nature of JavaScript, we sometimes need to intervene in the proccess in order to make sure certain functions happen before others.  Middleware functions help accomplish this/ 

## What is a Resource?
A resource could be anything and everything that a web app uses as part of its operation.  The term 'resource' shows up as part of the REST architectural style explanation, which suggests that:
 - everything is a resource.
 - each resources is accessible vie a unique URI
 - resources can be represented in multiple ways
https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

## What can the API return to help clients know if a request was successful?
Effective use of http status codes can be extremely helpful as far as providing insights and possible actions a user may take in order to access the information they seek in viewing the Web Application. 

## How can we partition our application into sub-applications?
We can compartmentalize the major parst of the application so that each sub-application is responsible for a smaller set of actions than the entire applications.  This in essence, make the code easier for the mind to tackle.  For example, separating all of the Routes into a single collection (folder of routes, files for specific routes) would help the developer find and modify the specific route he/she might need to work with. 

## What is express.json() and why do we need it?
The express.json() command allows parsing of json data.  It is necessary in order for the server to pull out specific portions of a data object, such as req.title or req.body.  