## How to run
* Install 
	* `cd ./app && npm install && cd ../`
	* `cd ./webhook_handler_api && npm install && cd ../`
* Run
	* Run delivered API -> `cd ./API && node index.js`
	* Run created webhooks handler -> `cd ./webhook_handler_api && npm run start`
	* Finnaly run the app -> `cd ./app && npm run start`

## What has been done
* Weather app with weather updates feature
* Minimalistic Node.js backend to handle updates
* debouncing network fired by widget refresh button 
* WeatherWidgets reducer unit testing
## Note about folders structure

Proposed folders structure is a kind of overkill in such a small components scope, but I wanted to make the app extensible. The structure is based on an [article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1). I’ve used this structure in my last project and it was convenient.

Folder `./src/scenes/` contains only MainScene scene, but in real-world app would contain major scenes switched by a top-level routing.

There is also empty `./components/` folder that should contain top-level utility components. I haven't extracted this kind of components because of a small scope of the task. So all created components are related to `MainScene` scene.

I've also decided to treat reducers and API related files as services.

User reducer is dumb, but I've decided to declare it anyway because didn't want to have a totally hard coded token, which is probably related to some user.