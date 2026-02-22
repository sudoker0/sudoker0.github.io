![sudoker0's Website](https://sudoker0.github.io/website/image/social_preview.png)

# sudoker0's website

[![sudoker0 - sudoker0.github.io](https://img.shields.io/static/v1?label=sudoker0&message=sudoker0.github.io&color=red&logo=github)](https://github.com/sudoker0/sudoker0.github.io)
[![License](https://img.shields.io/badge/License-MIT-red)](#-license)
[![stars - sudoker0.github.io](https://img.shields.io/github/stars/sudoker0/sudoker0.github.io?style=social)](https://github.com/sudoker0/sudoker0.github.io)
[![forks - sudoker0.github.io](https://img.shields.io/github/forks/sudoker0/sudoker0.github.io?style=social)](https://github.com/sudoker0/sudoker0.github.io)

[![CodeQL](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/codeql-analysis.yml)
[![Main](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/main.yml/badge.svg)](https://github.com/sudoker0/sudoker0.github.io/actions/workflows/main.yml)

## Info
Hello! This is my personal website which is also one of my earliest repository on my account. The main purpose of this website is to show information about me, project I've created and other relevant information.

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
    npm install # very important!
    ```
3. Running the build script:
    ```bash
    npm run build # recommended
    ```
    OR
    ```bash
    node build.mjs # to only run the build script and not the `update-site-data.py` script
    # you can view the help page by typing `node build.mjs --help`
    ```
4. Host the website locally:
    > Important notice: Compiled files will be put in the `dist` directory, so make sure to set the root of the server to the `dist` directory, either in the extension settings, or in the program you use to host the site.
    - For VSCode users: `Live Server` extension is recommended, although you can use other extensions to host the site.
    - For non-VSCode users: You can use any web server program available, as long as you can set it up.

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

**2024 sudoker0 (QuanMCPC). Website made with 50% love, 48% hard work, and 2% sugar:)**
