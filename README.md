## Taiga Bot Info
* [General info](#general-info)
* [Technologies](#technologies)
* [Commands](#commands)
* [Setup](#setup)

## General info
Taiga, is to be designed as an all in one discord bot that can be easily integrated with current MySQL systems that exist on current sites, easily add your own tables into her logic and reward systems. 

She will also have some Semi-AI Built into her with alot of other quicks to make her extremely unique and act more human than a bot. 
Eventually would love to convert to machine learning to form responses, but righ tnow it's just randomized responses to key words with a chance to fire, so she doesn't respond every time, just enough that it's human like, this can be turned off from the Server.js file, or run the OPTIONS command inside discord to toggle it, it is turned on by default
	
## Technologies
Taiga is Built using-
* Node: v14.x
* ES6 Import Syntax
* Discord.js: ^12.2.0
* node-mysql: ^2.18.1

## Commands
```
$ profile, info, p - Display a Users Profile 
$ slots, slot, 777 - Play slots (Requires 100 of the currency)
$ pedit, pe - Lets a user edit their Profile
```
	
## Setup
To Start Taiga, follow the steps below.


Navigate to the Config.js in the root folder, and insert your Discord API token and MySQL Authentication

```
$ cd ../Taiga-Bot
$ npm install
$ node Taiga
```
