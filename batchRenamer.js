/* ----- BEGIN: Application Dependency and Variable setup ----- */
const cliProgress = require('cli-progress');
const inquirer = require("inquirer");

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system module, converts text file data to an arrays for renaming
const fs = require('fs');
let files = fs.readdirSync('images');
let filesIndex = files.length - 1;
let originalNames = fs.readFileSync('data/originalName.txt').toString().split('\n');
let newNames = fs.readFileSync('data/newName.txt').toString().split('\n');
let prefix = '';

// Creates a new progress bar instance
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let barValue = 0;

/* ----- End: Application Dependency and Variable setup ----- */

// Functions

const findPrefix = (file) => {
    if (file.endsWith('_A.psd')) {
        prefix = '_A.psd';
    } else if (file.endsWith('_B.psd')) {
        prefix = '_B.psd';
    } else if (file.endsWith('_C.psd')) {
        prefix = '_C.psd';
    } else if (file.endsWith('_D.psd')) {
        prefix = '_D.psd';
    } else if (file.endsWith('_01.psd')) {
        prefix = '_01.psd';
    } else if (file.endsWith('_02.psd')) {
        prefix = '_02.psd';
    } else if (file.endsWith('_03.psd')) {
        prefix = '_03.psd';
    } else if (file.endsWith('_04.psd')) {
        prefix = '_04.psd';
    } else if (file.endsWith('_05.psd')) {
        prefix = '_05.psd';
    } else if (file.endsWith('_06.psd')) {
        prefix = '_06.psd';
    } else if (file.endsWith('_07.psd')) {
        prefix = '_07.psd';
    } else {
        prefix = '';
    }
}

// Takes file from images folder and searches if exists in list of files to rename 
const fileSearch = (w) => {
    findPrefix(w);
    // Finds index of file in originalNames array - returns -1 if does not exists
    let x = originalNames.indexOf(w.substr(0, w.indexOf('_')));
    // Sets file name (without prefix & format) to variable
    let y = w.substr(0, w.indexOf('_'));

    // If file exsists inside of originalNames Array
    if (originalNames.includes(y)) {
        // Defines original and new file path for renaming
        let originalPath = `images/${originalNames[x]}${prefix}`;
        let newPath = `images/${newNames[x]}${prefix}`;

        // Renames file located at originalPath to newPath
        renameFiles(originalPath, newPath);
    } else {
        // If file does not exist in list - return & move on to next file in folder
        return;
    }
}

// Renames file using paths passed to parameters
const renameFiles = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        return;
    });
}

// End Functions

// Set bar length to amount of items we are searching for, start point to 0
bar1.start(filesIndex, 0);

// Main Application Start

// For every file found in folder... search originalNames array and rename if exists using newNames array
files.forEach(function (file, index) {
    (function (index) {
        setTimeout(function () {
            bar1.increment();
            if (index === filesIndex) {;
                fileSearch(file);
                bar1.stop();
                return;
            } else if (index < filesIndex) {
                bar1.update(barValue++);
                fileSearch(file);
                return;
            }
        }, index * 100);
    })(index);
})

/* ----- Main Application End ----- */