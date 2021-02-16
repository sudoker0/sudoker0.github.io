# Web-Terminal Operating System (WTOS)
## My first ever large project
### 1. About WTOS
* WTOS is the *operating system* that have a *Command-Line Interface* that run in your browser. It's like Windows Command Prompt or Linux Terminal or even MS-DOS *on the Internet*
* I start this project on *August 23th, 2020* and it's been __constantly__ getting *update*.
* This project is all contained into one single file called: console.html and does not use external resources to make it easier to write.
* Here are some information about my project:
    * The first version is *328 lines long*, only have *11 command* and a *seperate icon file*
    * The orginial file name is: *os.html*
    * The command *__edit__* and the program was inspired by the old edit program in MS-DOS.
    * A portion of the code is from website like: [*StackOverFlow*](https://stackoverflow.com)
### 2. How to use?
* When you open up the console, there will be: 
    * A big __readonly__ input field which is the *console output*
    * A smaller input field right under the console output which is where you will input the command
    * Two button:
        * Enter command (Insert the command into the console)
        * On-Screen Key-board (Open the On-Screen Keyboard [More on that later])
* If you are new to *console*, please type __help__ to get all of the command
* To *enter a command*, you can use the *__(Enter Command)__* button for press the key *__(Enter)__* on your keyboard with your typing cursor on the command input field
* If you *can't use your keyboard* because you can only use the mouse, then __On-Screen Keyboard__ is for you!
    * Of course, you can just use the *__build in On-Screen Keyboard__* in Windows, MacOS, Linux or other OS that you might be running
    * To *enable* On-Screen Keyboard on the console, just press the *__(On-Screen Keyboard)__* button and the OSK should *show up*
    * In here, it function *__almost__* like a OSK, just that it can only be use in the *console*
### 3. FAQ
* Will I ever stop working on the project?
    * Maybe, I mean I can't just focus on one project but it might take very long before I decide: *You know, I have finish my job here, it's time to move on*
* Does it work on every browser?
    * As far as I know, if you are using the latest version of your browser, everything should work fine.
    * One thing for sure that Internet Explorer will not work 100%
* Is it free to use?
    * Yes, it is! You can use, copy, download like an open-source program. Just remember to keep my copyright info
* I have a copy of the console, how can I run it?
    * First, it's not simple as just run it directly from the file. Most function does work but some other function will fail to work because or CORS policy
    * To use this, setup a localhost server then run the console from there
    * There should be tutorial on how to setup a localhost server so search it up!
* Where can I access the console?
    * Here is the link: [Click here](https://quanmcpc.github.io/other_project/console)
    * Or just going to my website -> Other Project -> Find the one that said: *"I created my first ever Operating System CLI (Command-Line Interfaces)..."* then click [Access Here]
### 4. Secrect and thing that you might not know
* WARNING: If you want to discover all of the secrect by your own, please don't read the bottom part but if you want to know all of the secrect then continue reading
#
#
#
#
#
* YOU HAVE BEEN WARNED
* The print command is actually more then you might think
* There are some special sentence that can control certain part of the console that you can't normally
    * __console:output:off__: This will not show the command that you typed onto the output but only show the output of the command
    * __console:output:on__: Reverse the settings on top
* By inserting special *query string*, you can make the console do action on startup
    * __?command=__: This will insert and run the command that you want on startup
        * Example: ?command=print hello (Space is allow, Allowed value: {[all]})
    * __?nowelcome=__: This will enable or disable the message that always show up on startup
        * Example: ?nowelcome=1 (Allowed value: {0, 1})
* If you ever got banned (By typing query string onto the website url like: ?debug=1, ?hack=1). If you try to access the console, a special message will only show up on the console output saying that: *__"The console has been disabled by your Administrator. Ask the Admin to re-enable the console"__*
### 5. Final
* That's all info that I can give you, hope you have a great experience using my console.
#
### Copyright &copy; 2021 Quan_MCPC