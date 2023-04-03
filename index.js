const fs = require('fs')
const inquirer = require('inquirer')
var logo = ''
var shape = ''
const fileName = 'logo.svg'
// Create a class called Shape with a constructor that takes two arguments, type and color. Set these two properties on the Shape instance
class Shape {
    constructor(type, color) {
        this.type = type
        this.color = color
    }
}

// Create a class called Triangle that extends Shape. The constructor takes three arguments, color, base, and height. Set these three properties on the Triangle instance
class Triangle extends Shape {
    constructor(color, base, height) {
        super('triangle', color)
        this.base = base
        this.height = height
    }
}

// Create a class called Circle that extends Shape. The constructor  takes two arguments, color and radius. Set these two properties on the Circle instance
class Circle extends Shape {
    constructor(color, radius) {
        super('circle', color)
        this.radius = radius
    }
}

// Create a class called Square that extends Shape. The constructor takes two arguments, color and side. Set these two properties on the Square instance
class Square extends Shape {
    constructor(color, side) {
        super('square', color)
        this.side = side
    }
}

// Create a function called writeToFile that takes two arguments, fileName and data. This function use the fs.writeFile method to write the data to the to logo.svg. If there is an error it log the error to the console. If the process is successful, it should log 'Success!' to the console
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Success!')
        }
    })
}

// Create a function called init that uses inquirer to prompt the user for the following information:
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'shape',
            message: 'What shape would you like to create?',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'What color would you like your shape to be?'
        },
        {
            type: 'input',
            name: 'logoText',
            message: 'What text would you like to appear in your logo?'
        },
        {
            type: 'input',
            name: 'logoTextColor',
            message: 'What color would you like your text to be?'
        },
    ])

        .then((answers) => {
            console.log(answers)

            // If the user selects 'circle', create a new instance of the Circle class and pass in the color and radius. If the user selects 'triangle', create a new instance of the Triangle class and pass in the color, base, and height. If the user selects 'square', create a new instance of the Square class and pass in the color and side
            if (answers.shape === 'circle') {
                shape = new Circle(answers.shapeColor, 100)
            } else if (answers.shape === 'triangle') {
                answers.shape = 'polygon'
                shape = new Triangle(answers.shapeColor, 300, 200)
            } else if (answers.shape === 'square') {
                shape = new Square(answers.shapeColor, 300)
                answers.shape = 'rect'
            }

            // Create a variable called logo that will hold the string that will be written to the logo.svg file. This string should be an SVG file that will render the shape and text that the user selected.
            if (answers.shape === 'polygon') {
                logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

                <polygon points="${shape.base / 2},0 ${shape.base}, ${shape.height} 0,${shape.height}" fill="${shape.color}" />

                <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.logoTextColor}">${answers.logoText}</text>

                </svg>`
            } else if (answers.shape === 'rect') {
                logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="${shape.side}" height="${shape.side}" fill="${shape.color}" />
                <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.logoTextColor}">${answers.logoText}</text>
                </svg>`
            } else if (answers.shape === 'circle') {
                logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="100" r="${shape.radius}" fill="${shape.color}" />
                <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.logoTextColor}">${answers.logoText}</text>
                </svg>`
            }

            writeToFile(fileName, logo)

        })

}

init()


