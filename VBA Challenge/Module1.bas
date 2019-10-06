Attribute VB_Name = "Module1"
Sub alphabetical_testing()

    For Each ws In Worksheets
        
        Dim ticker As String

        Dim volume As Double
        volume = 0

        Dim Summary_Table_Row As Integer
        Summary_Table_Row = 2
        
        Dim openingValue, closingValue, yearlyChange, gPerInc, gPerDec, gTotalVol As Double
        openingValue = ws.Cells(2, 3).Value
        closingValue = 0
        gPerInc = 0
        gPerDec = 0
        gTotalVol = 0
        
        Dim perChange As Double
        perChange = 0

        LastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row
    
        For i = 2 To LastRow

            If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value And ws.Cells(i + 1, 3).Value <> 0 Then

                ticker = ws.Cells(i, 1).Value
            
                closingValue = ws.Cells(i, 6).Value
                yearlyChange = closingValue - openingValue
                
                perChange = (yearlyChange / openingValue)

                volume = volume + ws.Cells(i, 7).Value

                ws.Range("J" & Summary_Table_Row).Value = yearlyChange
                ws.Cells(1, 10).Value = "Yearly Change"
            
                ws.Range("K" & Summary_Table_Row).NumberFormat = "0.00%"
                ws.Range("K" & Summary_Table_Row).Value = perChange
                ws.Cells(1, 11).Value = "Percentage Change"
                
                If ws.Cells(i, 11).Value > 0 Then
                    ws.Cells(i, 11).Interior.Color = RGB(0, 255, 0)
                Else
                    ws.Cells(i, 11).Interior.Color = RGB(255, 0, 0)
                
                End If
                
                ws.Range("I" & Summary_Table_Row).Value = ticker
                ws.Cells(1, 9).Value = "Ticker"

                ws.Range("L" & Summary_Table_Row).Value = volume
                ws.Cells(1, 12).Value = "Total Stock Volume"
                
                ws.Range("i1:q1").Columns.AutoFit
            
                openingValue = ws.Cells(i + 1, 3).Value
            
                Summary_Table_Row = Summary_Table_Row + 1
                
                volume = 0
                closingValue = 0
                perChange = 0

            Else

                volume = volume + ws.Cells(i, 7).Value

            End If

        Next i
        
        For j = 2 To LastRow
        
            If ws.Cells(j, 11).Value > gPerInc Then
                gPerInc = ws.Cells(j, 11).Value
            
                ws.Cells(2, 15).Value = "Gratest % Increase"
                ws.Cells(2, 17).Value = gPerInc
            'ws.Cells(2, 16).Value = ws.Cells(j, 1).Value
            
            
            
            End If
            
            If ws.Cells(j, 11).Value < gPerDec Then
                gPerDec = ws.Cells(j, 11).Value
            
                ws.Cells(3, 15).Value = "Gratest % Decrease"
                ws.Cells(3, 17).Value = gPerDec
            
            
            End If
            
            If ws.Cells(j, 12).Value > gTotalVol Then
                gTotalVol = ws.Cells(j, 12).Value
            
                ws.Cells(4, 15).Value = "Gratest Total Volume"
                ws.Range("Q2:Q3").NumberFormat = "0.00%"
                ws.Cells(4, 17).Value = gTotalVol
                ws.Range("o4:q4").Columns.AutoFit
            
                ws.Cells(1, 16).Value = "Ticker"
                ws.Cells(1, 17).Value = "Value"
            
            End If
            
                   
        Next j
            
    
    Next ws

End Sub

