# This is a compilation of all the Python script put into one place
# Because I do not want to run like 4 command just to update stuff
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

# ----------------------[find_size.py]---------------------- #

# A Python script to automate the changing of file info.
# I Don't really Care about shrinking the file size down.
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

import os, re, json
from datetime import date

# Get the total size of folder in [path]
def sizeOfFolder(path = "."):
    # print("Calculating the total size of folder: " + os.path.abspath(path))
    fp = ""; lite_size = 0
    for path, dirs, files in os.walk(path):
        for f in files:
            fp = os.path.join(path, f)
            lite_size += os.path.getsize(fp)
    # print("Total size: " + str(lite_size))
    return lite_size

# Get the total size for each file listed in the [pathgroup] array
def totalSizeOfEachFile(pathgroup = []):
    sizegroup = 0
    for path in pathgroup:
        # print("Get size of path: " + path)
        sizegroup += os.path.getsize(path)
    # print("Total size: " + str(sizegroup))
    return sizegroup

# Format the input number as size string (123456789 => 123,456,789)
def formatFileSize(sizestring = 0): return re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(sizestring))

# Variable Here
total_size = sizeOfFolder()
standard_src_code_size = totalSizeOfEachFile(["./about.html", "./credit.html", "./download.html", "./gallery.html", "./home.html"])
basic_src_code_size = sizeOfFolder("./basic")
assets_size = sizeOfFolder("./website")
archive_size = sizeOfFolder("./archive")
other_project_size = sizeOfFolder("./other_project")

# JSON data here
data = {
    "filesize": {
        "lastupdateon": date.today().strftime("%Y-%m-%d"),
        "total": formatFileSize(total_size),
        "standard_src_code": formatFileSize(standard_src_code_size),
        "basic_src_code": formatFileSize(basic_src_code_size),
        "assets": formatFileSize(assets_size),
        "archive": formatFileSize(archive_size),
        "other_project": formatFileSize(other_project_size),
        "other": formatFileSize(standard_src_code_size + basic_src_code_size + assets_size + archive_size + other_project_size)
    }
}

# Dump the JSON data to a file (with indent ofcourse)
with open("website_data.json", "w") as outfile:
    json.dump(data, outfile, indent=4)

# ----------------------[find_size.py]---------------------- #

# --------------[get_file_info_for_archive.py]-------------- #

import os, json, time # Import important stuff
from datetime import date
start_path = "./archive" # The path to get metadata
total_size = 0
listing = []
for path, dirs, files in os.walk(start_path):
    for f1 in files:
        #f: filename
        f = os.path.join(path, f1)
        fs = os.path.getsize(f) #file size
        mtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(f))) + " (GMT +7)" #Last modification time
        #isdir_ = os.path.isdir(f) #Is it a directory?
        #listing.append({"filename": f1, "filesize": fs, "mod_time": mtime, "isdir": isdir_})
        listing.append({"filename": f1, "filesize": fs, "mod_time": mtime})

data = {
    "type": "dir_listing",
    "last_updated_on": date.today().strftime("%Y-%m-%d"),
    "list": listing
}
# print(data)
with open(start_path + "/file_listing.json", "w") as outfile: #Dump metadata listing to JSON file
    json.dump(data, outfile, indent=4)

# --------------[get_file_info_for_archive.py]-------------- #

# ------------------------[commit.py]----------------------- #

# A Python script to get all of the commit information in the current directory
# I Don't really Care about shrinking the file size down.
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

import json
from subprocess import Popen, PIPE
import subprocess

command_to_execute = ["git", "log", "--pretty=format:\"%h;%cn;%cd;%s\""]

# Run the git command
process = Popen(command_to_execute, stdout=PIPE, shell=True)

# Get the output and error
(output, err) = process.communicate()
count = 0; json_data = {"last_update_on": date.today().strftime("%Y-%m-%d"), "data": []}
# Loop through each line (which contain the hash, committer name, date and the commit message)
for items in output.decode("utf-8").split("\n"):
    # Split the line to indivitual stuff like hash, etc. for ease ofuse
    item = items[1:-1].split(";")
    json_data["data"].append({"hash": item[0], "committer": item[1], "commit_date": item[2], "message": item[3]})

# Export data to a file
with open("./commit_data.json", "w") as outfile:
    json.dump(json_data, outfile, indent=4)
exit_code = process.wait()

# ------------------------[commit.py]----------------------- #

# ------------------[update-file_table.py]------------------ #

import os, re
from time import sleep

def FolderSize(path = "."):
    fp = ""; lite_size = 0
    for path, _, files in os.walk(path):
        for f in files:
            fp = os.path.join(path, f)
            lite_size += os.path.getsize(fp)
    return lite_size

def NumberOfFile(path, ext):
    counter = 0
    for path, _, files in os.walk(path):
        for f in files:
            l = len(f.split("."))
            if (ext == "*"): counter += 1
            elif ext == "" and l == 1: counter += 1
            elif f.endswith(ext) and l >= 2 and ext != "": counter += 1
    return counter

def SizeOfFile(path, ext):
    counter = 0
    for path, _, files in os.walk(path):
        for f in files:
            if (ext == "*"):
                counter += os.path.getsize(os.path.join(path, f))
            elif ext == "" and len(f.split(".")) == 1:
                counter += os.path.getsize(os.path.join(path, f))
            elif f.endswith(ext) and len(f.split(".")) >= 2 and ext != "":
                counter += os.path.getsize(os.path.join(path, f))
    return counter

def getAllExtension(path = "."):
    extension_list = []
    for path, _, files in os.walk(path):
        for f in files:
            ext = os.path.splitext(os.path.join(path, f))
            if (ext[1] not in extension_list):
                extension_list.append(ext[1])
    return extension_list

def formatFileSize(sizestring = 0): return re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(sizestring))

TotalSize = FolderSize()

def getJSONData(path, ext):
    Size = SizeOfFile(path, ext)
    #return {"extension": ext, "numoffile": NumberOfFile(path, ext), "size": Size, "percent": (Size / TotalSize * 100)}
    return "*" + ext + " | " + str(round((Size / TotalSize * 100), 2)) + "% | " + str(NumberOfFile(path, ext)) + " files | " + str(formatFileSize(Size)) + " bytes"

# print(getJSONData(".", "*"))
# for ext in getAllExtension("."):
#     print(getJSONData(".", ext))

# with open("ReadMe.md", "r", encoding="utf8") as md:
#     mdLines = md.readlines()

# lineCount = 0
# result = []
# start_deleting = False
# for line in mdLines:
#     lineCount += 1
#     if line == "<!--python_data_stop-->\n": start_deleting = False
#     if start_deleting:
#         print("Deleted line: " + str(lineCount))
#         result.append(mdLines.pop(lineCount))
#     if line == "<!--python_data_start-->\n": start_deleting = True

# for read in mdLines: print(read)
# for result in mdLines: print(result)

# data_start_index = mdLines.index("<!--python_data_start-->\n") + 1 + 2
# while(data_start_index < len(mdLines)):
#     if (mdLines[data_start_index] == "<!--python_data_stop-->\n"):
#         print("Done")
#         break
#     else:
#         print(mdLines[data_start_index])
#         data_start_index += 1
# for line in mdLines:
#     if line == "<!--python_data_start-->\n":

# with open('ReadMe.md', encoding="utf8") as f:
#     for line in f:
#         print(f)

# ------------------[update-file_table.py]------------------ #