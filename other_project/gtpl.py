__ver__ = 0.7
# Guess The Programming Language v0.7 (Written in Python)
# Created by QuanMCPC (https://quanmcpc.site/), licensed under MIT license
# Inspiration from https://guessthiscode.com/

# MIT License

# Copyright (c) 2021 QuanMCPC

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# Load a bunch of important module
try:
    import random
    import time
    import base64
    from sys import exit
    import sys
    import requests
except ModuleNotFoundError as e:
    print(f"[ERROR]: Cannot find important module: \"{e.name}\", this may be due to old Python version or the module hadn't been installed.")
    exit()

# Colors
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\33[33m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Some variable declaration
code_list = []
list_count = 0
question_count = 0
point = 0
api_key = base64.b64decode(b'Z2hwX1d5czM2ZjBWaFhqaVFpa1B6S1Z2cWR0RXZpRDVTVjRReDNCbw==').decode('utf-8')
header = {"Authorization": f"token {api_key}"}
# startTime = 0
clearConsole = False
moveOnAfterCorrectGuess = False
allowColor = False
debug_level = 1

# Log message with colors
def log(message, color: bool, level=1):
    if level <= debug_level:
        if color: print(f"{bcolors.OKBLUE}[LOG]: {message}{bcolors.ENDC}")
        else: print(f"[LOG]: {message}")
# Print error with colors
def error(message, color: bool):
    if color: print(f"{bcolors.FAIL}[ERROR]: {message}{bcolors.ENDC}")
    else: print(f"[ERROR]: {message}")
# Print warning with colors
def warning(message, color: bool):
    if color: print(f"{bcolors.WARNING}[WARNING]: {message}{bcolors.ENDC}")
    else: print(f"[WARNING]: {message}")
# Print text with colors
def cprint(message, color: bool):
    if color: print(f"{bcolors.OKGREEN}{message}{bcolors.ENDC}")
    else: print(message)
# Waiting for input with colors
def cinput(message, color: bool):
    if color: return input(f"{bcolors.OKCYAN}{message}{bcolors.ENDC}")
    else: return input(message)

# Since there are many programming languages out there, we only gonna select languages that we can
# actually use to write program. The "true_language" variable under will become important later
true_language = [
    "Python", "TSX", "Swift", "R",
    "PowerShell", "Ruby", "Kotlin", "Shell",
    "Objective-C", "CSS", "HTML", "JavaScript",
    "PHP", "TypeScript", "Hack", "ColdFusion",
    "C#", "C++", "C", "Java",
    "Dart", "Perl", "Go", "Dockerfile",
    "Haskell", "GLSL"
]

# Check if the game can connect to the Github API
def check_api():
    log("Checking if the game can connect to the GitHub API...", allowColor)
    try:
        requests.get("https://api.github.com/rate_limit")
        log("Yes, this game can connect to the API!", allowColor)
        return True
    except requests.exceptions.RequestException as e:
        error(f"No, this game cannot connect to the API!\n{e}", allowColor)
        return False

# Check if the specified GitHub API key is valid
def check_api_key(key: str):
    log("Checking if the specified GitHub API key is valid...", allowColor)
    try:
        r = requests.get("https://api.github.com/rate_limit", headers={"Authorization": f"token {key}"})
        if r.status_code == 200:
            log("GitHub API key is valid!", allowColor)
            return True
        else:
            error("GitHub API key is invalid!", allowColor)
            return False
    except Exception as e:
        error(f"Cannot connect to GitHub API.\n{e}", allowColor)
        return False

# Get data from GitHub API (More specifically, GitHub Gist API), but since in the GitHub Gist
# people post code with a lot of different programming language, we also gonna filter out
# the "good" programming language, which is gonna be from the (allowedLanguage) variable
def getGistData(allowedLanguage: list):
    newList = []
    log("Getting data from the GitHub Gist API...", allowColor)
    r = requests.get(url=f"https://api.github.com/gists/public?page={random.randint(0, 100)}", headers=header).json()
    log("Now filtering the received data for the Gists that have the language in the \"allowedLanguage\"", allowColor)
    for item in r:
        if (str(item["files"][next(iter(item["files"]))]["language"]) in allowedLanguage): newList.append(item)
    log("Done filtering the received data!", allowColor)
    return newList

# Create a list of random language with one of them being the correct language
def randomLanguageList(trueLanguage: str, listOfLanguage: list, lenOfTheList: int = 5) -> dict[list[str], int]:
    log("Creating a list of random languages...", allowColor)
    count = 0
    truePos = random.randint(0, lenOfTheList - 1)
    list_lang = []
    while True:
        if count >= lenOfTheList: break
        else:
            if truePos == count:
                if trueLanguage in listOfLanguage: list_lang.append(trueLanguage)
                else:
                    error(f"The language {trueLanguage} that you specify does not exist in the listOfLanguage list (CaSe SeNSiTiVe does matter btw)", allowColor)
                    return []
            else:
                ranChoice = str(random.choice(listOfLanguage))
                if ranChoice == trueLanguage or ranChoice in list_lang: count -= 1
                else: list_lang.append(ranChoice)
            count += 1
    log("Done creating a list of random languages!", allowColor)
    return {
        "list": list_lang,
        "true_pos": truePos
    }

# The actual game code
def game():
    # Allow the function to access the important global variable
    global code_list
    global list_count
    global question_count
    global allowColor
    global point

    # This is for some purpose
    while True:
        if clearConsole:
            print(chr(27)+'[2j')
            print('\033c')
            print('\x1bc')

        # Check if the current API key can connect to the GitHub API
        log("Checking if the API key can connect to the GitHub API...", allowColor)
        rate_limit_response = requests.get(url="https://api.github.com/rate_limit", headers=header)
        if (int(rate_limit_response.json()["resources"]["core"]["remaining"]) <= 0):
            # You don't have any more access! Oof
            log("No, the API key cannot connect to the API!", 2)
            time_string = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(rate_limit_response.json()["resources"]["core"]["reset"])))
            error(f"This game can no longer get data from GitHub API due to exceeding the rate limit.", allowColor)
            error(f"You can either wait for the rate limit to reset, which should happen at {time_string}", allowColor)
            error(f"Or you can specify your own API key if you don't want to wait.", allowColor)
            exit()

        # Yay, you still have access
        log("Yes, the API key can connect to the GitHub API!", allowColor)
        # Has the cache that store the URL that has the code for the game run out?
        log("Checking if the cache that store the URL that has the code for the game has run out...", allowColor)
        if (list_count >= len(code_list)):
            # If it's used up, re-fill the cache
            log("Yes, the cache has run out, now renewing the cache...", allowColor)
            code_list = getGistData(allowedLanguage=true_language)
            list_count = 0

        log("Getting some information about the Gist", allowColor)
        # Get an item in the cache based on the list_count
        item = code_list[list_count]
        # Get information about the file in the gists
        code_object = item["files"][next(iter(item["files"]))]
        # Get the code based on the URL provided in the code_object
        code = requests.get(url=str(code_object["raw_url"]), headers=header).text
        # Get a random language list
        option = randomLanguageList(code_object["language"], true_language)
        # Get the actual list
        option_list = option["list"]
        # Print stuff
        if allowColor:
            print(
                (
                    f"{bcolors.OKGREEN}\n"
                    "=============================================\n"
                    f"Round: {question_count}\n"
                    f"Number of times the game can get data from GitHub API: {int(rate_limit_response.json()['resources']['core']['remaining'])}\n"
                    f"Your current points: {str(point)}\n"
                    f"{bcolors.WARNING}"
                    "-------------CODE_START------------\n"
                    f"{code}\n"
                    "--------------CODE_END-------------\n"
                    f"{bcolors.OKGREEN}"
                    "What programming language do you think this is from the code above?\n"
                    f"1. {option_list[0]}\n"
                    f"2. {option_list[1]}\n"
                    f"3. {option_list[2]}\n"
                    f"4. {option_list[3]}\n"
                    f"5. {option_list[4]}\n"
                    "-----------------------------------\n"
                    f"{bcolors.ENDC}"
                )
            )
        else:
            print(
                (
                    "=============================================\n"
                    f"Round: {question_count}\n"
                    f"Number of times the game can get data from GitHub API: {int(rate_limit_response.json()['resources']['core']['remaining'])}\n"
                    f"Your current points: {str(point)}\n"
                    "-------------CODE_START------------\n"
                    f"{code}\n"
                    "--------------CODE_END-------------\n"
                    "What programming language do you think this is from the code above?\n"
                    f"1. {option_list[0]}\n"
                    f"2. {option_list[1]}\n"
                    f"3. {option_list[2]}\n"
                    f"4. {option_list[3]}\n"
                    f"5. {option_list[4]}\n"
                    "-----------------------------------\n"
                )
            )
        while True:
            # Allow the function to access the global variable
            global user_option
            try:
                # Waiting for an answer
                user_option = int(cinput("Answer: ", allowColor))
                # Set the variable (whereCorrectLang) to the position of the correct language in the "actual list"
                whereCorrectLang = int(option["true_pos"])
                # Get the name of the correct language
                log("Getting the name of the correct language...", allowColor, 2)
                lang = option["list"][whereCorrectLang]
                # Check if user has answered correctly
                log("Checking if the user has answered correctly...", allowColor, 2)
                if user_option == whereCorrectLang + 1:
                    # Yay, the person has answered correctly, please add 50 points to the player!
                    log("Yes, the user has answered correctly!", allowColor, 2)
                    point += 50
                    if allowColor:
                        cprint(f"{bcolors.OKBLUE}Correct!{bcolors.OKGREEN} The programming language of the code above was {lang}\nYou've earned +50 points, which makes your current point: {point}!\n", allowColor)
                    else:
                        print(f"Correct! The programming language of the code above was {lang}\nYou've earned +50 points, which makes your current point: {point}!\n")
                    if moveOnAfterCorrectGuess:
                        list_count += 1
                        question_count += 1
                        cprint("=============================================", allowColor)
                        break
                    # Do the person want to continue?
                    should_continue = cinput("Do you want to continue? [Yes (You can also press the Enter key instead) / No] > ", allowColor).lower()
                    if (should_continue == "yes" or should_continue == ""):
                        # Nice
                        log("Yes, the user wants to continue!", allowColor, 2)
                        list_count += 1
                        question_count += 1
                        cprint("=============================================", allowColor)
                        break
                    else:
                        # Aww
                        log("No, the user wants to stop!", allowColor, 2)
                        cprint("Thank you for spending your time for playing this game!", allowColor)
                        cprint("=============================================", allowColor)
                        exit(69)
                elif user_option < 1 or user_option > 5:
                    raise ValueError
                else:
                    # Oof, the person has answered incorrectly
                    log("No, the user has answered incorrectly!", allowColor, 2)
                    if allowColor:
                        cprint(f"{bcolors.FAIL}Incorrect!{bcolors.OKGREEN} The programming language of the code above was {lang}\nYour current point is {point}!", allowColor)
                    else:
                        print(f"Incorrect! The programming language of the code above was {lang}\nYour current point is {point}!")
                    # Do the person want to restart?
                    should_restart = cinput("Do you want to start over? [Yes (You can also press the Enter key instead) / No] > ", allowColor).lower()
                    if (should_restart == "yes" or should_restart == ""):
                        # Reset the point and restart
                        log("Yes, the user wants to restart!", allowColor, 2)
                        question_count = 0
                        point = 0
                        list_count += 1
                        cprint("=============================================", allowColor)
                        break
                    else:
                        # Aww
                        log("No, the user wants to stop!", allowColor, 2)
                        cprint("Thank you for spending your time for playing this game!", allowColor)
                        cprint("=============================================", allowColor)
                        exit(420)
            except ValueError:
                # That's not a valid answer
                error("Invalid answer (Valid answer have to be a number > 0 and number < 6)", allowColor)
                continue

def main(argv: list[str]):
    global clearConsole
    global allowColor
    global moveOnAfterCorrectGuess
    # global startTime
    global debug_level

    log("Booting up...", allowColor)

    # Get a list of specified arguments
    log(f"Detected argument(s): {argv}", allowColor)
    if "-h" in argv or "--help" in argv:
        # Help flag
        cprint(
            (
                "=============================================\n"
                f"GTPL v{__ver__} - Help Page\n"
                "Usage: gtpl.py [options...]\n"
                " -h, --help                    : Display this help page\n"
                " -c, --clearConsole            : Clear the console after each guesses\n"
                " -m, --moveOnAfterCorrectGuess : After each corrected guesses, move on to the next round\n"
                " -a, --allowColor              : Enable color highlighting\n"
                " -t, --token                   : Specify your own GitHub API key from a file called: \"gh_api_key.secret\"\n"
                " -v, --verbose [<level>]       : Display some debug information. Specify the amount of information outputted by setting the level of debug, which start from 0 (no debug) (default is 1)\n"
                "=============================================\n"
            ), allowColor
        )
        exit()
    if "-c" in argv or "--clearConsole" in argv:
        # Clear console
        clearConsole = True
    if "-m" in argv or "--moveOnAfterCorrectGuess" in argv:
        # Move on after correct guesses
        moveOnAfterCorrectGuess = True
    if "-a" in argv or "--allowColor" in argv:
        # Allow color highlighting
        allowColor = True
    if "-t" in argv or "--token" in argv:
        # Specify own GitHub API key
        log("Attempting to read the file that contain the API key...", allowColor)
        try:
            with open("gh_api_key.secret", "r") as f:
                global api_key
                api_key = f.read().strip()
                if not check_api_key(api_key): exit()
        except FileNotFoundError:
            error("You have to specify your own GitHub API key from a file called: \"gh_api_key.secret\"", allowColor)
            exit()
    if "-v" in argv or "--verbose" in argv:
        # Verbose
        try:
            debug_level = int(argv[argv.index("-v") + 1])
            if debug_level < 0:
                error("The debug level cannot be less than 0", allowColor)
                exit()
        except (IndexError, ValueError):
            debug_level = 1

    if not check_api(): exit()

    # Print the intro text
    cprint(
        (
            "=============================================\n"
            f"Guess The Programming Language v{__ver__} (Inspiration from https://guessthiscode.com/)\n"
            "Are you ready to guess some programming language?\n"
            "If you're, enter Yes! If you're not, enter No or gibberish\n"
            "Also, for more settings, enter \"gtpl -h\" for the help page\n"
            "=============================================\n"
        ), allowColor
    )
    # Does the user want to start the game?
    o = cinput("[Yes (You can also press the Enter key instead) / No] > ", allowColor).lower()
    if (o == "yes" or o == ""):
        # Yay!
        log("Yes, the user does want to start the game!", allowColor, 2)
        log("Initializing some stuff, please wait...", allowColor)
        game()
    else:
        log("No, the user does not want to start the game!", 2)
        cprint("Goodbye user, it's nice knowing you.", allowColor)
        # Aww
        exit(666)

if __name__ == "__main__":
    main(sys.argv[1:])