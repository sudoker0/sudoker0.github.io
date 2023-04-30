(() => {
    onload = () => {
        document.querySelector("div.dialog").setAttribute("data-show", "true")
    }
    var cheat_pos = 0
    const captcha_event = {
        "gotowebsitecheck": {
            "allow": (redirect: string) => {
                location.replace(redirect)
            },
            "deny": () => {
                alert("error: please solve the captcha")
            }
        }
    }

    const cheat_code = [
        0x51, 0x58, 0x4a, 0x79, 0x62, 0x33,
        0x64, 0x56, 0x63, 0x48, 0x78, 0x42,
        0x63, 0x6e, 0x4a, 0x76, 0x64, 0x31,
        0x56, 0x77, 0x66, 0x45, 0x46, 0x79,
        0x63, 0x6d, 0x39, 0x33, 0x52, 0x47,
        0x39, 0x33, 0x62, 0x6e, 0x78, 0x42,
        0x63, 0x6e, 0x4a, 0x76, 0x64, 0x30,
        0x52, 0x76, 0x64, 0x32, 0x35, 0x38,
        0x51, 0x58, 0x4a, 0x79, 0x62, 0x33,
        0x64, 0x4d, 0x5a, 0x57, 0x5a, 0x30,
        0x66, 0x45, 0x46, 0x79, 0x63, 0x6d,
        0x39, 0x33, 0x55, 0x6d, 0x6c, 0x6e,
        0x61, 0x48, 0x52, 0x38, 0x51, 0x58,
        0x4a, 0x79, 0x62, 0x33, 0x64, 0x4d,
        0x5a, 0x57, 0x5a, 0x30, 0x66, 0x45,
        0x46, 0x79, 0x63, 0x6d, 0x39, 0x33,
        0x55, 0x6d, 0x6c, 0x6e, 0x61, 0x48,
        0x52, 0x38, 0x53, 0x32, 0x56, 0x35,
        0x51, 0x6e, 0x78, 0x4c, 0x5a, 0x58,
        0x6c, 0x42]

    document.onkeydown = (ev) => {
        const code = atob(cheat_code.map(v => String.fromCharCode(v)).join("")).split("|")
        if (ev.code == code[cheat_pos]) cheat_pos++;
        else cheat_pos = 0;

        if (code.length == cheat_pos) {
            cheat_pos = 0;
            alert("cheat activated! now bypassing the captcha")
            document.querySelector("div.captcha_test[data-captcha-id=gotowebsitecheck] input")["click"]()
            document.querySelector("a[data-submit-id=gotowebsitecheck]")["click"]()
        }
    }

    document.querySelectorAll("a.captcha_submit")
        .forEach(v => {
            const redirect = v["href"]
            v["href"] = "#"
            const id = v.getAttribute("data-submit-id")
            const captcha = document.querySelector(`div.captcha_test[data-captcha-id=${id}]`)

            if (!!!captcha) {
                console.warn(`Can't find captcha with ID: ${id}`)
                return
            }

            v.addEventListener("click", (ev) => {
                ev.preventDefault()
                const checkbox = captcha.querySelector<HTMLInputElement>(".checkbox_container input")

                if (checkbox.checked) {
                    captcha_event[id].allow(redirect)
                } else {
                    captcha_event[id].deny()
                }
            })
        })
})()
