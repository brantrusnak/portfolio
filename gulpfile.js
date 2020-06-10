const gulp = require('gulp');
const mustache = require("gulp-mustache");

const sectionItems = {
    work: [
        {
            label: 'ICD Code Lookup',
            image: '/assets/websites/icd',
            tags: ['HTML5', 'CSS3', 'SCSS', 'Angular', 'TypeScript', 'Angular Universal'],
            source: {
                site: 'https://stagingf.icdcodelookup.com/'
            }
        },
        {
            label: 'LIO',
            image: '/assets/websites/lio',
            tags: ['HTML5', 'CSS3', 'SCSS', 'Bulma', 'TypeScript', 'Three.js', 'Tween.js', 'Webpack', 'Gulp', 'NodeJS', 'Apache'],
            source: {
                site: 'https://lio.agency/'
            }
        },
        {
            label: 'Innovative Extracts',
            image: '/assets/websites/ie',
            tags: ['Big Commerce', 'HTML5', 'CSS3', 'SCSS', 'Stencil CLI', 'JavaScript', 'jQuery'],
            source: {
                site: 'https://ie-cbd.com/'
            }
        },
        {
            label: 'R. Jeffrey Kimball',
            image: '/assets/websites/rjk',
            tags: ['HTML', 'Twig', 'CSS3', 'SCSS', 'Spectre CSS', 'JavaScript', 'jQuery', 'PHP', 'Composer', 'YAML'],
            source: {
                site: 'https://www.rjeffreykimball.com/'
            }
        },
        {
            label: 'Topics',
            description: "Topics is a separate user-facing application that utilizes theLandscape's back end technology. We created this tool to address a specific need within the scope of SEO - to give detailed suggestions on how to produce meaningful content that ranks in organic search. I developed a completely separate UI for this project, including an interactive text editor that gives suggestions to content producers in real-time.",
            tags: ['HTML5', 'CSS3', 'Angular', 'Java', 'MySQL', 'MongoDB']
        },
        {
            label: 'theLandscape',
            description: "I was the lead UI developer for theLandscape, an SEO software startup. I worked with product designers, and back end engineers to develop the UI from scratch using technologies such as Angular, TypeScript, and SCSS. I assumed responsibility for the technology and implementation decisions to best meet our business objectives. Occasionally, I hopped over to the back end to assist in development using Java with the Spring Framework.",
            tags: ['HTML5', 'CSS3', 'AngularJS', 'Angular', 'Java', 'PHP', 'Apache Thrift', 'MySQL', 'MongoDB']
        }
    ],
    projects: [
        {
            label: 'Pong',
            image: '/assets/websites/pong',
            description: "This is my attempt at recreating the classic video game, Pong. I built the game using the Canvas API in TypeScript. This was the first time I had to deal with collision detection. It was intimidating at first but after some reviews and experiments, it was quite easy and fun to solve! The Computer/AI is almost impossible to beat, considering it updates its paddle Y position based on the ball's Y position.",
            tags: ['HTML5', 'CSS3', 'TypeScript', 'Webpack'],
            source: {
                code: 'https://github.com/brantrusnak/pong',
                demo: 'https://brantpong.netlify.app/'
            }
        },
        {
            label: 'jaTracker',
            image: '/assets/websites/jaTracker',
            wip: true,
            description: "jaTracker is a job application tracker. I wanted to step outside of my comfort zone with this project. I wrote the frontend code in React and TypeScript, used React Context and Hooks for state management, and the backend in Python with Flask, using MongoDB and GridFS for storage.",
            tags: ['HTML5', 'CSS3', 'React', 'TypeScript', 'Python', 'Flask', 'MongoDB', 'Webpack'],
            source: {
                frontend: 'https://github.com/brantrusnak/jaTracker-ui',
                backend: 'https://github.com/brantrusnak/jaTracker-api'
            }
        },
        {
            label: 'Portfolio',
            image: '/assets/websites/portfolio',
            description: "My portfolio. This was business as usual with SCSS/TypeScript, but I wanted to reduce the repeating of HTML. I used Mustache, utilizing templates and partials, to generate all the HTML, and Gulp to hold data and provide it to Mustache. The gulp task then writes all the mustache templates into 1 HTML file.",
            tags: ['HTML5', 'Mustache', 'CSS3', 'SCSS', 'TypeScript', 'Gulp', 'Webpack'],
            source: {
                code: 'https://github.com/brantrusnak/portfolio'
            }
        },
        {
            label: 'tlkr.',
            image: '/assets/websites/tlkr',
            wip: true,
            description: "tlkr. was a project that I always wanted to do, to create my own social media site. I used Angular for the frontend and NodeJS with Express and TypeScript for the backend. I used MySQL for storing data, and Sequlize on the backend to communicate to the database.",
            tags: ['HTML5', 'CSS3', 'Angular', 'NodeJS', 'Express', 'Passport.js', 'MySQL', 'TypeScript', 'Sequelize'],
            source: {
                backend: 'https://github.com/brantrusnak/tlkr-api',
                frontend: 'https://github.com/brantrusnak/tlkr-ui',
                demo: 'https://tlkr.netlify.app/'
            }
        },
        {
            label: 'CSS Keyframe Delay Generator',
            image: '/assets/websites/keyframe_gen',
            description: "I developed this tool to assist in the generation of CSS keyframes with animation timings, delays/pauses, and states. Vanilla CSS animations can only be delayed at the start - So to delay the animation, you have to break the keyframe into 2 steps. The first step being the animation time and the second being the delay time. This tool does the math to calculate seconds to percentages in keyframes and generates a template for you.",
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            source: {
                code: 'https://github.com/brantrusnak/keyframe-delay-generator',
                demo: 'https://keyframe-delay-generator.netlify.app/'
            }
        }
    ],
    other: [
        {
            label: 'VS Code',
            image: 'assets/img/vscode.svg'
        },
        {
            label: 'IntelliJ IDEA',
            image: 'assets/img/idea.svg'
        },
        {
            label: 'Linux',
            image: 'assets/img/linux.svg'
        },
        {
            label: 'Git',
            image: 'assets/img/git.svg'
        },
        {
            label: 'GitHub',
            image: 'assets/img/github.png'
        },
        {
            label: 'Postman',
            image: 'assets/img/postman.svg'
        },
        {
            label: 'Big Commerce',
            image: 'assets/img/bigcommerce.svg'
        },
        {
            label: 'Grav',
            image: 'assets/img/grav.svg'
        }
    ],
    frontend: [
        {
            label: 'HTML5',
            image: 'assets/img/html.svg'
        },
        {
            label: 'CSS3',
            image: 'assets/img/css.svg'
        },
        {
            label: 'SASS',
            image: 'assets/img/sass.svg'
        },
        {
            label: 'JavaScript',
            image: 'assets/img/js.svg'
        },
        {
            label: 'TypeScript',
            image: 'assets/img/ts.svg'
        },
        {
            label: 'Webpack',
            image: 'assets/img/webpack.svg'
        },
        {
            label: 'Angular',
            image: 'assets/img/angular.svg'
        },
        {
            label: 'RxJs / NgRx',
            image: 'assets/img/rxjs.svg'
        },
        {
            label: 'React',
            image: 'assets/img/react.svg'
        },
        {
            label: 'Redux',
            image: 'assets/img/redux.svg'
        },
        {
            label: 'Gulp',
            image: 'assets/img/gulp.svg'
        },
        {
            label: 'D3',
            image: 'assets/img/d3.svg'
        },
        {
            label: 'Bulma',
            image: 'assets/img/bulma.svg'
        },
        {
            label: 'Bootstrap',
            image: 'assets/img/bootstrap.svg'
        }
    ],
    backend: [
        {
            label: 'Java',
            image: 'assets/img/java.svg'
        },
        {
            label: 'NodeJS',
            image: 'assets/img/nodejs.svg'
        },
        {
            label: 'Python',
            image: 'assets/img/python.svg'
        },
        {
            label: 'Apache',
            image: 'assets/img/apache.svg'
        },
        {
            label: 'MySQL',
            image: 'assets/img/mysql.svg'
        },
        {
            label: 'MongoDB',
            image: 'assets/img/mongo.svg'
        }
    ],
    info: {
        links: [
            {
                label: "GitHub",
                link: 'https://github.com/brantrusnak/',
                class: 'github'
            },
            {
                label: "LinkedIn",
                link: 'https://www.linkedin.com/in/brantrusnak/',
                class: 'linkedin'
            }
        ]
    }
}

gulp.src("./src/templates/index.html")
    .pipe(
        mustache({sectionItems}))
    .pipe(gulp.dest("."));

function defaultTask(cb) {
    cb();
}

exports.default = defaultTask