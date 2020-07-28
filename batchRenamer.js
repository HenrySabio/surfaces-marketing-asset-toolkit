/* ----- BEGIN: Application Dependency and Variable setup ----- */

const cliProgress = require('cli-progress');
const inquirer = require("inquirer");

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system module, converts text file data to an arrays for renaming
const fs = require('fs');
let originalNames = fs.readFileSync('data/originalName.txt').toString().split('\n');
let newNames = fs.readFileSync('data/newName.txt').toString().split('\n');

// Creates a new progress bar instance
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let barValue = 1;

// Functions

const renameFiles = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        return;
    });
}

// End Functions

// Set bar length to amount of items we are searching for, start point to 0
bar1.start(originalNames.length, 1, {
    speed: 'N/A'
});

// For each name in originalNames array - search image folder
// If match is found, rename file using name in same index of the newNames array.
for (var i = 0; i < originalNames.length; i++) {
    originalNames[i] = originalNames[i] + '_A';
    let originalPath = `images/${originalNames[i]}.jpg`;
    let newPath = `images/${newNames[i]}.jpg`;

    (function (i) {
        setTimeout(function () {
            bar1.increment();
            if (i == (originalNames.length - 1)) {
                bar1.update(barValue++);
                bar1.stop();
                renameFiles(originalPath, newPath);
                console.log('\n-------------------------------------------------------\n');
                console.log('\nMission Complete! --> Please check the log files in the results folder for final confirmation.\n');
                return;
            } else {
                bar1.update(barValue++);
                fs.access(originalPath, fs.F_OK, (err) => {
                    if (err) {
                        return
                    }
                    renameFiles(originalPath, newPath);
                })
            }
        }, 400 * i);
    })(i);
}

/* ----- End: Application Dependency and Variable setup ----- */