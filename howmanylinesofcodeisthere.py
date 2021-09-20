import os
from glob import glob
import re

regex = re.compile(r'(\.\\\.git.*)|(\.\\\.vs.*)|(\.\\dev_only.*)|(.*\.min\..*)|(.*\.dev\..*)')
files = [y for x in os.walk(".") for y in glob(os.path.join(x[0], '*.*')) if not regex.match(y)]
textchars = bytearray({7, 8, 9, 10, 12, 13, 27} | set(range(0x20, 0x100)) - {0x7f})
is_binary_string = lambda bytes: bool(bytes.translate(None, textchars))
total_line = 0

for _file in files:
    try:
        if (not is_binary_string(open(_file, "rb").read(1024))):
            content_length = len(open(_file, "rb").read().decode("utf-8").splitlines())
            total_line += content_length
            print(f"Size of \"{_file}\": {content_length}\n")
    except PermissionError:
        print(f"Permission denied: {_file}")
        continue

print(f"Total: {total_line}")