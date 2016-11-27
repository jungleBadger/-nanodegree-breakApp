import time
import webbrowser

iterationControl = 0


def pop_attention():
    time.sleep(2 * (60 * 60))
    webbrowser.open("http://terra.com.br")

print("Starting the program at: " + time.ctime())
while iterationControl < 3:
    pop_attention()
    iterationControl += 1

print("ending the program at: " + time.ctime())