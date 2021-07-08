# A Python script to automate the changing of file info.
# I Don't really Care about shrinking the file size down.
# Copyright (C) 2021 Quan_MCPC, license under MIT license.

import os, re, json
from datetime import date
# Get the total size of folder in [path]
def sizeOfFolder(path = "."):
    print("Calculating the total size of folder: " + os.path.abspath(path))
    fp = ""; lite_size = 0
    for path, dirs, files in os.walk(path):
        for f in files:
            fp = os.path.join(path, f)
            lite_size += os.path.getsize(fp)
    print("Total size: " + str(lite_size))
    return lite_size

# Get the total size for each file listed in the [pathgroup] array
def totalSizeOfEachFile(pathgroup = []):
    sizegroup = 0
    for path in pathgroup:
        print("Get size of path: " + path)
        sizegroup += os.path.getsize(path)
    print("Total size: " + str(sizegroup))
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