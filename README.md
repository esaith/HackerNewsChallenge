# HackerNewsChallenge
RSS Feed for Hacker News

Using the HackerNews API, https://github.com/HackerNews/API, to generate a web-based solution that displays the title and author of the current best stories 
on Hacker News.

Things to be included:
  * Unit tests
  * Able to compile and run
  * Interacting with the title should take the user to the article

Bonus
  * Search functionality
  * Building cache
  * Azure App Services link


Process
Angular 2+ application that will list out a list of title, author, small snippted of the body. A simple class will hold the listed properties along with whether
the user has previously viewed the article. (Hint: Think bold font with unread email). A simple read boolean will do the trick. The user will have a list of links
on a left panel and a preview on the right. The user should also be able to open a new tab to visit the real website. This will be a single page using a 
single page application platform. 

Other possibilities of page creation
  * The above could also be created by using pure Javascript and fetch for any API calls. We have frameworks and platforms that allow developers to DRY
  * MVC and C# using Razor pages along with Javascript for partial page loading. This appeared to be overkill. A local server for page creation when an 
    EntityFramework is not needed. Models are not required as there is no database; yet, desirable for Razor pages. 
  * jQuery. Ten years plus ago would have been fine.
  * Any other framework: Ruby, Flash, Perl, etc. Because this company does not require nor do I have the experience. 

  Enjoy!
