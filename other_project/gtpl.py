# Guess The Programming Language v0.2 (Written in Python)
# Created by QuanMCPC (https://quanmcpc.site/), licensed under MIT license
# Inspired from https://guessthiscode.com/

# Colors
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Log message with colors
def log(message):
    print(f"{bcolors.OKBLUE}[LOG]: {message}{bcolors.ENDC}")

# Print error with colors
def error(message):
    print(f"{bcolors.FAIL}[ERROR]: {message}{bcolors.ENDC}")

# Print text with colors
def cprint(message):
    print(f"{bcolors.OKGREEN}{message}{bcolors.ENDC}")

# Waiting for input with colors
def cinput(message):
    return input(f"{bcolors.OKCYAN}{message}{bcolors.ENDC}")

# Attempt to import the "requests" module
try:
    import requests
except ModuleNotFoundError:
    error("Error, this game cannot continue because this require the \"requests\" module!\nInstall the module using:\n - \"pip install requests\"\nor\n - \"conda install requests\"")
    exit()

# Load a bunch of important module
import random
import time
import base64
from sys import exit
import sys

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

# Some more variable declearing
code_list = []
list_count = 0
question_count = 0
point = 0
header = {"Authorization": f"token {base64.b64decode(b'Z2hwX1d5czM2ZjBWaFhqaVFpa1B6S1Z2cWR0RXZpRDVTVjRReDNCbw==').decode('utf-8')}"}
clearConsole = False
moveOnAfterCorrectGuess = False

# Get data from GitHub API (More specifically, GitHub Gist API), but since in the GitHub Gist
# people post code with a lot of different programming language, we also gonna filter out
# the "good" programming language, which is gonna be from the (allowedLanguage) variable
def getGistData(allowedLanguage: list):
    newList = []
    log("Fetching data from Github API...")
    r = requests.get(url=f"https://api.github.com/gists/public?page={random.randint(0, 100)}", headers=header).json()
    log("Filtering inputed data from the allowedLanguage list...")
    for item in r:
        if (str(item["files"][next(iter(item["files"]))]["language"]) in allowedLanguage): newList.append(item)
    log("Success!")
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
                    error(f"Error, the language {trueLanguage} that you specify does not exist in the listOfLanguage list (CaSe SeNSiTiVe does matter btw)")
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
            error(f"Error, the game can no longer get data from GitHub API due to rate limit.\nYou should be able to run the game again on {time_string}")
        else:
            # Yay, you still have access
            # Has the cache been used up?
            if (list_count >= len(code_list)):
                # If it's used up, re-fill the cache
                log("The cache has been used up, now re-fetching...")
                code_list = getGistData(allowedLanguage=true_language)
                list_count = 0
            log("Getting code from the raw URL from the cache...")
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
            while True:
                # Allow the function to access the global variable
                global user_option
                try:
                    # Waiting for an answer
                    user_option = int(cinput("Answer: "))
                    # Set the variable (whereCorrectLang) to the position of the correct language in the "actual list"
                    whereCorrectLang = int(option["true_pos"])
                    # Get the correct language name
                    lang = option["list"][whereCorrectLang]
                    # Check if user has answered correctly
                    if (user_option == whereCorrectLang + 1):
                        # Yay, the person has answered correctly, please add 50 points to the player!
                        point += 50
                        cprint(f"Correct! The programming language of the code above was {lang}\nYou've earned +50 points, which makes your current point: {point}!\n")
                        if moveOnAfterCorrectGuess:
                            list_count += 1
                            question_count += 1
                            cprint("=============================================")
                            break
                        # Do the person want to continue?
                        should_continue = cinput("Do you want to continue? [Yes (You can also press the Enter key instead) / No] > ").lower()
                        if (should_continue == "yes" or should_continue == ""):
                            # Nice
                            list_count += 1
                            question_count += 1
                            cprint("=============================================")
                            break
                        else:
                            # Aww
                            cprint("Thank you for spending your time for playing this game!")
                            cprint("=============================================")
                            exit(69)
                    else:
                        # Oof, the person has answered incorrectly
                        cprint(f"Incorrect! The programming language of the code above was {lang}\nYour current point is {point}!")
                        # Do the person want to restart?
                        should_restart = cinput("Do you want to start over? [Yes (You can also press the Enter key instead) / No] > ").lower()
                        if (should_restart == "yes" or should_restart == ""):
                            # Reset the point and restart
                            question_count = 0
                            point = 0
                            list_count += 1
                            cprint("=============================================")
                            break
                        else:
                            # Aww
                            cprint("Thank you for spending your time for playing this game!")
                            cprint("=============================================")
                            exit(420)
                except ValueError:
                    # That's not a valid answer
                    error("Error, invalid answer (Valid answer have to be a number)")
                    continue

def main(argv):
    global clearConsole
    global moveOnAfterCorrectGuess
    # Arguments check
    if "-h" in argv or "--help" in argv:
        # Help flag
        cprint(
            (
                "=============================================\n"
                "GTPL v0.2  - Help Page\n"
                "Usage: gtpl.py [-h | --help] OR gtpl.py [-c | --clearConsole] [-m | --moveOnAfterCorrectGuess]\n"
                "-h | --help : Display this help page\n"
                "-c | --clearConsole : Clear the console after each guesses\n"
                "-m | --moveOnAfterCorrectGuess : After each corrected guesses, move on to the next round\n"
                "=============================================\n"
            )
        )
        exit()
    else:
        if "-c" in argv or "--clearConsole" in argv:\
            # Clear console flag
            clearConsole = True
        if "-m" in argv or "--moveOnAfterCorrectGuess" in argv:
            # Move on after correct guesses flag
            print("MoveOn")
            moveOnAfterCorrectGuess = True

    # Print the intro text
    cprint(
        (
            "=============================================\n"
            "Guess The Programming Language v0.2\n"
            "Are you ready to guess some programming language?\n"
            "If you're, enter Yes! If you're not, enter No or gibberish\n"
            "=============================================\n"
        )
    )
    # Does the user want to start the game?
    o = cinput("[Yes (You can also press the Enter key instead) / No] > ").lower()
    if (o == "yes" or o == ""):
        # Yay!
        log("Initializing stuff...")
        game()
    else:
        # Aww
        log("Thank you for atleast spend some time run this game!")
        exit(666)

if __name__ == "__main__":
   main(sys.argv[1:])