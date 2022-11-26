import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
import time
import requests

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1,detectionCon=0.8, minTrackCon=0.5)
classifier = Classifier("keras_model.h5", "labels.txt")

offset = 20
imgSize = 500

folder = "Data/C"
counter = 0

labels = ["A", "B","C","D","E","F","G","H","I","K","L","M","N","O"]

string=""
def har(alpha,beta):
    if(alpha.find(beta,len(string)-2)==-1):
        return alpha+beta
    else:
        return alpha


while True :
    success, img = cap.read()
    imgOutput = img.copy()
    # img =  cv2.cvtColor(img,cv2.COLOR_RGB2BGR)

    hands, img = detector.findHands(img)
    # img =  cv2.cvtColor(img,cv2.COLOR_RGB2BGR)
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']

        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]
        
        imgCropShape = imgCrop.shape

        aspectRatio = h / w

        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            imgResizeShape = imgResize.shape
            wGap = math.ceil((imgSize - wCal) / 2)
            imgWhite[:, wGap:wCal + wGap] = imgResize
            prediction, index = classifier.getPrediction(imgWhite, draw=True)
            print(prediction,index)

        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            imgResizeShape = imgResize.shape
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal + hGap, :] = imgResize
            prediction, index = classifier.getPrediction(imgWhite, draw=True)

        cv2.rectangle(imgOutput, (x - offset, y - offset-50),(x - offset+90, y - offset-50+50), (255, 0, 255), cv2.FILLED)
        cv2.putText(imgOutput, labels[index], (x, y -26), cv2.FONT_HERSHEY_COMPLEX, 1.7, (255, 255, 255), 2)
        string=har(string,labels[index])
        #write string to file
        # if(counter%10==0):
        text_file = open("/Users/arvindkumarsingh/Desktop/ReactHack/sign/src/file.txt", "w")
        text_file.write(string)
        # print("run")
        text_file.close()
        # counter+=1
        
        cv2.rectangle(imgOutput, (0,0),(2400 ,100), (255, 255, 255), -1)
        cv2.putText(imgOutput, string, (10, 80), cv2.FONT_HERSHEY_COMPLEX, 2, (255, 0, 255), 2)
        cv2.rectangle(imgOutput, (x-offset-20, y-offset),(x + w+offset+20, y + h+offset), (255, 0, 255), 4)
        # time.sleep(2)
        


        # cv2.imshow("ImageCrop", imgCrop)
        # cv2.imshow("ImageWhite", imgWhite)
    cv2.imshow("Image", imgOutput)
    cv2.waitKey(1)
