# spectateur

Custom Reports for Crash Analysis, based on [Socorro](https://github.com/mozilla/socorro). 

spectateur allows users to create their own reports, using the data provided by 
[Socorro's public API](https://crash-stats.mozilla.com/api/). 
Users can modify the data returned by the API in any way they want using JavaScript. The resulting data
is then rendered in a table or as a chart. Reports can then be saved and shared using the URL. 

For example, here's a report showing the top signatures, top versions, and a table of the latest crash reports for the Firefox crashes of the last week: http://spectateur.lqbs.fr/#f49db2ae-337e-46b0-85f3-20967d58efa4

Note: This is a **prototype**.

## Tools

This prototype works thanks to those excellent tools: 

 * jailed - https://github.com/asvd/jailed (Sandboxed JavaScript)
 * Chart.js - http://www.chartjs.org/ (Charts and graphs)
 * JS Grid - http://js-grid.com/ (Pretty tables from JSON data)
 * select2 - http://select2.github.io/ (Select boxes on steroids)
 * ace - http://ace.c9.io/ (HTML-based code editor)
 * bootstrap - http://getbootstrap.com/ (Responsive frontend framework)
 * jQuery - http://jquery.com/ (Do I need to explain? )
 * Slim - http://www.slimframework.com/ (PHP micro framework)
 
 
 ![](http://vignette3.wikia.nocookie.net/forgottenrealms/images/2/2c/Monster_Manual_5e_-_Beholder_-_p28.jpg/revision/latest/scale-to-width/1000?cb=20141109194926)
 
 *("spectateur" is one of the translation of the name "beholder" 
 in French, see [Wikipédia](http://fr.wikipedia.org/wiki/Tyrann%C5%93il))*
