
lower = 'abcdefghijklmnopqrstuvwxyz'
upper = lower.upper()
other = ' .:;,?=)([]}{\\/*-_\'"@#' #did not include @ in run, fixxed manually
numbers = '1234567890'
allchars = lower+upper+other+numbers

old =  open("old_css.txt", "r") 
new = open('new_css.txt', 'w')

lines = old.readlines()

for line in lines:
    for i in line:
        if i in allchars:
            new.write(i)
    new.write('\n')

