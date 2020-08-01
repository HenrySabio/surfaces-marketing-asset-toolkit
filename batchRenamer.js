/* ----- BEGIN: Application Dependency and Variable setup ----- */
const cliProgress = require('cli-progress');
const inquirer = require("inquirer");

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system module, converts text file data to an arrays for renaming
const fs = require('fs');
let files = fs.readdirSync('images');
let originalNames = fs.readFileSync('data/originalName.txt').toString().split('\n');
let newNames = fs.readFileSync('data/newName.txt').toString().split('\n');
let prefix = '';

// Creates a new progress bar instance
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let barValue = 0;

/* ----- End: Application Dependency and Variable setup ----- */

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

const fileSearch = (w) => {
    findPrefix(w);
    let x = originalNames.indexOf(w.substr(0, w.indexOf('_')));
    let y = w.substr(0, w.indexOf('_'));
    // For each name in originalNames array - search image folder
    // If match is found, rename file using name in same index of the newNames array.
    if (originalNames.includes(y)) {
        let originalPath = `images/${originalNames[x]}${prefix}`;
        let newPath = `images/${newNames[x]}${prefix}`;
        renameFiles(originalPath, newPath);
    } else {
        return;
    }
}

const renameFiles = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        return;
    });
}

// End Functions

// Set bar length to amount of items we are searching for, start point to 0
bar1.start(originalNames.length, 0);

// Main Application Start

files.forEach(function (file, index) {
    (function (index) {
        setTimeout(function () {
            bar1.increment();
            if (index === originalNames.length) {
                fileSearch(file);
                bar1.stop();
                return;
            } else if (index < originalNames.length) {
                bar1.update(barValue++);
                fileSearch(file);
                return;
            }
        }, index * 100);
    })(index);
})

/* ----- Main Application End ----- */