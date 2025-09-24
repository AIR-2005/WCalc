//A function that adds an element to number box
function addElement(num){
    document.getElementById("numBox").value += num;
}

//A function that removes an element from number box
function removeElement(){
    document.getElementById("numBox").value = document.getElementById("numBox").value.slice(0,-1);
}

//A function that resets the number box
function cleanNumBox(){
    document.getElementById("numBox").value = "";
}

//A fuction that uses TextToPost and PostToRes functions to calculate given text
function doMath(){
    let text = document.getElementById("numBox").value;
    if(text != ""){
        res = PostToRes(TextToPost(text));
        document.getElementById("numBox").value = res;
    }
}

//A function that returns priority of given operator 
function priority(opr){
    if (["*","/"].includes(opr)){
        return 2;
    }
    else if (["+","-"].includes(opr)){
        return 1;
    }
    else{
        return 0;
    }
}

//A function that converts given infix text into postfix array
function TextToPost(text){
    //Initialize operator stack, postfix array and current number
    let oprStack = [];
    let postArray = [];
    let currNum = "";

    //For each index in infix text
    for (let i = 0; i < text.length;i++){
        //Set current element to text[i]
        currEl = text[i];
        //If current element is a digit or floating point, add it to current number
        if (!isNaN(currEl) || currEl == "."){
            currNum += currEl;
        }
        //If current element is negative sign(if it's at index 0 or comes after an operator), add it to current number
        else if (currEl == "-" && i == 0 || ["(","*","/","-","+"].includes(text[i-1])){
            currNum += currEl
        }
        //If current element is not a digit
        else{
            //If there is a number in current number, add it to postfix array and reset it
            if (currNum.length > 0){
                postArray.push(Number(currNum));
                currNum = "";
            }
            //If current element is parenthesis opening, add it to operator stack
            if (currEl == "("){
                oprStack.push(currEl);
            }
            //Else if current element is parenthesis closing
            else if (currEl == ")"){
                //Add all operators between parenthesis to operator array
                while (oprStack.length > 0 && oprStack[oprStack.length - 1] != "("){
                    postArray.push(oprStack.pop());
                }
                //Remove parenthesis closing from operator array
                oprStack.pop()
            }
            //Else if current element is an operator
            else if(["*","/","-","+"].includes(currEl)){
                //If operator stack's top operator has a higher or equal priority than current element
                if (oprStack.length > 0 && priority(oprStack[oprStack.length - 1]) >= priority(currEl)){
                    //Add it to postfix array
                    postArray.push(oprStack.pop());
                }
                //Add current element to operator stack
                oprStack.push(currEl);
            }
        }  
    }
    //Add remaing current number to postfix array and reset it
    if (currNum.length > 0){
        postArray.push(Number(currNum));
        currNum = "";
    }
    //Add remaning operators in stack to postfix array
    while (oprStack.length > 0){
        postArray.push(oprStack.pop());
    }
    //Return postfix array
    return postArray;
}

//A function that converts given postfix array into result
function PostToRes(post){
    //Initialize result stack
    let resStack = [];

    //For each index in postfix array
    for(let i = 0; i < post.length;i++){
        //If current element is an operator
        if(["*","/","-","+"].includes(post[i])){
            //Pop last two numbers from stack
            let num2 = resStack.pop();
            let num1 = resStack.pop();
            //Calculate their result according to current operation
            switch(post[i]){
                case "+":
                    resStack.push(num1 + num2);
                    break;
                case "-":
                    resStack.push(num1 - num2);
                    break;
                case "*":
                    resStack.push(num1 * num2);
                    break;
                case "/":
                    resStack.push(num1 / num2);
                    break;
            }
        }
        //If current element is not an operator(is a digit)
        else{
            //Add it to stack
            resStack.push(post[i]);
        }
    }
    //Return found result in stack
    return resStack[0];
    
}
