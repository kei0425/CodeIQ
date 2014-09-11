transTable = {}
wordTable = {}
with open('dictionary.txt', 'r') as input:
    for line in input:
        line = line.strip()
        wordTable[line] = [''.join([c if i!=j else '*'
                             for (i,c) in enumerate(line)])
                    for j in range(4)]
        for trans in wordTable[line]:
            if trans in transTable:
                transTable[trans].append(line)
            else:
                transTable[trans] = [line]

wordTable2 = dict([
        (word,
         list(set(sum([transTable[trans] for trans in wordTable[word]], []))))
        for word in wordTable.keys()
        ])


start = 'free'
goal = 'work'

visit = set([start])

answerList = [[start]]

def heuristic(ans):
    return len(ans) + sum([a != b for (a,b) in zip(ans[-1], goal)])



while True:
    ans = answerList.pop(0)
    lastWord = ans[-1]
    if lastWord == goal:
        break
    transList = [trans for trans in wordTable2[lastWord] if not trans in visit]
    visit.update(transList)

    answerList += [ans + [trans] for trans in transList]

    answerList = sorted(answerList, key=heuristic)

print " -> ".join(ans)
