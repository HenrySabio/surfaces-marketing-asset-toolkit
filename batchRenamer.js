/* ----- BEGIN: Application Dependency and Variable setup ----- */

const inquirer = require("inquirer");

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system module, converts text file data to an arrays for renaming
const fs = require('fs');
let files = fs.readdirSync('images');
let originalNames = fs.readFileSync('data/originalName.txt').toString().split('\n');
let newNames = fs.readFileSync('data/newName.txt').toString().split('\n');
let prefix = '';

// Functions

const findPrefix = (file) => {
    if (file.endsWith('_A.jpg')) {
        prefix = '_A.jpg';
    } else if (file.endsWith('_B.jpg')) {
        prefix = '_B.jpg';
    } else if (file.endsWith('_C.jpg')) {
        prefix = '_C.jpg';
    } else if (file.endsWith('_D.jpg')) {
        prefix = '_D.jpg';
    } else if (file.endsWith('_01.jpg')) {
        prefix = '_01.jpg';
    } else if (file.endsWith('_02.jpg')) {
        prefix = '_02.jpg';
    } else if (file.endsWith('_03.jpg')) {
        prefix = '_03.jpg';
    } else if (file.endsWith('_04.jpg')) {
        prefix = '_04.jpg';
    } else if (file.endsWith('_05.jpg')) {
        prefix = '_05.jpg';
    } else if (file.endsWith('_06.jpg')) {
        prefix = '_06.jpg';
    } else if (file.endsWith('_07.jpg')) {
        prefix = '_07.jpg';
    } else {
        prefix = '';
    }
}

const fileSearch = (y) => {
    findPrefix(y);
    // For each name in originalNames array - search image folder
    // If match is found, rename file using name in same index of the newNames array.
    for (var i = 0; i < originalNames.length; i++) {
        originalNames[i] = originalNames[i];
        let originalPath = `images/${originalNames[i]}${prefix}`;
        let newPath = `images/${newNames[i]}${prefix}`;

        renameFiles(originalPath, newPath);
    }
}

const renameFiles = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        return;
    });
}

// End Functions


files.forEach(function (file) {
    fileSearch(file);
})


/* ----- End: Application Dependency and Variable setup ----- */