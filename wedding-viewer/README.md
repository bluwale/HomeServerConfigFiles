this project main goal is to create a self hosted website for users all around the world to access a private livestream of a wedding. 


HOW IT WORKS
A broadcasting app called Larix is used on a device to record at the location of the wedding (Calgary, AB), which then uses the vpn tunnel to connect directly to the server in Toronto. The app will send RTMP protocol stream data, where mediamtx (a media prox) will transmute the data and turn it into viewable HLS stream data. On the server side, a python web server (on a seperate ubuntu screen) is opened where a simple HTML/js page will be hosted for users all over the world to visit and view the stream which is password protected.

how does app.js work?
This JavaScript file powers the interactive functionality. It manages password validation, unlocks the video player when the correct key is entered, and remembers login for a set period app. It also handles loading the livestream using HLS.js, providing fallbacks for browsers and showing error messages if the stream cannot be loaded.

how does index.html work?
This is the main webpage that guests visit to watch the livestream. It defines the structure of the site: a header, a password entry “gate,” the hidden video player that unlocks on correct entry, and a footer message index. It also loads the stylesheet (styles.css) and JavaScript logic (app.js) that handle the design and functionality.

