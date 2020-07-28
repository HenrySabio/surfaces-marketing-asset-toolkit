/* ----- BEGIN: Application Dependency and Variable setup ----- */

const cliProgress = require('cli-progress');
const inquirer = require("inquirer");

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system module, converts text file data to an arrays for renaming
const fs = require('fs');
let originalNames = fs.readFileSync('data/originalName.txt').toString().split('\n');
let newNames = fs.readFileSync('data/newName.txt').toString().split('\n');

// For each name in originalNames array - search image folder
// If match is found, rename file using name in same index of the newNames array.
for (var i = 0; i < productArray.length; i++) {
    productArray[i] = productArray[i] + '_A';
}

/* ----- End: Application Dependency and Variable setup ----- */