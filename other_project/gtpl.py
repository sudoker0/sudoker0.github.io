__ver__ = 0.5
# Guess The Programming Language v0.5 (Written in Python)
# Created by QuanMCPC (https://quanmcpc.site/), licensed under MIT license
# Inspired from https://guessthiscode.com/

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
except ModuleNotFoundError as e:
    print(f"[ERROR]: Cannot find important module: \"{e.name}\", this can be due to old Python version.")
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

# Log message with colors
def log(message, color: bool):
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

# Some variable declaration
code_list = []
list_count = 0
question_count = 0
point = 0
header = {"Authorization": f"token {base64.b64decode(b'Z2hwX1d5czM2ZjBWaFhqaVFpa1B6S1Z2cWR0RXZpRDVTVjRReDNCbw==').decode('utf-8')}"}
# startTime = 0
clearConsole = False
moveOnAfterCorrectGuess = False
allowColor = False

# Attempt to import the "requests" module
try:
    import requests
    # from pypresence import Presence
    # import discord_rpc
except ModuleNotFoundError as e:
    if e.name == "pypresence":
        warning(f"\"{e.name}\" cannot be loaded. Even through the package is not required for the game to run, it's recommend to install the package for the fullest experience.\n", allowColor)
    else:
        error(f"This game cannot continue because this require the \"{e.name}\" module!\nTry install the module using:\n - \"pip install {e.name}\"\nor\n - \"conda install {e.name}\"", allowColor)
        exit()
# try:
#     import requests
# except ModuleNotFoundError:
#     error("This game cannot continue because this require the \"requests\" module!\nInstall the module using:\n - \"pip install requests\"\nor\n - \"conda install requests\"", allowColor)
#     exit()

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

# Get data from GitHub API (More specifically, GitHub Gist API), but since in the GitHub Gist
# people post code with a lot of different programming language, we also gonna filter out
# the "good" programming language, which is gonna be from the (allowedLanguage) variable
def getGistData(allowedLanguage: list):
    newList = []
    log("Fetching data from Github API...", allowColor)
    r = requests.get(url=f"https://api.github.com/gists/public?page={random.randint(0, 100)}", headers=header).json()
    log("Filtering inputed data from the allowedLanguage list...", allowColor)
    for item in r:
        if (str(item["files"][next(iter(item["files"]))]["language"]) in allowedLanguage): newList.append(item)
    log("Success!", allowColor)
    return newList

# Create a list of random language with one of them being the correct language
def randomLanguageList(trueLanguage: str, listOfLanguage: list, lenOfTheList: int = 5):
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
    return {
        "list": list_lang,
        "true_pos": truePos
    }

# The actual game code
def game():
    # Allow the function to access the global variable
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
        # Check for the rate limit of the current IP address
        rate_limit_response = requests.get(url="https://api.github.com/rate_limit", headers=header)
        # Check if your current IP address still have access to the GitHub API
        if (int(rate_limit_response.json()["resources"]["core"]["remaining"]) <= 0):
            # You don't have any more access! Oof
            time_string = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(rate_limit_response.json()["resources"]["core"]["reset"])))
            error(f"The game can no longer get data from GitHub API due to rate limit.\nYou should be able to run the game again on {time_string}", allowColor)
        else:
            # Yay, you still have access
            # Has the cache been used up?
            if (list_count >= len(code_list)):
                # If it's used up, re-fill the cache
                log("The cache has been used up, now re-fetching...", allowColor)
                code_list = getGistData(allowedLanguage=true_language)
                list_count = 0
            log("Getting code from the raw URL from the cache...", allowColor)
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
                    # Get the correct language name
                    lang = option["list"][whereCorrectLang]
                    # Check if user has answered correctly
                    if user_option == whereCorrectLang + 1:
                        # Yay, the person has answered correctly, please add 50 points to the player!
                        point += 50
                        cprint(f"{bcolors.OKBLUE}Correct!{bcolors.OKGREEN} The programming language of the code above was {lang}\nYou've earned +50 points, which makes your current point: {point}!\n", allowColor)
                        if moveOnAfterCorrectGuess:
                            list_count += 1
                            question_count += 1
                            cprint("=============================================", allowColor)
                            break
                        # Do the person want to continue?
                        should_continue = cinput("Do you want to continue? [Yes (You can also press the Enter key instead) / No] > ", allowColor).lower()
                        if (should_continue == "yes" or should_continue == ""):
                            # Nice
                            list_count += 1
                            question_count += 1
                            cprint("=============================================", allowColor)
                            break
                        else:
                            # Aww
                            cprint("Thank you for spending your time for playing this game!", allowColor)
                            cprint("=============================================", allowColor)
                            exit(69)
                    elif user_option < 1 or user_option > 5:
                        raise ValueError
                    else:
                        # Oof, the person has answered incorrectly
                        cprint(f"{bcolors.FAIL}Incorrect!{bcolors.OKGREEN} The programming language of the code above was {lang}\nYour current point is {point}!", allowColor)
                        # Do the person want to restart?
                        should_restart = cinput("Do you want to start over? [Yes (You can also press the Enter key instead) / No] > ", allowColor).lower()
                        if (should_restart == "yes" or should_restart == ""):
                            # Reset the point and restart
                            question_count = 0
                            point = 0
                            list_count += 1
                            cprint("=============================================", allowColor)
                            break
                        else:
                            # Aww
                            cprint("Thank you for spending your time for playing this game!", allowColor)
                            cprint("=============================================", allowColor)
                            exit(420)
                except ValueError:
                    # That's not a valid answer
                    error("Invalid answer (Valid answer have to be a number > 0 and number < 6)", allowColor)
                    continue

# def UpdateDiscordRPC(client_id: str, rounds_num: int, points_num: int):
#     RPC = Presence(client_id) #867008888712462396
#     RPC.connect()
#     RPC.update(
#         details=f"Rounds: {rounds_num}, Points: {points_num}",
#         state="Trying to guess the language...",
#         start=startTime,
#         large_text=f"Guess The Programming Language v{__ver__}",
#         buttons=[
#             {
#                 "label": "GitHub link",
#                 "url": "https://github.com/QuanMCPC/QuanMCPC.github.io/blob/master/other_project/gtpl.py"
#             },
#             {
#                 "label": "My Website",
#                 "url": "https://quanmcpc.site"
#             }
#         ]
#     )

def main(argv):
    global clearConsole
    global allowColor
    global moveOnAfterCorrectGuess
    global startTime
    # Arguments check
    if "-h" in argv or "--help" in argv:
        # Help flag
        cprint(
            (
                "=============================================\n"
                f"GTPL v{__ver__} - Help Page\n"
                "Usage: gtpl.py [-h | --help] OR gtpl.py [-c | --clearConsole] [-m | --moveOnAfterCorrectGuess]\n"
                "-h | --help                    : Display this help page\n"
                "-c | --clearConsole            : Clear the console after each guesses\n"
                "-m | --moveOnAfterCorrectGuess : After each corrected guesses, move on to the next round\n"
                "-a | --allowColor              : Enable color highlighting\n"
                "=============================================\n"
            ), allowColor
        )
        exit()
    else:
        if "-c" in argv or "--clearConsole" in argv:
            # Clear console flag
            clearConsole = True
        if "-m" in argv or "--moveOnAfterCorrectGuess" in argv:
            # Move on after correct guesses flag
            moveOnAfterCorrectGuess = True
        if "-a" in argv or "--allowColor" in argv:
            allowColor = True

    startTime = int(time.time())
    # def caller(): UpdateDiscordRPC("***", question_count, point)
    # Print the intro text
    cprint(
        (
            "=============================================\n"
            f"Guess The Programming Language v{__ver__}\n"
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
        log("Initializing stuff...", allowColor)
        game()
    else:
        # Aww
        log("Thank you for atleast spend some time run this game!", allowColor)
        exit(666)

if __name__ == "__main__":
    main(sys.argv[1:])