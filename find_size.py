# A Python script to automate the changing file info.
import os, re, json
from datetime import date
default_size = lite_size = total_size = 0
start_path = "."
default = {
    "file": [
        "about.html",
        "credit.html",
        "home.html",
        "gallery.html"
    ],
    "folder": [
        "./other_project"
    ]
}
lite = "./lite"
for path, dirs, files in os.walk(start_path):
    for f in files:
        fp = os.path.join(path, f)
        total_size += os.path.getsize(fp)
for i in default["file"]:
    default_size += os.path.getsize(i)
for i in default["folder"]:
    for path, dirs, files in os.walk(i):
        for f in files:
            fp = os.path.join(path, f)
            default_size += os.path.getsize(fp)
for path, dirs, files in os.walk(lite):
    for f in files:
        fp = os.path.join(path, f)
        lite_size += os.path.getsize(fp)
data = {
    "filesize": {
        "lastupdateon": date.today().strftime("%m/%d/%Y"),
        "total": re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(total_size)),
        "default": re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(default_size)),
        "basic": re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(lite_size)),
        "other": re.sub(r"(?!^)(?=(?:\d{3})+(?:\.|$))", ",", str(total_size - default_size - lite_size))
    }
}
with open("website_data.json", "w") as outfile:
    json.dump(data, outfile, indent=4)
