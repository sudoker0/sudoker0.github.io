![sudoker0's Website](https://sudoker0.github.io/website/image/social_preview.png)

# sudoker0's website

[![sudoker0 - sudoker0.github.io](https://img.shields.io/static/v1?label=sudoker0&message=sudoker0.github.io&color=red&logo=github)](https://github.com/sudoker0/sudoker0.github.io)
[![License](https://img.shields.io/badge/License-MIT-red)](#-license)
[![stars - sudoker0.github.io](https://img.shields.io/github/stars/sudoker0/sudoker0.github.io?style=social)](https://github.com/sudoker0/sudoker0.github.io)
[![forks - sudoker0.github.io](https://img.shields.io/github/forks/sudoker0/sudoker0.github.io?style=social)](https://github.com/sudoker0/sudoker0.github.io)

[![CodeQL](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/codeql-analysis.yml)
[![Update Website Information](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/update_site_info.yml/badge.svg)](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/main.yml)
[![pages-build-deployment](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/pages/pages-build-deployment)

## Info
Hello! This is a personal website which is also one of my earliest repository on my account. The main purpose of this website is to show information about me, project I've created and other relevant information.

Feel free to create an issue or pull request to fix bugs or grammatical error on my website. Although if you wish to make a pull requests, refer to the [Setting up](#setting-up) section for information on how to set up the website for local development.

## Program/Tools used in the website
- For writing source code: VSCode
- For vector graphics (SVG): Inkscape
- For images (PNG): GIMP
- Tools: Git, Node, NPM

## Setting up
How to setup the website for local development:

0. Make sure the following programs are installed:
    - Git
    - Node
    - NPM
    - VSCode (not required, but recommended)
1. Clone the repository:
    ```bash
    git clone https://github.com/sudoker0/sudoker0.github.io
    ```
2. Install the dependencies:
    ```bash
    cd sudoker0.github.io/ # in case you haven't change directory to the root of the website
    npm install
    ```
3. Running the build program:
    - For VSCode users:
        - Open the project folders (`File -> Open Folder` or `File -> Add Folder to Workspace` (if you have an existing workspace))
        - Open the build tasks (`Ctrl + Shift + B` or `Ctrl + Shift + P (to open the command palette) -> "Tasks: Run Build Task"`)
        - Run the build tasks by running the `build and watch all` tasks
    - For non-VSCode users:
        - To build Pug files:
        ```bash
        node tools/compilePug.js -p "../" --watch
        ```
        - To build SCSS files:
        ```bash
        npx sass . --style compressed --source-map --watch
        ```
        - To build TypeScript files:
        ```
        npx tsc --watch
        ```
        (All of the build command above will watch for changes and auto build them for you indefinitely. To only build once, remove the `--watch` arguments)
4. Host the website locally:
    - For VSCode users: `Live Server` extension is recommended, although you can use other extensions to host the site.
    - For non-VSCode users: You can use any web server program available, as long as you can set it up.

## Details about my website

> **Details about the size of each type of file in the website**
<!--python_data_start-->
File Extensions | Percentages of Bytes | Number of files | File/Folder size (Bytes)
----------------|--------------------- |-----------------|--------------------------
\*\* | 100.0% | 0 files | 291,781,348 bytes
\* | 0.01% | 12 files | 22,446 bytes
\*.css | 0.01% | 7 files | 20,889 bytes
\*.gif | 0.16% | 2 files | 477,306 bytes
\*.html | 0.17% | 29 files | 485,912 bytes
\*.ico | 0.04% | 2 files | 112,342 bytes
\*.idx | 0.11% | 1 files | 318,984 bytes
\*.jpg | 0.0% | 1 files | 5,529 bytes
\*.js | 0.01% | 8 files | 37,745 bytes
\*.json | 0.17% | 7 files | 486,066 bytes
\*.map | 0.01% | 14 files | 36,550 bytes
\*.md | 0.0% | 2 files | 6,689 bytes
\*.mp3 | 0.0% | 1 files | 9,069 bytes
\*.old | 0.19% | 2 files | 553,570 bytes
\*.pack | 96.51% | 1 files | 281,602,326 bytes
\*.png | 0.64% | 23 files | 1,860,617 bytes
\*.pug | 0.01% | 11 files | 39,032 bytes
\*.py | 0.01% | 3 files | 33,266 bytes
\*.rev | 0.02% | 1 files | 45,468 bytes
\*.sample | 0.01% | 14 files | 25,821 bytes
\*.scss | 0.01% | 7 files | 20,884 bytes
\*.svg | 0.07% | 37 files | 210,679 bytes
\*.ts | 0.01% | 8 files | 36,521 bytes
\*.ttf | 0.35% | 5 files | 1,011,420 bytes
\*.txt | 0.0% | 1 files | 40 bytes
\*.xcf | 1.48% | 4 files | 4,314,841 bytes
\*.xml | 0.0% | 1 files | 835 bytes
\*.yml | 0.0% | 5 files | 6,400 bytes
> Last updated on: 2023-11-03
<!--python_data_stop-->

> **Details about the website's creation**
- First commit is created on July 16th, 2020 at 16:35:00 (GMT+0)
- Website came to life 33 seconds after the initial commit.
- Commit hash for my first commit: `777b1c7cd0e6a129c1776f41465de0c9a8eabea4`
- Original domain: `Quan215.github.io`
- The first week since the creation of the website still has the most commits then any other weeks, even today.

## License info
- Source code on the website is licensed under the [MIT license](/LICENSE)
- Images in the website are licensed under the [CC BY-SA 4.0 license](http://creativecommons.org/licenses/by-sa/4.0/)
- External media (like images, videos, etc.) that are under different licenses will be listed in the [CREDITS](/CREDITS.md) file

## Random stuff
```bf
-[--->+<]>-.-[--->+<]>--.-----------.---.+[--->+<]>+++.-[---->+<]>++.-[--->++<]>-.++++++++++.+[---->+<]>+++.---[->++++<]>.------------.---.--[--->+<]>-.---[->++++<]>.-----.--.++.+++..---.++++++++.+[---->+<]>++.--[->++++<]>+.----------.++++++.-[---->+<]>+++.--[->++++<]>-.--------.+++..---------.----.-.-[--->+<]>-.[->+++<]>+.+.+++++++++++++.++++++.-.[---->+<]>+++.--[->++++<]>+.--[->+++<]>.[--->+<]>----.+.+++[->+++<]>.+++++++++++++.--------------.---.+[--->+<]>+++.-----[++>---<]>.
```

**2023 sudoker0 (QuanMCPC). Website made with 50% love, 48% hard work, and 2% sugar:)**