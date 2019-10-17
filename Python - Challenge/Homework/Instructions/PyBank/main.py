import os
import csv


csvpath = os.path.join('..', 'Resources', 'budget_data.csv')

with open(csvpath, 'r') as csvfile:    
    
    csvreader = csv.reader(csvfile, delimiter=',')

    header = next(csvreader)
    
    #mylist = list(csvreader)

    profilLossList = []
    month = []
    change = []
    changeDict = {}

    for row in csvreader:

        
        profilLossList.append(int(row[1]))
        month.append(str(row[0]))
            
    netTotal = sum(profilLossList)
    
    for i in (profilLossList):
        if (i+1)>0:
            change.append((profilLossList [(i+1)])-(profilLossList [i]))
            changeDict.update({month[i+1]:((profilLossList [(i+1)])-(profilLossList [i]))})

    totalMonths = len(month)
    avgChange = round(sum(change)/len(change),2)
    gIncreace = max(change)
    gDecreace = min(change)

    print(len(profilLossList))
    print(len(month))
    print(len(change))
    print(changeDict)
    #print(mylist)
   
   
    #def printResults():
       
    print(f"Financial Analysis")
    print(f"----------------------------------------------------------------------------------------------------")
    print(f"Total Months: {totalMonths}")
    print(f"Total: ${netTotal}")
    print(f'Average  Change: ${avgChange}')
    print(f"Greatest Increase in Profits: {max(changeDict, key=changeDict.get)} (${max(changeDict.values())})")
    print(f"Greatest Decrease in Profits: {min(changeDict, key=changeDict.get)} (${min(changeDict.values())})")
     #   return/
    #printResults()

Analysis_File_Output = os.path.join("..","Results", "Financial Analysis.txt")
with open(Analysis_File_Output, "w", newline="") as txtfile:
   
    #print(f"{printResults()}",file=txtfile)
    print(f"Financial Analysis",file=txtfile)
    print(f"----------------------------------------------------------------------------------------------------",file=txtfile)
    print(f"Total Months: {totalMonths}",file=txtfile)
    print(f"Total: ${netTotal}",file=txtfile)
    print(f'Average  Change: ${avgChange}',file=txtfile)
    print(f"Greatest Increase in Profits: {max(changeDict, key=changeDict.get)} (${max(changeDict.values())})",file=txtfile)
    print(f"Greatest Decrease in Profits: {min(changeDict, key=changeDict.get)} (${min(changeDict.values())})",file=txtfile)
