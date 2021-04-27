#Task: 

Create a small JavaScript / HTML / CSS page that loads list projects from our gallery page and previews them.

1. Create list of projects, that should:
1.1. Use pure CSS
1.2. Download (using AJAX) list of projects from https://planner5d.com/gallery/floorplans
1.3. List of projects, in format: [hash], [title]
1.4. Pressing on list item should open project preview page
2. Create a project preview page, that should:
2.1. Use SCSS
2.2.Download (using AJAX) project JSON
2.3.Show project title
2.4. Show project preview (using Canvas 3D and WebGL) on which you should draw project room polygons from first floor
2.5. Show project statistics:
2.5.1. Amount of floors in project
2.5.2. Amount of rooms in project
2.5.3. Amount of other items in project

Requirements
Use JavaScript (ES6+)
You can use utility JavaScript framework like jQuery
Do not use architectural JavaScript framework (like Vue.js, React)
Use SCSS / CSS as described
Provide task result as a git repository packaged in a gitbundle and don't post it on public code sharing services (github, bitbucket, ...)
We expect to be able to run your code without fuss - so if there are any specifics that are needed to get your code running, please commit them to git repository if possible

What we will look at
Clarity, elegance and maintainability of code
Code consistency
A clear architecture and adherence to design patterns
Knowledge of the web standards and best practices

What we don't want to see
Over engineering your code
Fancy UI / UX

Your deadline time ~1 week after you receive this task.
Please, let us know the status of dealing with the test task and the required time to result.

Good luck!


### Run project

1. Install [Node](https://nodejs.org/en/download/)
2. Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

3. Install dependencies
````
yarn install
````
3. Scrape projects page
````
yarn scrape
````
4. Run project
````
yarn dev
````

5. Open [http://localhost:5000/list](http://localhost:5000/list) 


