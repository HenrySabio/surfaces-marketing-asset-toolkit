// Load dependencies
require('dotenv').config();
require('isomorphic-fetch');
const inquirer = require("inquirer");
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.API_KEY, fetch });

// Assigns current date to variable - formatted yyyy-mm-dd
const date = new Date().toISOString().slice(0, 10);

// Loads file system modile, converts text file data to an array
const fs = require('fs');
const productArray = fs.readFileSync('query.txt').toString().split('\n');

let requestedBy, originalPath, fileName, username;


// Create a "Prompt" with a series of questions.
console.log('\n')
inquirer
    .prompt([
        // Requests name of user - this name will be used for the dropbox folder created to save queried images.
        {
            type: "input",
            message: "What is your name?\n  Files will be saved in this folder:",
            name: "username"
        }
    ])
    .then(function (inquirerResponse) {
        username = inquirerResponse.username;
        inquirer
            .prompt([
                {
                    type: "confirm",
                    message: `Your name is ${username}, is this correct?`,
                    name: "confirm",
                    default: true
                },
                {
                    type: "confirm",
                    message: "\n\nHave you updated the 'query.txt' file with items you will be searching for?\nBe sure to have every individual item on its own line.",
                    name: "confirm",
                    default: true
                }
            ])
            .then(function (inquirerResponse) {
                // If the inquirerResponse confirms as correct, beginSearch function is called.
                if (inquirerResponse.confirm) {
                    console.log('\n-------------------------------------------------------')
                    console.warn('Beginning Search for your rquested files...')
                    console.log('-------------------------------------------------------\n')
                    beginSearch();
                }
                // If not confirmed then program ends - try again when ready
                else {
                    console.log("\nThat's okay " + username + ", come again when you are more sure.\n");
                }
            });
    })

// Takes product array and name of person requesting to begin api calls for search
function dropboxSearch(searchQuery, requestedWho) {
    requestedBy = requestedWho;

    // Search begins at path defined, takes the first search result 
    dbx.filesSearch({ path: '', mode: 'filename_and_content', max_results: 1, query: searchQuery })

        // If product is found - copyFile function is called 
        .then(function (res) {
            originalPath = res.matches[0].metadata.path_lower;
            fileName = res.matches[0].metadata.name;
            copyFile(originalPath, requestedBy, fileName);
        })
        // If product is not found - conosle logs the item that is missing
        .catch(function (error) {
            console.log('\n------------------------Error------------------------')
            console.error('Unable to find: ' + searchQuery);
            console.log('------------------------Error------------------------\n')
        });
}

// Takes query result data and creates a copy in folder named after user who requested files under the current data
function copyFile(originalPath, requestedBy, fileName) {
    dbx.filesCopy({ allow_shared_folder: true, autorename: true, from_path: originalPath, to_path: `/requested-files/${requestedBy}/${date}/${fileName}` })
        // Confirms file has been copied
        .then(function (res) {
            console.log('Successfully copied: ' + fileName);
        })
        // Console logs if file is unable to be copied
        .catch(function (error) {
            console.log('------------------------Error------------------------')
            console.log('Failed to copy: ' + fileName);
            console.log('\n'+error);
            console.log('------------------------Error------------------------')
        });
}

// Work in progress - DNU - Automatically creates share link to folder where data was saved.
function shareFolder(requestedBy) {
    dbx.sharingShareFolder({ path: `/requested-files/${requestedBy}/${date}/` })
        .then(function (res) {
            console.log('share success for ' + requestedBy);
        })
        .catch(function (error) {
            console.log('share fail');
        });
}

// Calls search function 
function beginSearch() {
    // Loops through product array to search for each item and copy as they are found
    for (let i = 0; i < productArray.length; i++) {
        // setTimeout triggered as an Immdiately Invoked Function Expression (IIFE)
        // Must be done as IIFE because setTimeout is nonblocking and returns immidiately - no delay seen inside for loop if done normally
        (function (i) {
            setTimeout(function () {
                dropboxSearch(productArray[i], username);
            }, 1000 * i);
        })(i);
    };
}