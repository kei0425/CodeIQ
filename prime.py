import numpy as np
import math

def primelist(max):
    check = np.zeros(max + 1, dtype=np.bool)
    check[0] = True
    check[1] = True

    limit = math.sqrt(max)

    it = (x for x in range(2, int(math.sqrt(max)) + 1) if not check[x])

    for x in it:
        check = check | np.fromiter((x < i and i % x == 0 for i in range(max + 1)), dtype=np.bool)

    return np.array(range(max + 1))[~check]

print primelist(10)
