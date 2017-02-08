import platform
import subprocess

print "         __"
print "     _.-'  '-._"
print " _.-'          '-._"
print "(_                _)"
print "| '-._        _.-' |  _____             _           _    "
print "|_    '-.__.-'    _| |  |  |___ _ _ ___| |___ ___ _| |___ "
print "| '-._    |   _.-' | |  |  | . |_'_| -_| | .'|   | . |_ -|"
print "|     '-._|.-'     |  \___/|___|_,_|___|_|__,|_|_|___|___|"
print "|_        |       _|"
print "  '-._    |   _.-'"
print "      '-._|.-'\n"

subprocess.call(['npm', 'install', '-g', 'node-gyp'], shell=True)

if platform.system() == 'Windows':
    subprocess.call(['npm', 'install', '-g', '--production', 'windows-build-tools'], shell=True)