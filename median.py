# CodeIQ 'smart median' test code

# Please improve performance or reduce memory usage of this algorithm

import sys

def datamake(n):
    vec = list()

    for n0 in range(1, n):
        for n1 in range(1, n):
            for n2 in range(1, n):
                for n3 in range(1, n):
                    for n4 in range(1, n):
                        vec.append(n0*(n-n1)*n2*n3*(n- n4))

    return vec

def quicksort(vec, l, r, k):
    if r < l:
        i = partition(vec, l, r)
        quicksort(vec, l, i - 1)
        quicksort(vec, i + 1, r)

def partition(vec, l, r):
    v = vec[r]
    i, j = l - 1, r
    while True:
        i, j = i + 1, j - 1
        while vec[i] < v:
            i += 1
        while vec[j] > v:
            j -= 1
        if i >= j:
            break
        vec[i], vec[j] = vec[j], vec[i]

    vec[i], vec[r] = vec[r], vec[i]
    return i


def median(vec, fromIndex = 0, toIndex = 0, p = 0):
    startIndex = fromIndex
    if toIndex == 0:
        toIndex = len(vec) - 1
    endIndex = toIndex

    mIndex = int((len(vec) - 1) / 2)

    if p == 0:
        p = vec[mIndex]

    min = sys.maxint
    max = -sys.maxint - 1
    while 1:
        while vec[startIndex] < p and startIndex < endIndex:
            if max < vec[startIndex]:
                max = vec[startIndex]
            if vec[startIndex] < min:
                min = vec[startIndex]
            startIndex += 1

        while vec[endIndex] >= p and startIndex < endIndex:
            if max < vec[endIndex]:
                max = vec[endIndex]
            if vec[endIndex] < min:
                min = vec[endIndex]
            endIndex -= 1

        if startIndex >= endIndex:
            break
        (vec[startIndex], vec[endIndex]) = (vec[endIndex], vec[startIndex])

    print (mIndex, startIndex, p)

    if mIndex == startIndex or max < 0:
        return vec[startIndex]
    elif mIndex < startIndex:
        return median(vec, fromIndex + 1, startIndex - 1, (p + min) / 2)
    else:
        return median(vec, startIndex + 1, toIndex - 1, (p + max) / 2)


if __name__ == '__main__2':
    vec = datamake(32)
    m = median(vec)

    print m

#  2.73 sec. elapsed, 463776 KB consumed
# 12.40 sec. elapsed, 576772 KB consumed
