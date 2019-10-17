import os
import csv


csvpath = os.path.join('..', 'Resources', 'election_data.csv')

with open(csvpath, 'r') as csvfile:    
    
    csvreader = csv.reader(csvfile, delimiter=',')

    header = next(csvreader)

    totalVotes = []
    votesToKhan = []
    votesToCorrey = []
    votesToLi = []
    votesToOTooley = []
    candidateDict={}
    #candidateList  = ['Khan', 'Correy', 'Li', "O'Tooley"]

    for row in csvreader:
        totalVotes.append(row[2])

        if "Khan" == row[2]:
            votesToKhan.append(row[2])
        if "Correy" == row[2]:
            votesToCorrey.append(row[2])
        if "Li" == row[2]:
            votesToLi.append(row[2])
        if "O'Tooley" == row[2]:
            votesToOTooley.append(row[2]) 
    candidateDict.update(Khan=len(votesToKhan),Correy=len(votesToCorrey),Li=len(votesToLi),OTooley=len(votesToOTooley))                   
 
    #candidates = list(dict.fromkeys (totalVotes))
     
 
    print (f'Election Results\n------------------------------------\nTotal Voltes: {len(totalVotes)} \n--------------------------------------')
    print (f'Khan: {(round(((len(votesToKhan)/len(totalVotes))*100),3))}% ({len(votesToKhan)})')
    print (f'Correy: {(round(((len(votesToCorrey)/len(totalVotes))*100),3))}% ({len(votesToCorrey)})')
    print (f'Li: {(round(((len(votesToLi)/len(totalVotes))*100),3))}% ({len(votesToLi)})')
    print (f"O'Tooley: {(round(((len(votesToOTooley)/len(totalVotes))*100),3))}% ({len(votesToOTooley)})")
    print(f"------------------------------------\nWinner: {max(candidateDict, key=candidateDict.get)}\n--------------------------------------")  

Election_Results = os.path.join("..","Results", "Election Results.txt")
with open(Election_Results, "w", newline="") as txtfile:
   
    print (f'Election Results\n------------------------------------\nTotal Voltes: {len(totalVotes)} \n--------------------------------------',file=txtfile)
    print (f'Khan: {(round(((len(votesToKhan)/len(totalVotes))*100),3))}% ({len(votesToKhan)})',file=txtfile)
    print (f'Correy: {(round(((len(votesToCorrey)/len(totalVotes))*100),3))}% ({len(votesToCorrey)})',file=txtfile)
    print (f'Li: {(round(((len(votesToLi)/len(totalVotes))*100),3))}% ({len(votesToLi)})',file=txtfile)
    print (f"O'Tooley: {(round(((len(votesToOTooley)/len(totalVotes))*100),3))}% ({len(votesToOTooley)})",file=txtfile)
    print(f"------------------------------------\nWinner: {max(candidateDict, key=candidateDict.get)}\n--------------------------------------",file=txtfile)  
