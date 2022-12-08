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

    decimal_value =\
        ((raw_bytes[offset] & 0x7f) << 24) |\
        ((raw_bytes[offset + 1] & 0xff) << 16) |\
        ((raw_bytes[offset + 2] & 0xFF) << 8) |\
        (raw_bytes[offset + 3] & 0xFF)
    
    return str(decimal_value)[-length:]


def hotp(secret, counter, length=6):
    if type(counter) != bytes: counter = pack_counter(int(counter))
    if type(secret) != bytes: secret = base64.b32decode(secret)
    
    hash_alg = hashlib.sha1
    digest = hmac.new(secret, counter, hash_alg).digest()
    return dynamic_truncate(digest, length)


def totp(secret, length=6, period = 30):
    """
    Generate those "6 digits code" that is used to authorize the user
    https://gist.github.com/MineRobber9000/d468c3d1dfc6ac20d0314600ca765bc4

    @param secret: The "secret" token that is shared between the user and the server to generate the token
    @param length: The length of those "digits code"
    @param period: The retention period of those code
    """

    """TOTP is implemented as HOTP, but with the counter being the floor of
       the division of the Unix timestamp by 30."""
    
    counter = pack_counter(round(time.time() // period))
    return hotp(secret, counter, length)

# --SECTION_END--

def generate2FA(
    type_2fa: TwoFAType,
    product_name: str,
    account_name: str,
    issuer: str = "",
    secret_length = 32,
    digits = 6,
    period = 30):

    """
    A simple function to generate an 2FA URL which can be open or put into QR code

    @param type_2fa: The type of 2FA token to generate (TOTP or HOTP)
    @param product_name: The name of the "product" (which is another way of saying it's the website or app that make the URL
    @param account_name: The name of the account (it could be the email, username, anything to identify the user)
    @param issuer: The issuer
    @param secret_length: The length of the "secret" (which is a token to help create those 6 digits code)
    @param digits: The length of those "digits code" that you have to enter (might be ignored by most 2FA app)
    @param period: The retention period of those "digits code" (might be ignored by most 2FA app)
    @return The URL to access or create QR from and the "secrets"
    """

    if type_2fa == TwoFAType.HOTP:
        print("not supported yet")
        return {}

    url = "otpauth://%s/%s?secret=%s"
    optional = {
        "issuer": "&issuer=%s",
        "digits": "&digits=%d",
        "period": "&period=%d",
        "counter": "&counter=%d"
    }
    base32_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

    secret = ''.join(secrets.choice(base32_alphabet) for _ in range(secret_length))
    url = url % (type_2fa.value, urllib.parse.quote(f"{product_name}:{account_name}", safe=""), secret)

    if issuer != "":
        url += optional["issuer"] % urllib.parse.quote(issuer, safe="")

    url += optional["digits"] % digits
    url += optional["period"] % period

    return {
        "secret": secret,
        "url": url
    }

def check2FA(type_2fa: TwoFAType, secret: str, code: str, length = 6, period = 30):
    """
    Check if the 2FA code is valid
    """
    if type_2fa == TwoFAType.TOTP:
        ccode = totp(secret, length, period)
        return code == ccode


code = generate2FA(TwoFAType.TOTP, "Test Product Name", "My Account", "Test Issuer", 32)
webbrowser.open(f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={urllib.parse.quote(code['url'], safe='')}")

i_secret = code["secret"]#input("enter secret: ")

while True:
    test = input("enter code to test: ")
    if check2FA(TwoFAType.TOTP, i_secret, test):
        print("good")
    else:
        print("bad")
