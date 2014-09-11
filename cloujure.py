#!/usr/bin/env python3
#-*- coding: utf-8 -*-
def counter():
    count = [0]
    def nested():
        count[0] += 1
        print count[0]
    return nested

c1 = counter()
c2 = counter()
c1()
c2()
c2()
c1()
