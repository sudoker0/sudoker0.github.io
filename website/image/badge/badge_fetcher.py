import requests
import re
import xml.dom.minidom

def download(list: list[str]):
    count = 0
    for link in list:
        r = requests.get(link)
        dom = xml.dom.minidom.parseString(f"<!-- {link} -->{r.text}")
        pretty_xml_as_string = dom.toprettyxml()
        pat = re.compile(pattern='<title>(.*)</title>', flags=re.IGNORECASE)
        def title(subj):
            filename = subj.group(1)
            with open(f"./{filename}.svg", "w") as f:
                print(filename)
                f.write(pretty_xml_as_string)
        re.sub(
            pattern=pat,
            repl=title,
            string=r.text
        )
        # f.write(f"<!-- {link} -->")
        # f.write(r.text)
        print(count)
        count += 1

download(list=[
    "https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white",
    "https://img.shields.io/badge/JS-EFD81D?style=for-the-badge&logo=javascript&logoColor=000000",
    "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    "https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white",
    "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c+sharp&logoColor=white",
    "https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white",
    "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
    "https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white",
    "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white",
    "https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
    "https://img.shields.io/badge/Assembly-000000?style=for-the-badge"
])