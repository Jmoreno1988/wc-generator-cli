var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');

var nameComponent = null;
var nameClassComponent = null;
var author = null;
var description = null;
var path = null;

clear();
console.log(
    chalk.green("\n wc-generator-cli \n")
);

var questions = [
    {
      name: 'nameComponent',
      type: 'input',
      message: 'Nombre del componente:',
      validate: function( value ) {
        if (value.length) {
            nameComponent = value;
            nameClassComponent = toClassName(value);
            return true;
        } else {
            return 'Nombre de componente no valido.';
        }
      }
    },
    {
      name: 'author',
      type: 'input',
      message: 'Autor (opcional):',
      validate: function(value) {
        if (value.length) {
            author = value;
            return true;
        } else {
            author = "";
            return true;
        }
      }
    },{
      name: 'description',
      type: 'input',
      message: 'Descripción (opcional):',
      validate: function(value) {
        if (value.length) {
            description = value;
            return true;
        } else {
            description = "";
            return true;
        }
      }
    },{
      name: 'path',
      type: 'input',
      message: 'Ruta de instalación:',
      validate: function(value) {
        if (value.length) {
            path = value;
            return true;
        } else {
            return 'Ruta de instalación no valida.';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(createComponent);

  function createComponent() {
    var signal = "##nameComponent";
    var re = new RegExp(signal, 'g');
    var finalPath = path + "/" + nameComponent; 
    
    fs.mkdirSync(finalPath);
    
    var cIndex = fs.readFileSync("wc-template/index.html", "utf8");
    cIndex = cIndex.replace(re, nameComponent)
    fs.writeFileSync(finalPath + "/" + nameComponent + ".html", cIndex);

    var cStyles = fs.readFileSync("wc-template/styles.html", "utf8");
    cStyles = cStyles.replace(re, nameComponent);
    fs.writeFileSync(finalPath + "/" + nameComponent + "-styles.html", cStyles);

    var cTypeScript = fs.readFileSync("wc-template/wc.ts", "utf8");
    cTypeScript = cTypeScript.replace(re, nameClassComponent);
    fs.writeFileSync(finalPath + "/" + nameClassComponent + ".ts", cTypeScript);

    console.log(chalk.green("\n Componente generado con exito!"));
}

function toClassName(name) {
    if (!name) return;

    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function isNameValidate() {
    // No puede tener puntos 
    // El unico carater raro debe ser -
    //debe tener un guion y dos palabras minimo
}

