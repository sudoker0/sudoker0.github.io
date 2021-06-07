import os, json, time
from datetime import date
start_path = "./archive"
total_size = 0
listing = []
for path, dirs, files in os.walk(start_path):
    for f1 in files:
        #f: filename
        f = os.path.join(path, f1)
        fs = os.path.getsize(f) #file size
        mtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(f))) + " (GMT +7)" #Last modification time
        isdir_ = os.path.isdir(f) #Is it a directory?
        listing.append({"filename": f1, "filesize": fs, "mod_time": mtime, "isdir": isdir_})

data = {
    "type": "dir_listing",
    "last_updated_on": date.today().strftime("%Y-%m-%d"),
    "list": listing
}
print(data)
with open("./archive/file_listing.json", "w") as outfile:
    json.dump(data, outfile, indent=4)