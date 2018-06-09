#!/usr/bin/env python

import RPi.GPIO as GPIO
import MFRC522
import signal
import sys

continue_reading = True

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()

# This loop keeps checking for chips. If one is near it will get the UID and authenticate
while continue_reading:
    # Scan for cards
    (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # Get the UID of the card
    (status,uid) = MIFAREReader.MFRC522_Anticoll()

    # If we have the UID, continue
    if status == MIFAREReader.MI_OK:
        # Print UID (json format)
        print "{\"uid\": \"[%s, %s, %s, %s]\"}" % (uid[0], uid[1], uid[2], uid[3])
        sys.stdout.flush()
