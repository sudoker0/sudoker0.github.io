# This is a compilation of all the Python script put into one place
# Because I do not want to run like 4 command just to update stuff
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

import os, re, json, sys
from datetime import date
from subprocess import Popen, PIPE

argument = sys.argv
def log(mes):
    if len(argument) > 1:
        if argument[1] == "--verbose": print(mes)

os.chdir(os.getcwd())

# ----------------------[find_size.py]---------------------- #

# # A Python script to automate the changing of file info.
# # I don't really care about shrinking the file size down.
# # Copyright (C) 2021 Quan_MCPC, license under MIT license.

# # Get the total size of folder in [path]
# log("\n========================================\nNow running \"find_size.py\"\n")
# def sizeOfFolder(path = "."):
#     log(f"Calculating the total size of folder: {os.path.abspath(path)}")
#     fp = ""; lite_size = 0
#     for path, _, files in os.walk(path):
#         for f in files:
#             fp = os.path.join(path, f)
#             lite_size += os.path.getsize(fp)
#     log(f"Total size: {str(lite_size)}")
#     return lite_size

# # Get the total size for each file listed in the [pathgroup] array
# def totalSizeOfEachFile(pathgroup = []):
#     sizegroup = 0
#     for path in pathgroup:
#         log(f"Get size of path: {path}")
#         sizegroup += os.path.getsize(path)
#     log(f"Total size: {str(sizegroup)}")
#     return sizegroup

# # Format the input number as size string (123456789 => 123,456,789)
# def formatFileSize(sizestring = 0): return re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(sizestring))

# # Variable Here
# total_size = sizeOfFolder()
# git_folder_size = sizeOfFolder("./.git")
# assets_size = sizeOfFolder("./src/website")

# # JSON data here
# data = {
#     "NOTICE": "Do Not Manually Edit The File, This Will Get Regenerated Automatically",
#     "filesize": {
#         "lastupdateon": date.today().strftime("%Y-%m-%d"),
#         "git_folder": formatFileSize(git_folder_size),
#         "assets_folder": formatFileSize(assets_size),
#         "the_rest": formatFileSize(total_size - git_folder_size - assets_size),
#         "total_size": formatFileSize(total_size)
#     }
# }

# # Dump the JSON data to a file (with indent ofcourse)
# with open("./src/website/json/website_data.json", "w") as outfile:
#     json.dump(data, outfile, indent=4)

# ----------------------[find_size.py]---------------------- #

# ------------------------[commit.py]----------------------- #

# A Python script to get all of the commit information in the current directory
# I Don't really Care about shrinking the file size down.
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

# import json
# from subprocess import Popen, PIPE
# import subprocess
log("\n========================================\nNow running \"commit.py\"\n")
command_to_execute = ["git", "log", "--pretty=format:\"%H;%cn;%cd;%s\"", "--date=unix"]
# Run the git command
if sys.platform == "linux" or sys.platform == "linux2" or sys.platform == "darwin": enableShell = False
elif sys.platform == "win32": enableShell = True

process = Popen(command_to_execute, stdout=PIPE, shell=enableShell)

# Get the output and error
(output, err) = process.communicate()
count = 0
json_data = {
    "NOTICE": "Do Not Manually Edit The File, This Will Get Regenerated Automatically",
    "last_update_on": date.today().strftime("%Y-%m-%d"),
    "data": []
}
# Loop through each line (which contain the hash, committer name, date and the commit message)
for items in output.decode("utf-8").split("\n"):
    # Split the line to indivitual stuff like hash, etc. for ease ofuse
    log(items)
    item = items[1:-1].split(";")
    json_data["data"].append({"hash": item[0], "committer": item[1], "commit_date": int(item[2]), "message": item[3]})

# Export data to a file
with open("./src/website/json/commit_data.json", "w") as outfile:
    json.dump(json_data, outfile, indent=4)
exit_code = process.wait()

# ------------------------[commit.py]----------------------- #

# ------------------[update_file_table.py]------------------ #

# ## Details about my website

# > **Details about the size of each type of file in the website**
# <!--python_data_start-->
# File Extensions | Percentages of Bytes | Number of files | File/Folder size (Bytes)
# ----------------|--------------------- |-----------------|--------------------------
# \*\* | 100.0% | 0 files | 383,670,983 bytes
# \* | 1.41% | 1085 files | 5,404,861 bytes
# \*.cjs | 0.0% | 2 files | 346 bytes
# \*.cmd | 0.0% | 6 files | 1,950 bytes
# \*.coffee | 0.0% | 2 files | 1 bytes
# \*.css | 0.0% | 7 files | 18,898 bytes
# \*.flow | 0.06% | 2 files | 238,289 bytes
# \*.gif | 0.25% | 4 files | 954,612 bytes
# \*.html | 0.24% | 55 files | 918,013 bytes
# \*.ico | 0.06% | 6 files | 245,416 bytes
# \*.idx | 0.08% | 1 files | 299,160 bytes
# \*.jpg | 0.0% | 2 files | 11,058 bytes
# \*.js | 16.06% | 404 files | 61,604,619 bytes
# \*.json | 1.13% | 123 files | 4,336,902 bytes
# \*.lcl | 0.71% | 78 files | 2,707,600 bytes
# \*.map | 0.86% | 94 files | 3,288,968 bytes
# \*.markdown | 0.0% | 2 files | 12,669 bytes
# \*.md | 0.16% | 121 files | 595,225 bytes
# \*.mjs | 0.05% | 5 files | 206,932 bytes
# \*.mts | 0.0% | 1 files | 2,922 bytes
# \*.old | 0.29% | 4 files | 1,107,306 bytes
# \*.pack | 73.06% | 1 files | 280,324,231 bytes
# \*.png | 0.97% | 51 files | 3,735,631 bytes
# \*.ps1 | 0.0% | 6 files | 4,830 bytes
# \*.pug | 0.01% | 6 files | 31,971 bytes
# \*.py | 0.02% | 5 files | 58,075 bytes
# \*.rev | 0.01% | 1 files | 42,636 bytes
# \*.sample | 0.01% | 14 files | 25,821 bytes
# \*.scss | 0.0% | 3 files | 19,110 bytes
# \*.svg | 0.13% | 110 files | 506,956 bytes
# \*.ts | 1.6% | 188 files | 6,153,566 bytes
# \*.ttf | 0.53% | 10 files | 2,022,840 bytes
# \*.txt | 0.01% | 6 files | 48,958 bytes
# \*.xcf | 2.25% | 10 files | 8,633,342 bytes
# \*.xml | 0.0% | 2 files | 1,724 bytes
# \*.yml | 0.0% | 21 files | 16,108 bytes
# > Last updated on: 2024-04-26
# <!--python_data_stop-->

# import os, re
# from time import sleep

# log("\n========================================\nNow running \"update_file_table.py\"\n")

# def FolderSize(path = "."):
#     log(f"Calculating the total size of folder: {os.path.abspath(path)}")
#     fp = ""; lite_size = 0
#     for path, _, files in os.walk(path):
#         for f in files:
#             fp = os.path.join(path, f)
#             lite_size += os.path.getsize(fp)
#     log(f"Total size: {str(lite_size)}")
#     return lite_size

# def NumberOfFile(path, ext):
#     log(f"Calculating the number of file in folder: {os.path.abspath(path)} with extension: {ext}")
#     counter = 0
#     for path, _, files in os.walk(path):
#         for f in files:
#             l = len(f.split("."))
#             if (ext == "*") or (ext == "" and l == 1) or (f.endswith(ext) and l >= 2 and ext != ""): counter += 1
#     log(f"Total file with extension: {str(counter)}")
#     return counter

# def SizeOfFile(path, ext):
#     log(f"Calculating the size of file with extension: {ext} in {os.path.abspath(path)}")
#     counter = 0
#     for path, _, files in os.walk(path):
#         for f in files:
#             if (ext == "*") or (ext == "" and len(f.split(".")) == 1) or (f.endswith(ext) and len(f.split(".")) >= 2 and ext != ""):
#                 counter += os.path.getsize(os.path.join(path, f))
#     log(f"Total size of all file with extension: {ext} is {counter}")
#     return counter

# def getAllExtension(path = "."):
#     log(f"Getting all file extension in {path}")
#     extension_list = []
#     for path, _, files in os.walk(path):
#         for f in files:
#             ext = os.path.splitext(os.path.join(path, f))
#             if (ext[1] not in extension_list):
#                 extension_list.append(ext[1])
#     extension_list.sort()
#     log(extension_list)
#     return extension_list

# def formatFileSize(sizestring = 0): return re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(sizestring))

# TotalSize = FolderSize()

# def getJSONData(path, ext):
#     Size = SizeOfFile(path, ext)
#     if ext == "*":
#         ext = "\\*"
#     return f"\\*{ext} | {str(round((Size / TotalSize * 100), 2))}% | {str(NumberOfFile(path, ext))} files | {str(formatFileSize(Size))} bytes"

# text = ""
# text += getJSONData(".", "*")
# for ext in getAllExtension("."):
#     text += "\n" + getJSONData(".", ext)
# with open("ReadMe.md", "r", encoding="utf8") as markdown:
#     markdownContent = markdown.read()
#     oldselector = re.compile("<!--python_data_start-->.*<!--python_data_stop-->", re.DOTALL)
#     newmd = re.sub(oldselector, f"<!--python_data_start-->\nFile Extensions | Percentages of Bytes | Number of files | File/Folder size (Bytes)\n----------------|--------------------- |-----------------|--------------------------\n{text}\n> Last updated on: {date.today().strftime('%Y-%m-%d')}\n<!--python_data_stop-->", markdownContent)
# with open("ReadMe.md", "w", encoding="utf-8") as markdown:
#     markdown.write(newmd)

# ------------------[update-file_table.py]------------------ #

# ----------------------[make_tree.py]-----------------------#
# import os
# import json

# log("\n========================================\nNow running \"make_tree.py\"\n")

# ignored_dir = [
#     ".git"
# ]

# def path_to_dict(path, recursion:bool = False):
#     print(path)
#     d = {"name": os.path.basename(path)} if recursion else {"NOTICE": "Do Not Manually Edit The File, This Will Get Regenerated Automatically", "name": os.path.basename(path)}
#     if os.path.isdir(path):
#         # if path in ignored_dir:
#         print(path)
#         d['type'] = "directory"
#         d['children'] = [path_to_dict(os.path.join(path, x), True) for x in sorted(os.listdir(path)) if x not in ignored_dir]
#     else:
#         d['type'] = "file"
#     return d

# with open("./dist/website/json/directory_listing.json", "w") as outfile:
#     json.dump(path_to_dict("./dist"), outfile, indent=4)
# ----------------------[make_tree.py]-----------------------#

# ---------------------[commit_maybe.py]-------------------- #
# import os, re, json, sys
# from datetime import date, time
# import time
# from subprocess import Popen, PIPE

# argument = sys.argv
# def log(mes):
#     if len(argument) > 1:
#         if argument[1] == "--verbose": print(mes)
# log("\n========================================\nNow running \"commit.py\"\n")
# command_to_execute = ["git", "log", "--pretty=format:\"Commit: %h;%cn;%cd;%s\"", "--date=unix", "--name-status"]
# # Run the git command
# if sys.platform == "linux" or sys.platform == "linux2"or sys.platform == "darwin": enableShell = Flase
# elif sys.platform == "win32": enableShell = True

# process = Popen(command_to_execute, stdout=PIPE, shell=enableShell)

# # Get the output and error
# (output, err) = process.communicate()
# count = 0; json_data = {"last_update_on": date.today().strftime("%Y-%m-%d"), "data": []}
# # Loop through each line (which contain the hash, committer name, date and the commit message)
# # print(output.decode("utf-8").split("\"Commit"))
# # print(output.decode("utf-8").split("\"Commit: "))
# for items in output.decode("utf-8").split("\"Commit: "):
#     # print(f"{count}: {items}")
#     header = items.split('\n')[0][0:-1]
#     header_data = header.split(";")
#     if len(header_data) >= 4:
#         affected_file = []
#         for item in items.split("\n")[1: -2]:
#             affected_file.append(item)
#         json_data["data"].append({"hash": header_data[0], "committer": header_data[1], "commit_date": int(header_data[2]), "message": header_data[3], "affected_file": affected_file})
# with open("./commit_data111.json", "w") as outfile:
#     json.dump(json_data, outfile, indent=4)
# exit_code = process.wait()
# ---------------------[commit_maybe.py]-------------------- #
