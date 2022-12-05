from enum import Enum
import urllib.parse
import secrets
import time
import hmac
import base64
import hashlib
import struct
import webbrowser

class TwoFAType(Enum):
    TOTP = "totp"
    HOTP = "hotp"

class Algorithm(Enum):
    SHA1 = "SHA1"
    SHA256 = "SHA256"
    SHA512 = "SHA512"

# https://gist.github.com/MineRobber9000/d468c3d1dfc6ac20d0314600ca765bc4
# --SECTION_START--
def pack_counter(t):
    return struct.pack(">Q", t)

def dynamic_truncate(raw_bytes: bytes, length):
    offset = raw_bytes[19] & 0x0f

    decimal_value = ((raw_bytes[offset] & 0x7f) << 24) | (
        (raw_bytes[offset + 1] & 0xff) << 16
    ) | ((raw_bytes[offset + 2] & 0xFF) << 8) | (raw_bytes[offset + 3] & 0xFF)
    return str(decimal_value)[-length:]


def hotp(secret, counter, length=6, _alg: Algorithm = Algorithm.SHA1):
    if type(counter) != bytes: counter = pack_counter(int(counter))
    if type(secret) != bytes: secret = base64.b32decode(secret)
    
    hash_alg = hashlib.sha1
    # if alg == Algorithm.SHA1:
    #     hash_alg = hashlib.sha1
    # elif alg == Algorithm.SHA256:
    #     hash_alg = hashlib.sha256
    # elif alg == Algorithm.SHA512:
    #     hash_alg = hashlib.sha512

    digest = hmac.new(secret, counter, hash_alg).digest()
    return dynamic_truncate(digest, length)


def totp(secret, length=6, period = 30, _alg: Algorithm = Algorithm.SHA1):
    """TOTP is implemented as HOTP, but with the counter being the floor of
       the division of the Unix timestamp by 30."""
    
    counter = pack_counter(round(time.time() // period))
    return hotp(secret, counter, length, _alg)

# --SECTION_END--

def generate2FA(type_2fa: TwoFAType, product_name: str, account_name: str, issuer: str = "", secret_length = 32, digits = 6, period = 30, _alg: Algorithm = Algorithm.SHA1):

    if type_2fa == TwoFAType.HOTP:
        print("not supported yet")
        return {}

    url = "otpauth://%s/%s?secret=%s"
    optional = {
        "issuer": "&issuer=%s",
        "algorithm": "&algorithm=%s",
        "digits": "&digits=%d",
        "period": "&period=%d",
        "counter": "&counter=%d"
    }
    base32_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

    secret = ''.join(secrets.choice(base32_alphabet) for i in range(secret_length))
    url = url % (type_2fa.value, urllib.parse.quote(f"{product_name}:{account_name}", safe=""), secret)

    if issuer != "":
        url += optional["issuer"] % urllib.parse.quote(issuer, safe="")

    # url += optional["algorithm"] % alg.value
    url += optional["digits"] % digits
    url += optional["period"] % period

    return {
        "secret": secret,
        "url": url
    }

def check2FA(type_2fa: TwoFAType, secret: str, code: str, length = 6, period = 30, _alg = Algorithm.SHA1):
    if type_2fa == TwoFAType.TOTP:
        ccode = totp(secret, length, period, _alg)
        return code == ccode


code = generate2FA(TwoFAType.TOTP, "Test Product Name", "My Account", "Test Issuer", 64, 8, 15)
print(code)
webbrowser.open(f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={urllib.parse.quote(code['url'], safe='')}")

i_secret = input("enter secret: ")
#i_alg = input("enter algorithm: ")
i_len = input("enter length: ")
i_per = input("enter period: ")

while True:
    test = input("enter code to test: ")
    if check2FA(TwoFAType.TOTP, i_secret, test, int(i_len), int(i_per)):
        print("good")
    else:
        print("bad")
