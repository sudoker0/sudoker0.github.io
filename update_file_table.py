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

print(getJSONData(".", "*"))
for ext in getAllExtension("."):
    print(getJSONData(".", ext))

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