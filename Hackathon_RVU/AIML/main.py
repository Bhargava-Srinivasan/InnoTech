from groq import Groq
import os
from dotenv import load_dotenv
from collections import deque
import pandas as pd
import sys

class Trie:
    def __init__(self):
        self.d={}
        self.names=[]
        

    def add(self,st,stOG):
        st=st.upper()
        if st:
            if st[0] not in self.d:
                self.d[st[0]]=Trie()
            self.d[st[0]].add(st[1:],stOG)
        self.names.append(stOG)
        
    def search(self,st):
        st=st.upper()
        if st and st[0] in self.d:
            return self.d[st[0]].search(st[1:])
        return self.names

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

def TagMessage(msg):
    client = Groq(api_key=api_key)
    prompt = (
        "This is the content:\n"+msg+"\n Classify them into one of the following subjects: Maths, Physics, Chemistry, Data-Structures, Artificial-Intelligence, Cloud-Computing. Give upto 2 tags denoting the relevant subject (you can limit to 1 also, don't include tags if not the content is not relevant) in a single string (space separated) no extra content here and there"
    )
    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )
    l=completion.choices[0].message.content
    # print(l)
    return l.split(" ")


def getRecommendation(msg):
    # print(all_prof)
    client = Groq(api_key=api_key)
    st=""
    for a,b in all_prof:
        # print(a,b)
        if type(b)==list:
            c=",".join(b)
        else:
            c=b
        st+=a+":"+c+"\n"

    prompt = (
        "This is the question:\n"+msg+"\n and this is a list containing people and their expertise: "+st+ "\n Based on the available people suggest best 3 of them suitable for this question.\n Dont add any extra content prefix or suffix. Just give their names comma separated."
    )
    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )
    l=completion.choices[0].message.content
    # print(l)
    return l.split(",")

class User:
    def __init__(self,username,passw):
        self.username=username
        self.password=passw
        self.following=set()
    
    def get_info(self):
        interest=input("Enter field of interests: ")
        self.bio=interest.split("\n")

def get_mutuals(user):
    # print(UserMap,user,UserMap[user].following)
    if user not in UserMap:
        print("User does not exist")
    else:
        qu=deque([(0,user)])
        vi=set()
        ans=set()
        while qu:
            # print(qu)
            degree,per=qu.popleft()
            if per not in vi:
                vi.add(per)
                if degree==2:
                    ans.add(per)
                for i in list(UserMap[per].following):
                    qu.append((degree+1,i))
        return ans
    
nameTrie=Trie()
UserMap={}

def get_prof():
    prof=pd.read_excel("Professionals.xlsx")
    prof=prof.to_numpy().tolist()
    for a,b in prof:
        UserMap[a]=User(a,"root")
        nameTrie.add(a,a)
        UserMap[a].bio=[b]

    return prof

all_prof=get_prof()


logInFlag=0
while True:
    while not logInFlag:
        print("==================")
        print("1.Log In\n2.Sign Up\n3.Exit")
        print("==================")
        print("Enter option:")
        op=int(input())
        if op not in (1,2,3):
            print("Incorrect option!! Enter option again")
            continue

        if op==3:
            sys.exit(0)
        
        username=input("Enter Username: ")
        passw=input("Enter Password: ")

        if op==1:
            # print(UserMap)
            if username not in UserMap:
                print("User name does not exit")
                continue
            elif UserMap[username].password!=passw:
                print("Wrong Password")
                continue
            else:
                print("Logged in Successfully")
                curUser=UserMap[username]
                logInFlag=True

        else:
            if username in UserMap:
                print("Username already exists")
                continue
            else:
                print("User Registered Successfully")
                curUser=User(username,passw)
                UserMap[username]=curUser
                nameTrie.add(username,username)
                curUser.get_info()
                all_prof.append([username,curUser.bio])
                logInFlag=True

    print("==================")
    print("1.Post a question\n2.Get recommended Professionals\n3.Search professionals to follow\n4.Unfollow a person\n5.Add interests to profile\n6.Get current interests\n7.Log Out")
    print("==================")
    print("Enter option: ")
    op=int(input())
    print("==================")
    if op not in (1,2,3,4,5,6,7):
        print("Incorrect option!! Enter option again")
        continue
    
    if op==1:
        ques=input("Enter your question to post: ")
        tags=TagMessage(ques)
        print("Tagged fields: ",tags)
        recomProf=getRecommendation(ques)
        print("Suggested people who can help: ",recomProf)

    elif op==2:
        mutuals=get_mutuals(username)
        if len(mutuals):
            res=list(mutuals)
        else:
            res=[name for name in UserMap][:3]
        print("Following professionals are recommended to follow: ")

        for i in range(len(res)):
            print(str(i+1)+": "+res[i])
        
        ch=int(input("Enter number to follow: "))
        if 0<=ch<len(res):
            curUser.following.add(res[i])
        else:
            print("Not a valid number")


    elif op==3:
        nameToSearch=input("Enter name to search: ")
        nameList=nameTrie.search(nameToSearch)
        for i in range(len(nameList)):
            if username==nameList[i]:
                nameList.pop(i)
                break
        if nameList:
            print("List of recommended names: ",nameList)
        else:
            print("No matches found")
        for i in range(len(nameList)):
            print(str(i+1)+". "+nameList[i])
        ch=int(input("Enter option to follow: "))
        if ch-1<len(nameList):
            curUser.following.add(nameList[ch-1])
        else:
            print("Invalid number!")
    
    elif op==4:
        if len(curUser.following):
            l=list(curUser.following)
            for i in range(len(l)):
                print(str(i+1)+": "+l[i])
            ch=int(input("Enter user to unfollow: "))
            if 0<=ch<len(l):
                curUser.following.remove(l[i])
            else:
                print("Invalid number!!")

        else:
            print("No users following")

    elif op==5:
        curUser.bio.append(input("Enter interest: "))
        
    elif op==6:
        print("The interests of user "+username+" are:")
        for i in curUser.bio:
            print(i)    
    elif op==7:
        logInFlag=False
    