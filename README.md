## Note about folders structure
  Proposed folders structure is a kind of overkill in such a small components scope, but I wanted to make the app extensible. 
  Folder `./src/scenes/` contains only MainScene scene, but in real-world app would contain major scenes switched by a top-level routing.
  There is also empty `./components/` folder that should contain top-level utility components. I haven't extracted this kind of components because of a small scope of the task. So all created components are related to `MainScene` scene.
  I've also decided to treat reducers and API related files as services.
  User reducer is dumb, but I've decided to declare it anyway because didn't want to have a totally hard coded token, which is probably related to some user.